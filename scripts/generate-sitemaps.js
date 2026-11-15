const fs = require('fs/promises');
const path = require('path');
const { loadEnvConfig } = require('@next/env');
const { createClient } = require('@supabase/supabase-js');

const BASE_URL = 'https://www.appointpanda.ae';
// SITEMAP_OUT_DIR lets you inspect the output without touching public/ (dry run).
const PUBLIC_DIR = process.env.SITEMAP_OUT_DIR || path.join(process.cwd(), 'public');
const SITEMAP_FILES = [
  'sitemap.xml',
  'sitemap-static.xml',
  'sitemap-guides.xml',
  'sitemap-states.xml',
  'sitemap-cities.xml',
  'sitemap-services.xml',
  'sitemap-service-locations.xml',
  'sitemap-profiles.xml',
  'sitemap-posts.xml',
  'sitemap-insurance.xml',
];

// Hand-written guide content (src/content) is TypeScript; jiti loads it so the
// sitemap always lists every guide, even when the database is unreachable.
function loadContent() {
  const jiti = require('jiti')(__filename);
  const content = jiti(path.join(process.cwd(), 'src/content/index.ts'));
  const images = jiti(path.join(process.cwd(), 'src/content/images.ts'));
  const dubai = jiti(path.join(process.cwd(), 'src/content/dubai.ts'));
  return { ...content, images, dubai };
}

function imageEntry(img) {
  return { loc: `${BASE_URL}${img.src}`, title: img.caption };
}

// `areaCounts` (dental clinics per Dubai area, from live data) leaves thin areas
// out, matching their noindex tag. When it is null (no database) every area is listed.
// Pages whose content is mostly live listings (emirate hubs, areas) carry no
// lastmod: we cannot tell when their data last changed, and a fixed date would be false.
function buildGuideUrls(content, areaCounts = null) {
  const lastmod = content.CONTENT_REVIEWED;
  const urls = [
    { loc: normalizeUrl(content.urls.services), lastmod, priority: 0.9, changefreq: 'monthly' },
    { loc: normalizeUrl(content.urls.emirates), lastmod, priority: 0.9, changefreq: 'monthly' },
  ];
  const { imageForService, imageForEmirate } = content.images;
  for (const service of content.services) {
    urls.push({ loc: normalizeUrl(content.urls.service(service.slug)), lastmod, priority: 0.9, changefreq: 'monthly', images: [imageEntry(imageForService(service.slug))] });
  }
  for (const emirate of content.emirates) {
    urls.push({ loc: normalizeUrl(content.urls.emirate(emirate.slug)), priority: 0.9, changefreq: 'monthly', images: [imageEntry(imageForEmirate(emirate.slug))] });
    for (const service of content.services) {
      if (content.hasLocalGuide(service.slug, emirate.slug)) {
        urls.push({
          loc: normalizeUrl(content.urls.serviceEmirate(emirate.slug, service.slug)), lastmod, priority: 0.8, changefreq: 'monthly',
          images: [imageEntry(imageForEmirate(emirate.slug)), imageEntry(imageForService(service.slug))],
        });
      }
    }
  }
  // Dubai area hubs and visit-reason pages
  for (const area of content.dubai.dubaiAreas) {
    if (areaCounts && (areaCounts[area.slug] || 0) < content.dubai.MIN_AREA_CLINICS_TO_INDEX) continue;
    urls.push({ loc: normalizeUrl(content.urls.dubaiArea(area.slug)), priority: 0.85, changefreq: 'weekly' });
  }
  urls.push({ loc: normalizeUrl(content.urls.dubaiReasons), lastmod, priority: 0.7, changefreq: 'monthly' });
  for (const reason of content.dubai.visitReasons) {
    urls.push({ loc: normalizeUrl(content.urls.dubaiReason(reason.slug)), lastmod, priority: 0.7, changefreq: 'monthly' });
  }
  return urls;
}

