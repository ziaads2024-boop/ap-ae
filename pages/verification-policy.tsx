import Link from 'next/link';
import { PolicyPage } from '@/components/policy/PolicyPage';

export default function VerificationPolicy() {
  return (
    <PolicyPage
      path="/verification-policy/"
      title="Verification policy"
      metaTitle="Verification Policy: Listed, Claimed and Verified Clinics"
      description="What the listed, claimed and verified labels on AppointPanda clinic profiles mean, what we check, and what verification does not change."
      intro="Clinic profiles on AppointPanda are listed, claimed or verified. Here is exactly what each one means."
      sections={[
        {
          title: 'Listed',
          body: (
            <p>The clinic appears because it is a dental practice operating in the UAE, based on public business information. Nobody from the clinic has confirmed the details, and AppointPanda has not checked its licence. Appointment requests for listed clinics go to the AppointPanda team, who contact the clinic for you.</p>
          ),
        },
        {
          title: 'Claimed',
          body: (
            <p>Someone at the clinic has confirmed they can receive a one-time code at the clinic&apos;s email address or phone number, and now manages the profile. The clinic is responsible for the treatments, prices and hours it publishes. Claiming does not mean we have checked a licence.</p>
          ),
        },
        {
          title: 'Verified',
          body: (
            <>
              <p>The clinic has sent us its health-authority facility licence (DHA, DoH or MOHAP) and trade licence, and our team has checked that the licence was valid for that clinic name and address when we checked it.</p>
              <p>Clinics pay a one-time verification fee. Paying does not guarantee verification, and verification does not change where a clinic appears in lists: lists are sorted by number of Google reviews. Verification does not cover individual dentists&apos; licences or the quality of treatment.</p>
            </>
          ),
        },
        {
          title: 'Check for yourself',
          body: (
            <p>Whatever the label, you can check a dentist&apos;s licence with the health authority before treatment, for example on the Dubai Health Authority&apos;s Sheryan portal for practitioners in Dubai.</p>
          ),
        },
        {
          title: 'Report a concern',
          body: (
            <p>If you think a listed clinic is unlicensed or its profile is misleading, <Link href="/contact/">contact us</Link> with the profile address. We may remove a label or a listing while we look into it.</p>
          ),
        },
      ]}
    />
  );
}
