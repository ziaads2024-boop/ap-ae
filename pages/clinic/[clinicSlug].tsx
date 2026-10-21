import { GetStaticProps, GetStaticPaths } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { ClinicProfile, type ClinicProfileProps } from '@/components/profile/ClinicProfile';

// Public clinic profile. Only public listing fields are selected: the clinics
// table also holds scraped claim emails, owner ids and raw GMB data, which must
// not end up in the page JSON.

const CLINIC_COLUMNS = [
  'id', 'name', 'slug', 'description', 'address', 'phone', 'whatsapp', 'website', 'google_maps_url',
  'cover_image_url', 'logo_url', 'latitude', 'longitude', 'rating', 'review_count', 'average_rating', 'total_reviews',
  'verification_status', 'claim_status', 'updated_at',
].join(', ');

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const supabase = createServerSupabaseAdmin();
    if (!supabase) return { paths: [], fallback: 'blocking' };
    const { data: clinics } = await supabase.from('clinics').select('slug').eq('is_active', true);
    return { paths: (clinics || []).map((c) => ({ params: { clinicSlug: c.slug } })), fallback: 'blocking' };
  } catch (error) {
    console.error('Error generating clinic paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<ClinicProfileProps> = async (ctx) => {
  const supabase = createServerSupabaseAdmin();
  const clinicSlug = ctx.params?.clinicSlug as string;
  if (!clinicSlug || !supabase) return { notFound: true, revalidate: 60 };

  const { data: clinic, error } = await supabase
    .from('clinics')
    .select(`${CLINIC_COLUMNS}, city:cities(id, name, slug, state:states(name, slug)), area:areas(name, slug)`)
    .eq('slug', clinicSlug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !clinic) return { notFound: true, revalidate: 300 };
  const c = clinic as any;

  const seoSlug = `clinic/${clinicSlug}`;
  const [treatments, dentists, internalReviews, googleReviews, images, hours, insurances, seo, nearby] = await Promise.all([
    supabase.from('clinic_treatments').select('price_from, price_to, treatment:treatments(name, slug)').eq('clinic_id', c.id),
    supabase.from('dentists').select('name, slug, title, professional_type, specializations, languages, photo_url, image_url, years_experience, experience_years').eq('clinic_id', c.id).eq('is_active', true).order('is_primary', { ascending: false }).limit(12),
    supabase.from('review_funnel_events').select('id, rating, comment, created_at').eq('clinic_id', c.id).eq('event_type', 'rating_submitted').not('comment', 'is', null).order('created_at', { ascending: false }).limit(10),
    supabase.from('google_reviews').select('id, author_name, reviewer_name, rating, text_content, comment, review_time').eq('clinic_id', c.id).order('review_time', { ascending: false }).limit(10),
    supabase.from('clinic_images').select('image_url, alt_text, caption').eq('clinic_id', c.id).order('display_order').limit(8),
    supabase.from('clinic_hours').select('day_of_week, open_time, close_time, is_closed').eq('clinic_id', c.id).order('day_of_week'),
    supabase.from('clinic_insurances').select('insurance:insurances(name, slug)').eq('clinic_id', c.id),
    supabase.from('seo_pages').select('faqs').in('slug', [seoSlug, seoSlug.replace(/^/, '/')]).limit(1).maybeSingle(),
    c.city?.id
      ? supabase.from('clinics').select('name, slug, rating, review_count, cover_image_url').eq('city_id', c.city.id).eq('is_active', true).neq('id', c.id).order('review_count', { ascending: false }).limit(6)
      : Promise.resolve({ data: [] as any[] }),
  ]);

  const faqs = Array.isArray((seo.data as any)?.faqs)
    ? (seo.data as any).faqs.map((f: any) => ({ q: f.q || f.question, a: f.a || f.answer })).filter((f: any) => f.q && f.a)
    : [];

  return {
    props: {
      clinic: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || null,
        address: c.address || null,
        phone: c.phone || null,
        whatsapp: c.whatsapp || null,
        website: c.website || null,
        googleMapsUrl: c.google_maps_url || null,
        coverImageUrl: c.cover_image_url || null,
        logoUrl: c.logo_url || null,
        latitude: c.latitude ?? null,
        longitude: c.longitude ?? null,
        rating: Number(c.rating || c.average_rating) || null,
        reviewCount: Number(c.review_count || c.total_reviews) || null,
        verified: c.verification_status === 'verified',
        claimed: c.claim_status === 'claimed',
        updatedAt: c.updated_at || null,
        city: c.city ? { name: c.city.name, slug: c.city.slug } : null,
        emirate: c.city?.state ? { name: c.city.state.name, slug: c.city.state.slug } : null,
        area: c.area ? { name: c.area.name } : null,
      },
      treatments: (treatments.data || [])
        .filter((t: any) => t.treatment)
        .map((t: any) => ({ name: t.treatment.name, slug: t.treatment.slug, priceFrom: t.price_from ?? null, priceTo: t.price_to ?? null })),
      dentists: (dentists.data || []).map((d: any) => ({
        name: d.name,
        slug: d.slug,
        title: d.title || d.professional_type || null,
        specializations: Array.isArray(d.specializations) ? d.specializations : [],
        languages: Array.isArray(d.languages) ? d.languages : [],
        photoUrl: d.photo_url || d.image_url || null,
        yearsExperience: d.years_experience || d.experience_years || null,
      })),
      internalReviews: (internalReviews.data || []).map((r: any) => ({ id: r.id, rating: r.rating || null, text: r.comment, date: r.created_at })),
      googleReviews: (googleReviews.data || [])
        .map((r: any) => ({ id: r.id, author: r.author_name || r.reviewer_name || 'Google user', rating: r.rating || null, text: r.text_content || r.comment || '', date: r.review_time || null }))
        .filter((r: any) => r.text),
      images: (images.data || []).map((i: any) => ({ url: i.image_url, alt: i.alt_text || i.caption || null })).filter((i: any) => i.url),
      hours: (hours.data || []).map((h: any) => ({ day: h.day_of_week, open: h.open_time, close: h.close_time, closed: !!h.is_closed })),
      insurances: (insurances.data || []).map((i: any) => i.insurance).filter(Boolean).map((i: any) => ({ name: i.name, slug: i.slug || null })),
      faqs,
      nearby: (nearby.data || []).map((n: any) => ({ name: n.name, slug: n.slug, rating: Number(n.rating) || null, reviewCount: Number(n.review_count) || null, imageUrl: n.cover_image_url || null })),
    },
    revalidate: 600,
  };
};

export default ClinicProfile;
