import Image from 'next/image';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Crumbs } from '@/components/guide/GuideBlocks';
import { allImages, LICENSE_URLS } from '@/content/images';

// Credits for every photograph used on AppointPanda's guide pages.

export default function ImageCreditsPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Image Credits"
        description="Credits and licences for the photographs used on AppointPanda's treatment and emirate guides."
        canonical="/image-credits/"
      />
      <div className="mx-auto max-w-5xl px-5 py-12">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Image credits', path: '/image-credits/' }]} />
        <h1 className="display text-[clamp(2.6rem,6vw,4.5rem)] text-ink">Image credits</h1>
        <div className="prose-guide mt-6 max-w-3xl">
          <p>
            The photographs on our guides are real photos published under free licences on Wikimedia Commons and StockSnap.
            We do not use AI-generated images of people, clinics or places. Treatment photos illustrate the subject and do not show
            clinics listed on AppointPanda; emirate photos show real landmarks in each emirate.
          </p>
          <p>Images under CC BY and CC BY-SA licences have been resized for the web. Follow the source link to see the original and its full licence.</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allImages.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
              </div>
              <div className="p-4 text-sm">
                <p className="font-semibold text-ink">{img.caption}</p>
                <p className="mt-1 text-zinc-600">Photo by {img.credit.author}</p>
                <p className="mt-1 text-zinc-500">
                  <a href={LICENSE_URLS[img.credit.license]} target="_blank" rel="noopener noreferrer license" className="underline">{img.credit.license}</a>
                  {' · '}
                  <a href={img.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">View on {img.credit.sourceName}</a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
