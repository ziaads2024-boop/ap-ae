import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';
import { dbSlugsFor } from '@/content';

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

    const select = 'id, name, slug, rating, review_count, average_rating, total_reviews, verification_status, city_id, city:cities(name), area:areas(name)';
    let query;
    if (treatmentSlug) {
      // Join from clinic_treatments (no long id lists in the URL)
      const { data: treatments } = await supabase.from('treatments').select('id').in('slug', dbSlugsFor(treatmentSlug));
      if (!treatments?.length) return [];
      query = supabase
        .from('clinic_treatments')
        .select(`clinic:clinics!inner(${select})`)
        .in('treatment_id', treatments.map((t) => t.id))
        .eq('clinic.is_active', true)
        .limit(200);
      if (cityIds) query = query.in('clinic.city_id', cityIds);
    } else {
      query = supabase.from('clinics').select(select).eq('is_active', true).order('review_count', { ascending: false }).limit(limit);
      if (cityIds) query = query.in('city_id', cityIds);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    const rows: any[] = treatmentSlug
      ? Array.from(new Map((data as any[]).map((r) => [r.clinic.id, r.clinic])).values())
          .sort((a: any, b: any) => (Number(b.review_count) || 0) - (Number(a.review_count) || 0))
          .slice(0, limit)
      : (data as any[]);

    return rows.map((c: any) => {
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
