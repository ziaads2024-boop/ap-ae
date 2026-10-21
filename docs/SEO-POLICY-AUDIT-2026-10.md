# AppointPanda: SEO and Google policy audit (October 2026)

Scope: homepage, header and footer, treatment (service) pages, emirate (location) pages, service + emirate pages, the clinic search, supporting pages, and technical files (robots.txt, sitemaps, llms.txt, schema). The live site (www.appointpanda.ae) was reviewed alongside the code on branch `claude/seo-redesign`.

Status key: **Fixed** = changed on this branch. **Decision** = needs an owner's call or information I do not have.

## 1. Google policy issues (highest risk)

These matter more than any ranking tweak. Google's spam policies (misleading content, fake reviews, scaled content) and its guidance for health ("Your Money or Your Life") topics apply to the whole site, not just one page.

| # | Issue | Where | Status |
|---|---|---|---|
| P1 | "As featured in Gulf News, The National, Khaleej Times, Time Out Dubai, Arabian Business" with no evidence of coverage | Homepage | **Fixed**: removed |
| P2 | Six patient testimonials with invented names ("Sarah M.", "Dr. Amira") shown as real | Homepage, `/reviews` | **Fixed**: removed; `/reviews` 301 → `/find-clinics/` |
| P3 | Unverifiable stats: "200,000+ patients", "500+ clinic partners", "+38 bookings/month", "4.8★ average partner rating", "we surveyed 87 clinics", "47,900+ verified reviews" | Homepage, navbar, footer, About, For clinics, blog teaser | **Fixed**: removed. Homepage stats now appear only when the database supplies real numbers (no hard-coded fallbacks such as 1,301 clinics / 5,671 reviews) |
| P4 | "24/7 Dental Emergency hotline: 800-APANDA" in the header and on `/emergency` | Navbar, emergency page, homepage FAQ | **Fixed** in header, FAQ and emergency page (301 → `/services/emergency-dentist/`). **Decision**: the number still appears on `/contact`. If it is not a staffed line, remove it there too |
| P5 | Invented clinics ("Pearl Dental Studio", "Skyline Orthodontics", "Elite Oral Care"…) with invented ratings, reviews and prices from `src/lib/site-data.ts`, shown as real listings | `/find-clinics/`, `/specialties/*`, `/for-clinics` testimonial | **Fixed**: `/find-clinics/` now lists real clinics from the directory; `/specialties/*` 301 → matching treatment guides; fake testimonial removed. `site-data.ts` still contains the placeholder arrays; delete them once nothing imports them |
| P6 | Claims the site cannot back: "Every clinic verified against UAE regulatory databases", "Prices posted directly by clinics and updated monthly", "Starred prices guaranteed", "Insurance auto-verified at checkout" | Homepage FAQ, About, how-it-works copy | **Fixed** on homepage and About. **Decision**: review `/how-it-works/`, `/faq/`, `/pricing/` and `/verification-policy/` against what the product actually does |
| P7 | "DHA-licensed dentists" used for every emirate. DHA licenses Dubai only; Abu Dhabi is DoH; Sharjah and the Northern Emirates are MOHAP | Old emirate and service-location title templates, old emergency page | **Fixed** for the new emirate and service + emirate guides, which name the correct regulator |
| P8 | `AggregateRating` in ItemList JSON-LD for third-party clinics on emirate and city pages (Google does not show review snippets for lists of other businesses and treats this markup as misleading) | `pages/[stateSlug]/index.tsx`, `pages/[stateSlug]/[citySlug]/index.tsx` | **Fixed**: removed from both |
| P9 | Newsletter signup that never sent anything | Footer | **Fixed**: removed |

## 2. Content quality (helpful content, E-E-A-T, scaled content)

| # | Finding | Status |
|---|---|---|
| C1 | Service, emirate and service + location pages depended on `seo_pages` / `page_content` database rows. With the DB unreachable they rendered almost empty; in production many were thin or templated | **Fixed**: 12 treatment guides, 7 emirate guides and 56 service + emirate guides are now hand-written in `src/content/` and render without the database |
| C2 | Service + location pages risked looking like doorway pages (same text, place name swapped) | **Fixed**: each of the 56 local guides has its own local notes and FAQs, plus emirate-specific licensing and insurance guidance. Treatments with no local guide yet temporarily redirect to the national guide instead of rendering a thin page |
| C3 | No visible authorship, review date or medical disclaimer | **Fixed**: every guide shows "Written by the AppointPanda editorial team · Last reviewed October 2026", links to the editorial policy, and ends with a medical information notice. **Decision**: Google rewards named, qualified medical reviewers. Add a real UAE-licensed dentist as reviewer (name, licence, photo) only once one actually reviews the content. Do not invent one |
| C4 | Prices shown as facts | **Fixed**: shown as indicative ranges with "not a quote" wording next to each figure |
| C5 | Duplicate and cannibalising pages: `/specialties/*` vs `/services/*`, `/emergency` and `/emergency-dentist` vs the emergency guide | **Fixed**: 301 redirects consolidate them (`next.config.js`) |
| C6 | City-level service pages (`/[emirate]/[city]/[service]/`) and city pages still come from database content | **Decision**: audit these next; noindex any without unique content, and add them to the local-guide programme gradually |

