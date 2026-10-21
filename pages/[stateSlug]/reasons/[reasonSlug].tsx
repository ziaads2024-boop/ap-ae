import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { AlertTriangle, ArrowRight, MessageSquareText } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { FaqList, GuideCta, GuideHero, JsonLd, LinkTiles, MedicalNote, PageImageCredits, Section } from '@/components/guide/GuideBlocks';
import { formatAed, serviceBySlug, SITE_URL, urls, type ServiceContent } from '@/content';
import { dubaiAreas, visitReasons, visitReasonBySlug, type VisitReason } from '@/content/dubai';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { imageForService } from '@/content/images';

// "Why are you visiting?" pages for Dubai, organised the way patients describe
// the problem (toothache, swelling, missing tooth...).

const URGENCY_LABEL = { emergency: 'See a dentist today', soon: 'See a dentist within a few days', routine: 'Book a routine visit' } as const;
const URGENCY_TONE = { emergency: 'blush', soon: 'lemon', routine: 'lime' } as const;
const POPULAR_AREAS = ['dubai-marina', 'jumeirah', 'downtown-dubai', 'al-barsha', 'bur-dubai', 'deira', 'mirdif', 'jvc'];

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
  const title = `${reason.label}: When to See a Dentist in Dubai & What to Do`;
  const description = `${reason.advice} Practical steps, what to tell the clinic, and dentists in Dubai you can request an appointment with.`.slice(0, 300);
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    lastReviewed: '2026-10-21',
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
        title={reason.label}
        answer={reason.advice}
        image={image}
        badge={{ label: 'Urgency', value: URGENCY_LABEL[reason.urgency] }}
      >
        <Link href={`/find-clinics/?reason=${reason.slug}`} className="btn-ink">Find a dentist in Dubai <ArrowRight className="h-4 w-4" /></Link>
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
            {dubaiAreas.filter((a) => POPULAR_AREAS.includes(a.slug)).map((a) => (
              <Link key={a.slug} href={`/find-clinics/?area=${a.slug}&reason=${reason.slug}`} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                {reason.label} · {a.name}
              </Link>
            ))}
            <Link href={`/find-clinics/?reason=${reason.slug}&near=me`} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Near me</Link>
          </div>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={reason.faqs} />
        </Section>

        <Section eyebrow="Other reasons" title="Something else?">
          <div className="flex flex-wrap gap-2">
            {visitReasons.filter((r) => r.slug !== reason.slug).map((r) => (
              <Link key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{r.label}</Link>
            ))}
          </div>
        </Section>

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[image, ...treatments.map((t) => imageForService(t.slug))]} />
        </div>
      </div>

      <GuideCta title="Request a dentist in Dubai" text="Choose a clinic, tell it why you are visiting, and it will call to confirm a time." href={`/find-clinics/?reason=${reason.slug}`} cta="Find a dentist" />
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
