import { GetStaticProps, GetStaticPaths } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { normalizeStateSlug } from '@/lib/slug/normalizeStateSlug';
import { emirates, emirateBySlug } from '@/content';
import { EmirateGuide, type CityLink } from '@/components/guide/EmirateGuide';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';
import { fetchGuideClinics } from '@/lib/guideClinics';
import { fetchDubaiAreaCounts } from '@/lib/dubaiData';

// Emirate hub pages. Content is hand-written in src/content/emirates.ts and
// renders without the database; clinic listings and area links are live extras.

interface Props {
  emirateSlug: string;
  clinics: ClinicSummary[];
  cities: CityLink[];
  /** Dental clinics per Dubai area (Dubai hub only) */
  areaCounts: Record<string, number> | null;
}

export default function EmiratePage({ emirateSlug, clinics, cities, areaCounts }: Props) {
  const emirate = emirateBySlug(emirateSlug)!;
  return <EmirateGuide emirate={emirate} clinics={clinics} cities={cities} areaCounts={areaCounts || undefined} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: emirates.map((e) => ({ params: { stateSlug: e.slug } })),
  fallback: 'blocking',
});

async function fetchCities(emirateSlug: string): Promise<CityLink[]> {
  const supabase = createServerSupabaseAdmin();
  if (!supabase) return [];
  try {
    const { data: state } = await supabase.from('states').select('id').eq('slug', emirateSlug).maybeSingle();
    if (!state) return [];
    const { data } = await supabase.from('cities').select('name, slug').eq('state_id', state.id).eq('is_active', true).order('name');
    return (data || []).map((c) => ({ name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const rawSlug = ctx.params?.stateSlug as string;
  const emirateSlug = normalizeStateSlug(rawSlug);

  if (!emirateBySlug(emirateSlug)) {
    return { notFound: true };
  }

  if (emirateSlug !== rawSlug) {
    return { redirect: { destination: `/${emirateSlug}/`, permanent: true } };
  }

  const [clinics, cities, areaCounts] = await Promise.all([
    fetchGuideClinics({ emirateSlug, limit: 10 }),
    fetchCities(emirateSlug),
    emirateSlug === 'dubai' ? fetchDubaiAreaCounts() : Promise.resolve(null),
  ]);

  return {
    props: { emirateSlug, clinics, cities, areaCounts },
    revalidate: 86400,
  };
};
