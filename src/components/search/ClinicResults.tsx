'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarCheck2, MapPin, ShieldCheck, Star } from 'lucide-react';
import { AppointmentRequest } from '@/components/booking/AppointmentRequest';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { formatAed } from '@/content';

export interface ClinicResult {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  imageUrl: string | null;
  place: string | null;
  insurances: string[];
  distanceKm?: number;
  /** Clinic-listed starting price for the treatment being viewed */
  priceFrom?: number | null;
}

/** Zocdoc-style result cards with a request-an-appointment dialog. */
export function ClinicResults({ clinics, defaultReason = '', priceLabel }: { clinics: ClinicResult[]; defaultReason?: string; priceLabel?: string }) {
  const [requestFor, setRequestFor] = useState<ClinicResult | null>(null);

  return (
    <>
      <ul className="space-y-3">
        {clinics.map((c) => (
          <li key={c.id} className="block-card grid gap-4 p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center">
            <Link href={`/clinic/${c.slug}/`} className="block size-28 overflow-hidden rounded-2xl bg-paper" tabIndex={-1} aria-hidden="true">
              {c.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.imageUrl} alt="" loading="lazy" width={112} height={112} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-3xl font-bold text-zinc-300">{c.name.charAt(0)}</div>
              )}
            </Link>
            <div className="min-w-0">
              <Link href={`/clinic/${c.slug}/`} className="text-lg font-semibold leading-snug text-ink hover:underline">{c.name}</Link>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
                {c.place && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.place}</span>}
                {c.distanceKm != null && <span className="font-medium text-ink">{c.distanceKm < 1 ? '<1' : c.distanceKm.toFixed(1)} km away</span>}
                {c.rating && c.reviewCount ? (
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-ink text-ink" /> <strong className="text-ink">{c.rating.toFixed(1)}</strong> ({c.reviewCount} Google reviews)</span>
                ) : null}
              </p>
              {c.priceFrom ? (
                <p className="mt-1 text-sm text-ink"><strong>{priceLabel || 'From'} {formatAed(c.priceFrom)}</strong> <span className="text-xs text-zinc-500">(clinic-listed)</span></p>
              ) : null}
              {c.insurances.length > 0 && (
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  {c.insurances.slice(0, 3).map((n) => <span key={n} className="rounded-full bg-tone-sky px-2 py-0.5 font-medium text-ink">{n}</span>)}
                  {c.insurances.length > 3 && <span className="text-zinc-500">+{c.insurances.length - 3} more</span>}
                </p>
              )}
            </div>
            <div className="flex gap-2 sm:flex-col">
              <button type="button" onClick={() => setRequestFor(c)} className="btn-ink flex-1 !py-2.5 text-sm"><CalendarCheck2 className="h-4 w-4" /> Request appointment</button>
              <Link href={`/clinic/${c.slug}/`} className="btn-ghost flex-1 !py-2.5 text-sm">View profile</Link>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={!!requestFor} onOpenChange={(open) => !open && setRequestFor(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl">
          <DialogTitle className="sr-only">Request an appointment</DialogTitle>
          {requestFor && (
            <AppointmentRequest clinicId={requestFor.id} clinicName={requestFor.name} clinicPhone={requestFor.phone} defaultReason={defaultReason} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
