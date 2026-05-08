"use client";

import { useState } from "react";
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
    <footer className="bg-[#0d0c0b] px-5 py-[60px] text-[rgba(255,255,255,.8)] md:px-12 md:py-[88px]">
      <div className="mb-16 grid gap-10 md:grid-cols-2 xl:grid-cols-[2.2fr_1fr_1fr_1fr] xl:gap-14">
        <div>
          <div className="mb-[14px] flex items-center gap-2.5 font-[var(--font-cormorant)] text-[28px] tracking-[0.12em]">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[rgba(255,255,255,.2)] text-[9px] tracking-[0.06em] text-[rgba(255,255,255,.4)]">
              GR
            </span>
            GREEN ROOTS
          </div>
          <p className="max-w-[290px] text-[13.5px] leading-[1.75] font-light text-[rgba(255,255,255,.58)]">
            Premium clothing and accessories, available by enquiry. Every piece is curated with intention and enduring craft.
          </p>
          <div className="mt-9">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,.5)]">
              Stay updated
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-5 py-3 text-[12.5px] text-[rgba(255,255,255,.6)]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="#b8975a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                  className="min-w-0 flex-1 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-2.5 text-[12.5px] text-white outline-none transition placeholder:text-[rgba(255,255,255,.25)] focus:border-[rgba(255,255,255,.25)] sm:min-w-[220px]"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full rounded-full border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.1)] px-5 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-[rgba(255,255,255,.18)] sm:w-auto"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
          <div className="mt-7 flex gap-2.5">
            <SocialIcon
              href="https://instagram.com"
              d="M7.5 1.5C4.2 1.5 1.5 4.2 1.5 7.5s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
            />
            <SocialIcon
              href="https://linkedin.com"
              d="M1.5 4h12M1.5 7.5h12M1.5 11h7"
            />
            <SocialIcon
              href="https://twitter.com"
              d="M1 11L5.5 6.5 1 2M7.5 11h6.5"
            />
          </div>
        </div>

        <FooterColumn title="Collections">
          {(Object.keys(CAT) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => onNav(category, null)}
              className="text-left text-[13.5px] font-light text-[rgba(255,255,255,.65)] transition hover:text-white"
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
              className="text-[13.5px] font-light text-[rgba(255,255,255,.65)] transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </FooterColumn>

        <div>
          <FooterColumn title="Contact">
            <a
              href="mailto:hello@greenroots.co"
              className="text-[13.5px] font-light text-[rgba(255,255,255,.65)] transition hover:text-white"
            >
              hello@greenroots.co
            </a>
            <a
              href="tel:+18002873400"
              className="text-[13.5px] font-light text-[rgba(255,255,255,.65)] transition hover:text-white"
            >
              +1 (800) 287-3400
            </a>
            <span className="text-[13.5px] font-light text-[rgba(255,255,255,.65)]">Mon–Fri, 9am–6pm IST</span>
          </FooterColumn>
          <div className="mt-7">
            <FooterColumn title="Legal">
              {["Privacy Policy", "Terms", "Returns"].map((item) => (
                <a
                  key={item}
                  href={`mailto:hello@greenroots.co?subject=${encodeURIComponent(item)}`}
                  className="text-[13.5px] font-light text-[rgba(255,255,255,.65)] transition hover:text-white"
                >
                  {item}
                </a>
              ))}
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(255,255,255,.06)] pt-7">
        <span className="text-xs font-light text-[rgba(255,255,255,.45)]">© 2026 Green Roots. All rights reserved.</span>
        <span className="text-xs font-light text-[rgba(255,255,255,.45)]">Crafted with care for quality.</span>
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
      <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,.5)]">
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,.1)] text-[rgba(255,255,255,.4)] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,.28)] hover:text-white"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
