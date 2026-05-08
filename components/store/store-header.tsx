"use client";

import { useEffect, useRef, useState } from "react";
import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  activeCategory: CategoryKey | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onSearch: () => void;
};

export function StoreHeader({ activeCategory, onNav, onSearch }: Props) {
  const [dropdown, setDropdown] = useState<CategoryKey | null>(null);
  const [glass, setGlass] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<CategoryKey | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setGlass(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const open = (category: CategoryKey) => {
    if (timer.current) clearTimeout(timer.current);
    setDropdown(category);
  };

  const close = () => {
    timer.current = setTimeout(() => setDropdown(null), 140);
  };

  const handleNav = (category: CategoryKey | null, subcategory: string | null) => {
    onNav(category, subcategory);
    setDropdown(null);
    setMobileMenuOpen(false);
    setMobileCategory(null);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between px-4 transition-all duration-300 sm:px-5 md:px-8 xl:px-12 ${
          glass
            ? "border-b border-[rgba(214,202,184,.35)] bg-[rgba(250,249,247,.94)] shadow-[var(--shadow-1)] backdrop-blur-[24px]"
            : "border-b border-transparent"
        }`}
      >
        <button
          onClick={() => handleNav(null, null)}
          className="flex items-center gap-2 font-[var(--font-cormorant)] text-[18px] font-normal uppercase tracking-[0.12em] sm:gap-2.5 sm:text-[21px] sm:tracking-[0.15em]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-[9px] tracking-[0.08em] opacity-60">
            GR
          </span>
          GREEN ROOTS
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center xl:flex">
          {Object.keys(CAT).map((item) => {
            const category = item as CategoryKey;
            const isOpen = dropdown === category;
            return (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => open(category)}
                onMouseLeave={close}
              >
                <button
                  onClick={() => handleNav(category, null)}
                  className={`flex items-center gap-1 rounded-xl px-[13px] py-2 text-[12.5px] font-medium tracking-[0.025em] transition ${
                    activeCategory === category || isOpen
                      ? "bg-[#f4ede3] text-[#0d0c0b]"
                      : "text-[#5c5348]"
                  }`}
                >
                  {category}
                  <svg
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute left-1/2 top-[calc(100%+12px)] min-w-[196px] -translate-x-1/2 rounded-[20px] border border-[#d6cab8] bg-[#faf9f7] p-2 shadow-[var(--shadow-3)] transition ${
                    isOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1.5 opacity-0"
                  }`}
                >
                  {CAT[category].subs
                    .filter((sub) => sub !== "All")
                    .map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleNav(category, sub)}
                        className="flex w-full items-center gap-2.5 rounded-xl px-[13px] py-[9px] text-left text-[13px] text-[#5c5348] transition hover:bg-[#f4ede3] hover:text-[#0d0c0b]"
                      >
                        <span
                          className="h-[5px] w-[5px] rounded-full opacity-60"
                          style={{ background: CAT[category].col }}
                        />
                        {sub}
                      </button>
                    ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onSearch}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#5c5348] transition hover:bg-[#f4ede3] hover:text-[#0d0c0b]"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <a
            href="mailto:hello@greenroots.co"
            className="hidden rounded-full bg-[#0d0c0b] px-4 py-[9px] text-[12px] font-medium tracking-[0.03em] text-white transition hover:-translate-y-px hover:bg-[#252320] hover:shadow-[var(--shadow-2)] sm:inline-flex xl:px-5 xl:text-[12.5px]"
          >
            Contact Us
          </a>
          <button
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#d6cab8] text-[#5c5348] transition hover:bg-[#f4ede3] xl:hidden"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileMenuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-x-4 top-[76px] z-[190] max-h-[calc(100vh-92px)] overflow-y-auto rounded-[28px] border border-[#eae0d2] bg-[rgba(250,249,247,.98)] p-4 shadow-[var(--shadow-3)] backdrop-blur-[20px] transition sm:inset-x-5 md:inset-x-8 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
              Navigation
            </div>
            <div className="font-[var(--font-cormorant)] text-[28px] leading-none text-[#0d0c0b]">
              Browse Store
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full bg-[#f4ede3] px-4 py-2 text-[12px] font-medium text-[#5c5348]"
          >
            Close
          </button>
        </div>

        <div className="grid gap-2">
          {(Object.keys(CAT) as CategoryKey[]).map((category) => {
            const expanded = mobileCategory === category;
            return (
              <div key={category} className="overflow-hidden rounded-2xl border border-[#eae0d2] bg-white/60">
                <button
                  onClick={() =>
                    setMobileCategory((current) => (current === category ? null : category))
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: CAT[category].col }}
                    />
                    <span className="text-[14px] font-medium text-[#0d0c0b]">{category}</span>
                  </span>
                  <svg
                    className={`transition ${expanded ? "rotate-180" : ""}`}
                    width="12"
                    height="12"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className={`${expanded ? "block" : "hidden"} border-t border-[#eae0d2] px-3 py-3`}>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleNav(category, null)}
                      className="rounded-full bg-[#0d0c0b] px-4 py-2 text-[12px] font-medium text-white"
                    >
                      View All
                    </button>
                    {CAT[category].subs
                      .filter((sub) => sub !== "All")
                      .map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleNav(category, sub)}
                          className="rounded-full border border-[#d6cab8] px-4 py-2 text-[12px] font-medium text-[#5c5348] transition hover:border-[#5c5348] hover:text-[#0d0c0b]"
                        >
                          {sub}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
