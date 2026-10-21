import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { BulletList, FaqList, JsonLd, Section } from '@/components/guide/GuideBlocks';
import { emirateBySlug, formatAed, insuranceNote, services, urls, type Faq } from '@/content';
import { breadcrumbSchema, faqSchema } from '@/content/schema';

// Estimates come from the typical ranges in the treatment guides (src/content),
// multiplied by the number of teeth for per-tooth treatments. They are not quotes.

const perUnit = (unit: string) => /^per (tooth|implant|crown)/.test(unit);

const faqs: Faq[] = [
  {
    q: 'Where do these estimates come from?',
    a: 'From the typical private-clinic price ranges in our treatment guides, which are indicative ranges for the UAE. They are not prices from a particular clinic and are not quotes.',
  },
  {
    q: 'Why is my quote different?',
    a: 'Your quote depends on what the dentist finds when they examine you, the materials and lab used, whether you need extra work such as X-rays, scans or grafts, and the clinic itself. Ask for an itemised quote in writing.',
  },
  {
    q: 'Will insurance pay part of it?',
    a: 'Only if your plan has a dental benefit and the treatment is not excluded. Cosmetic treatment is usually excluded. Ask the clinic to check your cover or request pre-approval before treatment.',
  },
];

export default function DentalCostCalculator() {
  const [slug, setSlug] = useState(services[0].slug);
  const [count, setCount] = useState(1);
  const service = services.find((s) => s.slug === slug)!;
  const dubai = emirateBySlug('dubai')!;
  const multi = perUnit(service.price.unit);
  const n = multi ? Math.min(Math.max(count, 1), 28) : 1;
  const estimate = useMemo(() => ({ from: service.price.from * n, to: service.price.to * n }), [service, n]);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Dental cost calculator', path: '/tools/dental-cost-calculator/' }];
  const field = 'h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20';

  return (
    <PageLayout>
      <SEOHead
        title="Dental Cost Calculator: Typical Prices in Dubai (AED)"
        description="Estimate the typical cost of dental implants, veneers, Invisalign, crowns, root canals and more in Dubai and the UAE, in AED, with what changes the price."
        canonical="/tools/dental-cost-calculator/"
      />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero
        kicker="Cost calculator"
        title="What will my treatment cost?"
        subtitle="A quick estimate from the typical private-clinic ranges in our treatment guides. Only a clinic can give you a price, after examining you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cost calculator' }]}
        tone="lemon"
      />

      <div className="mx-auto max-w-5xl px-5">
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-black/10 bg-white p-6">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-zinc-600">Treatment</span>
              <select value={slug} onChange={(e) => setSlug(e.target.value)} className={field}>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </label>
            {multi && (
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-600">Number of teeth</span>
                <input type="number" min={1} max={28} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} className={field} />
              </label>
            )}
            <p className="text-xs leading-relaxed text-zinc-500">{service.price.note}</p>
          </div>
          <div className="rounded-3xl bg-ink p-6 text-white" aria-live="polite">
            <Calculator className="h-6 w-6 text-tone-lemon" />
            <p className="mt-3 text-sm text-zinc-300">Typical range{multi && n > 1 ? ` for ${n} teeth` : ''}</p>
            <p className="display mt-1 text-5xl">{formatAed(estimate.from)} – {formatAed(estimate.to)}</p>
            <p className="mt-2 text-sm text-zinc-300">{multi && n > 1 ? `${formatAed(service.price.from)} – ${formatAed(service.price.to)} ${service.price.unit}` : service.price.unit}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={urls.service(service.slug)} className="btn-ghost bg-white">Read the {service.shortName.toLowerCase()} guide</Link>
              <Link href={`/find-clinics/?specialty=${service.slug}`} className="btn-ghost bg-white">Find clinics</Link>
            </div>
          </div>
        </section>

        <Section eyebrow="Price" title="What changes the price">
          <BulletList items={service.priceFactors} tone={service.tone} />
        </Section>

        <Section eyebrow="Insurance" title="Will insurance help?">
          <p className="max-w-3xl text-[15px] leading-relaxed text-zinc-700">{insuranceNote(service, dubai)}</p>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="About these estimates">
          <FaqList faqs={faqs} />
        </Section>
        <div className="pb-14" />
      </div>
    </PageLayout>
  );
}
