"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { CAT, type CategoryKey } from "@/lib/store-data";
import { STORE_ASSETS } from "@/lib/store-assets";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function StoreFooter({ onNav }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {
    if (email.trim()) setSubscribed(true);
  }

  return (
    <footer className="bg-[#111d12] text-[rgba(255,255,255,.8)]">
      {/* ── Top glow divider ── */}
      <div className="pointer-events-none h-px bg-[linear-gradient(90deg,transparent,rgba(58,120,72,.55),transparent)]" />

      <div className="px-4 py-8 sm:px-5 sm:py-10 md:px-12 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-[2fr_1fr_1fr_1.1fr] xl:gap-12">

          {/* ── Brand column ── */}
          <div>
            <div className="mb-4">
              <Image
                src={STORE_ASSETS.logo}
                alt="Green Roots – The Gifting Company"
                width={160}
                height={45}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>

            <p className="mb-4 max-w-[300px] text-[length:var(--fs-small)] leading-[1.7] text-[rgba(255,255,255,.68)]">
              India&rsquo;s trusted corporate gifting partner — premium curated collections across apparel, electronics, home essentials, and edibles, available by bulk enquiry.
            </p>

            {/* WhatsApp quick-contact */}
            <a
              href="https://wa.me/918072319441"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(58,120,72,.45)] bg-[rgba(58,120,72,.14)] px-4 py-2 text-[length:var(--fs-caption)] font-medium text-[rgba(255,255,255,.88)] transition hover:bg-[rgba(58,120,72,.30)] hover:text-white"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>

            {/* Newsletter */}
            <div className="mt-6">
              <div className="mb-2 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.15em] text-[#3a7848]">
                Stay updated
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-full border border-[rgba(58,120,72,.35)] bg-[rgba(58,120,72,.12)] px-4 py-2 text-[length:var(--fs-caption)] text-[rgba(255,255,255,.85)]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-6" stroke="#3a7848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You&apos;re on the list. Thank you!
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="your@email.com"
                    className="min-w-0 flex-1 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.05)] px-4 py-2 text-[length:var(--fs-caption)] text-white outline-none transition placeholder:text-[rgba(255,255,255,.22)] focus:border-[rgba(58,120,72,.55)] sm:min-w-[180px]"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full rounded-full border border-[rgba(58,120,72,.4)] bg-[rgba(58,120,72,.2)] px-4 py-2 text-[length:var(--fs-caption)] font-medium text-white transition hover:bg-[rgba(58,120,72,.38)] sm:w-auto"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>

            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                d="M10.6 1.5H4.4A2.9 2.9 0 0 0 1.5 4.4v6.2a2.9 2.9 0 0 0 2.9 2.9h6.2a2.9 2.9 0 0 0 2.9-2.9V4.4a2.9 2.9 0 0 0-2.9-2.9zM7.5 10.8A3.3 3.3 0 1 1 7.5 4.2a3.3 3.3 0 0 1 0 6.6zm3.45-6.95a.78.78 0 1 1 0-1.56.78.78 0 0 1 0 1.56z"
              />
              <SocialIcon
                href="https://youtube.com"
                label="YouTube"
                d="M13.2 4.2c-.14-.53-.56-.95-1.09-1.09C11.12 2.85 7.5 2.85 7.5 2.85s-3.62 0-4.61.26c-.53.14-.95.56-1.09 1.09C1.54 5.19 1.54 7.5 1.54 7.5s0 2.31.26 3.3c.14.53.56.95 1.09 1.09.99.26 4.61.26 4.61.26s3.62 0 4.61-.26c.53-.14.95-.56 1.09-1.09.26-.99.26-3.3.26-3.3s0-2.31-.26-3.3zM6.3 9.65V5.35l3.73 2.15L6.3 9.65z"
              />
            </div>
          </div>

          {/* ── Collections column ── */}
          <FooterColumn title="Collections">
            {(Object.keys(CAT) as CategoryKey[]).map((category) => (
              <button
                key={category}
                onClick={() => onNav(category, null)}
                className="text-left text-[length:var(--fs-small)] font-normal text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                {category}
              </button>
            ))}
          </FooterColumn>

          {/* ── Services column ── */}
          <FooterColumn title="Services">
            {[
              "Corporate Gifting",
              "Bulk Orders",
              "Gift Customisation",
              "Festive Hampers",
              "Brand Merchandise",
              "Gifting Consultation",
            ].map((item) => (
              <a
                key={item}
                href={`mailto:hello@greenroots.co?subject=${encodeURIComponent(item + " Enquiry")}`}
                className="text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </FooterColumn>

          {/* ── Contact & Legal column ── */}
          <div className="flex flex-col gap-6">
            <FooterColumn title="Contact Us">
              <a
                href="mailto:hello@greenroots.co"
                className="flex items-center gap-2 text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                hello@greenroots.co
              </a>
              <a
                href="tel:+918072319441"
                className="flex items-center gap-2 text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M5.5 2H3a1 1 0 0 0-1 1 11 11 0 0 0 11 11 1 1 0 0 0 1-1v-2.5l-3-1-1.5 1.5A8.1 8.1 0 0 1 6.5 8L8 6.5 7 3.5H5.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                8072319441 / 9962214100
              </a>
              <a
                href="https://wa.me/918072319441"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                <WhatsAppIcon size={13} />
                WhatsApp Us
              </a>
              <span className="text-[length:var(--fs-caption)] text-[rgba(255,255,255,.42)]">Mon – Sat, 10 am – 7 pm IST</span>
              <span className="text-[length:var(--fs-caption)] text-[rgba(255,255,255,.42)]">Chennai, India</span>
            </FooterColumn>

            <FooterColumn title="Legal">
              <Link
                href="/privacy-policy"
                className="text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[length:var(--fs-small)] text-[rgba(255,255,255,.72)] transition hover:text-white"
              >
                Terms &amp; Conditions
              </Link>
            </FooterColumn>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[rgba(58,120,72,.2)] px-4 py-3 sm:px-5 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[length:var(--fs-caption)] font-light text-[rgba(255,255,255,.38)]">
            © 2026 Green Roots. All rights reserved.
          </span>
          <div className="flex items-center gap-3 text-[length:var(--fs-caption)] font-light text-[rgba(255,255,255,.32)]">
            <span>The Gifting Company</span>
            <span className="h-3 w-px bg-[rgba(255,255,255,.15)]" />
            <span>Chennai, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Helpers ── */

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#3a7848]">
        {title}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function SocialIcon({ d, href, label }: { d: string; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(58,120,72,.35)] text-[rgba(255,255,255,.55)] transition hover:-translate-y-0.5 hover:border-[rgba(58,120,72,.7)] hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" opacity=".9" />
      <path d="M12.004 2.003a9.997 9.997 0 0 0-8.591 15.127L2 22l4.975-1.303A9.996 9.996 0 1 0 12.004 2.003zm0 18.18a8.169 8.169 0 0 1-4.169-1.146l-.299-.178-3.095.811.825-3.018-.195-.309a8.18 8.18 0 1 1 6.933 3.84z" />
    </svg>
  );
}
