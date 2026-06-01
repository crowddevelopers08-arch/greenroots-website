"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BS_GALLERY_IMAGES, BS_HIDDEN_PAGES, BS_SECTIONS, CAT, PRODS, getBsSectionHref, getHaBrandHref, getHaBrandImages, type CategoryKey, type Product } from "@/lib/store-data";
import { ProductCard } from "./product-card";
import { ImageLightbox } from "./image-lightbox";

type SortKey = "default" | "az" | "za";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "az", label: "Name A-Z" },
  { key: "za", label: "Name Z-A" },
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

  const config = CAT[category];
  const allProducts = PRODS[category];
  const filteredProducts =
    subcategory && subcategory !== "All"
      ? allProducts.filter((product) => product.sub === subcategory)
      : allProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "az") return a.name.localeCompare(b.name);
    if (sortBy === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  const showBsGallery = category === "Apparel" && subcategory === "BS";
  const haGalleryImages = category === "Home Appliances" && subcategory && subcategory !== "All"
    ? getHaBrandImages(subcategory)
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
      className="px-5 pb-20 md:px-12 md:pb-24"
      style={{ animation: "fadeUp .4s var(--ease) forwards" }}
    >
      <div className="relative mb-10 overflow-hidden rounded-[32px] border border-[#ccd8ce] bg-[#f0f6f0]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)]" />
          <div className="absolute left-0 top-0 h-full w-[6px]" style={{ backgroundColor: config.col }} />
          <div className="absolute right-[-10%] top-[-20%] h-[240px] w-[240px] rounded-full bg-white/80 blur-3xl md:h-[320px] md:w-[320px]" />
        </div>

        <div className="relative z-[1] px-5 py-8 md:px-8 md:py-9 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[12.5px] text-[#3d5843]">
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

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div className="max-w-[760px]">
              <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#3d5843]">
                {category}
              </div>

              <div className="font-[var(--font-cormorant)] text-[clamp(38px,4.7vw,66px)] leading-[.96] tracking-[-0.025em] text-[#0d0c0b]">
                {subcategory && subcategory !== "All" ? subcategory : category}
              </div>

              <div className="mt-3 max-w-[540px] text-[13px] leading-[1.75] text-[#2d4430] sm:text-[14px]">
                {visibleCount} pieces
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <div className="rounded-[22px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_10px_30px_rgba(30,61,34,.06)] backdrop-blur-[6px]">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#3d5843]">
                  Available
                </div>
                <div className="mt-1 font-[var(--font-cormorant)] text-[30px] leading-none text-[#0d0c0b]">
                  {String(visibleCount).padStart(2, "0")}
                </div>
              </div>

              {!showBsGallery ? (
                <div ref={sortRef} className="relative">
                  <button
                    onClick={() => setSortOpen((value) => !value)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-[18px] py-[10px] text-[12.5px] font-medium transition hover:-translate-y-px hover:text-[#0d0c0b] ${
                      sortBy !== "default"
                        ? "border-[#0d0c0b] bg-[#0d0c0b] text-white hover:bg-[#252320]"
                        : "border-[#c0d0c2] bg-white text-[#3d5843] hover:border-[#7a9e82]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    {sortBy === "default" ? "Sort" : SORT_OPTIONS.find((option) => option.key === sortBy)?.label}
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-[50] min-w-[148px] overflow-hidden rounded-[16px] border border-[#c2d4c4] bg-white shadow-[var(--shadow-3)]">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            setSortBy(option.key);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[12.5px] transition hover:bg-[#e4f0e6] ${
                            sortBy === option.key ? "font-semibold text-[#0d0c0b]" : "font-medium text-[#3d5843]"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.key ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-8 border-t border-[#c4d4c6] pt-5">
            <div className="flex flex-wrap gap-2.5">
              {config.subs.map((sub) => {
                const active = (subcategory ?? "All") === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => onNav(category, sub === "All" ? null : sub)}
                    className={`inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-[12.5px] font-medium transition ${
                      active
                        ? "bg-[#0d0c0b] text-white shadow-[0_8px_18px_rgba(13,12,11,.14)]"
                        : "border border-[#c0d0c2] bg-white text-[#3d5843] hover:-translate-y-px hover:border-[#7a9e82] hover:text-[#0d0c0b]"
                    }`}
                  >
                    <span className="h-9 w-9 overflow-hidden rounded-full border border-white/40 bg-[#e4f0e6]">
                      <img src={subImages[sub]} alt={sub} className="h-full w-full object-cover" />
                    </span>
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {subcategory === "Diva & La Opala" ? (
        <div className="overflow-hidden rounded-[24px] border border-[#ccd8ce] bg-white shadow-[0_4px_32px_rgba(0,0,0,.06)]">
          <div className="flex items-center gap-3 border-b border-[#ccd8ce] bg-[#f0f6f0] px-5 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#4a6a50]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12.5px] font-medium text-[#3d5843]">Diva & La Opala - 2024 Catalogue</span>
            <a
              href="/catalogues/diva-la-opala-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#c0d0c2] bg-white px-4 py-1.5 text-[11.5px] font-medium text-[#3d5843] transition hover:border-[#b8a898] hover:text-[#0d0c0b]"
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
                <div className="font-[var(--font-cormorant)] text-[26px] text-[#0d0c0b]">Diva & La Opala Catalogue</div>
                <div className="mt-2 text-[13px] text-[#3d5843]">Your browser cannot display this PDF inline.</div>
              </div>
              <a
                href="/catalogues/diva-la-opala-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d0c0b] px-7 py-3.5 text-[13px] font-medium text-white transition hover:-translate-y-0.5"
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
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#3d5843]">
                {subcategory} Catalogue
              </div>
              <div className="mt-1 font-[var(--font-cormorant)] text-[30px] leading-none text-[#0d0c0b] md:text-[36px]">
                {subcategory}
              </div>
              <div className="mt-2 text-[13px] leading-[1.7] text-[#3d5843]">
                {haGalleryImages.length} catalogue pages — click any to enquire
              </div>
            </div>
            <Link
              href={getHaBrandHref(subcategory!)}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#1e3d22] px-5 py-2.5 text-[12.5px] font-medium text-white transition hover:-translate-y-0.5"
            >
              Full page view
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {haGalleryImages.map((image, index) => {
                const haProduct = sortedProducts[0];
                return (
                  <div
                    key={image}
                    onClick={() => haProduct && onEnquiry({ ...haProduct, name: `${subcategory} — Page ${String(index + 1).padStart(2, "0")}`, desc: `${subcategory} catalogue page ${String(index + 1).padStart(2, "0")}`, img: image }, category)}
                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[26px] border border-[#bcccbe] bg-[linear-gradient(145deg,#f6fbf7_0%,#e8f3e9_52%,#ddeedd_100%)] text-left shadow-[0_18px_44px_rgba(30,61,34,.10)] transition duration-300 hover:-translate-y-2 hover:border-[#3a7848] hover:shadow-[0_26px_60px_rgba(30,61,34,.18)]"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-white/70" />
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/80" />
                      <div className="absolute right-[-40px] top-[-48px] h-36 w-36 rounded-full bg-[rgba(255,255,255,.6)] blur-3xl transition duration-500 group-hover:scale-110" />
                      <div className="absolute bottom-[-70px] left-[-30px] h-40 w-40 rounded-full bg-[rgba(30,61,34,.08)] blur-3xl" />
                    </div>
                    <div className="relative p-3">
                      <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-[radial-gradient(circle_at_top,#eef5ef_0%,#ddeedd_100%)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
                        <img
                          src={image}
                          alt={`${subcategory} catalogue page ${index + 1}`}
                          className="h-auto w-full rounded-[16px] object-contain transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 h-20 rounded-b-[16px] bg-[linear-gradient(to_top,rgba(33,24,16,.28)_0%,rgba(33,24,16,0)_100%)]" />
                        {/* Zoom / expand button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setLightboxImg(image); }}
                          className="absolute right-2 top-2 z-[10] flex h-8 w-8 scale-100 items-center justify-center rounded-full bg-white/85 text-[#3d5843] opacity-100 backdrop-blur-[6px] transition duration-200 hover:bg-white hover:text-[#0d0c0b] md:scale-90 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
                          aria-label="View full image"
                        >
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between gap-4 px-5 pb-5 pt-1">
                      <div>
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3d7048]">{subcategory}</div>
                        <div className="mt-1 font-[var(--font-cormorant)] text-[28px] leading-none tracking-[-0.02em] text-[#111d12]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b6ccb8] bg-[linear-gradient(180deg,#f6fbf7_0%,#ddeedd_100%)] text-[#2e4e33] shadow-[0_10px_20px_rgba(30,61,34,.08)] transition group-hover:border-[#3a7848] group-hover:bg-[#1e3d22] group-hover:text-white">
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
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#3d5843]">
                Updated BS Gallery
              </div>
              <div className="mt-1 font-[var(--font-cormorant)] text-[30px] leading-none text-[#0d0c0b] md:text-[36px]">
                BS Stocks
              </div>
              <div className="mt-2 text-[13px] leading-[1.7] text-[#3d5843]">
                Choose a BS category to open its products on a separate page.
              </div>
            </div>

            <div className="inline-flex items-center gap-3 self-start rounded-full border border-[#c2d4c4] bg-white px-4 py-2.5 text-[12.5px] font-medium text-[#3d5843]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4f0e6] text-[#0d0c0b]">
                {String(BS_GALLERY_IMAGES.length).padStart(2, "0")}
              </span>
              Updated products
            </div>
          </div>

          <div className="border-b border-[#c4d6c6] bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)] px-5 py-5 md:px-7">
            <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4a7254]">
              Browse By Category
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {bsSections.map((section) => (
                <Link
                  key={section.id}
                  href={getBsSectionHref(section.id)}
                  className="group overflow-hidden rounded-[26px] border border-[#c2d4c4] bg-white/90 text-left shadow-[0_8px_24px_rgba(30,61,34,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#3a7848] hover:shadow-[0_18px_36px_rgba(30,61,34,.10)]"
                >
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#eaf4eb_0%,#ddeedd_100%)] p-3">
                    <img
                      src={section.coverImage}
                      alt={section.label}
                      className="h-auto w-full rounded-[18px] object-contain transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-3 bottom-3 h-20 rounded-b-[18px] bg-[linear-gradient(to_top,rgba(17,29,18,.34)_0%,rgba(27,20,14,0)_100%)]" />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-1">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d7048]">
                        BS Collection
                      </div>
                      <div className="mt-1 font-[var(--font-cormorant)] text-[26px] leading-none text-[#111d12]">
                        {section.label}
                      </div>
                      <div className="mt-2 text-[11.5px] leading-[1.6] text-[#4a6652]">
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
      ) : (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              delay={index * 55}
              onEnquiry={onEnquiry}
            />
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
