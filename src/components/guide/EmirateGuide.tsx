import Link from 'next/link';
import { ArrowRight, LocateFixed, ShieldCheck, Car } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { emirateBySlug, hasLocalGuide, services, urls, type EmirateContent, SITE_URL } from '@/content';
import { breadcrumbSchema, clinicListSchema, emiratePageSchema, faqSchema } from '@/content/schema';
import {
  BulletList, ClinicList, FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, PageImageCredits, Section,
  type ClinicSummary,
} from './GuideBlocks';
import { imageForEmirate, imageForService } from '@/content/images';
import { dubaiAreas, DUBAI_AREA_GROUPS, visitReasons } from '@/content/dubai';

export interface CityLink {
  name: string;
  slug: string;
}

export function EmirateGuide({ emirate, clinics, cities }: { emirate: EmirateContent; clinics: ClinicSummary[]; cities: CityLink[] }) {
  const path = urls.emirate(emirate.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Emirates', path: urls.emirates },
    { name: emirate.name, path },
  ];
  const localGuides = services.filter((s) => hasLocalGuide(s.slug, emirate.slug));
  const otherServices = services.filter((s) => !hasLocalGuide(s.slug, emirate.slug));
  const neighbours = emirate.neighbours.map(emirateBySlug).filter(Boolean) as EmirateContent[];
  const heroImage = imageForEmirate(emirate.slug);

  return (
    <PageLayout>
      <SEOHead title={emirate.metaTitle} description={emirate.metaDescription} canonical={path} ogImage={`${SITE_URL}${heroImage.src}`} />
      <JsonLd
        data={[
          emiratePageSchema(emirate, heroImage),
          breadcrumbSchema(crumbs),
          faqSchema(emirate.faqs),
          clinicListSchema(`Dental clinics in ${emirate.name}`, clinics),
        ]}
      />

      <GuideHero
        tone={emirate.tone}
        crumbs={crumbs}
        label={`${emirate.nameAr} · ${emirate.regulator.short}`}
        title={<>Dentists in{' '}<br />{emirate.name}</>}
        answer={emirate.summary}
        image={heroImage}
        badge={{ label: 'Licensing', value: emirate.regulator.name }}
      >
        <Link href={`/find-clinics/?emirate=${emirate.slug}`} className="btn-ink">Browse clinics in {emirate.name} <ArrowRight className="h-4 w-4" /></Link>
        <Link href={`/find-clinics/?emirate=${emirate.slug}&near=me`} className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <Section id="overview" eyebrow="Overview" title={`Finding a dentist in ${emirate.name}`}>
          <div className="prose-guide max-w-3xl">
            {emirate.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Section>

        {emirate.slug === 'dubai' && (
          <>
            <Section id="dubai-areas" eyebrow="Dubai areas" title="Find a dentist by area">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {DUBAI_AREA_GROUPS.map((group) => (
                  <div key={group}>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">{group}</h3>
                    <ul className="space-y-1.5">
                      {dubaiAreas.filter((a) => a.group === group).map((a) => (
                        <li key={a.slug}>
                          <Link href={urls.dubaiArea(a.slug)} className="group flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-black/5 hover:ring-ink">
                            {a.name} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
            <Section id="reasons" eyebrow="Why are you visiting?" title="Start with your reason">
              <div className="flex flex-wrap gap-2">
                {visitReasons.map((r) => (
                  <Link key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">{r.label}</Link>
                ))}
              </div>
            </Section>
          </>
        )}

        <Section id="licensing" eyebrow="Licensing" title="Who licenses dentists here">
          <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <ShieldCheck className="h-7 w-7 text-tone-lemon" />
              <p className="display mt-4 text-5xl">{emirate.regulator.short}</p>
              <p className="mt-1 text-sm text-zinc-300">{emirate.regulator.name}</p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-7">
              <p className="text-[15px] leading-relaxed text-zinc-700">{emirate.regulator.note}</p>
              <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink">{emirate.regulator.checkLicence}</p>
              <Link href="/verification-policy/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink underline">
                How AppointPanda checks listings
              </Link>
            </div>
          </div>
        </Section>

        <Section id="insurance" eyebrow="Insurance" title="What insurance usually covers">
          <div className="rounded-3xl border border-black/10 bg-white p-7">
            <BulletList items={emirate.insurance} tone={emirate.tone} />
            <p className="mt-4 text-sm text-zinc-500">Policies differ. Ask the clinic to confirm cover with your insurer before treatment.</p>
          </div>
        </Section>

        <Section id="areas" eyebrow="Neighbourhoods" title={`Where to find clinics in ${emirate.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {emirate.areas.map((a) => (
              <div key={a.name} className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-semibold text-ink">{a.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{a.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 rounded-2xl bg-tone-sand p-5 text-[15px] leading-relaxed text-ink">
            <Car className="mt-0.5 h-5 w-5 shrink-0" /> {emirate.gettingThere}
          </div>
          {cities.length > 0 && emirate.slug !== 'dubai' && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Browse by area</h3>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Link key={c.slug} href={`/${emirate.slug}/${c.slug}/`} className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-ink">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Section>

        {localGuides.length > 0 && (
          <Section id="treatments" eyebrow="Local treatment guides" title={`Treatments in ${emirate.name}`}>
            <LinkTiles
              columns={4}
              links={localGuides.map((s) => ({ href: urls.serviceEmirate(emirate.slug, s.slug), title: `${s.shortName} in ${emirate.name}`, tone: s.tone, image: imageForService(s.slug) }))}
            />
            {otherServices.length > 0 && (
              <p className="mt-4 text-sm text-zinc-600">
                Also see our general guides to{' '}
                {otherServices.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && (i === otherServices.length - 1 ? ' and ' : ', ')}
                    <Link href={urls.service(s.slug)} className="font-medium text-ink underline">{s.name.toLowerCase()}</Link>
                  </span>
                ))}.
              </p>
            )}
          </Section>
        )}

        <Section id="tips" eyebrow="Practical tips" title="Before you book">
          <ol className="grid gap-3 md:grid-cols-3">
            {emirate.tips.map((tip, i) => (
              <li key={tip} className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
                <span className="display text-3xl text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{tip}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="clinics" eyebrow="Clinics" title={`Dental clinics in ${emirate.name}`}>
          <ClinicList
            clinics={clinics}
            emptyText={`Live listings for ${emirate.name} are not available right now.`}
            moreHref={`/find-clinics/?emirate=${emirate.slug}`}
          />
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={emirate.faqs} />
        </Section>

        {neighbours.length > 0 && (
          <Section eyebrow="Nearby" title="Neighbouring emirates">
            <LinkTiles links={neighbours.map((n) => ({ href: urls.emirate(n.slug), title: `Dentists in ${n.name}`, text: n.summary, tone: n.tone, image: imageForEmirate(n.slug) }))} />
          </Section>
        )}

        <PageImageCredits images={[heroImage, ...localGuides.map((s) => imageForService(s.slug)), ...neighbours.map((n) => imageForEmirate(n.slug))]} />
      </div>

      <GuideCta
        title={`Find your dentist in ${emirate.name}`}
        text="Filter by area, treatment and insurance, then contact the clinic directly."
        href={`/find-clinics/?emirate=${emirate.slug}`}
        cta="Browse clinics"
      />
    </PageLayout>
  );
}
