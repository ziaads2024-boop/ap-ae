import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { FaqList, JsonLd, Section } from '@/components/guide/GuideBlocks';
import { formatAed, serviceBySlug, urls, type Faq } from '@/content';
import { breadcrumbSchema, faqSchema } from '@/content/schema';

// Answers are written to match the treatment guides and policy pages, and
// figures come from src/content so they cannot drift out of step.

const from = (slug: string) => {
  const s = serviceBySlug(slug);
  return s ? formatAed(s.price.from) : '';
};

const patients: Faq[] = [
  {
    q: 'How do I check that a dentist in Dubai is licensed?',
    a: 'Dentists in Dubai are licensed by the Dubai Health Authority (DHA), or by the Dubai Healthcare City Authority for clinics inside Dubai Healthcare City. You can look up a practitioner on the DHA Sheryan portal. Being listed on AppointPanda does not mean we have checked a licence; a "verified" label means only what our verification policy describes.',
  },
  {
    q: 'What does dental treatment cost in Dubai?',
    a: `Prices are set by each clinic. As a guide, private clinics in the UAE usually charge from ${from('teeth-cleaning')} for a scale and polish, from ${from('teeth-whitening')} for professional whitening, from ${from('root-canal')} for a root canal and from ${from('dental-implants')} per implant. Each treatment guide gives a full range and what pushes a quote up or down. Ask for an itemised quote in writing.`,
  },
  {
    q: 'Does my health insurance cover dental treatment?',
    a: 'Only if your plan has a dental benefit. The basic plans that meet the legal minimum in Dubai usually include little or no routine dental care; employer and enhanced plans often add dental cover with an annual limit and a co-payment. Cosmetic treatment is usually excluded. Our insurance guide lists the questions to ask your insurer.',
  },
  {
    q: 'Can I see a dentist the same day in an emergency?',
    a: 'Many clinics keep same-day slots for pain, swelling or a broken tooth, so call the clinic directly rather than sending a request. If swelling spreads towards your eye or neck, or you have difficulty breathing or swallowing, call 998 or go to a hospital emergency department.',
  },
  {
    q: 'How does requesting an appointment work?',
    a: 'You choose a clinic, a preferred day and a time of day. The request goes to the clinic, or to the AppointPanda team if the clinic does not manage requests on AppointPanda yet, and someone calls you to agree an exact time. It is not a confirmed appointment until then.',
  },
  {
    q: 'Is AppointPanda free for patients?',
    a: 'Yes. Searching, reading guides and sending appointment requests are free. You pay the clinic directly for any treatment.',
  },
  {
    q: 'Where do the ratings come from?',
    a: 'Clinic ratings and review counts come from Google and are shown as reported. We do not write, buy, filter or edit reviews, and lists are sorted by number of Google reviews, not by quality.',
  },
];

const clinics: Faq[] = [
  {
    q: 'How do I list my clinic?',
    a: 'Use the List your practice form. If your clinic is already listed, claim the existing profile instead so patients keep finding the same page.',
  },
  {
    q: 'What does a verified profile mean?',
    a: 'It means the checks described in our verification policy were completed for that clinic. Verification does not change where a clinic appears in search results; lists are sorted by Google review count.',
  },
  {
    q: 'How do I correct information on my profile?',
    a: 'Claim your profile to edit treatments, prices, hours and photos yourself, or contact us with the correction and a source.',
  },
];

const general: Faq[] = [
  {
    q: 'Which emirates does AppointPanda cover?',
    a: 'Appointment requests are open for Dubai, where we have guides for more than 30 areas. Listings and guides for the other emirates are available for information, and online requests there are coming soon.',
  },
  {
    q: 'Who licenses dentists in the other emirates?',
    a: 'The Department of Health (DoH) licenses dentists in Abu Dhabi. The Ministry of Health and Prevention (MOHAP) covers Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain, and Sharjah also has its own health authority for some facilities. Each emirate guide names the regulator to check.',
  },
  {
    q: 'How do I report wrong information?',
    a: 'Contact us with the page address and what is wrong. We correct factual errors and note significant changes on our guides.',
  },
];

const all = [...patients, ...clinics, ...general];

export default function FaqPage() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq/' }];
  return (
    <PageLayout>
      <SEOHead
        title="Dentist FAQ: Licensing, Costs and Insurance in Dubai"
        description="Answers about finding a licensed dentist in Dubai, typical treatment costs in AED, dental insurance, emergencies and how appointment requests work."
        canonical="/faq/"
      />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(all)]} />
      <PageHero
        kicker="FAQ"
        title="Questions, answered"
        subtitle="Licensing, costs, insurance and how AppointPanda works. For treatment-specific questions, see the treatment guides."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        tone="lemon"
      />
      <div className="mx-auto max-w-4xl px-5">
        <Section eyebrow="Patients" title="For patients">
          <FaqList faqs={patients} />
        </Section>
        <Section eyebrow="Clinics" title="For clinics">
          <FaqList faqs={clinics} />
        </Section>
        <Section eyebrow="About AppointPanda" title="Coverage and corrections">
          <FaqList faqs={general} />
        </Section>
        <Section eyebrow="Keep reading" title="More help">
          <div className="flex flex-wrap gap-2 pb-14">
            <Link href={urls.services} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Treatment guides</Link>
            <Link href="/insurance/" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">Insurance guide</Link>
            <Link href={urls.emirate('dubai')} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">Dentists in Dubai</Link>
            <Link href="/verification-policy/" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">Verification policy</Link>
            <Link href="/contact/" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">Contact us</Link>
          </div>
        </Section>
      </div>
    </PageLayout>
  );
}
