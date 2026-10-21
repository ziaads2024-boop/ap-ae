// Hand-written editorial content for the SEO pages (services, emirates and
// service + emirate guides). This lives in the repo on purpose: these pages
// must render complete, reviewed content even when the database is unreachable.

export interface Faq {
  q: string;
  a: string;
}

export type InsuranceCategory = 'preventive' | 'restorative' | 'surgical' | 'orthodontic' | 'cosmetic' | 'emergency' | 'pediatric';

export interface ServiceContent {
  slug: string;
  name: string;
  /** Short label for chips and nav */
  shortName: string;
  /** One-sentence answer used as the page's quick answer and meta description base */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** Plain-language explanation, 2-3 paragraphs */
  intro: string[];
  goodFor: string[];
  notIdealFor: string[];
  steps: { title: string; detail: string }[];
  /** Indicative AED range for the UAE private sector */
  price: { from: number; to: number; unit: string; note: string };
  priceFactors: string[];
  duration: string;
  recovery: string;
  risks: string[];
  alternatives: { name: string; note: string; slug?: string }[];
  questionsToAsk: string[];
  faqs: Faq[];
  related: string[];
  insuranceCategory: InsuranceCategory;
  /** Accent block colour used for this service across the site */
  tone: Tone;
}

export type Tone = 'lemon' | 'sky' | 'blush' | 'lime' | 'sand';

export interface EmirateContent {
  slug: string;
  name: string;
  /** Arabic name, shown as a secondary label */
  nameAr: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  regulator: { name: string; short: string; note: string; checkLicence: string };
  insurance: string[];
  /** Neighbourhoods/areas with a short practical note each */
  areas: { name: string; note: string }[];
  gettingThere: string;
  tips: string[];
  faqs: Faq[];
  neighbours: string[];
  tone: Tone;
}

export interface ServiceEmirateContent {
  service: string;
  emirate: string;
  /** Hand-written local context specific to this service in this emirate */
  localNote: string[];
  faqs: Faq[];
}
