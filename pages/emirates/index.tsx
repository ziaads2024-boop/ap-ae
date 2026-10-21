import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import Image from 'next/image';
import { GuideCta, GuideHero, JsonLd, PageImageCredits, Section } from '@/components/guide/GuideBlocks';
import { imageForEmirate } from '@/content/images';
import { emirates, SITE_URL, toneClass, urls } from '@/content';
import { breadcrumbSchema } from '@/content/schema';
import { cn } from '@/lib/utils';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Emirates', path: urls.emirates },
];

export default function EmiratesIndex() {
  return (
    <PageLayout>
      <SEOHead
        title="Dentists by Emirate: Licensing & Clinics Across the UAE"
        description="Find a dentist in any of the seven emirates. Who licenses clinics where, what insurance usually covers, and licensed dental clinics in Dubai, Abu Dhabi, Sharjah and the Northern Emirates."
        canonical={urls.emirates}
        ogImage={`${SITE_URL}${imageForEmirate('dubai').src}`}
      />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Dentists by emirate',
            url: `${SITE_URL}${urls.emirates}`,
            hasPart: emirates.map((e) => ({ '@type': 'MedicalWebPage', name: `Dentists in ${e.name}`, url: `${SITE_URL}${urls.emirate(e.slug)}` })),
          },
        ]}
      />

      <GuideHero
        tone="sky"
        crumbs={crumbs}
        label="All seven emirates"
        title={<>Seven emirates,{' '}<br />three regulators</>}
        image={imageForEmirate('abu-dhabi')}
        badge={{ label: 'Regulators', value: 'DHA · DoH · MOHAP' }}
        answer="Dental clinics in Dubai are licensed by the Dubai Health Authority (or, in Dubai Healthcare City, its own authority), clinics in Abu Dhabi by the Department of Health - Abu Dhabi, and clinics in Sharjah and the Northern Emirates by the federal Ministry of Health and Prevention."
      />

      <div className="mx-auto max-w-6xl px-5">
        <Section title="Choose your emirate">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {emirates.map((e) => (
              <Link key={e.slug} href={urls.emirate(e.slug)} className={cn('block-card group flex flex-col justify-between overflow-hidden border-transparent', toneClass[e.tone])}>
                <span className="relative block aspect-[16/9] overflow-hidden">
                  <Image src={imageForEmirate(e.slug).src} alt="" width={imageForEmirate(e.slug).width} height={imageForEmirate(e.slug).height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </span>
                <span className="block px-6 pt-5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="display text-4xl text-ink">{e.name}</span>
                    <span className="text-lg text-ink/60" lang="ar">{e.nameAr}</span>
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink/75">{e.summary}</span>
                </span>
                <span className="mt-6 flex items-center justify-between px-6 pb-6 text-sm font-semibold text-ink">
                  Regulator: {e.regulator.short}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Comparing at a glance">
          <div className="overflow-x-auto rounded-3xl border border-black/10 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Dental licensing and insurance by emirate</caption>
              <thead className="bg-paper text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th scope="col" className="px-5 py-3">Emirate</th>
                  <th scope="col" className="px-5 py-3">Licensing body</th>
                  <th scope="col" className="px-5 py-3">Insurance note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {emirates.map((e) => (
                  <tr key={e.slug}>
                    <th scope="row" className="px-5 py-4 font-semibold text-ink"><Link href={urls.emirate(e.slug)} className="underline">{e.name}</Link></th>
                    <td className="px-5 py-4 text-zinc-700">{e.regulator.name}</td>
                    <td className="px-5 py-4 text-zinc-600">{e.insurance[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      <div className="mx-auto max-w-6xl px-5"><PageImageCredits images={emirates.map((e) => imageForEmirate(e.slug))} /></div>

      <GuideCta title="Find a dentist near you" text="Use your location to see licensed clinics closest to you, wherever you are in the UAE." href="/find-clinics/?near=me" cta="Use my location" />
    </PageLayout>
  );
}
