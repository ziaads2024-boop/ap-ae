import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SITE_NAME } from '@/lib/site-data';
import { GuideCta } from '@/components/guide/GuideBlocks';

const BASE_URL = 'https://www.appointpanda.ae';

export default function AboutPage() {
  return (
    <PageLayout>
      <Head>
        <title>{`About ${SITE_NAME}.ae — Dubai Dental Directory`}</title>
        <meta name="description" content={`${SITE_NAME}.ae is an independent UAE dental directory and guide: plain-language treatment guides and a directory of licensed clinics, live in Dubai with other emirates coming soon. Learn more about our mission.`} />
        <link rel="canonical" href={`${BASE_URL}/about/`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/about/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name" content="AppointPanda" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:url" content={`${BASE_URL}/about/`} />
        <meta name="twitter:title" content={`About ${SITE_NAME}.ae — Dubai Dental Directory`} />
        <meta name="twitter:description" content={`${SITE_NAME}.ae is an independent UAE dental directory and guide: plain-language treatment guides and a directory of licensed clinics, live in Dubai with other emirates coming soon. Learn more about our mission.`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <link rel="alternate" hrefLang="en-AE" href={`${BASE_URL}/about/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/about/`} />
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <meta property="og:title" content={`About ${SITE_NAME}.ae`} />
        <meta property="og:description" content="Plain-language dental guides and a directory of licensed clinics in Dubai." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PageHero
        kicker="About us"
        title={`Dental care, explained`}
        subtitle={`${SITE_NAME}.ae helps people in the UAE understand dental treatment and find licensed clinics near them, without the sales pitch.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        tone="sand"
      />

      <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
        <section aria-labelledby="who-we-are">
          <h2 id="who-we-are" className="heading-section">Who we are</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="block-card-static p-6">
              <h3 className="font-semibold text-ink">What AppointPanda is</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
                {SITE_NAME}.ae is an online directory of dental clinics and a set of plain-language treatment guides.
                We are live in Dubai; listings and guides for the other emirates are coming soon and are for information only.
              </p>
            </div>
            <div className="block-card-static p-6">
              <h3 className="font-semibold text-ink">A directory, not a clinic</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
                We do not provide dental treatment, diagnose or employ dentists. When you request an appointment, the clinic
                (or our team, if the clinic is not on {SITE_NAME} yet) contacts you to agree a time. Treatment decisions are between you and your dentist.
              </p>
            </div>
            <div className="block-card-static p-6">
              <h3 className="font-semibold text-ink">How we make money</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
                Clinics can pay for a subscription with extra profile and request tools, and for verification of their listing.
                Clinics do not pay to rank: paying does not change a clinic&apos;s position in search results.{' '}
                <Link href="/pricing/" className="font-medium text-ink underline underline-offset-2">See clinic pricing</Link>
              </p>
            </div>
            <div className="block-card-static p-6">
              <h3 className="font-semibold text-ink">Contact us</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
                Questions, corrections or press enquiries:
              </p>
              <a href="mailto:hello@appointpanda.ae" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-2">
                <Mail className="h-4 w-4" aria-hidden="true" /> hello@appointpanda.ae
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="mission">
          <h2 id="mission" className="heading-section">Our mission</h2>
          <div className="mt-4 max-w-3xl space-y-4 text-[16px] leading-relaxed text-zinc-700">
            <p>
              Choosing a dentist should not mean guessing. We explain treatments and typical costs in plain
              language, show where each piece of information comes from, and make it simple to contact a clinic,
              starting with Dubai.
            </p>
            <p>
              Our treatment and emirate guides are written by our editorial team and reviewed regularly; each shows when it was last reviewed.
              Prices in our guides are indicative ranges, not quotes. Clinic ratings come from Google and are shown as reported.
              Our <Link href="/verification-policy/" className="font-medium text-ink underline underline-offset-2">verification policy</Link> explains exactly what a &ldquo;verified&rdquo; label on a listing means.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="values">
          <h2 id="values" className="heading-section">Our values</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { title: 'Transparency', desc: 'We say where information comes from, when it was last reviewed, and what it does not cover.' },
              { title: 'Trust', desc: 'We never write, buy or edit reviews, and listing a clinic is not a recommendation.' },
              { title: 'Accessibility', desc: 'Dental care should be easy to find and compare, with prices in AED and no sign-up needed.' },
            ].map((v) => (
              <div key={v.title} className="block-card-static p-6">
                <h3 className="font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/editorial-policy/" className="btn-ghost">Editorial policy <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/medical-review-policy/" className="btn-ghost">Medical review policy <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
      </div>

      <GuideCta
        title="Find your dentist"
        text="Compare licensed clinics in Dubai by area, treatment and insurance."
        href="/find-clinics/"
        cta="Find a dentist"
      />
    </PageLayout>
  );
}
