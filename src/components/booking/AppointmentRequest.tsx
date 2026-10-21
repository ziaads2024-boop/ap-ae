'use client';

import { useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import { CalendarCheck2, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { visitReasons } from '@/content/dubai';
import { cn } from '@/lib/utils';

// Request-an-appointment form. Clinics do not publish live calendars on
// AppointPanda yet, so this never shows "available" times: the patient picks a
// preferred day and part of the day, and the clinic calls back to confirm.

const TIME_WINDOWS = [
  { value: 'morning', label: 'Morning', hint: '8am to 12pm' },
  { value: 'afternoon', label: 'Afternoon', hint: '12pm to 5pm' },
  { value: 'evening', label: 'Evening', hint: 'after 5pm' },
  { value: 'any', label: 'Any time', hint: 'flexible' },
];

const UAE_PHONE = /^(\+971|00971|0)?5\d{8}$|^(\+971|00971|0)?[2-9]\d{7}$/;

interface Props {
  clinicId: string;
  clinicName: string;
  dentistId?: string | null;
  clinicPhone?: string | null;
  defaultReason?: string;
  /** The clinic manages its own requests on AppointPanda. Otherwise the AppointPanda team contacts the clinic for the patient. */
  clinicClaimed?: boolean;
  compact?: boolean;
  onDone?: () => void;
}

export function AppointmentRequest({ clinicId, clinicName, dentistId, clinicPhone, defaultReason = '', clinicClaimed = false, compact = false, onDone }: Props) {
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1)), []);
  const [reason, setReason] = useState(defaultReason);
  const [day, setDay] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState('any');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [allowAlternative, setAllowAlternative] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (!UAE_PHONE.test(cleanPhone)) return setError('Please enter a UAE phone number, for example 050 123 4567.');
    if (!day) return setError('Please choose a preferred day.');
    if (!consent) return setError('Please confirm the clinic may contact you about this request.');

    setState('sending');
    const reasonLabel = visitReasons.find((r) => r.slug === reason)?.label || reason || 'Not specified';
    const windowLabel = TIME_WINDOWS.find((w) => w.value === timeWindow)?.label || 'Any time';
    const appointmentId = crypto.randomUUID();
    const { error: insertError } = await supabase.from('appointments').insert({
      id: appointmentId,
      clinic_id: clinicId,
      dentist_id: dentistId || null,
      patient_name: name.trim(),
      patient_phone: cleanPhone,
      patient_email: email.trim() || null,
      preferred_date: day,
      preferred_time: windowLabel,
      notes: [
        `Visit reason: ${reasonLabel}`,
        insurance.trim() ? `Insurance: ${insurance.trim()}` : 'Insurance: not given / self-pay',
        notes.trim() ? `Notes: ${notes.trim()}` : '',
        allowAlternative
          ? 'Patient agrees AppointPanda may suggest another clinic nearby if this clinic cannot be reached.'
          : 'Patient asked for this clinic only. Do not route to another clinic.',
        'Request made via AppointPanda; time to be confirmed by the clinic.',
      ].filter(Boolean).join('\n'),
      status: 'pending',
      source: 'website',
      // Unclaimed clinics have no dashboard: the request goes to the admin queue
      is_assigned: clinicClaimed,
    } as never);

    if (insertError) {
      setState('error');
      setError('We could not send your request. Please try again, or call the clinic directly.');
      return;
    }

    if (email.trim()) {
      supabase.functions
        .invoke('send-booking-email', { body: { appointmentId, type: 'new_booking', newStatus: 'pending' } })
        .catch(() => {});
    }
    setState('sent');
    onDone?.();
  };

  if (state === 'sent') {
    return (
      <div className="rounded-3xl bg-tone-lime p-6 text-ink" role="status">
        <CheckCircle2 className="h-8 w-8" />
        <p className="mt-3 text-lg font-semibold">Request sent to {clinicName}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">
          This is not a confirmed appointment yet.{' '}
          {clinicClaimed
            ? `The clinic will contact you on ${phone} to agree a time.`
            : `${clinicName} does not manage requests on AppointPanda yet, so our team will contact the clinic for you and call you on ${phone} with a time.`}{' '}
          If it is urgent, call the clinic directly.
        </p>
      </div>
    );
  }

  const field = 'h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20';

  return (
    <form onSubmit={submit} className={cn('space-y-4', compact && 'space-y-3')} noValidate>
      <div>
        <p className="flex items-center gap-2 text-base font-semibold text-ink"><CalendarCheck2 className="h-5 w-5" /> Request an appointment</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          Choose a preferred day and time of day.{' '}
          {clinicClaimed ? `${clinicName} will call you to confirm an exact time.` : 'We pass your request to the clinic and call you to confirm an exact time.'}
        </p>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-zinc-600">Reason for visit</span>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className={field}>
          <option value="">Choose a reason</option>
          {visitReasons.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
          <option value="other">Something else</option>
        </select>
      </label>

      <fieldset className="min-w-0">
        <legend className="mb-1 text-xs font-semibold text-zinc-600">Preferred day</legend>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((d) => {
            const value = format(d, 'yyyy-MM-dd');
            return (
              <button
                key={value}
                type="button"
                aria-pressed={day === value}
                onClick={() => setDay(value)}
                className={cn('flex w-14 shrink-0 flex-col items-center rounded-xl border py-2 text-xs', day === value ? 'border-ink bg-ink text-white' : 'border-black/10 bg-white text-ink')}
              >
                <span className="font-medium">{format(d, 'EEE')}</span>
                <span className="text-base font-semibold">{format(d, 'd')}</span>
                <span className="opacity-70">{format(d, 'MMM')}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-1 text-xs font-semibold text-zinc-600">Preferred time of day</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIME_WINDOWS.map((w) => (
            <button
              key={w.value}
              type="button"
              aria-pressed={timeWindow === w.value}
              onClick={() => setTimeWindow(w.value)}
              className={cn('rounded-xl border px-2 py-2 text-left text-xs', timeWindow === w.value ? 'border-ink bg-ink text-white' : 'border-black/10 bg-white text-ink')}
            >
              <span className="block font-semibold">{w.label}</span>
              <span className="opacity-70">{w.hint}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} required />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">Mobile number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="050 123 4567" className={field} required />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">Email (optional)</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">Insurance (optional)</span>
          <input value={insurance} onChange={(e) => setInsurance(e.target.value)} placeholder="e.g. Daman, AXA, self-pay" className={field} />
        </label>
      </div>

      {!compact && (
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-zinc-600">Anything the clinic should know? (optional)</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={600} className="w-full rounded-xl border border-black/10 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20" />
        </label>
      )}

      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 rounded border-black/20" />
        <span>
          I agree that AppointPanda will share these details with {clinicName} so it can contact me about this request.
          See our <a href="/privacy/" className="underline">privacy policy</a>. Do not include medical history here.
        </span>
      </label>

      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
        <input type="checkbox" checked={allowAlternative} onChange={(e) => setAllowAlternative(e.target.checked)} className="mt-0.5 size-4 rounded border-black/20" />
        <span>Optional: if {clinicName} cannot be reached, AppointPanda may suggest another licensed clinic nearby. We will ask you before sharing your details with it.</span>
      </label>

      {error && <p className="text-sm font-medium text-red-700" role="alert">{error}</p>}

      <button type="submit" disabled={state === 'sending'} className="btn-ink w-full disabled:opacity-60">
        {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck2 className="h-4 w-4" />}
        Send request
      </button>

      {clinicPhone && (
        <a href={`tel:${clinicPhone.replace(/\s/g, '')}`} className="btn-ghost w-full">
          <Phone className="h-4 w-4" /> Or call {clinicPhone}
        </a>
      )}
      <p className="text-center text-[11px] text-zinc-500">In an emergency, call the clinic directly or 998 for an ambulance.</p>
    </form>
  );
}
