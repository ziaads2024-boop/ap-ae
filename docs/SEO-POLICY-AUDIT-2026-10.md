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

## 8. Dubai-first, Zocdoc-style phase (added October 2026)

Evidence used: Search Console export (Feb–Apr 2026, "GMB report/"). Most clicks come from clinic profile pages found by clinic-name and "clinic + reviews" queries (positions 2–10). Area + treatment URLs (e.g. JBR veneers, Mirdif Invisalign) get impressions at positions 11–20 but almost no clicks. Head terms ("dentist dubai", "invisalign dubai") sit at positions 80+.

| Area | What changed |
|---|---|
| Clinic profiles (`/clinic/[slug]/`) | Zocdoc-style layout: licensing body, Google rating, call/WhatsApp/directions, treatments with clinic-listed prices, insurers, dentists, hours, location, photos, labelled reviews, data-only FAQs, sticky appointment request. `Dentist` schema (no ratings). The page JSON no longer includes `clinics.*` (claim emails, owner ids, GMB data). |
| Search (`/find-clinics/`) | Dubai by default; filters for visit reason or treatment, Dubai area, insurance, name and sort; "near me"; request button on every result. |
| Booking | No clinic publishes a calendar yet, so there are no "available" slots anywhere. The new request form asks for a preferred day and part of the day and says the clinic will confirm. The old forms that labelled generated slots as "Available Times" now say "preferred time". |
| Dubai area hubs (`/dubai/[area]/`) | 27 areas keyed to the slugs that already have visibility, with hand-written local notes, live clinic results, per-treatment clinic counts and neighbouring areas. |
| Area + treatment (`/dubai/[area]/[treatment]/`) | Built from real data: number of clinics offering the treatment there and the clinic-listed price range. `noindex` and left out of the sitemap until at least 3 clinics qualify. |
| Visit reasons (`/dubai/reasons/[reason]/`) | 12 symptom-led pages (toothache, swelling, missing tooth...) with urgency, practical steps, what to tell the clinic and likely treatments. |
| Consolidation | 301s: `jbr` → `jumeirah-beach-residence`, `dental-veneers` → `veneers` on Dubai area pages, and treatment slugs used as areas (`/dubai/invisalign/`) → the treatment guide. |
| Sitemaps / llms.txt | Dubai areas and reasons added; area + treatment URLs listed only at ≥3 clinics; alias URLs excluded. |

### Needs a decision

- **Google review text.** Profiles display review text copied from Google into `google_reviews`. Google's Places/Business Profile terms restrict storing and redisplaying that content. Consider showing the rating and count with a link to Google instead of full review text, or switching to reviews collected on AppointPanda after a booked visit (the Zocdoc model).
- **Verified-patient reviews.** Zocdoc only accepts reviews from patients who booked. Once requests are confirmed in the dashboard, send a review link tied to the appointment and label those reviews "Verified visit".
- **Clinic calendars.** Live "next available" slots need clinics to maintain availability in the dashboard. Show slots only for clinics that do; keep the request flow for the rest.
- **Area slugs.** The 27 area slugs come from Search Console URLs. Check them against the `cities` table and add any missing aliases in `src/content/dubai.ts`.
- **Data quality.** On the live homepage every featured clinic showed "Dubai Festival City, Dubai"; check the city/area assignment of those clinics.

## 9. Live-data audit of every page (October 2026)

Checked against the live database, page by page, as a patient and as a clinic.

### Fixed

| Area | Problem found | Fix |
| --- | --- | --- |
| Search | `/search/` crashed (500); `/ai-search/` duplicated it with "0+ clinics · 100% verified" | Both, and `/find-dentist/`, 301 to `/find-clinics/` with filters translated (`src/lib/searchUrl.ts`) |
| Booking | `/book/[clinicId]` (used as the Google Business Profile booking link) showed a calendar with invented slots | Forwards to the clinic profile request form (`#request`) |
| Booking | Requests to unclaimed clinics reached nobody; patients were told "the clinic will contact you" | Marked `is_assigned=false` for the admin queue (now in the dashboard); patients are told the AppointPanda team will contact the clinic; routing to another clinic needs an opt-in |
| Booking | Reschedule offered half-hour slots | Preferred day and time of day |
| Profiles | Dentist page meta said "100+ verified reviews, 4.9+ stars, DHA-licensed" for everyone | New dentist profile built from listed facts, `Person` schema, thin profiles noindex |
| Profiles | All clinic photos broken: the old image project no longer exists (NXDOMAIN) | Dead and AI-image hosts dropped (`src/lib/liveImage.ts`); placeholders shown |
| Reviews | Review link sent happy patients to Google and unhappy ones to private feedback (review gating) | Every patient chooses Google or private feedback; dashboard copy updated |
| Trust | Page headers showed "4.8 ★ · 1,286 clinics · 200k+ patients"; "verified", "top-rated", "6,600+", "vetted" claims across metadata | Removed; header rebuilt in the block style |
| Trust | Editorial and medical review policies claimed review by named, licensed UAE dentists | Policies state the guides are written by the editorial team and not yet clinically reviewed |
| Trust | Verification policy promised priority ranking; fee not disclosed | Fee disclosed; verification does not affect ranking |
| Contact | Form saved nothing; "24/7 emergency hotline" and placeholder phone numbers | Form writes to `contact_submissions` (admin tab added); emergency guidance points to clinics and 998 |
| Insurance | 40 insurer pages indexed with 0 clinics and "verified quality / no upfront payment" claims | Hand-written insurance guide; insurer pages noindex until 3+ clinics confirm the plan |
| Blog | AI-generated images, duplicate Article schema, "Dental Health Expert" author label, lowercase H1s | Fixed; posts link to their treatment guide |
| Content | 24 database-only treatment pages with generated text and fake stats | Noindex and out of the sitemap until they have a hand-written guide; `smile-makeover` 301s to Hollywood smile |
| Tools | Cost calculator claimed "real prices from verified dentists"; insurance checker was a US template (PPO/HMO, states); compare pages were broken templates | Calculator uses the guide ranges; the others redirect |
| FAQ / clinic pages | Contradictory prices and insurance answers; JCI filter, calendar sync, API, "thousands of patients", "50% off, limited time" | Rewritten to match the guides and the product |
| Build | ~4 h of worker time prerendering every clinic and legacy city page; queries up to 30 s | Prerender guides, Dubai areas and the top 300 clinics; the rest on demand |

### Needs a decision or access

1. **Apply `SUPABASE_SECURITY_FIX.sql` and `20261021000400_public_page_indexes.sql`** in the Supabase SQL editor, then rotate the service role, anon, Google Places and Resend keys.
2. **Clinic photos**: re-import photos to the current project's storage (the old project is gone), or leave placeholders.
3. **Treatments and insurance per clinic** (`clinic_treatments`, `clinic_insurances` are empty): collect from clinics (claim flow) or a verified source. Area + treatment pages and insurer pages become indexable automatically at 3+ clinics.
4. **Clinical review**: to make health pages stronger for E-E-A-T, have a DHA-licensed dentist review the guides; the policies explain how reviewed pages will be labelled.
5. **Contact details**: confirm a real support phone number and office address before adding them back; confirm `hello@appointpanda.ae` receives mail.
6. **Blog**: the 37 posts are largely generated text; review them against the guides (prices differ) or noindex the weakest.
7. **Pricing page**: plan names and prices are unchanged; confirm the AED 499 / 1,499 plans and features are what you sell.
8. **Edge functions** need deploying (`send-booking-email` etc.) for any server-side changes; there is no Supabase CLI here.
