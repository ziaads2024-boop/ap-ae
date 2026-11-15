// Hand-written editorial content for the SEO pages (services, emirates and
// service + emirate guides). This lives in the repo on purpose: these pages
// must render complete, reviewed content even when the database is unreachable.

export interface Faq {
  q: string;
  a: string;
}

export interface Source {
  label: string;
  url: string;
}

/** One row of an indicative price table. Ranges are wide on purpose: they are a guide, not a quote. */
export interface CostRow {
  item: string;
  from: number;
  to: number;
  unit: string;
  note?: string;
}

export interface CostTable {
  /** Table caption, e.g. "Indicative dental implant prices in Dubai (private clinics)" */
  caption: string;
  rows: CostRow[];
  /** Short note under the table (what is and is not included) */
  note?: string;
}

/**
 * schema.org type for the procedure. MedicalProcedure subtypes only; see
 * https://schema.org/MedicalProcedure. procedureType (MedicalProcedureType)
 * has two valid values: NoninvasiveProcedure and PercutaneousProcedure.
 */
export type ProcedureSchemaType = 'MedicalProcedure' | 'SurgicalProcedure' | 'TherapeuticProcedure' | 'DiagnosticProcedure';

export type InsuranceCategory = 'preventive' | 'restorative' | 'surgical' | 'orthodontic' | 'cosmetic' | 'emergency' | 'pediatric';

export interface ServiceContent {
  slug: string;
  name: string;
  /** Short label for chips and nav only. Never use it in a title, H1, H2 or meta text. */
  shortName: string;
  /** Title-case name for headings and titles, e.g. "Dental Implants", "Children's Dentist". Falls back to name. */
  headingName?: string;
  /** H1 for the national guide, sentence case, e.g. "Dental implants: procedure, cost and recovery" */
  h1?: string;
  /** Form used mid-sentence, e.g. "dental implants", "Invisalign", "a Hollywood smile" */
  phrase?: string;
  /** Question used as the cost H2, e.g. "How much do dental implants cost in Dubai?" */
  costQuestion?: string;
  /** Self-contained 40-60 word answer: Dubai AED range, time/visits and who it suits */
  answer?: string;
  /** Indicative price breakdown by type, rendered as an HTML table */
  costTable?: CostTable;
  /** Authoritative references for the guide */
  sources?: Source[];
  /** schema.org procedure type (defaults to MedicalProcedure) */
  schemaType?: ProcedureSchemaType;
  /** Only set when one of the two MedicalProcedureType values genuinely applies */
  procedureType?: 'NoninvasiveProcedure' | 'PercutaneousProcedure';
  bodyLocation?: string;
  /** Synonyms people search for */
  alternateName?: string[];
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
  /** Page title (<=60 chars before the brand suffix) */
  metaTitle?: string;
  metaDescription?: string;
  /** Self-contained 40-60 word local answer shown under the H1 */
  answer?: string;
  /** Local regulation for this treatment (DHA / DHCC), one paragraph per item */
  regulation?: string[];
  /** Local insurance norms for this treatment, one paragraph per item */
  insurance?: string[];
  /** Local note on prices (how they vary across the city) shown with the cost table */
  costNote?: string;
  /** Areas where clinics for this treatment cluster: slugs from src/content/dubai.ts */
  areas?: { slug: string; note: string }[];
  /** Extra sources specific to the local page (merged with the national guide's) */
  sources?: Source[];
}
