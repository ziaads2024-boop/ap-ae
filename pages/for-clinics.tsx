import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, BarChart3, CalendarCheck, ShieldCheck, Users, Eye, Star } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SITE_NAME } from '@/lib/site-data';
import { PageHero } from '@/components/layout/PageHero';
import { FaqList } from '@/components/guide/GuideBlocks';

const BASE_URL = 'https://www.appointpanda.ae';

export default function ForClinicsPage() {
  return (
    <PageLayout>
      <Head>
        <title>{`List Your Dental Clinic — ${SITE_NAME}.ae`}</title>
        <meta name="description" content={`List your dental clinic on ${SITE_NAME}, reach patients searching by emirate and treatment, and manage your profile, bookings and reviews in one place.`} />
        <link rel="canonical" href={`${BASE_URL}/for-clinics/`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/for-clinics/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name" content="AppointPanda" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:url" content={`${BASE_URL}/for-clinics/`} />
        <meta name="twitter:title" content={`List Your Dental Clinic — ${SITE_NAME}.ae`} />
        <meta name="twitter:description" content={`List your dental clinic on ${SITE_NAME}, reach patients searching by emirate and treatment, and manage your profile, bookings and reviews in one place.`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        <link rel="alternate" hrefLang="en-AE" href={`${BASE_URL}/for-clinics/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/for-clinics/`} />
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <meta property="og:title" content={`List Your Dental Clinic — ${SITE_NAME}.ae`} />
        <meta property="og:description" content="List your dental clinic on AppointPanda." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PageHero
        kicker="For dental clinics"
        title={`Grow your practice with ${SITE_NAME}`}
        subtitle="Claim or create your clinic profile, keep your treatments and hours up to date, and let patients searching your emirate find you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'For clinics' }]}
        tone="lime"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/list-your-practice/" className="btn-ink">
            List your clinic <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/pricing/" className="btn-ghost">See pricing</Link>
          <Link href="/claim-profile/" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-ink underline underline-offset-4">Claim an existing profile</Link>
        </div>
      </PageHero>

      {/* Features grid */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        <h2 className="heading-section">Everything you need to grow</h2>
        <p className="mt-3 max-w-xl text-zinc-700">From profile management to analytics — we handle the platform so you can focus on patients.</p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <CalendarCheck className="h-5 w-5" aria-hidden="true" />, title: 'Appointment requests', desc: 'Patients send a request with a preferred day and time of day; you see it in your dashboard and call them to confirm.' },
            { icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />, title: 'Analytics dashboard', desc: 'Track profile views, bookings, and revenue. See exactly where your patients come from.' },
            { icon: <Users className="h-5 w-5" aria-hidden="true" />, title: 'Patient list', desc: 'Keep track of the patients who contacted you through AppointPanda and their requests.' },
            { icon: <Star className="h-5 w-5" aria-hidden="true" />, title: 'Review management', desc: 'Respond to reviews, showcase testimonials, and build your reputation.' },
            { icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />, title: 'Insurance list', desc: 'Show which insurers you accept so patients can filter by their plan.' },
            { icon: <Eye className="h-5 w-5" aria-hidden="true" />, title: 'Visibility in search', desc: 'Appear in emirate, treatment and "near me" searches once your listing is live.' },
          ].map((feature) => (
            <div key={feature.title} className="block-card-static p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-paper text-ink">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-zinc-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="mx-auto max-w-6xl px-5 pb-12 lg:pb-16">
        <h2 className="heading-section">How onboarding works</h2>
        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '1', title: 'Sign up', desc: 'Create your clinic profile in minutes.' },
            { step: '2', title: 'Verify', desc: 'We verify your regulatory license.' },
            { step: '3', title: 'Optimise', desc: 'Add treatments, photos, and team.' },
            { step: '4', title: 'Go live', desc: 'Patients can send you appointment requests once your profile is live.' },
          ].map((item) => (
            <li key={item.step} className="block-card-static p-6">
              <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white" aria-hidden="true">{item.step}</span>
              <h3 className="mt-4 font-semibold text-ink"><span className="sr-only">Step {item.step}: </span>{item.title}</h3>
              <p className="mt-1 text-[15px] text-zinc-700">{item.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 pb-12 lg:pb-16">
        <h2 className="heading-section">Clinic FAQs</h2>
        <div className="mt-6">
          <FaqList
            faqs={[
              { q: 'How long does it take to get listed?', a: 'A claimed profile can be edited straight away. Verification follows the checks in our verification policy and depends on how quickly we can confirm your licence.' },
              { q: 'Is there a minimum commitment?', a: 'No. You can cancel at any time. We\'re confident you\'ll stay once you see the results.' },
              { q: 'Do you charge commission on bookings?', a: 'No commission whatsoever. You keep 100% of treatment fees. Our model is subscription-based only.' },
              { q: 'Can I manage my own profile?', a: 'Absolutely. You get full access to your clinic dashboard where you can update treatments, prices, photos and opening hours.' },
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-3 pb-10 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink px-6 py-14 text-center lg:py-20">
          <h2 className="heading-section !text-white">Ready to grow your practice?</h2>
          <p className="mt-3 text-zinc-300">Questions? <Link href="/contact/" className="font-semibold text-white underline underline-offset-2">Contact our team</Link> before you sign up.</p>
          <Link href="/list-your-practice/" className="btn-ink mt-6 !bg-white !text-ink hover:!bg-zinc-100">
            List your clinic today <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
