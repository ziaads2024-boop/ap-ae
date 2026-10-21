import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CalendarCheck2, LocateFixed, Loader2, MapPin, Search, ShieldCheck, Star, X } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Crumbs } from '@/components/guide/GuideBlocks';
import { AppointmentRequest } from '@/components/booking/AppointmentRequest';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { emirates, services, urls } from '@/content';
import { dubaiAreas, dubaiAreaBySlug, visitReasons, visitReasonBySlug } from '@/content/dubai';
import { cn } from '@/lib/utils';

// Zocdoc-style clinic search, Dubai first. Results are live directory data
// (public, RLS-protected reads); filter URLs canonicalise to /find-clinics/.

interface ClinicRow {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  rating: number | null;
  review_count: number | null;
  cover_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  city: { name: string; slug: string } | null;
  area: { name: string } | null;
  clinic_insurances: { insurance: { name: string } | null }[] | null;
  distanceKm?: number;
}

type GeoState = { status: 'idle' } | { status: 'locating' } | { status: 'ready'; lat: number; lng: number } | { status: 'error'; message: string };
type Sort = 'reviews' | 'rating';

const PAGE_SIZE = 24;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

async function idsForTreatments(slugs: string[]): Promise<string[] | null> {
  if (slugs.length === 0) return null;
  const { data: treatments } = await supabase.from('treatments').select('id').in('slug', slugs);
  const ids = (treatments || []).map((t) => t.id);
  if (ids.length === 0) return [];
  const { data: links } = await supabase.from('clinic_treatments').select('clinic_id').in('treatment_id', ids).limit(3000);
  return Array.from(new Set((links || []).map((l) => l.clinic_id)));
}

async function idsForInsurance(slug: string): Promise<string[] | null> {
  if (!slug) return null;
  const { data: ins } = await supabase.from('insurances').select('id').eq('slug', slug).maybeSingle();
  if (!ins) return [];
  const { data: links } = await supabase.from('clinic_insurances').select('clinic_id').eq('insurance_id', ins.id).limit(3000);
  return (links || []).map((l) => l.clinic_id);
}

const intersect = (a: string[] | null, b: string[] | null) => (a === null ? b : b === null ? a : a.filter((x) => b.includes(x)));

