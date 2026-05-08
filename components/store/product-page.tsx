"use client";

import { useState, useRef, useEffect } from "react";
import { CAT, PRODS, type CategoryKey, type Product } from "@/lib/store-data";
import { ProductCard } from "./product-card";

type SortKey = "default" | "az" | "za";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "az", label: "Name A–Z" },
  { key: "za", label: "Name Z–A" },
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
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
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
      <div className="relative mb-10 overflow-hidden rounded-[32px] border border-[#ebe2d6] bg-[#fcfaf7]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ee_100%)]" />
          <div className="absolute left-0 top-0 h-full w-[6px]" style={{ backgroundColor: config.col }} />
          <div className="absolute right-[-10%] top-[-20%] h-[240px] w-[240px] rounded-full bg-white/80 blur-3xl md:h-[320px] md:w-[320px]" />
        </div>

        <div className="relative z-[1] px-5 py-8 md:px-8 md:py-9 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[12.5px] text-[#5c5348]">
            {crumbs.map((crumb, index) => (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span className="text-[#d6cab8]">›</span> : null}
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
              <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#5c5348]">
                {category}
              </div>

              <div className="font-[var(--font-cormorant)] text-[clamp(38px,4.7vw,66px)] leading-[.96] tracking-[-0.025em] text-[#0d0c0b]">
                {subcategory && subcategory !== "All" ? subcategory : category}
              </div>

              <div className="mt-3 max-w-[540px] text-[13px] leading-[1.75] text-[#3d3530] sm:text-[14px]">
                {sortedProducts.length} pieces · Enquire for pricing & availability
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <div className="rounded-[22px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_10px_30px_rgba(170,150,130,.08)] backdrop-blur-[6px]">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#5c5348]">
                  Available
                </div>
                <div className="mt-1 font-[var(--font-cormorant)] text-[30px] leading-none text-[#0d0c0b]">
                  {String(sortedProducts.length).padStart(2, "0")}
                </div>
              </div>

              <div ref={sortRef} className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-[18px] py-[10px] text-[12.5px] font-medium transition hover:-translate-y-px hover:text-[#0d0c0b] ${
                    sortBy !== "default"
                      ? "border-[#0d0c0b] bg-[#0d0c0b] text-white hover:bg-[#252320]"
                      : "border-[#dfd2c1] bg-white text-[#5c5348] hover:border-[#b8a898]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {sortBy === "default" ? "Sort" : SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-[50] min-w-[148px] overflow-hidden rounded-[16px] border border-[#e4d9cb] bg-white shadow-[var(--shadow-3)]">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => { setSortBy(option.key); setSortOpen(false); }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[12.5px] transition hover:bg-[#f4ede3] ${
                          sortBy === option.key ? "font-semibold text-[#0d0c0b]" : "font-medium text-[#5c5348]"
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
            </div>
          </div>

          <div className="mt-8 border-t border-[#e7dbcc] pt-5">
            <div className="flex flex-wrap gap-2.5">
              {config.subs.map((sub) => {
                const active = (subcategory ?? "All") === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => onNav(category, sub === "All" ? null : sub)}
                    className={`inline-flex items-center gap-2.5 rounded-full pl-2 pr-5 py-2 text-[12.5px] font-medium transition ${
                      active
                        ? "bg-[#0d0c0b] text-white shadow-[0_8px_18px_rgba(13,12,11,.14)]"
                        : "border border-[#dfd2c1] bg-white text-[#5c5348] hover:-translate-y-px hover:border-[#b8a898] hover:text-[#0d0c0b]"
                    }`}
                  >
                    <span className="h-9 w-9 overflow-hidden rounded-full border border-white/40 bg-[#f3ede5]">
                      <img
                        src={subImages[sub]}
                        alt={sub}
                        className="h-full w-full object-cover"
                      />
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
        <div className="overflow-hidden rounded-[24px] border border-[#ebe2d6] bg-white shadow-[0_4px_32px_rgba(0,0,0,.06)]">
          <div className="flex items-center gap-3 border-b border-[#ebe2d6] bg-[#fcfaf7] px-5 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#8c847a]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12.5px] font-medium text-[#5c5348]">Diva & La Opala — 2024 Catalogue</span>
            <a
              href="/catalogues/diva-la-opala-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#dfd2c1] bg-white px-4 py-1.5 text-[11.5px] font-medium text-[#5c5348] transition hover:border-[#b8a898] hover:text-[#0d0c0b]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Download
            </a>
          </div>
          <object
            data="/catalogues/diva-la-opala-2024.pdf"
            type="application/pdf"
            className="h-[85vh] w-full"
          >
            <div className="flex h-[85vh] flex-col items-center justify-center gap-6 bg-[#fcfaf7] px-6 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#c4b49e]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="font-[var(--font-cormorant)] text-[26px] text-[#0d0c0b]">Diva & La Opala Catalogue</div>
                <div className="mt-2 text-[13px] text-[#5c5348]">Your browser cannot display this PDF inline.</div>
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
      ) : (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
    </section>
  );
}
