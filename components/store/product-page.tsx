"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BS_GALLERY_IMAGES, BS_HIDDEN_PAGES, BS_SECTIONS, CAT, PRODS, getApparelBrandHref, getApparelBrandImages, getBackpackBrandHref, getBackpackBrandImages, getBsSectionHref, getEdibleBrandHref, getEdibleBrandImages, getElecBrandHref, getElecBrandImages, getHaBrandHref, getHaBrandImages, getNewJoinerKitImages, getPremiumGiftsetImages, getProductHref, type CategoryKey, type Product } from "@/lib/store-data";
import { ProductCard } from "./product-card";
import { ImageLightbox } from "./image-lightbox";

/** Inserts a Cloudinary transformation string right after /upload/ */
function cloudinaryTransform(url: string, transform: string): string {
  return url.replace("/upload/", `/upload/${transform}/`);
}

type SortKey = "default" | "az" | "za";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "az", label: "Name A-Z" },
  { key: "za", label: "Name Z-A" },
];

/** Cycling palette for brand-pill letter avatars */
const PILL_COLORS: { bg: string; text: string }[] = [
  { bg: "#e4f0e6", text: "#1e4d22" },
  { bg: "#e8e4f0", text: "#3d1e6a" },
  { bg: "#f0e8e4", text: "#5a2d1e" },
  { bg: "#e4eaf0", text: "#1e3a5a" },
  { bg: "#f0f0e4", text: "#4a4a1e" },
  { bg: "#f0e4ea", text: "#5a1e3d" },
  { bg: "#e4f0f0", text: "#1e4a4a" },
  { bg: "#f0ece4", text: "#4a3a1e" },
  { bg: "#ece4f0", text: "#3a1e4a" },
  { bg: "#eaf0e4", text: "#2d4a1e" },
];

type Props = {
  category: CategoryKey;
  subcategory: string | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onEnquiry: (product: Product, category: CategoryKey) => void;
};