async function fetchClinics(opts: { emirate: string; area: string; treatments: string[]; insurance: string; q: string; sort: Sort; geo?: { lat: number; lng: number }; limit: number }): Promise<ClinicRow[]> {
  let cityIds: string[] | null = null;
  if (opts.area) {
    const area = dubaiAreaBySlug(opts.area);
    const slugs = area ? [area.slug, ...(area.aliases || [])] : [opts.area];
    const { data: cities } = await supabase.from('cities').select('id').in('slug', slugs);
    cityIds = (cities || []).map((c) => c.id);
    if (cityIds.length === 0) return [];
  } else if (opts.emirate) {
    const { data: state } = await supabase.from('states').select('id').eq('slug', opts.emirate).maybeSingle();
    if (!state) return [];
    const { data: cities } = await supabase.from('cities').select('id').eq('state_id', state.id);
    cityIds = (cities || []).map((c) => c.id);
    if (cityIds.length === 0) return [];
  }

  const [byTreatment, byInsurance] = await Promise.all([idsForTreatments(opts.treatments), idsForInsurance(opts.insurance)]);
  const clinicIds = intersect(byTreatment, byInsurance);
  if (clinicIds && clinicIds.length === 0) return [];

  const build = (radiusDeg?: number) => {
    let query = supabase
      .from('clinics')
      .select('id, name, slug, phone, rating, review_count, cover_image_url, latitude, longitude, city:cities(name, slug), area:areas(name), clinic_insurances(insurance:insurances(name))')
      .eq('is_active', true);
    if (cityIds) query = query.in('city_id', cityIds);
    if (clinicIds) query = query.in('id', clinicIds.slice(0, 1000));
    if (opts.q) query = query.ilike('name', `%${opts.q.replace(/[%_,()]/g, ' ')}%`);
    if (opts.geo && radiusDeg) {
      query = query
        .gte('latitude', opts.geo.lat - radiusDeg).lte('latitude', opts.geo.lat + radiusDeg)
        .gte('longitude', opts.geo.lng - radiusDeg).lte('longitude', opts.geo.lng + radiusDeg);
    }
    return query.order(opts.sort === 'rating' ? 'rating' : 'review_count', { ascending: false, nullsFirst: false }).limit(opts.geo ? 300 : opts.limit);
  };

  if (opts.geo) {
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
  const param = (k: string) => (typeof router.query[k] === 'string' ? (router.query[k] as string) : '');
  // Dubai is the default market; "all" searches every emirate.
  const emirateParam = param('emirate');
  const emirate = emirateParam === 'all' ? '' : emirateParam || 'dubai';
  const area = emirate === 'dubai' ? param('area') : '';
  const reasonSlug = param('reason');
  const specialty = param('specialty');
  const insurance = param('insurance');
  const sort: Sort = param('sort') === 'rating' ? 'rating' : 'reviews';
  const wantsNear = router.query.near === 'me';

  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [geo, setGeo] = useState<GeoState>({ status: 'idle' });
  const [requestFor, setRequestFor] = useState<ClinicRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const locate = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeo({ status: 'error', message: 'Your browser does not support location. Choose an area instead.' });
      return;
    }
    setGeo({ status: 'locating' });
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ status: 'ready', lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeo({ status: 'error', message: 'We could not get your location. Allow location access, or choose an area below.' }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  useEffect(() => {
    if (router.isReady && wantsNear && geo.status === 'idle') locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, wantsNear]);

  const setParams = (next: Record<string, string>) => {
    const query: Record<string, string> = {};
    for (const [k, v] of Object.entries({ ...router.query, ...next })) if (typeof v === 'string' && v) query[k] = v;
    setLimit(PAGE_SIZE);
    router.replace({ pathname: '/find-clinics/', query }, undefined, { shallow: true, scroll: false });
  };

  const reason = visitReasonBySlug(reasonSlug);
  const treatmentFilter = specialty ? [specialty] : reason ? reason.services : [];
  const geoCoords = geo.status === 'ready' ? { lat: geo.lat, lng: geo.lng } : undefined;

  const { data: insuranceOptions = [] } = useQuery({
    queryKey: ['insurance-options'],
    queryFn: async () => {
      const { data } = await supabase.from('insurances').select('name, slug').eq('is_active', true).not('slug', 'is', null).order('display_order');
      return (data || []) as { name: string; slug: string }[];
    },
    staleTime: 60 * 60 * 1000,
  });

  const { data: clinics = [], isLoading, isError } = useQuery({
    queryKey: ['find-clinics', emirate, area, treatmentFilter.join(','), insurance, debouncedQ, sort, geoCoords?.lat, geoCoords?.lng, limit],
    queryFn: () => fetchClinics({ emirate, area, treatments: treatmentFilter, insurance, q: debouncedQ, sort, geo: geoCoords, limit }),
    enabled: router.isReady,
    staleTime: 5 * 60 * 1000,
  });

  const emirateName = emirates.find((e) => e.slug === emirate)?.name;
  const areaName = dubaiAreaBySlug(area)?.name;
  const service = services.find((s) => s.slug === specialty);
  const heading = useMemo(() => {
    const what = reason ? `Dentists for ${reason.label.toLowerCase()}` : service ? `${service.shortName} dentists` : 'Dentists';
    if (geoCoords) return `${what} near you`;
    if (areaName) return `${what} in ${areaName}`;
    return emirateName ? `${what} in ${emirateName}` : `${what} in the UAE`;
  }, [reason, service, emirateName, areaName, geoCoords]);

  const select = 'h-12 w-full rounded-full border border-black/10 bg-white px-4 text-sm';

  return (
    <PageLayout>
      <SEOHead
        title="Find a Dentist in Dubai: Search by Area, Treatment & Insurance"
        description="Search dentists in Dubai by area, reason for visit or insurance, compare Google ratings, and request an appointment online."
        canonical="/find-clinics/"
      />

      <section className="px-3 pt-4 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-sky px-6 pb-8 pt-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Find a dentist', path: '/find-clinics/' }]} />
            <h1 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] text-ink">{heading}</h1>

            <div className="mt-6 grid gap-2 rounded-[1.75rem] bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:grid-cols-[1.2fr_1fr_1fr_auto]">
              <label>
                <span className="sr-only">Reason for visit</span>
                <select value={reasonSlug || (specialty ? `t:${specialty}` : '')} onChange={(e) => {
                  const v = e.target.value;
                  if (v.startsWith('t:')) setParams({ specialty: v.slice(2), reason: '' });
                  else setParams({ reason: v, specialty: '' });
                }} className={cn(select, 'border-0 bg-paper')}>
                  <option value="">Any reason or treatment</option>
                  <optgroup label="Reason for visit">
                    {visitReasons.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
                  </optgroup>
                  <optgroup label="Treatment">
                    {services.map((s) => <option key={s.slug} value={`t:${s.slug}`}>{s.name}</option>)}
                  </optgroup>
                </select>
              </label>
              <label>
                <span className="sr-only">Area</span>
                <select value={emirate === 'dubai' ? area : `e:${emirate || 'all'}`} onChange={(e) => {
                  const v = e.target.value;
                  if (v.startsWith('e:')) setParams({ emirate: v.slice(2), area: '' });
                  else setParams({ emirate: 'dubai', area: v });
                }} className={cn(select, 'border-0 bg-paper')}>
                  <option value="">All of Dubai</option>
                  {dubaiAreas.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                  <optgroup label="Other emirates">
                    {emirates.filter((e) => e.slug !== 'dubai').map((e) => <option key={e.slug} value={`e:${e.slug}`}>{e.name}</option>)}
                    <option value="e:all">All emirates</option>
                  </optgroup>
                </select>
              </label>
              <label>
                <span className="sr-only">Insurance</span>
                <select value={insurance} onChange={(e) => setParams({ insurance: e.target.value })} className={cn(select, 'border-0 bg-paper')}>
                  <option value="">Any insurance or self-pay</option>
                  {insuranceOptions.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
                </select>
              </label>
              <button type="button" onClick={locate} className="btn-ink h-12">
                {geo.status === 'locating' ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
                {geoCoords ? 'Update' : 'Near me'}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="relative min-w-[220px] flex-1">
                <span className="sr-only">Search by clinic name</span>
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Clinic name" className="h-10 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-sm" />
              </label>
              <label className="flex items-center gap-2 text-sm text-ink">
                Sort
                <select value={sort} onChange={(e) => setParams({ sort: e.target.value === 'rating' ? 'rating' : '' })} className="h-10 rounded-full border border-black/10 bg-white px-3 text-sm">
                  <option value="reviews">Most reviewed</option>
                  <option value="rating">Highest rated</option>
                </select>
              </label>
            </div>

            {reason && (
              <div className={cn('mt-4 flex gap-3 rounded-2xl p-4 text-sm leading-relaxed', reason.urgency === 'emergency' ? 'bg-tone-blush' : 'bg-white')} role="note">
                {reason.urgency === 'emergency' && <AlertTriangle className="h-5 w-5 shrink-0" />}
                <p>
                  <strong>{reason.label}:</strong> {reason.advice}{' '}
                  <Link href={urls.dubaiReason(reason.slug)} className="font-semibold underline">What to expect</Link>
                </p>
              </div>
            )}
            {geo.status === 'error' && <p className="mt-3 text-sm text-ink/80" role="status">{geo.message}</p>}
            {geoCoords && (
              <p className="mt-3 flex items-center gap-2 text-sm text-ink/80" role="status">
                <MapPin className="h-4 w-4" /> Sorted by distance. Your location stays in your browser.
                <button type="button" onClick={() => setGeo({ status: 'idle' })} className="inline-flex items-center gap-1 font-semibold underline"><X className="h-3.5 w-3.5" /> Clear</button>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10">
        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-36 animate-pulse rounded-3xl bg-white" />)}</div>
        ) : isError ? (
          <p className="rounded-3xl bg-white p-6 text-sm text-zinc-600">We could not load clinics right now. Please try again in a moment.</p>
        ) : clinics.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center">
            <p className="font-semibold text-ink">No clinics match these filters.</p>
            <p className="mt-1 text-sm text-zinc-500">Try a nearby area, remove the insurance filter, or search all of Dubai.</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-zinc-600">{clinics.length}{clinics.length >= limit ? '+' : ''} clinics</p>
            <ul className="space-y-3">
              {clinics.map((c) => {
                const ins = (c.clinic_insurances || []).map((x) => x.insurance?.name).filter(Boolean) as string[];
                const place = c.area?.name || c.city?.name || 'UAE';
                return (
                  <li key={c.id} className="block-card grid gap-4 p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center">
                    <Link href={`/clinic/${c.slug}/`} className="block size-28 overflow-hidden rounded-2xl bg-paper" tabIndex={-1} aria-hidden="true">
                      {c.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.cover_image_url} alt="" loading="lazy" width={112} height={112} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-3xl font-bold text-zinc-300">{c.name.charAt(0)}</div>
                      )}
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/clinic/${c.slug}/`} className="text-lg font-semibold leading-snug text-ink hover:underline">{c.name}</Link>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {place}</span>
                        {c.distanceKm != null && <span className="font-medium text-ink">{c.distanceKm < 1 ? '<1' : c.distanceKm.toFixed(1)} km away</span>}
                        {c.rating && c.review_count ? (
                          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-ink text-ink" /> <strong className="text-ink">{Number(c.rating).toFixed(1)}</strong> ({c.review_count} Google reviews)</span>
                        ) : null}
                      </p>
                      {ins.length > 0 && (
                        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                          {ins.slice(0, 3).map((n) => <span key={n} className="rounded-full bg-tone-sky px-2 py-0.5 font-medium text-ink">{n}</span>)}
                          {ins.length > 3 && <span className="text-zinc-500">+{ins.length - 3} more</span>}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <button type="button" onClick={() => setRequestFor(c)} className="btn-ink flex-1 !py-2.5 text-sm"><CalendarCheck2 className="h-4 w-4" /> Request appointment</button>
                      <Link href={`/clinic/${c.slug}/`} className="btn-ghost flex-1 !py-2.5 text-sm">View profile</Link>
                    </div>
                  </li>
                );
              })}
            </ul>
            {clinics.length >= limit && (
              <div className="mt-8 text-center">
                <button type="button" onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn-ghost">Show more clinics</button>
              </div>
            )}
          </>
        )}

        <p className="mt-8 text-xs text-zinc-500">
          Ratings come from Google and are shown as reported. Results are ordered by your sort choice; inclusion is not a recommendation and no clinic pays to rank higher.{' '}
          <Link href="/verification-policy/" className="underline">How we check listings</Link>
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {areaName && emirate === 'dubai' && <Link href={`/dubai/${dubaiAreaBySlug(area)!.slug}/`} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/10">Guide to dentists in {areaName}</Link>}
          {service && <Link href={urls.service(service.slug)} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/10">Read the {service.name.toLowerCase()} guide</Link>}
          {emirateName && !areaName && <Link href={urls.emirate(emirate)} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/10">Guide to dentists in {emirateName}</Link>}
        </div>
      </div>

      <Dialog open={!!requestFor} onOpenChange={(open) => !open && setRequestFor(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl">
          <DialogTitle className="sr-only">Request an appointment</DialogTitle>
          {requestFor && (
            <AppointmentRequest clinicId={requestFor.id} clinicName={requestFor.name} clinicPhone={requestFor.phone} defaultReason={reasonSlug} />
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
