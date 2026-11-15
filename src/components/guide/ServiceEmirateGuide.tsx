import Link from 'next/link';
import { ArrowRight, Calculator, LocateFixed } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  emirates, formatAed, hasLocalGuide, insuranceNote, isLiveEmirate, services, urls,
  type EmirateContent, type ServiceContent, type ServiceEmirateContent, SITE_URL,
} from '@/content';
import { answerOf, costQuestionOf, costTableOf, headingOf, phraseOf } from '@/content/services';
import { dubaiAreaBySlug, reasonsForService } from '@/content/dubai';
import { breadcrumbSchema, clinicListSchema, faqSchema, serviceEmiratePageSchema } from '@/content/schema';
import {
  BulletList, ClinicList, FactGrid, FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, PageImageCredits, Section,
  type ClinicSummary,
} from './GuideBlocks';
import { CreditedImage } from './CreditedImage';
import { COST_CALCULATOR, CostTableBlock, SourceList } from './ServiceGuide';
import { imageForEmirate, imageForService } from '@/content/images';

export function serviceEmirateMeta(service: ServiceContent, emirate: EmirateContent, local?: ServiceEmirateContent) {
  const heading = headingOf(service);
  return {
    title: local?.metaTitle ?? `${heading} in ${emirate.name}: Prices, Clinics & Areas`,
    description: local?.metaDescription
      ?? `${heading} in ${emirate.name}: ${emirate.regulator.short} licensing, insurance, indicative prices from ${formatAed(service.price.from)} and where to find licensed clinics.`,
  };
}

