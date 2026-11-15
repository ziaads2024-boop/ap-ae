import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { dubaiAreaBySlug, dubaiAreas } from '@/content/dubai';
import { dbSlugsFor, guideSlugForDb } from '@/content';
import type { ClinicResult } from '@/components/search/ClinicResults';
import { liveImage } from '@/lib/liveImage';
import { isNonDental } from '@/lib/clinicQuality';

// Live data for the Dubai area pages. Duplicate slugs in the database
// (e.g. jbr / jumeirah-beach-residence, veneers / dental-veneers) are merged so
// the consolidated page shows every relevant clinic.
//
// Every figure on an area page is computed here from the listings at build or
// revalidation time. Nothing is estimated.

export { canonicalTreatment } from '@/content';

/** Minimum number of clinics before an area + treatment page is indexable. */
export const MIN_CLINICS_TO_INDEX = 3;
/** Clinics shown as full cards; the rest of the area's clinics are listed as plain links. */
const CARD_LIMIT = 12;
const LINK_LIMIT = 60;
/** "Open late" means a listed closing time after 21:00, or past midnight. */
const LATE_AFTER_MIN = 21 * 60;

async function cityIdsFor(areaSlug: string) {
  const supabase = createServerSupabaseAdmin();
  const area = dubaiAreaBySlug(areaSlug);
  if (!supabase || !area) return { supabase, ids: [] as string[] };
  const { data: state } = await supabase.from('states').select('id').eq('slug', 'dubai').maybeSingle();
  if (!state) return { supabase, ids: [] as string[] };
  const { data } = await supabase.from('cities').select('id').eq('state_id', state.id).in('slug', [area.slug, ...(area.aliases || [])]);
  return { supabase, ids: (data || []).map((c) => c.id) };
}

const CLINIC_SELECT = 'id, name, slug, phone, rating, review_count, cover_image_url, claim_status, city:cities(name), area:areas(name), clinic_insurances(insurance:insurances(name))';
const AREA_SELECT = `${CLINIC_SELECT}, latitude, longitude, is_likely_dental, clinic_hours(day_of_week, open_time, close_time, is_closed)`;

/** A dental practice a patient can book (not a pharmacy, lab, salon or a listing flagged as non-dental). */
export const isDentalListing = (c: { name?: string | null; is_likely_dental?: boolean | null }) =>
  !isNonDental(c.name) && c.is_likely_dental !== false;

function toResult(c: any, priceFrom?: number | null): ClinicResult {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    phone: c.phone || null,
    rating: Number(c.rating) || null,
    reviewCount: Number(c.review_count) || null,
    imageUrl: liveImage(c.cover_image_url),
    place: c.area?.name || c.city?.name || null,
    insurances: (c.clinic_insurances || []).map((x: any) => x.insurance?.name).filter(Boolean),
    priceFrom: priceFrom ?? null,
    claimed: c.claim_status === 'claimed',
  };
}

// ------------------------------------------------------------------ hours

const toMin = (t: string | null | undefined) => {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return Number.isFinite(h) ? h * 60 + (m || 0) : null;
};
const fmt = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

interface HoursSummary {
  listed: boolean;
  friday: boolean;
  saturday: boolean;
  late: boolean;
  allDay: boolean;
  /** Latest listed closing time, e.g. "23:00", "after midnight" or "24 hours" */
  latestClose: string | null;
}

// clinic_hours.day_of_week follows Google: 0 = Sunday ... 5 = Friday, 6 = Saturday.
function summariseHours(rows: any[] | null | undefined): HoursSummary {
  const open = (rows || []).filter((h) => !h.is_closed && h.open_time);
  const out: HoursSummary = { listed: open.length > 0, friday: false, saturday: false, late: false, allDay: false, latestClose: null };
  let latest = -1;
  let overnight = false;
  for (const h of open) {
    if (h.day_of_week === 5) out.friday = true;
    if (h.day_of_week === 6) out.saturday = true;
    const o = toMin(h.open_time);
    const c = toMin(h.close_time);
    if (o === null || c === null) continue;
    if ((o === 0 && (c === 0 || c >= 23 * 60 + 59))) { out.allDay = true; out.late = true; continue; }
    if (c <= o) { overnight = true; out.late = true; continue; }
    if (c > LATE_AFTER_MIN) out.late = true;
    latest = Math.max(latest, c);
  }
  out.latestClose = out.allDay ? '24 hours' : overnight ? 'after midnight' : latest >= 0 ? fmt(latest) : null;
  return out;
}

// ------------------------------------------------------------------ stats

