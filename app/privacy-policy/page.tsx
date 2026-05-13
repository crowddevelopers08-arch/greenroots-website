import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Green Roots",
  description: "Read how Green Roots collects, uses, stores, and protects customer information.",
};

const sections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We collect information that you choose to share with us when you submit an enquiry, request a callback, subscribe for updates, contact us by email, or otherwise communicate with our team.",
      "We may also collect limited technical information automatically when you visit the website so we can keep the experience secure, stable, and easy to use.",
    ],
    bullets: [
      "Contact details such as your name, phone number, email address, company name, and enquiry message.",
      "Order or request details such as product categories, quantity expectations, delivery preferences, and branding requirements.",
      "Technical information such as browser type, device information, approximate location, pages visited, and basic analytics data.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "We use your information to respond to enquiries, prepare quotations, coordinate delivery discussions, improve our services, and communicate important updates related to your request or relationship with Green Roots.",
    ],
    bullets: [
      "To respond to product, gifting, partnership, or support enquiries.",
      "To share quotations, catalogues, delivery timelines, and follow-up communication.",
      "To improve website performance, content, and customer experience.",
      "To maintain business records, prevent misuse, and protect our rights where necessary.",
    ],
  },
  {
    title: "Sharing of Information",
    paragraphs: [
      "We do not sell your personal information. We may share information only when it is reasonably necessary to operate our business, fulfil a request, or comply with the law.",
    ],
    bullets: [
      "With internal team members who handle sales, support, fulfilment, or account management.",
      "With service providers who help us with hosting, analytics, communications, or delivery coordination.",
      "With authorities, advisers, or legal bodies when required by law or to protect legitimate interests.",
    ],
  },
  {
    title: "Data Retention and Security",
    paragraphs: [
      "We keep information only for as long as it is reasonably necessary for business, operational, legal, or recordkeeping purposes. We use reasonable technical and administrative safeguards to protect the information we hold.",
      "No website or online system can be guaranteed to be completely secure, so we encourage you not to submit highly sensitive personal information unless specifically requested through an appropriate channel.",
    ],
  },
  {
    title: "Your Choices and Rights",
    paragraphs: [
      "You may contact us at any time to request access to, correction of, or deletion of the personal information you have shared with us, subject to any legal or operational obligations we may need to satisfy.",
      "You may also opt out of marketing or update communications by contacting our team directly.",
    ],
  },
  {
    title: "Cookies and Third-Party Services",
    paragraphs: [
      "This website may use cookies, analytics tools, embedded media, or third-party services that collect limited technical information. Those services may be governed by their own privacy policies.",
      "By continuing to use the website, you acknowledge that such standard website technologies may be used to support performance, measurement, and user experience.",
    ],
  },
  {
    title: "Policy Updates",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect business, legal, or operational changes. The updated version will be posted on this page with a revised effective date.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      updatedOn="May 13, 2026"
      intro="This Privacy Policy explains how Green Roots collects, uses, stores, and protects information shared through this website and during our enquiry, support, and gifting process."
      sections={[...sections]}
    />
  );
}
