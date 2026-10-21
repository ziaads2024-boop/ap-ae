import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';

// Insurer pages list only clinics that have confirmed the plan on AppointPanda
// (clinic_insurances). Until enough clinics have, the pages stay noindex.

export const MIN_CLINICS_FOR_INSURER_INDEX = 3;

export interface InsurerSummary {
  name: string;
  slug: string;
  clinicCount: number;
}

export async function fetchInsurers(): Promise<InsurerSummary[]> {
  const supabase = createServerSupabaseAdmin();
  if (!supabase) return [];
  const [{ data: insurers }, { data: links }] = await Promise.all([
    supabase.from('insurances').select('id, name, slug').eq('is_active', true).order('display_order').order('name'),
    supabase.from('clinic_insurances').select('insurance_id, clinic_id, clinic:clinics!inner(is_active)').eq('clinic.is_active', true).limit(20000),
  ]);
  const counts = new Map<string, Set<string>>();
  for (const l of (links || []) as any[]) {
    if (!counts.has(l.insurance_id)) counts.set(l.insurance_id, new Set());
    counts.get(l.insurance_id)!.add(l.clinic_id);
  }
  return (insurers || [])
    .filter((i) => i.slug)
    .map((i) => ({ name: i.name, slug: i.slug as string, clinicCount: counts.get(i.id)?.size || 0 }));
}

export async function fetchInsurer(slug: string): Promise<{ name: string; slug: string; clinics: ClinicSummary[]; clinicCount: number } | null> {
  const supabase = createServerSupabaseAdmin();
  if (!supabase) return null;
  const { data: ins } = await supabase.from('insurances').select('id, name, slug').eq('slug', slug).eq('is_active', true).maybeSingle();
  if (!ins) return null;
  const { data: links } = await supabase
    .from('clinic_insurances')
    .select('clinic:clinics!inner(id, name, slug, rating, review_count, verification_status, is_active, city:cities(name, state:states(slug)), area:areas(name))')
    .eq('insurance_id', ins.id)
    .eq('clinic.is_active', true)
    .limit(500);
  const rows = Array.from(new Map(((links || []) as any[]).map((l) => [l.clinic.id, l.clinic])).values())
    .sort((a: any, b: any) => (Number(b.review_count) || 0) - (Number(a.review_count) || 0));
  return {
    name: ins.name,
    slug: ins.slug as string,
    clinicCount: rows.length,
    clinics: rows.slice(0, 20).map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      area: c.area?.name || c.city?.name || null,
      rating: Number(c.rating) || null,
      reviewCount: Number(c.review_count) || null,
      verified: c.verification_status === 'verified',
    })),
  };
}
