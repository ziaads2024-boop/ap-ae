import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services, emirates, urls, LOCAL_GUIDE_SERVICES, serviceBySlug, isLiveEmirate } from '@/content';
import { dubaiAreaBySlug } from '@/content/dubai';
import { Logo } from '@/components/Navbar';

const DUBAI_GUIDES = ['dental-implants', 'invisalign', 'veneers', 'teeth-whitening', 'emergency-dentist', 'pediatric-dentistry', 'braces', 'root-canal'];
const FOOTER_AREAS = ['dubai-marina', 'jumeirah-beach-residence', 'downtown-dubai', 'business-bay', 'jumeirah', 'al-barsha', 'deira', 'mirdif'];

const COMPANY_LINKS = [
  { label: 'About AppointPanda', href: '/about/' },
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Dental insurance', href: '/insurance/' },
  { label: 'Cost calculator', href: '/tools/dental-cost-calculator/' },
  { label: 'Articles', href: '/blog/' },
  { label: 'List your clinic', href: '/list-your-practice/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Editorial policy', href: '/editorial-policy/' },
  { label: 'Medical review policy', href: '/medical-review-policy/' },
  { label: 'How we verify clinics', href: '/verification-policy/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Image credits', href: '/image-credits/' },
  { label: 'Sitemap', href: '/sitemap/' },
];

export function Footer() {
  return (
    <footer className="px-3 pb-3 lg:px-6 lg:pb-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-ink text-zinc-400">
        <div className="px-6 pb-6 pt-14 lg:px-14">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
            <div className="max-w-md">
              <Logo inverted />
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Independent guides to dental treatment in the UAE, and a directory of licensed clinics across all seven emirates.
                Information on this site is general and does not replace advice from your dentist.
              </p>
            </div>
            <Link href="/find-clinics/?near=me" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-tone-lemon">
              <ArrowRight className="h-4 w-4" /> Find a dentist near you
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Treatments</h2>
              <ul className="space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.slug}><Link href={urls.service(s.slug)} className="hover:text-white">{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Dentists in Dubai</h2>
              <ul className="space-y-2 text-sm">
                <li><Link href={urls.emirate('dubai')} className="hover:text-white">All of Dubai</Link></li>
                {FOOTER_AREAS.map((a) => {
                  const area = dubaiAreaBySlug(a);
                  return area ? <li key={a}><Link href={urls.dubaiArea(a)} className="hover:text-white">{area.name}</Link></li> : null;
                })}
              </ul>
              <p className="mt-4 text-xs text-zinc-500">
                Coming soon:{' '}
                {emirates.filter((e) => !isLiveEmirate(e.slug)).map((e, i) => (
                  <span key={e.slug}>{i > 0 && ', '}<Link href={urls.emirate(e.slug)} className="hover:text-white">{e.name}</Link></span>
                ))}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Dubai treatment guides</h2>
              <ul className="space-y-2 text-sm">
                {DUBAI_GUIDES.filter((s) => LOCAL_GUIDE_SERVICES.includes(s)).map((s) => (
                  <li key={s}><Link href={urls.serviceEmirate('dubai', s)} className="hover:text-white">{serviceBySlug(s)?.shortName} in Dubai</Link></li>
                ))}
                <li><Link href={urls.dubaiReasons} className="hover:text-white">Find care by reason</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">AppointPanda</h2>
              <ul className="space-y-2 text-sm">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized wordmark, as a closing visual */}
        <div aria-hidden="true" className="select-none px-4 leading-none">
          <p className="display -mb-[0.12em] whitespace-nowrap text-center text-[17vw] text-white/[0.07] lg:text-[13.5rem]">
            appointpanda
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5 text-xs text-zinc-500 md:flex-row md:justify-between lg:px-14">
          <p>© {new Date().getFullYear()} AppointPanda. All rights reserved.</p>
          <p>In a medical emergency in the UAE call 998 for an ambulance.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
