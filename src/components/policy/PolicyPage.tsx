import type { ReactNode } from 'react';
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
            <h2 className="display text-3xl text-ink">{s.title}</h2>
            <div className="prose-guide mt-4 text-[15px]">{s.body}</div>
          </section>
        ))}
        <p className="border-t border-black/10 pt-6 text-xs text-zinc-500">
          Last updated <time dateTime={CONTENT_REVIEWED}>{new Date(CONTENT_REVIEWED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>.
        </p>
      </div>
    </PageLayout>
  );
}
