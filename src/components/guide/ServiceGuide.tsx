import Link from 'next/link';
import { ArrowRight, Calculator, LocateFixed, MapPin } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  emirateBySlug, formatAed, hasLocalGuide, serviceBySlug, urls,
  type CostTable, type ServiceContent, type Source, SITE_URL,
} from '@/content';
import { answerOf, costQuestionOf, costTableOf, headingOf, phraseOf } from '@/content/services';
import { reasonsForService } from '@/content/dubai';
import { breadcrumbSchema, faqSchema, servicePageSchema, clinicListSchema } from '@/content/schema';
import {
  BulletList, ClinicList, FactGrid, FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, PageImageCredits, Section,
  type ClinicSummary,
} from './GuideBlocks';
import { imageForEmirate, imageForService } from '@/content/images';

export const COST_CALCULATOR = '/tools/dental-cost-calculator/';

const range = (from: number, to: number) => `${formatAed(from)} – ${formatAed(to)}`;

/** Indicative price breakdown as a real HTML table (easier for search engines and AI answers to read). */
export function CostTableBlock({ table, place = 'Dubai' }: { table: CostTable; place?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          <caption className="px-6 pb-2 pt-5 text-left text-sm font-semibold text-ink">{table.caption}</caption>
          <thead>
            <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-zinc-500">
              <th scope="col" className="px-6 py-3 font-semibold">Treatment or item</th>
              <th scope="col" className="px-6 py-3 font-semibold">Indicative range (AED)</th>
              <th scope="col" className="px-6 py-3 font-semibold">Priced</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.item} className="border-b border-black/5 align-top last:border-0">
                <th scope="row" className="px-6 py-3 font-medium text-ink">
                  {row.item}
                  {row.note && <span className="mt-0.5 block text-xs font-normal text-zinc-500">{row.note}</span>}
                </th>
                <td className="whitespace-nowrap px-6 py-3 font-semibold text-ink">{range(row.from, row.to)}</td>
                <td className="px-6 py-3 text-zinc-600">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-black/10 bg-paper px-6 py-4 text-sm leading-relaxed text-zinc-600">
        Indicative ranges for private clinics in {place}, not quotes. Prices depend on your case and the clinic; ask for a written, itemised quote.
        {table.note ? ` ${table.note}` : ''}
      </p>
    </div>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  const unique = sources.filter((s, i) => sources.findIndex((x) => x.url === s.url) === i);
  if (unique.length === 0) return null;
  return (
    <ul className="space-y-2 text-[15px] leading-relaxed text-zinc-700">
      {unique.map((s) => (
        <li key={s.url}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline">{s.label}</a>
        </li>
      ))}
    </ul>
  );
}

