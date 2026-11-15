'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowDown, ArrowRight, LocateFixed, MapPin, Search, ShieldCheck, Star, Receipt, MessageCircleQuestion } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { PageLayout } from '@/components/layout/PageLayout';
import { FaqList, JsonLd, PageImageCredits } from '@/components/guide/GuideBlocks';
import { images, imageForService } from '@/content/images';
import { emirates, services, urls, formatAed, serviceBySlug, isLiveEmirate } from '@/content';
import { faqSchema, organizationSchema, websiteSchema } from '@/content/schema';
import { dubaiAreas, DUBAI_AREA_GROUPS, visitReasons } from '@/content/dubai';
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

// Dubai area + treatment pairs with the most search demand (Search Console)
const LOCAL_PICKS: [string, string][] = [
  ['jumeirah-beach-residence', 'veneers'],
  ['mirdif', 'invisalign'],
  ['downtown-dubai', 'dental-implants'],
  ['palm-jumeirah', 'veneers'],
  ['dubai-marina', 'teeth-whitening'],
  ['umm-suqeim', 'pediatric-dentistry'],
];

interface IndexPageProps {
  pageData?: HomePageData | null;
}

export default function IndexPage({ pageData }: IndexPageProps) {
  const router = useRouter();
  const [where, setWhere] = useState('');
  const [what, setWhat] = useState('');

  const go = (near = false) => {
    const params = new URLSearchParams();
    if (where.startsWith('e:')) params.set('emirate', where.slice(2));
    else if (where) params.set('area', where);
    if (what.startsWith('t:')) params.set('specialty', what.slice(2));
    else if (what) params.set('reason', what);
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
        title="Find a Dentist in Dubai | AppointPanda"
        description="Find a licensed dentist in Dubai by area, reason for visit or insurance. Compare Google ratings and clinic-listed prices, read plain-language treatment guides and request an appointment."
        canonical="/"
      />
      <JsonLd data={[organizationSchema(), websiteSchema(), faqSchema(HOME_FAQS)]} />

      {/* Hero */}
      <section className="px-3 pt-4 lg:px-6">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-tone-lemon px-5 pb-8 pt-7 sm:px-6 md:pb-12 md:pt-14 lg:px-14 lg:pb-16 lg:pt-20">

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
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">Dental regulators</p>
                <p className="text-sm font-semibold text-ink">DHA · DoH · MOHAP</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-4xl xl:max-w-3xl">
            <span className="chip-label">Dubai dental directory</span>
            <h1 className="display mt-4 text-[clamp(2.4rem,9vw,8.5rem)] text-ink md:mt-6">
              Find a Dubai dentist{' '}<br className="hidden md:block" />you can trust.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80 md:mt-6 md:text-xl">
              Compare licensed clinics near you, understand the treatment before you go, and know what it usually costs in AED.
            </p>
          </div>

          <form
            className="relative mt-5 grid max-w-4xl gap-2 rounded-[1.5rem] bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.10)] md:mt-10 md:grid-cols-[1fr_1fr_auto_auto] md:rounded-[1.75rem] xl:max-w-3xl"
            onSubmit={(e) => { e.preventDefault(); go(); }}
            role="search"
            aria-label="Find a dental clinic"
          >
            <label className="relative">
              <span className="sr-only">Reason for visit or treatment</span>
              <select value={what} onChange={(e) => setWhat(e.target.value)} className="h-12 w-full rounded-[1rem] bg-paper px-4 text-[15px] font-medium text-ink md:h-14 md:rounded-[1.25rem]">
                <option value="">Reason or treatment</option>
                <optgroup label="Reason for visit">
                  {visitReasons.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
                </optgroup>
                <optgroup label="Treatment">
                  {services.map((s) => <option key={s.slug} value={`t:${s.slug}`}>{s.name}</option>)}
                </optgroup>
              </select>
            </label>
            <label className="relative">
              <span className="sr-only">Area</span>
              <select value={where} onChange={(e) => setWhere(e.target.value)} className="h-12 w-full rounded-[1rem] bg-paper px-4 text-[15px] font-medium text-ink md:h-14 md:rounded-[1.25rem]">
                <option value="">All of Dubai</option>
                {dubaiAreas.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                <optgroup label="Other emirates">
                  {emirates.filter((e) => e.slug !== 'dubai').map((e) => <option key={e.slug} value={`e:${e.slug}`}>{e.name}</option>)}
                </optgroup>
              </select>
            </label>
            {/* On phones Near me and Search share one row so Search stays above the fold */}
            <div className="grid grid-cols-[auto_1fr] gap-2 md:contents">
              <button type="button" onClick={() => go(true)} className="btn-ghost h-12 rounded-[1rem] !px-4 md:h-14 md:rounded-[1.25rem]">
                <LocateFixed className="h-4 w-4" aria-hidden="true" /> Near me
              </button>
              <button type="submit" className="btn-ink h-12 rounded-[1rem] px-7 md:h-14 md:rounded-[1.25rem]">
                <Search className="h-4 w-4" aria-hidden="true" /> Search
              </button>
            </div>
          </form>

          <p className="relative mt-3 text-[13px] text-ink/80">
            Google ratings shown as reported · Treatment costs in AED, as a guide
          </p>

          <div className="relative mt-4 flex flex-wrap gap-2">
            {['toothache', 'checkup-and-cleaning', 'crooked-teeth', 'missing-tooth', 'broken-tooth', 'childs-first-visit'].map((slug) => {
              const r = visitReasons.find((x) => x.slug === slug)!;
              return (
                <Link prefetch={false} key={slug} href={urls.dubaiReason(slug)} className="inline-flex min-h-11 items-center rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink hover:bg-white">
                  {r.label}
                </Link>
              );
            })}
          </div>

          {topClinics.length > 0 && (
            <a href="#clinics" className="relative mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4">
              See the most-reviewed clinics <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      {/* Honest trust strip */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <ul className="grid gap-3 md:grid-cols-3">
          <li className="block-card-static flex gap-4 p-6">
            <ShieldCheck className="h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">Licensing explained</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">Each emirate guide names the regulator (DHA, DoH or MOHAP) so you can check a dentist&apos;s licence yourself.</p>
            </div>
          </li>
          <li className="block-card-static flex gap-4 p-6">
            <Star className="h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">Ratings, unedited</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {reviewCount > 0
                  ? `Google ratings and review counts for ${clinicCount.toLocaleString()} listed clinics, shown as reported.`
                  : 'Clinic ratings come from Google and are shown as reported. We never write or edit reviews.'}
              </p>
            </div>
          </li>
          <li className="block-card-static flex gap-4 p-6">
            <Receipt className="h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">Costs in AED, as a guide</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">Indicative price ranges for every treatment guide, plus what pushes a quote up or down.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Real clinics, only when the directory returned them */}
      {topClinics.length > 0 && (
        <section id="clinics" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="heading-section">Most-reviewed clinics</h2>
            <Link prefetch={false} href="/find-clinics/" className="inline-flex items-center gap-1 text-sm font-semibold text-ink">All clinics <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600">Sorted by number of Google reviews. This is not a ranking of quality or a recommendation.</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {topClinics.map((c) => (
              <li key={c.id}>
                <Link prefetch={false} href={`/clinic/${c.slug}/`} className="block-card block overflow-hidden">
                  <div className="aspect-[16/9] bg-paper">
                    {c.coverImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.coverImageUrl} alt={`${c.name}`} loading="lazy" width={480} height={270} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-semibold leading-snug text-ink line-clamp-2">{c.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-600">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {[c.cityName, c.stateName].filter(Boolean).join(', ') || 'UAE'}
                    </p>
                    {c.rating > 0 && (
                      <p className="mt-2 flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-ink" aria-hidden="true" /> <span className="font-semibold">{c.rating.toFixed(1)}</span>
                        <span className="text-zinc-600">({c.reviewCount.toLocaleString()} Google reviews)</span>
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Dubai areas (primary market) */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="heading-section">Dentists across Dubai</h2>
          <Link prefetch={false} href={urls.emirate('dubai')} className="inline-flex items-center gap-1 text-sm font-semibold text-ink">Dubai guide <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUBAI_AREA_GROUPS.map((group) => (
            <div key={group} className="block-card-static p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {dubaiAreas.filter((a) => a.group === group).map((a) => (
                  <li key={a.slug}>
                    <Link prefetch={false} href={urls.dubaiArea(a.slug)} className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-paper px-4 py-2 text-sm font-medium text-ink hover:border-ink">{a.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section className="px-3 py-14 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink px-6 py-14 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <span className="chip-label !bg-tone-lemon !text-ink">Treatment guides</span>
            <h2 className="heading-section mt-5 !text-white">Understand it before you book it</h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <Link prefetch={false} key={s.slug} href={urls.service(s.slug)} className="group overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={imageForService(s.slug).src} alt="" width={imageForService(s.slug).width} height={imageForService(s.slug).height} sizes="(min-width: 1024px) 22vw, 50vw" className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                    
                  </span>
                  <span className="block p-5">
                    <span className="block font-semibold text-white">{s.name}</span>
                    <span className="mt-1 block text-sm text-zinc-300">From {formatAed(s.price.from)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="heading-section">Three steps, no guesswork</h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { n: '1', t: 'Read the guide', d: 'Learn what the treatment involves, who it suits, the risks and the usual cost range in the UAE.' },
            { n: '2', t: 'Compare clinics', d: 'Filter by emirate, treatment or your location and check each clinic\'s Google rating and licence.' },
            { n: '3', t: 'Ask the right questions', d: 'Every guide ends with questions to ask, so you get an itemised quote and a clear plan.' },
          ].map((step) => (
            <li key={step.n} className="block-card-static p-6">
              <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white" aria-hidden="true">{step.n}</span>
              <p className="mt-4 text-lg font-semibold text-ink">{step.t}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink/75">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Popular in Dubai */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="heading-section">Popular in Dubai</h2>
        <p className="mt-3 max-w-2xl text-zinc-600">What people search for most, by area: clinics, clinic-listed prices and what to expect locally.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOCAL_PICKS.map(([a, s]) => {
            const service = serviceBySlug(s)!;
            const area = dubaiAreas.find((x) => x.slug === a)!;
            return (
              <Link prefetch={false} key={`${a}-${s}`} href={urls.dubaiAreaService(a, s)} className="block-card group flex items-center justify-between gap-4 p-5">
                <span>
                  <span className="block font-semibold text-ink">{service.shortName} in {area.name}</span>
                  <span className="block text-sm text-zinc-600">Typically from {formatAed(service.price.from)}</span>
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
            <MessageCircleQuestion className="h-8 w-8 text-ink" aria-hidden="true" />
            <h2 className="heading-section mt-4">Five questions for any clinic</h2>
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
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white" aria-hidden="true">{i + 1}</span>
                <span className="text-[15px] font-medium leading-snug text-ink">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-10">
        <h2 className="heading-section">Questions, answered</h2>
        <div className="mt-8"><FaqList faqs={HOME_FAQS} /></div>
      </section>

      {/* Other emirates: not live yet (compact, Dubai is the live market) */}
      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="block-card-static p-5">
          <h2 className="text-base font-semibold text-ink">Coming soon to other emirates</h2>
          <p className="mt-1 text-sm text-zinc-600">We are live in Dubai and launching across the other emirates next. Guides and listings are available for information.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {emirates.filter((e) => !isLiveEmirate(e.slug)).map((e) => (
              <li key={e.slug}>
                <Link prefetch={false} href={urls.emirate(e.slug)} className="chip">
                  {e.name} <span className="text-zinc-600" lang="ar">{e.nameAr}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <PageImageCredits images={[images.chairWhite, images.braces, images.dubai, ...services.map((s) => imageForService(s.slug))]} />
      </div>

      {/* Closing CTA */}
      <section className="px-3 py-10 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-lime px-6 py-16 text-center lg:py-24">
          <h2 className="display mx-auto text-[clamp(2.75rem,9vw,7.5rem)] text-ink">Find your{' '}<br />dentist.</h2>
          <p className="mx-auto mt-4 max-w-md text-ink/75">Use your location to see licensed clinics closest to you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link prefetch={false} href="/find-clinics/?near=me" className="btn-ink"><LocateFixed className="h-4 w-4" aria-hidden="true" /> Dentists near me</Link>
            <Link prefetch={false} href="/find-clinics/" className="btn-ghost">Browse all clinics</Link>
          </div>
          <p className="mt-6 text-sm text-ink/80">
            Run a clinic? <Link prefetch={false} href="/list-your-practice/" className="font-semibold text-ink underline underline-offset-2">List your clinic</Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
