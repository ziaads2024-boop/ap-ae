'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, LocateFixed, ArrowRight, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  navServices as services, navEmirates as emirates, navUrls as urls, isLiveEmirate,
  navDubaiAreas as dubaiAreas, NAV_AREA_GROUPS as DUBAI_AREA_GROUPS, navVisitReasons as visitReasons,
} from '@/lib/navLinks';

type MenuKey = 'treatments' | 'emirates' | null;

const simpleLinks = [
  { label: 'Find clinics', href: '/find-clinics/' },
  { label: 'Insurance', href: '/insurance/' },
  { label: 'Guides', href: '/blog/' },
];

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="AppointPanda home">
      <span className={cn('grid size-8 place-items-center rounded-full', inverted ? 'bg-white' : 'bg-ink')}>
        {/* Panda mark: two ears and a face */}
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <circle cx="6" cy="6.5" r="3" fill={inverted ? '#121212' : '#fff'} />
          <circle cx="18" cy="6.5" r="3" fill={inverted ? '#121212' : '#fff'} />
          <circle cx="12" cy="13" r="7.5" fill={inverted ? '#121212' : '#fff'} />
          <ellipse cx="9.2" cy="12.4" rx="1.7" ry="2.1" fill={inverted ? '#fff' : '#121212'} />
          <ellipse cx="14.8" cy="12.4" rx="1.7" ry="2.1" fill={inverted ? '#fff' : '#121212'} />
          <circle cx="12" cy="16.2" r="1.1" fill={inverted ? '#fff' : '#121212'} />
        </svg>
      </span>
      <span className={cn('text-[15px] font-bold tracking-tight sm:text-[17px]', inverted ? 'text-white' : 'text-ink')}>
        appointpanda<span className={inverted ? 'text-tone-lime' : 'text-primary'}>.ae</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRefs = useRef<Record<'treatments' | 'emirates', HTMLButtonElement | null>>({ treatments: null, emirates: null });

  // Escape closes an open mega menu and returns focus to its trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const key = open;
        setOpen(null);
        triggerRefs.current[key]?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 px-3 pt-3 lg:px-6"
      onMouseLeave={() => setOpen(null)}
      onBlur={(e) => {
        // Close the mega menu when keyboard focus leaves the header
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
      }}
    >
      <div
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border bg-white/90 pl-3 pr-1.5 backdrop-blur-md transition-shadow sm:pl-4 sm:pr-2',
          scrolled ? 'border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'border-black/5'
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-ink"
            ref={(el) => { triggerRefs.current.treatments = el; }}
            aria-expanded={open === 'treatments'}
            aria-controls="mega-treatments"
            onMouseEnter={() => setOpen('treatments')}
            onClick={() => setOpen(open === 'treatments' ? null : 'treatments')}
          >
            Treatments <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === 'treatments' && 'rotate-180')} />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-ink"
            ref={(el) => { triggerRefs.current.emirates = el; }}
            aria-expanded={open === 'emirates'}
            aria-controls="mega-emirates"
            onMouseEnter={() => setOpen('emirates')}
            onClick={() => setOpen(open === 'emirates' ? null : 'emirates')}
          >
            Dubai <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === 'emirates' && 'rotate-180')} />
          </button>
          {simpleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setOpen(null)}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <Link href="/find-clinics/?near=me" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-zinc-100 xl:flex">
            <LocateFixed className="h-4 w-4" aria-hidden="true" /> Near me
          </Link>
          <Link href="/list-your-practice/" className="hidden rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink xl:block">
            For clinics
          </Link>
          <Link href="/auth/" className="hidden min-h-10 items-center rounded-full px-3 text-sm font-medium text-ink hover:bg-zinc-100 sm:inline-flex">
            Log in
          </Link>
          <Link href="/find-clinics/" className="btn-ink !min-h-10 whitespace-nowrap !px-3.5 !py-2 text-sm sm:!px-4">
            <Search className="hidden h-4 w-4 sm:block" aria-hidden="true" /> Find a dentist
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-zinc-100 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto bg-paper p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="border-b border-black/10 p-5">
                <Logo />
              </div>
              <div className="space-y-6 p-5">
                <Link href="/find-clinics/?near=me" onClick={() => setMobileOpen(false)} className="btn-ink w-full">
                  <LocateFixed className="h-4 w-4" /> Find a dentist near me
                </Link>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">Treatments</p>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link key={s.slug} href={urls.service(s.slug)} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl bg-white px-3 py-2 text-sm font-medium">
                        {s.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">Dubai areas</p>
                  <div className="grid grid-cols-2 gap-2">
                    {dubaiAreas.slice(0, 12).map((a) => (
                      <Link key={a.slug} href={urls.dubaiArea(a.slug)} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl bg-white px-3 py-2 text-sm font-medium">
                        {a.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">Coming soon</p>
                  <div className="grid grid-cols-2 gap-2">
                    {emirates.filter((e) => !isLiveEmirate(e.slug)).map((e) => (
                      <Link key={e.slug} href={urls.emirate(e.slug)} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl bg-white px-3 py-2 text-sm font-medium">
                        {e.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {[...simpleLinks, { label: 'For clinics', href: '/list-your-practice/' }, { label: 'Clinic log in', href: '/auth/' }].map((l) => (
                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[15px] font-medium hover:bg-white">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop mega menus */}
      <div className="relative mx-auto hidden max-w-6xl lg:block">
        {open === 'treatments' && (
          <div id="mega-treatments" className="absolute inset-x-0 top-2 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={urls.service(s.slug)} className="group rounded-2xl p-3 hover:bg-paper">
                  <span className="block text-sm font-semibold text-ink">{s.name}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-zinc-600 line-clamp-2">{s.summary}</span>
                </Link>
              ))}
            </div>
            <Link href={urls.services} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">
              All treatments <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
        {open === 'emirates' && (
          <div id="mega-emirates" className="absolute inset-x-0 top-2 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-6">
              {DUBAI_AREA_GROUPS.map((group) => (
                <div key={group}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">{group}</p>
                  <ul className="space-y-1">
                    {dubaiAreas.filter((a) => a.group === group).map((a) => (
                      <li key={a.slug}><Link href={urls.dubaiArea(a.slug)} className="block rounded-lg px-2 py-1 text-sm text-ink hover:bg-paper">{a.name}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">Why are you visiting?</p>
                <ul className="space-y-1">
                  {visitReasons.slice(0, 7).map((r) => (
                    <li key={r.slug}><Link href={urls.dubaiReason(r.slug)} className="block rounded-lg px-2 py-1 text-sm text-ink hover:bg-paper">{r.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/5 pt-4">
              <Link href={urls.emirate('dubai')} className="inline-flex items-center gap-1 rounded-full bg-tone-lemon px-4 py-2 text-sm font-semibold text-ink">All of Dubai <ArrowRight className="h-4 w-4" /></Link>
              <Link href={urls.dubaiReasons} className="text-sm font-semibold text-ink underline">All reasons</Link>
              <span className="text-sm text-zinc-600">Coming soon:</span>
              {emirates.filter((e) => !isLiveEmirate(e.slug)).map((e) => (
                <Link key={e.slug} href={urls.emirate(e.slug)} className="text-sm text-zinc-600 underline-offset-2 hover:text-ink hover:underline">{e.name}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
