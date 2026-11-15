/**
 * Small, hard-coded copy of the names and slugs the site chrome (Navbar,
 * Footer, PageLayout) needs. Importing `@/content` from the header pulled the
 * full guide text (~150 KB) into every page; this file keeps the chrome light.
 *
 * Generated from src/content (services, emirates, Dubai areas, visit reasons).
 * When a service, area or reason is added there, add it here too.
 */

export interface NavService { slug: string; name: string; shortName: string; summary: string }
export interface NavEmirate { slug: string; name: string; nameAr: string }
export interface NavArea { slug: string; name: string; group: string }

export const LIVE_EMIRATES: string[] = [
  "dubai"
];
export const isLiveEmirate = (slug: string | null | undefined) => !!slug && LIVE_EMIRATES.includes(slug);

export const navServices: NavService[] = [
  {
    "slug": "dental-implants",
    "name": "Dental Implants",
    "shortName": "Implants",
    "summary": "A dental implant (also called a tooth implant) is a small titanium or zirconia post placed in the jawbone to replace a missing tooth root, topped with a crown that looks and works like a natural tooth."
  },
  {
    "slug": "invisalign",
    "name": "Invisalign & Clear Aligners",
    "shortName": "Invisalign",
    "summary": "Invisalign is a brand of clear, removable aligners that move teeth gradually using a series of custom trays, each worn for 20 to 22 hours a day."
  },
  {
    "slug": "braces",
    "name": "Braces",
    "shortName": "Braces",
    "summary": "Braces are fixed brackets and wires that apply steady pressure to move teeth and correct the bite, suitable for children, teens and adults."
  },
  {
    "slug": "veneers",
    "name": "Veneers",
    "shortName": "Veneers",
    "summary": "Veneers are thin shells of porcelain or composite bonded to the front of teeth to change their colour, shape or size."
  },
  {
    "slug": "hollywood-smile",
    "name": "Hollywood Smile",
    "shortName": "Hollywood Smile",
    "summary": "A \"Hollywood smile\" is a full smile makeover, usually veneers or crowns on most visible upper and lower teeth, planned to give an even, bright result."
  },
  {
    "slug": "teeth-whitening",
    "name": "Teeth Whitening",
    "shortName": "Whitening",
    "summary": "Professional teeth whitening uses a peroxide gel, applied in the clinic or with custom home trays, to lighten the natural colour of teeth by several shades."
  },
  {
    "slug": "root-canal",
    "name": "Root Canal Treatment",
    "shortName": "Root Canal",
    "summary": "Root canal treatment (endodontic treatment) removes infected or inflamed pulp from inside a tooth, cleans and seals the canals, and lets you keep the tooth instead of extracting it."
  },
  {
    "slug": "teeth-cleaning",
    "name": "Teeth Cleaning (Scale & Polish)",
    "shortName": "Cleaning",
    "summary": "A professional scale and polish (also called a dental cleaning or hygiene visit) removes hardened plaque (tartar) and surface stains that brushing cannot shift, helping prevent gum disease and decay."
  },
  {
    "slug": "emergency-dentist",
    "name": "Emergency Dentist",
    "shortName": "Emergency",
    "summary": "An emergency dentist treats urgent problems such as severe toothache, swelling, a knocked-out tooth or a broken tooth, usually the same day."
  },
  {
    "slug": "pediatric-dentistry",
    "name": "Children's Dentistry",
    "shortName": "Kids",
    "summary": "Pediatric dentistry is dental care for babies, children and teens, focused on prevention, gentle treatment and keeping young patients comfortable."
  },
  {
    "slug": "wisdom-tooth-removal",
    "name": "Wisdom Tooth Removal",
    "shortName": "Wisdom Teeth",
    "summary": "Wisdom tooth removal is the extraction of one or more third molars, usually because they are impacted, infected or damaging neighbouring teeth."
  },
  {
    "slug": "dental-crowns",
    "name": "Dental Crowns",
    "shortName": "Crowns",
    "summary": "A dental crown (also called a cap) is a custom cover for a damaged or weakened tooth that restores its shape, strength and appearance."
  },
  {
    "slug": "all-on-4-implants",
    "name": "All-on-4 & Full-Arch Implants",
    "shortName": "All-on-4",
    "summary": "All-on-4 replaces a full arch of teeth with a fixed bridge held on four to six implants. Dubai private clinics typically charge AED 25,000 to 65,000 per arch. A temporary bridge is often fitted within days of surgery and the final bridge 3 to 6 months later. It suits adults who have lost most teeth in one jaw."
  },
  {
    "slug": "gum-treatment",
    "name": "Gum Disease Treatment",
    "shortName": "Gum Treatment",
    "summary": "Gum disease treatment removes the plaque and tartar that inflame the gums (gingivitis) or destroy the bone around teeth (periodontitis). In Dubai, a full-mouth deep clean typically costs AED 600 to 3,000 at private clinics, over 1 to 4 visits. It suits anyone with bleeding gums, gum pockets or loose teeth."
  },
  {
    "slug": "tooth-extraction",
    "name": "Tooth Extraction",
    "shortName": "Extraction",
    "summary": "A tooth extraction removes a tooth that cannot be saved, either simply with forceps or surgically through a small cut in the gum. In Dubai, private clinics typically charge AED 300 to 2,500 per tooth. Most extractions take one visit of 20 to 60 minutes. It suits teeth that are badly broken, infected or loose."
  },
  {
    "slug": "dental-fillings",
    "name": "Dental Fillings",
    "shortName": "Fillings",
    "summary": "A dental filling repairs a tooth damaged by decay or a small fracture, using tooth-coloured composite, silver amalgam or glass ionomer. In Dubai, private clinics typically charge AED 250 to 900 per tooth. Most fillings take a single visit of 20 to 60 minutes. It suits small to medium cavities."
  },
  {
    "slug": "dentures",
    "name": "Dentures",
    "shortName": "Dentures",
    "summary": "Dentures are removable replacement teeth: a full denture replaces every tooth in a jaw, a partial fills gaps between natural teeth, and implant-retained dentures clip onto implants. In Dubai, conventional dentures typically cost AED 1,500 to 8,000 each at private clinics, over 4 to 6 visits. They suit people missing several or all teeth."
  },
  {
    "slug": "dental-bridges",
    "name": "Dental Bridges",
    "shortName": "Bridges",
    "summary": "A dental bridge is a fixed replacement for one or more missing teeth, made of a false tooth joined to crowns on the neighbouring teeth or on implants. In Dubai, private clinics typically charge AED 1,200 to 4,000 per unit, so a three-unit bridge is around AED 3,600 to 12,000. It takes 2 to 3 visits."
  },
  {
    "slug": "dental-bonding",
    "name": "Dental Bonding",
    "shortName": "Bonding",
    "summary": "Dental bonding uses tooth-coloured composite resin, shaped by hand and hardened with a light, to repair chips, close small gaps or reshape teeth. In Dubai, private clinics typically charge AED 400 to 1,500 per tooth. Most cases are done in one visit with little or no drilling. It suits minor cosmetic changes."
  },
  {
    "slug": "sedation-dentistry",
    "name": "Sedation Dentistry",
    "shortName": "Sedation",
    "summary": "Sedation dentistry uses medicine to help you relax during treatment: laughing gas (nitrous oxide), oral tablets or intravenous (IV) sedation. In Dubai, private clinics typically charge AED 300 to 4,000 per session on top of the treatment itself. It suits anxious patients, long procedures and people with a strong gag reflex."
  }
];

