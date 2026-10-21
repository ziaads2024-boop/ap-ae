import Head from 'next/head';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SITE_NAME } from '@/lib/site-data';
import { emirates, services, urls, hasLocalGuide } from '@/content';

const BASE_URL = 'https://www.appointpanda.ae';

export default function SitemapPage() {
  return (
    <PageLayout>
      <Head>
        <title>Sitemap — {SITE_NAME}.ae</title>
        <meta name="description" content={`Complete site map for ${SITE_NAME}.ae — find every page across our dental directory.`} />
        <link rel="canonical" href={`${BASE_URL}/sitemap/`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/sitemap/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name" content="AppointPanda" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:url" content={`${BASE_URL}/sitemap/`} />
        <meta name="twitter:title" content={`Sitemap — ${SITE_NAME}.ae`} />
        <meta name="twitter:description" content={`Complete site map for ${SITE_NAME}.ae — find every page across our dental directory.`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <link rel="alternate" hrefLang="en-AE" href={`${BASE_URL}/sitemap/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/sitemap/`} />
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
      </Head>

      <PageHero
        kicker="Site index"
        title="Sitemap"
      />

      <div className="max-w-5xl mx-auto px-5 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">Find care</h2>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Find a dentist', href: '/find-clinics/' },
                { label: 'Dentists near me', href: '/find-clinics/?near=me' },
                { label: 'All treatments', href: urls.services },
                { label: 'All emirates', href: urls.emirates },
                { label: 'Insurance', href: '/insurance/' },
                { label: 'Guides and articles', href: '/blog/' },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-zinc-600 hover:text-ink hover:underline">{l.label}</Link></li>
              ))}
            </ul>
            <h2 className="mb-3 mt-8 text-sm font-semibold text-ink">AppointPanda</h2>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About', href: '/about/' },
                { label: 'How it works', href: '/how-it-works/' },
                { label: 'For clinics', href: '/for-clinics/' },
                { label: 'List your clinic', href: '/list-your-practice/' },
                { label: 'Contact', href: '/contact/' },
                { label: 'Editorial policy', href: '/editorial-policy/' },
                { label: 'Medical review policy', href: '/medical-review-policy/' },
                { label: 'Verification policy', href: '/verification-policy/' },
                { label: 'Privacy', href: '/privacy/' },
                { label: 'Terms', href: '/terms/' },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-zinc-600 hover:text-ink hover:underline">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">Treatment guides</h2>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}><Link href={urls.service(s.slug)} className="text-zinc-600 hover:text-ink hover:underline">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">Emirates and local guides</h2>
            <ul className="space-y-4 text-sm">
              {emirates.map((e) => (
                <li key={e.slug}>
                  <Link href={urls.emirate(e.slug)} className="font-medium text-ink hover:underline">Dentists in {e.name}</Link>
                  <ul className="mt-1.5 space-y-1 pl-3">
                    {services.filter((s) => hasLocalGuide(s.slug, e.slug)).map((s) => (
                      <li key={s.slug}><Link href={urls.serviceEmirate(e.slug, s.slug)} className="text-zinc-600 hover:text-ink hover:underline">{s.shortName} in {e.name}</Link></li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