// llms.txt (https://llmstxt.org) and llms-full.txt are generated from the same
// content as the pages, so AI assistants see exactly what visitors see.
function buildLlmsTxt(content) {
  const abs = (p) => `${BASE_URL}${p}`;
  const lines = [
    '# AppointPanda',
    '',
    '> Find a dentist in Dubai: a directory of Dubai dental clinics with online appointment requests, plus independent guides to dental treatment in the UAE. Other emirates are coming soon. Guide prices are indicative AED ranges, not quotes. Clinic ratings come from Google and are shown as reported.',
    '',
    `Content last reviewed: ${content.CONTENT_REVIEWED}. Editorial policy: ${abs('/editorial-policy/')}`,
    '',
    '## Dubai (primary market)',
    `- [Dentists in Dubai](${abs(content.urls.emirate('dubai'))}): licensing (DHA, or the Dubai Healthcare City Authority inside Healthcare City), insurance and areas.`,
    `- [Find a dentist in Dubai](${abs('/find-clinics/')}): search by area, reason for visit, treatment or insurance; patients request an appointment and the clinic confirms the time.`,
    ...content.dubai.dubaiAreas.map((a) => `- [Dentists in ${a.name}](${abs(content.urls.dubaiArea(a.slug))}): ${a.summary}`),
    '',
    '## Reasons for a dental visit (Dubai)',
    ...content.dubai.visitReasons.map((r) => `- [${r.label}](${abs(content.urls.dubaiReason(r.slug))}): ${r.advice}`),
    '',
    '## Treatment guides',
    ...content.services.map((s) => `- [${s.name}](${abs(content.urls.service(s.slug))}): ${s.summary}`),
    '',
    '## Dentists by emirate',
    ...content.emirates.filter((e) => content.isLiveEmirate(e.slug)).map((e) => `- [Dentists in ${e.name}](${abs(content.urls.emirate(e.slug))}): ${e.summary} Licensing: ${e.regulator.name} (${e.regulator.short}).`),
    `- Coming soon (not live yet; information only, no appointment requests): ${content.emirates.filter((e) => !content.isLiveEmirate(e.slug)).map((e) => e.name).join(', ')}.`,
    '',
    '## Local treatment guides',
  ];
  for (const e of content.emirates.filter((x) => content.isLiveEmirate(x.slug))) {
    for (const s of content.services) {
      if (content.hasLocalGuide(s.slug, e.slug)) {
        lines.push(`- [${s.name} in ${e.name}](${abs(content.urls.serviceEmirate(e.slug, s.slug))})`);
      }
    }
  }
  lines.push(
    '',
    '## Tools',
    `- [Find a dentist](${abs('/find-clinics/')}): search clinics by emirate, treatment or location (add ?near=me to sort by distance).`,
    `- [Dental cost calculator](${abs('/tools/dental-cost-calculator/')}): typical AED ranges for common treatments, multiplied by number of teeth where relevant.`,
    `- [Dental insurance guide](${abs('/insurance/')}): how dental cover usually works on UAE health insurance (annual limits, direct billing, pre-approval, cosmetic exclusions).`,
    `- [FAQ](${abs('/faq/')}): licensing, costs, insurance, emergencies and how appointment requests work.`,
    '',
    '## Optional',
    `- [Full guide text](${abs('/llms-full.txt')})`,
    `- [About AppointPanda](${abs('/about/')})`,
    `- [How listings are checked](${abs('/verification-policy/')}): listed, claimed and verified labels; verification does not affect ranking.`,
    `- [Editorial policy](${abs('/editorial-policy/')}): guides are written by the AppointPanda editorial team and are not yet clinically reviewed by a named dentist.`,
    ''
  );
  return lines.join('\n');
}

