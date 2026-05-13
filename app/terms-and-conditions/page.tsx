import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions | Green Roots",
  description: "Review the terms governing the use of the Green Roots website, enquiries, and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the Green Roots website, you agree to these Terms and Conditions. If you do not agree, please do not use the website or submit information through it.",
      "These terms apply to website visitors, customers, corporate buyers, and any person or business engaging with Green Roots through this website.",
    ],
  },
  {
    title: "Website Use",
    paragraphs: [
      "You agree to use this website only for lawful purposes and in a way that does not interfere with the operation, security, or availability of the website.",
    ],
    bullets: [
      "You must not misuse the website, attempt unauthorised access, or interfere with site functionality.",
      "You must not submit false, misleading, or harmful information through forms or contact channels.",
      "You must not copy, scrape, or reproduce site content for commercial use without permission.",
    ],
  },
  {
    title: "Products, Enquiries, and Quotations",
    paragraphs: [
      "The website is intended as a showcase and enquiry platform. Product availability, specifications, pricing, timelines, minimum quantities, and branding options may vary and are confirmed only through direct communication with our team.",
      "Any quotation, proposal, or supply discussion is subject to review, confirmation, and acceptance by Green Roots.",
    ],
    bullets: [
      "Images, descriptions, and collections are illustrative and may change without notice.",
      "Submitting an enquiry does not guarantee acceptance, stock allocation, or final pricing.",
      "Quoted timelines, pricing, and availability may depend on supplier confirmation, quantity, branding needs, and logistics.",
    ],
  },
  {
    title: "Payments, Fulfilment, and Returns",
    paragraphs: [
      "Where orders are accepted, payment terms, delivery expectations, branding approvals, and return conditions will be shared separately as part of the commercial process.",
      "Unless otherwise agreed in writing, custom-branded, personalised, or made-to-order items may not be eligible for cancellation or return once production has started.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All website content, including text, layout, graphics, branding, design elements, and curated presentation, belongs to Green Roots or its licensors unless otherwise stated.",
      "You may not reproduce, distribute, modify, or commercially exploit any part of the website without prior written permission.",
    ],
  },
  {
    title: "Disclaimer and Limitation of Liability",
    paragraphs: [
      "This website is provided on an as-available basis. While we aim to keep content accurate and current, we do not guarantee that every description, image, specification, or update will always be complete, current, or error-free.",
      "To the maximum extent permitted by law, Green Roots will not be liable for indirect, incidental, special, or consequential loss arising from the use of this website or reliance on website information.",
    ],
  },
  {
    title: "External Links and Third Parties",
    paragraphs: [
      "The website may contain links to third-party websites, platforms, or communication channels. We are not responsible for the content, availability, or practices of those external services.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms and Conditions from time to time. Continued use of the website after changes are posted means you accept the updated terms.",
    ],
  },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms and Conditions"
      updatedOn="May 13, 2026"
      intro="These Terms and Conditions govern the use of the Green Roots website and the way visitors engage with our catalogue, enquiries, and related services."
      sections={[...sections]}
    />
  );
}
