import type { Faq, Tone } from './types';

// Dubai is AppointPanda's primary market. Area slugs match the live
// /dubai/[area]/ URLs (taken from Search Console), so these notes attach to
// pages that already have search visibility. Notes are practical guidance
// about getting to and choosing a clinic in each area, not claims about
// individual clinics.

export interface DubaiArea {
  slug: string;
  name: string;
  /** Other slugs that refer to the same area (duplicates in the database) */
  aliases?: string[];
  group: 'Marina & JBR' | 'Downtown & central' | 'Jumeirah coast' | 'Old Dubai' | 'Inland communities' | 'East & Deira';
  summary: string;
  notes: string[];
  gettingThere: string;
  nearby: string[];
  tone: Tone;
}

export const dubaiAreas: DubaiArea[] = [
  {
    slug: 'dubai-marina', name: 'Dubai Marina', group: 'Marina & JBR', tone: 'sky',
    summary: 'A dense waterfront district of residential towers where most clinics sit on the ground or podium floors of buildings, many open into the evening.',
    notes: [
      'Clinics in the Marina mostly serve people who live in the surrounding towers, so evening and weekend slots go first. Booking a week ahead is sensible for anything other than an emergency.',
      'Street parking is scarce at peak times. Before you go, ask whether the building has visitor parking or the clinic validates tickets.',
    ],
    gettingThere: 'Two Red Line metro stations and the Dubai Tram serve the Marina, which makes it one of the easier areas to reach without a car.',
    nearby: ['jumeirah-beach-residence', 'jlt', 'palm-jumeirah'],
  },
  {
    slug: 'jumeirah-beach-residence', name: 'JBR (Jumeirah Beach Residence)', aliases: ['jbr'], group: 'Marina & JBR', tone: 'lemon',
    summary: 'The beachfront strip next to the Marina, with clinics along The Walk and in the residential towers behind it.',
    notes: [
      'JBR mixes residents and holiday visitors, so some clinics here are used to seeing patients without UAE insurance. Ask for the self-pay price as well as the insured price if you are visiting.',
      'Cosmetic treatment, especially veneers, is one of the most searched treatments in JBR. Compare at least two written quotes and ask to see a mock-up before any enamel is removed.',
    ],
    gettingThere: 'The tram runs along the back of JBR, and the Marina\'s Red Line stations are a short walk away. Parking near The Walk is paid and busy in the evenings.',
    nearby: ['dubai-marina', 'palm-jumeirah', 'jlt'],
  },
  {
    slug: 'jlt', name: 'Jumeirah Lake Towers (JLT)', group: 'Marina & JBR', tone: 'lime',
    summary: 'Clusters of office and residential towers around artificial lakes, with clinics in the podiums that suit people who work in the area.',
    notes: [
      'Because many JLT residents and workers are in the same cluster, a clinic in your own cluster saves crossing the busy internal roads at lunchtime.',
      'Office workers often book early-morning or lunchtime slots here; ask whether the clinic opens before 9 am if that suits you.',
    ],
    gettingThere: 'Two Red Line stations sit on Sheikh Zayed Road along JLT, with footbridges into the clusters.',
    nearby: ['dubai-marina', 'jumeirah-beach-residence', 'al-barsha'],
  },
  {
    slug: 'palm-jumeirah', name: 'Palm Jumeirah', group: 'Jumeirah coast', tone: 'blush',
    summary: 'The palm-shaped island has clinics in its malls and along the trunk, serving residents and hotel guests.',
    notes: [
      'There are fewer clinics on the Palm than in the neighbouring Marina, so residents often compare both. Prices on the island can sit towards the higher end.',
      'If you are staying in a hotel on the Palm and need urgent care, call ahead: the drive off the island at peak times can be slow.',
    ],
    gettingThere: 'The Palm Monorail links the island to the tram, but most people drive or take a taxi.',
    nearby: ['dubai-marina', 'jumeirah-beach-residence', 'umm-suqeim'],
  },
  {
    slug: 'downtown-dubai', name: 'Downtown Dubai', group: 'Downtown & central', tone: 'lemon',
    summary: 'The area around the Burj Khalifa and Dubai Mall, where clinics are aimed at residents of the towers and people working nearby.',
    notes: [
      'Traffic around Dubai Mall is heavy in the evenings and at weekends. A clinic on the Business Bay side or near a metro exit can save time.',
      'Downtown clinics often offer cosmetic and implant treatment as well as general care; ask for itemised quotes, because packages vary widely.',
    ],
    gettingThere: 'The Red Line station for Burj Khalifa and Dubai Mall serves the area, with a long covered walkway to the mall.',
    nearby: ['business-bay', 'difc', 'al-quoz'],
  },
  {
    slug: 'business-bay', name: 'Business Bay', group: 'Downtown & central', tone: 'sky',
    summary: 'An office and residential district along the Dubai Canal, with clinics that keep office-friendly hours.',
    notes: [
      'Business Bay is mostly towers, and clinics are often on upper floors. Check the building and floor before you set off; it saves wandering between towers.',
      'Lunchtime appointments are popular for check-ups and cleaning. Longer treatments are easier to fit in at the end of the day.',
    ],
    gettingThere: 'The Business Bay Red Line station sits on Sheikh Zayed Road; parts of the district are a long walk or a short taxi ride from it.',
    nearby: ['downtown-dubai', 'difc', 'al-quoz'],
  },
  {
    slug: 'difc', name: 'DIFC', group: 'Downtown & central', tone: 'sand',
    summary: 'Dubai\'s financial district, where clinics serve a mainly professional, weekday population.',
    notes: [
      'DIFC clinics tend to be busiest before and after office hours. If you work here, ask about early slots so you are back at your desk by 9.',
      'Expect prices towards the upper end of the Dubai range. Many people working in DIFC have enhanced insurance, so check whether the clinic bills your insurer directly.',
    ],
    gettingThere: 'The Financial Centre Red Line station connects to the district by footbridge.',
    nearby: ['downtown-dubai', 'business-bay', 'healthcare-city'],
  },
  {
    slug: 'jumeirah', name: 'Jumeirah', group: 'Jumeirah coast', tone: 'lime',
    summary: 'A long coastal residential area of villas, where many clinics are in converted villas along Jumeirah Beach Road and Al Wasl Road.',
    notes: [
      'Villa clinics in Jumeirah usually have their own parking, which makes them practical for families and for treatments that need several visits.',
      'Many family and cosmetic practices are spread along the two main roads. Check which end of Jumeirah the clinic is at, because the area stretches for several kilometres.',
    ],
    gettingThere: 'Jumeirah is car-friendly; the metro runs parallel inland along Sheikh Zayed Road, a taxi ride away from most of the coast.',
    nearby: ['umm-suqeim', 'al-quoz', 'downtown-dubai'],
  },
  {
    slug: 'umm-suqeim', name: 'Umm Suqeim', group: 'Jumeirah coast', tone: 'blush',
    summary: 'A villa neighbourhood south of Jumeirah, near the Burj Al Arab, with family-oriented clinics.',
    notes: [
      'Umm Suqeim is largely residential, so clinics here focus on families: check-ups, children\'s dentistry and orthodontics are common needs.',
      'School-run traffic on Al Wasl Road is heavy in the morning; mid-morning appointments are usually easier to reach.',
    ],
    gettingThere: 'Most people drive; Al Wasl Road and Jumeirah Beach Road both run through the area.',
    nearby: ['jumeirah', 'al-barsha', 'palm-jumeirah'],
  },
  {
    slug: 'al-barsha', name: 'Al Barsha', group: 'Inland communities', tone: 'sky',
    summary: 'A large mixed area around the Mall of the Emirates, with clinics in medical centres, malls and residential buildings.',
    notes: [
      'Al Barsha has a wide range of clinics, from small practices to multi-specialty medical centres, so it is a good area to compare prices for the same treatment.',
      'Al Barsha 1, 2 and 3 are spread out. Check which part the clinic is in before you go.',
    ],
    gettingThere: 'The Mall of the Emirates Red Line station is the main metro access; parts of Al Barsha need a short taxi ride.',
    nearby: ['jlt', 'al-quoz', 'umm-suqeim'],
  },
  {
    slug: 'al-quoz', name: 'Al Quoz', group: 'Inland communities', tone: 'sand',
    summary: 'A mixed industrial and residential area between Sheikh Zayed Road and Al Khail Road, with clinics serving workers and nearby residents.',
    notes: [
      'Clinics in Al Quoz often keep long hours for shift workers. If you need an early or late appointment, ask when booking.',
      'Prices here can be lower than in neighbouring Downtown or Jumeirah for routine treatment. Compare like-for-like quotes.',
    ],
    gettingThere: 'Al Quoz is spread out and mostly reached by car or taxi, with metro stations along its Sheikh Zayed Road edge.',
    nearby: ['al-barsha', 'jumeirah', 'business-bay'],
  },
  {
    slug: 'motor-city', name: 'Motor City', group: 'Inland communities', tone: 'lemon',
    summary: 'A residential community inland, near Dubai Autodrome, with clinics in its local shopping areas.',
    notes: [
      'Motor City residents usually choose between a clinic in the community and clinics in nearby Arabian Ranches or Dubai Sports City. All three are a short drive apart.',
      'For treatments with several visits, such as veneers or implants, staying close to home avoids repeated drives on Al Khail and Hessa roads.',
    ],
    gettingThere: 'A car-dependent community; Hessa Street and Sheikh Mohammed Bin Zayed Road are the main routes in.',
    nearby: ['arabian-ranches', 'dubai-sports-city', 'jvc'],
  },
  {
    slug: 'arabian-ranches', name: 'Arabian Ranches', group: 'Inland communities', tone: 'lime',
    summary: 'A large villa community where clinics sit in the community centres and serve mostly families.',
    notes: [
      'Clinics in Arabian Ranches are mainly family practices. Children\'s check-ups and orthodontic assessments are common reasons to visit.',
      'Community centre parking is usually easy, which suits families with young children.',
    ],
    gettingThere: 'Reached by car via Sheikh Mohammed Bin Zayed Road and Al Qudra Road.',
    nearby: ['motor-city', 'dubai-sports-city', 'dubai-hills'],
  },
  {
    slug: 'dubai-hills', name: 'Dubai Hills', group: 'Inland communities', tone: 'sky',
    summary: 'A newer community between Al Khail Road and Sheikh Mohammed Bin Zayed Road, with clinics in Dubai Hills Mall and local centres.',
    notes: [
      'Clinics in newer communities like Dubai Hills are often recently fitted out. As anywhere, ask who will treat you and check their licence rather than judging by the interior.',
      'Mall-based clinics usually open later in the evening and at weekends.',
    ],
    gettingThere: 'Mostly reached by car; Al Khail Road runs along the community.',
    nearby: ['al-barsha', 'arabian-ranches', 'al-quoz'],
  },
  {
    slug: 'jvc', name: 'Jumeirah Village Circle (JVC)', group: 'Inland communities', tone: 'blush',
    summary: 'A busy residential community of mid-rise buildings and townhouses with neighbourhood clinics.',
    notes: [
      'JVC is dense and its circular roads are slow at peak times. A clinic in your own district of the circle can save a surprising amount of time.',
      'Many JVC clinics serve young families and renters new to Dubai. If you are newly arrived, ask the clinic which insurance networks it accepts.',
    ],
    gettingThere: 'Car or taxi is the norm; Al Khail Road and Hessa Street are the main routes.',
    nearby: ['motor-city', 'al-barsha', 'jlt'],
  },
  {
    slug: 'dubai-sports-city', name: 'Dubai Sports City', group: 'Inland communities', tone: 'sand',
    summary: 'A residential area next to Motor City, with clinics in its apartment buildings.',
    notes: [
      'Residents of Sports City, Motor City and Arabian Ranches often share the same handful of nearby clinics. Compare across all three areas.',
    ],
    gettingThere: 'Mostly reached by car via Sheikh Mohammed Bin Zayed Road and Hessa Street.',
    nearby: ['motor-city', 'arabian-ranches', 'jvc'],
  },
  {
    slug: 'bur-dubai', name: 'Bur Dubai', group: 'Old Dubai', tone: 'lemon',
    summary: 'One of Dubai\'s oldest districts, on the western side of the Creek, with many long-established clinics.',
    notes: [
      'Bur Dubai has a high concentration of clinics with dentists who speak many languages, including Hindi, Urdu, Malayalam, Tagalog and Arabic. Ask about language when you book if it matters to you.',
      'Prices for routine treatment are often competitive. For complex treatment, compare the dentist\'s qualifications as well as the price.',
    ],
    gettingThere: 'The Red and Green metro lines both serve Bur Dubai, and the Creek abras link it to Deira.',
    nearby: ['karama', 'oud-metha', 'deira'],
  },
  {
    slug: 'karama', name: 'Karama', group: 'Old Dubai', tone: 'lime',
    summary: 'A busy residential and shopping district next to Bur Dubai, known for good-value clinics.',
    notes: [
      'Karama is one of the areas where people look for lower-cost routine dental care. Always ask what a quoted price includes, such as X-rays and follow-up visits.',
      'Parking is tight in the evening; the metro is often quicker.',
    ],
    gettingThere: 'ADCB station on the Red Line and Oud Metha on the Green Line are both close by.',
    nearby: ['bur-dubai', 'oud-metha', 'healthcare-city'],
  },
  {
    slug: 'oud-metha', name: 'Oud Metha', group: 'Old Dubai', tone: 'sky',
    summary: 'A central district between Karama and Dubai Healthcare City, with hospitals and medical centres.',
    notes: [
      'Oud Metha sits next to Dubai Healthcare City, so patients often compare clinics in both. Licensing differs: clinics inside Healthcare City are regulated by its own authority, those outside by the DHA.',
    ],
    gettingThere: 'Oud Metha station on the Green Line serves the area.',
    nearby: ['healthcare-city', 'karama', 'bur-dubai'],
  },
  {
    slug: 'healthcare-city', name: 'Dubai Healthcare City', group: 'Old Dubai', tone: 'sand',
    summary: 'A healthcare free zone with hospitals and specialist clinics, regulated by the Dubai Healthcare City Authority rather than the DHA.',
    notes: [
      'Because Healthcare City has its own regulator, check a dentist\'s licence with the Dubai Healthcare City Authority rather than the DHA.',
      'Many specialist practices are based here, which makes it a common choice for complex implant, orthodontic or cosmetic work.',
    ],
    gettingThere: 'Dubai Healthcare City station on the Green Line is inside the zone.',
    nearby: ['oud-metha', 'karama', 'bur-dubai'],
  },
  {
    slug: 'deira', name: 'Deira', group: 'East & Deira', tone: 'blush',
    summary: 'The historic commercial district east of the Creek, with a large number of clinics and medical centres.',
    notes: [
      'Deira has long-established clinics with a wide range of prices and languages. It is a practical area to compare routine treatment costs.',
      'The souks and Creek-side roads are congested; using the metro or arriving early avoids most of the traffic.',
    ],
    gettingThere: 'Both the Red and Green metro lines run through Deira.',
    nearby: ['al-qusais', 'bur-dubai', 'mirdif'],
  },
  {
    slug: 'al-qusais', name: 'Al Qusais', group: 'East & Deira', tone: 'sand',
    summary: 'A residential area near the Sharjah border, with neighbourhood clinics serving families and commuters.',
    notes: [
      'Al Qusais is close to the Sharjah border, so some residents compare clinics on both sides. Remember that Dubai clinics are DHA-licensed while Sharjah clinics are licensed by MOHAP.',
    ],
    gettingThere: 'The Green Line serves Al Qusais.',
    nearby: ['deira', 'mirdif', 'al-nahda-dubai'],
  },
  {
    slug: 'al-nahda-dubai', name: 'Al Nahda (Dubai)', group: 'East & Deira', tone: 'lemon',
    summary: 'A residential area on the Dubai side of the Sharjah border, with clinics in its apartment blocks.',
    notes: [
      'Al Nahda straddles the border, and there is an Al Nahda in Sharjah too. Check that the clinic you book is on the side you expect, because the licensing authority and insurance networks can differ.',
    ],
    gettingThere: 'Mostly reached by car; the Green Line runs nearby through Al Qusais.',
    nearby: ['al-qusais', 'deira', 'mirdif'],
  },
  {
    slug: 'mirdif', name: 'Mirdif', group: 'East & Deira', tone: 'lime',
    summary: 'A family suburb near the airport, with clinics in villas, medical centres and Mirdif City Centre.',
    notes: [
      'Mirdif is a family area, and orthodontics, including clear aligners, is one of the most searched treatments here. Compare who plans the treatment as well as the price.',
      'Villa clinics in Mirdif usually have parking, which helps with the regular visits orthodontic treatment needs.',
    ],
    gettingThere: 'Mostly reached by car via Airport Road and Sheikh Mohammed Bin Zayed Road.',
    nearby: ['al-warqa', 'deira', 'al-qusais'],
  },
  {
    slug: 'al-warqa', name: 'Al Warqa', group: 'East & Deira', tone: 'sky',
    summary: 'A residential area south of Mirdif, with neighbourhood clinics serving families.',
    notes: [
      'Al Warqa residents often compare clinics locally and in nearby Mirdif. For multi-visit treatment, the closer clinic usually wins.',
    ],
    gettingThere: 'Car-dependent; reached via Sheikh Mohammed Bin Zayed Road and Tripoli Street.',
    nearby: ['mirdif', 'dubai-silicon-oasis', 'international-city'],
  },
  {
    slug: 'dubai-silicon-oasis', name: 'Dubai Silicon Oasis', group: 'East & Deira', tone: 'blush',
    summary: 'A technology park and residential community on the Al Ain Road, with clinics serving residents and workers.',
    notes: [
      'Silicon Oasis is self-contained, and residents tend to use the clinics inside the community for routine care.',
    ],
    gettingThere: 'Reached by car via the Dubai–Al Ain Road.',
    nearby: ['international-city', 'al-warqa', 'mirdif'],
  },
  {
    slug: 'international-city', name: 'International City', group: 'East & Deira', tone: 'lemon',
    summary: 'A large, affordable residential area on the eastern edge of the city, with clinics in its country-themed clusters.',
    notes: [
      'Clinics in International City often focus on routine, budget-conscious care. Ask for a written price and confirm what is included before treatment starts.',
    ],
    gettingThere: 'Mostly reached by car or bus.',
    nearby: ['dubai-silicon-oasis', 'al-warqa', 'mirdif'],
  },
  {
    slug: 'al-safa', name: 'Al Safa', group: 'Jumeirah coast', tone: 'sand',
    summary: 'A residential area between Al Wasl Road and Sheikh Zayed Road, with clinics in villas and small medical centres.',
    notes: [
      'Al Safa sits next to Jumeirah and Al Wasl, so residents often compare clinics across all three. Villa-based clinics here usually have their own parking.',
      'Clinics along the Sheikh Zayed Road edge of Al Safa are easier to reach by metro; the villa streets are better by car.',
    ],
    gettingThere: 'Reached via Al Wasl Road or Sheikh Zayed Road; the Red Line runs along the eastern edge.',
    nearby: ['jumeirah', 'al-quoz', 'downtown-dubai'],
  },
  {
    slug: 'dubai-investment-park', name: 'Dubai Investment Park', group: 'Inland communities', tone: 'lime',
    summary: 'A large mixed industrial and residential district off Sheikh Mohammed Bin Zayed Road, with clinics serving residents and workers.',
    notes: [
      'Dubai Investment Park covers a wide area. Check which part the clinic is in, because driving between the residential and industrial sides takes time.',
      'Many clinics here see shift workers and families from nearby communities; ask about early or late appointments if you need them.',
    ],
    gettingThere: 'Mostly reached by car; the Red Line\'s southern stations are a short drive away.',
    nearby: ['discovery-gardens', 'jvc', 'motor-city'],
  },
  {
    slug: 'discovery-gardens', name: 'Discovery Gardens', group: 'Inland communities', tone: 'sky',
    summary: 'A residential community of themed low-rise buildings near Ibn Battuta, with neighbourhood clinics.',
    notes: [
      'Discovery Gardens residents often use clinics in the community or in nearby Ibn Battuta and Al Furjan. Compare travel time as well as price for treatments that need several visits.',
    ],
    gettingThere: 'Reached via Sheikh Zayed Road; the Red Line stations near Ibn Battuta are close by.',
    nearby: ['dubai-investment-park', 'jlt', 'dubai-marina'],
  },
  {
    slug: 'jvt', name: 'Jumeirah Village Triangle (JVT)', group: 'Inland communities', tone: 'lemon',
    summary: 'A villa and townhouse community next to JVC, with a small number of local clinics.',
    notes: [
      'JVT has fewer clinics than neighbouring JVC, so many residents compare both. The two communities are a few minutes apart by car.',
    ],
    gettingThere: 'Reached by car via Sheikh Mohammed Bin Zayed Road and Al Khail Road.',
    nearby: ['jvc', 'dubai-sports-city', 'motor-city'],
  },
  {
    slug: 'al-mamzar', name: 'Al Mamzar', group: 'East & Deira', tone: 'blush',
    summary: 'A coastal residential area at the northern tip of Deira, next to the Sharjah border.',
    notes: [
      'Al Mamzar borders Sharjah, and some clinics nearby are across the border. Dubai clinics are licensed by the DHA and Sharjah clinics by MOHAP, so check which side a clinic is on.',
    ],
    gettingThere: 'Reached via Al Mamzar and Al Ittihad roads; the Green Line serves nearby parts of Deira.',
    nearby: ['deira', 'al-qusais', 'al-nahda-dubai'],
  },
  {
    slug: 'al-rashidiya', name: 'Al Rashidiya', group: 'East & Deira', tone: 'sky',
    summary: 'A residential area near Dubai International Airport, at the eastern end of the Red Line.',
    notes: [
      'Al Rashidiya is a family area. Residents often compare local clinics with those in neighbouring Mirdif.',
    ],
    gettingThere: 'Centrepoint (formerly Rashidiya) station at the end of the Red Line serves the area.',
    nearby: ['mirdif', 'al-warqa', 'deira'],
  },
  {
    slug: 'dubai-festival-city', name: 'Dubai Festival City', group: 'East & Deira', tone: 'lime',
    summary: 'A waterfront mixed-use district on the Creek, near Al Garhoud, with clinics around Festival City Mall.',
    notes: [
      'Festival City is close to Al Garhoud and the airport; mall-based clinics here usually open into the evening.',
    ],
    gettingThere: 'Reached by car via the Business Bay Crossing and Al Rebat Street, or by taxi from Creek metro station.',
    nearby: ['deira', 'mirdif', 'healthcare-city'],
  },
];

