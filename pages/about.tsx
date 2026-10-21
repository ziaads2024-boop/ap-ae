import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, Users, Star, Building2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SITE_NAME, SITE_DOMAIN } from '@/lib/site-data';

const BASE_URL = 'https://www.appointpanda.ae';

export default function AboutPage() {
  return (
    <PageLayout>
      <Head>
        <title>About {SITE_NAME}.ae — UAE Dental Directory</title>
        <meta name="description" content={`${SITE_NAME}.ae is an independent UAE dental directory and guide: plain-language treatment guides and licensed clinics across all seven emirates. Learn more about our mission.`} />
        <link rel="canonical" href={`${BASE_URL}/about/`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/about/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name" content="AppointPanda" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:url" content={`${BASE_URL}/about/`} />
        <meta name="twitter:title" content={`About ${SITE_NAME}.ae — UAE Dental Directory`} />
        <meta name="twitter:description" content={`${SITE_NAME}.ae is an independent UAE dental directory and guide: plain-language treatment guides and licensed clinics across all seven emirates. Learn more about our mission.`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <link rel="alternate" hrefLang="en-AE" href={`${BASE_URL}/about/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/about/`} />
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <meta property="og:title" content={`About ${SITE_NAME}.ae`} />
        <meta property="og:description" content="Connecting patients with verified dental care across the UAE." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PageHero
        kicker="About us"
        title={`Dental care, explained`}
        subtitle={`${SITE_NAME}.ae helps people in the UAE understand dental treatment and find licensed clinics near them, without the sales pitch.`}
      />

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900">Our mission</h2>
            <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
              We believe that finding the right dentist should be as easy as booking a hotel. 
              Since our founding, we&apos;ve been on a mission to bring transparency, choice, and convenience 
              to dental care across the United Arab Emirates.
            </p>
            <p className="text-zinc-600 text-sm mt-3 leading-relaxed">
              Our treatment and emirate guides are written by our editorial team and reviewed regularly; each shows when it was last reviewed.
              Prices in our guides are indicative ranges, not quotes. Clinic ratings come from Google and are shown as reported.
              Our verification policy explains exactly what a &ldquo;verified&rdquo; label on a listing means.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900">Our values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[
                { title: 'Transparency', desc: 'We say where information comes from, when it was last reviewed, and what it does not cover.' },
                { title: 'Trust', desc: 'We never write, buy or edit reviews, and listing a clinic is not a recommendation.' },
                { title: 'Accessibility', desc: 'Quality dental care should be easy to find, compare, and book — in English and Arabic.' },
              ].map((v) => (
                <div key={v.title} className="card-hover-amber p-5">
                  <h3 className="font-semibold text-zinc-900 text-sm">{v.title}</h3>
                  <p className="text-zinc-500 text-xs mt-2 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