export interface AreaStats {
  /** Dental clinics listed in the area */
  clinicCount: number;
  /** Clinics that list opening hours (the base for the hours figures) */
  withHours: number;
  openFriday: number;
  openSaturday: number;
  openLate: number;
  open24h: number;
  /** Median Google rating among clinics with a rating */
  medianRating: number | null;
  ratedCount: number;
  totalReviews: number;
  /** Median clinic position, used as the area's approximate centre */
  centroid: { lat: number; lng: number } | null;
  /** Date (YYYY-MM-DD) the figures were calculated */
  asOf: string;
}

export interface LateClinic {
  name: string;
  slug: string;
  latestClose: string;
  friday: boolean;
  saturday: boolean;
}

const median = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function computeStats(rows: any[]): AreaStats {
  const hours = rows.map((r) => summariseHours(r.clinic_hours));
  const ratings = rows.map((r) => Number(r.rating)).filter((n) => n > 0);
  const coords = rows.filter((r) => Number(r.latitude) && Number(r.longitude));
  const lat = median(coords.map((r) => Number(r.latitude)));
  const lng = median(coords.map((r) => Number(r.longitude)));
  const med = median(ratings);
  return {
    clinicCount: rows.length,
    withHours: hours.filter((h) => h.listed).length,
    openFriday: hours.filter((h) => h.friday).length,
    openSaturday: hours.filter((h) => h.saturday).length,
    openLate: hours.filter((h) => h.late).length,
    open24h: hours.filter((h) => h.allDay).length,
    medianRating: med === null ? null : Math.round(med * 10) / 10,
    ratedCount: ratings.length,
    totalReviews: rows.reduce((n, r) => n + (Number(r.review_count) || 0), 0),
    centroid: coords.length >= 3 && lat !== null && lng !== null ? { lat: Math.round(lat * 1e5) / 1e5, lng: Math.round(lng * 1e5) / 1e5 } : null,
    asOf: new Date().toISOString().slice(0, 10),
  };
}

function lateWeekendList(rows: any[], limit = 8): LateClinic[] {
  return rows
    .map((r) => ({ r, h: summariseHours(r.clinic_hours) }))
    .filter(({ h }) => h.late && (h.friday || h.saturday) && h.latestClose)
    .slice(0, limit)
    .map(({ r, h }) => ({ name: r.name, slug: r.slug, latestClose: h.latestClose!, friday: h.friday, saturday: h.saturday }));
}

/** Every active dental clinic in the area, most-reviewed first. */
async function areaClinicRows(supabase: any, ids: string[]): Promise<any[]> {
  const { data } = await supabase
    .from('clinics')
    .select(AREA_SELECT)
    .in('city_id', ids)
    .eq('is_active', true)
    .order('review_count', { ascending: false, nullsFirst: false })
    .limit(1000);
  return ((data || []) as any[]).filter((c) => c.slug && isDentalListing(c));
}

// ------------------------------------------------------------------ area page

export interface AreaData {
  /** Most-reviewed clinics, shown as cards */
  clinics: ClinicResult[];
  /** The next clinics in the area, shown as plain links so every profile is reachable */
  moreClinics: { name: string; slug: string }[];
  clinicCount: number;
  /** Clinics offering each treatment in this area (canonical treatment slugs) */
  treatmentCounts: Record<string, number>;
  stats: AreaStats | null;
  lateWeekend: LateClinic[];
  /** False when the live data could not be read (pages then avoid count-based decisions) */
  loaded: boolean;
}

export async function fetchAreaData(areaSlug: string): Promise<AreaData> {
  const empty: AreaData = { clinics: [], moreClinics: [], clinicCount: 0, treatmentCounts: {}, stats: null, lateWeekend: [], loaded: false };
  try {
    const { supabase, ids } = await cityIdsFor(areaSlug);
    if (!supabase) return empty;
    if (ids.length === 0) return { ...empty, loaded: true };
    const [rows, { data: links }] = await Promise.all([
      areaClinicRows(supabase, ids),
      supabase.from('clinic_treatments').select('clinic_id, treatment:treatments(slug), clinic:clinics!inner(city_id, is_active)').in('clinic.city_id', ids).eq('clinic.is_active', true).limit(10000),
    ]);
    const treatmentCounts: Record<string, number> = {};
    {
      const dental = new Set(rows.map((r) => r.id));
      const seen = new Map<string, Set<string>>();
      for (const l of (links || []) as any[]) {
        const slug = l.treatment?.slug && guideSlugForDb(l.treatment.slug);
        if (!slug || !dental.has(l.clinic_id)) continue;
        if (!seen.has(slug)) seen.set(slug, new Set());
        seen.get(slug)!.add(l.clinic_id);
      }
      seen.forEach((set, slug) => { treatmentCounts[slug] = set.size; });
    }
    return {
      clinics: rows.slice(0, CARD_LIMIT).map((c) => toResult(c)),
      moreClinics: rows.slice(CARD_LIMIT, LINK_LIMIT).map((c) => ({ name: c.name, slug: c.slug })),
      clinicCount: rows.length,
      treatmentCounts,
      stats: rows.length ? computeStats(rows) : null,
      lateWeekend: lateWeekendList(rows),
      loaded: true,
    };
  } catch (err) {
    console.error('[dubai area] fetch failed', err);
    return empty;
  }
}

