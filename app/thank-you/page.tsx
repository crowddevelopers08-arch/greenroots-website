import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Green Roots",
  description: "Thank you for contacting Green Roots.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-5 py-8 md:px-12 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#e7dbcc] bg-white px-4 py-3 text-[12.5px] font-medium text-[#5c5348] shadow-[0_10px_30px_rgba(13,12,11,.05)] transition hover:text-[#0d0c0b]"
          >
            <span className="text-base leading-none">←</span>
            Back to Store
          </Link>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-[#ebe2d6] bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ee_100%)] shadow-[0_18px_70px_rgba(13,12,11,.06)]">
          <div className="border-b border-[#ebe2d6] px-6 py-10 md:px-10 md:py-14">
            <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
              Confirmation
            </div>
            <h1 className="max-w-3xl font-[var(--font-cormorant)] text-[clamp(42px,6vw,72px)] leading-[0.96] tracking-[-0.03em] text-[#0d0c0b]">
              Thank you for reaching out.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[#3d3530]">
              Your message has been received. Our team usually responds within 24 hours with the next steps, product details, or quotation guidance.
            </p>
          </div>

          <div className="grid gap-5 px-6 py-8 md:grid-cols-3 md:px-10 md:py-10">
            {[
              {
                title: "What happens next",
                text: "We review your request, align it with the right collection or gifting category, and prepare the most useful response.",
              },
              {
                title: "Typical response time",
                text: "Most enquiries are answered within one business day, depending on quantity, branding scope, and delivery requirements.",
              },
              {
                title: "Need urgent help?",
                text: "You can also contact us directly at hello@greenroots.co or +1 (800) 287-3400 for priority follow-up.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[24px] border border-[#efe5d8] bg-white/72 px-5 py-5 shadow-[0_8px_28px_rgba(13,12,11,.03)]"
              >
                <h2 className="mb-2 font-[var(--font-cormorant)] text-[28px] leading-none text-[#0d0c0b]">
                  {card.title}
                </h2>
                <p className="text-[14px] leading-[1.8] text-[#433b36]">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 px-6 pb-8 md:px-10 md:pb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0d0c0b] px-6 py-3 text-[13px] font-medium text-white transition hover:-translate-y-0.5"
            >
              Continue Browsing
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 rounded-full border border-[#d6cab8] px-6 py-3 text-[13px] font-medium text-[#5c5348] transition hover:border-[#5c5348] hover:text-[#0d0c0b]"
            >
              View Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
