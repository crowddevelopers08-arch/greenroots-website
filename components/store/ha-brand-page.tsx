"use client";

import Link from "next/link";
import { useState } from "react";
import { EnquiryModal } from "./enquiry-modal";
import { PRODS, getCategorySlug, getHaBrandHref, type Product } from "@/lib/store-data";

type Props = {
  brandProduct: Product;
  images: string[];
};

export function HaBrandPage({ brandProduct, images }: Props) {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  return (
    <>
      <main
        className="min-h-screen bg-[#f5f9f5] px-5 pb-16 pt-8 text-[#0d0c0b] md:px-12 md:pb-24"
        style={
          {
            ["--ease" as string]: "cubic-bezier(.4,0,.2,1)",
            ["--shadow-4" as string]: "0 28px 88px rgba(0,0,0,.22),0 8px 28px rgba(0,0,0,.1)",
          } as React.CSSProperties
        }
      >
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[12.5px] text-[#3d5843]">
            <Link href="/" className="transition hover:text-[#0d0c0b]">Home</Link>
            <span className="text-[#b4ccb6]">{">"}</span>
            <Link
              href={`/?category=${getCategorySlug("Home Appliances")}`}
              className="transition hover:text-[#0d0c0b]"
            >
              Home Appliances
            </Link>
            <span className="text-[#b4ccb6]">{">"}</span>
            <span className="font-medium text-[#0d0c0b]">{brandProduct.name}</span>
          </div>

          {/* Brand filter pills */}
          <div className="mb-6 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2">
              {PRODS["Home Appliances"].map((brand) => {
                const isActive = brand.id === brandProduct.id;
                return (
                  <Link
                    key={brand.id}
                    href={getHaBrandHref(brand.name)}
                    className={`inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-[12.5px] font-medium whitespace-nowrap transition ${
                      isActive
                        ? "bg-[#1e3d22] text-white shadow-[0_8px_18px_rgba(30,61,34,.18)]"
                        : "border border-[#ccd8ce] bg-white text-[#3d5843] hover:-translate-y-px hover:border-[#3a7848] hover:text-[#0d0c0b]"
                    }`}
                  >
                    <span className="h-9 w-9 overflow-hidden rounded-full border border-white/40 bg-[#e4f0e6]">
                      <img src={brand.img} alt={brand.name} className="h-full w-full object-cover" />
                    </span>
                    {brand.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Header */}
          <section className="overflow-hidden rounded-[30px] border border-[#ccd8ce] bg-white shadow-[0_18px_50px_rgba(30,61,34,.08)]">
            <div className="border-b border-[#ccd8ce] bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)] px-5 py-6 md:px-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4a7254]">
                    Home Appliances
                  </div>
                  <h1 className="mt-2 font-[var(--font-cormorant)] text-[clamp(38px,4vw,58px)] leading-[0.95] tracking-[-0.03em] text-[#111d12]">
                    {brandProduct.name}
                  </h1>
                  <div className="mt-3 text-[13px] leading-[1.7] text-[#4a6652]">
                    {images.length} catalogue pages
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/?category=${getCategorySlug("Home Appliances")}`}
                    className="inline-flex rounded-full border border-[#c0d0c2] bg-white px-4 py-2 text-[12px] font-medium text-[#3d5843] transition hover:border-[#3a7848] hover:text-[#0d0c0b]"
                  >
                    Back to categories
                  </Link>
                  <div className="inline-flex self-start rounded-full border border-[#ccd8ce] bg-white px-4 py-2 text-[12px] font-medium text-[#3d5843]">
                    {images.length} pages
                  </div>
                </div>
              </div>
            </div>

            {/* Image grid */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() =>
                      setModalProduct({
                        ...brandProduct,
                        name: `${brandProduct.name} — Page ${String(index + 1).padStart(2, "0")}`,
                        desc: `${brandProduct.name} catalogue page ${String(index + 1).padStart(2, "0")}`,
                        img: image,
                      })
                    }
                    className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#bcccbe] bg-[linear-gradient(145deg,#f6fbf7_0%,#e8f3e9_52%,#ddeedd_100%)] text-left shadow-[0_18px_44px_rgba(30,61,34,.10)] transition duration-300 hover:-translate-y-2 hover:border-[#3a7848] hover:shadow-[0_26px_60px_rgba(30,61,34,.18)]"
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
                          alt={`${brandProduct.name} catalogue page ${index + 1}`}
                          className="h-auto w-full rounded-[16px] object-contain transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 h-20 rounded-b-[16px] bg-[linear-gradient(to_top,rgba(17,29,18,.28)_0%,rgba(17,29,18,0)_100%)]" />
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between gap-4 px-5 pb-5 pt-1">
                      <div>
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3d7048]">
                          {brandProduct.name}
                        </div>
                        <div className="mt-1 font-[var(--font-cormorant)] text-[28px] leading-none tracking-[-0.02em] text-[#111d12]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-2 text-[11.5px] leading-[1.6] text-[#4a6652]">
                          Catalogue design — enquire for pricing
                        </div>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b6ccb8] bg-[linear-gradient(180deg,#f6fbf7_0%,#ddeedd_100%)] text-[#2e4e33] shadow-[0_10px_20px_rgba(30,61,34,.08)] transition group-hover:border-[#3a7848] group-hover:bg-[#1e3d22] group-hover:text-white">
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

          {/* Footer CTA */}
          <section className="mt-8 rounded-[28px] border border-[#ccd8ce] bg-[linear-gradient(180deg,#f6fbf7_0%,#eef5ef_100%)] px-6 py-8 text-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#3d7048]">
              Interested?
            </div>
            <div className="mt-2 font-[var(--font-cormorant)] text-[30px] leading-none text-[#111d12]">
              Enquire about {brandProduct.name}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setModalProduct(brandProduct)}
                className="inline-flex rounded-full bg-[#1e3d22] px-6 py-3 text-[12.5px] font-medium text-white transition hover:-translate-y-0.5"
              >
                Enquire Now
              </button>
              <Link
                href={`/?category=${getCategorySlug("Home Appliances")}`}
                className="inline-flex rounded-full border border-[#c0d0c2] bg-white px-6 py-3 text-[12.5px] font-medium text-[#3d5843]"
              >
                All Home Appliances
              </Link>
            </div>
          </section>
        </div>
      </main>

      <EnquiryModal
        category="Home Appliances"
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </>
  );
}
