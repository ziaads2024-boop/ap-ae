import { SITE_URL, CONTENT_REVIEWED, urls } from './index';
import type { EmirateContent, Faq, ServiceContent } from './types';
import { GUIDES_UPDATED } from './services';
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

// pages/_document.tsx emits the Organization (#organization) and WebSite
// (#website) nodes on every page, so the builders here reference them by @id
// only and never emit a second copy.
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
const ORG_REF = { '@id': ORG_ID };

/** @deprecated The Organization node is emitted sitewide by pages/_document.tsx. Kept so old callers compile. */
export const organizationSchema = (): null => null;
/** @deprecated The WebSite node is emitted sitewide by pages/_document.tsx. Kept so old callers compile. */
export const websiteSchema = (): null => null;

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

const DENTISTRY = 'https://schema.org/Dentistry';

const webPage = (path: string, name: string, description: string, dateModified: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  inLanguage: 'en-AE',
  isPartOf: { '@id': SITE_ID },
  publisher: ORG_REF,
  author: ORG_REF,
  lastReviewed: CONTENT_REVIEWED,
  dateModified,
  specialty: DENTISTRY,
  medicalAudience: 'https://schema.org/Patient',
  audience: { '@type': 'PeopleAudience', geographicArea: { '@type': 'Country', name: 'United Arab Emirates' } },
});

/** The MedicalProcedure node for a guide, with a stable @id on the national guide URL. */
export const procedureNode = (s: ServiceContent) => ({
  '@type': s.schemaType ?? 'MedicalProcedure',
  '@id': `${SITE_URL}${urls.service(s.slug)}#procedure`,
  name: s.headingName ?? s.name,
  ...(s.alternateName?.length ? { alternateName: s.alternateName } : {}),
  description: s.answer ?? s.summary,
  url: `${SITE_URL}${urls.service(s.slug)}`,
  relevantSpecialty: DENTISTRY,
  ...(s.bodyLocation ? { bodyLocation: s.bodyLocation } : {}),
  // MedicalProcedureType has two values only; set it only when one applies.
  ...(s.procedureType ? { procedureType: `https://schema.org/${s.procedureType}` } : {}),
  howPerformed: s.steps.map((st) => `${st.title}: ${st.detail}`).join(' '),
  preparation: s.steps[0]?.detail,
  followup: s.recovery,
});

export const servicePageSchema = (s: ServiceContent, img?: SiteImage) => {
  const procedure = procedureNode(s);
  return {
    ...webPage(urls.service(s.slug), s.metaTitle, s.metaDescription, GUIDES_UPDATED),
    ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
    about: procedure,
    mainEntity: { '@id': procedure['@id'] },
  };
};

export const emiratePageSchema = (e: EmirateContent, img?: SiteImage) => ({
  ...webPage(urls.emirate(e.slug), e.metaTitle, e.metaDescription, CONTENT_REVIEWED),
  ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
  about: { '@type': 'AdministrativeArea', name: `${e.name}, United Arab Emirates` },
});

export const serviceEmiratePageSchema = (s: ServiceContent, e: EmirateContent, title: string, description: string, img?: SiteImage) => {
  const procedure = procedureNode(s);
  return {
    ...webPage(urls.serviceEmirate(e.slug, s.slug), title, description, GUIDES_UPDATED),
    ...(img ? { primaryImageOfPage: imageObject(img) } : {}),
    about: [procedure, { '@type': e.slug === 'dubai' ? 'City' : 'AdministrativeArea', name: `${e.name}, United Arab Emirates` }],
    mainEntity: { '@id': procedure['@id'] },
  };
};

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
