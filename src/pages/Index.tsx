'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowRight, LocateFixed, MapPin, Search, ShieldCheck, Star, Receipt, MessageCircleQuestion } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { PageLayout } from '@/components/layout/PageLayout';
import { FaqList, JsonLd, PageImageCredits } from '@/components/guide/GuideBlocks';
import { images, imageForEmirate, imageForService } from '@/content/images';
import { emirates, services, toneClass, urls, formatAed, LOCAL_GUIDE_SERVICES, serviceBySlug } from '@/content';
import { faqSchema, organizationSchema, websiteSchema } from '@/content/schema';
import { cn } from '@/lib/utils';
import type { HomePageData } from '../../pages/index';

const HOME_FAQS = [
  {
    q: 'How does AppointPanda choose which clinics to list?',
    a: 'We list dental clinics operating in the UAE and show the licensing authority for each emirate so you can check a clinic yourself. Being listed is not a recommendation. Our verification policy explains what a "verified" label means.',
  },
  {
    q: 'Are the prices on AppointPanda quotes?',
    a: 'No. Treatment guides show indicative AED ranges for private clinics so you know what to expect. Only the clinic can give you a price, after examining you. Ask for an itemised quote in writing.',
  },
  {
    q: 'Where do the ratings come from?',
    a: 'Ratings and review counts on clinic listings come from Google and are shown as reported. We do not write, buy or edit reviews.',
  },
  {
    q: 'Will my insurance cover dental treatment?',
    a: 'It depends on your plan. Basic mandatory plans in the UAE usually cover little routine dental care; employer plans often add a dental benefit with an annual limit. Each emirate guide explains the basics, and the clinic can check cover with your insurer.',
  },
  {
    q: 'What should I do in a dental emergency?',
    a: 'Call a dental clinic and describe the problem; many keep same-day slots. If swelling spreads towards your eye or neck, you have difficulty breathing or swallowing, or there was a serious injury, call 998 or go to a hospital emergency department.',
  },
];

const LOCAL_PICKS: [string, string][] = [
  ['dubai', 'invisalign'],
  ['abu-dhabi', 'dental-implants'],
  ['sharjah', 'veneers'],
  ['dubai', 'emergency-dentist'],
  ['ajman', 'braces'],
  ['ras-al-khaimah', 'root-canal'],
];

interface IndexPageProps {
  pageData?: HomePageData | null;
}

