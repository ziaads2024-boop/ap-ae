import Link from 'next/link';
import { ArrowRight, LocateFixed } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  emirates, formatAed, hasLocalGuide, insuranceNote, services, urls,
  type EmirateContent, type ServiceContent, type ServiceEmirateContent,
} from '@/content';
import { breadcrumbSchema, clinicListSchema, faqSchema, serviceEmiratePageSchema } from '@/content/schema';
import {
  BulletList, ClinicList, FactGrid, FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, Section,
  type ClinicSummary,
} from './GuideBlocks';

export function serviceEmirateMeta(service: ServiceContent, emirate: EmirateContent) {
  return {
    title: `${service.shortName} in ${emirate.name}: Costs, Clinics & Advice`,
    description: `A local guide to ${service.name.toLowerCase()} in ${emirate.name}: ${emirate.regulator.short} licensing, insurance, indicative costs from ${formatAed(service.price.from)}, and licensed clinics near you.`,
  };
}

export function ServiceEmirateGuide({
  service, emirate, local, clinics,
}: { service: ServiceContent; emirate: EmirateContent; local: ServiceEmirateContent; clinics: ClinicSummary[] }) {
  const path = urls.serviceEmirate(emirate.slug, service.slug);
  const { title, description } = serviceEmirateMeta(service, emirate);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: emirate.name, path: urls.emirate(emirate.slug) },
    { name: service.name, path },
  ];
  const faqs = [...local.faqs, emirate.faqs[0]].filter(Boolean);
  const otherEmirates = emirates.filter((e) => e.slug !== emirate.slug && hasLocalGuide(service.slug, e.slug));
  const otherServices = services.filter((s) => s.slug !== service.slug && hasLocalGuide(s.slug, emirate.slug));

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} />
      <JsonLd
        data={[
          serviceEmiratePageSchema(service, emirate, title, description),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
          clinicListSchema(`${service.name} clinics in ${emirate.name}`, clinics),
        ]}
      />

      <GuideHero
        tone={service.tone}
        crumbs={crumbs}
        label={`Local guide · ${emirate.name}`}
        title={<>{service.shortName} in{' '}<br />{emirate.name}</>}
        answer={local.localNote[0]}
      >
        <Link href={`/find-clinics/?emirate=${emirate.slug}&specialty=${service.slug}`} className="btn-ink">
          {service.shortName} clinics in {emirate.name} <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href={`/find-clinics/?emirate=${emirate.slug}&specialty=${service.slug}&near=me`} className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <section className="pt-10" aria-label="Key facts">
          <FactGrid
            facts={[
              { label: 'Indicative cost (UAE)', value: `${formatAed(service.price.from)} – ${formatAed(service.price.to)}`, note: `${service.price.unit}. A guide only; ask for a written quote.` },
              { label: `Licensing in ${emirate.name}`, value: emirate.regulator.name, note: emirate.regulator.checkLicence },
              { label: 'Typical timeline', value: service.duration },
            ]}
          />
        </section>

        <Section id="local" eyebrow={`${emirate.name} specifics`} title={`Getting ${service.shortName.toLowerCase()} in ${emirate.name}`}>
          <div className="prose-guide max-w-3xl">
            {local.localNote.slice(1).map((p) => <p key={p}>{p}</p>)}
            <p>{emirate.gettingThere}</p>
          </div>
        </Section>

        <Section id="insurance" eyebrow="Insurance" title={`Will insurance pay in ${emirate.name}?`}>
          <div className="rounded-3xl bg-ink p-7 text-[15px] leading-relaxed text-zinc-200">
            <p>{insuranceNote(service, emirate)}</p>
            <p className="mt-3 text-sm text-zinc-400">This is general guidance. Your policy wording and your insurer&apos;s pre-approval decide what is paid.</p>
          </div>
        </Section>

        <Section id="process" eyebrow="The treatment" title="What to expect">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-black/10 bg-white p-5">
                <span className="display text-3xl text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-1 font-semibold text-ink">{step.title}</p>
              </li>
            ))}
          </ol>
          <Link href={urls.service(service.slug)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink underline">
            Read the full {service.name.toLowerCase()} guide: risks, alternatives and recovery
          </Link>
        </Section>

        <Section id="questions" eyebrow="Your consultation" title="Questions to ask the clinic">
          <BulletList items={service.questionsToAsk} tone={emirate.tone} />
        </Section>

        <Section id="areas" eyebrow="Where to look" title={`Areas of ${emirate.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {emirate.areas.slice(0, 4).map((a) => (
              <div key={a.name} className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="font-semibold text-ink">{a.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{a.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="clinics" eyebrow="Clinics" title={`${service.shortName} clinics in ${emirate.name}`}>
          <ClinicList
            clinics={clinics}
            emptyText={`Live listings for ${service.name.toLowerCase()} in ${emirate.name} are not available right now.`}
            moreHref={`/find-clinics/?emirate=${emirate.slug}&specialty=${service.slug}`}
          />
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={faqs} />
        </Section>

        {otherServices.length > 0 && (
          <Section eyebrow={`More in ${emirate.name}`} title="Other treatments">
            <LinkTiles columns={4} links={otherServices.map((s) => ({ href: urls.serviceEmirate(emirate.slug, s.slug), title: `${s.shortName} in ${emirate.name}`, tone: s.tone }))} />
          </Section>
        )}

        {otherEmirates.length > 0 && (
          <Section eyebrow="Other emirates" title={`${service.shortName} elsewhere in the UAE`}>
            <div className="flex flex-wrap gap-2">
              {otherEmirates.map((e) => (
                <Link key={e.slug} href={urls.serviceEmirate(e.slug, service.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                  {service.shortName} in {e.name}
                </Link>
              ))}
              <Link href={urls.emirate(emirate.slug)} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
                All dentists in {emirate.name}
              </Link>
            </div>
          </Section>
        )}

        <div className="pb-6"><MedicalNote /></div>
      </div>

      <GuideCta
        title={`Compare ${service.shortName.toLowerCase()} clinics in ${emirate.name}`}
        text="Shortlist two or three clinics, ask each for an itemised quote and compare what is included."
        href={`/find-clinics/?emirate=${emirate.slug}&specialty=${service.slug}`}
        cta="Find a clinic"
      />
    </PageLayout>
  );
}