/** Dental clinic count per Dubai area (canonical slugs), for the Dubai hub. */
export async function fetchDubaiAreaCounts(): Promise<Record<string, number>> {
  const supabase = createServerSupabaseAdmin();
  if (!supabase) return {};
  try {
    const { data: state } = await supabase.from('states').select('id').eq('slug', 'dubai').maybeSingle();
    if (!state) return {};
    const { data: cities } = await supabase.from('cities').select('id, slug').eq('state_id', state.id);
    const areaOfCity = new Map<string, string>();
    for (const c of cities || []) {
      const a = dubaiAreaBySlug(c.slug);
      if (a) areaOfCity.set(c.id, a.slug);
    }
    const counts: Record<string, number> = {};
    for (let from = 0; ; from += 1000) {
      const { data } = await supabase
        .from('clinics')
        .select('id, name, city_id, is_likely_dental')
        .in('city_id', Array.from(areaOfCity.keys()))
        .eq('is_active', true)
        .order('id')
        .range(from, from + 999);
      for (const c of (data || []) as any[]) {
        const a = areaOfCity.get(c.city_id);
        if (a && isDentalListing(c)) counts[a] = (counts[a] || 0) + 1;
      }
      if (!data || data.length < 1000) break;
    }
    for (const a of dubaiAreas) counts[a.slug] = counts[a.slug] || 0;
    return counts;
  } catch (err) {
    console.error('[dubai area counts] fetch failed', err);
    return {};
  }
}

// ------------------------------------------------------------------ area + treatment page

export interface AreaServiceData {
  clinics: ClinicResult[];
  clinicCount: number;
  /** All clinics in the area, shown (with a notice) when none has confirmed this treatment yet */
  areaClinics: ClinicResult[];
  /** Clinic-listed starting prices, when at least two clinics list one */
  priceRange: { min: number; max: number; n: number } | null;
  /** Figures for every dental clinic in the area */
  areaStats: AreaStats | null;
  /** Hours figures among the clinics that confirmed this treatment (when at least three list hours) */
  treatmentStats: AreaStats | null;
  lateWeekend: LateClinic[];
  /** Blocks of local data on the page that a treatment guide cannot have */
  uniqueBlocks: number;
}

export async function fetchAreaServiceData(areaSlug: string, serviceSlug: string): Promise<AreaServiceData> {
  const empty: AreaServiceData = { clinics: [], clinicCount: 0, areaClinics: [], priceRange: null, areaStats: null, treatmentStats: null, lateWeekend: [], uniqueBlocks: 0 };
  try {
    const { supabase, ids } = await cityIdsFor(areaSlug);
    if (!supabase || ids.length === 0) return empty;
    const rows = await areaClinicRows(supabase, ids);
    const base = {
      ...empty,
      areaClinics: rows.slice(0, CARD_LIMIT).map((c) => toResult(c)),
      areaStats: rows.length ? computeStats(rows) : null,
      lateWeekend: lateWeekendList(rows, 6),
    };
    const { data: treatments } = await supabase.from('treatments').select('id').in('slug', dbSlugsFor(serviceSlug));
    const tIds = (treatments || []).map((t) => t.id);
    if (tIds.length === 0) return base;
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
    const confirmed = rows.filter((r) => priceBy.has(r.id));
    if (confirmed.length === 0) return base;
    const prices = confirmed.map((r) => priceBy.get(r.id)).filter((p): p is number => !!p && p > 0);
    const priceRange = prices.length >= 2 ? { min: Math.min(...prices), max: Math.max(...prices), n: prices.length } : null;
    const tStats = computeStats(confirmed);
    const treatmentStats = tStats.withHours >= 3 ? tStats : null;
    return {
      ...base,
      clinics: confirmed.slice(0, 30).map((c) => toResult(c, priceBy.get(c.id))),
      clinicCount: confirmed.length,
      priceRange,
      treatmentStats,
      uniqueBlocks: (priceRange ? 1 : 0) + (treatmentStats ? 1 : 0),
    };
  } catch (err) {
    console.error('[dubai area service] fetch failed', err);
    return empty;
  }
}
