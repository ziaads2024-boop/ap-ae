import Link from 'next/link';
import { BadgeCheck, Clock, ExternalLink, Globe, MapPin, MessageCircle, Navigation, Phone, ShieldCheck, Star, Stethoscope, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Crumbs, FaqList, JsonLd } from '@/components/guide/GuideBlocks';
import { AppointmentRequest } from '@/components/booking/AppointmentRequest';
import { emirateBySlug, isLiveEmirate, serviceBySlug, SITE_URL, urls, formatAed, type Faq } from '@/content';
import { dubaiAreaBySlug } from '@/content/dubai';
import { breadcrumbSchema, faqSchema } from '@/content/schema';
import { cn } from '@/lib/utils';

export interface ClinicProfileProps {
  clinic: {
    id: string; name: string; slug: string; description: string | null; address: string | null;
    phone: string | null; whatsapp: string | null; website: string | null; googleMapsUrl: string | null;
    coverImageUrl: string | null; logoUrl: string | null; latitude: number | null; longitude: number | null;
    rating: number | null; reviewCount: number | null; verified: boolean; claimed: boolean; updatedAt: string | null;
    city: { name: string; slug: string } | null; emirate: { name: string; slug: string } | null; area: { name: string } | null;
  };
  treatments: { name: string; slug: string; priceFrom: number | null; priceTo: number | null }[];
  dentists: { name: string; slug: string; title: string | null; specializations: string[]; languages: string[]; photoUrl: string | null; yearsExperience: number | null }[];
  internalReviews: { id: string; rating: number | null; text: string; date: string }[];
  googleReviews: { id: string; author: string; rating: number | null; text: string; date: string | null }[];
  images: { url: string; alt: string | null }[];
  hours: { day: number; open: string | null; close: string | null; closed: boolean }[];
  insurances: { name: string; slug: string | null }[];
  faqs: Faq[];
  nearby: { name: string; slug: string; rating: number | null; reviewCount: number | null; imageUrl: string | null }[];
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SCHEMA_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hhmm = (t: string | null) => (t ? t.slice(0, 5) : '');

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('h-4 w-4', i < Math.round(rating) ? 'fill-ink text-ink' : 'text-zinc-300')} />
      ))}
    </span>
  );
}

/** Facts generated only from the clinic's own listing data. */
function dataFaqs(p: ClinicProfileProps): Faq[] {
  const { clinic, insurances, treatments, hours } = p;
  const out: Faq[] = [];
  if (insurances.length) {
    out.push({
      q: `Which insurance does ${clinic.name} accept?`,
      a: `${clinic.name} lists ${insurances.slice(0, 8).map((i) => i.name).join(', ')}${insurances.length > 8 ? ` and ${insurances.length - 8} more` : ''}. Cover depends on your plan, so confirm with the clinic before treatment.`,
    });
  }
  if (treatments.length) {
    out.push({
      q: `What treatments does ${clinic.name} offer?`,
      a: `The clinic lists ${treatments.slice(0, 10).map((t) => t.name.toLowerCase()).join(', ')}${treatments.length > 10 ? ' and more' : ''}.`,
    });
  }
  if (clinic.address) {
    out.push({ q: `Where is ${clinic.name}?`, a: `${clinic.address}${clinic.city ? ` (${clinic.city.name}${clinic.emirate ? `, ${clinic.emirate.name}` : ''})` : ''}.` });
  }
  if (hours.some((h) => !h.closed && h.open)) {
    const open = hours.filter((h) => !h.closed && h.open).map((h) => DAYS[h.day]).join(', ');
    out.push({ q: `When is ${clinic.name} open?`, a: `According to its listing, the clinic opens on ${open}. Hours can change on public holidays, so call ahead.` });
  }
  return out;
}

