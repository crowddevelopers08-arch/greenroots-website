"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function StoreFooter({ onNav }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer className="bg-[#111d12] px-4 py-8 text-[rgba(255,255,255,.8)] sm:px-5 sm:py-10 md:px-12 md:py-[88px]">
      {/* Subtle top green glow line */}
      <div className="pointer-events-none mb-8 h-px bg-[linear-gradient(90deg,transparent,rgba(58,120,72,.55),transparent)] sm:mb-10 md:mb-16" />

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-[2.2fr_1fr_1fr_1fr] xl:gap-14">
        <div>
          {/* Logo — white version via CSS filter */}
          <div className="mb-5">
            <Image
              src="/Green-Roots-logo.png"
              alt="Green Roots – The Gifting Company"
              width={180}
              height={50}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          <p className="max-w-[290px] text-[13.5px] leading-[1.85] text-[rgba(255,255,255,.72)]">
            Premium corporate gifting, available by enquiry. Every piece is curated with intention and enduring craft.
          </p>

          <div className="mt-7 sm:mt-9">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3a7848]">
              Stay updated
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-full border border-[rgba(58,120,72,.35)] bg-[rgba(58,120,72,.12)] px-5 py-3 text-[12.5px] text-[rgba(255,255,255,.85)]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="#3a7848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                You&apos;re subscribed. Thank you!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.05)] px-4 py-2.5 text-[12.5px] text-white outline-none transition placeholder:text-[rgba(255,255,255,.22)] focus:border-[rgba(58,120,72,.55)] sm:min-w-[220px]"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full rounded-full border border-[rgba(58,120,72,.4)] bg-[rgba(58,120,72,.2)] px-5 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-[rgba(58,120,72,.38)] sm:w-auto"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>

          <div className="mt-7 flex gap-2.5">
            <SocialIcon
              href="https://instagram.com"
              d="M10.6 1.5H4.4A2.9 2.9 0 0 0 1.5 4.4v6.2a2.9 2.9 0 0 0 2.9 2.9h6.2a2.9 2.9 0 0 0 2.9-2.9V4.4a2.9 2.9 0 0 0-2.9-2.9zM7.5 10.8A3.3 3.3 0 1 1 7.5 4.2a3.3 3.3 0 0 1 0 6.6zm3.45-6.95a.78.78 0 1 1 0-1.56.78.78 0 0 1 0 1.56z"
            />
            <SocialIcon
              href="https://linkedin.com"
              d="M3.1 5.5v6.9M3.15 3.2a.85.85 0 1 1-.01 1.7.85.85 0 0 1 .01-1.7zM6.1 12.4V5.5h2.2v1c.38-.7 1.28-1.2 2.36-1.2 2.02 0 2.84 1.32 2.84 3.53v3.57h-2.2V9.12c0-1.14-.4-1.92-1.42-1.92-.78 0-1.24.52-1.45 1.02-.07.18-.09.43-.09.68v3.5H6.1z"
            />
            <SocialIcon
              href="https://youtube.com"
              d="M13.2 4.2c-.14-.53-.56-.95-1.09-1.09C11.12 2.85 7.5 2.85 7.5 2.85s-3.62 0-4.61.26c-.53.14-.95.56-1.09 1.09C1.54 5.19 1.54 7.5 1.54 7.5s0 2.31.26 3.3c.14.53.56.95 1.09 1.09.99.26 4.61.26 4.61.26s3.62 0 4.61-.26c.53-.14.95-.56 1.09-1.09.26-.99.26-3.3.26-3.3s0-2.31-.26-3.3zM6.3 9.65V5.35l3.73 2.15L6.3 9.65z"
            />
          </div>
        </div>

        <FooterColumn title="Collections">
          {(Object.keys(CAT) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => onNav(category, null)}
              className="text-left text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
            >
              {category}
            </button>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {["About Us", "Our Story", "Sustainability", "Press", "Careers"].map((item) => (
            <a
              key={item}
              href={`mailto:hello@greenroots.co?subject=${encodeURIComponent(item)}`}
              className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </FooterColumn>

        <div>
          <FooterColumn title="Contact">
            <a
              href="mailto:hello@greenroots.co"
              className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
            >
              hello@greenroots.co
            </a>
            <a
              href="tel:+18002873400"
              className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
            >
              +1 (800) 287-3400
            </a>
            <span className="text-[13.5px] text-[rgba(255,255,255,.75)]">Mon-Fri, 9am-6pm IST</span>
          </FooterColumn>
          <div className="mt-7">
            <FooterColumn title="Legal">
              <Link
                href="/privacy-policy"
                className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/thank-you"
                className="text-[13.5px] text-[rgba(255,255,255,.75)] transition hover:text-white"
              >
                Thank You
              </Link>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(58,120,72,.25)] pt-6 sm:mt-12 sm:pt-7">
        <span className="text-xs font-light text-[rgba(255,255,255,.45)]">© 2026 Green Roots. All rights reserved.</span>
        <span className="text-xs font-light text-[rgba(255,255,255,.45)]">The Gifting Company</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3a7848]">
        {title}
      </div>
      <div className="flex flex-col gap-[13px]">{children}</div>
    </div>
  );
}

function SocialIcon({ d, href }: { d: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(58,120,72,.35)] text-[rgba(255,255,255,.55)] transition hover:-translate-y-0.5 hover:border-[rgba(58,120,72,.7)] hover:text-white"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
