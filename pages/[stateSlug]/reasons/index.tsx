import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { GuideCta, GuideHero, JsonLd, Section } from '@/components/guide/GuideBlocks';
import { SITE_URL, toneClass, urls } from '@/content';
import { visitReasons } from '@/content/dubai';
import { breadcrumbSchema } from '@/content/schema';
import { cn } from '@/lib/utils';

const GROUPS = [
  { key: 'emergency', title: 'Today' },
  { key: 'soon', title: 'Within a few days' },
  { key: 'routine', title: 'Routine care' },
] as const;
const TONE = { emergency: 'blush', soon: 'lemon', routine: 'lime' } as const;

export default function DubaiReasonsIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Dubai', path: urls.emirate('dubai') },
    { name: 'Reasons for visit', path: urls.dubaiReasons },
  ];
  return (
    <PageLayout>
      <SEOHead
        title="Why Are You Seeing a Dentist? Dubai Guide by Reason"
        description="From toothache and swelling to a check-up or a missing tooth: how urgent it is, what to do now and how to find a dentist in Dubai."
        canonical={urls.dubaiReasons}
      />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Reasons for a dental visit in Dubai',
            url: `${SITE_URL}${urls.dubaiReasons}`,
            hasPart: visitReasons.map((r) => ({ '@type': 'MedicalWebPage', name: r.label, url: `${SITE_URL}${urls.dubaiReason(r.slug)}` })),
          },
        ]}
      />
      <GuideHero
        tone="sky"
        crumbs={crumbs}
        label="Dubai · start here"
        title={<>Why are you{' '}<br />visiting?</>}
        answer="Pick the reason that fits best. Each page says how urgent it is, what you can do now and what to tell the clinic, then takes you to dentists in Dubai you can request an appointment with."
      />
      <div className="mx-auto max-w-5xl px-5">
        {GROUPS.map((g) => {
          const items = visitReasons.filter((r) => r.urgency === g.key);
          if (!items.length) return null;
          return (
            <Section key={g.key} title={g.title}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <Link key={r.slug} href={urls.dubaiReason(r.slug)} className={cn('block-card group flex flex-col justify-between border-transparent p-6', toneClass[TONE[r.urgency]])}>
                    <span>
                      <span className="display block text-3xl text-ink">{r.label}</span>
                      <span className="mt-3 block text-sm leading-relaxed text-ink/75">{r.advice}</span>
                    </span>
                    <ArrowRight className="mt-5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Section>
          );
        })}
      </div>
      <GuideCta title="Not sure? Start with a check-up" text="A dentist can assess the problem and explain your options." href="/find-clinics/?reason=checkup-and-cleaning" cta="Find a dentist" />
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [{ params: { stateSlug: 'dubai' } }], fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => (params?.stateSlug === 'dubai' ? { props: {} } : { notFound: true });