export const navEmirates: NavEmirate[] = [
  {
    "slug": "dubai",
    "name": "Dubai",
    "nameAr": "دبي"
  },
  {
    "slug": "abu-dhabi",
    "name": "Abu Dhabi",
    "nameAr": "أبوظبي"
  },
  {
    "slug": "sharjah",
    "name": "Sharjah",
    "nameAr": "الشارقة"
  },
  {
    "slug": "ajman",
    "name": "Ajman",
    "nameAr": "عجمان"
  },
  {
    "slug": "ras-al-khaimah",
    "name": "Ras Al Khaimah",
    "nameAr": "رأس الخيمة"
  },
  {
    "slug": "fujairah",
    "name": "Fujairah",
    "nameAr": "الفجيرة"
  },
  {
    "slug": "umm-al-quwain",
    "name": "Umm Al Quwain",
    "nameAr": "أم القيوين"
  }
];

export const navDubaiAreas: NavArea[] = [
  {
    "slug": "dubai-marina",
    "name": "Dubai Marina",
    "group": "Marina & JBR"
  },
  {
    "slug": "jumeirah-beach-residence",
    "name": "JBR (Jumeirah Beach Residence)",
    "group": "Marina & JBR"
  },
  {
    "slug": "jlt",
    "name": "Jumeirah Lake Towers (JLT)",
    "group": "Marina & JBR"
  },
  {
    "slug": "palm-jumeirah",
    "name": "Palm Jumeirah",
    "group": "Jumeirah coast"
  },
  {
    "slug": "downtown-dubai",
    "name": "Downtown Dubai",
    "group": "Downtown & central"
  },
  {
    "slug": "business-bay",
    "name": "Business Bay",
    "group": "Downtown & central"
  },
  {
    "slug": "difc",
    "name": "DIFC",
    "group": "Downtown & central"
  },
  {
    "slug": "jumeirah",
    "name": "Jumeirah",
    "group": "Jumeirah coast"
  },
  {
    "slug": "umm-suqeim",
    "name": "Umm Suqeim",
    "group": "Jumeirah coast"
  },
  {
    "slug": "al-barsha",
    "name": "Al Barsha",
    "group": "Inland communities"
  },
  {
    "slug": "al-quoz",
    "name": "Al Quoz",
    "group": "Inland communities"
  },
  {
    "slug": "motor-city",
    "name": "Motor City",
    "group": "Inland communities"
  },
  {
    "slug": "arabian-ranches",
    "name": "Arabian Ranches",
    "group": "Inland communities"
  },
  {
    "slug": "dubai-hills",
    "name": "Dubai Hills",
    "group": "Inland communities"
  },
  {
    "slug": "jvc",
    "name": "Jumeirah Village Circle (JVC)",
    "group": "Inland communities"
  },
  {
    "slug": "dubai-sports-city",
    "name": "Dubai Sports City",
    "group": "Inland communities"
  },
  {
    "slug": "bur-dubai",
    "name": "Bur Dubai",
    "group": "Old Dubai"
  },
  {
    "slug": "karama",
    "name": "Karama",
    "group": "Old Dubai"
  },
  {
    "slug": "oud-metha",
    "name": "Oud Metha",
    "group": "Old Dubai"
  },
  {
    "slug": "healthcare-city",
    "name": "Dubai Healthcare City",
    "group": "Old Dubai"
  },
  {
    "slug": "deira",
    "name": "Deira",
    "group": "East & Deira"
  },
  {
    "slug": "al-qusais",
    "name": "Al Qusais",
    "group": "East & Deira"
  },
  {
    "slug": "al-nahda-dubai",
    "name": "Al Nahda (Dubai)",
    "group": "East & Deira"
  },
  {
    "slug": "mirdif",
    "name": "Mirdif",
    "group": "East & Deira"
  },
  {
    "slug": "al-warqa",
    "name": "Al Warqa",
    "group": "East & Deira"
  },
  {
    "slug": "dubai-silicon-oasis",
    "name": "Dubai Silicon Oasis",
    "group": "East & Deira"
  },
  {
    "slug": "international-city",
    "name": "International City",
    "group": "East & Deira"
  },
  {
    "slug": "al-safa",
    "name": "Al Safa",
    "group": "Jumeirah coast"
  },
  {
    "slug": "dubai-investment-park",
    "name": "Dubai Investment Park",
    "group": "Inland communities"
  },
  {
    "slug": "discovery-gardens",
    "name": "Discovery Gardens",
    "group": "Inland communities"
  },
  {
    "slug": "jvt",
    "name": "Jumeirah Village Triangle (JVT)",
    "group": "Inland communities"
  },
  {
    "slug": "al-mamzar",
    "name": "Al Mamzar",
    "group": "East & Deira"
  },
  {
    "slug": "al-rashidiya",
    "name": "Al Rashidiya",
    "group": "East & Deira"
  },
  {
    "slug": "dubai-festival-city",
    "name": "Dubai Festival City",
    "group": "East & Deira"
  }
];

