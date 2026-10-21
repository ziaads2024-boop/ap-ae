import type { Faq } from './types';

// Hand-written guidance on using health insurance for dental care in the UAE.
// It is deliberately general: cover depends on the individual policy, so the
// pages tell readers what to check rather than stating what a plan includes.

export const insuranceBasics: { title: string; text: string }[] = [
  {
    title: 'Dental cover is usually an add-on',
    text: 'Health insurance is mandatory for residents in Dubai and Abu Dhabi, but the basic plans that meet the legal minimum usually include little or no routine dental care. Dental benefits normally come with an enhanced or employer plan, often with a separate annual limit.',
  },
  {
    title: 'Direct billing or pay and claim',
    text: 'If a clinic is in your insurer\'s network, it can usually bill the insurer directly and you pay only your share (the co-payment). At a clinic outside the network you normally pay in full and claim the money back, if your plan allows it.',
  },
  {
    title: 'Pre-approval for bigger treatment',
    text: 'Insurers commonly ask the clinic for approval before root canal treatment, crowns, extractions under sedation and similar work. Ask the clinic to request it before you start, and keep the reference number.',
  },
  {
    title: 'Cosmetic treatment is usually excluded',
    text: 'Whitening, veneers for appearance and smile makeovers are generally not covered. Orthodontics is often excluded for adults or limited to children. Check the exclusions list in your policy document.',
  },
];

export const insuranceQuestions = [
  'Is dental treatment included in my plan, and what is the annual dental limit?',
  'Is this clinic in my network for dental, not just for medical visits?',
  'What is my co-payment or co-insurance percentage for dental treatment?',
  'Does this treatment need pre-approval, and who requests it?',
  'Is there a waiting period before dental benefits start?',
  'Which treatments are excluded as cosmetic?',
];

export const insuranceFaqs: Faq[] = [
  {
    q: 'Does health insurance in Dubai cover dental treatment?',
    a: 'Only if your plan includes a dental benefit. The basic plans that meet Dubai\'s legal minimum usually cover little or no routine dental care, while many employer and enhanced plans add dental cover with an annual limit. Your policy document or insurer\'s app lists what is included.',
  },
  {
    q: 'How do I know if a clinic accepts my insurance?',
    a: 'Call the clinic with your insurance card and ask whether it is in your network for dental treatment specifically; some clinics accept a plan for medical visits but not for dental. Your insurer\'s app or website also lists network providers.',
  },
  {
    q: 'What is a co-payment?',
    a: 'It is the share of the bill you pay yourself, either a fixed amount per visit or a percentage of the treatment cost. It is set by your plan, not by the clinic.',
  },
  {
    q: 'Can I use my insurance for veneers or whitening?',
    a: 'Usually not. Treatment done mainly to change how teeth look is normally excluded. If a crown or veneer is needed to repair damage, ask the clinic whether it can request pre-approval on that basis.',
  },
];

export const insurerFaqs = (name: string): Faq[] => [
  {
    q: `Which dental clinics accept ${name}?`,
    a: `Networks differ between ${name} plans, so the most reliable check is your insurer's provider list for your plan, then a call to the clinic. On AppointPanda, clinics that have confirmed they accept ${name} are listed on this page.`,
  },
  {
    q: `Does ${name} cover dental treatment?`,
    a: `It depends on your ${name} plan. Some plans include a dental benefit with an annual limit and a co-payment; basic plans often include little or no routine dental care. Your policy document lists the dental benefit and exclusions.`,
  },
  {
    q: `Do I need pre-approval from ${name} for dental work?`,
    a: 'Insurers commonly require pre-approval for larger treatment such as root canals, crowns or surgical extractions. Ask the clinic to request approval before treatment starts.',
  },
];
