import type { ServiceEmirateContent } from './types';

// One hand-written entry per service + emirate guide. Each says something
// specific about getting that treatment in that emirate, so the pages are not
// interchangeable templates with the place name swapped.

// Dubai is the live market, so its local guides carry the most local detail:
// regulation (DHA / DHCC), insurance norms, where clinics cluster, and an
// indicative price table. Prices match the national guides' cost tables.

const DHA = { label: 'Dubai Health Authority (DHA)', url: 'https://www.dha.gov.ae/' };
const DHCC = { label: 'Dubai Healthcare City Authority', url: 'https://www.dhcc.ae/' };

const DUBAI_LICENSING =
  'Dentists and dental clinics in most of Dubai are licensed by the Dubai Health Authority (DHA). Clinics inside the Dubai Healthcare City free zone in Oud Metha are licensed by the Dubai Healthcare City Authority instead. Both regulators publish a way to look up a professional\'s licence, and the record shows whether the dentist is licensed as a general dentist or in a specialty.';

const dubaiGuides: ServiceEmirateContent[] = [
  // ---------------------------------------------------------------- implants
  {
    service: 'dental-implants', emirate: 'dubai',
    metaTitle: 'Dental Implant Clinics in Dubai: Prices, DHA & Areas',
    metaDescription: 'Dental implants in Dubai: indicative AED prices per tooth, what a quote should include, DHA licensing, insurance and where implant clinics cluster.',
    answer:
      'At private clinics in Dubai, a single dental implant with its abutment and crown usually costs AED 5,000 to 12,000 per tooth, with bone grafting or a CBCT scan charged on top. Treatment takes 3 to 9 months over 4 to 6 visits and suits adults with healthy gums who are missing one or more teeth.',
    localNote: [
      'Implant quotes in Dubai are often hard to compare because clinics bundle different things. Before comparing prices, ask each clinic to list the implant brand, the abutment, the crown material, the CBCT scan, any temporary tooth and the review visits. A low headline price sometimes covers the implant post only.',
      'Implant treatment runs over several months, so choose a clinic you can reach easily from home or work for every visit. If you may leave Dubai during treatment, ask for the implant brand, size and connection type in writing so another dentist can work on it later.',
      'Implants are placed by general dentists with implant training as well as by oral surgeons, periodontists and prosthodontists. For bone grafts, sinus lifts or full-arch treatment, ask who places the implant and who makes the teeth, because in some clinics these are two different people. Payment in instalments across the treatment stages is commonly offered; ask for the total in writing.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Oral surgery, periodontics and prosthodontics are separate specialist licence categories. If a clinic describes the person placing your implant as a specialist, you can check that title on the regulator\'s register before you book.',
    ],
    insurance: [
      'Health insurance is mandatory for Dubai residents, but the basic plan generally excludes routine dental treatment, and implants are among the treatments most often excluded even on plans that have a dental benefit.',
      'Where an employer plan does pay towards implants, it is usually capped by an annual dental limit and needs pre-approval. Ask the clinic to send the treatment plan to your insurer and get the answer in writing before the implant is placed.',
    ],
    costNote: 'Implant prices in Dubai tend to vary more with the implant brand and what is bundled than with the area. Clinics in Karama, Bur Dubai and Deira often quote lower than those in Downtown, Jumeirah or the Marina, so compare itemised quotes rather than headline prices.',
    areas: [
      { slug: 'healthcare-city', note: 'Specialist dental centres in the free zone, worth considering for complex cases such as grafting or full-arch work.' },
      { slug: 'downtown-dubai', note: 'Clinics offering implant and cosmetic treatment close to offices and a Red Line station.' },
      { slug: 'jumeirah', note: 'Villa-based practices with easier parking for the several visits that implant treatment needs.' },
      { slug: 'al-barsha', note: 'Family clinics and medical centres near the metro, convenient for residents of the inland communities.' },
      { slug: 'karama', note: 'Long-established clinics that often quote competitive prices; compare what each quote includes.' },
      { slug: 'dubai-marina', note: 'Clinics in residential towers with evening slots, useful for people living in the Marina, JBR and JLT.' },
    ],
    faqs: [
      { q: 'How much is a dental implant in Dubai?', a: 'A single implant with abutment and crown usually costs AED 5,000 to 12,000 at private clinics. A CBCT scan (AED 300 to 1,000) and bone grafting (AED 1,500 to 5,000 per site) are often extra. These are indicative ranges; ask for an itemised written quote.' },
      { q: 'Do Dubai clinics offer All-on-4 or full-arch implants?', a: 'Yes, some clinics offer fixed full-arch treatment, with indicative prices of AED 25,000 to 65,000 per arch. Ask about the surgeon\'s full-arch experience and get the temporary and final teeth priced separately in the quote.' },
      { q: 'Can I start implants in Dubai and finish abroad?', a: 'It is possible but not ideal. Components differ between implant systems, so finishing with the same clinic, or at least the same system, avoids compatibility problems. Ask for your implant records in writing.' },
      { q: 'Is the CBCT scan included in an implant consultation in Dubai?', a: 'It depends on the clinic. Some include the scan in the consultation fee, others charge it separately or send you to an imaging centre. Ask when you book.' },
    ],
    sources: [DHA, DHCC, { label: 'American Dental Association (MouthHealthy): Dental implants', url: 'https://www.mouthhealthy.org/all-topics-a-z/implants' }],
  },

  // --------------------------------------------------------------- invisalign
  {
    service: 'invisalign', emirate: 'dubai',
    metaTitle: 'Invisalign Providers in Dubai: Prices by Package & Area',
    metaDescription: 'Invisalign in Dubai: indicative AED prices for short, moderate and comprehensive courses, retainers, who plans your case, insurance and where to look.',
    answer:
      'In Dubai, Invisalign usually costs AED 6,000 to 12,000 for a short course fixing minor crowding and AED 14,000 to 25,000 for comprehensive treatment at private clinics. Most adult cases take 6 to 18 months, with reviews every 6 to 10 weeks. It suits adults and teens with mild to moderate crowding or spacing.',
    localNote: [
      'Invisalign and other clear aligners are offered in Dubai by specialist orthodontists and by general dentists. Ask who will plan your case and whether they adjust the digital plan themselves or accept the manufacturer\'s automated set-up as it comes.',
      'Quotes differ mainly in what they leave out. Check whether refinement trays, attachments, retainers and review visits are included, and how many trays the plan allows before extra charges apply. Monthly instalment plans are common; ask for the total figure in writing.',
      'Reviews are every 6 to 10 weeks for a year or more, so a clinic near home or work is easier to keep up with. If you travel often, ask whether the clinic can give you several sets of trays at once or check progress from photos between visits.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Orthodontics is a separate specialist licence category. A general dentist can provide aligners, but if a clinic calls the treating dentist an orthodontist you can confirm the licence category on the regulator\'s register.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally excludes dental treatment beyond emergencies, and adult orthodontics, including aligners, is rarely covered by any plan.',
      'Some family plans include an orthodontic benefit for children with age limits and a cap. If you have one, ask the clinic to request pre-approval before treatment starts.',
    ],
    costNote: 'The brand, the length of the course and whether an orthodontist plans the case move the price more than the neighbourhood. Other aligner brands are often priced below Invisalign; compare the number of trays and what happens if you need more.',
    areas: [
      { slug: 'business-bay', note: 'Office-friendly hours make it easier to fit regular aligner reviews around work.' },
      { slug: 'downtown-dubai', note: 'Clinics near the Burj Khalifa and Dubai Mall metro station, convenient for people working in the centre.' },
      { slug: 'jlt', note: 'Clinics in the tower podiums suit residents and office workers who prefer early or lunchtime appointments.' },
      { slug: 'al-barsha', note: 'Family clinics near the metro, useful when both parents and teenagers need orthodontic reviews.' },
      { slug: 'dubai-hills', note: 'Clinics in the community\'s town centres for families in Dubai Hills and nearby areas.' },
      { slug: 'mirdif', note: 'Community clinics on the eastern side of the city, closer for residents of Mirdif and Al Rashidiya.' },
    ],
    faqs: [
      { q: 'How much is Invisalign in Dubai?', a: 'Indicative private-clinic prices are AED 6,000 to 12,000 for a short course, AED 10,000 to 16,000 for moderate cases and AED 14,000 to 25,000 for comprehensive treatment. Retainers add AED 800 to 2,500 if they are not included.' },
      { q: 'Is Invisalign cheaper in Dubai than in the UK?', a: 'Prices overlap. Some Dubai quotes are lower and some higher than typical UK private prices, and the difference depends more on the length of the course and what is included than on the country. Compare itemised quotes.' },
      { q: 'Do Dubai clinics offer aligner brands other than Invisalign?', a: 'Yes. Several clinics offer other clear aligner systems, sometimes at lower cost. How carefully the clinician plans and monitors the case matters more than the brand.' },
      { q: 'Can I pay for aligners in instalments in Dubai?', a: 'Instalment plans spread over the treatment period are commonly offered, and some card providers offer instalments too. Ask for the total cost in writing before signing.' },
      { q: 'How many hours a day do I need to wear aligners?', a: 'Align Technology advises 20 to 22 hours a day. Take them out only to eat, drink anything other than water, and clean your teeth.' },
    ],
    sources: [DHA, DHCC, { label: 'Invisalign (Align Technology)', url: 'https://www.invisalign.com/' }],
  },

  // ------------------------------------------------------------------ braces
  {
    service: 'braces', emirate: 'dubai',
    metaTitle: 'Braces in Dubai: Orthodontist Prices, Insurance & Areas',
    metaDescription: 'Braces in Dubai: indicative AED prices for metal, ceramic and lingual braces, retainers, orthodontist licensing, insurance for children and where to look.',
    answer:
      'At private clinics in Dubai, metal braces usually cost AED 6,000 to 12,000, ceramic or self-ligating braces AED 9,000 to 16,000 and lingual braces AED 18,000 to 35,000 for a full course. Treatment takes 12 to 24 months with adjustments every 4 to 8 weeks. Braces suit children, teens and adults with crowding or bite problems.',
    localNote: [
      'Specialist orthodontists and general dentists both fit braces in Dubai. For a child, an orthodontist\'s assessment helps decide whether to start early or wait until more adult teeth have come through, and a second opinion before a long course is reasonable.',
      'Adjustment visits are every 4 to 8 weeks for one to two years, often after school. Ask how easy it is to get late-afternoon slots and what happens if a bracket breaks between visits, including whether repair visits are charged.',
      'Quotes vary in what they cover. Check whether the price includes records (X-rays, photos and scans), all adjustment visits, emergency repairs and retainers, and whether payment can be spread over the course.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Orthodontics is a specialist licence category. If you want a specialist orthodontist, check the licence category on the DHA or Dubai Healthcare City register before your first visit.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally excludes orthodontic treatment, and adult braces are rarely covered by any plan.',
      'Some employer family plans include an orthodontic benefit for children, usually with an age limit, a cap and pre-approval. Ask the clinic to submit the treatment plan to your insurer before the braces are fitted.',
    ],
    costNote: 'The type of bracket and the length of treatment drive the price. Clinics in older areas such as Karama and Deira often quote lower than central and coastal areas; check that retainers and repairs are in every quote you compare.',
    areas: [
      { slug: 'al-barsha', note: 'Family clinics near the metro and schools, convenient for regular after-school adjustments.' },
      { slug: 'mirdif', note: 'Community clinics for families on the eastern side of the city.' },
      { slug: 'arabian-ranches', note: 'Clinics in the local town centre save families in the villa communities a long drive for each adjustment.' },
      { slug: 'jvc', note: 'Clinics close to home for families in Jumeirah Village Circle and the nearby communities.' },
      { slug: 'karama', note: 'Established clinics that often quote competitive prices, with Green Line metro access.' },
      { slug: 'healthcare-city', note: 'Specialist centres in the free zone for complex bites that may need an orthodontist working with a surgeon.' },
    ],
    faqs: [
      { q: 'How much do braces cost in Dubai?', a: 'Indicative private-clinic prices for a full course are AED 6,000 to 12,000 for metal braces, AED 9,000 to 16,000 for ceramic or self-ligating braces and AED 18,000 to 35,000 for lingual braces. Retainers may add AED 800 to 2,500.' },
      { q: 'Do I need a DHA-licensed orthodontist for braces?', a: 'Any dentist treating you in Dubai must hold a DHA licence, or a Dubai Healthcare City licence inside the free zone. Orthodontist is a separate specialist category. General dentists can fit braces, but for children and complex bites a specialist orthodontist is often the safer choice.' },
      { q: 'Are ceramic braces popular in Dubai?', a: 'Adults often choose ceramic or lingual braces because they are less visible. Both cost more than metal braces, and ceramic brackets can stain with frequent coffee or tea.' },
      { q: 'What happens if a bracket breaks?', a: 'Call the clinic. Most repairs are quick and can wait for your next convenient slot unless a wire is causing pain. Ask whether repair visits are included in your quote.' },
    ],
    sources: [DHA, DHCC, { label: 'NHS: Braces and orthodontics', url: 'https://www.nhs.uk/tests-and-treatments/braces/' }],
  },

  // ----------------------------------------------------------------- veneers
  {
    service: 'veneers', emirate: 'dubai',
    metaTitle: 'Veneers in Dubai: Clinic Prices per Tooth & Where to Go',
    metaDescription: 'Veneers in Dubai: indicative AED prices per tooth for composite, porcelain and E.max, what a quote includes, insurance and where cosmetic clinics cluster.',
    answer:
      'In Dubai, veneers usually cost AED 800 to 2,000 per tooth for composite and AED 2,000 to 5,000 per tooth for porcelain or E.max at private clinics, so six porcelain veneers come to roughly AED 12,000 to 30,000. Porcelain needs 2 to 3 visits over 1 to 3 weeks. Veneers suit chipped, worn or discoloured front teeth.',
    localNote: [
      'Veneer prices in Dubai vary widely, and a low headline price is often for composite rather than porcelain, or leaves out the mock-up, temporaries or the lab fee. Ask each clinic to state the material, the number of teeth and what is included per tooth.',
      'Ask to see the dentist\'s own before-and-after cases, ideally of patients with a similar starting point, and look at the proposed shade in daylight. Approve a mock-up before any enamel is removed, and take time to decide between the consultation and the preparation visit.',
      'Visitors sometimes plan veneers during a short stay. Porcelain veneers need two or three visits over one to three weeks, and the bite is often checked again a week or two after bonding, so plan to be in Dubai for the whole course or choose composite.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Prosthodontics is a specialist licence category for dentists who focus on crowns, veneers and replacing teeth. A general dentist can place veneers; if a clinic calls the dentist a specialist, check the licence category on the regulator\'s register.',
    ],
    insurance: [
      'Veneers are treated as cosmetic, so health insurance in Dubai generally does not pay for them, whether you are on the basic mandatory plan or an employer plan with a dental benefit.',
      'If a veneer or crown is needed to repair a broken tooth rather than for appearance, some dental benefits may consider part of the cost with pre-approval. Ask the clinic to submit the case and check your policy wording.',
    ],
    costNote: 'Material and the lab used drive the price. Clinics in Jumeirah, Downtown and the Marina tend to quote towards the higher end, while some clinics in Karama, Bur Dubai and Deira quote lower; compare the same material and number of teeth.',
    areas: [
      { slug: 'jumeirah', note: 'Villa-based cosmetic practices with easier parking for the two or three visits porcelain veneers need.' },
      { slug: 'jumeirah-beach-residence', note: 'Cosmetic treatment is popular here; compare written quotes and ask for a mock-up.' },
      { slug: 'downtown-dubai', note: 'Cosmetic and general clinics close to offices and the Red Line.' },
      { slug: 'dubai-marina', note: 'Clinics in the residential towers with evening slots for people living nearby.' },
      { slug: 'bur-dubai', note: 'Long-established clinics where quotes are often lower; check the material and lab.' },
      { slug: 'healthcare-city', note: 'Specialist centres in the free zone, including prosthodontists for complex cases.' },
    ],
    faqs: [
      { q: 'How much are veneers in Dubai?', a: 'Indicative private-clinic prices are AED 800 to 2,000 per tooth for composite, AED 2,000 to 4,500 for porcelain and AED 2,000 to 5,000 for E.max. Six porcelain or E.max veneers usually come to AED 12,000 to 30,000.' },
      { q: 'Why do veneer prices in Dubai vary so much?', a: 'Material, the lab, the dentist\'s experience and whether a mock-up and temporaries are included all change the price. Compare quotes for the same material and number of teeth.' },
      { q: 'Can I get veneers in one day in Dubai?', a: 'Composite veneers can be done in one visit. Porcelain veneers made by a lab usually take one to three weeks, unless the clinic mills them on site.' },
      { q: 'Is it cheaper to get veneers in Turkey than in Dubai?', a: 'Headline prices abroad can be lower, but follow-up is harder if a veneer chips or debonds, and a short trip limits time for a mock-up and adjustments. Consider the cost of repairs and return trips as well as the first quote.' },
    ],
    sources: [DHA, DHCC, { label: 'American Dental Association (MouthHealthy): Veneers', url: 'https://www.mouthhealthy.org/all-topics-a-z/veneers' }],
  },

  // ----------------------------------------------------------- hollywood smile
  {
    service: 'hollywood-smile', emirate: 'dubai',
    metaTitle: 'Hollywood Smile Dubai: Price Guide, Clinics & Areas',
    metaDescription: 'Hollywood smile in Dubai: indicative AED prices by material and number of teeth, how to plan it, insurance and where cosmetic dentists cluster in the city.',
    answer:
      'A Hollywood smile in Dubai usually costs AED 20,000 to 50,000 for porcelain or E.max veneers on 10 upper teeth and AED 32,000 to 100,000 for 16 to 20 teeth at private clinics. Composite versions start around AED 12,000. Treatment takes 2 to 4 weeks after planning, over 3 to 5 visits, and suits several worn or discoloured teeth.',
    localNote: [
      'In Dubai the term "Hollywood smile" covers anything from composite bonding on a few front teeth to porcelain veneers or crowns on 20 teeth, so two quotes with the same name can describe very different treatments. Ask each clinic for the number of teeth, the material and the price per tooth.',
      'Ask whether whitening, gum contouring or a short course of aligners would let you treat fewer teeth, and why each tooth in the plan is included. Approve a mock-up of the shape and shade before any enamel is removed, and look at the shade in daylight.',
      'If you are visiting Dubai for treatment, allow for the full course: the design and mock-up visit, preparation, two or three weeks of temporaries while the lab works, and a bite check after bonding. Ask what happens, and who pays, if a veneer chips after you leave.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Cosmetic dental treatment, including veneers and crowns, must be carried out by a licensed dentist in a licensed facility. If a clinic describes the treating dentist as a prosthodontist or cosmetic specialist, check the licence category on the regulator\'s register.',
    ],
    insurance: [
      'A Hollywood smile is cosmetic, so health insurance in Dubai generally does not pay for it, on the basic plan or on employer plans with a dental benefit.',
      'Treatment of decay or gum disease needed before the makeover may be covered under a dental benefit. Ask the clinic to separate that work in the quote so you can claim it.',
    ],
    costNote: 'The number of teeth and the material decide most of the price, so a 10-tooth porcelain plan and a 20-tooth plan can differ by tens of thousands of dirhams. Clinics in Jumeirah, Downtown and the Marina tend to quote higher than those in Karama or Deira; compare like for like.',
    areas: [
      { slug: 'jumeirah', note: 'Cosmetic practices along the coast with parking for the several visits a makeover needs.' },
      { slug: 'umm-suqeim', note: 'Villa-based clinics close to the beach communities.' },
      { slug: 'downtown-dubai', note: 'Clinics offering cosmetic dentistry close to offices and the Red Line.' },
      { slug: 'jumeirah-beach-residence', note: 'Clinics used to seeing visitors; ask for the self-pay price and the guarantee in writing.' },
      { slug: 'healthcare-city', note: 'Specialist centres in the free zone, including prosthodontists for large or complex makeovers.' },
      { slug: 'deira', note: 'Established clinics where quotes are often lower; confirm the material and lab.' },
    ],
    faqs: [
      { q: 'How much does a Hollywood smile cost in Dubai?', a: 'Indicative private-clinic prices are AED 12,000 to 40,000 for composite on 16 to 20 teeth, AED 20,000 to 50,000 for porcelain or E.max on 10 upper teeth, and AED 32,000 to 100,000 for porcelain or E.max on 16 to 20 teeth.' },
      { q: 'How many teeth does a Hollywood smile cover?', a: 'It depends on how wide your smile is. Many people show 8 to 10 upper teeth when they smile, so treating those may be enough. Plans with 16 to 20 teeth include lower teeth as well. Ask why each tooth is included.' },
      { q: 'How long do I need to stay in Dubai for a Hollywood smile?', a: 'For porcelain or E.max, plan on two to four weeks once the design is agreed, with three to five visits. Composite can often be finished in one or two long visits.' },
      { q: 'Is a Hollywood smile with crowns different from veneers?', a: 'Crowns cover the whole tooth and need more of it removed; veneers cover the front. Crowns may suit heavily filled or broken teeth, while veneers keep more natural tooth. Ask why the clinic recommends one over the other for each tooth.' },
    ],
    sources: [DHA, DHCC, { label: 'American Dental Association (MouthHealthy): Veneers', url: 'https://www.mouthhealthy.org/all-topics-a-z/veneers' }],
  },

  // -------------------------------------------------------------- whitening
  {
    service: 'teeth-whitening', emirate: 'dubai',
    metaTitle: 'Teeth Whitening Dubai: Clinic Prices & Where to Go',
    metaDescription: 'Teeth whitening in Dubai: indicative AED prices for in-clinic sessions and take-home trays, what to check before booking, insurance and where to look.',
    answer:
      'Professional teeth whitening in Dubai usually costs AED 700 to 1,800 for custom take-home trays and AED 1,200 to 3,000 for an in-clinic session at private clinics, or AED 1,800 to 4,000 for both. An in-clinic session takes 60 to 90 minutes; trays take 1 to 2 weeks. It suits healthy teeth yellowed by age, coffee or tea.',
    localNote: [
      'Whitening offers in Dubai are often sold by the name of the system, such as "laser" or a branded lamp. The light matters less than the peroxide gel and how carefully the gums are protected. Ask which gel and concentration the clinic uses and whether custom trays for top-ups are included.',
      'A check-up and a scale and polish should come before whitening, so decay and tartar are dealt with first. Offers that skip the examination are cheaper, but whitening over untreated decay or exposed roots can be painful. Ask whether the cleaning is in the price.',
      'Clinics near offices in Downtown and Business Bay can often fit an in-clinic session into a long lunch break or an evening. If you have crowns, veneers or fillings on front teeth, ask how they will match afterwards, because they do not whiten.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Professional whitening with clinical-strength gel should be done or supervised by a licensed dentist. If a salon or spa offers whitening, ask who carries it out and whether a dentist examines your teeth first.',
    ],
    insurance: [
      'Whitening is cosmetic, so health insurance in Dubai generally does not cover it.',
      'The check-up and scale and polish you should have first may be covered if your employer plan includes a dental benefit; the basic mandatory plan generally does not include them. Ask the clinic to bill the cleaning separately.',
    ],
    costNote: 'In-clinic systems cost more than take-home trays, and combined packages cost most. Clinics in Karama, Bur Dubai and Deira often price whitening lower than central and coastal areas; check whether the cleaning and trays are included before comparing.',
    areas: [
      { slug: 'downtown-dubai', note: 'Clinics close to offices that can fit a session around the working day.' },
      { slug: 'business-bay', note: 'Office-friendly hours, useful for a lunchtime or after-work session.' },
      { slug: 'difc', note: 'Clinics serving people who work in the financial centre, close to the Red Line.' },
      { slug: 'dubai-marina', note: 'Evening slots in the residential towers for people living in the Marina and JBR.' },
      { slug: 'al-barsha', note: 'Family clinics near the metro and Mall of the Emirates.' },
      { slug: 'karama', note: 'Established clinics where whitening is often priced lower.' },
    ],
    faqs: [
      { q: 'How much is teeth whitening in Dubai?', a: 'Indicative private-clinic prices are AED 700 to 1,800 for take-home trays, AED 1,200 to 3,000 for an in-clinic session and AED 1,800 to 4,000 for both. A scale and polish beforehand costs AED 250 to 800 if not included.' },
      { q: 'Is laser teeth whitening in Dubai better?', a: 'The light or "laser" used in some systems is mainly there to speed the gel up. The result depends mostly on the peroxide gel, the time it is applied and your starting shade. Ask the clinic what results to expect for your teeth.' },
      { q: 'How long does an in-clinic whitening session take?', a: 'Usually 60 to 90 minutes, including protecting the gums. You may be asked to avoid strongly coloured food and drink for about 48 hours afterwards.' },
      { q: 'Is whitening from a salon safe?', a: 'Professional-strength whitening should follow a dental examination. Salon treatments may skip that check. If you have decay, gum problems or sensitive teeth, see a licensed dentist first.' },
    ],
    sources: [DHA, DHCC, { label: 'NHS: Teeth whitening', url: 'https://www.nhs.uk/tests-and-treatments/teeth-whitening/' }],
  },

  // ----------------------------------------------------------- root canal
  {
    service: 'root-canal', emirate: 'dubai',
    metaTitle: 'Root Canal Dubai: Endodontists, Prices & Insurance',
    metaDescription: 'Root canal treatment in Dubai: indicative AED prices from front teeth to molars, retreatment, the crown afterwards, endodontists and what insurance pays.',
    answer:
      'Root canal treatment in Dubai usually costs AED 1,000 to 2,500 for a front tooth and AED 1,800 to 4,500 for a molar at private clinics, with the crown afterwards (AED 1,500 to 4,500) charged separately. It takes 1 to 2 visits of 60 to 90 minutes and suits a painful or infected tooth that can still be saved.',
    localNote: [
      'In Dubai, root canals are done by general dentists and by specialist endodontists. A general dentist routinely treats front teeth and straightforward premolars. For molars, curved canals or a tooth that has had a root canal before, ask whether the clinic has an endodontist who works with a microscope.',
      'Ask for the price of the root canal and the crown together, because back teeth usually need a crown within a few weeks to stop them cracking. Some quotes also leave out the X-rays and the temporary filling between visits.',
      'If you are in pain, say so when you call. Clinics can usually relieve pain on the day and book the full treatment afterwards, which also gives time for insurance pre-approval.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Endodontics is a specialist licence category. If a clinic refers you to an endodontist, you can check that title on the DHA or Dubai Healthcare City register.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally covers only emergency dental care, such as relieving pain or treating an infection, rather than a full root canal.',
      'Employer plans with a dental benefit often treat root canals as basic restorative care, with a co-payment and an annual limit. The crown may be covered at a different rate or need separate approval, so ask the clinic to request pre-approval for both.',
    ],
    costNote: 'The tooth (front, premolar or molar) and whether a specialist treats it decide most of the price. Clinics in Karama, Bur Dubai and Deira often quote lower than coastal areas; compare quotes that include X-rays and say whether the crown is extra.',
    areas: [
      { slug: 'healthcare-city', note: 'Specialist centres in the free zone, useful for molars and retreatments.' },
      { slug: 'karama', note: 'Established clinics on the Green Line that often quote competitive prices.' },
      { slug: 'al-barsha', note: 'Family clinics near the metro for residents of the inland communities.' },
      { slug: 'business-bay', note: 'Office-friendly hours for treatment that may need two visits.' },
      { slug: 'deira', note: 'Long-established clinics close to the Red and Green Lines.' },
      { slug: 'dubai-silicon-oasis', note: 'Community clinics for residents on the eastern side of the city.' },
    ],
    faqs: [
      { q: 'How much is a root canal in Dubai?', a: 'Indicative private-clinic prices are AED 1,000 to 2,500 for a front tooth, AED 1,300 to 3,000 for a premolar, AED 1,800 to 4,500 for a molar and AED 2,500 to 6,000 for retreatment. The crown is usually extra.' },
      { q: 'Should I see an endodontist in Dubai?', a: 'For molars, retreatments or complex canals, an endodontist is a good choice. Simple front-tooth root canals are routinely done by general dentists.' },
      { q: 'Does insurance in Dubai cover root canals?', a: 'Employer plans with a dental benefit often do, with a co-payment and an annual limit. The basic mandatory plan generally covers only emergency pain relief. Ask the clinic to request pre-approval for the root canal and the crown.' },
      { q: 'Can a root canal be done in one visit?', a: 'Often, yes, if there is no significant infection. Otherwise it may take two visits, with medicine placed in the tooth in between.' },
    ],
    sources: [DHA, DHCC, { label: 'NHS: Root canal treatment', url: 'https://www.nhs.uk/tests-and-treatments/root-canal-treatment/' }],
  },

  // ----------------------------------------------------------- cleaning
  {
    service: 'teeth-cleaning', emirate: 'dubai',
    metaTitle: 'Teeth Cleaning Dubai: Hygienist Prices & Insurance',
    metaDescription: 'Teeth cleaning in Dubai: indicative AED prices for scale and polish, AirFlow and deep cleaning, check-up packages, insurance cover and where to book.',
    answer:
      'A scale and polish in Dubai usually costs AED 250 to 800 at private clinics, or AED 350 to 1,000 bundled with a check-up and X-rays. AirFlow cleaning costs AED 400 to 1,000 and deep cleaning AED 200 to 750 per quadrant. A visit takes 30 to 60 minutes and most adults benefit from one every six months.',
    localNote: [
      'Cleaning is often the first visit with a new clinic in Dubai, so it is a practical way to try a clinic before you need larger treatment. Ask whether the price includes the dentist\'s examination and X-rays or covers the hygienist\'s cleaning only.',
      'Some clinics sell AirFlow or "guided biofilm therapy" as a premium clean. It uses a powder and water spray to remove stain and plaque and can feel gentler, but a standard scale and polish removes tartar too. Ask which one the clinic recommends for you and why.',
      'If your gums bleed or the hygienist finds deep pockets, you may be offered deep cleaning, charged per quadrant over more than one visit. Ask for the gum measurements and a written plan before agreeing.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Dental hygienists are licensed health professionals too, and periodontics, the treatment of gum disease, is a specialist licence category. For advanced gum disease, ask whether a periodontist will be involved.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally excludes routine dental care, including check-ups and cleaning.',
      'Employer plans with a dental benefit often include one or two cleanings a year as preventive care, usually with a co-payment. Check whether your plan has a network list and choose an in-network clinic so it can bill the insurer directly.',
    ],
    costNote: 'Prices depend mostly on what is bundled: examination, X-rays and polishing. Clinics in Karama, Deira, Al Qusais and Bur Dubai often price check-up packages lower than central and coastal areas; compare what each package includes.',
    areas: [
      { slug: 'jlt', note: 'Clinics in the tower podiums for early-morning or lunchtime cleaning near work.' },
      { slug: 'business-bay', note: 'Office-friendly hours for a routine visit during the working day.' },
      { slug: 'al-barsha', note: 'Family clinics near the metro where parents and children can book together.' },
      { slug: 'karama', note: 'Established clinics where check-up packages are often priced lower.' },
      { slug: 'al-qusais', note: 'Community clinics in the north-east of the city near the Green Line.' },
      { slug: 'dubai-hills', note: 'Clinics in local town centres for families in the newer communities.' },
    ],
    faqs: [
      { q: 'How much is teeth cleaning in Dubai?', a: 'Indicative private-clinic prices are AED 250 to 800 for a scale and polish, AED 400 to 1,000 for AirFlow, AED 350 to 1,000 for a check-up with cleaning and X-rays, and AED 200 to 750 per quadrant for deep cleaning.' },
      { q: 'Does insurance in Dubai cover a scale and polish?', a: 'Employer plans with a dental benefit often cover one or two cleanings a year. The basic mandatory plan generally does not. Ask the clinic to check your cover before the visit.' },
      { q: 'Is AirFlow better than a normal cleaning?', a: 'AirFlow removes stain and soft plaque well, and some people find it more comfortable. Hard tartar may still need an ultrasonic scaler. Both are acceptable ways to clean teeth; ask what your gums need.' },
      { q: 'How often should I get my teeth cleaned?', a: 'Every six months suits most people. Your dentist may suggest every three to four months if you have gum disease or build tartar quickly, or a longer gap if your gums are healthy.' },
    ],
    sources: [DHA, DHCC, { label: 'NHS: Gum disease', url: 'https://www.nhs.uk/conditions/gum-disease/' }],
  },

  // ----------------------------------------------------------- emergency
  {
    service: 'emergency-dentist', emirate: 'dubai',
    metaTitle: 'Emergency Dentist Dubai: Same-Day & Late Clinics',
    metaDescription: 'Emergency dentist in Dubai: what to do first, indicative AED costs, when to go to hospital or call 998, insurance for urgent care and areas to search.',
    answer:
      'An emergency dental visit in Dubai usually costs AED 200 to 800 for the consultation and X-ray at a private clinic, with treatment such as draining an abscess (AED 300 to 1,500) charged on top. Most visits take 30 to 90 minutes on the same day. It is for severe pain, swelling, a broken or knocked-out tooth.',
    localNote: [
      'Phone before you travel. Describe the problem, ask whether a dentist can see you today and ask the consultation fee, including any out-of-hours surcharge. Opening hours vary between clinics, and some open late in the evening or at weekends, so use the clinic\'s own phone line to confirm.',
      'Dubai traffic at peak hours can add half an hour to a journey across the city, so the nearest clinic that can see you is usually the better choice than a preferred clinic further away. Bring your Emirates ID, insurance card and a list of any medicines you take.',
      'For a knocked-out adult tooth, hold it by the crown, put it back in the socket straight away if you can, or keep it in milk, and get to a dentist within 30 minutes. Go to a hospital emergency department or call 998 if swelling spreads towards the eye or neck, you have difficulty breathing or swallowing, or there is a serious facial injury.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Hospital emergency departments in Dubai treat serious facial swelling, trauma and bleeding at any hour. For toothache alone, a licensed dental clinic is usually quicker and better equipped.',
    ],
    insurance: [
      'Emergency dental care to relieve pain or treat infection is the dental treatment most often covered by health plans in Dubai, and the basic mandatory plan generally includes some emergency cover. Follow-up treatment, such as a root canal or crown, is usually assessed separately.',
      'Ask the clinic whether it bills your insurer directly for emergency care, and keep the receipt and the dentist\'s report if you have to claim later.',
    ],
    costNote: 'Out-of-hours visits can cost more, and treatment done on the day is charged on top of the consultation. Ask for the consultation fee and an estimate before treatment begins.',
    areas: [
      { slug: 'dubai-marina', note: 'Clinics in the residential towers, some with evening hours, for residents of the Marina, JBR and JLT.' },
      { slug: 'downtown-dubai', note: 'Central clinics close to the Red Line for people who work in the centre.' },
      { slug: 'al-barsha', note: 'Medical centres near the metro, central for the inland communities.' },
      { slug: 'deira', note: 'Long-established clinics close to the Red and Green Lines.' },
      { slug: 'bur-dubai', note: 'Clinics in the older part of the city, close to the Green Line.' },
      { slug: 'mirdif', note: 'Community clinics on the eastern side of the city, closer for residents of Mirdif and nearby areas.' },
    ],
    faqs: [
      { q: 'Can I get an emergency dentist in Dubai on a Friday or Sunday?', a: 'Some private clinics open at weekends and some open late in the evening, but hours vary. Phone the clinic to confirm before you travel. For serious swelling or trauma, hospital emergency departments are open around the clock.' },
      { q: 'How much does an emergency dentist cost in Dubai?', a: 'Indicative private-clinic prices are AED 200 to 800 for the consultation and X-ray. Treatment on the day costs extra: AED 300 to 1,500 for pain relief or draining an abscess, or AED 400 to 1,200 for a simple extraction.' },
      { q: 'What should I do if a tooth is knocked out?', a: 'Hold it by the crown, not the root. Rinse briefly if dirty and put it back in the socket if you can, or keep it in milk. Get to a dentist within 30 minutes. Do not replant a baby tooth.' },
      { q: 'Will my Dubai insurance cover emergency dental care?', a: 'Emergency treatment to relieve pain or treat infection is the dental care most often covered, including under the basic plan. Follow-up treatment may not be covered. Check your policy and ask the clinic about direct billing.' },
      { q: 'When should I go to hospital instead of a dentist?', a: 'Go to a hospital emergency department or call 998 if swelling is spreading to your eye or neck, you have difficulty breathing or swallowing, bleeding will not stop, or you have a serious injury to the face or head.' },
    ],
    sources: [DHA, DHCC, { label: 'International Association of Dental Traumatology: for patients', url: 'https://iadt-dentaltrauma.org/for-patients/' }],
  },

  // --------------------------------------------------------------- children
  {
    service: 'pediatric-dentistry', emirate: 'dubai',
    metaTitle: 'Kids Dentist in Dubai: Pediatric Clinics, Costs & Areas',
    metaDescription: 'Children\'s dentist in Dubai: indicative AED prices for check-ups, sealants and fillings, pediatric dentist licensing, family insurance and where to look.',
    answer:
      'A child\'s dental check-up in Dubai usually costs AED 200 to 500 at a private clinic, with fissure sealants at AED 150 to 400 per tooth and baby-tooth fillings at AED 300 to 900. Check-ups take 20 to 45 minutes every six months. The first visit is advised when the first tooth appears or by the first birthday.',
    localNote: [
      'In Dubai, children are seen by specialist pediatric dentists and by family dentists. For routine check-ups a family dentist is usually fine. For very young, anxious or medically complex children, or treatment that may need sedation, a pediatric dentist is trained for that work.',
      'After-school and weekend appointments go quickly, so book the next check-up as you leave. Ask whether a parent can stay in the room and how the clinic handles a nervous first visit.',
      'If your child needs extensive treatment, a clinic may suggest sedation or a general anaesthetic. Ask where it would be done, who gives the anaesthetic, and for a written estimate that includes hospital or facility fees.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Pediatric dentistry is a specialist licence category. Sedation and general anaesthesia are carried out in facilities licensed for them, with an anaesthetist. Ask the clinic to confirm both before agreeing to treatment under sedation.',
    ],
    insurance: [
      'Health insurance is mandatory for residents in Dubai, including children, but the basic plan generally excludes routine dental care.',
      'Employer family plans with a dental benefit often cover children\'s check-ups and basic treatment such as fillings, usually with a co-payment and an annual limit. Treatment under general anaesthetic usually needs pre-approval.',
    ],
    costNote: 'Specialist pediatric practices tend to charge more than family clinics for the same check-up. Family clinics in Karama, Al Qusais and Al Nahda often price check-ups lower; compare what the visit includes, such as fluoride varnish.',
    areas: [
      { slug: 'al-barsha', note: 'Family clinics near schools and the metro.' },
      { slug: 'mirdif', note: 'Family-focused clinics on the eastern side of the city.' },
      { slug: 'arabian-ranches', note: 'Clinics in the local town centre for families in the villa communities.' },
      { slug: 'dubai-hills', note: 'Clinics in the community\'s town centres for young families.' },
      { slug: 'jumeirah', note: 'Villa-based family practices with easier parking for pushchairs.' },
      { slug: 'al-qusais', note: 'Community clinics in the north-east of the city, often priced lower.' },
    ],
    faqs: [
      { q: 'How much is a children\'s dentist in Dubai?', a: 'Indicative private-clinic prices are AED 200 to 500 for a check-up, AED 100 to 300 for fluoride varnish, AED 150 to 400 per tooth for sealants and AED 300 to 900 for a baby-tooth filling. Treatment under general anaesthetic can cost AED 4,000 to 15,000 including facility fees.' },
      { q: 'Do I need a specialist pediatric dentist in Dubai?', a: 'For routine check-ups a family dentist is fine. For very young, anxious or medically complex children, or treatment that may need sedation, a pediatric specialist is helpful. You can check the licence category on the DHA register.' },
      { q: 'When should my child first see a dentist?', a: 'When the first tooth appears or by the first birthday, as advised by the American Academy of Pediatric Dentistry. Early visits are short and help the child get used to the clinic.' },
      { q: 'Does family insurance in Dubai cover children\'s dental care?', a: 'Plans with a dental benefit often cover check-ups and basic treatment for children. The basic mandatory plan generally does not include routine dental care. Check your policy wording.' },
    ],
    sources: [DHA, DHCC, { label: 'American Academy of Pediatric Dentistry: resources for parents', url: 'https://www.aapd.org/resources/parent/' }],
  },

  // ----------------------------------------------------------- wisdom teeth
  {
    service: 'wisdom-tooth-removal', emirate: 'dubai',
    metaTitle: 'Wisdom Tooth Extraction Dubai: Prices & Oral Surgeons',
    metaDescription: 'Wisdom tooth removal in Dubai: indicative AED prices for simple and surgical extraction, sedation, oral surgeon licensing, insurance and recovery time.',
    answer:
      'Wisdom tooth removal in Dubai usually costs AED 500 to 1,500 for a simple extraction and AED 1,200 to 4,500 per tooth for surgical removal at private clinics, with IV sedation (AED 1,000 to 3,000) extra. Each tooth takes 20 to 60 minutes. Plan 2 to 3 days off after surgery. It suits impacted, infected or decayed wisdom teeth.',
    localNote: [
      'An X-ray, and sometimes a CBCT scan, shows whether a wisdom tooth needs a simple or a surgical extraction. Ask for the quote after the scan, because the price depends on how the tooth is positioned and how close it sits to the nerve.',
      'Impacted wisdom teeth in Dubai are removed by oral surgeons and by general dentists with surgical experience. If the tooth is deeply buried or close to the nerve, ask whether an oral and maxillofacial surgeon will do it.',
      'Book surgical removal before a weekend or a few quieter days at work, because swelling usually peaks on day two or three. If you want all four removed at once under sedation, ask whether that suits your case and where the sedation will be given.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Oral surgery and oral and maxillofacial surgery are specialist licence categories. IV sedation and general anaesthesia are given in facilities licensed for them; ask the clinic to confirm this before booking treatment under sedation.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally covers only emergency dental care. A wisdom tooth causing infection or severe pain may fall under emergency cover; planned removal usually does not.',
      'Employer plans with a dental benefit often cover medically necessary extractions with pre-approval, sometimes under the medical part of the policy if the surgery is done in hospital. Ask the clinic to send the X-ray and plan to your insurer first.',
    ],
    costNote: 'The type of extraction and whether sedation is used decide most of the price. Clinics in Karama, Deira and Bur Dubai often quote lower than central areas; check whether the scan, stitches and review visit are included.',
    areas: [
      { slug: 'healthcare-city', note: 'Specialist and hospital-based centres in the free zone for deeply impacted teeth or general anaesthetic.' },
      { slug: 'al-barsha', note: 'Medical centres near the metro for residents of the inland communities.' },
      { slug: 'karama', note: 'Established clinics on the Green Line that often quote lower prices.' },
      { slug: 'business-bay', note: 'Office-friendly hours; book surgery before a weekend so you can rest.' },
      { slug: 'deira', note: 'Long-established clinics close to the Red and Green Lines.' },
      { slug: 'jvc', note: 'Community clinics close to home for residents of JVC and nearby areas.' },
    ],
    faqs: [
      { q: 'How much is wisdom tooth removal in Dubai?', a: 'Indicative private-clinic prices are AED 500 to 1,500 for a simple extraction, AED 1,200 to 3,000 for surgical removal of a partly erupted tooth and AED 2,000 to 4,500 for a tooth impacted in bone. IV sedation adds AED 1,000 to 3,000.' },
      { q: 'Do I need an oral surgeon in Dubai to remove a wisdom tooth?', a: 'Not always. General dentists remove straightforward wisdom teeth. For deeply impacted teeth or teeth close to the nerve, an oral surgeon is often recommended. You can check the licence category on the DHA register.' },
      { q: 'How many days off work do I need?', a: 'Expect to take one to three days off after surgical removal. Swelling usually peaks around day two or three. A simple extraction often needs no more than the rest of the day.' },
      { q: 'Does insurance in Dubai cover wisdom tooth removal?', a: 'It depends on your plan. Employer plans with a dental benefit often cover medically necessary removal with pre-approval. The basic plan generally covers only emergency care.' },
    ],
    sources: [DHA, DHCC, { label: 'NHS: Wisdom tooth removal', url: 'https://www.nhs.uk/tests-and-treatments/wisdom-tooth-removal/' }],
  },

  // ----------------------------------------------------------------- crowns
  {
    service: 'dental-crowns', emirate: 'dubai',
    metaTitle: 'Dental Crowns Dubai: Prices, Same-Day Options & Areas',
    metaDescription: 'Dental crowns in Dubai: indicative AED prices for PFM, zirconia and E.max, same-day crowns, insurance after root canals and where to look.',
    answer:
      'A dental crown in Dubai usually costs AED 1,200 to 2,500 for porcelain fused to metal, AED 1,500 to 3,500 for zirconia and AED 1,800 to 4,500 for E.max at private clinics. It takes one visit with same-day milling or two visits 1 to 2 weeks apart. Crowns suit cracked, heavily filled or root-treated teeth.',
    localNote: [
      'Some Dubai clinics mill crowns on site and fit them the same day, while others send the work to a dental lab, which means a temporary crown for one to two weeks. Same-day crowns are convenient if you are short of time; lab-made crowns may suit front teeth where shade matching is harder.',
      'Ask which material the dentist recommends for this tooth and why. Zirconia is very strong for back teeth, while E.max and layered porcelain are often chosen for front teeth. Check whether a core build-up or post (AED 300 to 1,200) is needed and included.',
      'If the crown follows a root canal, ask for both to be priced together and whether the same dentist will do both. Ask what the guarantee covers if the crown chips or comes loose.',
    ],
    regulation: [
      DUBAI_LICENSING,
      'Prosthodontics is the specialist licence category for crowns, bridges and replacing teeth. General dentists place most crowns; for complex cases involving many teeth, ask whether a prosthodontist will plan the treatment.',
    ],
    insurance: [
      'Health insurance is mandatory in Dubai, but the basic plan generally excludes crowns. Employer plans with a dental benefit often include crowns as restorative care, sometimes at a lower rate than fillings or root canals, and usually with pre-approval.',
      'Crowns placed for appearance alone are treated as cosmetic and are generally not covered. Ask the clinic to send the X-ray and the reason for the crown to your insurer before treatment.',
    ],
    costNote: 'Material and whether the crown is milled on site or made by a lab drive the price. Clinics in Karama, Bur Dubai and Deira often quote lower than central and coastal areas; compare the same material and ask whether the build-up is included.',
    areas: [
      { slug: 'downtown-dubai', note: 'Clinics close to offices and the Red Line, some with same-day milling.' },
      { slug: 'business-bay', note: 'Office-friendly hours for the one or two visits a crown needs.' },
      { slug: 'al-barsha', note: 'Family clinics near the metro for residents of the inland communities.' },
      { slug: 'karama', note: 'Established clinics where crowns are often priced lower.' },
      { slug: 'healthcare-city', note: 'Specialist centres in the free zone, including prosthodontists for complex cases.' },
      { slug: 'dubai-silicon-oasis', note: 'Community clinics for residents on the eastern side of the city.' },
    ],
    faqs: [
      { q: 'How much is a dental crown in Dubai?', a: 'Indicative private-clinic prices per crown are AED 1,200 to 2,500 for porcelain fused to metal, AED 1,500 to 3,500 for zirconia, AED 1,800 to 4,500 for E.max and AED 1,800 to 4,000 for a same-day milled crown.' },
      { q: 'Which is better, zirconia or E.max?', a: 'Zirconia is stronger and often used on back teeth and for people who grind. E.max is more translucent and often chosen for front teeth. Your dentist should explain the choice for each tooth.' },
      { q: 'Can I get a same-day crown in Dubai?', a: 'Some clinics mill crowns on site and fit them in one visit of a few hours. Ask when booking whether the clinic has this option and whether it suits your tooth.' },
      { q: 'Does insurance in Dubai cover crowns?', a: 'Employer plans with a dental benefit often cover crowns needed to restore a damaged tooth, with pre-approval and a co-payment. The basic plan generally does not. Crowns for appearance alone are rarely covered.' },
    ],
    sources: [DHA, DHCC, { label: 'American Dental Association (MouthHealthy): Crowns', url: 'https://www.mouthhealthy.org/all-topics-a-z/crowns' }],
  },
];

