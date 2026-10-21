import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { LocateFixed, Loader2, MapPin, Search, Star, X } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Crumbs } from '@/components/guide/GuideBlocks';
import { supabase } from '@/integrations/supabase/client';
import { emirates, services, urls } from '@/content';
import { cn } from '@/lib/utils';

// Clinic search. Results come live from the directory (public, RLS-protected
// reads). Filter URLs are canonicalised to /find-clinics/ by SEOHead.

interface ClinicRow {
  id: string;
  name: string;
  slug: string;
  rating: number | null;
  review_count: number | null;
  cover_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  city: { name: string } | null;
  area: { name: string } | null;
  distanceKm?: number;
}

type GeoState = { status: 'idle' } | { status: 'locating' } | { status: 'ready'; lat: number; lng: number } | { status: 'error'; message: string };

const PAGE_SIZE = 24;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

async function fetchClinics(opts: { emirate?: string; specialty?: string; q?: string; geo?: { lat: number; lng: number }; limit: number }): Promise<ClinicRow[]> {
  let cityIds: string[] | null = null;
  if (opts.emirate) {
    const { data: state } = await supabase.from('states').select('id').eq('slug', opts.emirate).maybeSingle();
    if (!state) return [];
    const { data: cities } = await supabase.from('cities').select('id').eq('state_id', state.id);
    cityIds = (cities || []).map((c) => c.id);
    if (cityIds.length === 0) return [];
  }

  let clinicIds: string[] | null = null;
  if (opts.specialty) {
    const { data: treatment } = await supabase.from('treatments').select('id').eq('slug', opts.specialty).maybeSingle();
    if (!treatment) return [];
    const { data: links } = await supabase.from('clinic_treatments').select('clinic_id').eq('treatment_id', treatment.id).limit(2000);
    clinicIds = (links || []).map((l) => l.clinic_id);
    if (clinicIds.length === 0) return [];
  }

  const build = (radiusDeg?: number) => {
    let query = supabase
      .from('clinics')
      .select('id, name, slug, rating, review_count, cover_image_url, latitude, longitude, city:cities(name), area:areas(name)')
      .eq('is_active', true);
    if (cityIds) query = query.in('city_id', cityIds);
    if (clinicIds) query = query.in('id', clinicIds.slice(0, 1000));
    if (opts.q) query = query.ilike('name', `%${opts.q.replace(/[%_,()]/g, ' ')}%`);
    if (opts.geo && radiusDeg) {
      query = query
        .gte('latitude', opts.geo.lat - radiusDeg).lte('latitude', opts.geo.lat + radiusDeg)
        .gte('longitude', opts.geo.lng - radiusDeg).lte('longitude', opts.geo.lng + radiusDeg);
    }
    return query.order('review_count', { ascending: false }).limit(opts.geo ? 300 : opts.limit);
  };

  if (opts.geo) {
    // Widen the search box until we find clinics (roughly 10 km, 30 km, 80 km).
    for (const radius of [0.1, 0.3, 0.75]) {
      const { data } = await build(radius);
      const rows = ((data || []) as unknown as ClinicRow[])
        .filter((c) => c.latitude != null && c.longitude != null)
        .map((c) => ({ ...c, distanceKm: haversineKm(opts.geo!.lat, opts.geo!.lng, c.latitude!, c.longitude!) }))
        .sort((a, b) => a.distanceKm! - b.distanceKm!);
      if (rows.length >= 6 || radius === 0.75) return rows.slice(0, opts.limit);
    }
  }

  const { data, error } = await build();
  if (error) throw error;
  return (data || []) as unknown as ClinicRow[];
}

