import { GetStaticProps, GetStaticPaths } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';
import { normalizeStateSlug } from '@/lib/slug/normalizeStateSlug';
import { emirates, emirateBySlug } from '@/content';
import { EmirateGuide, type CityLink } from '@/components/guide/EmirateGuide';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';
import { fetchGuideClinics } from '@/lib/guideClinics';

// Emirate hub pages. Content is hand-written in src/content/emirates.ts and
// renders without the database; clinic listings and area links are live extras.

interface Props {
  emirateSlug: string;
  clinics: ClinicSummary[];
  cities: CityLink[];
}

export default function EmiratePage({ emirateSlug, clinics, cities }: Props) {
  const emirate = emirateBySlug(emirateSlug)!;
  return <EmirateGuide emirate={emirate} clinics={clinics} cities={cities} />;
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

  const [clinics, cities] = await Promise.all([
    fetchGuideClinics({ emirateSlug, limit: 10 }),
    fetchCities(emirateSlug),
  ]);

  return {
    props: { emirateSlug, clinics, cities },
    revalidate: 3600,
  };
};