export function ServiceGuide({ service, clinics }: { service: ServiceContent; clinics: ClinicSummary[] }) {
  const path = urls.service(service.slug);
  const heading = headingOf(service);
  const phrase = phraseOf(service);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Treatments', path: urls.services },
    { name: heading, path },
  ];
  const related = service.related.map(serviceBySlug).filter(Boolean) as ServiceContent[];
  const heroImage = imageForService(service.slug);
  const dubai = emirateBySlug('dubai')!;
  // Only Dubai is live; coming-soon emirates are noindex, so they are not linked from here.
  const dubaiGuide = hasLocalGuide(service.slug, 'dubai') ? urls.serviceEmirate('dubai', service.slug) : null;
  const reasons = reasonsForService(service.slug);
  const table = costTableOf(service);

  return (
    <PageLayout>
      <SEOHead title={service.metaTitle} description={service.metaDescription} canonical={path} ogImage={`${SITE_URL}${heroImage.src}`} />
      <JsonLd
        data={[
          servicePageSchema(service, heroImage),
          breadcrumbSchema(crumbs),
          faqSchema(service.faqs),
          clinicListSchema(`${heading} clinics in Dubai`, clinics),
        ]}
      />

      <GuideHero
        tone={service.tone}
        crumbs={crumbs}
        label="Treatment guide"
        title={service.h1 ?? heading}
        answer={answerOf(service)}
        image={heroImage}
        badge={{ label: 'Indicative Dubai cost', value: `From ${formatAed(service.price.from)}` }}
      >
        <Link prefetch={false} href={`/find-clinics/?specialty=${service.slug}`} className="btn-ink">Find a clinic <ArrowRight className="h-4 w-4" /></Link>
        <Link prefetch={false} href={`/find-clinics/?specialty=${service.slug}&near=me`} className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
        {dubaiGuide && (
          <Link prefetch={false} href={dubaiGuide} className="btn-ghost"><MapPin className="h-4 w-4" /> {heading} clinics and prices in Dubai</Link>
        )}
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <section className="pt-10" aria-label="Key facts">
          <FactGrid
            facts={[
              { label: 'Indicative cost in Dubai', value: range(service.price.from, service.price.to), note: `${service.price.unit}. ${service.price.note}` },
              { label: 'Treatment time', value: service.duration },
              { label: 'Recovery', value: service.recovery },
            ]}
          />
        </section>

        <Section id="overview" eyebrow="Overview" title={`What to know about ${phrase}`}>
          <div className="prose-guide max-w-3xl">
            {service.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Section>

        <Section id="suitability" eyebrow="Is it right for you?" title="Who it suits, and who may need another option">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-tone-lime p-6">
              <h3 className="mb-4 font-semibold text-ink">Often a good fit</h3>
              <BulletList items={service.goodFor} tone="lime" />
            </div>
            {service.notIdealFor.length > 0 && (
              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
                <h3 className="mb-4 font-semibold text-ink">May need another option first</h3>
                <BulletList items={service.notIdealFor} tone="blush" />
              </div>
            )}
          </div>
        </Section>

        <Section id="process" eyebrow="Step by step" title="What happens during treatment?">
          <ol className="grid gap-3 md:grid-cols-2">
            {service.steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl border border-black/10 bg-white p-6">
                <span className="display text-4xl text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="cost" eyebrow="Cost" title={costQuestionOf(service)}>
          <CostTableBlock table={table} />
          <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl border border-black/10 bg-white p-7">
              <h3 className="mb-4 font-semibold text-ink">What changes the price</h3>
              <BulletList items={service.priceFactors} tone="lemon" />
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-3xl bg-ink p-7 text-white">
              <p className="text-sm leading-relaxed text-zinc-300">
                Estimate a total for your own plan, including scans, extras and insurance, with the cost calculator.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link prefetch={false} href={COST_CALCULATOR} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"><Calculator className="h-4 w-4" /> Dental cost calculator</Link>
                {dubaiGuide && (
                  <Link prefetch={false} href={dubaiGuide} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white">{heading} in Dubai: areas and insurance</Link>
                )}
              </div>
            </div>
          </div>
        </Section>

        <Section id="risks" eyebrow="Know before you go" title="What are the risks, and what are the alternatives?">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h3 className="mb-4 font-semibold text-ink">Possible risks</h3>
              <BulletList items={service.risks} tone="blush" />
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h3 className="mb-4 font-semibold text-ink">Alternatives to discuss</h3>
              {service.alternatives.length ? (
                <ul className="space-y-3">
                  {service.alternatives.map((a) => (
                    <li key={a.name} className="text-[15px] leading-relaxed text-zinc-700">
                      {a.slug && serviceBySlug(a.slug) ? <Link prefetch={false} href={urls.service(a.slug)} className="font-semibold text-ink underline">{a.name}</Link> : <strong className="text-ink">{a.name}</strong>}
                      {': '}{a.note}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] text-zinc-600">Your dentist will discuss whether another approach suits your situation.</p>
              )}
            </div>
          </div>
        </Section>

        <Section id="questions" eyebrow="Your consultation" title="Questions to ask your dentist">
          <ol className="grid gap-3 md:grid-cols-2">
            {service.questionsToAsk.map((q) => (
              <li key={q} className="rounded-2xl bg-tone-sky p-5 text-[15px] font-medium leading-snug text-ink">“{q}”</li>
            ))}
          </ol>
        </Section>

        {(dubaiGuide || reasons.length > 0) && (
          <Section id="dubai" eyebrow="Local guide" title={`${heading} in Dubai`}>
            {dubaiGuide && (
              <LinkTiles
                columns={2}
                links={[{
                  href: dubaiGuide,
                  title: `${heading} in Dubai: clinics, prices and areas`,
                  text: `${dubai.regulator.short} and DHCC licensing, insurance in Dubai and the areas where clinics are`,
                  tone: dubai.tone,
                  image: imageForEmirate('dubai'),
                }]}
              />
            )}
            {reasons.length > 0 && (
              <div className={dubaiGuide ? 'mt-6' : ''}>
                <h3 className="mb-3 font-semibold text-ink">Common reasons people book this</h3>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <Link prefetch={false} key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                      {r.label} in Dubai
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}

        <Section id="clinics" eyebrow="Clinics" title={`Clinics offering ${phrase}`}>
          <ClinicList
            clinics={clinics}
            emptyText="Clinics have not yet confirmed on AppointPanda which treatments they offer, so we do not list clinics for this treatment yet."
            moreHref={`/find-clinics/?specialty=${service.slug}`}
          />
        </Section>

        <Section id="faq" eyebrow="FAQ" title={`Common questions about ${phrase}`}>
          <FaqList faqs={service.faqs} />
        </Section>

        {service.sources && service.sources.length > 0 && (
          <Section id="sources" eyebrow="References" title="Sources">
            <SourceList sources={service.sources} />
            <p className="mt-4 text-sm text-zinc-500">Clinical descriptions follow these public sources. Prices are AppointPanda&apos;s indicative ranges for private clinics in Dubai.</p>
          </Section>
        )}

        {related.length > 0 && (
          <Section eyebrow="Keep reading" title="Related treatments">
            <LinkTiles links={related.map((r) => ({ href: urls.service(r.slug), title: headingOf(r), text: r.summary, tone: r.tone, image: imageForService(r.slug) }))} />
          </Section>
        )}

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[heroImage, ...(dubaiGuide ? [imageForEmirate('dubai')] : []), ...related.map((r) => imageForService(r.slug))]} />
        </div>
      </div>

      <GuideCta
        title={`Get itemised quotes for ${phrase}`}
        text="Shortlist two or three DHA-licensed clinics in Dubai and ask each for a written quote that lists every item, so you can compare like for like."
        href={`/find-clinics/?specialty=${service.slug}`}
        cta="Find a clinic"
      />
    </PageLayout>
  );
}