## 3. Technical SEO

| # | Finding | Status |
|---|---|---|
| T1 | `robots.txt` disallowed `/_next/static/` and `/_next/data/`, which blocks the CSS and JS Google needs to render pages | **Fixed**: removed; one `User-agent: *` group, private routes disallowed, sitemap index declared |
| T2 | All XML sitemaps were generated from the database at build; with it unreachable, only 22 static URLs were listed (including redirecting pages) | **Fixed**: new `sitemap-guides.xml` (77 URLs) is generated from `src/content` on every build; redirected URLs removed from the static sitemap; guide URLs de-duplicated from the DB sitemaps |
| T3 | `Permissions-Policy: geolocation=()` site-wide blocked browser location, so "near me" could never work | **Fixed**: `geolocation=(self)` in `vercel.json` |
| T4 | Homepage search sent `?emirate=&specialty=` to `/find-clinics/`, which ignored them | **Fixed**: search reads the parameters, adds treatment filter, name search and distance sorting |
| T5 | Live 404s: `/dubai/services/dental-implants/` returned Vercel `DEPLOYMENT_NOT_FOUND` | **Decision**: check the Vercel project and domain alias after deploying this branch |
| T6 | Organization and WebSite schema only on the homepage, duplicated across two files | **Fixed**: single source in `src/content/schema.ts`; guides add `MedicalWebPage` (with `lastReviewed`), `MedicalProcedure`, `BreadcrumbList`, `FAQPage` and clinic `ItemList` (names and URLs only) |
| T7 | `llms.txt` / `llms-full.txt` contained unverifiable claims ("premier directory", "1,170+ verified clinics", "all clinics DHA/MOHAP regulated") | **Fixed**: both are now generated from the guide content at build time |
| T8 | Visible breadcrumbs missing on most templates | **Fixed** on all new guide pages, matching the `BreadcrumbList` schema |
| T9 | `next lint` is deprecated in Next 16 | **Decision**: migrate to the ESLint CLI before upgrading |

## 4. Internal linking structure

Hub and spoke, built from the same content files so links never point at missing pages:

- **Homepage** → all 7 emirates, all 12 treatments, 6 featured local guides, search.
- **Treatment guide** (`/services/x/`) → its 7 emirate versions, 3 related treatments, alternatives, search pre-filtered.
- **Emirate guide** (`/dubai/`) → every local treatment guide for that emirate, the national guides for the rest, city/area pages (live), neighbouring emirates.
- **Service + emirate guide** (`/dubai/services/x/`) → the national treatment guide, other treatments in the same emirate, the same treatment in other emirates, the emirate hub.
- **Header mega-menus and footer** link every treatment, every emirate and popular local guides; the HTML sitemap (`/sitemap/`) lists every guide.

## 5. AI search readiness (GEO)

- Each guide opens with a one-paragraph, self-contained answer (the "quick answer") that assistants can quote.
- Facts are in labelled blocks (cost, time, recovery, licensing) and FAQs are real HTML, not hidden in scripts.
- `llms.txt` and `llms-full.txt` mirror the page content; AI crawlers are allowed in `robots.txt`.
- Dates (`lastReviewed`) are machine-readable on every guide.

## 6. Design changes (from the reference video)

Taken from the reference: oversized condensed headlines, pastel colour blocks (lemon, sky, blush, lime, sand) on a warm off-white base, a floating pill navigation with mega-menus, label chips, numbered steps, and a dark footer with an oversized wordmark. Not copied: the inflated 3D artwork (replaced by simple CSS shapes), the product's layout and copy.

## 7. What to do next

1. Rotate the leaked Supabase service-role key (from the earlier review) before deploying.
2. Decide on the phone number on `/contact` and review `/how-it-works/`, `/faq/`, `/pricing/` and `/verification-policy/` for claims the product does not support (P4, P6).
3. Audit city and city + service pages (C6).
4. Recruit a named, licensed dental reviewer for the guides (C3).
5. After deploying, submit `https://www.appointpanda.ae/sitemap.xml` in Search Console and request indexing for the 7 emirate guides and 12 treatment guides.
6. When you update any guide, change `CONTENT_REVIEWED` in `src/content/index.ts` so the date on the page and in the sitemap stays honest.
