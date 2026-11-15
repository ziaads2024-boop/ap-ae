import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/guide/GuideBlocks';
import { CONTENT_REVIEWED } from '@/content';
import { breadcrumbSchema } from '@/content/schema';

export interface PolicySection {
  title: string;
  body: ReactNode;
}

/** Plain policy page: what we do, stated as it actually happens. */
export function PolicyPage({ path, title, metaTitle, description, intro, sections }: {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  sections: PolicySection[];
}) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: title, path }];
  return (
    <PageLayout>
      <SEOHead title={metaTitle} description={description} canonical={path} />
      <JsonLd data={[breadcrumbSchema(crumbs)]} />
      <PageHero kicker="Policy" title={title} subtitle={intro} breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }]} tone="sand" />
      <div className="mx-auto max-w-3xl px-5 py-12">
        {sections.map((s) => (
          <section key={s.title} className="mb-10">
            <h2 className="heading-section">{s.title}</h2>
            <div className="prose-guide mt-4 text-[15px]">{s.body}</div>
          </section>
        ))}
        <p className="border-t border-black/10 pt-6 text-[13px] text-zinc-600">
          Last updated <time dateTime={CONTENT_REVIEWED}>{new Date(CONTENT_REVIEWED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>.
        </p>
      </div>
    </PageLayout>
  );
}

export interface LegalSection {
  title: string;
  content: string;
}

/** Plain-text legal copy: blank lines split paragraphs, and blocks of "•" lines become real lists. */
function LegalText({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => /^[•\-*]\s/.test(l))) {
          return <ul key={i}>{lines.map((l) => <li key={l}>{l.replace(/^[•\-*]\s*/, '')}</li>)}</ul>;
        }
        return <p key={i} className="whitespace-pre-line">{block}</p>;
      })}
    </>
  );
}

const slugify = (t: string) => t.toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * Long legal document (privacy, terms) in the block style: PageHero, a sticky
 * table of contents on desktop, and article typography from `.blog-content`.
 */
export function LegalDocument({ kicker, title, intro, highlights, preamble, sections, lastUpdated, lastUpdatedNote, contactPrompt }: {
  kicker: string;
  title: string;
  intro: string;
  highlights?: { icon?: ComponentType<{ className?: string }>; title: string; description?: string }[];
  preamble?: string;
  sections: LegalSection[];
  lastUpdated: string;
  lastUpdatedNote?: string;
  contactPrompt: string;
}) {
  const items = sections.map((sec, i) => ({ ...sec, id: slugify(sec.title) || `section-${i + 1}`, label: sec.title.replace(/^\d+\.\s*/, '') }));
  return (
    <>
      <PageHero kicker={kicker} title={title} subtitle={intro} breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }]} tone="sand">
        {highlights && highlights.length > 0 && (
          <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h.title} className="rounded-2xl bg-white/70 p-3 sm:p-4">
                {h.icon && <h.icon className="h-5 w-5 text-ink" aria-hidden="true" />}
                <p className="mt-2 text-sm font-semibold text-ink">{h.title}</p>
                {h.description && <p className="mt-0.5 text-[13px] text-ink/80">{h.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </PageHero>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">On this page</p>
            <ol className="mt-3 space-y-0.5 text-sm">
              {items.map((it) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} className="block rounded-lg px-2 py-1.5 text-zinc-700 hover:bg-white hover:text-ink">{it.label}</a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="min-w-0">
          <p className="text-[13px] text-zinc-600">
            <strong className="font-semibold text-ink">Last updated:</strong> {lastUpdated}
            {lastUpdatedNote ? ` · ${lastUpdatedNote}` : ''}
          </p>
          <div className="blog-content mt-6">
            {preamble && <p className="block-card-static !p-5">{preamble}</p>}
            {items.map((it) => (
              <section key={it.id} id={it.id} aria-labelledby={`${it.id}-h`}>
                <h2 id={`${it.id}-h`}>{it.title}</h2>
                <LegalText text={it.content} />
              </section>
            ))}
          </div>
          <div className="mt-12 border-t border-black/10 pt-8">
            <p className="text-zinc-700">{contactPrompt}</p>
            <Link href="/contact/" className="btn-ghost mt-4">
              Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