export function ProductPage({ category, subcategory, onNav, onEnquiry }: Props) {
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newOnly, setNewOnly] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset all local filters whenever the user navigates to a different category / subcategory
  useEffect(() => {
    setSearchQuery("");
    setNewOnly(false);
    setSortBy("default");
  }, [category, subcategory]);

  const config = CAT[category];
  const allProducts = PRODS[category];
  const baseProducts =
    subcategory && subcategory !== "All"
      ? allProducts.filter((p) => p.sub === subcategory)
      : allProducts;

  const filteredProducts = (() => {
    let list = baseProducts;
    if (newOnly) list = list.filter((p) => !!p.badge);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }
    return list;
  })();

  const hasNewItems = baseProducts.some((p) => !!p.badge);
  const hasActiveFilters = !!searchQuery.trim() || newOnly;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "az") return a.name.localeCompare(b.name);
    if (sortBy === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  const showBsGallery = category === "Apparels" && subcategory === "BS";
  const haGalleryImages = subcategory && subcategory !== "All"
    ? (category === "Home Appliances"
        ? getHaBrandImages(subcategory)
        : category === "Electronics"
          ? getElecBrandImages(subcategory)
          : category === "Edible"
            ? getEdibleBrandImages(subcategory)
            : category === "Backpacks"
              ? getBackpackBrandImages(subcategory)
              : category === "Premium Giftset"
                ? getPremiumGiftsetImages(subcategory)
                : category === "New Joiner Kit"
                  ? getNewJoinerKitImages(subcategory)
              : category === "Apparels"
                ? getApparelBrandImages(subcategory)
                : null)
    : null;
  const showHaGallery = haGalleryImages !== null;
  const bsSections = BS_SECTIONS.map((section) => {
    const images = BS_GALLERY_IMAGES.slice(section.start - 1, section.end).filter((_, index) => {
      const pageNumber = section.start + index;
      return !BS_HIDDEN_PAGES.has(pageNumber);
    });

    return {
      ...section,
      coverImage: images[0] ?? BS_GALLERY_IMAGES[section.start - 1],
      images,
    };
  });
  const visibleCount = showBsGallery
    ? bsSections.reduce((count, section) => count + section.images.length, 0)
    : showHaGallery
      ? (haGalleryImages?.length ?? 0)
      : sortedProducts.length;

  const subImages = Object.fromEntries(
    config.subs.map((sub) => [
      sub,
      sub === "All" ? config.img : allProducts.find((product) => product.sub === sub)?.img ?? config.img,
    ])
  ) as Record<string, string>;

  const crumbs = [
    { label: "Home", action: () => onNav(null, null) },
    { label: category, action: () => onNav(category, null) },
    ...(subcategory && subcategory !== "All" ? [{ label: subcategory, action: null }] : []),
  ];

  return (
    <section
      className="px-4 pb-16 sm:px-5 md:px-12 md:pb-24"
      style={{ animation: "fadeUp .4s var(--ease) forwards" }}
    >
      <div className="relative mb-6 overflow-hidden rounded-[24px] border border-[#ccd8ce] bg-[#f0f6f0] sm:mb-10 sm:rounded-[32px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)]" />
          <div className="absolute left-0 top-0 h-full w-[6px]" style={{ backgroundColor: config.col }} />
          <div className="absolute right-[-10%] top-[-20%] h-[240px] w-[240px] rounded-full bg-white/80 blur-3xl md:h-[320px] md:w-[320px]" />
        </div>

        <div className="relative z-[1] px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-9 lg:px-10">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[length:var(--fs-caption)] text-[#3d5843] sm:mb-8 sm:text-[length:var(--fs-caption)]">
            {crumbs.map((crumb, index) => (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span className="text-[#b4ccb6]">{">"}</span> : null}
                {crumb.action ? (
                  <button onClick={crumb.action} className="transition hover:text-[#0d0c0b]">
                    {crumb.label}
                  </button>
                ) : (
                  <span className="font-medium text-[#0d0c0b]">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div className="max-w-[760px]">
              <div className="mb-2 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#3d5843] sm:mb-3 sm:text-[length:var(--fs-caption)]">
                {category}
              </div>

              <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] leading-[.96] tracking-[-0.025em] text-[#0d0c0b]">
                {subcategory && subcategory !== "All" ? subcategory : category}
              </div>

              <div className="mt-2 max-w-[540px] text-[length:var(--fs-caption)] leading-[1.75] text-[#2d4430] sm:mt-3 sm:text-[length:var(--fs-small)]">
                {visibleCount} pieces
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 sm:gap-3 md:flex-col md:items-end">
              <div className="rounded-[18px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(30,61,34,.06)] backdrop-blur-[6px] sm:rounded-[22px] sm:px-5 sm:py-4">
                <div className="text-[length:var(--fs-caption)] uppercase tracking-[0.14em] text-[#3d5843] sm:text-[length:var(--fs-caption)]">
                  Available
                </div>
                <div className="mt-0.5 [font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] leading-none text-[#0d0c0b] sm:mt-1 sm:text-[length:var(--fs-h3)]">
                  {String(visibleCount).padStart(2, "0")}
                </div>
              </div>

              <div className="text-[length:var(--fs-caption)] font-medium text-[#3d5843] sm:text-[length:var(--fs-caption)]">
                {visibleCount} {visibleCount === 1 ? "item" : "items"}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-[#c4d4c6] pt-4 sm:mt-8 sm:pt-5">

            {/* ── Mobile: auto-scrolling marquee (overflow-hidden keeps it in-bounds, no -mx so page stays full-width) ── */}
            <div className="overflow-hidden sm:hidden">
              <div
                className="flex w-max items-center gap-2 py-1"
                style={{ animation: "tickerMove 30s linear infinite" }}
                onTouchStart={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onTouchEnd={(e)   => (e.currentTarget.style.animationPlayState = "running")}
              >
                {[...config.subs, ...config.subs].map((sub, idx) => {
                  const active  = (subcategory ?? "All") === sub;
                  const isReal  = idx < config.subs.length;
                  const colorIdx = config.subs.indexOf(sub) % PILL_COLORS.length;
                  const avatarColor = PILL_COLORS[colorIdx];
                  return (
                    <button
                      key={`mob-pill-${idx}`}
                      onClick={() => { if (isReal) onNav(category, sub === "All" ? null : sub); }}
                      tabIndex={isReal ? 0 : -1}
                      aria-hidden={!isReal}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[length:var(--fs-caption)] font-medium transition ${
                        active
                          ? "bg-[#0d0c0b] text-white shadow-[0_8px_18px_rgba(13,12,11,.14)]"
                          : "border border-[#c0d0c2] bg-white text-[#3d5843]"
                      }`}
                    >
                      <span
                        className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[length:var(--fs-caption)] font-bold uppercase"
                        style={active
                          ? { backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }
                          : { backgroundColor: avatarColor.bg, color: avatarColor.text }}
                      >
                        {sub.charAt(0)}
                      </span>
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Desktop: scrollable + wrap ── */}
            <div className="hidden sm:block sm:overflow-x-auto sm:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-wrap gap-2.5 pt-1 pb-2">
                {config.subs.map((sub, i) => {
                  const active = (subcategory ?? "All") === sub;
                  const avatarColor = PILL_COLORS[i % PILL_COLORS.length];
                  return (
                    <button
                      key={sub}
                      onClick={() => onNav(category, sub === "All" ? null : sub)}
                      className={`inline-flex shrink-0 items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-[length:var(--fs-caption)] font-medium transition ${
                        active
                          ? "bg-[#0d0c0b] text-white shadow-[0_8px_18px_rgba(13,12,11,.14)]"
                          : "border border-[#c0d0c2] bg-white text-[#3d5843] hover:-translate-y-px hover:border-[#7a9e82] hover:text-[#0d0c0b]"
                      }`}
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-[length:var(--fs-caption)] font-bold uppercase"
                        style={active
                          ? { backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }
                          : { backgroundColor: avatarColor.bg, color: avatarColor.text }}
                      >
                        {sub.charAt(0)}
                      </span>
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Filter bar — search · new-only · sort ── */}
      {!showHaGallery && !showBsGallery && subcategory !== "Diva & La Opala" && (
        <div className="mb-4 flex flex-col gap-2.5 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Search input */}
          <div className="relative flex-1 sm:max-w-[420px]">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a9a82]"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${category}…`}
              className="w-full rounded-full border border-[#c0d0c2] bg-white py-[9px] pl-9 pr-9 text-[length:var(--fs-small)] text-[#0d0c0b] placeholder:text-[#9ab8a0] shadow-[0_4px_14px_rgba(30,61,34,.04)] focus:border-[#3a7848] focus:outline-none focus:ring-2 focus:ring-[#3a7848]/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#e4f0e6] text-[#4a6a50] transition hover:bg-[#c8d8ca]"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Right: New-only · Sort · Clear */}
          <div className="flex shrink-0 items-center gap-2 py-1">
            {hasNewItems && (
              <button
                onClick={() => setNewOnly((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-[14px] py-[9px] text-[length:var(--fs-caption)] font-medium transition hover:-translate-y-px ${
                  newOnly
                    ? "border-[#1e3d22] bg-[#1e3d22] text-white shadow-[0_6px_14px_rgba(30,61,34,.20)]"
                    : "border-[#c0d0c2] bg-white text-[#3d5843] shadow-[0_4px_14px_rgba(30,61,34,.04)] hover:border-[#7a9e82]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${newOnly ? "bg-[#7af0a0]" : "bg-[#3a7848]"}`} />
                New only
              </button>
            )}

            {/* Sort */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-[14px] py-[9px] text-[length:var(--fs-caption)] font-medium transition hover:-translate-y-px hover:text-[#0d0c0b] ${
                  sortBy !== "default"
                    ? "border-[#0d0c0b] bg-[#0d0c0b] text-white hover:bg-[#252320]"
                    : "border-[#c0d0c2] bg-white text-[#3d5843] shadow-[0_4px_14px_rgba(30,61,34,.04)] hover:border-[#7a9e82]"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                {sortBy === "default" ? "Sort" : SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-[50] min-w-[148px] overflow-hidden rounded-[16px] border border-[#c2d4c4] bg-white shadow-[var(--shadow-3)]">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => { setSortBy(option.key); setSortOpen(false); }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[length:var(--fs-caption)] transition hover:bg-[#e4f0e6] ${
                        sortBy === option.key ? "font-semibold text-[#0d0c0b]" : "font-medium text-[#3d5843]"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.key && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear all filters */}
            {hasActiveFilters && (
              <button
                onClick={() => { setSearchQuery(""); setNewOnly(false); setSortBy("default"); }}
                className="inline-flex items-center gap-1 rounded-full border border-[#f0c4c4] bg-[#fff5f5] px-[14px] py-[9px] text-[length:var(--fs-caption)] font-medium text-[#9b4444] transition hover:bg-[#ffe8e8]"
              >
                Clear
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {subcategory === "Diva & La Opala" ? (
        <div className="overflow-hidden rounded-[24px] border border-[#ccd8ce] bg-white shadow-[0_4px_32px_rgba(0,0,0,.06)]">
          <div className="flex items-center gap-3 border-b border-[#ccd8ce] bg-[#f0f6f0] px-5 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#4a6a50]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[length:var(--fs-caption)] font-medium text-[#3d5843]">Diva & La Opala - 2024 Catalogue</span>
            <a
              href="/catalogues/diva-la-opala-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#c0d0c2] bg-white px-4 py-1.5 text-[length:var(--fs-caption)] font-medium text-[#3d5843] transition hover:border-[#b8a898] hover:text-[#0d0c0b]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Download
            </a>
          </div>
          <object
            data="/catalogues/diva-la-opala-2024.pdf"
            type="application/pdf"
            className="h-[85vh] w-full"
          >
            <div className="flex h-[85vh] flex-col items-center justify-center gap-6 bg-[#f0f6f0] px-6 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#c4b49e]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] text-[#0d0c0b]">Diva & La Opala Catalogue</div>
                <div className="mt-2 text-[length:var(--fs-small)] text-[#3d5843]">Your browser cannot display this PDF inline.</div>
              </div>
              <a
                href="/catalogues/diva-la-opala-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d0c0b] px-7 py-3.5 text-[length:var(--fs-small)] font-medium text-white transition hover:-translate-y-0.5"
              >
                Open Catalogue PDF
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </object>
        </div>
      ) : showHaGallery && haGalleryImages ? (
        <div className="overflow-hidden rounded-[28px] border border-[#ccd8ce] bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)]">
          <div className="flex flex-col gap-3 border-b border-[#ccd8ce] bg-[#f0f6f0] px-5 py-5 md:flex-row md:items-end md:justify-between md:px-7">
            <div>
              <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#3d5843]">
                {subcategory} Catalogue
              </div>
              <div className="mt-1 [font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] leading-none text-[#0d0c0b] md:text-[length:var(--fs-h2)]">
                {subcategory}
              </div>
              <div className="mt-2 text-[length:var(--fs-small)] leading-[1.7] text-[#3d5843]">
                {haGalleryImages.length} catalogue pages — click any to enquire
              </div>
            </div>
            <Link
              href={
                category === "Electronics"
                  ? getElecBrandHref(subcategory!)
                  : category === "Edible"
                    ? getEdibleBrandHref(subcategory!)
                  : category === "Backpacks"
                      ? getBackpackBrandHref(subcategory!)
                      : category === "Premium Giftset"
                        ? getProductHref(category, sortedProducts[0]!)
                        : category === "New Joiner Kit"
                          ? getProductHref(category, sortedProducts[0]!)
                      : category === "Apparels"
                        ? getApparelBrandHref(subcategory!)
                        : getHaBrandHref(subcategory!)
              }
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#1e3d22] px-5 py-2.5 text-[length:var(--fs-caption)] font-medium text-white transition hover:-translate-y-0.5"
            >
              Full page view
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4">
              {haGalleryImages.map((image, index) => {
                const haProduct = sortedProducts[0];
                // Cloudinary e_trim strips the baked-in white padding from Decathlon PDF pages
                const displayImage = subcategory === "Decathlon"
                  ? cloudinaryTransform(image, "e_trim:20")
                  : image;
                return (
                  <div
                    key={image}
                    onClick={() => haProduct && onEnquiry({ ...haProduct, name: `${subcategory} — Page ${String(index + 1).padStart(2, "0")}`, desc: `${subcategory} catalogue page ${String(index + 1).padStart(2, "0")}`, img: displayImage }, category)}
                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[26px] border border-[#bcccbe] bg-[linear-gradient(145deg,#f6fbf7_0%,#e8f3e9_52%,#ddeedd_100%)] text-left shadow-[0_18px_44px_rgba(30,61,34,.10)] transition duration-300 hover:-translate-y-2 hover:border-[#3a7848] hover:shadow-[0_26px_60px_rgba(30,61,34,.18)]"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-white/70" />
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/80" />
                      <div className="absolute right-[-40px] top-[-48px] h-36 w-36 rounded-full bg-[rgba(255,255,255,.6)] blur-3xl transition duration-500 group-hover:scale-110" />
                      <div className="absolute bottom-[-70px] left-[-30px] h-40 w-40 rounded-full bg-[rgba(30,61,34,.08)] blur-3xl" />
                    </div>
                    <div className="relative p-1.5 sm:p-3">
                      <div className="relative overflow-hidden rounded-[16px] border border-white/80 bg-[radial-gradient(circle_at_top,#eef5ef_0%,#ddeedd_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
                        <img
                          src={displayImage}
                          alt={`${subcategory} catalogue page ${index + 1}`}
                          className="block w-full h-auto transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 h-20 rounded-b-[16px] bg-[linear-gradient(to_top,rgba(33,24,16,.28)_0%,rgba(33,24,16,0)_100%)]" />
                        {/* Zoom / expand button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setLightboxImg(displayImage); }}
                          className="absolute right-2 top-2 z-[10] flex h-8 w-8 scale-100 items-center justify-center rounded-full bg-white/85 text-[#3d5843] opacity-100 backdrop-blur-[6px] transition duration-200 hover:bg-white hover:text-[#0d0c0b] md:scale-90 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
                          aria-label="View full image"
                        >
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between gap-2 px-3 pb-3 pt-1 sm:gap-4 sm:px-5 sm:pb-5">
                      <div>
                        <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#3d7048] sm:text-[length:var(--fs-caption)] sm:tracking-[0.18em]">{subcategory}</div>
                        <div className="mt-0.5 [font-family:var(--font-montserrat)] text-[length:var(--fs-h5)] leading-none tracking-[-0.02em] text-[#111d12] sm:mt-1 sm:text-[length:var(--fs-h3)]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#b6ccb8] bg-[linear-gradient(180deg,#f6fbf7_0%,#ddeedd_100%)] text-[#2e4e33] shadow-[0_10px_20px_rgba(30,61,34,.08)] transition group-hover:border-[#3a7848] group-hover:bg-[#1e3d22] group-hover:text-white sm:h-11 sm:w-11">
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : showBsGallery ? (
        <div className="overflow-hidden rounded-[28px] border border-[#ccd8ce] bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)]">
          <div className="flex flex-col gap-3 border-b border-[#ccd8ce] bg-[#f0f6f0] px-5 py-5 md:flex-row md:items-end md:justify-between md:px-7">
            <div>
              <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#3d5843]">
                Updated BS Gallery
              </div>
              <div className="mt-1 [font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] leading-none text-[#0d0c0b] md:text-[length:var(--fs-h2)]">
                BS Stocks
              </div>
              <div className="mt-2 text-[length:var(--fs-small)] leading-[1.7] text-[#3d5843]">
                Choose a BS category to open its products on a separate page.
              </div>
            </div>

            <div className="inline-flex items-center gap-3 self-start rounded-full border border-[#c2d4c4] bg-white px-4 py-2.5 text-[length:var(--fs-caption)] font-medium text-[#3d5843]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4f0e6] text-[#0d0c0b]">
                {String(BS_GALLERY_IMAGES.length).padStart(2, "0")}
              </span>
              Updated products
            </div>
          </div>

          <div className="border-b border-[#c4d6c6] bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)] px-4 py-4 sm:px-5 sm:py-5 md:px-7">
            <div className="mb-3 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#4a7254]">
              Browse By Category
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4">
              {bsSections.map((section) => (
                <Link
                  key={section.id}
                  href={getBsSectionHref(section.id)}
                  className="block group overflow-hidden rounded-[26px] border border-[#c2d4c4] bg-white/90 text-left shadow-[0_8px_24px_rgba(30,61,34,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#3a7848] hover:shadow-[0_18px_36px_rgba(30,61,34,.10)]"
                >
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#eaf4eb_0%,#ddeedd_100%)]">
                    <img
                      src={section.coverImage}
                      alt={section.label}
                      className="block w-full h-auto transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-3 bottom-3 h-20 rounded-b-[18px] bg-[linear-gradient(to_top,rgba(17,29,18,.34)_0%,rgba(27,20,14,0)_100%)]" />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-1">
                    <div>
                      <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#3d7048]">
                        BS Collection
                      </div>
                      <div className="mt-1 [font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] leading-none text-[#111d12]">
                        {section.label}
                      </div>
                      <div className="mt-2 text-[length:var(--fs-caption)] leading-[1.6] text-[#4a6652]">
                        Products {String(section.start).padStart(2, "0")} to {String(section.end).padStart(2, "0")}
                      </div>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b6ccb8] bg-[linear-gradient(180deg,#f6fbf7_0%,#ddeedd_100%)] text-[#2e4e33] transition group-hover:border-[#3a7848] group-hover:bg-[#1e3d22] group-hover:text-white">
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : sortedProducts.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center gap-5 rounded-[28px] border border-[#ccd8ce] bg-[#f6fbf7] py-20 text-center px-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e4f0e6] text-[#4a7254]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16.5 16.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] text-[#0d0c0b]">No results found</div>
            <div className="mt-1.5 text-[length:var(--fs-small)] leading-[1.7] text-[#4a6652]">
              {searchQuery ? `No items matching "${searchQuery}"` : "No new items in this category yet"}
            </div>
          </div>
          <button
            onClick={() => { setSearchQuery(""); setNewOnly(false); }}
            className="rounded-full bg-[#1e3d22] px-7 py-2.5 text-[length:var(--fs-small)] font-medium text-white transition hover:-translate-y-0.5"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-3 md:columns-3 md:gap-[18px]">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="break-inside-avoid mb-4 sm:mb-3 md:mb-[18px]">
              <ProductCard
                product={product}
                category={category}
                delay={index * 55}
                onEnquiry={onEnquiry}
                onBrandClick={() => onNav(category, product.sub)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Gallery lightbox — for HA catalogue images */}
      <ImageLightbox
        src={lightboxImg ?? ""}
        alt="Catalogue image"
        isOpen={lightboxImg !== null}
        onClose={() => setLightboxImg(null)}
      />
    </section>
  );
}
