import Link from 'next/link';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { ArrowRight, ChevronRight, MapPin, BadgeCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_REVIEWED, CONTENT_REVIEWED_LABEL, toneClass } from '@/content';
import type { Faq, Tone } from '@/content';

export function JsonLd({ data }: { data: (object | null)[] }) {
  return (
    <Head>
      {data.filter(Boolean).map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </Head>
  );
}

export function Crumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-ink/60">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-ink hover:underline">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideHero({
  tone, crumbs, label, title, answer, children,
}: {
  tone: Tone;
  crumbs: { name: string; path: string }[];
  label: string;
  title: ReactNode;
  answer: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-3 pt-4 lg:px-6">
      <div className={cn('mx-auto max-w-[1400px] rounded-[2rem] px-6 pb-12 pt-10 lg:px-14 lg:pb-16 lg:pt-14', toneClass[tone])}>
        <div className="mx-auto max-w-5xl">
          <Crumbs items={crumbs} />
          <span className="chip-label">{label}</span>
          <h1 className="display mt-5 text-[clamp(2.6rem,7vw,5.75rem)] text-ink">{title}</h1>
          {/* The quick answer: a self-contained summary that search and AI answers can quote */}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/80 md:text-xl">{answer}</p>
          <p className="mt-5 text-xs text-ink/60">
            Written by the AppointPanda editorial team · Last reviewed{' '}
            <time dateTime={CONTENT_REVIEWED}>{CONTENT_REVIEWED_LABEL}</time> ·{' '}
            <Link href="/editorial-policy/" className="underline">How we write our guides</Link>
          </p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Section({ id, eyebrow, title, children, className }: { id?: string; eyebrow?: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-10 lg:py-14', className)}>
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>}
      <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function FactGrid({ facts }: { facts: { label: string; value: string; note?: string }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label} className="rounded-2xl border border-black/10 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{f.label}</dt>
          <dd className="mt-2 text-lg font-semibold leading-snug text-ink">{f.value}</dd>
          {f.note && <dd className="mt-1 text-sm text-zinc-500">{f.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

export function BulletList({ items, tone = 'lime' }: { items: string[]; tone?: Tone }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-zinc-700">
          <span className={cn('mt-2 size-2 shrink-0 rounded-full', toneClass[tone], 'ring-1 ring-black/20')} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-ink">
            <h3>{f.q}</h3>
            <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-paper text-sm transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function LinkTiles({ links, columns = 3 }: { links: { href: string; title: string; text?: string; tone?: Tone }[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3', columns === 4 && 'lg:grid-cols-4')}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className={cn('block-card group flex flex-col justify-between p-5', l.tone && toneClass[l.tone], l.tone && 'border-transparent')}>
          <span>
            <span className="block text-base font-semibold text-ink">{l.title}</span>
            {l.text && <span className="mt-1 block text-sm leading-snug text-ink/65">{l.text}</span>}
          </span>
          <ArrowRight className="mt-4 h-4 w-4 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}

export interface ClinicSummary {
  id: string;
  name: string;
  slug: string;
  area: string | null;
  rating: number | null;
  reviewCount: number | null;
  verified: boolean;
}

/** Live clinic listings. Rendered only when the database returned clinics. */
export function ClinicList({ clinics, emptyText, moreHref }: { clinics: ClinicSummary[]; emptyText: string; moreHref: string }) {
  if (clinics.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/20 bg-white p-6 text-sm text-zinc-600">
        {emptyText}{' '}
        <Link href={moreHref} className="font-semibold text-ink underline">Search all clinics</Link>
      </div>
    );
  }
  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2">
        {clinics.map((c) => (
          <li key={c.id}>
            <Link href={`/clinic/${c.slug}/`} className="block-card flex items-start justify-between gap-4 p-5">
              <span>
                <span className="block font-semibold text-ink">{c.name}</span>
                {c.area && (
                  <span className="mt-1 flex items-center gap-1 text-sm text-zinc-500"><MapPin className="h-3.5 w-3.5" /> {c.area}</span>
                )}
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1 text-xs">
                {c.rating && c.reviewCount ? (
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <Star className="h-3.5 w-3.5 fill-ink" /> {c.rating.toFixed(1)}
                    <span className="font-normal text-zinc-500">({c.reviewCount} Google reviews)</span>
                  </span>
                ) : null}
                {c.verified && <span className="flex items-center gap-1 text-primary"><BadgeCheck className="h-3.5 w-3.5" /> Verified listing</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-zinc-500">
        Listings are sorted by Google rating and review count. Ratings come from Google and are not edited by AppointPanda.{' '}
        <Link href="/verification-policy/" className="underline">What &ldquo;verified&rdquo; means</Link>.
      </p>
      <Link href={moreHref} className="btn-ghost mt-5">See all clinics <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

export function GuideCta({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <section className="px-3 py-10 lg:px-6">
      <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-lemon px-6 py-14 text-center lg:py-20">
        <h2 className="display mx-auto max-w-4xl text-[clamp(2.4rem,6vw,5rem)] text-ink">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/75">{text}</p>
        <Link href={href} className="btn-ink mt-8">{cta} <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

export function MedicalNote() {
  return (
    <aside className="rounded-2xl border border-black/10 bg-white p-5 text-sm leading-relaxed text-zinc-600">
      <strong className="text-ink">Medical information notice.</strong> This guide is general information to help you prepare for a conversation with a dentist. It is not a diagnosis or a treatment recommendation. Prices are indicative ranges for private clinics in the UAE and are not quotes. In an emergency, call 998.
    </aside>
  );
}
