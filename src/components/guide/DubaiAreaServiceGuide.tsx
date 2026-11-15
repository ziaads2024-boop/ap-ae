import Link from 'next/link';
import { ArrowRight, Receipt, ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { ClinicResults } from '@/components/search/ClinicResults';
import { emirateBySlug, formatAed, hasLocalGuide, insuranceNote, services, SITE_URL, urls, type ServiceContent } from '@/content';
import { isAreaServiceIndexable, neighboursOf, reasonsForService, type DubaiArea } from '@/content/dubai';
import { breadcrumbSchema, clinicListSchema, faqSchema } from '@/content/schema';
import { imageForService } from '@/content/images';
import type { AreaServiceData } from '@/lib/dubaiData';
import { AreaFacts, LateWeekendList } from './DubaiAreaGuide';
import { BulletList, FaqList, GuideCta, GuideHero, JsonLd, MedicalNote, PageImageCredits, Section } from './GuideBlocks';
import { clip, fitTitle } from '@/lib/metaText';

export function DubaiAreaServiceGuide({ area, service, data }: { area: DubaiArea; service: ServiceContent; data: AreaServiceData }) {
  const dubai = emirateBySlug('dubai')!;
  const path = urls.dubaiAreaService(area.slug, service.slug);
  // Figures are hidden where the database mixes in clinics from elsewhere (see dubai.ts)
  const areaStats = area.mixedAssignments ? null : data.areaStats;
  const indexable = !area.mixedAssignments && isAreaServiceIndexable({
    areaClinics: data.areaStats?.clinicCount || 0,
    treatmentClinics: data.clinicCount,
    uniqueBlocks: data.uniqueBlocks,
  });
  const placeName = /dubai/i.test(area.name) || `${service.name} in ${area.name}, Dubai`.length > 50 ? area.name : `${area.name}, Dubai`;
  const title = fitTitle(`${service.name} in ${placeName}`, ': Clinics & Prices', 50);
  const description = clip(`${data.clinicCount ? `${data.clinicCount} listed clinics offer ${service.name.toLowerCase()} in ${area.name}. ` : areaStats ? `${areaStats.clinicCount} dental clinics are listed in ${area.name}. ` : ''}Compare clinic-listed prices, Google ratings and insurance, and request an appointment in ${area.name}, Dubai.`);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Dubai', path: urls.emirate('dubai') },
    { name: area.name, path: urls.dubaiArea(area.slug) },
    { name: service.name, path },
  ];
  const image = imageForService(service.slug);
  const reasons = reasonsForService(service.slug);
  const nearby = neighboursOf(area.slug);
  const related = service.related.map((r) => services.find((s) => s.slug === r)).filter(Boolean) as ServiceContent[];

  const answer = data.clinicCount
    ? `${data.clinicCount} clinic${data.clinicCount === 1 ? '' : 's'} listed on AppointPanda offer ${service.name.toLowerCase()} in ${area.name}${
        data.priceRange ? `, with clinic-listed prices starting from ${formatAed(data.priceRange.min)} to ${formatAed(data.priceRange.max)}` : ''
      }. ${service.summary}`
    : `${areaStats ? `${areaStats.clinicCount} dental clinic${areaStats.clinicCount === 1 ? ' is' : 's are'} listed in ${area.name}; none has yet confirmed ${service.name.toLowerCase()} on AppointPanda, so ask when you contact a clinic. ` : ''}${service.summary}`;

  const faqs = [
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${area.name}?`,
      a: data.priceRange
        ? `Among ${data.priceRange.n} clinics in ${area.name} that list a price, starting prices range from ${formatAed(data.priceRange.min)} to ${formatAed(data.priceRange.max)} ${service.price.unit}. Ask each clinic for an itemised quote, because prices depend on your case.`
        : `Across private clinics in the UAE, ${service.name.toLowerCase()} usually costs ${formatAed(service.price.from)} to ${formatAed(service.price.to)} ${service.price.unit}. Clinics in ${area.name} set their own prices; ask for an itemised quote.`,
    },
    {
      q: `Does insurance cover ${service.name.toLowerCase()} in Dubai?`,
      a: insuranceNote(service, dubai),
    },
    {
      q: `Which clinics in ${area.name} offer ${service.name.toLowerCase()}?`,
      a: data.clinicCount
        ? `${data.clinics.slice(0, 3).map((c) => c.name).join(', ')}${data.clinicCount > 3 ? ` and ${data.clinicCount - 3} more` : ''} list ${service.name.toLowerCase()} on AppointPanda. The list is sorted by number of Google reviews, not by quality.`
        : `No clinic in ${area.name} has confirmed this treatment on AppointPanda yet. You can contact dental clinics in ${area.name} or nearby areas such as ${nearby.map((n) => n.name).join(', ')} and ask.`,
    },
  ];

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} noindex={!indexable} ogImage={`${SITE_URL}${image.src}`} />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs), clinicListSchema(`${service.name} clinics in ${placeName}`, data.clinics)]} />

      <GuideHero
        tone={service.tone}
        crumbs={crumbs}
        label={`${area.name} · Dubai`}
        title={<>{service.name} in{' '}<br />{area.name}</>}
        answer={answer}
        image={image}
        badge={data.priceRange ? { label: `Clinic-listed prices in ${area.name}`, value: `${formatAed(data.priceRange.min)} – ${formatAed(data.priceRange.max)}` } : { label: 'Typical UAE range', value: `${formatAed(service.price.from)} – ${formatAed(service.price.to)}` }}
      >
        <a href="#clinics" className="btn-ink">See clinics <ArrowRight className="h-4 w-4" /></a>
        <Link prefetch={false} href={urls.dubaiArea(area.slug)} className="btn-ghost">All dentists in {area.name}</Link>
      </GuideHero>

      <div className="mx-auto max-w-5xl px-5">
        {data.treatmentStats && (
          <Section id="treatment-hours" eyebrow="Opening hours" title={`${service.name} clinics in ${area.name}: hours`}>
            <AreaFacts areaName={area.name} stats={data.treatmentStats} scope={`Clinics in ${area.name} that list ${service.name.toLowerCase()}`} />
          </Section>
        )}
        {areaStats && (
          <Section id="at-a-glance" eyebrow="At a glance" title={`Dental clinics in ${area.name}`}>
            <AreaFacts areaName={area.name} stats={areaStats} />
          </Section>
        )}

        <Section id="clinics" eyebrow="Clinics" title={`${service.name} clinics in ${area.name}`}>
          {data.clinics.length ? (
            <>
              <ClinicResults clinics={data.clinics} priceLabel={`${service.name} from`} defaultReason={reasons[0]?.slug} />
              <p className="mt-3 text-xs text-zinc-500">Sorted by number of Google reviews. Prices are those the clinic lists on AppointPanda and are a starting point, not a quote.</p>
            </>
          ) : data.areaClinics.length ? (
            <>
              <p className="mb-4 rounded-2xl bg-tone-lemon p-4 text-sm leading-relaxed text-ink" role="note">
                Clinics in {area.name} have not yet confirmed on AppointPanda which treatments they offer. These are dental clinics in the area;
                when you request an appointment, ask whether the clinic provides {service.name.toLowerCase()}.
              </p>
              <ClinicResults clinics={data.areaClinics} defaultReason={reasons[0]?.slug} />
            </>
          ) : (
            <p className="rounded-3xl border border-dashed border-black/20 bg-white p-6 text-sm text-zinc-600">
              No dental clinics in {area.name} are listed yet.{' '}
              <Link prefetch={false} href={hasLocalGuide(service.slug, 'dubai') ? urls.serviceEmirate('dubai', service.slug) : urls.service(service.slug)} className="font-semibold underline">{service.name} in Dubai</Link>
            </p>
          )}
        </Section>

        <Section id="cost" eyebrow="Cost" title={`What it costs in ${area.name}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <Receipt className="h-6 w-6 text-tone-lemon" />
              {data.priceRange ? (
                <>
                  <p className="display mt-3 text-5xl">{formatAed(data.priceRange.min)} – {formatAed(data.priceRange.max)}</p>
                  <p className="mt-2 text-sm text-zinc-300">Starting prices listed by {data.priceRange.n} clinics in {area.name}</p>
                </>
              ) : (
                <>
                  <p className="display mt-3 text-5xl">{formatAed(service.price.from)} – {formatAed(service.price.to)}</p>
                  <p className="mt-2 text-sm text-zinc-300">Typical private-clinic range in the UAE, {service.price.unit}</p>
                </>
              )}
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-7">
              <h3 className="mb-4 font-semibold text-ink">What changes the price</h3>
              <BulletList items={service.priceFactors} tone={service.tone} />
            </div>
          </div>
        </Section>

        <Section id="insurance" eyebrow="Insurance" title="Insurance and licensing">
          <div className="grid gap-4 md:grid-cols-2">
            <p className="rounded-3xl border border-black/10 bg-white p-6 text-[15px] leading-relaxed text-zinc-700">{insuranceNote(service, dubai)}</p>
            <p className="flex gap-3 rounded-3xl bg-tone-sky p-6 text-[15px] leading-relaxed text-ink">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              {area.slug === 'healthcare-city'
                ? 'Clinics in Dubai Healthcare City are licensed by the Dubai Healthcare City Authority.'
                : 'Clinics in this area are licensed by the Dubai Health Authority (DHA); you can check a dentist\'s licence on the DHA website.'}
            </p>
          </div>
        </Section>

        <Section id="area" eyebrow={area.name} title="Getting there">
          <div className="prose-guide max-w-3xl">
            <p>{area.gettingThere}</p>
            <p>{area.notes[0]}</p>
          </div>
        </Section>

        {areaStats && data.lateWeekend.length > 0 && (
          <Section id="late-weekend" eyebrow="Evenings and weekends" title={`Late-night and weekend dentists in ${area.name}`}>
            <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-zinc-700">
              Dental clinics in {area.name} whose listed hours run past 9 pm and include Friday or Saturday. Based on listed hours; ask whether the clinic offers {service.name.toLowerCase()} when you call.
            </p>
            <LateWeekendList clinics={data.lateWeekend} />
          </Section>
        )}

        <Section id="faq" eyebrow="FAQ" title="Common questions">
          <FaqList faqs={faqs} />
        </Section>

        <Section eyebrow="Keep reading" title="More guidance">
          <div className="flex flex-wrap gap-2">
            <Link prefetch={false} href={urls.service(service.slug)} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Full {service.name.toLowerCase()} guide</Link>
            {hasLocalGuide(service.slug, 'dubai') && (
              <Link prefetch={false} href={urls.serviceEmirate('dubai', service.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{service.name} in Dubai</Link>
            )}
            {reasons.map((r) => (
              <Link prefetch={false} key={r.slug} href={urls.dubaiReason(r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{r.label}</Link>
            ))}
            {nearby.map((n) => (
              <Link prefetch={false} key={n.slug} href={urls.dubaiAreaService(n.slug, service.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{service.name} in {n.name}</Link>
            ))}
            {related.map((r) => (
              <Link prefetch={false} key={r.slug} href={urls.dubaiAreaService(area.slug, r.slug)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">{r.name} in {area.name}</Link>
            ))}
          </div>
        </Section>

        <div className="pb-6">
          <MedicalNote />
          <PageImageCredits images={[image]} />
        </div>
      </div>

      <GuideCta
        title={`Request ${service.name.toLowerCase()} in ${area.name}`}
        text="Choose a clinic and a preferred day; the clinic calls you to confirm a time."
        href={`/find-clinics/?area=${area.slug}&specialty=${service.slug}`}
        cta="Search with filters"
      />
    </PageLayout>
  );
}
