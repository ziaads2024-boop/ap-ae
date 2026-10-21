import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { BulletList, ClinicList, FaqList, JsonLd, Section } from '@/components/guide/GuideBlocks';
import type { ClinicSummary } from '@/components/guide/GuideBlocks';
import { insuranceBasics, insuranceQuestions, insurerFaqs } from '@/content/insurance';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { fetchInsurer, fetchInsurers, MIN_CLINICS_FOR_INSURER_INDEX } from '@/lib/insuranceData';

interface Props {
  insurer: { name: string; slug: string; clinicCount: number; clinics: ClinicSummary[] };
  others: { name: string; slug: string }[];
}

export default function InsurerPage({ insurer, others }: Props) {
  const path = `/insurance/${insurer.slug}/`;
  const indexable = insurer.clinicCount >= MIN_CLINICS_FOR_INSURER_INDEX;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Insurance', path: '/insurance/' }, { name: insurer.name, path }];
  const faqs = insurerFaqs(insurer.name);
  const searchHref = `/find-clinics/?insurance=${insurer.slug}`;
  return (
    <PageLayout>
      <SEOHead
        title={`Dentists Accepting ${insurer.name} in Dubai`}
        description={`${insurer.clinicCount ? `${insurer.clinicCount} clinics have confirmed they accept ${insurer.name}. ` : ''}How to check your ${insurer.name} dental cover, pre-approval and co-payments before treatment in the UAE.`}
        canonical={path}
        noindex={!indexable}
      />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero
        kicker="Insurance"
        title={`Dentists accepting ${insurer.name}`}
        subtitle={`Whether ${insurer.name} pays for dental treatment depends on your plan. Check your dental benefit and network, then confirm with the clinic before treatment.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insurance', href: '/insurance/' }, { label: insurer.name }]}
        tone="lime"
      >
        <Link href={searchHref} className="btn-ink">Search clinics</Link>
      </PageHero>

      <div className="mx-auto max-w-5xl px-5">
        <Section id="clinics" eyebrow="Clinics" title={`Clinics that confirmed ${insurer.name}`}>
          <ClinicList
            clinics={insurer.clinics}
            emptyText={`No clinic has confirmed ${insurer.name} on AppointPanda yet. Your insurer's provider list is the most reliable source; you can also ask any clinic when you request an appointment.`}
            moreHref={searchHref}
          />
        </Section>

        <Section eyebrow="Before treatment" title={`Check your ${insurer.name} dental cover`}>
          <BulletList items={insuranceQuestions} tone="lime" />
        </Section>

        <Section eyebrow="The basics" title="How dental insurance usually works">
          <div className="grid gap-4 md:grid-cols-2">
            {insuranceBasics.map((b) => (
              <div key={b.title} className="rounded-3xl border border-black/10 bg-white p-6">
                <h3 className="font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{b.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={faqs} />
        </Section>

        {others.length > 0 && (
          <Section eyebrow="Other insurers" title="Other plans">
            <div className="flex flex-wrap gap-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/insurance/${o.slug}/`} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{o.name}</Link>
              ))}
            </div>
          </Section>
        )}
        <p className="pb-14 text-xs text-zinc-500">
          AppointPanda is not an insurer or broker and is not affiliated with {insurer.name}. Plan names are used only to help you find clinics.
        </p>
      </div>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const insurers = await fetchInsurers().catch(() => []);
  return { paths: insurers.map((i) => ({ params: { slug: [i.slug] } })), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const segs = (ctx.params?.slug as string[]) || [];
  if (!segs[0]) return { notFound: true };
  // Old /insurance/{insurer}/{emirate}/{city}/ pages are consolidated into one page per insurer
  if (segs.length > 1) return { redirect: { destination: `/insurance/${segs[0]}/`, permanent: true } };
  const insurer = await fetchInsurer(segs[0]);
  if (!insurer) return { notFound: true, revalidate: 300 };
  const others = (await fetchInsurers().catch(() => [])).filter((i) => i.slug !== insurer.slug).slice(0, 12).map((i) => ({ name: i.name, slug: i.slug }));
  return { props: { insurer, others }, revalidate: 3600 };
};
