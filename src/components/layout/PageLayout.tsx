'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { emirateBySlug, emirateOfPath, isLiveEmirate } from '@/content';

/** Shown on every page in an emirate that is not live yet. */
function ComingSoonBanner() {
  const router = useRouter();
  const slug = emirateOfPath(router.asPath || '');
  if (!slug || isLiveEmirate(slug)) return null;
  const name = emirateBySlug(slug)?.name || 'this emirate';
  return (
    <div className="mx-3 mt-3 rounded-2xl bg-ink px-5 py-3 text-sm text-white lg:mx-6" role="status">
      <strong className="text-tone-lemon">Coming soon to {name}.</strong>{' '}
      AppointPanda is live in Dubai. Listings and guides for {name} are for information only and online appointment requests are not open here yet.{' '}
      <Link href="/dubai/" className="font-semibold underline">Find a dentist in Dubai</Link>
    </div>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export function PageLayout({
  children,
  hideNavbar = false,
  hideFooter = false,
}: PageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-paper text-ink overflow-x-hidden" style={{ fontFamily: "'Instrument Sans', system-ui, -apple-system, sans-serif" }}>
      {!hideNavbar && <Navbar />}
      <ComingSoonBanner />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
