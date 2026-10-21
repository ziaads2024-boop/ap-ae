import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/seo/SEOHead';
import { supabase } from '@/integrations/supabase/client';

const CONTACT_EMAIL = 'hello@appointpanda.ae';
const TOPICS = [
  { value: 'patient', label: 'I am a patient' },
  { value: 'clinic', label: 'I represent a clinic' },
  { value: 'correction', label: 'Report wrong information' },
  { value: 'other', label: 'Something else' },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('patient');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    const { error } = await supabase.from('contact_submissions').insert({
      name: name.trim().slice(0, 120),
      email: email.trim().slice(0, 200) || null,
      subject: TOPICS.find((t) => t.value === topic)?.label || topic,
      message: message.trim().slice(0, 3000),
      status: 'new',
    });
    setState(error ? 'error' : 'sent');
  };

  const field = 'h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20';

  return (
    <PageLayout>
      <SEOHead
        title="Contact AppointPanda"
        description="Contact the AppointPanda team about an appointment request, your clinic's listing or a correction."
        canonical="/contact/"
      />
      <PageHero
        kicker="Contact"
        title="Contact us"
        subtitle="Questions about a request, your clinic's listing, or something on the site that looks wrong? Send us a message."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        tone="sand"
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-3xl border border-black/10 bg-white p-5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold text-ink">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-zinc-600 underline">{CONTACT_EMAIL}</a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-3xl bg-paper p-5 text-sm leading-relaxed text-zinc-700">
            <MessageSquare className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <span className="font-semibold text-ink">Dental emergency?</span> AppointPanda cannot give medical advice. Call a clinic directly,
              or 998 for an ambulance if swelling spreads to your eye or neck or you have trouble breathing or swallowing.
            </p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 text-sm leading-relaxed text-zinc-700">
            <p className="font-semibold text-ink">Clinics</p>
            <p className="mt-1">To update your listing, <Link href="/claim-profile/" className="underline">claim your profile</Link>. To add a new clinic, use <Link href="/list-your-practice/" className="underline">List your practice</Link>.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          {state === 'sent' ? (
            <div className="py-8 text-center" role="status">
              <Send className="mx-auto h-9 w-9" />
              <p className="mt-3 font-semibold text-ink">Message sent</p>
              <p className="mt-1 text-sm text-zinc-600">Thank you. We reply by email{email ? ` to ${email}` : ''}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-600">Your name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-600">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={field} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-600">Topic</span>
                <select value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
                  {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-600">Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required minLength={10} maxLength={3000} className="w-full rounded-xl border border-black/10 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20" />
              </label>
              <p className="text-xs text-zinc-500">Please do not include medical history. See our <Link href="/privacy/" className="underline">privacy policy</Link>.</p>
              {state === 'error' && (
                <p className="text-sm font-medium text-red-700" role="alert">We could not send your message. Please email {CONTACT_EMAIL} instead.</p>
              )}
              <button type="submit" disabled={state === 'sending'} className="btn-ink w-full disabled:opacity-60">
                {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
