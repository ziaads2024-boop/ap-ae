import type { EmirateContent } from './types';

// Regulatory and insurance notes are general guidance for patients, not legal
// advice. Each page links readers to the regulator to check a licence themselves.

export const emirates: EmirateContent[] = [
  {
    slug: 'dubai',
    name: 'Dubai',
    nameAr: 'دبي',
    metaTitle: 'Dentists in Dubai: Find & Compare Licensed Dental Clinics',
    metaDescription:
      'A practical guide to finding a dentist in Dubai: how clinics are licensed (DHA and DHCC), what insurance usually covers, neighbourhood tips and licensed clinics near you.',
    summary:
      'Dubai has the largest choice of private dental clinics in the UAE, from neighbourhood practices to specialist centres, licensed by the Dubai Health Authority or, inside Dubai Healthcare City, by its own regulator.',
    intro: [
      'Most dental clinics in Dubai are private, so you can usually book directly without a referral. Choice is wide, which makes it worth comparing what is included in a price, who will treat you and how easy the clinic is to reach at the times you are free.',
      'Clinics cluster where people live and work: the Marina and JLT, Downtown and Business Bay, Jumeirah, Al Barsha, Deira and Bur Dubai, and the newer communities further inland. Many open into the evening and on weekends.',
    ],
    regulator: {
      name: 'Dubai Health Authority',
      short: 'DHA',
      note: 'The DHA licenses dentists and clinics across most of Dubai. Facilities inside the Dubai Healthcare City free zone are licensed by the Dubai Healthcare City Authority instead.',
      checkLicence: 'You can look up a professional\'s licence on the DHA website before you book.',
    },
    insurance: [
      'Health insurance is mandatory for residents in Dubai, but the basic plans required by law generally exclude routine dental care beyond emergency pain relief.',
      'Many employer plans add a dental benefit with an annual limit and a co-payment, often covering check-ups, cleaning, fillings and root canals. Cosmetic treatment is rarely included.',
      'Ask the clinic whether it bills your insurer directly and whether pre-approval is needed for larger treatments.',
    ],
    areas: [
      { name: 'Dubai Marina & JLT', note: 'Dense choice of clinics in residential towers, many open late. Parking can be tight, so check if the clinic validates parking.' },
      { name: 'Downtown & Business Bay', note: 'Convenient for office workers; several clinics offer early-morning and lunchtime appointments.' },
      { name: 'Jumeirah & Al Wasl', note: 'Villa-based family practices and cosmetic clinics, often with easier parking.' },
      { name: 'Al Barsha & Tecom', note: 'Mix of family clinics and multi-specialty medical centres near the metro.' },
      { name: 'Deira & Bur Dubai', note: 'Long-established clinics, often with competitive prices and many languages spoken.' },
      { name: 'Dubai Healthcare City', note: 'A free zone with hospitals and specialist dental centres under its own regulator.' },
      { name: 'Mirdif & Silicon Oasis', note: 'Community clinics serving families on the eastern side of the city.' },
      { name: 'Dubai Hills & Arabian Ranches', note: 'Newer communities with clinics in local malls and town centres.' },
    ],
    gettingThere:
      'The Red and Green metro lines reach many clinic clusters. At peak hours Sheikh Zayed Road traffic can add 30 minutes or more, so a clinic near home or work is often the practical choice for treatments needing several visits.',
    tips: [
      'Book treatment that needs several visits, such as implants or aligners, close to where you will be for the whole course.',
      'Ask for a written, itemised quote; prices vary a lot between neighbourhoods.',
      'If you are a newcomer, check whether your plan has a network list and choose an in-network clinic for direct billing.',
    ],
    faqs: [
      { q: 'How do I check if a dentist in Dubai is licensed?', a: 'Use the professional search on the Dubai Health Authority website. If the clinic is in Dubai Healthcare City, check with the Dubai Healthcare City Authority instead.' },
      { q: 'Can I see a dentist in Dubai without insurance?', a: 'Yes. Almost all private clinics accept self-paying patients. Ask for the price in writing before treatment.' },
      { q: 'Are there dentists open late in Dubai?', a: 'Many clinics open until 9 or 10 pm and some open on weekends. Call ahead for emergencies to confirm they can see you.' },
    ],
    neighbours: ['sharjah', 'abu-dhabi', 'ajman'],
    tone: 'lemon',
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    nameAr: 'أبوظبي',
    metaTitle: 'Dentists in Abu Dhabi: Find Licensed Dental Clinics Near You',
    metaDescription:
      'Finding a dentist in Abu Dhabi and Al Ain: DoH licensing, Thiqa and private insurance, neighbourhoods with good clinic choice and licensed dental clinics near you.',
    summary:
      'Dental care in Abu Dhabi, including Al Ain and Al Dhafra, is regulated by the Department of Health - Abu Dhabi, with a mix of government hospital clinics and private practices.',
    intro: [
      'Abu Dhabi has a strong network of private dental clinics on the island and in the mainland suburbs, plus dental departments in major hospitals. Al Ain, the emirate\'s second city, has its own established clinics, so residents there rarely need to travel to the capital.',
      'Because insurance in Abu Dhabi is mandatory and widely used, most clinics work with the main insurers and handle approvals for you. It is still worth confirming your plan\'s dental limit before starting larger treatment.',
    ],
    regulator: {
      name: 'Department of Health - Abu Dhabi',
      short: 'DoH',
      note: 'The DoH licenses healthcare professionals and facilities throughout the emirate of Abu Dhabi, including Al Ain and Al Dhafra.',
      checkLicence: 'You can verify a professional\'s licence through the DoH\'s official channels before booking.',
    },
    insurance: [
      'UAE nationals covered by Thiqa have access to dental benefits at participating clinics, subject to the programme\'s rules.',
      'Basic plans for lower-income workers generally cover only limited emergency dental care.',
      'Enhanced employer plans often include a dental benefit with an annual limit. Orthodontics and cosmetic work are usually excluded or capped separately.',
    ],
    areas: [
      { name: 'Al Reem Island', note: 'High-rise residential area with modern clinics close to home for many professionals.' },
      { name: 'Khalifa City & MBZ City', note: 'Family suburbs on the mainland with community clinics and easier parking.' },
      { name: 'Yas & Saadiyat Islands', note: 'Newer communities with a growing number of clinics in local centres.' },
      { name: 'Al Khalidiyah & Corniche', note: 'Central island neighbourhoods with long-established practices.' },
      { name: 'Al Raha & Al Bandar', note: 'Waterfront communities between the island and the airport.' },
      { name: 'Al Ain', note: 'The garden city has its own wide choice of clinics and hospital dental departments.' },
    ],
    gettingThere:
      'Most residents drive. Island traffic is heaviest around the bridges at peak times, so mainland residents often prefer a clinic on their side of the water.',
    tips: [
      'If you hold Thiqa, check the clinic is a participating provider before booking.',
      'Ask whether pre-approval is required for root canals, crowns or extractions under your plan.',
      'Al Ain residents can usually find specialists locally rather than travelling to the capital.',
    ],
    faqs: [
      { q: 'Who regulates dentists in Abu Dhabi?', a: 'The Department of Health - Abu Dhabi licenses dentists and clinics across the emirate, including Al Ain.' },
      { q: 'Does Thiqa cover dental treatment?', a: 'Thiqa includes dental benefits at participating providers. What is covered and any limits are set by the programme, so check with the clinic and the programme before treatment.' },
      { q: 'Is it cheaper to get dental treatment in Al Ain?', a: 'Prices vary by clinic rather than city, but Al Ain has competitive options. Compare written quotes for the same treatment plan.' },
    ],
    neighbours: ['dubai'],
    tone: 'sky',
  },
  {
    slug: 'sharjah',
    name: 'Sharjah',
    nameAr: 'الشارقة',
    metaTitle: 'Dentists in Sharjah: Find Licensed Dental Clinics Near You',
    metaDescription:
      'A guide to dentists in Sharjah: who licenses clinics, insurance basics, neighbourhoods with good clinic choice and licensed dental clinics near you.',
    summary:
      'Sharjah has a wide range of private dental clinics, many in Al Majaz, Al Nahda and Al Taawun, plus a university dental hospital, with prices that are often lower than in central Dubai.',
    intro: [
      'Many Sharjah residents work in Dubai, so evening appointments are in high demand and a lot of clinics stay open late. Choosing a clinic near home rather than near the office usually avoids rush-hour traffic on the way back.',
      'Sharjah is also home to a university dental hospital linked to a college of dental medicine, which adds a teaching option for some treatments alongside private practices.',
    ],
    regulator: {
      name: 'Ministry of Health and Prevention',
      short: 'MOHAP',
      note: 'Dental professionals in Sharjah and the other Northern Emirates are licensed at federal level by the Ministry of Health and Prevention, and the Sharjah Health Authority oversees healthcare in the emirate.',
      checkLicence: 'You can check a professional\'s federal licence through MOHAP\'s official services.',
    },
    insurance: [
      'Health insurance has been made mandatory for private-sector employees in the Northern Emirates, including Sharjah, but basic packages generally do not include routine dental care.',
      'Employer plans with a dental add-on commonly cover check-ups, fillings and root canals up to an annual limit.',
      'Self-paying patients will find many clinics happy to give an itemised quote.',
    ],
    areas: [
      { name: 'Al Majaz', note: 'Central, near the waterfront, with many family and cosmetic clinics.' },
      { name: 'Al Nahda', note: 'On the Dubai border; popular with commuters who want a clinic close to home.' },
      { name: 'Al Taawun & Al Khan', note: 'Residential towers with clinics open into the evening.' },
      { name: 'Muwaileh & University City', note: 'Near the university, with a teaching dental hospital and growing private options.' },
      { name: 'Al Qasimia & Rolla', note: 'Older central districts with long-standing clinics.' },
    ],
    gettingThere:
      'Traffic towards Dubai is heaviest in the morning and back towards Sharjah in the evening. A clinic on your side of the border saves time for multi-visit treatment.',
    tips: [
      'Compare quotes with Dubai if you commute; equivalent treatment is often priced lower in Sharjah.',
      'Book late-evening slots early in the week; they fill quickly.',
      'Ask whether the clinic can coordinate with your employer\'s insurer for direct billing.',
    ],
    faqs: [
      { q: 'Who licenses dentists in Sharjah?', a: 'Dentists in Sharjah are licensed federally by the Ministry of Health and Prevention, with the Sharjah Health Authority overseeing healthcare in the emirate.' },
      { q: 'Is dental treatment cheaper in Sharjah than Dubai?', a: 'Often, yes, for the same treatment. Always compare what each quote includes, such as X-rays and follow-ups.' },
      { q: 'Are there dental clinics open late in Sharjah?', a: 'Many clinics open into the evening because so many residents commute. Call ahead to confirm hours.' },
    ],
    neighbours: ['dubai', 'ajman', 'umm-al-quwain'],
    tone: 'blush',
  },
  {
    slug: 'ajman',
    name: 'Ajman',
    nameAr: 'عجمان',
    metaTitle: 'Dentists in Ajman: Find Licensed Dental Clinics Near You',
    metaDescription:
      'Finding a dentist in Ajman: licensing, insurance basics, where clinics are concentrated, teaching dental clinics and licensed dental clinics near you.',
    summary:
      'Ajman is compact, so most residents can reach a dental clinic within a short drive. It also has university dental teaching facilities alongside private clinics.',
    intro: [
      'The smallest emirate by area has a busy healthcare scene for its size, helped by universities with dental colleges and their teaching clinics. Private clinics are concentrated in Al Nuaimiya, Al Rashidiya and Al Jurf.',
      'Ajman borders Sharjah, so residents often compare options on both sides of the border, especially for specialist treatment.',
    ],
    regulator: {
      name: 'Ministry of Health and Prevention',
      short: 'MOHAP',
      note: 'Dental professionals in Ajman are licensed federally by the Ministry of Health and Prevention.',
      checkLicence: 'You can check a professional\'s licence through MOHAP\'s official services.',
    },
    insurance: [
      'Mandatory basic health insurance for private-sector employees in the Northern Emirates generally does not include routine dental care.',
      'Dental add-ons on employer plans typically cover preventive and basic restorative treatment up to a limit.',
    ],
    areas: [
      { name: 'Al Nuaimiya', note: 'Dense residential area with many clinics within walking distance.' },
      { name: 'Al Rashidiya', note: 'Central area with a mix of family clinics and medical centres.' },
      { name: 'Al Jurf', note: 'Home to university healthcare facilities, including dental teaching clinics.' },
      { name: 'Ajman Corniche & Al Zorah', note: 'Waterfront areas with newer residential developments.' },
    ],
    gettingThere: 'Distances are short; most clinics are within 15 minutes by car outside rush hour.',
    tips: [
      'Teaching clinics can be an option for some treatments; expect longer appointments.',
      'For specialist care, compare options in neighbouring Sharjah too.',
    ],
    faqs: [
      { q: 'Are there university dental clinics in Ajman?', a: 'Yes. Ajman has universities with dental colleges that run teaching clinics. Appointments may take longer, as students work under supervision.' },
      { q: 'Who licenses dentists in Ajman?', a: 'The federal Ministry of Health and Prevention licenses dental professionals in Ajman.' },
    ],
    neighbours: ['sharjah', 'umm-al-quwain', 'dubai'],
    tone: 'lime',
  },
  {
    slug: 'ras-al-khaimah',
    name: 'Ras Al Khaimah',
    nameAr: 'رأس الخيمة',
    metaTitle: 'Dentists in Ras Al Khaimah: Find Licensed Dental Clinics',
    metaDescription:
      'A guide to dentists in Ras Al Khaimah: licensing, insurance basics, where clinics are located, dental education in RAK and licensed dental clinics near you.',
    summary:
      'Ras Al Khaimah has private clinics around RAK City and Al Nakheel, government hospital dental departments, and a dental college that trains future dentists.',
    intro: [
      'Most clinics in Ras Al Khaimah are in and around RAK City, Al Nakheel and Al Hamra, so residents of outlying villages may need to drive for specialist care.',
      'The emirate has a medical and health sciences university with a dental college, which supports a local base of dental expertise.',
    ],
    regulator: {
      name: 'Ministry of Health and Prevention',
      short: 'MOHAP',
      note: 'Dental professionals in Ras Al Khaimah are licensed federally by the Ministry of Health and Prevention.',
      checkLicence: 'You can check a professional\'s licence through MOHAP\'s official services.',
    },
    insurance: [
      'Basic mandatory health insurance in the Northern Emirates generally excludes routine dental care.',
      'Employer plans with a dental benefit typically cover preventive and basic restorative work up to an annual limit.',
    ],
    areas: [
      { name: 'Al Nakheel', note: 'Central commercial area with a concentration of clinics.' },
      { name: 'RAK City & Al Qusaidat', note: 'Government hospitals and private practices close to the centre.' },
      { name: 'Al Hamra', note: 'Resort and residential area to the south with a few clinics.' },
      { name: 'Khuzam & Dafan Al Nakheel', note: 'Residential neighbourhoods near the city centre.' },
    ],
    gettingThere: 'Driving is the norm. Allow extra time if you are coming from northern villages for specialist appointments.',
    tips: [
      'For multi-visit treatment, choose a clinic that is easy to reach on your regular routes.',
      'Ask whether specialist treatment is done on site or referred elsewhere.',
    ],
    faqs: [
      { q: 'Do I need to travel to Dubai for specialist dental care?', a: 'Not usually. Ras Al Khaimah has general and specialist dentists. For rare procedures your dentist may refer you, but most treatments are available locally.' },
      { q: 'Who licenses dentists in Ras Al Khaimah?', a: 'The federal Ministry of Health and Prevention licenses dental professionals in Ras Al Khaimah.' },
    ],
    neighbours: ['umm-al-quwain', 'fujairah', 'ajman'],
    tone: 'sand',
  },
  {
    slug: 'fujairah',
    name: 'Fujairah',
    nameAr: 'الفجيرة',
    metaTitle: 'Dentists in Fujairah: Find Licensed Dental Clinics Near You',
    metaDescription:
      'Finding a dentist in Fujairah and on the east coast: licensing, insurance basics, where clinics are, planning multi-visit treatment and licensed clinics near you.',
    summary:
      'Fujairah is the UAE\'s only emirate fully on the east coast. Clinics are concentrated in Fujairah City, with smaller practices in Dibba and other coastal towns.',
    intro: [
      'The mountains separate Fujairah from the west coast cities, so most residents use local clinics rather than travelling. Fujairah City has the widest choice, including hospital dental departments.',
      'Residents of Dibba, Masafi and Kalba often have a clinic close by for routine care and travel into Fujairah City for more specialised treatment.',
    ],
    regulator: {
      name: 'Ministry of Health and Prevention',
      short: 'MOHAP',
      note: 'Dental professionals in Fujairah are licensed federally by the Ministry of Health and Prevention.',
      checkLicence: 'You can check a professional\'s licence through MOHAP\'s official services.',
    },
    insurance: [
      'Basic mandatory health insurance in the Northern Emirates generally excludes routine dental care.',
      'Employer plans with dental cover typically include preventive and basic restorative treatment.',
    ],
    areas: [
      { name: 'Fujairah City', note: 'The main cluster of private clinics and hospital dental care.' },
      { name: 'Dibba', note: 'Northern coastal town with local clinics for routine care.' },
      { name: 'Masafi', note: 'Inland town with limited options; many residents travel to Fujairah City.' },
    ],
    gettingThere: 'The drive from Dibba to Fujairah City takes about 45 minutes; plan multi-visit treatment around this.',
    tips: [
      'Group appointments together where possible to reduce travel.',
      'Ask whether the clinic can do scans and X-rays on site to save extra trips.',
    ],
    faqs: [
      { q: 'Can I get specialist dental treatment in Fujairah?', a: 'Many treatments are available in Fujairah City. For some specialist procedures your dentist may refer you elsewhere.' },
      { q: 'Who licenses dentists in Fujairah?', a: 'The federal Ministry of Health and Prevention licenses dental professionals in Fujairah.' },
    ],
    neighbours: ['ras-al-khaimah', 'sharjah'],
    tone: 'sky',
  },
  {
    slug: 'umm-al-quwain',
    name: 'Umm Al Quwain',
    nameAr: 'أم القيوين',
    metaTitle: 'Dentists in Umm Al Quwain: Find Licensed Dental Clinics',
    metaDescription:
      'A guide to dentists in Umm Al Quwain: licensing, insurance basics, local clinic options, when to look in neighbouring emirates and licensed clinics near you.',
    summary:
      'Umm Al Quwain is the least populous emirate, with a small number of local clinics for routine care. Neighbouring Ajman and Sharjah offer wider specialist choice within a short drive.',
    intro: [
      'For check-ups, cleaning and fillings, local clinics in Umm Al Quwain are convenient. For specialist treatment such as implants or orthodontics, many residents compare options in Ajman and Sharjah, both within easy reach.',
      'Because the community is small, local clinics often know their patients well, which can make ongoing care simpler.',
    ],
    regulator: {
      name: 'Ministry of Health and Prevention',
      short: 'MOHAP',
      note: 'Dental professionals in Umm Al Quwain are licensed federally by the Ministry of Health and Prevention.',
      checkLicence: 'You can check a professional\'s licence through MOHAP\'s official services.',
    },
    insurance: [
      'Basic mandatory health insurance in the Northern Emirates generally excludes routine dental care.',
      'If your employer plan includes dental, check whether local clinics are in its network.',
    ],
    areas: [
      { name: 'UAQ Old Town & Corniche', note: 'The historic centre with local clinics.' },
      { name: 'Al Salamah & Al Raudah', note: 'Residential areas inland from the old town.' },
      { name: 'Al Ramlah', note: 'A growing residential area with newer services.' },
    ],
    gettingThere: 'Ajman is roughly 20 to 30 minutes away by car, and Sharjah a little further.',
    tips: [
      'Use a local clinic for routine care and compare specialist options in Ajman and Sharjah.',
      'Check network lists if you want direct insurance billing.',
    ],
    faqs: [
      { q: 'Are there dentists in Umm Al Quwain?', a: 'Yes, there are local clinics for routine care. For specialist treatment, residents often look in neighbouring Ajman or Sharjah.' },
      { q: 'Who licenses dentists in Umm Al Quwain?', a: 'The federal Ministry of Health and Prevention licenses dental professionals in Umm Al Quwain.' },
    ],
    neighbours: ['ajman', 'sharjah', 'ras-al-khaimah'],
    tone: 'lemon',
  },
];

export const emirateBySlug = (slug: string) => emirates.find((e) => e.slug === slug);
