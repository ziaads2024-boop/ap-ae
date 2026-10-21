'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, LocateFixed, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { services, emirates, urls } from '@/content';

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
      <span className={cn('text-[17px] font-bold tracking-tight', inverted ? 'text-white' : 'text-ink')}>
        appointpanda<span className="text-primary">.ae</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 lg:px-6" onMouseLeave={() => setOpen(null)}>
      <div
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border bg-white/90 pl-4 pr-2 backdrop-blur-md transition-shadow',
          scrolled ? 'border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'border-black/5'
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-ink"
            aria-expanded={open === 'treatments'}
            onMouseEnter={() => setOpen('treatments')}
            onClick={() => setOpen(open === 'treatments' ? null : 'treatments')}
          >
            Treatments <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === 'treatments' && 'rotate-180')} />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-ink"
            aria-expanded={open === 'emirates'}
            onMouseEnter={() => setOpen('emirates')}
            onClick={() => setOpen(open === 'emirates' ? null : 'emirates')}
          >
            Emirates <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === 'emirates' && 'rotate-180')} />
          </button>
          {simpleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setOpen(null)}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/find-clinics/?near=me" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-zinc-100 md:flex">
            <LocateFixed className="h-4 w-4" /> Near me
          </Link>
          <Link href="/list-your-practice/" className="hidden rounded-full px-3 py-2 text-sm font-medium text-zinc-600 hover:text-ink xl:block">
            For clinics
          </Link>
          <Link href="/auth/" className="btn-ink !px-4 !py-2 text-sm">
            Log in
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" className="grid size-10 place-items-center rounded-full hover:bg-zinc-100 lg:hidden" aria-label="Open menu">
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
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Treatments</p>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link key={s.slug} href={urls.service(s.slug)} onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-3 py-2 text-sm font-medium">
                        {s.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Emirates</p>
                  <div className="grid grid-cols-2 gap-2">
                    {emirates.map((e) => (
                      <Link key={e.slug} href={urls.emirate(e.slug)} onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-3 py-2 text-sm font-medium">
                        {e.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {[...simpleLinks, { label: 'For clinics', href: '/list-your-practice/' }].map((l) => (
                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-[15px] font-medium hover:bg-white">
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
          <div className="absolute inset-x-0 top-2 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={urls.service(s.slug)} className="group rounded-2xl p-3 hover:bg-paper">
                  <span className="block text-sm font-semibold text-ink">{s.name}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-zinc-500 line-clamp-2">{s.summary}</span>
                </Link>
              ))}
            </div>
            <Link href={urls.services} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">
              All treatments <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
        {open === 'emirates' && (
          <div className="absolute inset-x-0 top-2 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-2">
              {emirates.map((e) => (
                <Link key={e.slug} href={urls.emirate(e.slug)} className="rounded-2xl p-3 hover:bg-paper">
                  <span className="block text-sm font-semibold text-ink">
                    {e.name} <span className="font-normal text-zinc-400" lang="ar">{e.nameAr}</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-500">Regulator: {e.regulator.short}</span>
                </Link>
              ))}
              <Link href={urls.emirates} className="flex items-center gap-1 rounded-2xl bg-tone-lemon p-3 text-sm font-semibold text-ink">
                Compare emirates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
