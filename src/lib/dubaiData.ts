import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { dubaiAreaBySlug } from '@/content/dubai';
import { dbSlugsFor, guideSlugForDb } from '@/content';
import type { ClinicResult } from '@/components/search/ClinicResults';

// Live data for the Dubai area pages. Duplicate slugs in the database
// (e.g. jbr / jumeirah-beach-residence, veneers / dental-veneers) are merged so
// the consolidated page shows every relevant clinic.

export { canonicalTreatment } from '@/content';

/** Minimum number of clinics before an area + treatment page is indexable. */
export const MIN_CLINICS_TO_INDEX = 3;

async function cityIdsFor(areaSlug: string) {
  const supabase = createServerSupabaseAdmin();
  const area = dubaiAreaBySlug(areaSlug);
  if (!supabase || !area) return { supabase, ids: [] as string[] };
  const { data: state } = await supabase.from('states').select('id').eq('slug', 'dubai').maybeSingle();
  if (!state) return { supabase, ids: [] as string[] };
  const { data } = await supabase.from('cities').select('id').eq('state_id', state.id).in('slug', [area.slug, ...(area.aliases || [])]);
  return { supabase, ids: (data || []).map((c) => c.id) };
}

const CLINIC_SELECT = 'id, name, slug, phone, rating, review_count, cover_image_url, city:cities(name), area:areas(name), clinic_insurances(insurance:insurances(name))';

function toResult(c: any, priceFrom?: number | null): ClinicResult {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    phone: c.phone || null,
    rating: Number(c.rating) || null,
    reviewCount: Number(c.review_count) || null,
    imageUrl: c.cover_image_url || null,
    place: c.area?.name || c.city?.name || null,
    insurances: (c.clinic_insurances || []).map((x: any) => x.insurance?.name).filter(Boolean),
    priceFrom: priceFrom ?? null,
  };
}

export interface AreaData {
  clinics: ClinicResult[];
  clinicCount: number;
  /** Clinics offering each treatment in this area (canonical treatment slugs) */
  treatmentCounts: Record<string, number>;
}

export async function fetchAreaData(areaSlug: string): Promise<AreaData> {
  const empty: AreaData = { clinics: [], clinicCount: 0, treatmentCounts: {} };
  try {
    const { supabase, ids } = await cityIdsFor(areaSlug);
    if (!supabase || ids.length === 0) return empty;
    const [{ data: clinics, count }, { data: links }] = await Promise.all([
      supabase.from('clinics').select(CLINIC_SELECT, { count: 'exact' }).in('city_id', ids).eq('is_active', true).order('review_count', { ascending: false, nullsFirst: false }).limit(12),
      supabase.from('clinic_treatments').select('clinic_id, treatment:treatments(slug), clinic:clinics!inner(city_id, is_active)').in('clinic.city_id', ids).eq('clinic.is_active', true).limit(10000),
    ]);
    const treatmentCounts: Record<string, number> = {};
    {
      const seen = new Map<string, Set<string>>();
      for (const l of (links || []) as any[]) {
        const slug = l.treatment?.slug && guideSlugForDb(l.treatment.slug);
        if (!slug) continue;
        if (!seen.has(slug)) seen.set(slug, new Set());
        seen.get(slug)!.add(l.clinic_id);
      }
      seen.forEach((set, slug) => { treatmentCounts[slug] = set.size; });
    }
    return { clinics: (clinics || []).map((c) => toResult(c)), clinicCount: count || 0, treatmentCounts };
  } catch (err) {
    console.error('[dubai area] fetch failed', err);
    return empty;
  }
}

export interface AreaServiceData {
  clinics: ClinicResult[];
  clinicCount: number;
  /** All clinics in the area, shown (with a notice) when none has confirmed this treatment yet */
  areaClinics: ClinicResult[];
  /** Clinic-listed starting prices, when at least two clinics list one */
  priceRange: { min: number; max: number; n: number } | null;
}

export async function fetchAreaServiceData(areaSlug: string, serviceSlug: string): Promise<AreaServiceData> {
  const empty: AreaServiceData = { clinics: [], clinicCount: 0, areaClinics: [], priceRange: null };
  try {
    const { supabase, ids } = await cityIdsFor(areaSlug);
    if (!supabase || ids.length === 0) return empty;
    const { data: top } = await supabase.from('clinics').select(CLINIC_SELECT).in('city_id', ids).eq('is_active', true).order('review_count', { ascending: false, nullsFirst: false }).limit(12);
    const areaClinics = (top || []).map((c: any) => toResult(c));
    const { data: treatments } = await supabase.from('treatments').select('id').in('slug', dbSlugsFor(serviceSlug));
    const tIds = (treatments || []).map((t) => t.id);
    if (tIds.length === 0) return { ...empty, areaClinics };
    // Join from clinic_treatments so no long id lists go into the URL
    const { data: links } = await supabase
      .from('clinic_treatments')
      .select('clinic_id, price_from, clinic:clinics!inner(city_id, is_active)')
      .in('treatment_id', tIds)
      .in('clinic.city_id', ids)
      .eq('clinic.is_active', true)
      .limit(2000);
    const priceBy = new Map<string, number | null>();
    for (const l of (links || []) as any[]) {
      const p = Number(l.price_from) || null;
      const prev = priceBy.get(l.clinic_id);
      priceBy.set(l.clinic_id, prev && p ? Math.min(prev, p) : prev || p);
    }
    const clinicIds = Array.from(priceBy.keys());
    if (clinicIds.length === 0) return { ...empty, areaClinics };
    const { data: clinics } = await supabase.from('clinics').select(CLINIC_SELECT).in('id', clinicIds.slice(0, 60)).order('review_count', { ascending: false, nullsFirst: false }).limit(30);
    const prices = Array.from(priceBy.values()).filter((p): p is number => !!p && p > 0);
    return {
      clinics: (clinics || []).map((c: any) => toResult(c, priceBy.get(c.id))),
      clinicCount: clinicIds.length,
      areaClinics,
      priceRange: prices.length >= 2 ? { min: Math.min(...prices), max: Math.max(...prices), n: prices.length } : null,
    };
  } catch (err) {
    console.error('[dubai area service] fetch failed', err);
    return empty;
  }
}
