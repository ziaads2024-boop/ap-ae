import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeoPageContent } from "@/hooks/useSeoPageContent";
import { LegalDocument } from "@/components/policy/PolicyPage";

const TermsPage = () => {
  const { data: siteSettings } = useSiteSettings();
  const { data: seoContent } = useSeoPageContent("terms");
  const supportEmail = siteSettings?.contactDetails?.support_email || 'support@AppointPanda.ae';

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using AppointPanda ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms apply to all users of the Platform, including patients, dental professionals, and clinic administrators.`
    },
    {
      title: "2. Description of Services",
      content: `AppointPanda provides an online platform that connects patients with dental professionals across the United Arab Emirates. Our services include:

• Directory of dental clinics and professionals
• Clinic and dentist profile pages
• Appointment request functionality
• Patient reviews and ratings
• Information about dental services

We do not provide medical advice, diagnoses, or treatments. All medical decisions should be made in consultation with qualified healthcare professionals.`
    },
    {
      title: "3. User Accounts",
      content: `To access certain features, you may need to create an account. You agree to:

• Provide accurate and complete information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Be responsible for all activities under your account

We reserve the right to suspend or terminate accounts that violate these terms.`
    },
    {
      title: "4. For Patients",
      content: `As a patient using our Platform, you agree to:

• Provide accurate information when requesting appointments
• Respect the policies of dental clinics and professionals
• Submit honest and fair reviews based on actual experiences
• Not use the Platform for any unlawful purposes

We do not guarantee the availability of appointments or the quality of services provided by listed clinics.`
    },
    {
      title: "5. For Dental Professionals",
      content: `As a dental professional or clinic using our Platform, you agree to:

• Provide accurate and up-to-date information about your practice
• Maintain valid DHA/MOHAP licensing and credentials
• Respond to patient inquiries in a timely manner
• Comply with all applicable laws and regulations
• Not engage in false advertising or misleading practices

Verified listings are subject to additional terms and verification requirements.`
    },
    {
      title: "6. Intellectual Property",
      content: `All content on the Platform, including text, graphics, logos, and software, is the property of AppointPanda or its licensors and is protected by intellectual property laws.

You may not:
• Copy, modify, or distribute our content without permission
• Use our trademarks without authorization
• Reverse engineer or attempt to extract source code`
    },
    {
      title: "7. User Content",
      content: `You retain ownership of content you submit (reviews, photos, etc.), but grant us a license to use, display, and distribute such content on our Platform.

You represent that your content:
• Is accurate and not misleading
• Does not infringe on third-party rights
• Does not contain harmful or offensive material
• Complies with all applicable laws

We reserve the right to remove any content that violates these terms.`
    },
    {
      title: "8. Disclaimers",
      content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:

• The accuracy of information provided by clinics
• The availability or quality of dental services
• Uninterrupted access to the Platform
• That the Platform will be error-free

We are not responsible for any damages arising from your use of the Platform or reliance on information provided.`
    },
    {
      title: "9. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, AppointPanda SHALL NOT BE LIABLE FOR:

• Indirect, incidental, or consequential damages
• Loss of profits, data, or business opportunities
• Damages arising from third-party services or content

Our total liability shall not exceed the amount you paid us in the past 12 months.`
    },
    {
      title: "10. Indemnification",
      content: `You agree to indemnify and hold harmless AppointPanda, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:

• Your use of the Platform
• Your violation of these terms
• Your violation of any third-party rights`
    },
    {
      title: "11. Changes to Terms",
      content: `We may modify these terms at any time. We will notify you of material changes by posting on the Platform. Your continued use after changes constitutes acceptance of the new terms.`
    },
    {
      title: "12. Governing Law & Jurisdiction",
      content: `These terms are governed by the laws of the United Arab Emirates, including:

• UAE Federal Law No. 5 of 1985 (Civil Transactions Law) as amended
• UAE Federal Decree-Law No. 45 of 2021 (Personal Data Protection Law)
• Dubai Health Authority (DHA) regulations for healthcare advertising and digital services
• MOHAP standards for healthcare information platforms

Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of the Emirate of Dubai, UAE, unless otherwise required by UAE federal law.`
    },
    {
      title: "13. Contact Information",
      content: `For questions about these terms, please contact us:

AppointPanda
Dubai, United Arab Emirates
Email: ${supportEmail}`
    }
  ];

  const keyPoints = [
    "Free for patients to use",
    "Clinic listings with their licensing regulator named",
    "Your data is protected",
    "Right to remove content"
  ];

  return (
    <PageLayout>
      <SEOHead
        title={seoContent?.meta_title || "Terms and Conditions | AppointPanda Service Agreement"}
        description={seoContent?.meta_description || "Read AppointPanda's terms and conditions. Understand the rules, policies, and guidelines for using our dental directory platform for patients and professionals."}
        canonical="/terms/"
        keywords={['terms and conditions', 'service agreement', 'dental directory terms', 'AppointPanda terms']}
      />

      <LegalDocument
        kicker="Legal"
        title="Terms & conditions"
        intro="Please read these terms carefully before using AppointPanda. By using our platform, you agree to these terms."
        highlights={keyPoints.map((point) => ({ title: point }))}
        sections={sections}
        lastUpdated="January 2026"
        lastUpdatedNote="Effective immediately for all users"
        contactPrompt="Have questions about our terms?"
      />
    </PageLayout>
  );
};

export default TermsPage;