export const NAV_AREA_GROUPS: string[] = [
  "Marina & JBR",
  "Downtown & central",
  "Jumeirah coast",
  "Old Dubai",
  "Inland communities",
  "East & Deira"
];

export const navVisitReasons: { slug: string; label: string }[] = [
  {
    "slug": "toothache",
    "label": "Toothache"
  },
  {
    "slug": "broken-tooth",
    "label": "Chipped or broken tooth"
  },
  {
    "slug": "swelling",
    "label": "Swollen face or gum"
  },
  {
    "slug": "checkup-and-cleaning",
    "label": "Check-up and cleaning"
  },
  {
    "slug": "bleeding-gums",
    "label": "Bleeding gums"
  },
  {
    "slug": "missing-tooth",
    "label": "Missing tooth"
  },
  {
    "slug": "crooked-teeth",
    "label": "Crooked or gappy teeth"
  },
  {
    "slug": "stained-teeth",
    "label": "Stained or yellow teeth"
  },
  {
    "slug": "smile-makeover",
    "label": "Smile makeover"
  },
  {
    "slug": "wisdom-tooth-pain",
    "label": "Wisdom tooth pain"
  },
  {
    "slug": "childs-first-visit",
    "label": "Child's first visit"
  },
  {
    "slug": "dental-anxiety",
    "label": "Nervous about the dentist"
  }
];

