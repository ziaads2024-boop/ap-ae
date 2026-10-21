import Link from 'next/link';
import { ArrowRight, LocateFixed, ShieldCheck, TrainFront } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { ClinicResults } from '@/components/search/ClinicResults';
import { emirateBySlug, services, SITE_URL, urls } from '@/content';
import { dubaiAreaBySlug, visitReasons, type DubaiArea } from '@/content/dubai';
import { breadcrumbSchema, clinicListSchema, faqSchema } from '@/content/schema';
import { imageForService } from '@/content/images';
import type { AreaData } from '@/lib/dubaiData';
import { FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, PageImageCredits, Section } from './GuideBlocks';

export function areaMeta(area: DubaiArea) {
  return {
    title: `Dentists in ${area.name}, Dubai: Clinics, Insurance & Appointments`,
    description: `Find a dentist in ${area.name}, Dubai. ${area.summary} Compare clinics, check insurance and request an appointment.`.slice(0, 300),
  };
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
  const treatmentLinks = services
    .map((s) => ({ s, n: data.treatmentCounts[s.slug] || 0 }))
    .sort((a, b) => b.n - a.n);
  const nearby = area.nearby.map(dubaiAreaBySlug).filter(Boolean) as DubaiArea[];
  const faqs = [
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

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} ogImage={`${SITE_URL}/images/emirates/dubai.jpg`} />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs), clinicListSchema(`Dental clinics in ${area.name}, Dubai`, data.clinics)]} />

      <GuideHero
        tone={area.tone}
        crumbs={crumbs}
        label={`Dubai · ${area.group}`}
        title={<>Dentists in{' '}<br />{area.name}</>}
        answer={area.summary}
      >
        <Link href={`/find-clinics/?area=${area.slug}`} className="btn-ink">Search clinics in {area.name} <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/find-clinics/?near=me" className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <section className="grid gap-3 pt-10 md:grid-cols-3" aria-label="Key facts">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Listed clinics</p>
            <p className="mt-2 text-lg font-semibold text-ink">{data.clinicCount ? `${data.clinicCount} in ${area.name}` : 'Live count unavailable'}</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"><ShieldCheck className="h-3.5 w-3.5" /> Licensing</p>
            <p className="mt-2 text-lg font-semibold text-ink">{regulator}</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"><TrainFront className="h-3.5 w-3.5" /> Getting there</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{area.gettingThere}</p>
          </div>
        </section>

        <Section id="clinics" eyebrow="Clinics" title={`Dental clinics in ${area.name}`}>
          {data.clinics.length ? (
            <>
              <ClinicResults clinics={data.clinics} />
              <Link href={`/find-clinics/?area=${area.slug}`} className="btn-ghost mt-5">All clinics in {area.name} <ArrowRight className="h-4 w-4" /></Link>
              <p className="mt-3 text-xs text-zinc-500">Sorted by number of Google reviews. Ratings come from Google; listing is not a recommendation.</p>
            </>
          ) : (
            <p className="rounded-3xl border border-dashed border-black/20 bg-white p-6 text-sm text-zinc-600">
              Live listings are not available right now. <Link href={`/find-clinics/?area=${area.slug}`} className="font-semibold underline">Search clinics in {area.name}</Link>
            </p>
          )}
        </Section>

        <Section id="local" eyebrow="Local know-how" title={`Choosing a dentist in ${area.name}`}>
          <div className="prose-guide max-w-3xl">{area.notes.map((n) => <p key={n}>{n}</p>)}</div>
        </Section>

        <Section id="treatments" eyebrow="Treatments" title={`Treatments in ${area.name}`}>
          <LinkTiles
            columns={4}
            links={treatmentLinks.map(({ s, n }) => ({
              href: urls.dubaiAreaService(area.slug, s.slug),
              title: `${s.shortName} in ${area.name}`,
              text: n ? `${n} listed clinic${n === 1 ? '' : 's'}` : 'See clinics',
              tone: s.tone,
              image: imageForService(s.slug),
            }))}
          />
        </Section>

        <Section id="reasons" eyebrow="Why are you visiting?" title="Find care by reason">
          <div className="flex flex-wrap gap-2">
            {visitReasons.map((r) => (
              <Link key={r.slug} href={`/find-clinics/?area=${area.slug}&reason=${r.slug}`} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
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

        <PageImageCredits images={treatmentLinks.map(({ s }) => imageForService(s.slug))} />
      </div>

      <GuideCta
        title={`Request a dentist in ${area.name}`}
        text="Pick a clinic, choose a preferred day and time, and the clinic will call you to confirm."
        href={`/find-clinics/?area=${area.slug}`}
        cta="Find a clinic"
      />
    </PageLayout>
  );
}
