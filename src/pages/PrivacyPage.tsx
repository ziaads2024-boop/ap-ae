import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData } from "@/components/seo/StructuredData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeoPageContent } from "@/hooks/useSeoPageContent";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";
import { LegalDocument } from "@/components/policy/PolicyPage";

const PrivacyPage = () => {
  const { data: siteSettings } = useSiteSettings();
  const { data: seoContent } = useSeoPageContent("privacy");
  const supportEmail = siteSettings?.contactDetails?.support_email || 'support@AppointPanda.ae';

  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, submit a form, or contact us. This may include:

• Name and contact information (email, phone number)
• Account credentials
• Profile information for dentists and clinics
• Appointment requests and booking details
• Reviews and feedback you submit
• Communications with us

We also automatically collect certain information when you use our platform, including:

• Device information (browser type, operating system)
• Usage data (pages visited, time spent)
• IP address and location data
• Cookies and similar technologies`
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process appointment requests and facilitate bookings
• Send you notifications about your appointments
• Respond to your comments, questions, and requests
• Send you marketing communications (with your consent)
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions
• Personalize your experience on our platform
• Comply with legal obligations`
    },
    {
      title: "3. Information Sharing & Data Recipients",
      content: `We do not sell your personal information. We may share your information in the following circumstances:

• WITH CLINIC PARTNERS: When you request an appointment, your contact details (name, phone, email) are shared with the dental clinic to facilitate your booking.

• WITH THE APPOINTPANDA TEAM: If the clinic does not manage requests on AppointPanda, our team reads your request and contacts the clinic for you. We share your details with a different clinic only if you ticked the option allowing us to suggest one, and we ask you first.

• WITH SERVICE PROVIDERS: We work with third-party vendors who assist in our operations (hosting, analytics, customer support).

• LEGAL COMPLIANCE: To comply with UAE PDPL, DHA, DOH, and MOHAP regulations.

• PROTECTION: To protect our rights and prevent fraud.

• WITH YOUR CONSENT: At your direction or with explicit permission.

Your data is shared ONLY with clinics you explicitly request appointments with.`
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit (TLS 1.3) and at rest (AES-256)
• Regular security assessments and penetration testing
• Role-based access controls and authentication
• UAE-based data centers with compliance certifications
• Incident response and breach notification procedures

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      title: "5. Your Rights Under UAE PDPL",
      content: `Under the UAE Federal Decree-Law No. 45/2021 (Personal Data Protection Law - PDPL), you have the following rights regarding your personal information:

• RIGHT TO ACCESS: Request a copy of the personal data we hold about you
• RIGHT TO RECTIFICATION: Request correction of inaccurate or incomplete data
• RIGHT TO ERASURE: Request deletion of your personal data (subject to legal retention requirements)
• RIGHT TO OBJECT: Object to processing of your personal data
• RIGHT TO DATA PORTABILITY: Request transfer of your data in a machine-readable format
• RIGHT TO WITHDRAW CONSENT: Withdraw consent at any time without affecting prior lawful processing
• RIGHT TO RESTRICTION: Request restriction of data processing in certain circumstances

To exercise these rights, please contact our Data Protection team. We will respond within 30 days as required by UAE law.`
    },
    {
      title: "6. Data Retention",
      content: `We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy:

• Account data: Retained while your account is active + 3 years after closure
• Appointment records: Retained for 5 years for regulatory compliance
• Marketing preferences: Retained until you withdraw consent
• Technical logs: Retained for 12 months for security purposes

After this period, your data is securely deleted or anonymized.`
    },
    {
      title: "7. Cookies & Tracking Technologies",
      content: `We use cookies and similar tracking technologies to:

• Keep you logged in securely
• Remember your preferences
• Analyze platform usage and performance
• Improve our services

You can control cookies through your browser settings. For more information, please see our Cookie Policy.`
    },
    {
      title: "8. Third-Party Services",
      content: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.

We use the following categories of third-party service providers:

• Cloud hosting (UAE-based)
• Analytics services
• Email and notification services
• Payment processors (if applicable)`
    },
    {
      title: "9. Children's Privacy",
      content: `Our services are not directed to children under 18 without parental consent, in accordance with UAE child protection regulations. We do not knowingly collect personal information from minors. If you believe we have collected information from a child without proper consent, please contact us immediately.`
    },
    {
      title: "10. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by:

• Posting the new policy on this page
• Updating the "Last Updated" date
• Sending an email notification for significant changes

We encourage you to review this policy periodically. Your continued use of our platform constitutes acceptance of any updates.`
    },
    {
      title: "11. UAE Regulatory Compliance",
      content: `This policy is governed by and complies with:

• UAE Federal Decree-Law No. 45 of 2021 (Personal Data Protection Law / PDPL)
• Dubai Health Authority (DHA) data handling guidelines
• Department of Health Abu Dhabi (DOH) patient data regulations
• MOHAP health information privacy standards
• TRA (Telecommunications Regulatory Authority) guidelines

Data processed through our platform is stored within UAE-compliant infrastructure.`
    },
    {
      title: "12. Data Protection Officer (DPO) Contact",
      content: `For all privacy-related inquiries, data subject rights requests, or concerns:

AppointPanda - Data Protection Team
Dubai, United Arab Emirates

Email: dpo@AppointPanda.ae
General Inquiries: privacy@AppointPanda.ae
Support: support@AppointPanda.ae

For urgent data breaches, contact: breach@AppointPanda.ae

We are committed to resolving your concerns within 30 days of receipt, as required by UAE PDPL.`
    }
  ];

  const highlights = [
    { icon: Shield, title: "PDPL Compliant", description: "UAE Federal Decree-Law No. 45/2021" },
    { icon: Eye, title: "Transparency", description: "Clear about how we use data" },
    { icon: Lock, title: "Your Control", description: "Exercise your data rights anytime" },
    { icon: Mail, title: "DPO Contact", description: "dpo@AppointPanda.ae" },
  ];

  return (
    <PageLayout>
      <SEOHead
        title={seoContent?.meta_title || "Privacy Policy | AppointPanda Data Protection"}
        description={seoContent?.meta_description || "Learn how AppointPanda collects, uses, and protects your personal information. Read our comprehensive privacy policy for patients and dental professionals."}
        canonical="/privacy/"
        keywords={['privacy policy', 'data protection', 'dental privacy', 'AppointPanda privacy', 'UAE PDPL']}
      />

      {/* Privacy Policy Schema */}
      <StructuredData 
        data={{ type: 'organization' }}
      />

      <LegalDocument
        kicker="Your privacy"
        title="Privacy policy"
        intro="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
        highlights={highlights}
        preamble={`AppointPanda ("we", "us", or "our") is committed to protecting your privacy in accordance with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL) and applicable regulations of Dubai Health Authority (DHA), Department of Health Abu Dhabi (DoH), and MOHAP. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services within the United Arab Emirates.`}
        sections={sections}
        lastUpdated="January 2026"
        contactPrompt="Have questions about your privacy?"
      />
    </PageLayout>
  );
};

export default PrivacyPage;