/** Services with local (emirate) guides */
export const NAV_LOCAL_GUIDE_SERVICES: string[] = [
  "dental-implants",
  "invisalign",
  "braces",
  "veneers",
  "hollywood-smile",
  "teeth-whitening",
  "root-canal",
  "teeth-cleaning",
  "emergency-dentist",
  "pediatric-dentistry",
  "wisdom-tooth-removal",
  "dental-crowns"
];

export const navServiceBySlug = (slug: string) => navServices.find((s) => s.slug === slug);
export const navAreaBySlug = (slug: string) => navDubaiAreas.find((a) => a.slug === slug);
export const navEmirateBySlug = (slug: string) => navEmirates.find((e) => e.slug === slug);

export const navUrls = {
  service: (s: string) => `/services/${s}/`,
  emirate: (e: string) => `/${e}/`,
  serviceEmirate: (e: string, s: string) => `/${e}/services/${s}/`,
  services: '/services/',
  dubaiArea: (a: string) => `/dubai/${a}/`,
  dubaiReason: (r: string) => `/dubai/reasons/${r}/`,
  dubaiReasons: '/dubai/reasons/',
};

const EMIRATE_SLUGS = ['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain', 'dxb', 'auh', 'shj', 'ajm', 'rak', 'fuj', 'uaq'];
const ABBR: Record<string, string> = { dxb: 'dubai', auh: 'abu-dhabi', shj: 'sharjah', ajm: 'ajman', rak: 'ras-al-khaimah', fuj: 'fujairah', uaq: 'umm-al-quwain' };

/** The emirate a URL path belongs to, if any (same rule as `emirateOfPath` in src/content). */
export function navEmirateOfPath(path: string): string | null {
  const segs = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const hit = segs[0] === 'insurance' ? segs[2] : segs[0];
  if (!hit || !EMIRATE_SLUGS.includes(hit)) return null;
  return ABBR[hit] || hit;
}
