import { SITE_URL, CONTENT_REVIEWED, urls } from './index';
import type { EmirateContent, Faq, ServiceContent } from './types';
import { LICENSE_URLS, type SiteImage } from './images';

/** ImageObject with licence metadata (Google image licence fields). */
export const imageObject = (img: SiteImage) => ({
  '@type': 'ImageObject',
  contentUrl: `${SITE_URL}${img.src}`,
  width: img.width,
  height: img.height,
  caption: img.caption,
  creditText: `${img.credit.author} / ${img.credit.sourceName}`,
  creator: { '@type': 'Person', name: img.credit.author },
  license: LICENSE_URLS[img.credit.license],
  acquireLicensePage: img.credit.sourceUrl,
});

// JSON-LD builders. Only describe what is visibly on the page: no ratings,
// reviews, prices or credentials that the page does not show.

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'AppointPanda',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  description: 'AppointPanda is a directory that helps people in the UAE find and compare licensed dental clinics and understand dental treatments.',
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: 'AppointPanda',
  url: `${SITE_URL}/`,
  inLanguage: 'en-AE',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const faqSchema = (faqs: Faq[]) =>
  faqs.length === 0
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };

const webPage = (path: string, name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  inLanguage: 'en-AE',
  isPartOf: { '@id': SITE_ID },
  publisher: { '@id': ORG_ID },
  lastReviewed: CONTENT_REVIEWED,
  audience: { '@type': 'PeopleAudience', geographicArea: { '@type': 'Country', name: 'United Arab Emirates' } },
});

export const servicePageSchema = (s: ServiceContent, img?: SiteImage) => ({
  ...webPage(urls.service(s.slug), s.metaTitle, s.metaDescription),
  ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
  about: {
    '@type': 'MedicalProcedure',
    name: s.name,
    description: s.summary,
    howPerformed: s.steps.map((st) => st.title).join('; '),
    preparation: s.steps[0]?.detail,
    followup: s.recovery,
    procedureType: s.insuranceCategory === 'surgical' ? 'https://schema.org/SurgicalProcedure' : 'https://schema.org/NoninvasiveProcedure',
  },
});

export const emiratePageSchema = (e: EmirateContent, img?: SiteImage) => ({
  ...webPage(urls.emirate(e.slug), e.metaTitle, e.metaDescription),
  ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
  about: { '@type': 'AdministrativeArea', name: `${e.name}, United Arab Emirates` },
});

export const serviceEmiratePageSchema = (s: ServiceContent, e: EmirateContent, title: string, description: string, img?: SiteImage) => ({
  ...webPage(urls.serviceEmirate(e.slug, s.slug), title, description),
  ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
  about: [
    { '@type': 'MedicalProcedure', name: s.name, description: s.summary },
    { '@type': 'AdministrativeArea', name: `${e.name}, United Arab Emirates` },
  ],
});

export const clinicListSchema = (name: string, clinics: { name: string; slug: string }[]) =>
  clinics.length === 0
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        itemListElement: clinics.slice(0, 20).map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/clinic/${c.slug}/`,
          name: c.name,
        })),
      };
