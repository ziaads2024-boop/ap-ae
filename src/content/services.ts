import type { ServiceContent } from './types';

// Prices are indicative private-sector ranges for the UAE, written as a guide
// for patients. They are not quotes; every page says so next to the figure.

export const services: ServiceContent[] = [
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    shortName: 'Implants',
    summary:
      'A dental implant is a small titanium or zirconia post placed in the jawbone to replace a missing tooth root, topped with a crown that looks and works like a natural tooth.',
    metaTitle: 'Dental Implants in the UAE: Process, Costs & How to Choose',
    metaDescription:
      'How dental implants work, who they suit, the step-by-step process, healing time and indicative AED costs in the UAE. Compare licensed implant clinics near you.',
    intro: [
      'An implant replaces the part of a tooth you cannot see: the root. Once the post has fused with the bone (osseointegration), it anchors a crown, a bridge or even a full set of teeth. Because it is fixed in bone, it does not rely on neighbouring teeth the way a traditional bridge does.',
      'Implant treatment is a planned, multi-visit process rather than a single appointment. Most of the work happens before anything is placed: a 3D scan (CBCT) to measure bone height and width, a check of gum health, and a plan for where each post should sit.',
      'In the UAE, implants are almost always paid for privately or through a dental add-on with a capped annual limit, so it pays to understand what is included in a quote before you commit.',
    ],
    goodFor: [
      'Replacing one or several missing teeth without filing down healthy neighbours',
      'People whose dentures move when eating or speaking',
      'Adults with healthy gums and enough jawbone, or who can have bone added',
    ],
    notIdealFor: [
      'Heavy smokers, unless they are willing to stop around treatment',
      'People with uncontrolled diabetes or active gum disease, until it is managed',
      'Teenagers whose jaws are still growing',
    ],
    steps: [
      { title: 'Consultation and 3D scan', detail: 'The dentist examines your mouth, reviews your medical history and takes a CBCT scan to check bone volume and nerve position.' },
      { title: 'Treatment plan and quote', detail: 'You receive a written plan listing the implant system, any bone graft, the type of crown and the number of visits.' },
      { title: 'Placing the implant', detail: 'Under local anaesthetic the post is placed in the bone. Most people describe the next few days as sore rather than painful.' },
      { title: 'Healing (osseointegration)', detail: 'The bone fuses to the implant over roughly 2 to 6 months. A temporary tooth can often be worn meanwhile.' },
      { title: 'Abutment and crown', detail: 'A connector (abutment) is fitted and a custom crown is made from a digital or traditional impression.' },
      { title: 'Review and maintenance', detail: 'Regular check-ups and hygienist visits keep the gum around the implant healthy for the long term.' },
    ],
    price: { from: 3500, to: 9500, unit: 'per implant, including the crown', note: 'Bone grafting, sinus lifts and premium implant brands are usually charged on top.' },
    priceFactors: [
      'Implant brand and whether the crown is zirconia or porcelain fused to metal',
      'Need for bone grafting or a sinus lift',
      'Number of implants and whether a full-arch option such as All-on-4 is used',
      'Whether the CBCT scan, temporary tooth and follow-ups are included in the quote',
    ],
    duration: '3 to 9 months from first visit to final crown, depending on healing and grafting',
    recovery: 'Most people return to desk work the next day. Expect swelling for 2 to 4 days and soft foods for about a week.',
    risks: [
      'Infection around the implant (peri-implantitis) if cleaning is neglected',
      'Implant failing to fuse, more common in smokers',
      'Nerve or sinus complications, which careful 3D planning aims to avoid',
    ],
    alternatives: [
      { name: 'Dental bridge', note: 'Fixed and quicker, but the neighbouring teeth are reshaped to support it.', slug: 'dental-crowns' },
      { name: 'Partial or full dentures', note: 'Lower upfront cost and no surgery, but removable and less stable.' },
    ],
    questionsToAsk: [
      'Which implant system do you use, and is it widely available if I need repairs later?',
      'Is the CBCT scan, abutment and final crown included in this price?',
      'Will I need a bone graft, and how did you decide that?',
      'What happens if the implant does not integrate?',
    ],
    faqs: [
      { q: 'Does getting a dental implant hurt?', a: 'The placement is done under local anaesthetic, so you should feel pressure rather than pain. Afterwards, most people manage the soreness with over-the-counter painkillers for a few days.' },
      { q: 'How long do dental implants last?', a: 'The implant post can last decades with good cleaning and regular check-ups. The crown on top typically needs replacing after 10 to 15 years because it wears like any restoration.' },
      { q: 'Does insurance in the UAE cover implants?', a: 'Basic mandatory plans generally do not. Some employer plans include a dental benefit that pays part of the cost up to an annual cap; ask the clinic to request pre-approval from your insurer before treatment.' },
      { q: 'Can I get an implant the same day a tooth is removed?', a: 'Sometimes. Immediate implants are possible when the bone is healthy and there is no infection. Your dentist will confirm this after reviewing the 3D scan.' },
    ],
    related: ['dental-crowns', 'wisdom-tooth-removal', 'veneers'],
    insuranceCategory: 'surgical',
    tone: 'sky',
  },
  {
    slug: 'invisalign',
    name: 'Invisalign & Clear Aligners',
    shortName: 'Invisalign',
    summary:
      'Invisalign is a brand of clear, removable aligners that move teeth gradually using a series of custom trays, each worn for about 22 hours a day.',
    metaTitle: 'Invisalign in the UAE: How It Works, Timeline & Costs',
    metaDescription:
      'A clear guide to Invisalign and clear aligners in the UAE: who they suit, how treatment is planned, how long it takes and indicative AED costs. Find aligner providers near you.',
    intro: [
      'Clear aligners straighten teeth with a sequence of thin plastic trays. Each tray is slightly different from the last, so wearing them in order nudges teeth into a planned position. Invisalign is the best-known brand; several others work on the same principle.',
      'The result depends heavily on two things: the quality of the digital plan made by the dentist or orthodontist, and how consistently you wear the trays. Taking them out for long stretches is the most common reason treatment runs late.',
      'Aligners are removed to eat and brush, which makes them easier to keep clean than fixed braces, but it also means the discipline sits with you rather than with the appliance.',
    ],
    goodFor: [
      'Mild to moderate crowding, spacing and some bite problems',
      'Adults and teens who want a discreet option',
      'People who relapsed after childhood braces',
    ],
    notIdealFor: [
      'Severe bite or jaw discrepancies that may need fixed braces or surgery',
      'Anyone who cannot commit to wearing trays around 22 hours a day',
    ],
    steps: [
      { title: 'Assessment and scan', detail: 'An intraoral 3D scan replaces messy impressions. The clinician checks gums, existing fillings and bite.' },
      { title: 'Digital treatment plan', detail: 'You are shown a simulation of how your teeth should move and an estimate of how many trays you need.' },
      { title: 'Attachments and first trays', detail: 'Small tooth-coloured bumps may be bonded to some teeth to help the trays grip. You leave with your first sets.' },
      { title: 'Regular reviews', detail: 'Check-ins every 6 to 10 weeks confirm teeth are tracking to plan; refinement trays are added if needed.' },
      { title: 'Retention', detail: 'Retainers are essential afterwards. Without them, teeth tend to drift back.' },
    ],
    price: { from: 9000, to: 25000, unit: 'for a full course', note: 'Short "lite" courses for minor corrections cost less; retainers are sometimes extra.' },
    priceFactors: [
      'Complexity of the case and the number of trays',
      'Whether refinements and retainers are included',
      'Whether treatment is led by a specialist orthodontist or a general dentist',
    ],
    duration: 'About 6 to 18 months for most adult cases',
    recovery: 'No recovery time. Each new tray feels tight for a day or two.',
    risks: [
      'Slower or incomplete results if trays are not worn enough',
      'Tooth decay if trays are worn over sugary drinks',
      'Relapse if retainers are not worn after treatment',
    ],
    alternatives: [
      { name: 'Fixed braces', note: 'Better suited to complex movements and not dependent on wear time.', slug: 'braces' },
      { name: 'Veneers', note: 'Change the look of minor crowding without moving teeth, but require removing enamel.', slug: 'veneers' },
    ],
    questionsToAsk: [
      'Are refinement trays and retainers included in the price?',
      'Who will plan and monitor my treatment, and are they an orthodontist?',
      'How many trays does my plan include, and what happens if I need more?',
    ],
    faqs: [
      { q: 'Is Invisalign faster than braces?', a: 'For simple cases it can be similar or slightly faster. For complex cases braces are often more predictable. Your clinician should explain the expected timeline for your specific bite.' },
      { q: 'Can I drink coffee with aligners in?', a: 'Plain water is fine. Anything else, including coffee and juices, is best taken with trays out, followed by rinsing or brushing, to avoid staining and decay.' },
      { q: 'Do I need to see an orthodontist for clear aligners?', a: 'Not always. Many general dentists offer aligners for straightforward cases. For bite problems or significant crowding, a specialist orthodontist is a sensible choice.' },
      { q: 'Does insurance pay for Invisalign in the UAE?', a: 'Orthodontic treatment for adults is rarely covered. A few premium plans include orthodontics for children or have a separate orthodontic limit; check your policy wording.' },
    ],
    related: ['braces', 'teeth-whitening', 'veneers'],
    insuranceCategory: 'orthodontic',
    tone: 'lime',
  },
  {
    slug: 'braces',
    name: 'Braces',
    shortName: 'Braces',
    summary:
      'Braces are fixed brackets and wires that apply steady pressure to move teeth and correct the bite, suitable for children, teens and adults.',
    metaTitle: 'Braces in the UAE: Types, Treatment Time & Costs',
    metaDescription:
      'Metal, ceramic and lingual braces explained: how they work, how long treatment takes, aftercare and indicative AED costs in the UAE. Find orthodontists near you.',
    intro: [
      'Braces are the most versatile way to straighten teeth. Brackets are bonded to each tooth and connected by an archwire; the orthodontist adjusts the wire over time to guide teeth into place.',
      'Metal braces are the most economical and robust. Ceramic brackets blend in with the teeth, and lingual braces sit on the inside surface so they are hidden from view, at a higher cost.',
      'Because braces cannot be taken out, they suit people who want a predictable result without relying on daily willpower, including younger patients.',
    ],
    goodFor: [
      'Children and teens with crowding or bite problems',
      'Complex movements such as rotations and deep or open bites',
      'Patients who prefer not to manage removable trays',
    ],
    notIdealFor: [
      'People with active gum disease, until it is treated',
      'Anyone unable to attend regular adjustment appointments',
    ],
    steps: [
      { title: 'Orthodontic assessment', detail: 'X-rays, photos and a scan show how the teeth and jaws relate. The orthodontist explains options and timeline.' },
      { title: 'Fitting', detail: 'Brackets are bonded in one visit of about an hour. Teeth often feel tender for the first week.' },
      { title: 'Adjustments', detail: 'Visits every 4 to 8 weeks to change wires or elastics.' },
      { title: 'Removal and retainers', detail: 'Brackets are removed and polished off. Fixed or removable retainers hold the result.' },
    ],
    price: { from: 6000, to: 20000, unit: 'for a full course', note: 'Ceramic and lingual braces sit at the upper end; retainers may be charged separately.' },
    priceFactors: [
      'Type of bracket: metal, ceramic, self-ligating or lingual',
      'Length and complexity of treatment',
      'Specialist orthodontist fees versus general dentist',
    ],
    duration: 'Usually 12 to 24 months',
    recovery: 'Soreness for a few days after fitting and after each adjustment.',
    risks: [
      'White spots or decay around brackets if brushing is poor',
      'Gum irritation and mouth ulcers early on',
      'Relapse without retainers',
    ],
    alternatives: [
      { name: 'Clear aligners', note: 'Removable and discreet, best for mild to moderate cases.', slug: 'invisalign' },
    ],
    questionsToAsk: [
      'How long do you expect my treatment to take, and what could extend it?',
      'Are retainers and emergency repairs included?',
      'What should I do if a bracket comes loose?',
    ],
    faqs: [
      { q: 'What is the best age for braces?', a: 'An orthodontic check around age 7 can spot problems early, but most full treatment starts between about 10 and 14. Adults can have braces at any age if their gums are healthy.' },
      { q: 'Are ceramic braces weaker than metal?', a: 'Ceramic brackets are slightly more brittle and can stain if you drink a lot of coffee or tea, but they work well for most cases.' },
      { q: 'Can I eat normally with braces?', a: 'Most foods are fine. Avoid very hard, sticky or chewy foods such as nuts, toffee and ice, which can break brackets.' },
    ],
    related: ['invisalign', 'pediatric-dentistry', 'teeth-cleaning'],
    insuranceCategory: 'orthodontic',
    tone: 'lemon',
  },
  {
    slug: 'veneers',
    name: 'Veneers',
    shortName: 'Veneers',
    summary:
      'Veneers are thin shells of porcelain or composite bonded to the front of teeth to change their colour, shape or size.',
    metaTitle: 'Veneers in the UAE: Porcelain vs Composite, Process & Costs',
    metaDescription:
      'Porcelain and composite veneers compared: what they fix, how much enamel is removed, how long they last and indicative AED costs in the UAE. Find cosmetic dentists near you.',
    intro: [
      'A veneer covers the visible surface of a tooth. Porcelain veneers are made in a lab and are highly stain-resistant; composite veneers are sculpted directly onto the tooth in the chair and cost less, but they wear and stain faster.',
      'Most porcelain veneers need a thin layer of enamel removed so they sit flush. That step cannot be undone, which is why a careful consultation, a mock-up and an honest conversation about expectations matter more than the price.',
      'Veneers change appearance; they do not straighten a bite or treat decay. Good candidates have healthy gums and teeth, or have had those problems treated first.',
    ],
    goodFor: [
      'Chipped, worn or slightly misshapen front teeth',
      'Discolouration that whitening cannot lift',
      'Small gaps that you would rather close without orthodontics',
    ],
    notIdealFor: [
      'People who grind their teeth heavily, unless a night guard is worn',
      'Teeth with large fillings or active decay',
      'Significant crowding, which is often better treated with orthodontics first',
    ],
    steps: [
      { title: 'Smile consultation', detail: 'Photos, a scan and a discussion of shade and shape. Many clinics offer a digital smile design.' },
      { title: 'Mock-up', detail: 'A temporary trial lets you see and feel the proposed shape before any enamel is removed.' },
      { title: 'Preparation', detail: 'A thin layer of enamel is removed where needed and an impression or scan is taken. Temporaries are fitted.' },
      { title: 'Bonding', detail: 'The finished veneers are checked for fit and colour, then bonded in place and the bite is adjusted.' },
    ],
    price: { from: 800, to: 4000, unit: 'per tooth', note: 'Composite veneers start lower; lab-made porcelain or E.max veneers sit at the higher end.' },
    priceFactors: [
      'Material: composite, porcelain or lithium disilicate (E.max)',
      'Number of teeth treated',
      'Whether a mock-up and digital smile design are included',
    ],
    duration: 'Two to three visits over about 1 to 3 weeks for porcelain; one visit for composite',
    recovery: 'Some temperature sensitivity for a few days is common.',
    risks: [
      'Irreversible enamel removal',
      'Chipping or debonding, especially with grinding',
      'Colour mismatch if not planned carefully',
    ],
    alternatives: [
      { name: 'Teeth whitening', note: 'Lightens natural teeth without removing enamel.', slug: 'teeth-whitening' },
      { name: 'Composite bonding', note: 'Repairs small chips with no or minimal preparation.' },
      { name: 'Clear aligners', note: 'Straighten teeth first so fewer or thinner veneers are needed.', slug: 'invisalign' },
    ],
    questionsToAsk: [
      'How much enamel will you remove, and on which teeth?',
      'Can I try a mock-up before you prepare my teeth?',
      'Which lab makes the veneers, and what is the guarantee?',
    ],
    faqs: [
      { q: 'How long do porcelain veneers last?', a: 'With good care, porcelain veneers commonly last 10 to 15 years. Composite veneers usually need polishing or repair sooner, often within 5 to 7 years.' },
      { q: 'Can veneers be removed later?', a: 'Porcelain veneers can be replaced but the tooth underneath will always need some covering because enamel was removed. Some composite veneers can be done with little or no preparation.' },
      { q: 'Are veneers the same as a Hollywood smile?', a: 'A Hollywood smile usually means veneers or crowns on many upper and lower teeth to create a uniform bright smile. It is a larger, more expensive version of the same treatment.' },
    ],
    related: ['hollywood-smile', 'teeth-whitening', 'invisalign'],
    insuranceCategory: 'cosmetic',
    tone: 'blush',
  },
  {
    slug: 'hollywood-smile',
    name: 'Hollywood Smile',
    shortName: 'Hollywood Smile',
    summary:
      'A "Hollywood smile" is a full smile makeover, usually veneers or crowns on most visible upper and lower teeth, planned to give an even, bright result.',
    metaTitle: 'Hollywood Smile in the UAE: What It Involves & What It Costs',
    metaDescription:
      'What a Hollywood smile really involves, how it is planned, how to avoid an over-white or bulky result, and indicative AED costs in the UAE. Find cosmetic dentists near you.',
    intro: [
      'The term is popular in the Gulf for a smile makeover that treats many front teeth at once, typically 16 to 20 veneers or crowns. Done well, it looks natural. Done in a rush, it can look bulky or unnaturally white.',
      'Because it is a large, mostly irreversible change, the planning stage is the treatment. A good clinic will check gums and bite, may suggest whitening or orthodontics first, and will let you test the shape with a mock-up.',
      'Ask to see before-and-after photos of the dentist\'s own cases, and look at the proposed shade in daylight as well as under clinic lights.',
    ],
    goodFor: [
      'People with several worn, chipped or discoloured front teeth',
      'Patients who want a co-ordinated change rather than treating teeth one at a time',
    ],
    notIdealFor: [
      'Healthy teeth that only need whitening or minor bonding',
      'Untreated gum disease, decay or heavy grinding',
    ],
    steps: [
      { title: 'Full assessment', detail: 'Gum health, bite, existing restorations and facial proportions are reviewed.' },
      { title: 'Digital design and mock-up', detail: 'A digital plan and a trial smile let you approve shape and length.' },
      { title: 'Preparation and temporaries', detail: 'Teeth are prepared and a temporary smile is worn while the lab works.' },
      { title: 'Fit and fine-tune', detail: 'Final veneers or crowns are bonded and the bite is balanced. A night guard is often advised.' },
    ],
    price: { from: 15000, to: 60000, unit: 'for a full upper and lower makeover', note: 'Depends mainly on the number of teeth and the material used.' },
    priceFactors: [
      'Number of teeth treated',
      'Composite, porcelain, E.max or zirconia',
      'Any gum contouring, whitening or orthodontics needed first',
    ],
    duration: 'Typically 2 to 4 weeks once planning is complete',
    recovery: 'Short-term sensitivity and a period of getting used to the new shape and bite.',
    risks: [
      'Over-preparation of healthy teeth',
      'Unnatural shade or bulky contours if poorly planned',
      'Gum inflammation if margins are not well finished',
    ],
    alternatives: [
      { name: 'Whitening plus bonding', note: 'Less invasive and lower cost for mostly healthy teeth.', slug: 'teeth-whitening' },
      { name: 'Fewer veneers', note: 'Treating only the 6 to 10 teeth that show when you smile.', slug: 'veneers' },
    ],
    questionsToAsk: [
      'How many teeth do I actually need treated, and why?',
      'Can I see your own before-and-after cases?',
      'What shade do you recommend for my skin tone and age?',
    ],
    faqs: [
      { q: 'Is a Hollywood smile permanent?', a: 'It is long-lasting but not permanent. Porcelain veneers and crowns generally need replacing after 10 to 15 years, and the underlying teeth will always need covering.' },
      { q: 'Will it look fake?', a: 'Not if the shade, length and shape are matched to your face. Ask for a mock-up and choose a shade that looks natural in daylight.' },
    ],
    related: ['veneers', 'teeth-whitening', 'dental-crowns'],
    insuranceCategory: 'cosmetic',
    tone: 'blush',
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    shortName: 'Whitening',
    summary:
      'Professional teeth whitening uses a peroxide gel, applied in the clinic or with custom home trays, to lighten the natural colour of teeth by several shades.',
    metaTitle: 'Teeth Whitening in the UAE: In-Clinic vs Home Kits & Costs',
    metaDescription:
      'In-clinic and take-home teeth whitening compared: results, sensitivity, how long it lasts and indicative AED costs in the UAE. Find whitening providers near you.',
    intro: [
      'Whitening works by letting peroxide break down stain molecules inside the enamel. In-clinic whitening uses a stronger gel with the gums protected; take-home whitening uses custom trays with a milder gel over one to two weeks.',
      'Whitening only lightens natural tooth structure. Crowns, veneers and fillings stay the same colour, so if you have visible restorations near the front, plan for that before starting.',
      'Sensitivity during and after whitening is common and usually temporary. Your dentist can adjust strength and timing, and recommend a desensitising toothpaste.',
    ],
    goodFor: [
      'Yellowing from age, coffee, tea or smoking',
      'People planning veneers who want the remaining teeth lighter first',
    ],
    notIdealFor: [
      'Pregnant or breastfeeding patients',
      'Untreated decay or exposed roots',
      'Grey staining from certain medicines, which may need veneers instead',
    ],
    steps: [
      { title: 'Check-up and shade record', detail: 'The dentist checks for decay and gum issues and records your starting shade.' },
      { title: 'Cleaning', detail: 'A scale and polish removes surface stain so the gel works evenly.' },
      { title: 'Whitening session or trays', detail: 'Either a 60 to 90 minute in-clinic session or custom trays for home use.' },
      { title: 'Maintenance', detail: 'Occasional top-ups with your trays keep the result.' },
    ],
    price: { from: 700, to: 3000, unit: 'per treatment', note: 'Take-home tray kits sit at the lower end; in-clinic systems at the higher end.' },
    priceFactors: [
      'In-clinic system versus take-home trays, or both combined',
      'Whether a cleaning is included',
      'Number of sessions',
    ],
    duration: 'One clinic visit, or 1 to 2 weeks with home trays',
    recovery: 'Avoid strongly coloured food and drinks for 48 hours.',
    risks: [
      'Temporary sensitivity',
      'Gum irritation if gel touches soft tissue',
      'Uneven results where restorations do not whiten',
    ],
    alternatives: [
      { name: 'Scale and polish', note: 'Removes surface stain and is often enough on its own.', slug: 'teeth-cleaning' },
      { name: 'Veneers', note: 'For stains that whitening cannot shift.', slug: 'veneers' },
    ],
    questionsToAsk: [
      'Which whitening system do you use and what concentration?',
      'Are my fillings or crowns going to look different afterwards?',
      'Are custom trays included for top-ups?',
    ],
    faqs: [
      { q: 'How long does whitening last?', a: 'Typically 6 months to 2 years, depending on diet and habits. Occasional top-ups with custom trays extend the result.' },
      { q: 'Are whitening kits from shops safe?', a: 'Over-the-counter products are weaker and generic trays can let gel touch the gums. Professional whitening is supervised and more predictable.' },
      { q: 'Does whitening damage enamel?', a: 'Used as directed, professional peroxide whitening does not damage enamel. Overuse can increase sensitivity, so follow your dentist\'s schedule.' },
    ],
    related: ['teeth-cleaning', 'veneers', 'hollywood-smile'],
    insuranceCategory: 'cosmetic',
    tone: 'lemon',
  },
  {
    slug: 'root-canal',
    name: 'Root Canal Treatment',
    shortName: 'Root Canal',
    summary:
      'Root canal treatment removes infected or inflamed pulp from inside a tooth, cleans and seals the canals, and lets you keep the tooth instead of extracting it.',
    metaTitle: 'Root Canal Treatment in the UAE: What to Expect & Costs',
    metaDescription:
      'Why root canal treatment is needed, what happens during the procedure, recovery, whether you need a crown afterwards and indicative AED costs in the UAE.',
    intro: [
      'Inside each tooth is soft tissue called pulp. Deep decay, a crack or trauma can let bacteria reach it, causing pain, swelling or an abscess. A root canal removes that tissue, disinfects the canals and fills them.',
      'Modern root canal treatment is usually no more uncomfortable than a large filling. The pain people associate with it is normally the infection beforehand, which the treatment relieves.',
      'Back teeth that have had a root canal are more brittle, so a crown is often recommended afterwards to stop the tooth cracking.',
    ],
    goodFor: [
      'Lingering pain to hot or cold, or pain when biting',
      'An abscess or swelling linked to a tooth',
      'A tooth that is restorable and worth saving',
    ],
    notIdealFor: [
      'Teeth with too little structure left to restore, where extraction and replacement may be better',
    ],
    steps: [
      { title: 'Diagnosis', detail: 'X-rays and tests confirm which tooth is affected.' },
      { title: 'Numbing and access', detail: 'Local anaesthetic is given and a small opening made through the top of the tooth.' },
      { title: 'Cleaning and shaping', detail: 'The canals are cleaned with fine instruments and disinfecting solutions.' },
      { title: 'Filling and sealing', detail: 'Canals are filled with a rubber-like material and the access is sealed.' },
      { title: 'Crown if needed', detail: 'A crown protects back teeth from fracture.' },
    ],
    price: { from: 1000, to: 4500, unit: 'per tooth', note: 'Molars cost more than front teeth; the crown is usually a separate fee.' },
    priceFactors: [
      'Front tooth, premolar or molar (number of canals)',
      'Whether a specialist endodontist treats it',
      'Retreatment of an old root canal costs more',
    ],
    duration: '1 to 2 visits of about 60 to 90 minutes each',
    recovery: 'Tenderness for a few days. Avoid chewing hard food on the tooth until it is fully restored.',
    risks: [
      'Persistent infection that may need retreatment',
      'Tooth fracture if left without a crown',
      'Rarely, a broken instrument or missed canal',
    ],
    alternatives: [
      { name: 'Extraction and implant', note: 'Removes the tooth; replacement is then needed to avoid shifting.', slug: 'dental-implants' },
    ],
    questionsToAsk: [
      'Do I need a crown afterwards, and what will it cost?',
      'Is this being done by an endodontist or a general dentist?',
      'How will you know the infection has cleared?',
    ],
    faqs: [
      { q: 'Is root canal treatment painful?', a: 'With local anaesthetic it should feel similar to having a filling. You may be tender for a few days afterwards.' },
      { q: 'Is it better to pull the tooth?', a: 'Keeping your natural tooth is usually best if it can be restored. Extraction is quicker but replacing the tooth with an implant or bridge costs more over time.' },
      { q: 'Does insurance cover root canals in the UAE?', a: 'Many employer plans with dental cover treat root canals as basic restorative care, usually with a co-payment and an annual limit. Mandatory basic plans often exclude it.' },
    ],
    related: ['dental-crowns', 'emergency-dentist', 'dental-implants'],
    insuranceCategory: 'restorative',
    tone: 'sand',
  },
  {
    slug: 'teeth-cleaning',
    name: 'Teeth Cleaning (Scale & Polish)',
    shortName: 'Cleaning',
    summary:
      'A professional scale and polish removes hardened plaque (tartar) and surface stains that brushing cannot shift, helping prevent gum disease and decay.',
    metaTitle: 'Teeth Cleaning in the UAE: Scale & Polish, Frequency & Costs',
    metaDescription:
      'What happens during a professional teeth cleaning, how often you need one, deep cleaning for gum disease and indicative AED costs in the UAE. Find hygienists near you.',
    intro: [
      'Even with good brushing, plaque hardens into tartar in places a toothbrush misses, especially behind the lower front teeth and along the gumline. A hygienist or dentist removes it with ultrasonic and hand instruments, then polishes the teeth.',
      'Regular cleaning is one of the most cost-effective things you can do for your teeth. It lets the dentist spot problems early, when they are cheaper and simpler to treat.',
      'If your gums bleed easily or you have pockets around the teeth, a deeper cleaning below the gumline may be recommended, often over more than one visit.',
    ],
    goodFor: [
      'Everyone, typically every 6 months',
      'People with bleeding gums, bad breath or visible tartar',
      'Before whitening, to get an even result',
    ],
    notIdealFor: [],
    steps: [
      { title: 'Check of gums', detail: 'The gums are checked for bleeding and pocket depth.' },
      { title: 'Scaling', detail: 'Tartar is removed with an ultrasonic scaler and hand tools.' },
      { title: 'Polishing', detail: 'Teeth are polished to remove stain and make them smoother.' },
      { title: 'Advice', detail: 'You get tailored brushing and flossing tips and a recall date.' },
    ],
    price: { from: 200, to: 700, unit: 'per visit', note: 'Deep cleaning for gum disease is usually charged per quadrant and costs more.' },
    priceFactors: [
      'Routine scale and polish versus deep cleaning',
      'Air-polishing or stain removal add-ons',
      'Whether an examination and X-rays are bundled',
    ],
    duration: '30 to 60 minutes',
    recovery: 'None. Gums may feel tender for a day.',
    risks: ['Brief sensitivity', 'Minor gum bleeding, which settles quickly'],
    alternatives: [],
    questionsToAsk: [
      'Do I need a deeper cleaning, and why?',
      'Is the check-up and X-ray included?',
      'How often should I come back?',
    ],
    faqs: [
      { q: 'How often should I get my teeth cleaned?', a: 'Every 6 months suits most people. If you have gum disease or build tartar quickly, your dentist may suggest every 3 to 4 months.' },
      { q: 'Does cleaning damage enamel?', a: 'No. Professional scaling removes tartar, not enamel. Teeth can feel different afterwards simply because the tartar has gone.' },
      { q: 'Is teeth cleaning covered by insurance?', a: 'Plans that include dental often cover one or two cleanings a year as preventive care. Basic mandatory plans typically do not.' },
    ],
    related: ['teeth-whitening', 'pediatric-dentistry', 'root-canal'],
    insuranceCategory: 'preventive',
    tone: 'lime',
  },
  {
    slug: 'emergency-dentist',
    name: 'Emergency Dentist',
    shortName: 'Emergency',
    summary:
      'An emergency dentist treats urgent problems such as severe toothache, swelling, a knocked-out tooth or a broken tooth, usually the same day.',
    metaTitle: 'Emergency Dentist in the UAE: What Counts as Urgent & What to Do',
    metaDescription:
      'What counts as a dental emergency, what to do before you reach the clinic, when to go to a hospital instead and typical emergency visit costs in the UAE.',
    intro: [
      'Dental emergencies are usually pain, swelling, trauma or bleeding that will not stop. Many private clinics in the UAE keep same-day slots for urgent cases, and some open late or at weekends. Always phone first to confirm they can see you.',
      'Go straight to a hospital emergency department, or call 998 for an ambulance, if swelling is spreading to your eye or neck, you have difficulty breathing or swallowing, or there was a serious injury to the face or head.',
      'A first emergency visit aims to relieve pain and control infection. The full repair, such as a root canal or crown, is often booked separately.',
    ],
    goodFor: [
      'Severe or throbbing toothache',
      'A knocked-out or loosened adult tooth',
      'A cracked tooth, lost filling or crown with pain',
      'Facial swelling from a tooth',
    ],
    notIdealFor: [
      'Life-threatening swelling or breathing difficulty, which needs a hospital emergency department',
    ],
    steps: [
      { title: 'Call ahead', detail: 'Describe the problem so the clinic can prioritise and tell you what to bring.' },
      { title: 'Assessment', detail: 'Examination and an X-ray to find the cause.' },
      { title: 'Relief', detail: 'Pain relief, draining an abscess, a temporary filling or splinting a tooth.' },
      { title: 'Follow-up plan', detail: 'Booking the definitive treatment and, if needed, antibiotics.' },
    ],
    price: { from: 200, to: 800, unit: 'for the emergency consultation and X-ray', note: 'Any treatment done during the visit is charged on top.' },
    priceFactors: ['Out-of-hours surcharges', 'Treatment carried out on the day', 'Specialist involvement'],
    duration: '30 to 90 minutes',
    recovery: 'Depends on the cause and treatment given.',
    risks: ['Delaying care can let an infection spread'],
    alternatives: [],
    questionsToAsk: [
      'Can you see me today, and what is the consultation fee?',
      'Will you treat the problem today or only relieve the pain?',
      'Do you bill my insurance directly for emergency care?',
    ],
    faqs: [
      { q: 'What should I do if a tooth is knocked out?', a: 'Hold it by the crown, not the root. Rinse briefly if dirty, try to place it back in the socket, or keep it in milk, and see a dentist within the hour if possible.' },
      { q: 'Can I go to a hospital for toothache?', a: 'Hospital emergency departments manage serious swelling, trauma and infection. For toothache alone, an emergency dental clinic is usually quicker and better equipped.' },
      { q: 'Does insurance cover emergency dental treatment?', a: 'Many UAE health plans, including some basic plans, cover emergency dental care to relieve pain or treat infection. Cosmetic or follow-up work is usually not covered under that benefit.' },
    ],
    related: ['root-canal', 'wisdom-tooth-removal', 'dental-crowns'],
    insuranceCategory: 'emergency',
    tone: 'blush',
  },
  {
    slug: 'pediatric-dentistry',
    name: 'Children\'s Dentistry',
    shortName: 'Kids',
    summary:
      'Pediatric dentistry is dental care for babies, children and teens, focused on prevention, gentle treatment and keeping young patients comfortable.',
    metaTitle: 'Children\'s Dentist in the UAE: First Visits, Prevention & Costs',
    metaDescription:
      'When to book your child\'s first dental visit, fissure sealants and fluoride, handling nervous children and indicative AED costs in the UAE. Find family dentists near you.',
    intro: [
      'Children\'s teeth are smaller, have thinner enamel and decay faster than adult teeth. A pediatric dentist or family dentist focuses on prevention: check-ups, fluoride varnish, fissure sealants and diet advice.',
      'The first visit is recommended when the first tooth appears or by the first birthday. Early visits are short and mostly about getting the child comfortable in the chair.',
      'Baby teeth matter even though they fall out: they hold space for adult teeth and decay in them can cause pain and infection.',
    ],
    goodFor: [
      'First visits and routine check-ups',
      'Fissure sealants on new adult molars',
      'Nervous children who need extra time',
    ],
    notIdealFor: [],
    steps: [
      { title: 'Friendly introduction', detail: 'A short visit where the child meets the team and has a look around.' },
      { title: 'Check-up', detail: 'Teeth and gums are checked and parents get brushing and diet tips.' },
      { title: 'Prevention', detail: 'Fluoride varnish and fissure sealants where needed.' },
      { title: 'Treatment if needed', detail: 'Fillings or extractions with child-appropriate techniques, sometimes with sedation for extensive work.' },
    ],
    price: { from: 200, to: 600, unit: 'per check-up', note: 'Fillings, sealants and sedation are priced separately.' },
    priceFactors: ['Specialist pediatric dentist versus general dentist', 'Treatment needed', 'Sedation or general anaesthetic'],
    duration: '20 to 45 minutes for a check-up',
    recovery: 'None for check-ups.',
    risks: ['Anxiety, which a child-focused team helps manage'],
    alternatives: [],
    questionsToAsk: [
      'How do you help nervous children?',
      'Do you recommend fissure sealants for my child?',
      'Can I stay in the room during treatment?',
    ],
    faqs: [
      { q: 'When should my child first see a dentist?', a: 'When the first tooth appears or by age one. Early visits make later ones easier.' },
      { q: 'Are fissure sealants worth it?', a: 'For many children, yes. They protect the grooves of back teeth, where most childhood decay starts.' },
      { q: 'Does insurance cover children\'s dental care?', a: 'Family plans with dental benefits often cover check-ups and basic treatment. Some government programmes for UAE nationals include children\'s dental care.' },
    ],
    related: ['teeth-cleaning', 'braces', 'emergency-dentist'],
    insuranceCategory: 'pediatric',
    tone: 'lime',
  },
  {
    slug: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    shortName: 'Wisdom Teeth',
    summary:
      'Wisdom tooth removal is the extraction of one or more third molars, usually because they are impacted, infected or damaging neighbouring teeth.',
    metaTitle: 'Wisdom Tooth Removal in the UAE: When It\'s Needed, Recovery & Costs',
    metaDescription:
      'When wisdom teeth need removing, simple versus surgical extraction, recovery tips and indicative AED costs in the UAE. Find oral surgeons and dentists near you.',
    intro: [
      'Wisdom teeth are the last molars to come through, usually between 17 and 25. Many people have no room for them, so they come in at an angle or stay partly under the gum (impacted).',
      'Not every wisdom tooth needs removing. Extraction is usually advised when there is repeated infection, decay, damage to the tooth in front, or a cyst.',
      'A simple extraction is quick. An impacted tooth needs a minor surgical procedure, which an oral surgeon or experienced dentist performs, sometimes with sedation.',
    ],
    goodFor: [
      'Repeated gum infections around a wisdom tooth (pericoronitis)',
      'Decay that cannot be cleaned or filled',
      'Damage to the second molar',
    ],
    notIdealFor: ['Healthy, fully erupted wisdom teeth that can be cleaned well'],
    steps: [
      { title: 'X-ray or 3D scan', detail: 'Shows the tooth\'s position and its relation to the nerve.' },
      { title: 'Anaesthesia', detail: 'Local anaesthetic, with sedation available for anxious patients or complex cases.' },
      { title: 'Removal', detail: 'Simple extraction, or a small incision and sectioning of the tooth if impacted.' },
      { title: 'Aftercare', detail: 'Stitches if needed, written instructions and a review appointment.' },
    ],
    price: { from: 400, to: 3500, unit: 'per tooth', note: 'Surgical removal of impacted teeth and sedation sit at the upper end.' },
    priceFactors: ['Simple versus surgical extraction', 'Sedation or general anaesthetic', 'Oral surgeon versus general dentist'],
    duration: '20 to 60 minutes per tooth',
    recovery: 'Swelling peaks at 2 to 3 days; most people take 1 to 3 days off work after surgical removal.',
    risks: ['Dry socket', 'Infection', 'Temporary numbness if the tooth is close to the nerve'],
    alternatives: [
      { name: 'Monitoring', note: 'Regular X-rays to watch a symptom-free tooth.' },
    ],
    questionsToAsk: [
      'Does this tooth actually need removing, and what happens if I wait?',
      'How close is it to the nerve?',
      'Will I need sedation and time off work?',
    ],
    faqs: [
      { q: 'How painful is wisdom tooth removal?', a: 'The procedure itself is numbed. Afterwards, soreness and swelling are normal for a few days and are usually controlled with painkillers your dentist recommends.' },
      { q: 'What is a dry socket?', a: 'A painful condition when the blood clot is lost from the socket. Avoid smoking, straws and vigorous rinsing for the first few days to reduce the risk.' },
      { q: 'Should all four wisdom teeth be removed at once?', a: 'Sometimes it is convenient, particularly under sedation. Your dentist will advise based on which teeth are causing problems.' },
    ],
    related: ['emergency-dentist', 'dental-implants', 'root-canal'],
    insuranceCategory: 'surgical',
    tone: 'sky',
  },
  {
    slug: 'dental-crowns',
    name: 'Dental Crowns',
    shortName: 'Crowns',
    summary:
      'A dental crown is a custom cap that covers a damaged or weakened tooth to restore its shape, strength and appearance.',
    metaTitle: 'Dental Crowns in the UAE: Materials, Process & Costs',
    metaDescription:
      'When you need a crown, zirconia vs porcelain vs E.max, how they are fitted, how long they last and indicative AED costs in the UAE. Find dentists near you.',
    intro: [
      'Crowns protect teeth that are cracked, heavily filled or root-canal treated, and they cap dental implants. The tooth is shaped, scanned, and a crown is made to fit over it.',
      'Zirconia is very strong and suits back teeth; lithium disilicate (E.max) and layered porcelain give the most natural look for front teeth. Metal-based crowns are now less common but still durable.',
      'Some clinics mill crowns on site and can fit them the same day; others use an external lab, which usually means a temporary crown for a week or two.',
    ],
    goodFor: ['Cracked or heavily filled teeth', 'Back teeth after a root canal', 'Covering an implant'],
    notIdealFor: ['Teeth that only need a small filling'],
    steps: [
      { title: 'Preparation', detail: 'The tooth is numbed and shaped to make room for the crown.' },
      { title: 'Scan or impression', detail: 'A digital scan or mould is taken and a shade chosen.' },
      { title: 'Temporary crown', detail: 'Protects the tooth while the final crown is made, unless it is milled same-day.' },
      { title: 'Fitting', detail: 'The crown is checked for fit and bite, then cemented or bonded.' },
    ],
    price: { from: 1200, to: 4500, unit: 'per crown', note: 'Zirconia and E.max cost more than metal-based crowns.' },
    priceFactors: ['Material', 'Same-day milling versus external lab', 'Any build-up or post needed first'],
    duration: 'One visit with same-day milling, or two visits about 1 to 2 weeks apart',
    recovery: 'Minor sensitivity for a few days.',
    risks: ['Sensitivity', 'Chipping of porcelain', 'Decay at the edge if hygiene is poor'],
    alternatives: [
      { name: 'Onlay', note: 'A partial crown that keeps more natural tooth.' },
      { name: 'Large filling', note: 'Cheaper short-term, but weaker on heavily damaged teeth.' },
    ],
    questionsToAsk: ['Which material do you recommend for this tooth, and why?', 'Is the crown made on site or by a lab?', 'Is there a guarantee?'],
    faqs: [
      { q: 'How long does a crown last?', a: 'Commonly 10 to 15 years or more, depending on material, bite forces and hygiene.' },
      { q: 'Does getting a crown hurt?', a: 'The tooth is numbed while it is prepared. It may feel sensitive for a few days afterwards.' },
    ],
    related: ['root-canal', 'dental-implants', 'veneers'],
    insuranceCategory: 'restorative',
    tone: 'sand',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Services that have hand-written service + emirate guides */
export const LOCAL_GUIDE_SERVICES = [
  'dental-implants',
  'invisalign',
  'braces',
  'veneers',
  'teeth-whitening',
  'root-canal',
  'emergency-dentist',
  'pediatric-dentistry',
];