function buildLlmsFullTxt(content) {
  const out = [
    '# AppointPanda: full guide text',
    '',
    `Source: ${BASE_URL}. Last reviewed ${content.CONTENT_REVIEWED}. General information only; not a diagnosis or a quote. In a UAE emergency call 998.`,
    '',
  ];
  for (const s of content.services) {
    out.push(`## ${s.name}`, `URL: ${BASE_URL}${content.urls.service(s.slug)}`, '', s.summary, '', ...s.intro.flatMap((p) => [p, '']));
    out.push(`Indicative UAE cost: ${content.formatAed(s.price.from)} to ${content.formatAed(s.price.to)} ${s.price.unit}. ${s.price.note}`);
    out.push(`Treatment time: ${s.duration}`, `Recovery: ${s.recovery}`, '');
    out.push('Steps:', ...s.steps.map((st, i) => `${i + 1}. ${st.title}: ${st.detail}`), '');
    out.push('Risks:', ...s.risks.map((r) => `- ${r}`), '');
    out.push('FAQ:', ...s.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]), '');
  }
  for (const e of content.emirates.filter((x) => content.isLiveEmirate(x.slug))) {
    out.push(`## Dentists in ${e.name}`, `URL: ${BASE_URL}${content.urls.emirate(e.slug)}`, '', e.summary, '', ...e.intro.flatMap((p) => [p, '']));
    out.push(`Licensing: ${e.regulator.name} (${e.regulator.short}). ${e.regulator.note}`, '');
    out.push('Insurance:', ...e.insurance.map((i) => `- ${i}`), '');
    out.push('FAQ:', ...e.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]), '');
  }
  for (const local of content.serviceEmirates.filter((x) => content.isLiveEmirate(x.emirate))) {
    const s = content.serviceBySlug(local.service);
    const e = content.emirateBySlug(local.emirate);
    if (!s || !e) continue;
    out.push(`## ${s.name} in ${e.name}`, `URL: ${BASE_URL}${content.urls.serviceEmirate(e.slug, s.slug)}`, '', ...local.localNote.flatMap((p) => [p, '']));
    out.push(`Insurance: ${content.insuranceNote(s, e)}`, '');
    out.push('FAQ:', ...local.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]), '');
  }
  return out.join('\n');
}

function hasPlaceholderValue(value) {
  return typeof value === 'string' && (
    value.includes('your-project-ref')
    || value.includes('your-public-anon-key')
    || value.includes('your-service-role-key')
  );
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeUrl(routePath) {
  let cleanPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
  cleanPath = cleanPath.replace(/\/+/g, '/');

  if (cleanPath !== '/' && !cleanPath.endsWith('/')) {
    cleanPath = `${cleanPath}/`;
  }

  return `${BASE_URL}${cleanPath}`;
}

function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}${(url.images || []).map((img) => `
    <image:image><image:loc>${escapeXml(img.loc)}</image:loc></image:image>`).join('')}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// Lists only the sub-sitemaps that contain URLs (`counts`: filename -> URL count).
