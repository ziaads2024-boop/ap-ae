import type { ServiceEmirateContent } from './types';

// One hand-written entry per service + emirate guide. Each says something
// specific about getting that treatment in that emirate, so the pages are not
// interchangeable templates with the place name swapped.

export const serviceEmirates: ServiceEmirateContent[] = [
  // ---------------------------------------------------------------- implants
  {
    service: 'dental-implants', emirate: 'dubai',
    localNote: [
      'Dubai has many clinics with in-house CBCT scanners, which saves a separate trip to an imaging centre before implant planning. Ask whether the scan is included in the consultation fee, because some clinics charge for it separately.',
      'Implant treatment spans several months, so think about where you will be living and working for the whole course. Commuting across the city at peak hours for each review appointment adds up quickly.',
    ],
    faqs: [
      { q: 'Do Dubai clinics offer All-on-4 or full-arch implants?', a: 'Several Dubai clinics offer full-arch options. They are a major treatment, so ask for the surgeon\'s experience with full-arch cases and a breakdown of temporary and final teeth costs.' },
      { q: 'Can I start implants in Dubai and finish abroad?', a: 'It is possible but not ideal. Components differ between implant systems, so finishing with the same clinic, or at least the same system, avoids compatibility problems.' },
    ],
  },
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
      'Implant treatment is available in Ras Al Khaimah, mostly in clinics around Al Nakheel and RAK City. For residents further north, choose a clinic that is easy to reach, since healing checks are spread over several months.',
      'Ask whether the clinic has its own 3D scanner. If not, factor in a trip to an imaging centre before the plan is finalised.',
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
      'Because the final crown is usually made by a lab, ask whether the clinic\'s lab is local or in another emirate, as this can affect waiting time.',
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
    service: 'invisalign', emirate: 'dubai',
    localNote: [
      'Clear aligners are widely offered in Dubai by both general dentists and specialist orthodontists. Ask who will plan your case and whether they review the digital plan themselves or rely on the manufacturer\'s automated set-up.',
      'Because aligner reviews are every 6 to 10 weeks, a clinic near work or home is easy to keep up with. If you travel a lot, ask about remote monitoring and getting several trays at once.',
    ],
    faqs: [
      { q: 'Do Dubai clinics offer aligner brands other than Invisalign?', a: 'Yes. Several clinics offer other clear aligner systems, sometimes at lower cost. The clinician\'s planning matters more than the brand.' },
      { q: 'Can I pay for aligners in instalments in Dubai?', a: 'Many clinics offer payment plans spread over the treatment period. Ask for the total cost in writing.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, aligners are offered on the island, in Khalifa City and on Reem, Yas and Saadiyat. If you live on the mainland, a clinic on your side of the bridges makes the regular check-ins easier.',
      'Adult orthodontics is rarely covered by insurance in Abu Dhabi. If you have a plan with an orthodontic benefit, it is often limited to children, so check your policy before assuming any cover.',
    ],
    faqs: [
      { q: 'Are orthodontists available in Al Ain for aligners?', a: 'Yes, aligner treatment is offered in Al Ain by both orthodontists and general dentists.' },
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
      'Clear aligners are available in Ajman from private clinics, and the short distances in the emirate make regular reviews easy to fit in.',
      'For complex bites, ask whether an orthodontist is involved in planning. If not, it can be worth getting a second opinion before you start.',
    ],
    faqs: [
      { q: 'Can a general dentist in Ajman provide Invisalign?', a: 'Yes, for suitable cases. For complex bite problems a specialist orthodontist is often recommended.' },
      { q: 'How long does aligner treatment usually take?', a: 'Most adult cases take 6 to 18 months, depending on how much movement is needed and how consistently trays are worn.' },
    ],
  },
  {
    service: 'invisalign', emirate: 'ras-al-khaimah',
    localNote: [
      'Aligners are offered in Ras Al Khaimah, mainly in Al Nakheel and RAK City. Because they need fewer chairside adjustments than braces, they can suit people who live further from the centre.',
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
      'In Fujairah, aligners are available in Fujairah City. The fewer adjustment visits compared with braces can be helpful if you live along the coast and travel in for appointments.',
      'Make sure you know what to do if a tray is lost, and keep your previous set as a backup until the clinic advises otherwise.',
    ],
    faqs: [
      { q: 'Are aligners or braces better if I live far from the clinic?', a: 'Aligners generally need fewer chairside visits, but braces do not depend on you wearing trays. Discuss both with your dentist.' },
      { q: 'How many hours a day must I wear them?', a: 'About 22 hours a day, removing them only to eat, drink anything other than water, and clean.' },
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
    service: 'braces', emirate: 'dubai',
    localNote: [
      'Braces in Dubai are offered by specialist orthodontists and general dentists. For children, a specialist assessment helps decide whether early treatment is worthwhile or whether to wait for more adult teeth.',
      'Adjustment visits are every 4 to 8 weeks, often after school, so ask how easy it is to book late-afternoon slots.',
    ],
    faqs: [
      { q: 'Are ceramic braces popular in Dubai?', a: 'Many adults choose ceramic or lingual braces for a less visible option. They cost more than metal braces.' },
      { q: 'What happens if a bracket breaks?', a: 'Call the clinic. Most repairs are quick and booked at your next convenient slot unless the wire is causing pain.' },
    ],
  },
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
      'Braces are available in Ajman\'s private clinics and through university dental facilities. Short travel times make the regular adjustment visits easy to keep.',
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
      'Orthodontic treatment is available in Ras Al Khaimah. For families outside RAK City, choose a clinic you can reach easily every month or two for adjustments.',
      'Ask what happens if a wire breaks between visits and whether the clinic can see you quickly.',
    ],
    faqs: [
      { q: 'Is there an orthodontist in Ras Al Khaimah?', a: 'Yes, orthodontic care is offered locally, by specialists and by general dentists with orthodontic training.' },
      { q: 'Are retainers included?', a: 'It varies by clinic, so ask for retainers to be listed in the quote.' },
    ],
  },
  {
    service: 'braces', emirate: 'fujairah',
    localNote: [
      'In Fujairah, braces are offered in Fujairah City. Since adjustments are every few weeks, families in outlying towns may find aligners or longer adjustment intervals worth discussing.',
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
    service: 'veneers', emirate: 'dubai',
    localNote: [
      'Dubai has a large cosmetic dentistry market, and veneer prices vary widely. A low headline price may be for composite rather than porcelain, or may exclude the mock-up and temporaries, so ask exactly what is included.',
      'Ask to see the dentist\'s own before-and-after cases, ideally of patients with a similar starting point, and take time to decide before any enamel is removed.',
    ],
    faqs: [
      { q: 'Why do veneer prices in Dubai vary so much?', a: 'Material, the lab used, the dentist\'s experience and whether a mock-up and temporaries are included all change the price.' },
      { q: 'Can I get veneers in one day in Dubai?', a: 'Composite veneers can be done in a day. Porcelain veneers made by a lab usually take one to three weeks, unless the clinic mills them on site.' },
    ],
  },
  {
    service: 'veneers', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, veneers are offered by cosmetic and general dentists across the island and the mainland suburbs. Cosmetic treatment is not normally covered by insurance, so budget for the full cost.',
      'If you are unsure about removing enamel, ask whether minimal-preparation or composite options are suitable for your teeth.',
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
      'Veneers are available in Ajman from private cosmetic and general dentists. Ask whether your teeth would benefit from whitening or straightening first, which can mean fewer veneers.',
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
      'Veneers are offered in Fujairah City. If you live further along the coast, ask the clinic to plan the visits close together to reduce travel.',
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
      { q: 'Should I travel for cosmetic dentistry?', a: 'A short drive to a dentist whose work you have seen and trust is often worth it for a permanent change like veneers.' },
      { q: 'Are veneers suitable if I grind my teeth?', a: 'They can be, with a night guard. Heavy grinding increases the risk of chips.' },
    ],
  },

  // -------------------------------------------------------------- whitening
  {
    service: 'teeth-whitening', emirate: 'dubai',
    localNote: [
      'In-clinic whitening is widely available in Dubai, including lunchtime sessions in Downtown and Business Bay. A combined approach, one clinic session plus custom take-home trays, often gives the most even, lasting result.',
      'Be wary of very cheap whitening offers that skip a check-up. Whitening over untreated decay or exposed roots can be painful.',
    ],
    faqs: [
      { q: 'How long does an in-clinic whitening session take in Dubai?', a: 'Usually 60 to 90 minutes, including preparation and protecting the gums.' },
      { q: 'Are cosmetic whitening offers safe?', a: 'Professional whitening is safe when a dentist checks your teeth first. Avoid offers that skip the check-up.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'abu-dhabi',
    localNote: [
      'Whitening is offered across Abu Dhabi and Al Ain. It is cosmetic, so it is not covered by insurance, but a check-up and cleaning beforehand may be, under a plan with a dental benefit.',
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
      'Ask whether the trays are custom-made, which keeps the gel off your gums.',
    ],
    faqs: [
      { q: 'Is take-home whitening as effective?', a: 'Over 1 to 2 weeks it can reach similar results, with less sensitivity for some people.' },
      { q: 'How soon can I drink coffee?', a: 'It is best to avoid strongly coloured food and drinks for 48 hours after whitening.' },
    ],
  },
  {
    service: 'teeth-whitening', emirate: 'ajman',
    localNote: [
      'Whitening is available in Ajman\'s private clinics. A cleaning first removes surface stain and helps the gel work evenly.',
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
      'Whitening is available in Fujairah City. Combining it with a check-up and cleaning on the same visit saves a trip if you live along the coast.',
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
    service: 'root-canal', emirate: 'dubai',
    localNote: [
      'Dubai has specialist endodontists as well as general dentists who perform root canals. For molars, retreatments or curved canals, a specialist with a microscope can make a difference.',
      'If your plan has a dental benefit, root canals are often covered as basic restorative care with a co-payment. The crown afterwards may be covered at a different rate, so check both.',
    ],
    faqs: [
      { q: 'Should I see an endodontist in Dubai?', a: 'For molars, retreatments or complex anatomy, an endodontist is a good choice. Simple front-tooth root canals are routinely done by general dentists.' },
      { q: 'Can a root canal be done in one visit?', a: 'Often, yes, if there is no significant infection. Otherwise it may take two visits.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'abu-dhabi',
    localNote: [
      'Root canal treatment is widely available in Abu Dhabi and Al Ain. Clinics usually request insurance approval for root canals and crowns, which can take a day or two, so mention any severe pain so they can prioritise relief first.',
      'Ask whether a temporary filling will be placed while you wait for approval of the crown.',
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
      'Ask whether the crown is quoted separately, as it often is.',
    ],
    faqs: [
      { q: 'Is a root canal cheaper in Sharjah?', a: 'Often, yes, for the same tooth. Check whether the crown and X-rays are included.' },
      { q: 'How soon do I need a crown after a root canal?', a: 'Ideally within a few weeks for back teeth, to protect them from cracking.' },
    ],
  },
  {
    service: 'root-canal', emirate: 'ajman',
    localNote: [
      'Root canal treatment is available across Ajman\'s clinics. If the tooth has had a root canal before, ask whether the dentist does retreatments or refers to a specialist.',
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
      'Root canal treatment is available in Fujairah City. If you live along the coast, ask if the treatment and crown preparation can be planned to minimise trips.',
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
      { q: 'Should I travel for a root canal?', a: 'For simple teeth, a local dentist is fine. For complex cases, a nearby specialist may be worth the trip.' },
      { q: 'Is extraction cheaper than a root canal?', a: 'Upfront, yes, but replacing the tooth later usually costs more.' },
    ],
  },

  // ----------------------------------------------------------- emergency
  {
    service: 'emergency-dentist', emirate: 'dubai',
    localNote: [
      'Many Dubai clinics hold same-day emergency slots and some open late or at weekends. Always phone before going so they can confirm a dentist is available, and ask about the consultation fee.',
      'For facial injuries, spreading swelling or difficulty breathing, go to a hospital emergency department or call 998.',
    ],
    faqs: [
      { q: 'Where can I find an emergency dentist in Dubai at night?', a: 'Some clinics open late into the evening. Hospital emergency departments handle serious swelling and trauma around the clock.' },
      { q: 'Will my Dubai insurance cover emergency dental care?', a: 'Many plans, including some basic plans, cover emergency treatment to relieve pain. Follow-up treatment may not be covered.' },
    ],
  },
  {
    service: 'emergency-dentist', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi and Al Ain, private clinics and hospital dental departments see urgent cases. Phone ahead, describe the problem and ask whether they bill your insurer directly for emergency care.',
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
    service: 'pediatric-dentistry', emirate: 'dubai',
    localNote: [
      'Dubai has dedicated pediatric dental practices as well as family clinics that see children. Specialist pediatric dentists are trained in managing anxious children and in sedation when it is genuinely needed.',
      'After-school appointments are in high demand; booking your child\'s next check-up as you leave helps secure a convenient time.',
    ],
    faqs: [
      { q: 'Do I need a specialist pediatric dentist in Dubai?', a: 'For routine check-ups a family dentist is fine. For very young, anxious or medically complex children, a pediatric specialist is helpful.' },
      { q: 'Do schools in Dubai require dental check-ups?', a: 'Requirements vary by school. Regular check-ups every 6 months are recommended regardless.' },
    ],
  },
  {
    service: 'pediatric-dentistry', emirate: 'abu-dhabi',
    localNote: [
      'In Abu Dhabi, children\'s dental care is offered in private clinics and hospital dental departments. Families covered by Thiqa should check which providers participate for children\'s dentistry.',
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
      'Ask whether the clinic has a dentist who regularly sees young children and how they handle nervous first visits.',
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
      'In Ras Al Khaimah, family clinics and hospital dental departments provide children\'s dental care. Ask whether a pediatric specialist is available for very young or anxious children.',
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
      'Children\'s dental care is available in Fujairah City and through local clinics in coastal towns. Booking check-ups during school holidays can reduce missed school for families who travel in.',
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