export function ClinicProfile(props: ClinicProfileProps) {
  const { clinic, treatments, dentists, internalReviews, googleReviews, images, hours, insurances, nearby } = props;
  const emirate = clinic.emirate ? emirateBySlug(clinic.emirate.slug) : undefined;
  const area = clinic.city && clinic.emirate?.slug === 'dubai' ? dubaiAreaBySlug(clinic.city.slug) : undefined;
  const inHealthcareCity = clinic.city?.slug === 'healthcare-city';
  const regulator = inHealthcareCity ? 'Dubai Healthcare City Authority' : emirate?.regulator.name;
  const path = `/clinic/${clinic.slug}/`;
  const place = [clinic.area?.name || clinic.city?.name, clinic.emirate?.name].filter(Boolean).join(', ');
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(clinic.emirate ? [{ name: clinic.emirate.name, path: urls.emirate(clinic.emirate.slug) }] : []),
    ...(clinic.city && clinic.emirate ? [{ name: clinic.city.name, path: `/${clinic.emirate.slug}/${clinic.city.slug}/` }] : []),
    { name: clinic.name, path },
  ];
  const faqs = [...props.faqs, ...dataFaqs(props)].slice(0, 8);
  const mapsHref = clinic.googleMapsUrl || (clinic.latitude && clinic.longitude ? `https://www.google.com/maps/search/?api=1&query=${clinic.latitude},${clinic.longitude}` : null);
  const whatsappHref = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/[^\d]/g, '')}` : null;
  const title = `${clinic.name}${place ? ` – Dentist in ${place}` : ''}: Treatments, Insurance & Reviews`;
  const description = `${clinic.name}${place ? ` in ${place}` : ''}: ${treatments.length ? `${treatments.slice(0, 4).map((t) => t.name.toLowerCase()).join(', ')}` : 'dental care'}${insurances.length ? `, accepts ${insurances.slice(0, 3).map((i) => i.name).join(', ')}` : ''}. See hours, location and Google reviews, and request an appointment.`.slice(0, 300);
  const heroImage = clinic.coverImageUrl || images[0]?.url || null;
  const avatar = clinic.logoUrl || heroImage || '';

  const dentistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}${path}#clinic`,
    name: clinic.name,
    url: `${SITE_URL}${path}`,
    ...(heroImage ? { image: heroImage } : {}),
    ...(clinic.logoUrl ? { logo: clinic.logoUrl } : {}),
    ...(clinic.description ? { description: clinic.description.slice(0, 500) } : {}),
    ...(clinic.phone ? { telephone: clinic.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(clinic.address ? { streetAddress: clinic.address } : {}),
      ...(clinic.city ? { addressLocality: clinic.city.name } : {}),
      ...(clinic.emirate ? { addressRegion: clinic.emirate.name } : {}),
      addressCountry: 'AE',
    },
    ...(clinic.latitude && clinic.longitude ? { geo: { '@type': 'GeoCoordinates', latitude: clinic.latitude, longitude: clinic.longitude } } : {}),
    ...(hours.some((h) => !h.closed && h.open && h.close)
      ? {
          openingHoursSpecification: hours.filter((h) => !h.closed && h.open && h.close).map((h) => ({
            '@type': 'OpeningHoursSpecification', dayOfWeek: SCHEMA_DAYS[h.day], opens: hhmm(h.open), closes: hhmm(h.close),
          })),
        }
      : {}),
    ...(insurances.length ? { paymentAccepted: insurances.map((i) => i.name).join(', ') } : {}),
    medicalSpecialty: 'https://schema.org/Dentistry',
    ...(treatments.length ? { availableService: treatments.slice(0, 20).map((t) => ({ '@type': 'MedicalProcedure', name: t.name })) } : {}),
    ...([clinic.website, clinic.googleMapsUrl].filter(Boolean).length ? { sameAs: [clinic.website, clinic.googleMapsUrl].filter(Boolean) } : {}),
  };

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} ogImage={heroImage || undefined} />
      <JsonLd data={[dentistSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />

      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Crumbs items={crumbs} />
      </div>

      {/* Header */}
      <section className="px-3 lg:px-6">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/5">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-paper ring-1 ring-black/5">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt={`${clinic.name} logo`} width={80} height={80} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-3xl font-bold text-zinc-300">{clinic.name.charAt(0)}</div>
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{clinic.name}</h1>
                  {place && <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-600"><MapPin className="h-4 w-4 shrink-0" /> {place}</p>}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                {clinic.rating && clinic.reviewCount ? (
                  <span className="flex items-center gap-2 rounded-full bg-paper px-3 py-1.5">
                    <Stars rating={clinic.rating} />
                    <strong>{clinic.rating.toFixed(1)}</strong>
                    <span className="text-zinc-500">{clinic.reviewCount.toLocaleString()} Google reviews</span>
                  </span>
                ) : null}
                {clinic.verified && (
                  <Link href="/verification-policy/" className="flex items-center gap-1.5 rounded-full bg-tone-lime px-3 py-1.5 font-medium text-ink">
                    <BadgeCheck className="h-4 w-4" /> Verified listing
                  </Link>
                )}
                {regulator && (
                  <span className="flex items-center gap-1.5 rounded-full bg-tone-sky px-3 py-1.5 font-medium text-ink">
                    <ShieldCheck className="h-4 w-4" /> Licensed by {regulator}
                  </span>
                )}
              </div>
              {regulator && (
                <p className="mt-3 text-xs text-zinc-500">
                  Licensing body for this area. You can check a dentist&apos;s individual licence with the {regulator}.
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {clinic.phone && <a href={`tel:${clinic.phone.replace(/\s/g, '')}`} className="btn-ink"><Phone className="h-4 w-4" /> Call</a>}
                {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle className="h-4 w-4" /> WhatsApp</a>}
                {mapsHref && <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Navigation className="h-4 w-4" /> Directions</a>}
                {clinic.website && <a href={clinic.website} target="_blank" rel="noopener noreferrer nofollow" className="btn-ghost"><Globe className="h-4 w-4" /> Website</a>}
              </div>
            </div>
            <div className="relative min-h-[240px] bg-tone-lemon">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroImage} alt={`${clinic.name}`} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-10 text-center">
                  <p className="display text-5xl text-ink/80">{clinic.city?.name || 'Dentist'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          {clinic.description && (
            <section>
              <h2 className="display text-4xl text-ink">About the clinic</h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-zinc-700">{clinic.description}</p>
              <p className="mt-2 text-xs text-zinc-500">Description provided by the clinic or taken from its public listing.</p>
            </section>
          )}

          {treatments.length > 0 && (
            <section>
              <h2 className="display text-4xl text-ink">Treatments</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {treatments.map((t) => {
                  const guide = serviceBySlug(t.slug);
                  const localHref = clinic.emirate && clinic.city ? `/${clinic.emirate.slug}/${clinic.city.slug}/${t.slug}/` : null;
                  return (
                    <li key={t.slug} className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{t.name}</span>
                        <span className="block text-xs text-zinc-500">
                          {t.priceFrom ? `From ${formatAed(t.priceFrom)}${t.priceTo ? ` to ${formatAed(t.priceTo)}` : ''} (clinic-listed)` : 'Price on request'}
                        </span>
                      </span>
                      <span className="flex shrink-0 gap-2 text-xs font-medium">
                        {guide && <Link href={urls.service(guide.slug)} className="underline">Guide</Link>}
                        {localHref && clinic.city && <Link href={localHref} className="underline">More in {clinic.city.name}</Link>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section>
            <h2 className="display text-4xl text-ink">Insurance</h2>
            {insurances.length ? (
              <>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {insurances.map((i) => (
                    <li key={i.name}>
                      {i.slug && clinic.emirate ? (
                        <Link href={`/insurance/${i.slug}/${clinic.emirate.slug}/`} className="inline-block rounded-full bg-tone-sky px-3 py-1.5 text-sm font-medium text-ink">{i.name}</Link>
                      ) : (
                        <span className="inline-block rounded-full bg-tone-sky px-3 py-1.5 text-sm font-medium text-ink">{i.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-zinc-500">Insurers listed by the clinic. Your cover depends on your plan; the clinic can check before treatment.</p>
              </>
            ) : (
              <p className="mt-3 text-sm text-zinc-600">This clinic has not listed its insurance networks. Ask when you request an appointment.</p>
            )}
          </section>

          {dentists.length > 0 && (
            <section>
              <h2 className="display text-4xl text-ink">Dentists</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {dentists.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/dentist/${d.slug}/`} className="block-card flex gap-4 p-4">
                      <div className="size-16 shrink-0 overflow-hidden rounded-full bg-paper">
                        {d.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={d.photoUrl} alt={d.name} width={64} height={64} loading="lazy" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center"><Stethoscope className="h-6 w-6 text-zinc-400" /></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{d.name}</p>
                        <p className="text-sm text-zinc-500">{d.title || d.specializations[0] || 'Dentist'}</p>
                        {d.languages.length > 0 && <p className="mt-1 text-xs text-zinc-500">Speaks {d.languages.join(', ')}</p>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(hours.length > 0 || clinic.address) && (
            <section className="grid gap-4 md:grid-cols-2">
              {hours.length > 0 && (
                <div className="rounded-3xl border border-black/10 bg-white p-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-ink"><Clock className="h-5 w-5" /> Opening hours</h2>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4">
                        <dt className="text-zinc-600">{DAYS[h.day]}</dt>
                        <dd className="font-medium text-ink">{h.closed || !h.open ? 'Closed' : `${hhmm(h.open)} – ${hhmm(h.close)}`}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs text-zinc-500">Hours from the clinic&apos;s listing; call ahead on public holidays.</p>
                </div>
              )}
              {clinic.address && (
                <div className="rounded-3xl border border-black/10 bg-white p-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-ink"><MapPin className="h-5 w-5" /> Location</h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700">{clinic.address}</p>
                  {area && <p className="mt-3 text-sm leading-relaxed text-zinc-600">{area.gettingThere}</p>}
                  {mapsHref && (
                    <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink underline">
                      Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </section>
          )}

          {images.length > 1 && (
            <section>
              <h2 className="display text-4xl text-ink">Photos</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                {images.slice(0, 6).map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.url} src={img.url} alt={img.alt || `${clinic.name} photo ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-500">Photos supplied by the clinic or from its public business listing.</p>
            </section>
          )}

          <section>
            <h2 className="display text-4xl text-ink">Reviews</h2>
            {googleReviews.length === 0 && internalReviews.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-600">No reviews to show yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {googleReviews.map((r) => (
                  <article key={r.id} className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-ink">{r.author}</p>
                      {r.rating && <span className="flex items-center gap-2 text-sm"><Stars rating={r.rating} /> <span className="sr-only">{r.rating} out of 5</span></span>}
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{r.text}</p>
                    <p className="mt-2 text-xs text-zinc-500">Google review{r.date ? ` · ${new Date(r.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}` : ''}</p>
                  </article>
                ))}
                {internalReviews.map((r) => (
                  <article key={r.id} className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-ink">Patient feedback</p>
                      {r.rating && <Stars rating={r.rating} />}
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{r.text}</p>
                    <p className="mt-2 text-xs text-zinc-500">Left through the clinic&apos;s AppointPanda feedback link · {new Date(r.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
                  </article>
                ))}
                <p className="text-xs text-zinc-500">We show reviews as written and do not edit them. Google reviews are copied from the clinic&apos;s public Google profile.</p>
              </div>
            )}
          </section>

          {faqs.length > 0 && (
            <section>
              <h2 className="display text-4xl text-ink">Questions</h2>
              <div className="mt-4"><FaqList faqs={faqs} /></div>
            </section>
          )}

          {nearby.length > 0 && clinic.city && (
            <section>
              <h2 className="display text-4xl text-ink">Other dentists in {clinic.city.name}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/clinic/${n.slug}/`} className="block-card block p-4">
                      <p className="font-semibold leading-snug text-ink line-clamp-2">{n.name}</p>
                      {n.rating && n.reviewCount ? (
                        <p className="mt-1 flex items-center gap-1 text-sm"><Star className="h-3.5 w-3.5 fill-ink" /> {n.rating.toFixed(1)} <span className="text-zinc-500">({n.reviewCount})</span></p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
              {clinic.emirate && <Link href={`/${clinic.emirate.slug}/${clinic.city.slug}/`} className="mt-4 inline-block text-sm font-semibold text-ink underline">All dentists in {clinic.city.name}</Link>}
            </section>
          )}
        </div>

        {/* Sticky request panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            {!clinic.emirate || isLiveEmirate(clinic.emirate.slug) ? (
              <AppointmentRequest clinicId={clinic.id} clinicName={clinic.name} clinicPhone={clinic.phone} compact />
            ) : (
              <div className="text-sm leading-relaxed text-zinc-700">
                <p className="text-base font-semibold text-ink">Online requests coming soon to {clinic.emirate.name}</p>
                <p className="mt-2">AppointPanda currently takes appointment requests for Dubai clinics only. To book with {clinic.name}, contact the clinic directly.</p>
                {clinic.phone && <a href={`tel:${clinic.phone.replace(/\s/g, '')}`} className="btn-ink mt-4 w-full"><Phone className="h-4 w-4" /> Call {clinic.phone}</a>}
                <Link href="/dubai/" className="btn-ghost mt-2 w-full">Find a dentist in Dubai</Link>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-paper p-4 text-xs leading-relaxed text-zinc-600">
            <Users className="h-4 w-4 shrink-0" />
            {clinic.claimed
              ? 'This profile is managed by the clinic.'
              : <>Work here? <Link href="/claim-profile/" className="underline">Claim this profile</Link> to keep its details up to date.</>}
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
