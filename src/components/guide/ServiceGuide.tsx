import Link from 'next/link';
import { ArrowRight, LocateFixed } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  emirates, formatAed, hasLocalGuide, isLiveEmirate, serviceBySlug, urls,
  type ServiceContent, SITE_URL,
} from '@/content';
import { breadcrumbSchema, faqSchema, servicePageSchema, clinicListSchema } from '@/content/schema';
import {
  BulletList, ClinicList, FactGrid, FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, PageImageCredits, Section,
  type ClinicSummary,
} from './GuideBlocks';
import { imageForEmirate, imageForService } from '@/content/images';

export function ServiceGuide({ service, clinics }: { service: ServiceContent; clinics: ClinicSummary[] }) {
  const path = urls.service(service.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Treatments', path: urls.services },
    { name: service.name, path },
  ];
  const related = service.related.map(serviceBySlug).filter(Boolean) as ServiceContent[];
  const heroImage = imageForService(service.slug);

  return (
    <PageLayout>
      <SEOHead title={service.metaTitle} description={service.metaDescription} canonical={path} ogImage={`${SITE_URL}${heroImage.src}`} />
      <JsonLd
        data={[
          servicePageSchema(service, heroImage),
          breadcrumbSchema(crumbs),
          faqSchema(service.faqs),
          clinicListSchema(`${service.name} clinics in the UAE`, clinics),
        ]}
      />

      <GuideHero
        tone={service.tone}
        crumbs={crumbs}
        label="Treatment guide"
        title={`${service.name} in the UAE`}
        answer={service.summary}
        image={heroImage}
        badge={{ label: 'Indicative cost', value: `From ${formatAed(service.price.from)}` }}
      >
        <Link href={`/find-clinics/?specialty=${service.slug}`} className="btn-ink">Find a clinic <ArrowRight className="h-4 w-4" /></Link>
        <Link href={`/find-clinics/?specialty=${service.slug}&near=me`} className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <section className="pt-10" aria-label="Key facts">
          <FactGrid
            facts={[
              { label: 'Indicative cost', value: `${formatAed(service.price.from)} – ${formatAed(service.price.to)}`, note: `${service.price.unit}. ${service.price.note}` },
              { label: 'Treatment time', value: service.duration },
              { label: 'Recovery', value: service.recovery },
            ]}
          />
        </section>

        <Section id="overview" eyebrow="Overview" title={`What to know about ${service.name}`}>
          <div className="prose-guide max-w-3xl">
            {service.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Section>

        <Section id="suitability" eyebrow="Is it right for you?" title="Who it suits">
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

        <Section id="process" eyebrow="Step by step" title="What happens during treatment">
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

        <Section id="cost" eyebrow="Cost" title={`How much does ${service.shortName.toLowerCase()} cost in the UAE?`}>
          <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-tone-lemon">Indicative private-clinic range</p>
              <p className="display mt-3 text-5xl">{formatAed(service.price.from)} – {formatAed(service.price.to)}</p>
              <p className="mt-2 text-sm text-zinc-300">{service.price.unit}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{service.price.note} Always ask for a written, itemised quote; this range is a guide, not a price.</p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-7">
              <h3 className="mb-4 font-semibold text-ink">What changes the price</h3>
              <BulletList items={service.priceFactors} tone="lemon" />
            </div>
          </div>
        </Section>

        <Section id="risks" eyebrow="Know before you go" title="Risks and alternatives">
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
                      {a.slug ? <Link href={urls.service(a.slug)} className="font-semibold text-ink underline">{a.name}</Link> : <strong className="text-ink">{a.name}</strong>}
                      {' '}— {a.note}
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

        <Section id="by-emirate" eyebrow="Local guides" title={`${service.shortName} in Dubai`}>
          <LinkTiles
            columns={4}
            links={emirates.map((e) =>
              hasLocalGuide(service.slug, e.slug)
                ? { href: urls.serviceEmirate(e.slug, service.slug), title: `${service.shortName} in ${e.name}`, text: isLiveEmirate(e.slug) ? `Local guide · ${e.regulator.short}-licensed clinics` : 'Coming soon · guide for information', tone: isLiveEmirate(e.slug) ? e.tone : undefined, image: imageForEmirate(e.slug) }
                : { href: urls.emirate(e.slug), title: `Dentists in ${e.name}`, text: isLiveEmirate(e.slug) ? 'Emirate guide' : 'Coming soon', image: imageForEmirate(e.slug) }
            )}
          />
        </Section>

        <Section id="clinics" eyebrow="Clinics" title={`Clinics offering ${service.shortName.toLowerCase()}`}>
          <ClinicList
            clinics={clinics}
            emptyText="Clinics have not yet confirmed on AppointPanda which treatments they offer, so we do not list clinics for this treatment yet."
            moreHref={`/find-clinics/?specialty=${service.slug}`}
          />
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={service.faqs} />
        </Section>

        <Section eyebrow="Keep reading" title="Related treatments">
          <LinkTiles links={related.map((r) => ({ href: urls.service(r.slug), title: r.name, text: r.summary, tone: r.tone, image: imageForService(r.slug) }))} />
        </Section>

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[heroImage, ...emirates.map((e) => imageForEmirate(e.slug)), ...related.map((r) => imageForService(r.slug))]} />
        </div>
      </div>

      <GuideCta
        title="Ready to compare clinics?"
        text={`Filter licensed clinics by emirate and insurance, then ask for a written quote for ${service.shortName.toLowerCase()}.`}
        href={`/find-clinics/?specialty=${service.slug}`}
        cta="Find a clinic"
      />
    </PageLayout>
  );
}
