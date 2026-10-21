import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { BulletList, FaqList, JsonLd, Section } from '@/components/guide/GuideBlocks';
import { insuranceBasics, insuranceFaqs, insuranceQuestions } from '@/content/insurance';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { fetchInsurers, type InsurerSummary } from '@/lib/insuranceData';

interface Props {
  insurers: InsurerSummary[];
}

export default function InsuranceHub({ insurers }: Props) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Insurance', path: '/insurance/' }];
  return (
    <PageLayout>
      <SEOHead
        title="Dental Insurance in Dubai and the UAE: What Is Covered"
        description="How dental cover works on UAE health insurance: annual limits, direct billing, pre-approval and cosmetic exclusions, plus the questions to ask your insurer and clinic."
        canonical="/insurance/"
      />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(insuranceFaqs)]} />
      <PageHero
        kicker="Insurance"
        title="Using your insurance at the dentist"
        subtitle="Most dental cover in the UAE comes with an enhanced or employer plan, with an annual limit and a co-payment. Here is what to check before treatment, and how to find a clinic in your network."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insurance' }]}
        tone="lime"
      />

      <div className="mx-auto max-w-5xl px-5">
        <Section eyebrow="The basics" title="How dental insurance works here">
          <div className="grid gap-4 md:grid-cols-2">
            {insuranceBasics.map((b) => (
              <div key={b.title} className="rounded-3xl border border-black/10 bg-white p-6">
                <h3 className="font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{b.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Before you book" title="Questions to ask your insurer">
          <BulletList items={insuranceQuestions} tone="lime" />
        </Section>

        <Section eyebrow="Insurers" title="Find clinics by insurer">
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-zinc-600">
            Each page shows clinics that have confirmed on AppointPanda that they accept the plan. Networks change and differ between plans
            from the same insurer, so always confirm with the clinic before treatment.
          </p>
          <ul className="grid gap-3 md:grid-cols-2">
            {insurers.map((ins) => (
              <li key={ins.slug}>
                <Link href={`/insurance/${ins.slug}/`} className="block-card flex items-center gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-tone-lime" aria-hidden="true"><ShieldCheck className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{ins.name}</span>
                    <span className="text-xs text-zinc-500">
                      {ins.clinicCount > 0 ? `${ins.clinicCount} clinic${ins.clinicCount === 1 ? '' : 's'} confirmed` : 'No clinics confirmed yet'}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={insuranceFaqs} />
        </Section>
        <div className="pb-14" />
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { insurers: await fetchInsurers().catch(() => []) },
  revalidate: 3600,
});
