import { services, serviceBySlug, LOCAL_GUIDE_SERVICES } from './services';
import { emirates, emirateBySlug } from './emirates';
import { serviceEmirates, serviceEmirateContent } from './serviceEmirates';
import type { EmirateContent, InsuranceCategory, ServiceContent } from './types';

export * from './types';
export { services, serviceBySlug, LOCAL_GUIDE_SERVICES, emirates, emirateBySlug, serviceEmirates, serviceEmirateContent };

export const SITE_URL = 'https://www.appointpanda.ae';

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
