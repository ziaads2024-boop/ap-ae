import Link from 'next/link';
import { Award, Building2, GraduationCap, Languages, MapPin, Phone, ShieldCheck, Stethoscope, UserRound } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Crumbs, FaqList, JsonLd } from '@/components/guide/GuideBlocks';
import { AppointmentRequest } from '@/components/booking/AppointmentRequest';
import { canonicalTreatment, isLiveEmirate, serviceBySlug, SITE_URL, urls, type Faq } from '@/content';
import { dubaiAreaBySlug } from '@/content/dubai';
import { breadcrumbSchema, faqSchema } from '@/content/schema';

export interface DentistProfileProps {
  dentist: {
    id: string; name: string; slug: string; title: string | null; bio: string | null; photoUrl: string | null;
    gender: string | null; languages: string[]; qualifications: string[]; specializations: string[]; yearsExperience: number | null;
  };
  clinic: {
    id: string; name: string; slug: string; address: string | null; phone: string | null; claimed: boolean;
    city: { name: string; slug: string } | null; emirate: { name: string; slug: string } | null;
  } | null;
  colleagues: { name: string; slug: string; title: string | null; photoUrl: string | null }[];
  treatments: { name: string; slug: string }[];
}

const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

/** One-paragraph summary built only from listed facts, used when there is no bio. */
function factSummary({ dentist, clinic }: DentistProfileProps) {
  const parts = [`${dentist.name} is ${/^[aeiou]/i.test(dentist.title || 'dentist') ? 'an' : 'a'} ${(dentist.title || 'dentist').toLowerCase()}`];
  if (clinic) parts.push(`at ${clinic.name}${clinic.city ? ` in ${clinic.city.name}` : ''}`);
  let s = `${parts.join(' ')}.`;
  if (dentist.specializations.length) s += ` Listed areas of practice: ${list(dentist.specializations)}.`;
  if (dentist.languages.length) s += ` Speaks ${list(dentist.languages)}.`;
  return s;
}

function faqsFor(p: DentistProfileProps): Faq[] {
  const { dentist, clinic } = p;
  const out: Faq[] = [];
  if (clinic) {
    out.push({
      q: `Where does ${dentist.name} practise?`,
      a: `${dentist.name} is listed at ${clinic.name}${clinic.address ? `, ${clinic.address}` : clinic.city ? ` in ${clinic.city.name}` : ''}. Check with the clinic which days ${dentist.name} sees patients.`,
    });
    out.push({
      q: `How do I book an appointment with ${dentist.name}?`,
      a: clinic.emirate && !isLiveEmirate(clinic.emirate.slug)
        ? `Contact ${clinic.name} directly${clinic.phone ? ` on ${clinic.phone}` : ''}. AppointPanda takes online requests for Dubai clinics only at the moment.`
        : `Send a request on this page with your preferred day and time of day, or call ${clinic.name}${clinic.phone ? ` on ${clinic.phone}` : ''}. The appointment is confirmed only when the clinic agrees a time with you.`,
    });
  }
  if (dentist.languages.length) {
    out.push({ q: `Which languages does ${dentist.name} speak?`, a: `${dentist.name} lists ${list(dentist.languages)}.` });
  }
  out.push({
    q: `Is ${dentist.name} licensed?`,
    a: clinic?.emirate?.slug === 'dubai'
      ? `Dentists in Dubai must hold a Dubai Health Authority (DHA) licence, or a DHCC licence in Dubai Healthcare City. You can check a practitioner's licence on the DHA Sheryan portal before your visit.`
      : `Dentists in the UAE must be licensed by the health authority of their emirate. You can check a practitioner's licence with that authority before your visit.`,
  });
  return out;
}

