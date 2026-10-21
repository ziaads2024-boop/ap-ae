import { services, serviceBySlug, LOCAL_GUIDE_SERVICES } from './services';
import { emirates, emirateBySlug } from './emirates';
import { serviceEmirates, serviceEmirateContent } from './serviceEmirates';
import type { EmirateContent, InsuranceCategory, ServiceContent } from './types';

export * from './types';
export { services, serviceBySlug, LOCAL_GUIDE_SERVICES, emirates, emirateBySlug, serviceEmirates, serviceEmirateContent };

export const SITE_URL = 'https://www.appointpanda.ae';

/**
 * Emirates where AppointPanda is live (search, appointment requests, indexed
 * pages). Other emirates are "coming soon": their pages stay reachable but show
 * a notice, take no appointment requests and are kept out of search indexes and
 * sitemaps. Add a slug here to launch an emirate.
 */
export const LIVE_EMIRATES = ['dubai'];
/** Set to true to let search engines index coming-soon emirate pages. */
export const INDEX_COMING_SOON = false;
export const isLiveEmirate = (slug: string | null | undefined) => !!slug && LIVE_EMIRATES.includes(slug);

const EMIRATE_SLUGS = ['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain', 'dxb', 'auh', 'shj', 'ajm', 'rak', 'fuj', 'uaq'];
const ABBR: Record<string, string> = { dxb: 'dubai', auh: 'abu-dhabi', shj: 'sharjah', ajm: 'ajman', rak: 'ras-al-khaimah', fuj: 'fujairah', uaq: 'umm-al-quwain' };

/** The emirate a URL path belongs to, if any (/sharjah/..., /insurance/daman/sharjah/...). */
export function emirateOfPath(path: string): string | null {
  const segs = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const hit = segs[0] === 'insurance' ? segs[2] : segs[0];
  if (!hit || !EMIRATE_SLUGS.includes(hit)) return null;
  return ABBR[hit] || hit;
}

/** True when a path is in an emirate that is not live yet. */
export const isComingSoonPath = (path: string) => {
  const e = emirateOfPath(path);
  return !!e && !isLiveEmirate(e);
};

/** Date the editorial content in src/content was last reviewed. Update when content changes. */
export const CONTENT_REVIEWED = '2026-10-21';
export const CONTENT_REVIEWED_LABEL = 'October 2026';

export const urls = {
  service: (s: string) => `/services/${s}/`,
  emirate: (e: string) => `/${e}/`,
  serviceEmirate: (e: string, s: string) => `/${e}/services/${s}/`,
  services: '/services/',
  emirates: '/emirates/',
  dubaiArea: (a: string) => `/dubai/${a}/`,
  dubaiAreaService: (a: string, s: string) => `/dubai/${a}/${s}/`,
  dubaiReason: (r: string) => `/dubai/reasons/${r}/`,
  dubaiReasons: '/dubai/reasons/',
};

/**
 * Guide slugs vs treatment slugs in the database. RENAMED entries are the same
 * treatment under an older database slug: URLs using the database slug 301 to
 * the guide. LOOKUP_ONLY entries are related treatments used only to find
 * clinics (no redirect).
 */
const RENAMED: Record<string, string> = {
  'dental-veneers': 'veneers',
  'root-canal-treatment': 'root-canal',
  'emergency-dental-care': 'emergency-dentist',
  'wisdom-teeth-removal': 'wisdom-tooth-removal',
};
const LOOKUP_ONLY: Record<string, string[]> = {
  'hollywood-smile': ['smile-makeover'],
};
/** Database slug -> guide slug for renamed treatments (else unchanged). */
export const canonicalTreatment = (slug: string) => RENAMED[slug] ?? slug;
/** Every database treatment slug to query for a guide slug. */
export const dbSlugsFor = (guideSlug: string) => [
  guideSlug,
  ...Object.entries(RENAMED).filter(([, g]) => g === guideSlug).map(([db]) => db),
  ...(LOOKUP_ONLY[guideSlug] || []),
];
/** Guide slug for a database slug, including lookup-only relations (for counts and links). */
export const guideSlugForDb = (dbSlug: string) =>
  RENAMED[dbSlug] ?? Object.entries(LOOKUP_ONLY).find(([, list]) => list.includes(dbSlug))?.[0] ?? dbSlug;
export const isRenamedTreatment = (slug: string) => slug in RENAMED;

export const hasLocalGuide = (service: string, emirate: string) =>
  LOCAL_GUIDE_SERVICES.includes(service) && Boolean(serviceEmirateContent(service, emirate));

const NORTHERN = ['sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain'];

/**
 * How insurance usually treats this kind of treatment in this emirate.
 * General guidance only; pages tell readers to confirm with their insurer.
 */
export function insuranceNote(service: ServiceContent, emirate: EmirateContent): string {
  const byCategory: Record<InsuranceCategory, string> = {
    preventive: 'Check-ups and cleaning are the treatments most often included when a plan has a dental benefit, usually once or twice a year.',
    restorative: 'Restorative work such as fillings, root canals and crowns is commonly part of a dental benefit, with a co-payment and an annual limit. Crowns are sometimes covered at a lower rate.',
    surgical: 'Surgical treatment is covered by some dental benefits when it is medically necessary, often with pre-approval. Implants in particular are frequently excluded or capped.',
    orthodontic: 'Orthodontic treatment for adults is rarely covered. Some family plans have a separate orthodontic limit for children, usually with age rules.',
    cosmetic: 'Cosmetic treatment is generally excluded from insurance, so plan to pay for it yourself and ask for a written quote.',
    emergency: 'Emergency treatment to relieve pain or control infection is the dental care most often covered, including under some basic plans. Follow-up work is usually assessed separately.',
    pediatric: 'Family plans with dental benefits usually include children\'s check-ups and basic treatment.',
  };

  let local = '';
  if (emirate.slug === 'abu-dhabi' && ['preventive', 'restorative', 'pediatric', 'emergency'].includes(service.insuranceCategory)) {
    local = ' UAE nationals with Thiqa should check which providers participate.';
  } else if (emirate.slug === 'dubai') {
    local = ' Dubai\'s mandatory basic plans generally exclude routine dental care, so cover depends on your employer\'s plan.';
  } else if (NORTHERN.includes(emirate.slug)) {
    local = ' Basic mandatory insurance in the Northern Emirates generally does not include routine dental care.';
  }
  return byCategory[service.insuranceCategory] + local;
}

export const formatAed = (n: number) => `AED ${n.toLocaleString('en-US')}`;

/** Stable tone per emirate/service so colour blocks stay consistent across pages */
export const toneClass: Record<string, string> = {
  lemon: 'bg-tone-lemon',
  sky: 'bg-tone-sky',
  blush: 'bg-tone-blush',
  lime: 'bg-tone-lime',
  sand: 'bg-tone-sand',
};
