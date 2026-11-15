// Listing quality rules shared by clinic pages, area lists, search and the
// sitemap generator (scripts/generate-sitemaps.js mirrors NON_DENTAL and the
// index rule; keep them in step).

// Businesses imported with the clinics that are not places a patient books a
// dentist: pharmacies, dental laboratories (trade only), home nursing, labs.
export const NON_DENTAL = /\b(pharmacy|pharmacies|pharma|chemist|dental lab|dental laboratory|laboratory|diagnostic lab|home (nursing|care|health(care)?)|nursing|iv (drip|infusion|therapy)|optic(al|ians?)|opticals|veterinar\w*|pet clinic|salon|spa|beauty|hair|physiotherapy|radiology|800doctor)\b/i;
const DENTAL_SIGNAL = /\b(dent\w*|orthodont\w*|endodont\w*|periodont\w*|smile|teeth|tooth|oral)\b/i;

/** True when the listing is not a dental practice a patient can book. */
export function isNonDental(name: string | null | undefined): boolean {
  const n = name || '';
  if (/\bdental lab(oratory)?\b/i.test(n)) return true;
  return NON_DENTAL.test(n) && !/\b(dentist|dental (clinic|centre|center|care|studio|hospital)|dentistry|orthodont\w*)\b/i.test(n);
}

/** Dental signal in the name (used to soften wording for multi-specialty centres). */
export const hasDentalName = (name: string) => DENTAL_SIGNAL.test(name);

/** UAE numbers in international format for tel: links and schema; null when invalid. */
export function uaePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('971')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  if (/^800\d{3,7}$/.test(d)) return `+971${d}`; // toll-free
  if (/^(5\d{8}|[2-9]\d{7})$/.test(d)) return `+971${d}`;
  return null;
}

/** Index a clinic profile only when it is a real dental listing with enough to show. */
export function clinicIndexable(c: { name: string; phone: string | null; hasHours: boolean; reviewCount: number | null; claimed: boolean }): boolean {
  if (isNonDental(c.name)) return false;
  if (!uaePhone(c.phone) || !c.hasHours) return false;
  return c.claimed || (c.reviewCount || 0) >= 5;
}
