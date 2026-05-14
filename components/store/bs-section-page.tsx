"use client";

import Link from "next/link";
import { useState } from "react";
import { EnquiryModal } from "./enquiry-modal";
import { getBsSectionHref, getCategorySlug, slugifySegment, type CategoryKey, type Product } from "@/lib/store-data";

type BsSectionItem = {
  image: string;
  globalIndex: number;
};

type Props = {
  category: CategoryKey;
  section: {
    id: string;
    label: string;
    start: number;
    end: number;
  };
  items: BsSectionItem[];
  bsProduct: Product;
};

export function BsSectionPage({ category, section, items, bsProduct }: Props) {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  return (
    <>
      <main
        className="min-h-screen bg-[#faf9f7] px-5 pb-16 pt-8 text-[#0d0c0b] md:px-12 md:pb-24"
        style={
          {
            ["--ease" as string]: "cubic-bezier(.4,0,.2,1)",
            ["--shadow-4" as string]: "0 28px 88px rgba(0,0,0,.22),0 8px 28px rgba(0,0,0,.1)",
          } as React.CSSProperties
        }
      >
        <div className="w-full">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[12.5px] text-[#5c5348]">
            <Link href="/" className="transition hover:text-[#0d0c0b]">
              Home
            </Link>
            <span className="text-[#d6cab8]">{">"}</span>
            <Link href={`/?category=${getCategorySlug(category)}&subcategory=${slugifySegment("BS")}`} className="transition hover:text-[#0d0c0b]">
              BS
            </Link>
            <span className="text-[#d6cab8]">{">"}</span>
            <span className="font-medium text-[#0d0c0b]">{section.label}</span>
          </div>

          <section className="overflow-hidden rounded-[30px] border border-[#ebe2d6] bg-white shadow-[0_18px_50px_rgba(54,38,19,.08)]">
            <div className="border-b border-[#ebe2d6] bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ef_100%)] px-5 py-6 md:px-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#8b755c]">
                    BS Collection
                  </div>
                  <h1 className="mt-2 font-[var(--font-cormorant)] text-[clamp(38px,4vw,58px)] leading-[0.95] tracking-[-0.03em] text-[#17120d]">
                    {section.label}
                  </h1>
                  <div className="mt-3 text-[13px] leading-[1.7] text-[#6d6053]">
                    Products {String(section.start).padStart(2, "0")} to {String(section.end).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/?category=${getCategorySlug(category)}&subcategory=${slugifySegment("BS")}`}
                    className="inline-flex rounded-full border border-[#d8c9b6] bg-white px-4 py-2 text-[12px] font-medium text-[#5c5348] transition hover:border-[#b78b56] hover:text-[#0d0c0b]"
                  >
                    Back to categories
                  </Link>
                  <div className="inline-flex self-start rounded-full border border-[#e2d4c3] bg-white px-4 py-2 text-[12px] font-medium text-[#5c5348]">
                    {items.length} products
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map(({ image, globalIndex }) => (
                  <button
                    key={image}
                    onClick={() =>
                      setModalProduct({
                        ...bsProduct,
                        name: `BS Stock ${String(globalIndex + 1).padStart(2, "0")}`,
                        desc: `Selected BS catalogue design ${String(globalIndex + 1).padStart(2, "0")}`,
                        img: image,
                      })
                    }
                    className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#dfcfbb] bg-[linear-gradient(145deg,#fffdf9_0%,#f7f0e6_52%,#efe3d2_100%)] text-left shadow-[0_18px_44px_rgba(88,61,31,.10)] transition duration-300 hover:-translate-y-2 hover:border-[#c5a57d] hover:shadow-[0_26px_60px_rgba(88,61,31,.18)]"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-white/70" />
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/80" />
                      <div className="absolute right-[-40px] top-[-48px] h-36 w-36 rounded-full bg-[rgba(255,255,255,.6)] blur-3xl transition duration-500 group-hover:scale-110" />
                      <div className="absolute bottom-[-70px] left-[-30px] h-40 w-40 rounded-full bg-[rgba(192,153,103,.18)] blur-3xl" />
                    </div>

                    <div className="relative p-3">
                      <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-[radial-gradient(circle_at_top,#fbf6ef_0%,#f1e7d7_100%)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
                        <img
                          src={image}
                          alt={`BS catalogue design ${globalIndex + 1}`}
                          className="h-auto w-full rounded-[16px] object-contain transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 h-20 rounded-b-[16px] bg-[linear-gradient(to_top,rgba(33,24,16,.28)_0%,rgba(33,24,16,0)_100%)]" />
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between gap-4 px-5 pb-5 pt-1">
                      <div>
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#9b7c57]">
                          {section.label}
                        </div>
                        <div className="mt-1 font-[var(--font-cormorant)] text-[28px] leading-none tracking-[-0.02em] text-[#1a1510]">
                          {String(globalIndex + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-2 text-[11.5px] leading-[1.6] text-[#6d6053]">
                          Curated catalogue design for premium gifting enquiries.
                        </div>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d8c3aa] bg-[linear-gradient(180deg,#fffdfa_0%,#f2e5d4_100%)] text-[#5c4d3d] shadow-[0_10px_20px_rgba(88,61,31,.08)] transition group-hover:border-[#b78b56] group-hover:bg-[#0d0c0b] group-hover:text-white">
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[28px] border border-[#ebe2d6] bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ef_100%)] px-6 py-8 text-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#9b7c57]">
              Explore More
            </div>
            <div className="mt-2 font-[var(--font-cormorant)] text-[30px] leading-none text-[#17120d]">
              Browse another BS collection
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link
                href={`/?category=${getCategorySlug(category)}&subcategory=${slugifySegment("BS")}`}
                className="inline-flex rounded-full bg-[#0d0c0b] px-6 py-3 text-[12.5px] font-medium text-white transition hover:-translate-y-0.5"
              >
                All BS categories
              </Link>
              <Link
                href={getBsSectionHref(section.id)}
                className="inline-flex rounded-full border border-[#d8c9b6] bg-white px-6 py-3 text-[12.5px] font-medium text-[#5c5348]"
              >
                Current section
              </Link>
            </div>
          </section>
        </div>
      </main>

      <EnquiryModal
        category={category}
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </>
  );
}
