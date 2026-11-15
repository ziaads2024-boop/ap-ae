import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { GuideCta } from "@/components/guide/GuideBlocks";
import {
  Search,
  UserCheck,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
  Building2,
  TrendingUp,
  Shield,
  Phone,
} from "lucide-react";

const HowItWorksPage = () => {
  const patientSteps = [
    {
      step: 1,
      icon: Search,
      title: "Search",
      description: "Choose an area and a reason for your visit or a treatment, then compare listed clinics nearby."
    },
    {
      step: 2,
      icon: UserCheck,
      title: "Compare",
      description: "Open clinic and dentist profiles to see treatments, opening hours, insurance and Google ratings. Read the treatment guide to know what to ask."
    },
    {
      step: 3,
      icon: Calendar,
      title: "Book",
      description: "Send a request with a preferred day and time of day. The clinic, or our team if the clinic is not on AppointPanda yet, calls you to agree a time."
    },
    {
      step: 4,
      icon: Star,
      title: "Give feedback",
      description: "After your visit you can review the clinic on Google or send private feedback to the clinic. Both options are always open to you."
    },
  ];

  const dentistSteps = [
    {
      step: 1,
      icon: Building2,
      title: "Create Profile",
      description: "List your practice for free or claim an existing profile. Add your services, qualifications, and photos."
    },
    {
      step: 2,
      icon: Shield,
      title: "Get Verified",
      description: "Complete the checks in our verification policy to show a verified label. Verification does not change your position in search results."
    },
    {
      step: 3,
      icon: Phone,
      title: "Receive Inquiries",
      description: "Get appointment requests directly from patients searching for dental care in your area."
    },
    {
      step: 4,
      icon: TrendingUp,
      title: "Grow Your Practice",
      description: "Build your reputation with patient reviews and attract more patients to your clinic."
    },
  ];

  const patientBenefits = [
    "Clinic listings with Google ratings, shown as reported",
    "Google ratings shown as reported, never edited",
    "Easy online appointment requests",
    "Compare clinics and prices",
    "Find specialists for any treatment",
    "100% free to use"
  ];

  const dentistBenefits = [
    "Free basic listing",
    "Receive appointment requests from patients",
    "Verified badge for trust",
    "Keep treatments, prices and hours up to date",
    "Manage reviews and reputation",
    "Analytics and insights"
  ];

  return (
    <PageLayout>
      <SEOHead
        title="How It Works | Find Dentists or List Your Practice"
        description="Learn how AppointPanda works. Patients can search, compare, and book dental appointments. Dentists can list their practice and reach more patients."
        canonical="/how-it-works/"
        keywords={['how to find dentist', 'book dental appointment', 'list dental practice', 'dental directory']}
      />

      <PageHero
        badge="How it works"
        title="Finding dental care made"
        highlight="simple"
        description="From search to booking, here's how AppointPanda helps you find the right dentist in just a few steps."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
        tone="sky"
      />

      {/* For Patients */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">For patients</p>
        <h2 className="heading-section mt-2">Find your dentist</h2>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {patientSteps.map((item) => (
            <li key={item.step} className="block-card-static flex h-full flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white" aria-hidden="true">{item.step}</span>
                <item.icon className="h-5 w-5 text-ink" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                <span className="sr-only">Step {item.step}: </span>{item.title}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-zinc-700">{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid items-center gap-6 rounded-[1.25rem] bg-tone-sky p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <h3 className="text-xl font-semibold text-ink">Patient benefits</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {patientBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-[15px] text-ink">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/find-clinics/" className="btn-ink">
            Find a dentist <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* For Dentists */}
      <section className="px-3 lg:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink px-6 py-12 text-white lg:px-14 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">For dentists</p>
            <h2 className="heading-section mt-2 !text-white">Grow your practice</h2>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dentistSteps.map((item) => (
                <li key={item.step} className="flex h-full flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-tone-lemon text-sm font-semibold text-ink" aria-hidden="true">{item.step}</span>
                    <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    <span className="sr-only">Step {item.step}: </span>{item.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-zinc-300">{item.description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid items-center gap-6 rounded-[1.25rem] border border-white/10 p-6 md:grid-cols-[1fr_auto] md:p-8">
              <div>
                <h3 className="text-xl font-semibold text-white">Dentist benefits</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {dentistBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-[15px] text-zinc-200">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-tone-lime" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 text-center md:text-right">
                <Link href="/list-your-practice/" className="btn-ink !bg-white !text-ink hover:!bg-zinc-100">
                  List your practice <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="text-sm text-zinc-300">
                  Already listed? <Link href="/claim-profile/" className="font-semibold text-white underline underline-offset-2">Claim your profile</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GuideCta
        title="Ready to get started?"
        text="Find a clinic near you, or list your practice for free."
        href="/find-clinics/"
        cta="Find a dentist"
      />
    </PageLayout>
  );
};

export default HowItWorksPage;