export function ServiceEmirateGuide({
  service, emirate, local, clinics,
}: { service: ServiceContent; emirate: EmirateContent; local: ServiceEmirateContent; clinics: ClinicSummary[] }) {
  const path = urls.serviceEmirate(emirate.slug, service.slug);
  const heading = headingOf(service);
  const phrase = phraseOf(service);
  const { title, description } = serviceEmirateMeta(service, emirate, local);
  const isDubai = emirate.slug === 'dubai';
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: emirate.name, path: urls.emirate(emirate.slug) },
    { name: `${heading} in ${emirate.name}`, path },
  ];
  // Treatment-specific FAQs only (no sitewide question repeated on every page).
  const faqs = local.faqs;
  const otherEmirates = emirates.filter((e) => e.slug !== emirate.slug && isLiveEmirate(e.slug) && hasLocalGuide(service.slug, e.slug));
  const otherServices = services.filter((s) => s.slug !== service.slug && hasLocalGuide(s.slug, emirate.slug));
  const areas = isDubai
    ? (local.areas ?? []).map((a) => ({ ...a, area: dubaiAreaBySlug(a.slug) })).filter((a) => a.area)
    : [];
  const reasons = isDubai ? reasonsForService(service.slug) : [];
  const heroImage = imageForEmirate(emirate.slug);
  const treatmentImage = imageForService(service.slug);
  const table = costTableOf(service);
  const finder = isDubai ? `/find-clinics/?specialty=${service.slug}` : `/find-clinics/?emirate=${emirate.slug}&specialty=${service.slug}`;
  const regulation = local.regulation ?? [emirate.regulator.note, emirate.regulator.checkLicence];
  const insurance = local.insurance ?? [insuranceNote(service, emirate)];
  const sources = [...(local.sources ?? []), ...(service.sources ?? [])];

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} ogImage={`${SITE_URL}${heroImage.src}`} />
      <JsonLd
        data={[
          serviceEmiratePageSchema(service, emirate, title, description, heroImage),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
          clinicListSchema(`${heading} clinics in ${emirate.name}`, clinics),
        ]}
      />

      <GuideHero
        tone={service.tone}
        crumbs={crumbs}
        label={`Local guide · ${emirate.name}`}
        title={<>{heading} in{' '}<br />{emirate.name}</>}
        answer={local.answer ?? answerOf(service)}
        image={heroImage}
        badge={{ label: 'Licensed by', value: isDubai ? 'DHA or DHCC' : emirate.regulator.name }}
      >
        <Link prefetch={false} href={finder} className="btn-ink">
          Compare clinics in {emirate.name} <ArrowRight className="h-4 w-4" />
        </Link>
        <Link prefetch={false} href={`${finder}&near=me`} className="btn-ghost"><LocateFixed className="h-4 w-4" /> Near me</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        <section className="pt-10" aria-label="Key facts">
          <FactGrid
            facts={[
              { label: `Indicative cost in ${emirate.name}`, value: `${formatAed(service.price.from)} – ${formatAed(service.price.to)}`, note: `${service.price.unit}. A guide only; ask for a written quote.` },
              { label: `Licensing in ${emirate.name}`, value: isDubai ? 'DHA, or DHCC in Healthcare City' : emirate.regulator.name, note: emirate.regulator.checkLicence },
              { label: 'Typical timeline', value: service.duration },
            ]}
          />
        </section>

        <Section id="local" eyebrow={`${emirate.name} specifics`} title={`What to know before you book in ${emirate.name}`}>
          <div className="prose-guide max-w-3xl">
            {(local.answer ? local.localNote : local.localNote.slice(1)).map((p) => <p key={p}>{p}</p>)}
            <p>{emirate.gettingThere}</p>
          </div>
        </Section>

        <Section id="cost" eyebrow="Cost" title={isDubai ? costQuestionOf(service) : `${heading} prices in ${emirate.name}`}>
          <CostTableBlock table={table} place={emirate.name} />
          {local.costNote && <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-zinc-700">{local.costNote}</p>}
          <Link prefetch={false} href={COST_CALCULATOR} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink underline">
            <Calculator className="h-4 w-4" /> Estimate your total with the dental cost calculator
          </Link>
        </Section>

        <Section id="licensing" eyebrow="Regulation" title={`Who licenses dentists for ${phrase} in ${emirate.name}?`}>
          <div className="prose-guide max-w-3xl">
            {regulation.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Section>

        <Section id="insurance" eyebrow="Insurance" title={`Does insurance cover ${phrase} in ${emirate.name}?`}>
          <div className="rounded-3xl bg-ink p-7 text-[15px] leading-relaxed text-zinc-200">
            {insurance.map((p) => <p key={p} className="mt-3 first:mt-0">{p}</p>)}
            <p className="mt-3 text-sm text-zinc-400">This is general guidance. Your policy wording and your insurer&apos;s pre-approval decide what is paid.</p>
          </div>
        </Section>

        {areas.length > 0 && (
          <Section id="areas" eyebrow="Where to look" title={`Where to look in ${emirate.name}`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {areas.map(({ slug, note, area }) => (
                <li key={slug} className="rounded-2xl border border-black/10 bg-white p-5">
                  <Link prefetch={false} href={urls.dubaiArea(slug)} className="font-semibold text-ink underline">Dentists in {area!.name}</Link>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{note}</p>
                  <Link prefetch={false} href={urls.dubaiAreaService(slug, service.slug)} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    {heading} in {area!.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {reasons.length > 0 && (
          <Section id="reasons" eyebrow="Not sure what you need?" title="Common reasons people book this">
            <div className="flex flex-wrap gap-2">
              {reasons.map((r) => (
                <Link prefetch={false} key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                  {r.label}
                </Link>
              ))}
              <Link prefetch={false} href={urls.dubaiReasons} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">All reasons for a visit</Link>
            </div>
          </Section>
        )}

        <Section id="process" eyebrow="The treatment" title="What to expect at each stage">
          <CreditedImage image={treatmentImage} sizes="(min-width: 1024px) 960px, 92vw" className="mb-6 aspect-[21/9] rounded-3xl" />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-black/10 bg-white p-5">
                <span className="display text-3xl text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-1 font-semibold text-ink">{step.title}</p>
              </li>
            ))}
          </ol>
          <Link prefetch={false} href={urls.service(service.slug)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink underline">
            Read the full {phrase} guide: risks, alternatives and recovery
          </Link>
        </Section>

        <Section id="questions" eyebrow="Your consultation" title="Questions to ask the clinic">
          <BulletList items={service.questionsToAsk} tone={emirate.tone} />
        </Section>

        <Section id="clinics" eyebrow="Clinics" title={`Clinics offering ${phrase} in ${emirate.name}`}>
          <ClinicList
            clinics={clinics}
            emptyText={`Clinics in ${emirate.name} have not yet confirmed on AppointPanda which treatments they offer.`}
            moreHref={finder}
          />
        </Section>

        <Section id="faq" eyebrow="FAQ" title={`${heading} in ${emirate.name}: common questions`}>
          <FaqList faqs={faqs} />
        </Section>

        {sources.length > 0 && (
          <Section id="sources" eyebrow="References" title="Sources">
            <SourceList sources={sources} />
          </Section>
        )}

        {otherServices.length > 0 && (
          <Section eyebrow={`More in ${emirate.name}`} title={`Other treatment guides for ${emirate.name}`}>
            <LinkTiles columns={4} links={otherServices.map((s) => ({ href: urls.serviceEmirate(emirate.slug, s.slug), title: `${headingOf(s)} in ${emirate.name}`, tone: s.tone, image: imageForService(s.slug) }))} />
          </Section>
        )}

        {otherEmirates.length > 0 && (
          <Section eyebrow="Other emirates" title={`${heading} elsewhere in the UAE`}>
            <div className="flex flex-wrap gap-2">
              {otherEmirates.map((e) => (
                <Link prefetch={false} key={e.slug} href={urls.serviceEmirate(e.slug, service.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                  {heading} in {e.name}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[heroImage, treatmentImage, ...otherServices.map((s) => imageForService(s.slug))]} />
        </div>
      </div>

      <GuideCta
        title={`Compare quotes for ${phrase} in ${emirate.name}`}
        text={`Shortlist two or three ${isDubai ? 'DHA- or DHCC-licensed' : 'licensed'} clinics, ask each for an itemised quote and compare what is included.`}
        href={finder}
        cta="Find a clinic"
      />
    </PageLayout>
  );
}