export const serviceEmirates: ServiceEmirateContent[] = [
  ...dubaiGuides,

  // ---------------------------------------------------------------- implants
  {
    service: 'dental-implants', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, implants are commonly carried out by oral surgeons, periodontists or prosthodontists working in private clinics and hospital dental departments. Larger centres on the island and in Khalifa City often handle both the surgical and crown stages in one place.',
      'If your plan includes a dental benefit, implants are usually excluded or limited, so clinics in Abu Dhabi will often ask your insurer for a decision before treatment. Get that answer in writing.',
    ],
    faqs: [
      { q: 'Does Thiqa cover dental implants?', a: 'Coverage under Thiqa follows the programme\'s rules and can change. Ask a participating clinic to confirm what is covered for your case before you start.' },
      { q: 'Are implants available in Al Ain?', a: 'Yes. Al Ain has clinics offering implant treatment, so residents rarely need to travel to the capital for it.' },
    ],
  },
  {
    service: 'dental-implants', emirate: 'sharjah',
    localNote: [
      'Sharjah clinics often quote lower implant prices than central Dubai. When comparing, check that each quote names the implant brand, includes the abutment and crown, and says whether a scan and bone graft are extra.',
      'Many Sharjah residents commute, so evening surgery slots are popular. Placing an implant late in the day means the first sore evening is at home, which many people prefer.',
    ],
    faqs: [
      { q: 'Why are implant quotes in Sharjah sometimes much lower?', a: 'Lower overheads explain part of it. The rest is usually what is included: brand, crown material and grafting. Compare like for like.' },
      { q: 'Can a university dental hospital in Sharjah place implants?', a: 'Teaching hospitals may offer implant treatment under supervision. Appointments take longer, but it can be an option for some patients.' },
    ],
  },
  {
    service: 'dental-implants', emirate: 'ajman',
    localNote: [
      'Ajman has private clinics offering implants and university facilities with dental specialists. Because the emirate is compact, getting to repeat appointments during healing is usually easy.',
      'If you are weighing a clinic in Ajman against one in Sharjah, ask both which specialist places the implant and who fits the crown; it is sometimes two different people.',
    ],
    faqs: [
      { q: 'How many visits do implants need in Ajman?', a: 'Expect around four to six visits over several months: consultation and scan, placement, a check during healing, and fitting the final crown.' },
      { q: 'Is bone grafting available locally?', a: 'Many implant providers in Ajman can perform simple grafts. Complex grafting may be referred to an oral surgeon.' },
    ],
  },
  {
    service: 'dental-implants', emirate: 'ras-al-khaimah',
    localNote: [
      'An implant in Ras Al Khaimah means four to six visits spread over several months, from the first scan to the final crown. If you live north of RAK City, how easy the clinic is to reach on a weekday afternoon matters as much as the price.',
      'Find out if the clinic has its own 3D (CBCT) scanner. If it does not, you will need a separate trip to an imaging centre before the plan can be finalised.',
    ],
    faqs: [
      { q: 'Do I need to go to Dubai for implants?', a: 'Usually not. Implants are offered locally in Ras Al Khaimah; your dentist will refer you on only if your case needs specialist surgery that is not available.' },
      { q: 'How long until I get the final tooth?', a: 'Typically 3 to 6 months after placement, depending on bone quality and whether grafting was needed.' },
    ],
  },
  {
    service: 'dental-implants', emirate: 'fujairah',
    localNote: [
      'In Fujairah, implant treatment is centred on clinics in Fujairah City. If you live in Dibba or further along the coast, ask the clinic to combine steps where safe, such as scan and consultation on the same day, to limit driving.',
      'The final crown is usually made by a dental lab. A lab in another emirate can add days to the wait, so check where the clinic sends its work.',
    ],
    faqs: [
      { q: 'Can I get same-day teeth with implants in Fujairah?', a: 'Immediate temporary teeth depend on bone quality and the clinic\'s experience. Ask if your case is suitable after the 3D scan.' },
      { q: 'What if I have a problem with my implant while away?', a: 'Keep a record of the implant brand and size from your clinic. Any dentist familiar with that system can then help.' },
    ],
  },
  {
    service: 'dental-implants', emirate: 'umm-al-quwain',
    localNote: [
      'Local options for implants in Umm Al Quwain are limited, so many residents compare clinics in Ajman and Sharjah, which are a short drive away. Choosing one place for the whole course is more important than shaving a little off the price.',
      'Ask any clinic you are considering to explain who handles aftercare, since implant maintenance continues for years after the crown is fitted.',
    ],
    faqs: [
      { q: 'Are implants offered in Umm Al Quwain itself?', a: 'Some local clinics may offer implants or work with visiting specialists. Many residents also consider clinics in neighbouring Ajman and Sharjah.' },
      { q: 'Should I choose the nearest clinic for implants?', a: 'Distance matters because of follow-up visits, but experience and a clear, itemised plan matter more.' },
    ],
  },

  // --------------------------------------------------------------- invisalign
  {
    service: 'invisalign', emirate: 'abu-dhabi',
    localNote: [
      'Aligner check-ins in Abu Dhabi are usually every six to ten weeks for a year or more. For mainland residents, a clinic on the same side of the bridges as home or work avoids crossing at rush hour for each visit.',
      'Adult orthodontics is rarely covered by insurance in Abu Dhabi. If you have a plan with an orthodontic benefit, it is often limited to children, so check your policy before assuming any cover.',
    ],
    faqs: [
      { q: 'Can I get aligners in Al Ain?', a: 'Yes. Orthodontists and general dentists in Al Ain provide aligner treatment, so residents do not need to travel to the capital for it.' },
      { q: 'How often will I need to visit?', a: 'Usually every 6 to 10 weeks, with extra visits if refinement trays are needed.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'sharjah',
    localNote: [
      'Aligner treatment in Sharjah is often priced below Dubai for similar cases. Check that the quote includes refinements and the retainers you will need afterwards, because these are the costs that most often surprise patients.',
      'Evening review appointments are popular with commuters; booking your next review as you leave each visit helps keep treatment on schedule.',
    ],
    faqs: [
      { q: 'Is cheaper aligner treatment in Sharjah lower quality?', a: 'Not necessarily. Compare the brand, the number of trays, refinements and who plans the case.' },
      { q: 'What if a tray cracks between visits?', a: 'Call the clinic. Usually you move to the next tray or wear the previous one until a replacement arrives.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'ajman',
    localNote: [
      'Ajman is small enough that most residents are within a short drive of a clinic, which makes the regular aligner reviews easy to fit around work or school.',
      'If your bite is complex, find out who plans the tray sequence. When no orthodontist is involved, a second opinion before you start costs far less than correcting a poor result.',
    ],
    faqs: [
      { q: 'Can a general dentist in Ajman provide Invisalign?', a: 'Yes, for suitable cases. For complex bite problems a specialist orthodontist is often recommended.' },
      { q: 'How long does aligner treatment usually take?', a: 'Most adult cases take 6 to 18 months, depending on how much movement is needed and how consistently trays are worn.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'ras-al-khaimah',
    localNote: [
      'Aligners need fewer chairside adjustments than braces, which helps if you live outside RAK City and would otherwise drive in every few weeks.',
      'Ask about remote check-ins using photos, which some clinics use to reduce the number of in-person visits.',
    ],
    faqs: [
      { q: 'Can I get my aligner trays posted to me?', a: 'Some clinics hand out several sets at once or arrange collection. In-person checks are still needed to confirm progress.' },
      { q: 'Are retainers included in RAK aligner quotes?', a: 'It varies. Ask for retainers to be listed in the quote.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'fujairah',
    localNote: [
      'For people in Dibba, Kalba or Masafi, the main advantage of aligners over braces is fewer trips into Fujairah City for adjustments.',
      'Make sure you know what to do if a tray is lost, and keep your previous set as a backup until the clinic advises otherwise.',
    ],
    faqs: [
      { q: 'Are aligners or braces better if I live far from the clinic?', a: 'Aligners generally need fewer chairside visits, but braces do not depend on you wearing trays. Discuss both with your dentist.' },
      { q: 'How many hours a day must I wear them?', a: 'Align advises 20 to 22 hours a day, removing them only to eat, drink anything other than water, and clean.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'umm-al-quwain',
    localNote: [
      'If aligner options in Umm Al Quwain do not suit you, clinics in Ajman and Sharjah are a short drive away. Because aligner reviews are spaced weeks apart, a slightly longer drive is usually manageable.',
      'Whichever clinic you choose, ask for the total price including refinements and retainers.',
    ],
    faqs: [
      { q: 'Can I start aligners in UAQ and continue elsewhere?', a: 'Switching clinics mid-treatment is complicated because the plan belongs to the treating clinic. Choose a clinic you can stay with.' },
      { q: 'Do I need X-rays before aligners?', a: 'Yes, usually. X-rays check roots, bone and existing dental work before teeth are moved.' },
    ],
  },

  // ------------------------------------------------------------------ braces
  {
    service: 'braces', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, braces are provided in private clinics and hospital dental departments. Some insurance plans include an orthodontic benefit for children, so check before your child\'s assessment.',
      'Families in the mainland suburbs often choose clinics in Khalifa City or MBZ to avoid bridge traffic for monthly adjustments.',
    ],
    faqs: [
      { q: 'Will my insurance pay for my child\'s braces?', a: 'Some plans include orthodontic cover for children, usually with a cap and age limits. Ask your insurer before treatment starts.' },
      { q: 'At what age should my child see an orthodontist?', a: 'An early check around age 7 helps spot problems; full treatment typically starts between 10 and 14.' },
    ],
  },
  {
    service: 'braces', emirate: 'sharjah',
    localNote: [
      'Sharjah has many clinics offering braces at competitive prices. Make sure the quote includes the retainers at the end, which are essential to keep the result.',
      'Because adjustments are frequent, a clinic close to school or home makes the most sense for children.',
    ],
    faqs: [
      { q: 'How much do braces cost in Sharjah?', a: 'Prices vary with the type of brace and complexity. Ask for an itemised quote that includes retainers.' },
      { q: 'Can adults get braces in Sharjah?', a: 'Yes, adults of any age can have braces if their gums are healthy.' },
    ],
  },
  {
    service: 'braces', emirate: 'ajman',
    localNote: [
      'Families in Ajman can choose between private clinics and university dental teaching clinics for braces. Short drives make the monthly adjustments easy to keep up.',
      'If you are comparing with Sharjah, check whether the same orthodontist will see you at every visit.',
    ],
    faqs: [
      { q: 'Do teaching clinics in Ajman offer braces?', a: 'Some university dental clinics offer orthodontic treatment under supervision. Appointments may be longer.' },
      { q: 'How long will my child need braces?', a: 'Usually 12 to 24 months, followed by retainers.' },
    ],
  },
  {
    service: 'braces', emirate: 'ras-al-khaimah',
    localNote: [
      'Braces need an adjustment visit every four to eight weeks for one to two years. For families outside RAK City, the route to the clinic is part of the decision.',
      'Ask what happens if a wire breaks between visits and whether the clinic can see you quickly.',
    ],
    faqs: [
      { q: 'Is there an orthodontist in Ras Al Khaimah?', a: 'Yes. Orthodontic care in Ras Al Khaimah is provided by specialist orthodontists and by general dentists with orthodontic training.' },
      { q: 'Are retainers included?', a: 'It varies by clinic, so ask for retainers to be listed in the quote.' },
    ],
  },
  {
    service: 'braces', emirate: 'fujairah',
    localNote: [
      'Braces mean an adjustment every few weeks, and most orthodontic care in Fujairah is in Fujairah City. Families in outlying towns can ask about aligners or brace systems with longer gaps between visits.',
      'Ask the orthodontist how often they need to see you; some systems allow longer gaps between visits.',
    ],
    faqs: [
      { q: 'Can I have fewer adjustment visits?', a: 'Some brace systems allow longer intervals. Your orthodontist will advise based on your case.' },
      { q: 'What should I do in an emergency with braces?', a: 'Cover sharp wires with orthodontic wax and call your clinic. Most problems can wait until the next working day.' },
    ],
  },
  {
    service: 'braces', emirate: 'umm-al-quwain',
    localNote: [
      'For braces, many Umm Al Quwain families look at orthodontists in Ajman and Sharjah. Because adjustment visits continue for a year or more, a predictable route and parking matter.',
      'Ask any clinic about after-school appointment availability before you commit.',
    ],
    faqs: [
      { q: 'Should I choose a specialist orthodontist?', a: 'For children and complex bites, a specialist is a sensible choice. Simple adult cases are often handled well by experienced general dentists.' },
      { q: 'How much school will my child miss?', a: 'Adjustment visits are usually short; booking after-school slots keeps missed school to a minimum.' },
    ],
  },

  // ----------------------------------------------------------------- veneers
  {
    service: 'veneers', emirate: 'abu-dhabi',
    localNote: [
      'Veneers are cosmetic, so in Abu Dhabi, as elsewhere in the UAE, expect to pay the full cost yourself, including Thiqa holders. Get the price per tooth in writing and confirm the material.',
      'If you are unsure about removing enamel, ask the dentist if your teeth suit a minimal-preparation or composite option instead.',
    ],
    faqs: [
      { q: 'Are veneers covered by insurance in Abu Dhabi?', a: 'Veneers are considered cosmetic and are generally not covered.' },
      { q: 'How do I choose a cosmetic dentist?', a: 'Look at their own case photos, ask about mock-ups, and choose someone who explains alternatives honestly.' },
    ],
  },
  {
    service: 'veneers', emirate: 'sharjah',
    localNote: [
      'Veneers in Sharjah are often priced lower than in Dubai. When comparing, confirm whether the price is for porcelain or composite and which lab makes the porcelain.',
      'Because porcelain veneers need two or three visits, a clinic near home avoids rushing between work and appointments.',
    ],
    faqs: [
      { q: 'Are composite veneers a good option?', a: 'They cost less and can be done in one visit, but they stain and chip more easily than porcelain and need more upkeep.' },
      { q: 'How many veneers do I need?', a: 'Often 6 to 10 on the upper teeth, depending on how wide your smile is. Ask why each tooth is being included.' },
    ],
  },
  {
    service: 'veneers', emirate: 'ajman',
    localNote: [
      'Before committing to veneers in Ajman, ask if whitening or a short course of aligners would get you most of the way. Treating fewer teeth costs less and keeps more enamel.',
      'Make sure you approve a mock-up before preparation; it is the best way to judge the final shape.',
    ],
    faqs: [
      { q: 'Can I whiten my teeth after veneers?', a: 'Whitening does not change the colour of veneers, so whiten first and match the veneers to your new shade.' },
      { q: 'Do veneers need special care?', a: 'Brush and floss as normal, avoid biting very hard objects, and wear a night guard if you grind.' },
    ],
  },
  {
    service: 'veneers', emirate: 'ras-al-khaimah',
    localNote: [
      'Cosmetic dentists in Ras Al Khaimah offer veneers, mostly in the city centre and Al Nakheel. Ask where the lab work is done, as this affects how long you wear temporaries.',
      'Check the guarantee: what happens if a veneer chips in the first year?',
    ],
    faqs: [
      { q: 'How long do temporaries last?', a: 'They are meant for one to three weeks while the lab makes the final veneers. Avoid hard and sticky foods while you wear them.' },
      { q: 'What if I do not like the result?', a: 'This is why a mock-up matters. Discuss shape and shade fully before bonding.' },
    ],
  },
  {
    service: 'veneers', emirate: 'fujairah',
    localNote: [
      'Porcelain veneers take two or three visits. If you are coming into Fujairah City from along the coast, ask the clinic to book them close together.',
      'Choose a natural shade that you will be happy with in daylight, not just under clinic lights.',
    ],
    faqs: [
      { q: 'How many visits do porcelain veneers need?', a: 'Usually two or three: consultation and mock-up, preparation, then bonding.' },
      { q: 'Can a veneer be repaired if it chips?', a: 'Small chips can sometimes be repaired with composite; larger damage means replacing the veneer.' },
    ],
  },
  {
    service: 'veneers', emirate: 'umm-al-quwain',
    localNote: [
      'For veneers, residents of Umm Al Quwain often compare cosmetic dentists in Ajman and Sharjah as well as local options.',
      'Whichever you choose, ask for a written plan listing each tooth, the material and the total cost.',
    ],
    faqs: [
      { q: 'Should I travel for cosmetic dentistry?', a: 'For a permanent change like veneers, a short drive to a dentist whose work you have seen and trust usually makes sense.' },
      { q: 'Are veneers suitable if I grind my teeth?', a: 'They can be, with a night guard. Heavy grinding increases the risk of chips.' },
    ],
  },

  // -------------------------------------------------------------- whitening
  {
    service: 'teeth-whitening', emirate: 'abu-dhabi',
    localNote: [
      'Whitening itself is cosmetic and not covered by insurance in Abu Dhabi. The check-up and cleaning you should have first may be, if your plan includes a dental benefit.',
      'If you have crowns or veneers on front teeth, ask how they will match after whitening.',
    ],
    faqs: [
      { q: 'Does insurance cover whitening in Abu Dhabi?', a: 'No, whitening is cosmetic. A preventive check-up and cleaning beforehand may be covered under some dental benefits.' },
      { q: 'Will whitening work on my fillings?', a: 'No, fillings, crowns and veneers do not change colour.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'sharjah',
    localNote: [
      'Sharjah clinics offer both in-clinic and take-home whitening, often at lower prices than central Dubai. Take-home trays are a good fit if evening appointments are hard to get.',
      'Choose custom-made trays over one-size kits: a close fit keeps the gel off your gums.',
    ],
    faqs: [
      { q: 'Is take-home whitening as effective?', a: 'Over 1 to 2 weeks it can reach similar results, with less sensitivity for some people.' },
      { q: 'How soon can I drink coffee?', a: 'It is best to avoid strongly coloured food and drinks for 48 hours after whitening.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'ajman',
    localNote: [
      'Book a scale and polish before whitening in Ajman. Removing surface stain first helps the gel work evenly and shows what colour your teeth really are.',
      'If you have sensitive teeth, ask about a lower-strength gel over a longer period.',
    ],
    faqs: [
      { q: 'Will whitening make my teeth sensitive?', a: 'Temporary sensitivity is common and usually settles within a few days.' },
      { q: 'How white can my teeth get?', a: 'Results vary. Your dentist will record your starting shade and set realistic expectations.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'ras-al-khaimah',
    localNote: [
      'Clinics in Ras Al Khaimah offer professional whitening. Take-home trays are convenient if you live outside the centre, with a follow-up visit to check the result.',
      'Keep your trays: they can be reused for occasional top-ups.',
    ],
    faqs: [
      { q: 'Can I reuse my whitening trays?', a: 'Yes, custom trays can be reused with top-up gel as advised by your dentist.' },
      { q: 'Is whitening safe for everyone?', a: 'It is not recommended during pregnancy or breastfeeding, or with untreated decay.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'fujairah',
    localNote: [
      'If you live along the coast, ask a Fujairah City clinic to do the check-up, cleaning and whitening on one day to save a second trip.',
      'Ask the clinic about top-up gel so you can maintain the result at home.',
    ],
    faqs: [
      { q: 'Can I whiten and clean on the same day?', a: 'Often yes; cleaning first helps the whitening gel work evenly.' },
      { q: 'How long does the result last?', a: 'Typically 6 months to 2 years, depending on diet and habits.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'umm-al-quwain',
    localNote: [
      'Local clinics in Umm Al Quwain can provide whitening, and take-home trays reduce the number of visits needed. Clinics in Ajman and Sharjah are an alternative if you want an in-clinic session.',
      'Whichever you choose, have a check-up first.',
    ],
    faqs: [
      { q: 'Do I need a check-up before whitening?', a: 'Yes. Decay, gum problems and exposed roots should be treated first.' },
      { q: 'Are shop-bought kits a good alternative?', a: 'They are weaker and less controlled. Professional whitening is more predictable.' },
    ],
  },

  // ----------------------------------------------------------- root canal
  {
    service: 'root-canal', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, clinics usually ask your insurer to approve a root canal and crown before starting, which can take a day or two. If you are in severe pain, say so: the clinic can relieve it while approval is pending.',
      'Expect a temporary filling to protect the tooth while the crown is approved and made.',
    ],
    faqs: [
      { q: 'Does insurance in Abu Dhabi cover root canals?', a: 'Plans with a dental benefit often do, with a co-payment. Basic plans may only cover emergency pain relief.' },
      { q: 'What if I am in pain while waiting for approval?', a: 'Tell the clinic. Emergency relief can usually be given straight away.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'sharjah',
    localNote: [
      'In Sharjah, root canals are offered by many private clinics and by the university dental hospital. Compare prices for the specific tooth, because molars cost significantly more than front teeth.',
      'The crown is often quoted separately, so check before comparing prices.',
    ],
    faqs: [
      { q: 'Is a root canal cheaper in Sharjah?', a: 'Often, yes, for the same tooth. Check whether the crown and X-rays are included.' },
      { q: 'How soon do I need a crown after a root canal?', a: 'Ideally within a few weeks for back teeth, to protect them from cracking.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'ajman',
    localNote: [
      'If the tooth has had a root canal before, the work is more complex. Ask an Ajman clinic if the dentist does retreatments personally or refers them to an endodontist.',
      'Being able to reach the clinic quickly matters if the tooth flares up between visits.',
    ],
    faqs: [
      { q: 'Can a failed root canal be redone?', a: 'Often, yes. Retreatment is more complex and is frequently done by an endodontist.' },
      { q: 'Will I need antibiotics?', a: 'Not usually, unless there is spreading swelling or you are unwell. Cleaning the tooth is the main treatment.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'ras-al-khaimah',
    localNote: [
      'Root canals are carried out by dentists across Ras Al Khaimah. For complex molars, ask if a specialist is available locally or whether you will be referred.',
      'Plan your crown appointment soon after, especially for back teeth.',
    ],
    faqs: [
      { q: 'How long does a root canal take?', a: 'About 60 to 90 minutes per visit; some teeth need two visits.' },
      { q: 'Is it painful afterwards?', a: 'Tenderness for a few days is normal and usually eased with over-the-counter painkillers.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'fujairah',
    localNote: [
      'A root canal and the crown that follows can take three or four visits. If you travel into Fujairah City, ask the clinic to plan them to keep trips to a minimum.',
      'Severe swelling should be seen the same day; do not wait for a routine appointment.',
    ],
    faqs: [
      { q: 'Can the root canal and crown be done together?', a: 'Sometimes the crown preparation is done at the final root canal visit; it depends on the tooth.' },
      { q: 'What if swelling gets worse?', a: 'Contact the clinic urgently. Swelling spreading to the eye or neck needs a hospital emergency department.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'umm-al-quwain',
    localNote: [
      'Local clinics in Umm Al Quwain can often provide root canals for straightforward teeth. For complex molars or retreatments, a specialist in Ajman or Sharjah may be recommended.',
      'Ask for an X-ray after treatment to confirm the canals are well filled.',
    ],
    faqs: [
      { q: 'Should I travel for a root canal?', a: 'For simple teeth, a local dentist is fine. For complex cases, a nearby specialist can be the better choice.' },
      { q: 'Is extraction cheaper than a root canal?', a: 'Upfront, yes, but replacing the tooth later usually costs more.' },
    ],
  },

  // ----------------------------------------------------------- emergency
  {
    service: 'emergency-dentist', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi and Al Ain, private clinics and hospital dental departments see urgent cases. Phone ahead, describe the problem and check if they bill your insurer directly for emergency care.',
      'Serious trauma or swelling affecting breathing or swallowing needs a hospital emergency department; call 998 for an ambulance.',
    ],
    faqs: [
      { q: 'Do hospitals in Abu Dhabi treat dental emergencies?', a: 'Hospital emergency departments manage serious infections and trauma. For toothache, a dental clinic is usually quicker.' },
      { q: 'Does Thiqa cover emergency dental care?', a: 'Thiqa covers care at participating providers under its rules; confirm with the clinic.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'sharjah',
    localNote: [
      'Many Sharjah clinics open into the evening, which helps for urgent problems after work. Call before travelling, especially at night, to confirm a dentist is on duty.',
      'If you work in Dubai, choose an emergency clinic near home; evening traffic can make crossing back slow.',
    ],
    faqs: [
      { q: 'What counts as a dental emergency?', a: 'Severe pain, facial swelling, a knocked-out adult tooth, a broken tooth with pain, or bleeding that will not stop.' },
      { q: 'Can I wait until morning?', a: 'Pain can often be managed overnight with painkillers. Spreading swelling or breathing difficulty cannot wait; go to a hospital.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'ajman',
    localNote: [
      'In Ajman, short distances help in an emergency: most clinics are a quick drive away. Phone first to check they can see you straight away.',
      'For a knocked-out tooth, speed matters; keep it in milk and go immediately.',
    ],
    faqs: [
      { q: 'What should I bring to an emergency appointment?', a: 'Your Emirates ID, insurance card, a list of medicines and, for a knocked-out tooth, the tooth itself in milk.' },
      { q: 'Will they fix the tooth on the same day?', a: 'The first priority is pain relief and stopping infection. Definitive treatment may be booked separately.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'ras-al-khaimah',
    localNote: [
      'Urgent dental care in Ras Al Khaimah is available at private clinics and hospital dental departments. If you live outside the centre, call before setting off to avoid a wasted journey.',
      'Serious facial injuries should go to a hospital emergency department.',
    ],
    faqs: [
      { q: 'Where do I go for a dental emergency at night in RAK?', a: 'Hospital emergency departments handle serious cases at night. For toothache, call clinics with evening hours.' },
      { q: 'Can I take painkillers before seeing the dentist?', a: 'Over-the-counter painkillers taken as directed can help. Tell the dentist what you have taken.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'fujairah',
    localNote: [
      'In Fujairah, urgent dental care is concentrated in Fujairah City. If you live in Dibba or elsewhere on the coast, call ahead so the clinic is ready when you arrive.',
      'Spreading swelling, especially towards the eye or throat, should be seen at a hospital emergency department.',
    ],
    faqs: [
      { q: 'Is there emergency dental care outside Fujairah City?', a: 'Local clinics may help with urgent problems during opening hours. Call first.' },
      { q: 'What can I do for a broken tooth until I get there?', a: 'Rinse with warm water, cover sharp edges with sugar-free gum or dental wax, and avoid chewing on that side.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'umm-al-quwain',
    localNote: [
      'For dental emergencies in Umm Al Quwain, call local clinics first; if none can see you, clinics in Ajman are nearby.',
      'Hospital emergency departments are the right place for serious swelling, trauma or bleeding that will not stop.',
    ],
    faqs: [
      { q: 'Should I go to Ajman for an emergency dentist?', a: 'If local clinics cannot see you promptly, a nearby clinic in Ajman is a sensible option.' },
      { q: 'How do I stop a tooth socket bleeding?', a: 'Bite firmly on clean gauze for 20 minutes. If it does not stop, seek urgent care.' },
    ],
  },

  // --------------------------------------------------------------- children
  {
    service: 'pediatric-dentistry', emirate: 'abu-dhabi',
    localNote: [
      'Families covered by Thiqa should check that a clinic participates in the programme for children\'s dentistry before booking; many private clinics and hospital dental departments in Abu Dhabi see children.',
      'Fissure sealants on new adult molars, usually around age 6 and 12, are a simple way to prevent decay.',
    ],
    faqs: [
      { q: 'Are children\'s check-ups covered in Abu Dhabi?', a: 'Plans with dental benefits often cover check-ups. Thiqa includes children\'s dental care at participating providers under its rules.' },
      { q: 'When should my child get sealants?', a: 'Commonly when the first and second adult molars come through, around ages 6 and 12.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'sharjah',
    localNote: [
      'Family dental clinics are common in Sharjah\'s residential areas such as Al Majaz and Al Nahda. Choosing one near school or home makes regular check-ups easier.',
      'When you call, ask which dentist regularly sees young children and how they handle a nervous first visit.',
    ],
    faqs: [
      { q: 'How can I prepare my child for the dentist?', a: 'Keep it positive, avoid scary words, and book a morning slot when your child is rested.' },
      { q: 'Should baby teeth with decay be filled?', a: 'Often yes, to prevent pain and infection and to hold space for adult teeth.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'ajman',
    localNote: [
      'Ajman\'s clinics and university dental facilities see children. Short travel distances make regular six-monthly check-ups easy to keep up.',
      'Teaching clinics can take longer, which some children find tiring, so a private clinic may suit younger children.',
    ],
    faqs: [
      { q: 'At what age should my child\'s first visit be?', a: 'When the first tooth appears or by the first birthday.' },
      { q: 'Is fluoride varnish safe for children?', a: 'Yes, professionally applied fluoride varnish is a safe and effective way to strengthen enamel.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'ras-al-khaimah',
    localNote: [
      'Children in Ras Al Khaimah are seen at family clinics and hospital dental departments. For a very young or anxious child, ask if a pediatric specialist works at the clinic.',
      'Regular check-ups catch problems early, which matters more when specialist care involves travel.',
    ],
    faqs: [
      { q: 'What if my child needs treatment under sedation?', a: 'Your dentist will explain the options. Sedation or general anaesthetic is used only when it is genuinely needed and is done in suitable facilities.' },
      { q: 'How often should children see a dentist?', a: 'Every 6 months for most children.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'fujairah',
    localNote: [
      'Families who drive into Fujairah City for a pediatric dentist can book check-ups in school holidays so children miss less school.',
      'Prevention is especially valuable when specialist care is a drive away.',
    ],
    faqs: [
      { q: 'Can local clinics see young children?', a: 'Many family clinics see children. Ask when booking whether a dentist regularly treats young children.' },
      { q: 'How can I prevent decay at home?', a: 'Brush twice a day with fluoride toothpaste, limit sugary snacks and drinks, and avoid bedtime bottles of milk or juice.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'umm-al-quwain',
    localNote: [
      'Local clinics in Umm Al Quwain can provide routine children\'s check-ups. For specialist pediatric care, families often look to Ajman and Sharjah.',
      'Keeping up with six-monthly check-ups locally helps avoid more complex treatment that might need travel.',
    ],
    faqs: [
      { q: 'Where can I find a pediatric specialist near UAQ?', a: 'Neighbouring Ajman and Sharjah have pediatric dental specialists within a short drive.' },
      { q: 'Is thumb-sucking a problem for teeth?', a: 'It is common in young children. If it continues after adult teeth start coming through, ask your dentist for advice.' },
    ],
  },
];

export const serviceEmirateContent = (service: string, emirate: string) =>
  serviceEmirates.find((c) => c.service === service && c.emirate === emirate);
