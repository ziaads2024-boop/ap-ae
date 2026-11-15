import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import Image from 'next/image';
import { GuideCta, GuideHero, JsonLd, PageImageCredits, Section } from '@/components/guide/GuideBlocks';
import { images, imageForService } from '@/content/images';
import { formatAed, hasLocalGuide, services, SITE_URL, toneClass, urls, type ServiceContent } from '@/content';
import { answerOf, headingOf } from '@/content/services';
import { breadcrumbSchema, SITE_ID } from '@/content/schema';
import { cn } from '@/lib/utils';

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: 'Check-ups, children and urgent care', slugs: ['teeth-cleaning', 'gum-treatment', 'dental-fillings', 'pediatric-dentistry', 'emergency-dentist', 'sedation-dentistry'] },
  { title: 'Saving and repairing teeth', slugs: ['root-canal', 'dental-crowns', 'dental-bridges', 'tooth-extraction', 'wisdom-tooth-removal'] },
  { title: 'Replacing missing teeth', slugs: ['dental-implants', 'all-on-4-implants', 'dentures'] },
  { title: 'Straightening teeth', slugs: ['invisalign', 'braces'] },
  { title: 'Changing how your smile looks', slugs: ['teeth-whitening', 'dental-bonding', 'veneers', 'hollywood-smile'] },
];

const bySlug = (slug: string) => services.find((s) => s.slug === slug);
const grouped = GROUPS.map((g) => ({ ...g, items: g.slugs.map(bySlug).filter(Boolean) as ServiceContent[] }));
// Any guide not placed in a group above still appears.
const ungrouped = services.filter((s) => !GROUPS.some((g) => g.slugs.includes(s.slug)));
if (ungrouped.length) grouped.push({ title: 'Other treatments', slugs: [], items: ungrouped });
const ordered = grouped.flatMap((g) => g.items);

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Treatments', path: urls.services },
];

const DESCRIPTION = `Indicative private-clinic prices in Dubai for ${services.length} dental treatments, from a scale and polish to implants, aligners and veneers, with plain-language guides and licensed clinics.`;

export default function ServicesIndex() {
  const pageUrl = `${SITE_URL}${urls.services}`;
  return (
    <PageLayout>
      <SEOHead
        title="Dental Treatment Prices in Dubai (2026 Guide)"
        description={DESCRIPTION}
        canonical={urls.services}
        ogImage={`${SITE_URL}${images.chairWhite.src}`}
      />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#webpage`,
            name: 'Dental treatments and prices in Dubai',
            description: DESCRIPTION,
            url: pageUrl,
            inLanguage: 'en-AE',
            isPartOf: { '@id': SITE_ID },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: ordered.length,
              itemListElement: ordered.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: headingOf(s),
                url: `${SITE_URL}${urls.service(s.slug)}`,
              })),
            },
          },
        ]}
      />

      <GuideHero
        tone="lime"
        crumbs={crumbs}
        label="Treatment guides"
        title="Dental treatments and prices in Dubai"
        image={images.chairWhite}
        badge={{ label: 'Guides', value: `${services.length} treatments explained` }}
        answer={`At private clinics in Dubai, a scale and polish typically costs AED 250 to 800, a filling AED 250 to 900, a root canal AED 1,000 to 6,000 and a single implant with its crown AED 5,000 to 12,000. Each guide below explains what the treatment involves, who it suits, how long it takes and what it costs.`}
      />

      <div className="mx-auto max-w-6xl px-5">
        <Section id="prices" eyebrow="Price list" title="Dental treatment prices in Dubai at a glance">
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
                <caption className="px-6 pb-2 pt-5 text-left text-sm font-semibold text-ink">Indicative private-clinic price ranges in Dubai</caption>
                <thead>
                  <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-zinc-500">
                    <th scope="col" className="px-6 py-3 font-semibold">Treatment</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Indicative range (AED)</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Priced</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Typical time</th>
                  </tr>
                </thead>
                <tbody>
                  {ordered.map((s) => (
                    <tr key={s.slug} className="border-b border-black/5 align-top last:border-0">
                      <th scope="row" className="px-6 py-3 font-medium">
                        <Link prefetch={false} href={urls.service(s.slug)} className="text-ink underline">{headingOf(s)}</Link>
                        {hasLocalGuide(s.slug, 'dubai') && (
                          <Link prefetch={false} href={urls.serviceEmirate('dubai', s.slug)} className="mt-0.5 block text-xs font-normal text-primary hover:underline">Dubai clinics and areas</Link>
                        )}
                      </th>
                      <td className="whitespace-nowrap px-6 py-3 font-semibold text-ink">{formatAed(s.price.from)} – {formatAed(s.price.to)}</td>
                      <td className="px-6 py-3 text-zinc-600">{s.price.unit}</td>
                      <td className="px-6 py-3 text-zinc-600">{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-black/10 bg-paper px-6 py-4 text-sm leading-relaxed text-zinc-600">
              Indicative ranges for private clinics in Dubai, not quotes. Each guide breaks the price down by type. Ask any clinic for a written, itemised quote.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link prefetch={false} href="/tools/dental-cost-calculator/" className="btn-ink"><Calculator className="h-4 w-4" /> Dental cost calculator</Link>
            <Link prefetch={false} href={urls.dubaiReasons} className="btn-ghost">Find care by reason for your visit</Link>
          </div>
        </Section>

        {grouped.map((group) => group.items.length === 0 ? null : (
          <Section key={group.title} title={group.title}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((s) => (
                <Link key={s.slug} href={urls.service(s.slug)} className={cn('block-card group flex flex-col justify-between overflow-hidden border-transparent', toneClass[s.tone])}>
                  <span className="relative block aspect-[16/9] overflow-hidden">
                    <Image src={imageForService(s.slug).src} alt="" width={imageForService(s.slug).width} height={imageForService(s.slug).height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </span>
                  <span className="block px-6 pt-5">
                    <span className="display block text-3xl text-ink">{headingOf(s)}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-ink/75 line-clamp-4">{answerOf(s)}</span>
                  </span>
                  <span className="mt-6 flex items-center justify-between px-6 pb-6 text-sm font-semibold text-ink">
                    From {formatAed(s.price.from)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-5"><PageImageCredits images={[images.chairWhite, ...services.map((s) => imageForService(s.slug))]} /></div>

      <GuideCta title="Not sure what you need?" text="A check-up is the right first step. Find a licensed clinic near you and book a consultation." href="/find-clinics/?near=me" cta="Find a dentist near me" />
    </PageLayout>
  );
}