export function DentistProfile(props: DentistProfileProps) {
  const { dentist, clinic, colleagues, treatments } = props;
  const path = `/dentist/${dentist.slug}/`;
  const role = dentist.title || 'Dentist';
  const place = clinic?.city?.name;
  const live = !clinic?.emirate || isLiveEmirate(clinic.emirate.slug);
  const area = clinic?.emirate?.slug === 'dubai' && clinic.city ? dubaiAreaBySlug(clinic.city.slug) : undefined;
  const placeHref = area ? urls.dubaiArea(area.slug) : clinic?.emirate && clinic.city ? `/${clinic.emirate.slug}/${clinic.city.slug}/` : null;

  const title = `${dentist.name}, ${role}${clinic ? ` at ${clinic.name}` : ''}${place ? `, ${place}` : ''}`;
  const description = `${dentist.name}${clinic ? `, ${role.toLowerCase()} at ${clinic.name}${place ? ` in ${place}` : ''}` : ''}. ${
    dentist.languages.length ? `Speaks ${list(dentist.languages.slice(0, 3))}. ` : ''
  }See qualifications and treatments${live && clinic ? ', and request an appointment' : ''}.`;
  const summary = dentist.bio?.trim() || factSummary(props);
  // Thin profiles (no bio, no clinic) stay out of the index until they are filled in
  const indexable = !!clinic && (!!dentist.bio?.trim() || dentist.qualifications.length + dentist.specializations.length > 0);
  const faqs = faqsFor(props);

  const crumbs = [
    { name: 'Home', path: '/' },
    ...(clinic?.emirate ? [{ name: clinic.emirate.name, path: urls.emirate(clinic.emirate.slug) }] : []),
    ...(clinic ? [{ name: clinic.name, path: `/clinic/${clinic.slug}/` }] : []),
    { name: dentist.name, path },
  ];

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}${path}#person`,
    name: dentist.name,
    jobTitle: role,
    url: `${SITE_URL}${path}`,
    ...(dentist.photoUrl ? { image: dentist.photoUrl } : {}),
    ...(dentist.languages.length ? { knowsLanguage: dentist.languages } : {}),
    ...(dentist.specializations.length ? { knowsAbout: dentist.specializations } : {}),
    ...(dentist.qualifications.length ? { hasCredential: dentist.qualifications.map((q) => ({ '@type': 'EducationalOccupationalCredential', name: q })) } : {}),
    ...(clinic ? { worksFor: { '@type': 'Dentist', name: clinic.name, url: `${SITE_URL}/clinic/${clinic.slug}/`, ...(clinic.address ? { address: clinic.address } : {}) } } : {}),
  };

  const facts = [
    dentist.yearsExperience ? { icon: Award, label: 'Experience', value: `${dentist.yearsExperience} years` } : null,
    dentist.languages.length ? { icon: Languages, label: 'Languages', value: dentist.languages.join(', ') } : null,
    dentist.gender ? { icon: UserRound, label: 'Gender', value: dentist.gender[0].toUpperCase() + dentist.gender.slice(1) } : null,
    clinic ? { icon: Building2, label: 'Clinic', value: clinic.name } : null,
  ].filter(Boolean) as { icon: typeof Award; label: string; value: string }[];

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={path} noindex={!indexable} ogImage={dentist.photoUrl || undefined} />
      <JsonLd data={[personSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />

      <section className="px-3 pt-4 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-tone-sky px-6 pb-10 pt-8 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <Crumbs items={crumbs} />
            <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-center">
              {dentist.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dentist.photoUrl} alt={`${dentist.name}, ${role}`} className="size-28 shrink-0 rounded-3xl object-cover ring-4 ring-white sm:size-36" />
              ) : (
                <div className="flex size-28 shrink-0 items-center justify-center rounded-3xl bg-white/70 ring-4 ring-white sm:size-36" aria-hidden="true">
                  <Stethoscope className="h-12 w-12 text-ink/60" />
                </div>
              )}
              <div>
                <span className="chip-label">{role}</span>
                <h1 className="display mt-3 text-[clamp(2.2rem,5.5vw,4.25rem)] text-ink">{dentist.name}</h1>
                {clinic && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 text-ink/80">
                    <Link href={`/clinic/${clinic.slug}/`} className="font-semibold underline">{clinic.name}</Link>
                    {place && (
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{placeHref ? <Link href={placeHref} className="hover:underline">{place}</Link> : place}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section aria-labelledby="about">
            <h2 id="about" className="display text-3xl text-ink">About {dentist.name}</h2>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-zinc-700">{summary}</p>
            {facts.length > 0 && (
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4">
                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{f.label}</dt>
                      <dd className="text-sm font-medium text-ink">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {(dentist.qualifications.length > 0 || dentist.specializations.length > 0) && (
            <section aria-labelledby="credentials" className="grid gap-4 sm:grid-cols-2">
              <h2 id="credentials" className="sr-only">Qualifications and areas of practice</h2>
              {dentist.qualifications.length > 0 && (
                <div className="rounded-3xl bg-paper p-6">
                  <p className="flex items-center gap-2 font-semibold text-ink"><GraduationCap className="h-5 w-5" /> Qualifications</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">{dentist.qualifications.map((q) => <li key={q}>{q}</li>)}</ul>
                </div>
              )}
              {dentist.specializations.length > 0 && (
                <div className="rounded-3xl bg-paper p-6">
                  <p className="flex items-center gap-2 font-semibold text-ink"><Stethoscope className="h-5 w-5" /> Areas of practice</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">{dentist.specializations.map((q) => <li key={q}>{q}</li>)}</ul>
                </div>
              )}
            </section>
          )}

          {treatments.length > 0 && (
            <section aria-labelledby="treatments">
              <h2 id="treatments" className="display text-3xl text-ink">Treatments at {clinic?.name}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {treatments.map((t) => {
                  const guide = serviceBySlug(canonicalTreatment(t.slug));
                  return (
                    <li key={t.slug}>
                      {guide ? (
                        <Link href={urls.service(guide.slug)} className="inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper">{t.name}</Link>
                      ) : (
                        <span className="inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink">{t.name}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-xs text-zinc-500">Treatments the clinic lists. Ask the clinic which of them {dentist.name} provides.</p>
            </section>
          )}

          {colleagues.length > 0 && clinic && (
            <section aria-labelledby="team">
              <h2 id="team" className="display text-3xl text-ink">Other dentists at {clinic.name}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {colleagues.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/dentist/${c.slug}/`} className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-3 hover:bg-paper">
                      {c.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.photoUrl} alt="" className="size-12 rounded-xl object-cover" loading="lazy" />
                      ) : (
                        <span className="flex size-12 items-center justify-center rounded-xl bg-paper" aria-hidden="true"><UserRound className="h-5 w-5" /></span>
                      )}
                      <span>
                        <span className="block font-semibold text-ink">{c.name}</span>
                        {c.title && <span className="text-sm text-zinc-500">{c.title}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {faqs.length > 0 && (
            <section aria-labelledby="faq">
              <h2 id="faq" className="display mb-4 text-3xl text-ink">Common questions</h2>
              <FaqList faqs={faqs} />
            </section>
          )}

          <p className="flex items-start gap-2 rounded-2xl bg-paper p-4 text-xs leading-relaxed text-zinc-600">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Profile details come from the clinic and public sources and may change. AppointPanda does not rank dentists by quality.
            Check the practitioner&apos;s licence with the health authority, and confirm treatment and fees with the clinic.
          </p>
        </div>

        <aside id="request" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            {clinic && live ? (
              <AppointmentRequest clinicId={clinic.id} clinicName={clinic.name} dentistId={dentist.id} clinicPhone={clinic.phone} clinicClaimed={clinic.claimed} compact />
            ) : clinic ? (
              <div className="text-sm leading-relaxed text-zinc-700">
                <p className="text-base font-semibold text-ink">Online requests coming soon to {clinic.emirate?.name}</p>
                <p className="mt-2">To book with {dentist.name}, contact {clinic.name} directly.</p>
                {clinic.phone && <a href={`tel:${clinic.phone.replace(/\s/g, '')}`} className="btn-ink mt-4 w-full"><Phone className="h-4 w-4" /> Call {clinic.phone}</a>}
                <Link href="/dubai/" className="btn-ghost mt-2 w-full">Find a dentist in Dubai</Link>
              </div>
            ) : (
              <div className="text-sm text-zinc-700">
                <p className="text-base font-semibold text-ink">No clinic listed</p>
                <p className="mt-2">This dentist is not linked to a clinic on AppointPanda yet.</p>
                <Link href="/find-clinics/" className="btn-ink mt-4 w-full">Find a clinic</Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {clinic && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/10 bg-white/95 p-3 backdrop-blur lg:hidden">
            {live && <a href="#request" className="btn-ink flex-1">Request appointment</a>}
            {clinic.phone && <a href={`tel:${clinic.phone.replace(/\s/g, '')}`} className="btn-ghost flex-1"><Phone className="h-4 w-4" /> Call</a>}
          </div>
          <div className="h-20 lg:hidden" aria-hidden="true" />
        </>
      )}
    </PageLayout>
  );
}
