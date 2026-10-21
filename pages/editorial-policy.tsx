import Link from 'next/link';
import { PolicyPage } from '@/components/policy/PolicyPage';

export default function EditorialPolicy() {
  return (
    <PolicyPage
      path="/editorial-policy/"
      title="Editorial policy"
      metaTitle="Editorial Policy: How AppointPanda Writes Its Guides"
      description="Who writes AppointPanda's treatment and area guides, which sources we use, how prices are estimated and how to report a mistake."
      intro="How our treatment, emirate and area guides are written and kept up to date, and what they are not."
      sections={[
        {
          title: 'Who writes the guides',
          body: (
            <>
              <p>Treatment, emirate and Dubai area guides are written by the AppointPanda editorial team. They are written for patients, in plain language, and are not medical advice for your situation.</p>
              <p>The guides are not currently reviewed by a named dentist. When a licensed dentist reviews a page, the page will name them, their licence and the review date. Until then, each page says it was written by our editorial team and when it was last reviewed.</p>
            </>
          ),
        },
        {
          title: 'Sources',
          body: (
            <>
              <p>We base clinical information on public guidance from health authorities and professional bodies, and regulatory information on the published rules of the Dubai Health Authority, the Department of Health - Abu Dhabi and the Ministry of Health and Prevention.</p>
              <p>Practical details such as areas, parking and metro access come from our own knowledge of the city and are checked against maps and official sources.</p>
            </>
          ),
        },
        {
          title: 'Prices',
          body: (
            <p>Price ranges in the guides are indicative ranges for private clinics in the UAE, not quotes. Where a clinic lists its own price on AppointPanda, the page says so. Only a clinic can give you a price, after examining you.</p>
          ),
        },
        {
          title: 'Clinic listings and ratings',
          body: (
            <p>Listings come from public business information and from clinics themselves. Ratings and review counts come from Google and are shown as reported; we do not write, buy, filter or edit reviews. Lists are sorted by number of Google reviews, which is not a measure of quality. Being listed is not a recommendation.</p>
          ),
        },
        {
          title: 'Independence',
          body: (
            <p>Clinics can pay for profile tools and for verification (see our <Link href="/verification-policy/">verification policy</Link>). Payment does not change what our guides say or where a clinic appears in lists.</p>
          ),
        },
        {
          title: 'AI and images',
          body: (
            <p>We do not publish AI-generated photos. Photos on guides are real, credited images used under their licences; see <Link href="/image-credits/">image credits</Link>. Treatment photos are illustrative and do not show clinics listed on AppointPanda.</p>
          ),
        },
        {
          title: 'Corrections',
          body: (
            <p>If something is wrong or out of date, <Link href="/contact/">contact us</Link> with the page address and, if you can, a source. We correct factual errors and update the review date on the page.</p>
          ),
        },
      ]}
    />
  );
}
