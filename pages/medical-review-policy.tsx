import Link from 'next/link';
import { PolicyPage } from '@/components/policy/PolicyPage';

export default function MedicalReviewPolicy() {
  return (
    <PolicyPage
      path="/medical-review-policy/"
      title="Medical review policy"
      metaTitle="Medical Review Policy | AppointPanda"
      description="How AppointPanda handles health information: what has and has not been reviewed by a dentist, and how to use our guides safely."
      intro="What our health information is, what it is not, and how we will show clinical review when it happens."
      sections={[
        {
          title: 'Current status',
          body: (
            <>
              <p>Our guides are written by the AppointPanda editorial team from public health-authority and professional guidance. They have not yet been reviewed by a named, licensed dentist.</p>
              <p>We will add clinical review by dentists licensed in the UAE. A reviewed page will show the reviewer&apos;s name, licence and the date of review. A page without those details has not been clinically reviewed.</p>
            </>
          ),
        },
        {
          title: 'Using the guides safely',
          body: (
            <p>The guides explain treatments in general terms so you can ask better questions. They cannot tell you what is right for you. Decisions about treatment should be made with a licensed dentist who has examined you.</p>
          ),
        },
        {
          title: 'Emergencies',
          body: (
            <p>If you have severe swelling that spreads towards your eye or neck, difficulty breathing or swallowing, uncontrolled bleeding or a serious injury, call 998 or go to a hospital emergency department.</p>
          ),
        },
        {
          title: 'Reporting a problem',
          body: (
            <p>If you think health information on AppointPanda is wrong, <Link href="/contact/">contact us</Link>. See also our <Link href="/editorial-policy/">editorial policy</Link>.</p>
          ),
        },
      ]}
    />
  );
}
