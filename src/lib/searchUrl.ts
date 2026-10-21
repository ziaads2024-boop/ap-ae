import { emirates, services, canonicalTreatment } from '@/content';
import { dubaiAreas } from '@/content/dubai';

// One search page: /find-clinics/. Old search URLs (/search/, /ai-search/) and
// the free-text search boxes are translated into its filters here.

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = (s: string) => norm(s).replace(/ /g, '-');

function matchArea(text: string) {
  const t = norm(text);
  if (!t) return undefined;
  return dubaiAreas.find((a) => [a.slug, ...(a.aliases || [])].some((s) => norm(s) === t) || norm(a.name) === t)
    || dubaiAreas.find((a) => t.includes(norm(a.name)) && norm(a.name).length > 3);
}

function matchEmirate(text: string) {
  const t = norm(text);
  if (!t) return undefined;
  return emirates.find((e) => norm(e.slug) === t || norm(e.name) === t || t.includes(norm(e.name)));
}

export function matchService(text: string) {
  const t = norm(text);
  if (!t) return undefined;
  const slug = canonicalTreatment(slugify(text));
  return services.find((s) => s.slug === slug)
    || services.find((s) => norm(s.name) === t || norm(s.shortName) === t)
    || services.find((s) => t.includes(norm(s.shortName)) || t.includes(norm(s.name)));
}

export interface SearchInput {
  q?: string;
  location?: string;
  treatment?: string;
  insurance?: string;
  emirate?: string;
}

/** Build a /find-clinics/ URL from free text and old search parameters. */
export function findClinicsUrl(input: SearchInput): string {
  const params = new URLSearchParams();
  const leftovers: string[] = [];

  for (const text of [input.location, input.emirate].filter(Boolean) as string[]) {
    const area = matchArea(text);
    const emirate = area ? undefined : matchEmirate(text);
    if (area && !params.has('area')) params.set('area', area.slug);
    else if (emirate && !params.has('emirate')) params.set('emirate', emirate.slug);
  }

  if (input.treatment) {
    const service = matchService(input.treatment);
    if (service) params.set('specialty', service.slug);
    else leftovers.push(input.treatment);
  }

  if (input.insurance) params.set('insurance', slugify(input.insurance));

  if (input.q) {
    // The old search put place names, treatments or clinic names in q
    const area = matchArea(input.q);
    const service = matchService(input.q);
    const emirate = matchEmirate(input.q);
    if (area && !params.has('area')) params.set('area', area.slug);
    else if (service && !params.has('specialty')) params.set('specialty', service.slug);
    else if (emirate && !params.has('emirate')) params.set('emirate', emirate.slug);
    else leftovers.push(input.q);
  }

  if (params.has('emirate') && params.get('emirate') !== 'dubai') params.delete('area');
  if (leftovers.length) params.set('q', leftovers.join(' ').slice(0, 80));
  const qs = params.toString();
  return `/find-clinics/${qs ? `?${qs}` : ''}`;
}

/** Read string values from a Next.js query object. */
export function searchInputFromQuery(query: Record<string, string | string[] | undefined>): SearchInput {
  const one = (k: string) => (typeof query[k] === 'string' ? (query[k] as string) : undefined);
  return {
    q: one('q') || one('query'),
    location: one('location') || one('area') || one('city'),
    treatment: one('treatment') || one('service') || one('specialty'),
    insurance: one('insurance'),
    emirate: one('emirate') || one('state'),
  };
}