export const dubaiAreaBySlug = (slug: string) =>
  dubaiAreas.find((a) => a.slug === slug || a.aliases?.includes(slug));

export const DUBAI_AREA_GROUPS = ['Marina & JBR', 'Downtown & central', 'Jumeirah coast', 'Old Dubai', 'Inland communities', 'East & Deira'] as const;

// ---------------------------------------------------------------- visit reasons
// The reason a patient is looking for a dentist, the way people actually phrase
// it. Each maps to the treatments a clinic would offer for it.

export type Urgency = 'emergency' | 'soon' | 'routine';

export interface VisitReason {
  slug: string;
  label: string;
  /** Treatment slugs (src/content/services.ts) the reason usually leads to */
  services: string[];
  urgency: Urgency;
  /** One-sentence guidance shown in search and on the reason page */
  advice: string;
  /** Practical things to do before and while booking */
  steps: string[];
  whatToSay: string;
  faqs: Faq[];
}

export const visitReasons: VisitReason[] = [
  {
    slug: 'toothache', label: 'Toothache', services: ['emergency-dentist', 'root-canal'], urgency: 'soon',
    advice: 'Toothache that lasts more than a day or two, keeps you awake or comes with swelling needs a dentist soon, because it often means infection or a deep cavity.',
    steps: [
      'Take an over-the-counter painkiller as directed on the pack, and avoid placing aspirin on the gum.',
      'Rinse with warm salt water and avoid very hot, cold or sugary food on that side.',
      'Book a dentist within a day or two, or the same day if the pain is severe or there is swelling.',
      'If swelling spreads to your eye or neck, or you have trouble breathing or swallowing, call 998.',
    ],
    whatToSay: 'Which tooth hurts, how long it has hurt, whether hot, cold or biting makes it worse, and whether there is any swelling.',
    faqs: [
      { q: 'When is toothache an emergency?', a: 'Go the same day if there is facial swelling, a fever, or pain you cannot control with painkillers. If swelling spreads to your eye or neck or affects breathing, call 998.' },
      { q: 'Will I need a root canal?', a: 'Not always. A dentist will check with an X-ray. Some toothaches are fixed with a filling; others need a root canal or, occasionally, an extraction.' },
    ],
  },
  {
    slug: 'broken-tooth', label: 'Chipped or broken tooth', services: ['emergency-dentist', 'dental-crowns', 'veneers'], urgency: 'soon',
    advice: 'A chipped or broken tooth should be seen within a few days, sooner if it hurts or has a sharp edge, so the dentist can protect it before it cracks further.',
    steps: [
      'Rinse your mouth with warm water and keep any broken piece in milk or a clean container.',
      'Cover a sharp edge with sugar-free gum or dental wax so it does not cut your tongue.',
      'Avoid chewing on that side until the tooth has been checked.',
      'Book a visit within a few days, or the same day if it hurts or the break is large.',
    ],
    whatToSay: 'How it broke, whether it hurts, and whether any piece was lost or kept.',
    faqs: [
      { q: 'Can a broken tooth be fixed?', a: 'Usually. Small chips are repaired with bonding; larger breaks may need a crown, and a break into the nerve may need a root canal first.' },
    ],
  },
  {
    slug: 'swelling', label: 'Swollen face or gum', services: ['emergency-dentist'], urgency: 'emergency',
    advice: 'Swelling from a tooth is a sign of infection and should be seen the same day. Swelling that spreads towards the eye or neck, or affects breathing or swallowing, needs a hospital emergency department.',
    steps: [
      'Call a dental clinic straight away and describe the swelling; many keep same-day slots.',
      'Do not apply heat to the face; a cold compress outside the cheek can ease discomfort.',
      'Note when the swelling started and whether you have a fever.',
      'Go to a hospital emergency department or call 998 if swelling spreads to your eye or neck, or affects breathing or swallowing.',
    ],
    whatToSay: 'Where the swelling is, when it started, whether it is getting bigger, and whether you have a fever.',
    faqs: [
      { q: 'Should I take antibiotics for a dental abscess?', a: 'Antibiotics may help control spreading infection, but the source still needs treatment by a dentist. Do not use leftover antibiotics without advice.' },
    ],
  },
  {
    slug: 'checkup-and-cleaning', label: 'Check-up and cleaning', services: ['teeth-cleaning'], urgency: 'routine',
    advice: 'Most adults benefit from a check-up and professional cleaning every six months; it is the visit that catches problems while they are small.',
    steps: [
      'Check whether your insurance plan includes a dental benefit for check-ups.',
      'Book a time you can keep every six months; many clinics send reminders.',
      'Bring a list of any medicines you take.',
      'Mention any sensitivity, bleeding or pain so the dentist can look closely.',
    ],
    whatToSay: 'When you last had a check-up, any sensitivity or bleeding gums, and whether you need X-rays.',
    faqs: [
      { q: 'Is a check-up covered by insurance?', a: 'Plans that include dental often cover one or two check-ups and cleanings a year. Basic mandatory plans usually do not.' },
    ],
  },
  {
    slug: 'bleeding-gums', label: 'Bleeding gums', services: ['teeth-cleaning'], urgency: 'routine',
    advice: 'Gums that bleed when you brush are usually an early sign of gum disease, which a professional cleaning and better daily care can often reverse.',
    steps: [
      'Keep brushing gently twice a day with a soft brush; stopping makes gum inflammation worse.',
      'Clean between your teeth daily with floss or interdental brushes.',
      'Book a check-up and professional cleaning.',
      'See a dentist sooner if your gums are swollen, painful or your teeth feel loose.',
    ],
    whatToSay: 'How long the bleeding has happened, whether your gums are sore or receding, and whether you smoke.',
    faqs: [
      { q: 'Is bleeding gums serious?', a: 'Early gum disease is very common and treatable. Left alone, it can progress and loosen teeth, so it is worth a check-up.' },
    ],
  },
  {
    slug: 'missing-tooth', label: 'Missing tooth', services: ['dental-implants', 'dental-crowns'], urgency: 'routine',
    advice: 'Replacing a missing tooth stops neighbouring teeth drifting into the gap; implants, bridges and dentures are the main options.',
    steps: [
      'Book a consultation; the dentist will examine the gap and usually take X-rays or a 3D scan.',
      'Ask about all options: implant, bridge and denture, with costs for each.',
      'Check whether your insurance covers any part of the replacement.',
      'Ask how long each option takes, from first visit to final tooth.',
    ],
    whatToSay: 'Which tooth is missing, how long ago it was lost, and whether you have had implants or bridges before.',
    faqs: [
      { q: 'Implant or bridge?', a: 'An implant does not involve the neighbouring teeth but takes months and costs more. A bridge is quicker but needs the teeth either side to be reshaped. A dentist will advise after a scan.' },
    ],
  },
  {
    slug: 'crooked-teeth', label: 'Crooked or gappy teeth', services: ['invisalign', 'braces'], urgency: 'routine',
    advice: 'Crowding, gaps and bite problems are treated with braces or clear aligners, after an orthodontic assessment with X-rays and a scan.',
    steps: [
      'Book an orthodontic assessment with X-rays and a scan.',
      'Ask whether braces or clear aligners suit your bite, and why.',
      'Get the total cost in writing, including retainers.',
      'Ask who will plan and monitor your treatment.',
    ],
    whatToSay: 'What bothers you about your teeth, whether you had braces before, and whether you prefer a removable option.',
    faqs: [
      { q: 'Am I too old for braces?', a: 'No. Adults of any age can straighten their teeth if their gums are healthy.' },
    ],
  },
  {
    slug: 'stained-teeth', label: 'Stained or yellow teeth', services: ['teeth-whitening', 'teeth-cleaning', 'veneers'], urgency: 'routine',
    advice: 'Surface stains often lift with a professional cleaning; deeper yellowing responds to whitening, and stains that do not may need veneers.',
    steps: [
      'Start with a check-up and professional cleaning; surface stain often lifts.',
      'Ask whether whitening will work for your type of staining.',
      'Check how crowns, veneers or fillings on your front teeth will match afterwards.',
      "Avoid buying strong whitening products online without a dentist's advice.",
    ],
    whatToSay: 'Whether the stains are new or long-standing, and whether you have crowns or fillings on your front teeth.',
    faqs: [
      { q: 'Will whitening work on my crowns?', a: 'No. Crowns, veneers and fillings stay the same colour, so plan around them.' },
    ],
  },
  {
    slug: 'smile-makeover', label: 'Smile makeover', services: ['veneers', 'hollywood-smile', 'teeth-whitening'], urgency: 'routine',
    advice: 'A smile makeover is planned around a consultation, photos and a mock-up; good clinics suggest the least invasive option that meets your goal.',
    steps: [
      'Collect photos of smiles you like and note what you want to change.',
      'Book a consultation that includes photos and, ideally, a digital design or mock-up.',
      'Ask for the least invasive option that meets your goal.',
      'Get an itemised quote listing each tooth and the material.',
    ],
    whatToSay: 'What you would like to change, any photos of smiles you like, and your budget range.',
    faqs: [
      { q: 'Do I need veneers on every tooth?', a: 'Usually not. Many people only need the teeth that show when they smile treated, and some need only whitening and bonding.' },
    ],
  },
  {
    slug: 'wisdom-tooth-pain', label: 'Wisdom tooth pain', services: ['wisdom-tooth-removal', 'emergency-dentist'], urgency: 'soon',
    advice: 'Pain and swelling around a back tooth that is coming through is often an infected wisdom tooth; it usually settles with cleaning and treatment, and some teeth need removing.',
    steps: [
      'Rinse with warm salt water after meals and keep the area clean.',
      'Take an over-the-counter painkiller as directed if needed.',
      'Book a dentist within a few days, or sooner if it is hard to open your mouth or you have a fever.',
      'Ask whether the tooth needs removing or can be monitored.',
    ],
    whatToSay: 'Which side hurts, whether it is hard to open your mouth, and whether this has happened before.',
    faqs: [
      { q: 'Do all painful wisdom teeth need removing?', a: 'No. A first flare-up is often treated by cleaning around the tooth. Repeated infections or damage to the next tooth are the usual reasons to remove it.' },
    ],
  },
  {
    slug: 'childs-first-visit', label: 'Child\'s first visit', services: ['pediatric-dentistry'], urgency: 'routine',
    advice: 'Children should see a dentist when their first tooth appears or by their first birthday; early visits are short and mostly about getting comfortable.',
    steps: [
      'Book a short morning visit when your child is rested.',
      'Talk about the visit positively and avoid words like hurt or needle.',
      'Bring any questions about teething, brushing, diet or thumb-sucking.',
      'Ask about fluoride varnish and when fissure sealants might help.',
    ],
    whatToSay: 'Your child\'s age, whether they have any pain or visible marks on their teeth, and whether they are nervous.',
    faqs: [
      { q: 'Should I see a pediatric dentist or a family dentist?', a: 'Either is fine for routine visits. A pediatric specialist helps with very young, anxious or medically complex children.' },
    ],
  },
  {
    slug: 'dental-anxiety', label: 'Nervous about the dentist', services: ['teeth-cleaning', 'pediatric-dentistry'], urgency: 'routine',
    advice: 'If you are anxious, tell the clinic when you book; many dentists offer longer appointments, breaks and, for some treatments, sedation.',
    steps: [
      'Tell the clinic you are nervous when you book.',
      'Ask for a first visit that is only a talk and a look, with no treatment.',
      'Agree a stop signal, such as raising a hand, before treatment starts.',
      'Ask whether longer appointments or sedation are options for the treatment you need.',
    ],
    whatToSay: 'What makes you anxious, whether you would like a first visit without treatment, and whether you want to discuss sedation.',
    faqs: [
      { q: 'Can I have sedation for dental treatment in Dubai?', a: 'Some clinics offer sedation for anxious patients or longer procedures. It must be provided by trained, licensed staff; ask the clinic how they do it.' },
    ],
  },
];

export const visitReasonBySlug = (slug: string) => visitReasons.find((r) => r.slug === slug);
export const reasonsForService = (service: string) => visitReasons.filter((r) => r.services.includes(service));
