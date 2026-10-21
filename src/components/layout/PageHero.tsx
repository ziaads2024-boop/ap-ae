import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toneClass, type Tone } from '@/content';

interface PageHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  badge?: string;
  highlight?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  size?: string;
  tone?: Tone;
  /** @deprecated The old hero showed fixed rating and patient numbers; it no longer shows any. */
  showTrust?: boolean;
}

// Page header in the site's block style. It shows no ratings, clinic counts or
// patient numbers: figures like these must come from live data, not copy.
export function PageHero({ kicker, badge, title, subtitle, description, highlight, children, breadcrumbs, tone = 'sky' }: PageHeroProps) {
  const label = kicker || badge;
  const text = subtitle || description;
  return (
    <section className="px-3 pt-4 lg:px-6">
      <div className={cn('relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-6 pb-12 pt-10 lg:px-14 lg:pb-14 lg:pt-12', toneClass[tone])}>
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/25" />
        <div className="relative mx-auto max-w-5xl">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-ink/70">
                {breadcrumbs.map((b, i) => (
                  <li key={`${b.label}-${i}`} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                    {b.href ? <Link href={b.href} className="hover:underline">{b.label}</Link> : <span aria-current="page">{b.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {label && <span className="chip-label">{label}</span>}
          <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4.75rem)] text-ink">
            {title}
            {highlight ? ` ${highlight}` : ''}
          </h1>
          {text && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/80">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
