import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { GuideCta, GuideHero, JsonLd, Section } from '@/components/guide/GuideBlocks';
import { formatAed, services, SITE_URL, toneClass, urls, type InsuranceCategory } from '@/content';
import { breadcrumbSchema } from '@/content/schema';
import { cn } from '@/lib/utils';

const GROUPS: { title: string; categories: InsuranceCategory[] }[] = [
  { title: 'Everyday and preventive care', categories: ['preventive', 'pediatric', 'emergency'] },
  { title: 'Repairing and replacing teeth', categories: ['restorative', 'surgical'] },
  { title: 'Straightening teeth', categories: ['orthodontic'] },
  { title: 'Changing how your smile looks', categories: ['cosmetic'] },
];

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Treatments', path: urls.services },
];

export default function ServicesIndex() {
  return (
    <PageLayout>
      <SEOHead
        title="Dental Treatments in the UAE: Guides, Costs & Clinics"
        description="Plain-language guides to common dental treatments in the UAE, from cleaning and root canals to implants, aligners and veneers, with indicative AED costs and licensed clinics."
        canonical={urls.services}
      />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Dental treatment guides',
            url: `${SITE_URL}${urls.services}`,
            hasPart: services.map((s) => ({ '@type': 'MedicalWebPage', name: s.name, url: `${SITE_URL}${urls.service(s.slug)}` })),
          },
        ]}
      />

      <GuideHero
        tone="lime"
        crumbs={crumbs}
        label="Treatment guides"
        title={<>Know your{' '}<br />treatment</>}
        answer="Each guide explains what a treatment involves, who it suits, how long it takes, what can go wrong and what it usually costs in the UAE, so you can walk into a consultation with the right questions."
      />

      <div className="mx-auto max-w-6xl px-5">
        {GROUPS.map((group) => {
          const items = services.filter((s) => group.categories.includes(s.insuranceCategory));
          if (items.length === 0) return null;
          return (
            <Section key={group.title} title={group.title}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link key={s.slug} href={urls.service(s.slug)} className={cn('block-card group flex flex-col justify-between border-transparent p-6', toneClass[s.tone])}>
                    <span>
                      <span className="display block text-3xl text-ink">{s.name}</span>
                      <span className="mt-3 block text-sm leading-relaxed text-ink/75">{s.summary}</span>
                    </span>
                    <span className="mt-6 flex items-center justify-between text-sm font-semibold text-ink">
                      From {formatAed(s.price.from)}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </Section>
          );
        })}
      </div>

      <GuideCta title="Not sure what you need?" text="A check-up is the right first step. Find a licensed clinic near you and book a consultation." href="/find-clinics/?near=me" cta="Find a dentist near me" />
    </PageLayout>
  );
}
