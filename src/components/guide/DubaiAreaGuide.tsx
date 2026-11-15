import Link from 'next/link';
import { ArrowRight, LocateFixed, ShieldCheck, TrainFront } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { ClinicResults } from '@/components/search/ClinicResults';
import { emirateBySlug, services, SITE_URL, urls } from '@/content';
import { MIN_AREA_CLINICS_TO_INDEX, neighboursOf, visitReasons, type DubaiArea } from '@/content/dubai';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { imageForService } from '@/content/images';
import type { AreaData, AreaStats, LateClinic } from '@/lib/dubaiData';
import { FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, PageImageCredits, Section } from './GuideBlocks';
import { clip, fitTitle } from '@/lib/metaText';

/** Area name for titles: drop the ", Dubai" when the name already says Dubai. */
const withCity = (name: string) => (/dubai/i.test(name) || name.length > 34 ? name : `${name}, Dubai`);

export function areaMeta(area: DubaiArea) {
  return {
    title: fitTitle(`Dentists in ${withCity(area.name)}`, ': Compare Clinics', 50),
    description: clip(`Find a dentist in ${withCity(area.name)}. ${area.summary} Compare clinics and request an appointment.`),
  };
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const formatAsOf = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** One factual sentence built only from live figures. */
export function areaFactSentence(areaName: string, s: AreaStats): string {
  const parts = [`${plural(s.clinicCount, 'dental clinic')} ${s.clinicCount === 1 ? 'is' : 'are'} listed in ${areaName}.`];
  if (s.withHours >= 3) {
    parts.push(`Of the ${s.withHours} that list opening hours, ${s.openFriday} open on Friday, ${s.openSaturday} on Saturday and ${s.openLate} stay open after 9 pm on at least one day.`);
  }
  if (s.medianRating !== null && s.ratedCount >= 3) {
    parts.push(`The median Google rating is ${s.medianRating.toFixed(1)} across ${s.totalReviews.toLocaleString('en-GB')} reviews.`);
  }
  return parts.join(' ');
}

/** Compact facts grid; every number comes from the live listings. */
export function AreaFacts({ areaName, stats, scope }: { areaName: string; stats: AreaStats; scope?: string }) {
  const hours = stats.withHours >= 3;
  const facts = [
    { label: 'Dental clinics listed', value: stats.clinicCount.toLocaleString('en-GB') },
    ...(hours
      ? [
          { label: 'Open on Friday', value: `${stats.openFriday} of ${stats.withHours}` },
          { label: 'Open on Saturday', value: `${stats.openSaturday} of ${stats.withHours}` },
          { label: 'Open after 9 pm', value: `${stats.openLate} of ${stats.withHours}` },
        ]
      : []),
    ...(hours && stats.open24h > 0 ? [{ label: 'Open 24 hours', value: String(stats.open24h) }] : []),
    ...(stats.medianRating !== null && stats.ratedCount >= 3
      ? [
          { label: 'Median Google rating', value: stats.medianRating.toFixed(1) },
          { label: 'Google reviews in total', value: stats.totalReviews.toLocaleString('en-GB') },
        ]
      : []),
  ];
  return (
    <div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-black/10 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{f.label}</dt>
            <dd className="mt-1 text-2xl font-semibold text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        {scope || `All dental clinics listed in ${areaName}`} on AppointPanda, as of {formatAsOf(stats.asOf)}. Hours figures are based on listed hours
        {hours ? ` (${stats.withHours} of ${stats.clinicCount} clinics list them)` : ''}; confirm with the clinic before you go. Ratings are from Google.
      </p>
    </div>
  );
}

export function LateWeekendList({ clinics }: { clinics: LateClinic[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {clinics.map((c) => (
        <li key={c.slug}>
          <Link prefetch={false} href={`/clinic/${c.slug}/`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 hover:ring-ink">
            <span className="font-medium text-ink">{c.name}</span>
            <span className="shrink-0 text-xs text-zinc-600">
              {c.latestClose === '24 hours' ? '24 hours' : `Until ${c.latestClose}`} · {[c.friday && 'Fri', c.saturday && 'Sat'].filter(Boolean).join(' & ')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DubaiAreaGuide({ area, data }: { area: DubaiArea; data: AreaData }) {
  const dubai = emirateBySlug('dubai')!;
  const path = urls.dubaiArea(area.slug);
  const { title, description } = areaMeta(area);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Dubai', path: urls.emirate('dubai') },
    { name: area.name, path },
  ];
  const isDhcc = area.slug === 'healthcare-city';
  const regulator = isDhcc ? 'Dubai Healthcare City Authority' : dubai.regulator.name;
  // Figures are hidden where the database mixes in clinics from elsewhere (see dubai.ts)
  const stats = area.mixedAssignments ? null : data.stats;
  const thin = data.loaded !== false && data.clinicCount < MIN_AREA_CLINICS_TO_INDEX;
  const treatmentLinks = services
    .map((s) => ({ s, n: data.treatmentCounts[s.slug] || 0 }))
    .sort((a, b) => b.n - a.n);
  const nearby = neighboursOf(area.slug);
  const allListed = [...data.clinics, ...data.moreClinics];
  const faqs = [
    ...(stats && stats.withHours >= 3
      ? [{
          q: `Are dentists in ${area.name} open on Friday and Saturday?`,
          a: `Based on listed hours, ${stats.openFriday} of the ${stats.withHours} clinics in ${area.name} that list hours open on Friday and ${stats.openSaturday} on Saturday; ${stats.openLate} stay open after 9 pm on at least one day. Hours change, so confirm with the clinic before you go.`,
        }]
      : []),
    {
      q: `How do I check a dentist's licence in ${area.name}?`,
      a: isDhcc
        ? 'Clinics inside Dubai Healthcare City are licensed by the Dubai Healthcare City Authority. Check a dentist there with that authority rather than the DHA.'
        : `Dentists in ${area.name} are licensed by the Dubai Health Authority (DHA). You can look up an individual dentist's licence on the DHA website before you book.`,
    },
    {
      q: `Will my insurance cover a dentist in ${area.name}?`,
      a: 'Dubai\'s mandatory basic health insurance generally excludes routine dental care. If your employer plan has a dental benefit, filter by your insurer and confirm cover with the clinic before treatment.',
    },
    { q: `How do I get to a dentist in ${area.name}?`, a: area.gettingThere },
  ];

  const itemList = allListed.length
    ? {
        '@type': 'ItemList',
        name: `Dental clinics in ${withCity(area.name)}`,
        numberOfItems: data.clinicCount,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: allListed.slice(0, 30).map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/clinic/${c.slug}/`, name: c.name })),
      }
    : null;
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { '@type': 'WebSite', name: 'AppointPanda', url: SITE_URL },
    about: {
      '@type': 'Place',
      name: area.name,
      containedInPlace: { '@type': 'City', name: 'Dubai' },
      ...(stats?.centroid ? { geo: { '@type': 'GeoCoordinates', latitude: stats.centroid.lat, longitude: stats.centroid.lng } } : {}),
    },
    ...(stats ? { dateModified: stats.asOf } : {}),
    ...(itemList ? { mainEntity: itemList } : {}),
  };

  const answer = stats ? `${areaFactSentence(area.name, stats)} ${area.summary}` : area.summary;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} noindex={thin} ogImage={`${SITE_URL}/images/emirates/dubai.jpg`} />
      <JsonLd data={[pageSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />

      <GuideHero
        tone={area.tone}
        crumbs={crumbs}
        label={`Dubai · ${area.group}`}
        title={<>Dentists in{' '}<br />{area.name}</>}
        answer={answer}
      >
        <a href="#clinics" className="btn-ink">See clinics in {area.name} <ArrowRight className="h-4 w-4" /></a>
        <Link prefetch={false} href="/find-clinics/?near=me" className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        {stats && (
          <Section id="at-a-glance" eyebrow="At a glance" title={`${area.name} in numbers`}>
            <AreaFacts areaName={area.name} stats={stats} />
          </Section>
        )}

        <section className="grid gap-3 pt-6 md:grid-cols-2" aria-label="Key facts">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"><ShieldCheck className="h-3.5 w-3.5" /> Licensing</p>
            <p className="mt-2 text-lg font-semibold text-ink">{regulator}</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"><TrainFront className="h-3.5 w-3.5" /> Getting there</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{area.gettingThere}</p>
          </div>
        </section>

        {area.mixedAssignments && (
          <p className="mt-6 rounded-2xl bg-tone-lemon p-4 text-sm leading-relaxed text-ink" role="note">
            Some clinics below are located elsewhere in Dubai and are filed under {area.name} in our listings. We are correcting their areas from their map positions; check each clinic&apos;s address before you go.
          </p>
        )}

        <Section id="clinics" eyebrow="Clinics" title={`Dental clinics in ${area.name}`}>
          {data.clinics.length ? (
            <>
              <ClinicResults clinics={data.clinics} />
              <p className="mt-3 text-xs text-zinc-500">Sorted by number of Google reviews. Ratings come from Google; listing is not a recommendation.</p>
              {data.moreClinics.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">More dental clinics in {area.name}</h3>
                  <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    {data.moreClinics.map((c) => (
                      <li key={c.slug}><Link prefetch={false} href={`/clinic/${c.slug}/`} className="text-ink underline decoration-black/20 underline-offset-2 hover:decoration-ink">{c.name}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
              {data.clinicCount > allListed.length && (
                <Link prefetch={false} href={`/find-clinics/?area=${area.slug}`} className="btn-ghost mt-5">Search all {data.clinicCount} with filters <ArrowRight className="h-4 w-4" /></Link>
              )}
            </>
          ) : (
            <p className="rounded-3xl border border-dashed border-black/20 bg-white p-6 text-sm text-zinc-600">
              No dental clinics are listed in {area.name} yet.
              {nearby.length > 0 && <> Try {nearby.slice(0, 3).map((n, i) => (
                <span key={n.slug}>{i > 0 && ', '}<Link prefetch={false} href={urls.dubaiArea(n.slug)} className="font-semibold underline">{n.name}</Link></span>
              ))}.</>}
            </p>
          )}
        </Section>

        {stats && data.lateWeekend.length > 0 && (
          <Section id="late-weekend" eyebrow="Evenings and weekends" title={`Late-night and weekend dentists in ${area.name}`}>
            <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-zinc-700">
              Clinics in {area.name} whose listed hours run past 9 pm and include Friday or Saturday, most-reviewed first. Based on listed hours; call ahead.
            </p>
            <LateWeekendList clinics={data.lateWeekend} />
          </Section>
        )}

        <Section id="local" eyebrow="Local know-how" title={`Choosing a dentist in ${area.name}`}>
          <div className="prose-guide max-w-3xl">{area.notes.map((n) => <p key={n}>{n}</p>)}</div>
        </Section>

        <Section id="treatments" eyebrow="Treatments" title={`Treatments in ${area.name}`}>
          <LinkTiles
            columns={4}
            links={treatmentLinks.slice(0, 6).map(({ s, n }) => ({
              href: urls.dubaiAreaService(area.slug, s.slug),
              title: `${s.name} in ${area.name}`,
              text: n ? `${plural(n, 'listed clinic')}` : 'Clinics and prices',
              tone: s.tone,
              image: imageForService(s.slug),
            }))}
          />
          <p className="mt-4 text-sm text-zinc-600">
            Treatment guides:{' '}
            {services.map((s, i) => (
              <span key={s.slug}>{i > 0 && ', '}<Link prefetch={false} href={urls.service(s.slug)} className="font-medium text-ink underline">{s.name.toLowerCase()}</Link></span>
            ))}.
          </p>
        </Section>

        <Section id="reasons" eyebrow="Why are you visiting?" title="Find care by reason">
          <div className="flex flex-wrap gap-2">
            {visitReasons.map((r) => (
              <Link prefetch={false} key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                {r.label}
              </Link>
            ))}
          </div>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={faqs} />
        </Section>

        {nearby.length > 0 && (
          <Section eyebrow="Nearby" title="Neighbouring areas">
            <LinkTiles links={nearby.map((n) => ({ href: urls.dubaiArea(n.slug), title: `Dentists in ${n.name}`, text: n.summary, tone: n.tone }))} />
          </Section>
        )}

        <PageImageCredits images={treatmentLinks.slice(0, 6).map(({ s }) => imageForService(s.slug))} />
      </div>

      <GuideCta
        title={`Request a dentist in ${area.name}`}
        text="Pick a clinic, choose a preferred day and time, and the clinic will call you to confirm."
        href={`/find-clinics/?area=${area.slug}`}
        cta="Search with filters"
      />
    </PageLayout>
  );
}
