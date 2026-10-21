import type { GetStaticPaths, GetStaticProps } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { DentistProfile, type DentistProfileProps } from '@/components/profile/DentistProfile';
import { liveImage } from '@/lib/liveImage';

// Public dentist profile. Only public fields are selected (no email, phone or user id).

const arr = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).filter((x): x is string => typeof x === 'string' && x.trim() !== '') : []);

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const supabase = createServerSupabaseAdmin();
    if (!supabase) return { paths: [], fallback: 'blocking' };
    const { data } = await supabase.from('dentists').select('slug').eq('is_active', true);
    return { paths: (data || []).map((d) => ({ params: { dentistSlug: d.slug } })), fallback: 'blocking' };
  } catch (error) {
    console.error('Error generating dentist paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<DentistProfileProps> = async (ctx) => {
  const supabase = createServerSupabaseAdmin();
  const slug = ctx.params?.dentistSlug as string;
  if (!slug || !supabase) return { notFound: true, revalidate: 60 };

  const { data: d } = await supabase
    .from('dentists')
    .select('id, name, slug, title, professional_type, bio, photo_url, image_url, gender, languages, qualifications, specializations, years_experience, experience_years, clinic_id, is_active')
    .eq('slug', slug)
    .maybeSingle();
  if (!d || !d.is_active) return { notFound: true, revalidate: 300 };

  const [clinicRes, colleaguesRes, treatmentsRes] = d.clinic_id
    ? await Promise.all([
        supabase.from('clinics').select('id, name, slug, address, phone, claim_status, is_active, city:cities(name, slug, state:states(name, slug))').eq('id', d.clinic_id).maybeSingle(),
        supabase.from('dentists').select('name, slug, title, professional_type, photo_url, image_url').eq('clinic_id', d.clinic_id).eq('is_active', true).neq('id', d.id).limit(8),
        supabase.from('clinic_treatments').select('treatment:treatments(name, slug)').eq('clinic_id', d.clinic_id),
      ])
    : [{ data: null }, { data: [] }, { data: [] }];

  const c = clinicRes.data as any;
  const clinic = c && c.is_active
    ? {
        id: c.id,
        name: c.name,
        slug: c.slug,
        address: c.address || null,
        phone: c.phone || null,
        claimed: c.claim_status === 'claimed',
        city: c.city ? { name: c.city.name, slug: c.city.slug } : null,
        emirate: c.city?.state ? { name: c.city.state.name, slug: c.city.state.slug } : null,
      }
    : null;

  return {
    props: {
      dentist: {
        id: d.id,
        name: d.name,
        slug: d.slug,
        title: d.title || d.professional_type || null,
        bio: d.bio || null,
        photoUrl: liveImage(d.photo_url) || liveImage(d.image_url),
        gender: d.gender || null,
        languages: arr(d.languages),
        qualifications: arr(d.qualifications),
        specializations: arr(d.specializations),
        yearsExperience: d.years_experience || d.experience_years || null,
      },
      clinic,
      colleagues: ((colleaguesRes.data || []) as any[]).map((x) => ({ name: x.name, slug: x.slug, title: x.title || x.professional_type || null, photoUrl: liveImage(x.photo_url) || liveImage(x.image_url) })),
      treatments: Array.from(
        new Map(((treatmentsRes.data || []) as any[]).filter((t) => t.treatment).map((t) => [t.treatment.slug, { name: t.treatment.name, slug: t.treatment.slug }])).values()
      ),
    },
    revalidate: 600,
  };
};

export default DentistProfile;