export default function FindClinicsPage() {
  const router = useRouter();
  const emirate = typeof router.query.emirate === 'string' ? router.query.emirate : '';
  const specialty = typeof router.query.specialty === 'string' ? router.query.specialty : '';
  const wantsNear = router.query.near === 'me';
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [geo, setGeo] = useState<GeoState>({ status: 'idle' });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const locate = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeo({ status: 'error', message: 'Your browser does not support location. Choose an emirate instead.' });
      return;
    }
    setGeo({ status: 'locating' });
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ status: 'ready', lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeo({ status: 'error', message: 'We could not get your location. Allow location access, or choose an emirate below.' }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  useEffect(() => {
    if (router.isReady && wantsNear && geo.status === 'idle') locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, wantsNear]);

  const setParam = (key: string, value: string) => {
    const next = { ...router.query, [key]: value };
    if (!value) delete next[key];
    setLimit(PAGE_SIZE);
    router.replace({ pathname: '/find-clinics/', query: next }, undefined, { shallow: true, scroll: false });
  };

  const geoCoords = geo.status === 'ready' ? { lat: geo.lat, lng: geo.lng } : undefined;
  const { data: clinics = [], isLoading, isError } = useQuery({
    queryKey: ['find-clinics', emirate, specialty, debouncedQ, geoCoords?.lat, geoCoords?.lng, limit],
    queryFn: () => fetchClinics({ emirate, specialty, q: debouncedQ, geo: geoCoords, limit }),
    enabled: router.isReady,
    staleTime: 5 * 60 * 1000,
  });

  const emirateName = emirates.find((e) => e.slug === emirate)?.name;
  const service = services.find((s) => s.slug === specialty);
  const heading = useMemo(() => {
    const what = service ? `${service.shortName} clinics` : 'Dental clinics';
    if (geoCoords) return `${what} near you`;
    return emirateName ? `${what} in ${emirateName}` : `${what} in the UAE`;
  }, [service, emirateName, geoCoords]);

  return (
    <PageLayout>
      <SEOHead
        title="Find a Dentist in the UAE: Search Licensed Dental Clinics"
        description="Search licensed dental clinics across the UAE by emirate, treatment or your current location, and compare Google ratings before you book."
        canonical="/find-clinics/"
      />

      <section className="px-3 pt-4 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-sky px-6 pb-10 pt-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Find a dentist', path: '/find-clinics/' }]} />
            <h1 className="display text-[clamp(2.4rem,6vw,4.75rem)] text-ink">{heading}</h1>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <label className="relative block">
                <span className="sr-only">Search by clinic name</span>
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by clinic name"
                  className="h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
              </label>
              <label>
                <span className="sr-only">Treatment</span>
                <select
                  value={specialty}
                  onChange={(e) => setParam('specialty', e.target.value)}
                  className="h-12 w-full rounded-full border border-black/10 bg-white px-4 text-sm md:w-56"
                >
                  <option value="">All treatments</option>
                  {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </label>
              <button type="button" onClick={locate} className="btn-ink h-12">
                {geo.status === 'locating' ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
                {geoCoords ? 'Update location' : 'Near me'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by emirate">
              <button
                type="button"
                onClick={() => setParam('emirate', '')}
                className={cn('rounded-full px-4 py-1.5 text-sm font-medium', !emirate ? 'bg-ink text-white' : 'bg-white text-ink')}
              >
                All emirates
              </button>
              {emirates.map((e) => (
                <button
                  key={e.slug}
                  type="button"
                  aria-pressed={emirate === e.slug}
                  onClick={() => setParam('emirate', emirate === e.slug ? '' : e.slug)}
                  className={cn('rounded-full px-4 py-1.5 text-sm font-medium', emirate === e.slug ? 'bg-ink text-white' : 'bg-white text-ink')}
                >
                  {e.name}
                </button>
              ))}
            </div>

            {geo.status === 'error' && <p className="mt-4 text-sm text-ink/80" role="status">{geo.message}</p>}
            {geoCoords && (
              <p className="mt-4 flex items-center gap-2 text-sm text-ink/80" role="status">
                <MapPin className="h-4 w-4" /> Sorted by distance from your location. Your location stays in your browser.
                <button type="button" onClick={() => setGeo({ status: 'idle' })} className="inline-flex items-center gap-1 font-semibold underline">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-10">
        {isLoading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-3xl bg-white" />)}
          </div>
        ) : isError ? (
          <p className="rounded-3xl bg-white p-6 text-sm text-zinc-600">We could not load clinics right now. Please try again in a moment.</p>
        ) : clinics.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center">
            <p className="font-semibold text-ink">No clinics match these filters.</p>
            <p className="mt-1 text-sm text-zinc-500">Try another emirate or treatment, or clear the search.</p>
          </div>
        ) : (
          <>
            <ul className="grid gap-3 md:grid-cols-2">
              {clinics.map((c) => (
                <li key={c.id}>
                  <Link href={`/clinic/${c.slug}/`} className="block-card flex gap-4 p-4">
                    <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-paper">
                      {c.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.cover_image_url} alt="" loading="lazy" width={80} height={80} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-2xl font-bold text-zinc-300">{c.name.charAt(0)}</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-ink line-clamp-2">{c.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{c.area?.name || c.city?.name || 'UAE'}</span>
                        {c.distanceKm != null && <span className="shrink-0 font-medium text-ink">· {c.distanceKm < 1 ? '<1' : c.distanceKm.toFixed(1)} km</span>}
                      </p>
                      {c.rating && c.review_count ? (
                        <p className="mt-1.5 flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-ink" /> <span className="font-semibold">{Number(c.rating).toFixed(1)}</span>
                          <span className="text-zinc-500">({c.review_count} Google reviews)</span>
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {clinics.length >= limit && (
              <div className="mt-8 text-center">
                <button type="button" onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn-ghost">Show more clinics</button>
              </div>
            )}
          </>
        )}

        <p className="mt-8 text-xs text-zinc-500">
          Ratings come from Google and are shown as reported. Inclusion in the directory is not a recommendation.{' '}
          <Link href="/verification-policy/" className="underline">How we check listings</Link>
        </p>

        {(service || emirateName) && (
          <div className="mt-8 flex flex-wrap gap-2">
            {service && <Link href={urls.service(service.slug)} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/10">Read the {service.name.toLowerCase()} guide</Link>}
            {emirateName && <Link href={urls.emirate(emirate)} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/10">Guide to dentists in {emirateName}</Link>}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