export default function IndexPage({ pageData }: IndexPageProps) {
  const router = useRouter();
  const [emirate, setEmirate] = useState('');
  const [specialty, setSpecialty] = useState('');

  const go = (near = false) => {
    const params = new URLSearchParams();
    if (emirate) params.set('emirate', emirate);
    if (specialty) params.set('specialty', specialty);
    if (near) params.set('near', 'me');
    const qs = params.toString();
    router.push(`/find-clinics/${qs ? `?${qs}` : ''}`);
  };

  const clinicCount = pageData?.clinicCount || 0;
  const reviewCount = pageData?.reviewCount || 0;
  const topClinics = (pageData?.topDentalClinics || []).slice(0, 6);
  const countsByEmirate = new Map((pageData?.statesData || []).map((s) => [s.slug, s.clinicCount]));

  return (
    <PageLayout>
      <SEOHead
        title="AppointPanda: Find a Licensed Dentist Near You in the UAE"
        description="Find and compare licensed dental clinics in Dubai, Abu Dhabi, Sharjah and across the UAE. Clear treatment guides, indicative AED costs and Google ratings, without the sales pitch."
        canonical="/"
      />
      <JsonLd data={[organizationSchema(), websiteSchema(), faqSchema(HOME_FAQS)]} />

      {/* Hero */}
      <section className="px-3 pt-4 lg:px-6">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-tone-lemon px-6 pb-12 pt-14 lg:px-14 lg:pb-16 lg:pt-20">
          {/* Soft shapes, a nod to the inflated 3D style in the reference, done in CSS */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-tone-lime opacity-80 lg:size-[26rem]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-40 hidden size-56 rounded-[45%] bg-tone-sky opacity-90 lg:block" />

          {/* Photo collage (desktop only, so it never delays the mobile hero) */}
          <div aria-hidden="true" className="pointer-events-none absolute right-10 top-14 hidden w-[360px] xl:block 2xl:right-16 2xl:w-[400px]">
            <div className="relative h-[460px]">
              <div className="absolute right-0 top-0 h-[300px] w-[270px] rotate-3 overflow-hidden rounded-[2.25rem] ring-4 ring-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <Image src={images.chairWhite.src} alt="" width={images.chairWhite.width} height={images.chairWhite.height} sizes="300px" priority className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-6 left-0 h-[190px] w-[200px] -rotate-6 overflow-hidden rounded-full ring-4 ring-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <Image src={images.braces.src} alt="" width={images.braces.width} height={images.braces.height} sizes="220px" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-6 h-[150px] w-[170px] rotate-2 overflow-hidden rounded-[1.75rem] ring-4 ring-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <Image src={images.dubai.src} alt="" width={images.dubai.width} height={images.dubai.height} sizes="180px" className="h-full w-full object-cover" />
              </div>
              <div className="absolute left-6 top-24 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Licensed by</p>
                <p className="text-sm font-semibold text-ink">DHA · DoH · MOHAP</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-4xl xl:max-w-3xl">
            <span className="chip-label">UAE dental directory · all 7 emirates</span>
            <h1 className="display mt-6 text-[clamp(3.2rem,10vw,8.5rem)] text-ink">
              Find a dentist{' '}<br />you can trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl">
              Compare licensed clinics near you, understand the treatment before you go, and know what it usually costs in AED.
            </p>
          </div>

          <form
            className="relative mt-10 grid max-w-4xl gap-2 xl:max-w-3xl rounded-[1.75rem] bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:grid-cols-[1fr_1fr_auto_auto]"
            onSubmit={(e) => { e.preventDefault(); go(); }}
            role="search"
            aria-label="Find a dental clinic"
          >
            <label className="relative">
              <span className="sr-only">Treatment</span>
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="h-14 w-full rounded-[1.25rem] bg-paper px-4 text-[15px] font-medium text-ink">
                <option value="">Any treatment</option>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </label>
            <label className="relative">
              <span className="sr-only">Emirate</span>
              <select value={emirate} onChange={(e) => setEmirate(e.target.value)} className="h-14 w-full rounded-[1.25rem] bg-paper px-4 text-[15px] font-medium text-ink">
                <option value="">Any emirate</option>
                {emirates.map((e) => <option key={e.slug} value={e.slug}>{e.name}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => go(true)} className="btn-ghost h-14 rounded-[1.25rem]">
              <LocateFixed className="h-4 w-4" /> Near me
            </button>
            <button type="submit" className="btn-ink h-14 rounded-[1.25rem] px-7">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>

          <div className="relative mt-5 flex flex-wrap gap-2">
            {['dental-implants', 'invisalign', 'emergency-dentist', 'teeth-whitening', 'pediatric-dentistry', 'root-canal'].map((slug) => {
              const s = serviceBySlug(slug)!;
              return (
                <Link key={slug} href={urls.service(slug)} className="rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-white">
                  {s.shortName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Honest trust strip */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <ul className="grid gap-3 md:grid-cols-3">
          <li className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-ink">Licensing explained</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">Each emirate guide names the regulator (DHA, DoH or MOHAP) so you can check a dentist&apos;s licence yourself.</p>
            </div>
          </li>
          <li className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <Star className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-ink">Ratings, unedited</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {reviewCount > 0
                  ? `${reviewCount.toLocaleString()} Google reviews across ${clinicCount.toLocaleString()} listed clinics, shown as reported.`
                  : 'Clinic ratings come from Google and are shown as reported. We never write or edit reviews.'}
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <Receipt className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-ink">Costs in AED, as a guide</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">Indicative price ranges for every treatment guide, plus what pushes a quote up or down.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Emirates */}
      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] text-ink">Dentists by emirate</h2>
          <Link href={urls.emirates} className="inline-flex items-center gap-1 text-sm font-semibold text-ink">Compare emirates <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emirates.map((e, i) => {
            const photo = imageForEmirate(e.slug);
            return (
              <Link
                key={e.slug}
                href={urls.emirate(e.slug)}
                className={cn('group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[1.25rem]', i === 0 && 'sm:col-span-2 lg:row-span-2 lg:min-h-full')}
              >
                <Image src={photo.src} alt="" fill sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <span className="relative p-5">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={cn('display text-white', i === 0 ? 'text-6xl' : 'text-3xl')}>{e.name}</span>
                    <span className="text-sm text-white/75" lang="ar">{e.nameAr}</span>
                  </span>
                  <span className={cn('mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-ink', toneClass[e.tone])}>
                    {countsByEmirate.get(e.slug) ? `${countsByEmirate.get(e.slug)!.toLocaleString()} listed clinics` : `Licensed by ${e.regulator.short}`}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Treatments */}
      <section className="px-3 py-14 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink px-6 py-14 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <span className="chip-label !bg-tone-lemon !text-ink">Treatment guides</span>
            <h2 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)] text-white">Understand it{' '}<br />before you book it</h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <Link key={s.slug} href={urls.service(s.slug)} className="group overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={imageForService(s.slug).src} alt="" width={imageForService(s.slug).width} height={imageForService(s.slug).height} sizes="(min-width: 1024px) 22vw, 50vw" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                    <span className={cn('absolute left-3 top-3 size-3 rounded-full ring-2 ring-white', toneClass[s.tone])} aria-hidden="true" />
                  </span>
                  <span className="block p-5">
                    <span className="block font-semibold text-white">{s.name}</span>
                    <span className="mt-1 block text-sm text-zinc-400">From {formatAed(s.price.from)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] text-ink">Three steps, no guesswork</h2>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { n: '01', t: 'Read the guide', d: 'Learn what the treatment involves, who it suits, the risks and the usual cost range in the UAE.', tone: 'lemon' },
            { n: '02', t: 'Compare clinics', d: 'Filter by emirate, treatment or your location and check each clinic\'s Google rating and licence.', tone: 'sky' },
            { n: '03', t: 'Ask the right questions', d: 'Every guide ends with questions to ask, so you get an itemised quote and a clear plan.', tone: 'blush' },
          ].map((step) => (
            <li key={step.n} className={cn('rounded-3xl p-7', toneClass[step.tone])}>
              <span className="display text-6xl text-ink">{step.n}</span>
              <p className="mt-4 text-lg font-semibold text-ink">{step.t}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink/75">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Real clinics, only when the directory returned them */}
      {topClinics.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] text-ink">Most-reviewed clinics</h2>
            <Link href="/find-clinics/" className="inline-flex items-center gap-1 text-sm font-semibold text-ink">All clinics <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-zinc-500">Sorted by number of Google reviews. This is not a ranking of quality or a recommendation.</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {topClinics.map((c) => (
              <li key={c.id}>
                <Link href={`/clinic/${c.slug}/`} className="block-card block overflow-hidden">
                  <div className="aspect-[16/9] bg-paper">
                    {c.coverImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.coverImageUrl} alt={`${c.name}`} loading="lazy" width={480} height={270} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-semibold leading-snug text-ink line-clamp-2">{c.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                      <MapPin className="h-3.5 w-3.5" /> {[c.cityName, c.stateName].filter(Boolean).join(', ') || 'UAE'}
                    </p>
                    {c.rating > 0 && (
                      <p className="mt-2 flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-ink" /> <span className="font-semibold">{c.rating.toFixed(1)}</span>
                        <span className="text-zinc-500">({c.reviewCount.toLocaleString()} Google reviews)</span>
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Local guides */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] text-ink">Local guides</h2>
        <p className="mt-3 max-w-2xl text-zinc-600">Treatment guides written for each emirate: who licenses the clinics, how insurance usually treats it, and what to look out for locally.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOCAL_PICKS.filter(([, s]) => LOCAL_GUIDE_SERVICES.includes(s)).map(([e, s]) => {
            const service = serviceBySlug(s)!;
            const em = emirates.find((x) => x.slug === e)!;
            return (
              <Link key={`${e}-${s}`} href={urls.serviceEmirate(e, s)} className="block-card group flex items-center justify-between gap-4 p-5">
                <span>
                  <span className="block font-semibold text-ink">{service.shortName} in {em.name}</span>
                  <span className="block text-sm text-zinc-500">{em.regulator.short} · from {formatAed(service.price.from)}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Before you book */}
      <section className="px-3 py-10 lg:px-6">
        <div className="mx-auto grid max-w-[1400px] gap-8 rounded-[2rem] bg-tone-sky px-6 py-14 lg:grid-cols-[1fr_1.2fr] lg:px-14">
          <div>
            <MessageCircleQuestion className="h-8 w-8 text-ink" />
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-ink">Five questions for any clinic</h2>
            <p className="mt-4 text-ink/75">Ask these at your first consultation, whatever the treatment.</p>
          </div>
          <ol className="space-y-3">
            {[
              'Who will treat me, and what are their qualifications for this treatment?',
              'Can I have an itemised quote in writing, including X-rays and follow-ups?',
              'What are the alternatives, including doing nothing for now?',
              'Do you bill my insurer directly, and do you need pre-approval?',
              'What happens, and what does it cost, if something needs redoing?',
            ].map((q, i) => (
              <li key={q} className="flex gap-4 rounded-2xl bg-white p-5">
                <span className="display text-3xl text-primary">{i + 1}</span>
                <span className="text-[15px] font-medium leading-snug text-ink">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-10">
        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] text-ink">Questions, answered</h2>
        <div className="mt-8"><FaqList faqs={HOME_FAQS} /></div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <PageImageCredits images={[images.chairWhite, images.braces, ...emirates.map((e) => imageForEmirate(e.slug)), ...services.map((s) => imageForService(s.slug))]} />
      </div>

      {/* Closing CTA */}
      <section className="px-3 py-10 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-lime px-6 py-16 text-center lg:py-24">
          <h2 className="display mx-auto text-[clamp(3rem,9vw,7.5rem)] text-ink">Find your{' '}<br />dentist.</h2>
          <p className="mx-auto mt-4 max-w-md text-ink/75">Use your location to see licensed clinics closest to you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/find-clinics/?near=me" className="btn-ink"><LocateFixed className="h-4 w-4" /> Dentists near me</Link>
            <Link href="/list-your-practice/" className="btn-ghost">List your clinic</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
