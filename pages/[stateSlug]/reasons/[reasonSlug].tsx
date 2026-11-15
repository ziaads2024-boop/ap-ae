import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { AlertTriangle, ArrowRight, MessageSquareText } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, PageImageCredits, Section } from '@/components/guide/GuideBlocks';
import { CONTENT_REVIEWED, formatAed, serviceBySlug, SITE_URL, urls, type ServiceContent } from '@/content';
import { clip, fitTitle } from '@/lib/metaText';
import { dubaiAreas, visitReasons, visitReasonBySlug, type VisitReason } from '@/content/dubai';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { imageForService } from '@/content/images';

// "Why are you visiting?" pages for Dubai, organised the way patients describe
// the problem (toothache, swelling, missing tooth...).

const URGENCY_LABEL = { emergency: 'See a dentist today', soon: 'See a dentist within a few days', routine: 'Book a routine visit' } as const;
const URGENCY_TONE = { emergency: 'blush', soon: 'lemon', routine: 'lime' } as const;
// Areas with the most listed dental clinics, plus the main residential districts
const POPULAR_AREAS = ['deira', 'jumeirah', 'al-barsha', 'jlt', 'bur-dubai', 'karama', 'healthcare-city', 'dubai-silicon-oasis', 'mirdif', 'business-bay', 'umm-suqeim', 'dubai-marina', 'downtown-dubai', 'jvc'];

export default function DubaiReasonPage({ reasonSlug }: { reasonSlug: string }) {
  const reason = visitReasonBySlug(reasonSlug) as VisitReason;
  const path = urls.dubaiReason(reason.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Dubai', path: urls.emirate('dubai') },
    { name: 'Reasons for visit', path: urls.dubaiReasons },
    { name: reason.label, path },
  ];
  const treatments = reason.services.map(serviceBySlug).filter(Boolean) as ServiceContent[];
  const image = imageForService(treatments[0]?.slug || 'teeth-cleaning');
  const title = fitTitle(`${reason.label} in Dubai`, ': When to See a Dentist', 50);
  const description = clip(`${reason.advice} Practical steps, what to tell the clinic, and dentists in Dubai you can request an appointment with.`);
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    lastReviewed: CONTENT_REVIEWED,
    about: { '@type': 'MedicalSignOrSymptom', name: reason.label },
    mainContentOfPage: { '@type': 'WebPageElement', cssSelector: '#steps' },
  };

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} ogImage={`${SITE_URL}${image.src}`} />
      <JsonLd data={[howTo, breadcrumbSchema(crumbs), faqSchema(reason.faqs)]} />

      <GuideHero
        tone={URGENCY_TONE[reason.urgency]}
        crumbs={crumbs}
        label={URGENCY_LABEL[reason.urgency]}
        title={<>{reason.label} in Dubai:{' '}<br />what to do and when to see a dentist</>}
        answer={reason.advice}
        image={image}
        badge={{ label: 'Urgency', value: URGENCY_LABEL[reason.urgency] }}
      >
        <a href="#areas" className="btn-ink">Find a dentist by area <ArrowRight className="h-4 w-4" /></a>
        <Link prefetch={false} href={`/find-clinics/?reason=${reason.slug}`} className="btn-ghost">Search with filters</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        {reason.urgency === 'emergency' && (
          <aside className="mt-8 flex gap-3 rounded-3xl bg-ink p-6 text-white" role="note">
            <AlertTriangle className="h-6 w-6 shrink-0 text-tone-lemon" />
            <p className="text-[15px] leading-relaxed">If swelling spreads towards your eye or neck, or you have difficulty breathing or swallowing, call <strong>998</strong> or go to a hospital emergency department now.</p>
          </aside>
        )}

        <Section id="steps" eyebrow="What to do now" title="Practical steps">
          <ol className="grid gap-3 md:grid-cols-2">
            {reason.steps.map((step, i) => (
              <li key={step} className="rounded-3xl border border-black/10 bg-white p-6">
                <span className="display text-3xl text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{step}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="tell" eyebrow="When you book" title="What to tell the clinic">
          <p className="flex gap-3 rounded-3xl bg-tone-sky p-6 text-[15px] leading-relaxed text-ink">
            <MessageSquareText className="h-5 w-5 shrink-0" /> {reason.whatToSay}
          </p>
        </Section>

        {treatments.length > 0 && (
          <Section id="treatments" eyebrow="Likely treatments" title="What the dentist may suggest">
            <LinkTiles
              links={treatments.map((t) => ({ href: urls.service(t.slug), title: t.name, text: `${t.summary} Typically ${formatAed(t.price.from)}–${formatAed(t.price.to)} ${t.price.unit}.`, tone: t.tone, image: imageForService(t.slug) }))}
            />
          </Section>
        )}

        <Section id="areas" eyebrow="Where in Dubai?" title="Find a dentist by area">
          <div className="flex flex-wrap gap-2">
            {POPULAR_AREAS.map((slug) => dubaiAreas.find((a) => a.slug === slug)).filter(Boolean).map((a) => (
              <Link prefetch={false} key={a!.slug} href={urls.dubaiArea(a!.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                Dentists in {a!.name}
              </Link>
            ))}
            <Link prefetch={false} href={urls.emirate('dubai')} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">All Dubai areas</Link>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            Or <Link prefetch={false} href={`/find-clinics/?reason=${reason.slug}&near=me`} className="font-semibold underline">search with filters near you</Link>.
          </p>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={reason.faqs} />
        </Section>

        <Section eyebrow="Other reasons" title="Something else?">
          <div className="flex flex-wrap gap-2">
            {visitReasons.filter((r) => r.slug !== reason.slug).map((r) => (
              <Link prefetch={false} key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{r.label}</Link>
            ))}
          </div>
        </Section>

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[image, ...treatments.map((t) => imageForService(t.slug))]} />
        </div>
      </div>

      <GuideCta title="Request a dentist in Dubai" text="Choose a clinic, tell it why you are visiting, and it will call to confirm a time." href={`/find-clinics/?reason=${reason.slug}`} cta="Search with filters" />
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: visitReasons.map((r) => ({ params: { stateSlug: 'dubai', reasonSlug: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.stateSlug !== 'dubai' || !visitReasonBySlug(params.reasonSlug as string)) return { notFound: true };
  return { props: { reasonSlug: params.reasonSlug } };
};
