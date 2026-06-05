"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  activeCategory: CategoryKey | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onSearch: () => void;
  onContact: () => void;
};

export function StoreHeader({ activeCategory, onNav, onSearch, onContact }: Props) {
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
            ? "border-b border-[rgba(180,204,182,.35)] bg-[rgba(245,249,245,.90)] shadow-[var(--shadow-1)] backdrop-blur-[24px]"
            : "border-b border-transparent bg-[linear-gradient(180deg,rgba(245,249,245,.85)_0%,rgba(245,249,245,.28)_72%,transparent_100%)]"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(30,61,34,.4),transparent)]" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(180,204,182,.5),transparent)] sm:inset-x-8 xl:inset-x-12" />

        {/* Logo — uses actual PNG */}
        <button
          onClick={() => handleNav(null, null)}
          className="relative z-[1] flex items-center transition hover:scale-[1.01]"
        >
          <Image
            src="/Green-Roots-logo.png"
            alt="Green Roots – The Gifting Company"
            width={160}
            height={44}
            className="h-9 w-auto"
            priority
          />
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-[rgba(180,204,182,.6)] bg-[rgba(246,251,247,.88)] px-1.5 py-1.5 shadow-[0_12px_30px_rgba(30,61,34,.06)] backdrop-blur-[16px] xl:flex xl:px-2">
          {Object.keys(CAT).map((item) => {
            const category = item as CategoryKey;
            const isOpen = dropdown === category;
            const isActive = activeCategory === category || isOpen;
            const subsWithoutAll = CAT[category].subs.filter((sub) => sub !== "All");
            const isManyItems = subsWithoutAll.length > 8;
            return (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => open(category)}
                onMouseLeave={close}
              >
                <button
                  onClick={() => handleNav(category, null)}
                  className={`group relative flex items-center gap-1 whitespace-nowrap rounded-full px-[11px] py-2 text-[12px] font-medium tracking-[0.02em] transition xl:px-[14px] xl:text-[12.5px] xl:tracking-[0.025em] ${
                    isActive
                      ? "bg-[#e4f0e6] text-[#0d0c0b] shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_8px_18px_rgba(30,61,34,.07)]"
                      : "text-[#3d5843] hover:bg-[rgba(228,240,230,.7)] hover:text-[#0d0c0b]"
                  }`}
                >
                  <span
                    className={`absolute inset-x-3 bottom-[6px] h-px origin-left rounded-full bg-[#3a7848] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  {category}
                  <svg
                    className={`transition duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                  className={`absolute top-[calc(100%+14px)] overflow-y-auto rounded-[22px] border border-[#b4ccb6] bg-[linear-gradient(180deg,rgba(246,251,247,.98)_0%,rgba(240,246,241,.96)_100%)] p-2 shadow-[var(--shadow-3)] transition ${
                    isManyItems
                      ? "left-1/2 -translate-x-1/2 w-[440px] max-h-[70vh]"
                      : "left-1/2 -translate-x-1/2 min-w-[220px] max-h-[70vh]"
                  } ${
                    isOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1.5 opacity-0"
                  }`}
                >
                  <div className="mb-1 rounded-[16px] bg-[rgba(30,61,34,.06)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4a6a50]">
                    {category}
                  </div>
                  <div className={isManyItems ? "grid grid-cols-2" : "flex flex-col"}>
                    {subsWithoutAll.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleNav(category, sub)}
                        className="flex w-full items-center gap-2.5 rounded-[16px] px-[13px] py-[9px] text-left text-[13px] text-[#3d5843] transition hover:bg-[#e4f0e6] hover:text-[#0d0c0b]"
                      >
                        <span
                          className="h-[6px] w-[6px] shrink-0 rounded-full opacity-70"
                          style={{ background: CAT[category].col }}
                        />
                        <span className="truncate">{sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="relative z-[1] flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onSearch}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[rgba(180,204,182,.6)] bg-[rgba(246,251,247,.75)] text-[#3d5843] shadow-[0_8px_18px_rgba(30,61,34,.04)] transition hover:-translate-y-px hover:bg-[#e4f0e6] hover:text-[#0d0c0b]"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={onContact}
            className="hidden rounded-full border border-[rgba(30,61,34,.12)] bg-[linear-gradient(135deg,#1e3d22_0%,#2d5a30_100%)] px-4 py-[10px] text-[12px] font-medium tracking-[0.05em] text-white shadow-[0_14px_28px_rgba(30,61,34,.22)] transition hover:-translate-y-px hover:shadow-[0_18px_36px_rgba(30,61,34,.30)] sm:inline-flex xl:px-5 xl:text-[12.5px]"
          >
            Contact Us
          </button>
          <button
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[rgba(180,204,182,.7)] bg-[rgba(246,251,247,.75)] text-[#3d5843] shadow-[0_8px_18px_rgba(30,61,34,.04)] transition hover:bg-[#e4f0e6] xl:hidden"
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
        className={`fixed inset-x-4 top-[76px] z-[190] max-h-[calc(100vh-92px)] overflow-y-auto rounded-[28px] border border-[#cadace] bg-[linear-gradient(180deg,rgba(246,251,247,.98)_0%,rgba(240,246,241,.98)_100%)] p-4 shadow-[var(--shadow-3)] backdrop-blur-[20px] transition sm:inset-x-5 md:inset-x-8 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(30,61,34,.08),transparent_72%)]" />
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
              Navigation
            </div>
            <div className="font-[var(--font-cormorant)] text-[28px] leading-none text-[#0d0c0b]">
              Browse Store
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full border border-[#baccbe] bg-white/75 px-4 py-2 text-[12px] font-medium text-[#3d5843] shadow-[0_8px_18px_rgba(30,61,34,.05)]"
          >
            Close
          </button>
        </div>

        <div className="grid gap-2">
          {(Object.keys(CAT) as CategoryKey[]).map((category) => {
            const expanded = mobileCategory === category;
            return (
              <div key={category} className="overflow-hidden rounded-[22px] border border-[#cadace] bg-white/65 shadow-[0_8px_24px_rgba(30,61,34,.04)]">
                <button
                  onClick={() =>
                    setMobileCategory((current) => (current === category ? null : category))
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(228,240,230,.9)]"
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
                <div className={`${expanded ? "block" : "hidden"} border-t border-[#cadace] py-3`}>
                  <div className="-mx-1 overflow-x-auto scroll-smooth">
                    <div className="flex gap-2 px-3 pb-1">
                      <button
                        onClick={() => handleNav(category, null)}
                        className="shrink-0 rounded-full bg-[#1e3d22] px-4 py-2 text-[12px] font-medium text-white shadow-[0_10px_24px_rgba(30,61,34,.22)]"
                      >
                        View All
                      </button>
                      {CAT[category].subs
                        .filter((sub) => sub !== "All")
                        .map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleNav(category, sub)}
                            className="shrink-0 rounded-full border border-[#b4ccb6] bg-white/80 px-4 py-2 text-[12px] font-medium text-[#3d5843] transition hover:border-[#3d5843] hover:text-[#0d0c0b]"
                          >
                            {sub}
                          </button>
                        ))}
                    </div>
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
