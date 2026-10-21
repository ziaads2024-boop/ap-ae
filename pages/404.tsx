import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { services, urls } from '@/content';

export default function NotFoundPage() {
  return (
    <PageLayout>
      <SEOHead title="Page not found" description="This page does not exist or has moved." canonical="/404/" noindex />
      <PageHero kicker="404" title="We could not find that page" subtitle="It may have moved, or the link may be wrong. These pages can help you find a dentist." tone="blush">
        <div className="flex flex-wrap gap-2">
          <Link href="/find-clinics/" className="btn-ink">Find a dentist in Dubai</Link>
          <Link href="/" className="btn-ghost">Home</Link>
        </div>
      </PageHero>
      <div className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="display text-3xl text-ink">Treatment guides</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}><Link href={urls.service(s.slug)} className="inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{s.name}</Link></li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-zinc-600">Something missing that should be here? <Link href="/contact/" className="underline">Tell us</Link>.</p>
      </div>
    </PageLayout>
  );
}
