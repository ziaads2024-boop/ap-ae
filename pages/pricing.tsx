import Head from 'next/head';
import Link from 'next/link';
import { Check, Minus, ArrowRight, Store, Star, Building2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SITE_NAME } from '@/lib/site-data';

const BASE_URL = 'https://www.appointpanda.ae';

const plans = [
  {
    name: 'Starter', price: 'Free', icon: <Store className="h-5 w-5" aria-hidden="true" />,
    features: ['Single clinic profile', 'Basic listing on directory', 'Manual profile updates', 'Email support'],
    cta: 'Get started', featured: false,
  },
  {
    name: 'Growth', price: 'AED 499', period: '/mo', icon: <Star className="h-5 w-5" aria-hidden="true" />,
    features: ['Everything in Starter', 'Appointment requests in your dashboard', 'Analytics dashboard', 'Review management', 'Insurance list on your profile', 'Priority support'],
    cta: 'Start free trial', featured: true,
  },
  {
    name: 'Network', price: 'AED 1,499', period: '/mo', icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
    features: ['Everything in Growth', 'Multi-branch management', 'Dedicated account manager'],
    cta: 'Contact sales', featured: false,
  },
];

export default function PricingPage() {
  return (
    <PageLayout>
      <Head>
        <title>{`Pricing — ${SITE_NAME}.ae`}</title>
        <meta name="description" content={`Simple, transparent pricing for dental clinics. From free listing to premium multi-branch plans with analytics, booking, and priority placement.`} />
        <link rel="canonical" href={`${BASE_URL}/pricing/`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/pricing/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name" content="AppointPanda" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:url" content={`${BASE_URL}/pricing/`} />
        <meta name="twitter:title" content={`Pricing — ${SITE_NAME}.ae`} />
        <meta name="twitter:description" content={`Simple, transparent pricing for dental clinics. From free listing to premium multi-branch plans with analytics, booking, and priority placement.`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <link rel="alternate" hrefLang="en-AE" href={`${BASE_URL}/pricing/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/pricing/`} />
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <meta property="og:title" content={`Pricing — ${SITE_NAME}.ae`} />
        <meta property="og:description" content="Simple pricing for dental clinics." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PageHero
        kicker="Simple, transparent"
        title="Pricing for every practice"
        subtitle="From a free starter listing to a full growth platform. No commission, no hidden fees."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'For clinics', href: '/for-clinics/' }, { label: 'Pricing' }]}
        tone="lime"
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink">
          <li className="flex items-center gap-1.5"><Check className="h-4 w-4" aria-hidden="true" /> No setup fee</li>
          <li className="flex items-center gap-1.5"><Check className="h-4 w-4" aria-hidden="true" /> Cancel anytime</li>
          <li className="flex items-center gap-1.5"><Check className="h-4 w-4" aria-hidden="true" /> Zero commission</li>
        </ul>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`flex flex-col rounded-[1.25rem] bg-white p-6 ${plan.featured ? 'border-2 border-ink' : 'border border-black/10'}`}>
              <div className="mb-4 flex items-center gap-2">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${plan.featured ? 'bg-ink text-white' : 'bg-paper text-ink'}`}>
                  {plan.icon}
                </div>
                <h2 className="font-semibold text-ink">{plan.name}</h2>
              </div>
              <p className="mb-6">
                <span className="text-3xl font-bold tracking-tight text-ink">{plan.price}</span>
                {plan.period && <span className="text-sm text-zinc-600">{plan.period}</span>}
              </p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] text-zinc-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/for-clinics/" className={`${plan.featured ? 'btn-ink' : 'btn-ghost'} mt-auto w-full`}>
                {plan.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mt-16">
          <h2 className="heading-section">Compare plans</h2>
          <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-black/10 bg-white">
            <table className="w-full min-w-[520px] text-sm">
              <caption className="sr-only">Features included in each plan</caption>
              <thead>
                <tr className="border-b border-black/10">
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-ink">Feature</th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-ink">Starter</th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-ink">Growth</th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-ink">Network</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Clinic profile', true, true, true],
                  ['Treatments, prices and hours', true, true, true],
                  ['Appointment requests', false, true, true],
                  ['Analytics dashboard', false, true, true],
                  ['Review management', false, true, true],
                  ['Insurance list on profile', false, true, true],
                  ['Multi-branch', false, false, true],
                  ['Dedicated manager', false, false, true],
                ].map((row) => (
                  <tr key={row[0] as string} className="border-b border-black/5 last:border-0">
                    <th scope="row" className="px-4 py-3 text-left font-normal text-zinc-700">{row[0]}</th>
                    {[1, 2, 3].map((j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        {row[j]
                          ? <Check className="inline h-4 w-4 text-ink" aria-label="Included" />
                          : <Minus className="inline h-4 w-4 text-zinc-400" aria-label="Not included" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