function generateSitemapIndexXml(counts = null) {
  const today = new Date().toISOString().split('T')[0];
  const sitemapEntries = SITEMAP_FILES.filter((name) => name !== 'sitemap.xml' && (!counts || (counts[name] || 0) > 0));

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((name) => `  <sitemap>
    <loc>${BASE_URL}/${name}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

async function fetchAll(supabase, table, select, filters = {}) {
  const rows = [];
  let offset = 0;
  const limit = 1000;

  while (true) {
    let query = supabase.from(table).select(select).range(offset, offset + limit - 1);

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`Failed to fetch ${table}: ${error.message}`);
    }

    if (!data || data.length === 0) {
      break;
    }

    rows.push(...data);

    if (data.length < limit) {
      break;
    }

    offset += limit;
  }

  return rows;
}

function buildStaticUrls() {
  return [
    { loc: normalizeUrl('/'), priority: 1.0, changefreq: 'daily' },
    { loc: normalizeUrl('/insurance'), priority: 0.8, changefreq: 'weekly' },
    { loc: normalizeUrl('/blog'), priority: 0.8, changefreq: 'daily' },
    { loc: normalizeUrl('/tools/dental-cost-calculator'), priority: 0.6, changefreq: 'monthly' },
    { loc: normalizeUrl('/for-clinics'), priority: 0.7, changefreq: 'weekly' },
    { loc: normalizeUrl('/about'), priority: 0.5, changefreq: 'monthly' },
    { loc: normalizeUrl('/contact'), priority: 0.5, changefreq: 'monthly' },
    { loc: normalizeUrl('/faq'), priority: 0.6, changefreq: 'monthly' },
    { loc: normalizeUrl('/how-it-works'), priority: 0.6, changefreq: 'monthly' },
    { loc: normalizeUrl('/pricing'), priority: 0.6, changefreq: 'monthly' },
    { loc: normalizeUrl('/sitemap'), priority: 0.4, changefreq: 'weekly' },
    { loc: normalizeUrl('/image-credits'), priority: 0.2, changefreq: 'yearly' },
    { loc: normalizeUrl('/terms'), priority: 0.3, changefreq: 'yearly' },
    { loc: normalizeUrl('/privacy'), priority: 0.3, changefreq: 'yearly' },
    { loc: normalizeUrl('/verification-policy'), priority: 0.3, changefreq: 'yearly' },
    { loc: normalizeUrl('/medical-review-policy'), priority: 0.3, changefreq: 'yearly' },
    { loc: normalizeUrl('/editorial-policy'), priority: 0.3, changefreq: 'yearly' },
  ];
}

async function buildStateUrls(supabase) {
  const states = await fetchAll(supabase, 'states', 'slug, updated_at', { is_active: true });
  return states
    .filter((state) => state.slug)
    .map((state) => ({
      loc: normalizeUrl(`/${state.slug}`),
      lastmod: state.updated_at?.split('T')[0],
      priority: 0.9,
      changefreq: 'weekly',
    }));
}

async function buildCityUrls(supabase, content) {
  const [states, cities] = await Promise.all([
    fetchAll(supabase, 'states', 'id, slug', { is_active: true }),
    fetchAll(supabase, 'cities', 'id, slug, state_id, updated_at', { is_active: true }),
  ]);
  const stateSlugMap = new Map(states.map((state) => [state.id, state.slug]));

  return cities
    .filter((city) => city.slug && stateSlugMap.get(city.state_id))
    // Dubai areas are guide pages: listed (or deliberately left out) in sitemap-guides.xml
    .filter((city) => !(stateSlugMap.get(city.state_id) === 'dubai' && content.dubai.dubaiAreaBySlug(city.slug)))
    .filter((city) => !content.serviceBySlug(content.canonicalTreatment(city.slug)))
    .map((city) => ({
      loc: normalizeUrl(`/${stateSlugMap.get(city.state_id)}/${city.slug}`),
      lastmod: city.updated_at?.split('T')[0],
      priority: 0.85,
      changefreq: 'weekly',
    }));
}

// Treatment guides are in sitemap-guides.xml. Treatments that only have a
// database page are noindex (src/pages/ServicePage.tsx), so none are listed here
// until they get a hand-written guide.
async function buildServiceUrls(supabase, content) {
  const treatments = await fetchAll(supabase, 'treatments', 'slug, updated_at', { is_active: true });
  return treatments
    .filter((treatment) => treatment.slug && !content.isRenamedTreatment(treatment.slug) && content.serviceBySlug(treatment.slug))
    .map((treatment) => ({
      loc: normalizeUrl(`/services/${treatment.slug}`),
      lastmod: treatment.updated_at?.split('T')[0],
      priority: 0.8,
      changefreq: 'weekly',
    }));
}

// Live figures shared by several sitemaps, fetched once.
let hoursPromise = null;
const fetchHours = (supabase) => (hoursPromise ||= fetchAll(supabase, 'clinic_hours', 'clinic_id, is_closed, open_time'));
const loadQuality = () => require('jiti')(__filename)(path.join(process.cwd(), 'src/lib/clinicQuality.ts'));

// Dental clinics per Dubai area, with the same filter as src/lib/dubaiData.ts
// (isDentalListing): not a pharmacy/lab/salon by name and not flagged
// is_likely_dental = false.
let dubaiAreaPromise = null;
function fetchDubaiAreas(supabase, content) {
  dubaiAreaPromise ||= (async () => {
    const quality = loadQuality();
    const [states, cities, clinics] = await Promise.all([
      fetchAll(supabase, 'states', 'id, slug'),
      fetchAll(supabase, 'cities', 'id, slug, state_id'),
      fetchAll(supabase, 'clinics', 'id, name, slug, city_id, is_likely_dental', { is_active: true }),
    ]);
    const dubai = states.find((st) => st.slug === 'dubai');
    const areaOfCity = new Map();
    for (const c of cities) {
      const area = dubai && c.state_id === dubai.id ? content.dubai.dubaiAreaBySlug(c.slug) : null;
      if (area) areaOfCity.set(c.id, area.slug);
    }
    const counts = Object.fromEntries(content.dubai.dubaiAreas.map((a) => [a.slug, 0]));
    const clinicArea = new Map();
    for (const c of clinics) {
      const area = areaOfCity.get(c.city_id);
      if (!area || !c.slug || quality.isNonDental(c.name) || c.is_likely_dental === false) continue;
      counts[area] += 1;
      clinicArea.set(c.id, area);
    }
    return { counts, clinicArea };
  })();
  return dubaiAreaPromise;
}

// Area + treatment pages: the same rule as the page's robots tag
// (isAreaServiceIndexable in src/content/dubai.ts, data from fetchAreaServiceData).
// Only Dubai guide pages can be indexable; other combinations redirect or are noindex.
async function buildServiceLocationUrls(supabase, content) {
  const [{ counts, clinicArea }, links, hours] = await Promise.all([
    fetchDubaiAreas(supabase, content),
    fetchAll(supabase, 'clinic_treatments', 'clinic_id, price_from, treatment:treatments(slug)'),
    fetchHours(supabase),
  ]);
  const withHours = new Set(hours.filter((h) => !h.is_closed && h.open_time).map((h) => h.clinic_id));
  const combos = new Map();
  for (const l of links) {
    const area = clinicArea.get(l.clinic_id);
    const guide = l.treatment?.slug && content.guideSlugForDb(l.treatment.slug);
    if (!area || !guide || !content.serviceBySlug(guide)) continue;
    const key = `${area}/${guide}`;
    if (!combos.has(key)) combos.set(key, { area, guide, clinics: new Set(), priced: new Set() });
    const combo = combos.get(key);
    combo.clinics.add(l.clinic_id);
    if (Number(l.price_from) > 0) combo.priced.add(l.clinic_id);
  }
  const urls = [];
  for (const { area, guide, clinics, priced } of combos.values()) {
    if (content.dubai.dubaiAreaBySlug(area)?.mixedAssignments) continue;
    const hoursListed = [...clinics].filter((id) => withHours.has(id)).length;
    const uniqueBlocks = (priced.size >= 2 ? 1 : 0) + (hoursListed >= 3 ? 1 : 0);
    if (!content.dubai.isAreaServiceIndexable({ areaClinics: counts[area] || 0, treatmentClinics: clinics.size, uniqueBlocks })) continue;
    urls.push({ loc: normalizeUrl(content.urls.dubaiAreaService(area, guide)), priority: 0.7, changefreq: 'weekly' });
  }
  return urls;
}

// Same rule as the page's robots tag (clinicIndexable in src/lib/clinicQuality.ts):
// only dental listings with a valid phone, opening hours and 5+ Google reviews
// (or a claimed profile) are listed.
// Clinics in emirates that are not live yet are noindex (ClinicProfile.tsx), so
// only clinics whose city is in a live emirate are listed.
async function buildProfileUrls(supabase, content) {
  const quality = loadQuality();
  const [clinics, hours, states, cities] = await Promise.all([
    fetchAll(supabase, 'clinics', 'id, slug, name, phone, review_count, claim_status, updated_at, city_id', {
      is_active: true,
      is_duplicate: false,
    }),
    fetchHours(supabase),
    fetchAll(supabase, 'states', 'id, slug'),
    fetchAll(supabase, 'cities', 'id, state_id'),
  ]);
  const withHours = new Set(hours.filter((h) => !h.is_closed && h.open_time).map((h) => h.clinic_id));
  const stateSlug = new Map(states.map((st) => [st.id, st.slug]));
  const emirateOfCity = new Map(cities.map((c) => [c.id, stateSlug.get(c.state_id)]));
  const inLiveEmirate = (clinic) => content.INDEX_COMING_SOON || content.isLiveEmirate(emirateOfCity.get(clinic.city_id));

  return clinics
    .filter((clinic) => clinic.slug && inLiveEmirate(clinic) && quality.clinicIndexable({
      name: clinic.name,
      slug: clinic.slug,
      phone: clinic.phone,
      hasHours: withHours.has(clinic.id),
      reviewCount: clinic.review_count,
      claimed: clinic.claim_status === 'claimed',
    }))
    .map((clinic) => ({
      loc: normalizeUrl(`/clinic/${clinic.slug}`),
      lastmod: clinic.updated_at?.split('T')[0],
      priority: 0.9,
      changefreq: 'weekly',
    }));
}

// Posts listed in src/lib/retiredPosts.json 301 elsewhere (next.config.js).
async function buildPostUrls(supabase) {
  const retired = require(path.join(process.cwd(), 'src/lib/retiredPosts.json'));
  const posts = await fetchAll(supabase, 'blog_posts', 'slug, updated_at, created_at', { status: 'published' });
  return posts
    .filter((post) => post.slug && !Object.prototype.hasOwnProperty.call(retired, post.slug))
    .map((post) => ({
      loc: normalizeUrl(`/blog/${post.slug}`),
      lastmod: (post.updated_at || post.created_at)?.split('T')[0],
      priority: 0.7,
      changefreq: 'monthly',
    }));
}

// Insurer pages are indexable only once enough clinics have confirmed the plan
// (MIN_CLINICS_FOR_INSURER_INDEX in src/lib/insuranceData.ts).
async function buildInsuranceUrls(supabase) {
  const [insurances, links] = await Promise.all([
    fetchAll(supabase, 'insurances', 'id, slug, updated_at', { is_active: true }),
    fetchAll(supabase, 'clinic_insurances', 'insurance_id, clinic_id'),
  ]);
  const counts = new Map();
  for (const l of links) {
    if (!counts.has(l.insurance_id)) counts.set(l.insurance_id, new Set());
    counts.get(l.insurance_id).add(l.clinic_id);
  }
  return insurances
    .filter((insurance) => insurance.slug && (counts.get(insurance.id)?.size || 0) >= 3)
    .map((insurance) => ({
      loc: normalizeUrl(`/insurance/${insurance.slug}`),
      lastmod: insurance.updated_at?.split('T')[0],
      priority: 0.7,
      changefreq: 'monthly',
    }));
}

function createSupabaseClient() {
  loadEnvConfig(process.cwd());

  const url = process.env.NEXT_SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_SUPABASE_ANON_KEY || process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;
  const key = adminKey || anonKey;

  if (!url || !key || hasPlaceholderValue(url) || hasPlaceholderValue(key)) {
    return null;
  }

  if (!adminKey) {
    console.warn('[generate-sitemaps] SUPABASE_SERVICE_ROLE_KEY missing, falling back to anon key.');
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function writeSitemap(filename, xml) {
  await fs.writeFile(path.join(PUBLIC_DIR, filename), `${xml}\n`, 'utf8');
}

async function writeAll(listsByFile) {
  const counts = {};
  const files = {};
  for (const [filename, list] of Object.entries(listsByFile)) {
    counts[filename] = list.length;
    files[filename] = generateSitemapXml(list);
  }
  // Empty sub-sitemaps are still written (old references keep working) but left out of the index.
  files['sitemap.xml'] = generateSitemapIndexXml(counts);
  await Promise.all(Object.entries(files).map(([filename, xml]) => writeSitemap(filename, xml)));
  return counts;
}

async function main() {
  const supabase = createSupabaseClient();
  const content = loadContent();
  // Emirates that are not live yet are kept out of sitemaps (LIVE_EMIRATES).
  const live = (url) => content.INDEX_COMING_SOON || !content.isComingSoonPath(new URL(url.loc).pathname);
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms.txt'), buildLlmsTxt(content), 'utf8');
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), buildLlmsFullTxt(content), 'utf8');

  if (!supabase) {
    await writeAll({
      'sitemap-static.xml': buildStaticUrls().filter(live),
      'sitemap-guides.xml': buildGuideUrls(content).filter(live),
      'sitemap-states.xml': [],
      'sitemap-cities.xml': [],
      'sitemap-services.xml': [],
      'sitemap-service-locations.xml': [],
      'sitemap-profiles.xml': [],
      'sitemap-posts.xml': [],
      'sitemap-insurance.xml': [],
    });
    console.warn('[generate-sitemaps] Supabase env is unavailable during build. Generated static-only sitemaps.');
    return;
  }

  let areaCounts = null;
  let stateUrls = [];
  let cityUrls = [];
  let serviceUrls = [];
  let serviceLocationUrls = [];
  let profileUrls = [];
  let postUrls = [];
  let insuranceUrls = [];

  try {
    let areas;
    [areas, stateUrls, cityUrls, serviceUrls, serviceLocationUrls, profileUrls, postUrls, insuranceUrls] = await Promise.all([
      fetchDubaiAreas(supabase, content),
      buildStateUrls(supabase),
      buildCityUrls(supabase, content),
      buildServiceUrls(supabase, content),
      buildServiceLocationUrls(supabase, content),
      buildProfileUrls(supabase, content),
      buildPostUrls(supabase),
      buildInsuranceUrls(supabase),
    ]);
    areaCounts = areas.counts;
  } catch (error) {
    console.warn('[generate-sitemaps] Dynamic sitemap generation failed, falling back to static-only output:', error);
  }

  const guideUrls = buildGuideUrls(content, areaCounts);
  const guideLocs = new Set(guideUrls.map((url) => url.loc));
  const notAGuide = (url) => !guideLocs.has(url.loc);
  if (areaCounts) {
    const thin = content.dubai.dubaiAreas.filter((a) => (areaCounts[a.slug] || 0) < content.dubai.MIN_AREA_CLINICS_TO_INDEX);
    console.log(`[generate-sitemaps] Dubai areas left out (fewer than ${content.dubai.MIN_AREA_CLINICS_TO_INDEX} dental clinics): ${thin.map((a) => `${a.slug} (${areaCounts[a.slug] || 0})`).join(', ') || 'none'}`);
  }

  const counts = await writeAll({
    'sitemap-static.xml': buildStaticUrls().filter(live),
    'sitemap-guides.xml': guideUrls.filter(live),
    'sitemap-states.xml': stateUrls.filter(notAGuide).filter(live),
    'sitemap-cities.xml': cityUrls.filter(notAGuide).filter(live),
    'sitemap-services.xml': serviceUrls.filter(notAGuide).filter(live),
    'sitemap-service-locations.xml': serviceLocationUrls.filter(live),
    'sitemap-profiles.xml': profileUrls.filter(live),
    'sitemap-posts.xml': postUrls.filter(live),
    'sitemap-insurance.xml': insuranceUrls.filter(live),
  });

  console.log(`[generate-sitemaps] Generated sitemaps: ${Object.entries(counts).map(([f, n]) => `${f} ${n}`).join(', ')}.`);
}

main().catch((error) => {
  console.error('[generate-sitemaps] Failed to generate sitemaps:', error);
  process.exit(1);
});
