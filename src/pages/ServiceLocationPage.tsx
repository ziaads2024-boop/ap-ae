import Link from "next/link";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { normalizeStateSlug } from "@/lib/slug/normalizeStateSlug";
import { isNonDental } from "@/lib/clinicQuality";
import { canonicalTreatment, emirateBySlug, hasLocalGuide, isLiveEmirate, serviceBySlug, urls } from "@/content";

// Old database-driven "treatment in area" page, still reachable for areas
// without a hand-written guide (mostly emirates that are not live yet). It is
// always noindex and makes no claims beyond what the listings show: the
// previous template's ratings, verification and price figures were not backed
// by data and have been removed.

interface ServiceLocationPageProps {
  stateSlugProp?: string;
  citySlugProp?: string;
  serviceSlugProp?: string;
  stateDataProp?: any;
  cityDataProp?: any;
  treatmentDataProp?: any;
  seoDataProp?: { title: string | null; description: string | null; canonical: string };
  dehydratedStateProp?: any;
  faqsProp?: { question: string; answer: string }[];
  seoH1Prop?: string | null;
  heroIntroProp?: string | null;
  contentProp?: string | null;
  priceMinProp?: number | null;
  priceMaxProp?: number | null;
  priceNoteProp?: string | null;
  quickAnswerProp?: string | null;
  lastReviewedByProp?: string | null;
  expertCredentialProp?: string | null;
  medicalAccuracyVerifiedProp?: boolean;
  processStepsProp?: any[] | null;
  treatmentOptionsProp?: any[] | null;
  benefitsProp?: any[] | null;
  candidatesProp?: any[] | null;
  alternativesProp?: any[] | null;
  relatedQuestionsProp?: any[] | null;
  processTimeMonthsProp?: string | null;
  processTimeNoteProp?: string | null;
  allSeoDataProp?: any;
  clinicProfilesProp?: any[];
  allEmirateCitiesProp?: any[];
}

const ServiceLocationPage = ({
  stateSlugProp, citySlugProp, serviceSlugProp,
  stateDataProp, cityDataProp, treatmentDataProp,
  seoDataProp, clinicProfilesProp, allEmirateCitiesProp,
}: ServiceLocationPageProps) => {
  const query = useRouter().query;
  const stateSlug = normalizeStateSlug(stateSlugProp || (query.stateSlug as string) || '') || '';
  const citySlug = citySlugProp || (query.citySlug as string) || '';
  const serviceSlug = serviceSlugProp || (query.serviceSlug as string) || '';

  const cityName = cityDataProp?.name || citySlug.replace(/-/g, ' ');
  const stateName = stateDataProp?.name || emirateBySlug(stateSlug)?.name || stateSlug;
  const treatmentName = treatmentDataProp?.name || serviceSlug.replace(/-/g, ' ');
  const guide = serviceBySlug(canonicalTreatment(serviceSlug));
  const emirateLive = isLiveEmirate(stateSlug);

  const hasTagged = (clinicProfilesProp || []).some((c: any) => Array.isArray(c.treatments) && c.treatments.length > 0);
  const clinics = (clinicProfilesProp || [])
    .filter((c: any) => c.slug && !isNonDental(c.name))
    .filter((c: any) => !hasTagged || c.treatments?.some((t: any) => t.treatment_id === treatmentDataProp?.id))
    .slice(0, 40);
  const otherAreas = (allEmirateCitiesProp || []).filter((c: any) => c.slug && c.slug !== citySlug);

  return (
    <PageLayout>
      <SEOHead
        title={seoDataProp?.title || `${treatmentName} in ${cityName}`}
        description={seoDataProp?.description || `Dental clinics listed in ${cityName}, ${stateName}.`}
        canonical={seoDataProp?.canonical || `/${stateSlug}/${citySlug}/${serviceSlug}/`}
        noindex
      />

      <div className="mx-auto max-w-4xl px-5 py-12">
        <nav className="mb-4 text-sm text-zinc-600" aria-label="Breadcrumb">
          <Link prefetch={false} href="/" className="underline">Home</Link> /{' '}
          <Link prefetch={false} href={urls.emirate(stateSlug)} className="underline">{stateName}</Link> /{' '}
          <Link prefetch={false} href={`/${stateSlug}/${citySlug}/`} className="underline">{cityName}</Link>
        </nav>
        <h1 className="heading-section">{treatmentName} in {cityName}</h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-zinc-700">
          {hasTagged
            ? `These dental clinics in ${cityName} list ${treatmentName.toLowerCase()} on AppointPanda.`
            : `Clinics in ${cityName} have not yet confirmed on AppointPanda which treatments they offer. These are dental clinics listed in the area; ask each one whether it provides ${treatmentName.toLowerCase()}.`}
          {!emirateLive && ` AppointPanda is not live in ${stateName} yet, so appointment requests are not available here.`}
        </p>

        {guide && (
          <p className="mt-4 text-sm">
            <Link prefetch={false} href={hasLocalGuide(guide.slug, stateSlug) ? urls.serviceEmirate(stateSlug, guide.slug) : urls.service(guide.slug)} className="font-semibold text-ink underline">
              Read the {guide.name.toLowerCase()} guide: costs, steps and what to ask
            </Link>
          </p>
        )}

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-ink">Dental clinics in {cityName}</h2>
          {clinics.length ? (
            <ul className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
              {clinics.map((c: any) => (
                <li key={c.id || c.slug} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
                  <Link prefetch={false} href={`/clinic/${c.slug}/`} className="font-medium text-ink underline decoration-black/20 underline-offset-2">{c.name}</Link>
                  {Number(c.rating) > 0 && (
                    <span className="text-xs text-zinc-600">Google rating {Number(c.rating).toFixed(1)}{c.review_count ? ` (${c.review_count} reviews)` : ''}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-black/20 bg-white p-5 text-sm text-zinc-600">No dental clinics are listed in {cityName} yet.</p>
          )}
          <p className="mt-3 text-xs text-zinc-500">Sorted by Google rating. Listing is not a recommendation; ratings come from Google.</p>
        </section>

        {otherAreas.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-semibold text-ink">Other areas in {stateName}</h2>
            <div className="flex flex-wrap gap-2">
              {otherAreas.map((c: any) => (
                <Link prefetch={false} key={c.slug} href={`/${stateSlug}/${c.slug}/`} className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-ink">{c.name}</Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default ServiceLocationPage;
