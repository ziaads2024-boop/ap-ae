import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';

// Live clinic listings for the editorial guide pages. The guide content itself
// lives in src/content; this only adds real listings when the database is
// reachable, and returns [] otherwise so pages still render in full.

interface Options {
  emirateSlug?: string;
  treatmentSlug?: string;
  limit?: number;
}

export async function fetchGuideClinics({ emirateSlug, treatmentSlug, limit = 10 }: Options): Promise<ClinicSummary[]> {
  const supabase = createServerSupabaseAdmin();
  if (!supabase) return [];

  try {
    let cityIds: string[] | null = null;
    if (emirateSlug) {
      const { data: state } = await supabase.from('states').select('id').eq('slug', emirateSlug).maybeSingle();
      if (!state) return [];
      const { data: cities } = await supabase.from('cities').select('id').eq('state_id', state.id);
      cityIds = (cities || []).map((c) => c.id);
      if (cityIds.length === 0) return [];
    }

    let clinicIds: string[] | null = null;
    if (treatmentSlug) {
      const { data: treatment } = await supabase.from('treatments').select('id').eq('slug', treatmentSlug).maybeSingle();
      if (!treatment) return [];
      const { data: links } = await supabase.from('clinic_treatments').select('clinic_id').eq('treatment_id', treatment.id);
      clinicIds = (links || []).map((l) => l.clinic_id);
      if (clinicIds.length === 0) return [];
    }

    let query = supabase
      .from('clinics')
      .select('id, name, slug, rating, review_count, average_rating, total_reviews, verification_status, city:cities(name), area:areas(name)')
      .eq('is_active', true)
      .order('review_count', { ascending: false })
      .limit(limit);
    if (cityIds) query = query.in('city_id', cityIds);
    if (clinicIds) query = query.in('id', clinicIds.slice(0, 1000));

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((c: any) => {
      const rating = Number(c.rating || c.average_rating) || null;
      const reviewCount = Number(c.review_count || c.total_reviews) || null;
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        area: c.area?.name || c.city?.name || null,
        rating,
        reviewCount,
        verified: c.verification_status === 'verified',
      };
    });
  } catch (err) {
    console.error('[guide clinics] fetch failed', err);
    return [];
  }
}
