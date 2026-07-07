"use client";

import Link from "next/link";
import { useState } from "react";
import { EnquiryModal } from "./enquiry-modal";
import { ImageLightbox } from "./image-lightbox";
import { ProductCard } from "./product-card";
import { getCategorySlug, slugifySegment, type CategoryKey, type Product } from "@/lib/store-data";

type Props = {
  category: CategoryKey;
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetailPage({ category, product, relatedProducts }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <main
        className="min-h-screen bg-[#f5f9f5] px-5 pb-16 pt-8 text-[#0d0c0b] md:px-12 md:pb-24"
        style={
          {
            ["--ease" as string]: "cubic-bezier(.4,0,.2,1)",
            ["--shadow-3" as string]: "0 12px 56px rgba(0,0,0,.16),0 4px 16px rgba(0,0,0,.08)",
            ["--shadow-4" as string]: "0 28px 88px rgba(0,0,0,.22),0 8px 28px rgba(0,0,0,.1)",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[length:var(--fs-caption)] text-[#3d5843]">
            <Link href="/" className="transition hover:text-[#0d0c0b]">Home</Link>
            <span className="text-[#b4ccb6]">{">"}</span>
            <Link
              href={`/?category=${getCategorySlug(category)}&subcategory=${encodeURIComponent(slugifySegment(product.sub))}`}
              className="transition hover:text-[#0d0c0b]"
            >
              {category}
            </Link>
            <span className="text-[#b4ccb6]">{">"}</span>
            <span className="font-medium text-[#0d0c0b]">{product.name}</span>
          </div>

          <section className="overflow-hidden rounded-[32px] border border-[#ccd8ce] bg-white shadow-[0_18px_50px_rgba(30,61,34,.08)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,420px)]">
              <div className="relative bg-[radial-gradient(circle_at_top,#e8f3e9_0%,#ddeedd_100%)] p-4 md:p-6">
                <div className="absolute left-6 top-6 z-[1] rounded-full bg-[#1e3d22] px-3 py-1 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-white">
                  {product.sub}
                </div>
                {/* Expand button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute right-6 top-6 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#3d5843] shadow-[0_4px_14px_rgba(0,0,0,.10)] backdrop-blur-[6px] transition hover:bg-white hover:text-[#0d0c0b] hover:shadow-[0_6px_20px_rgba(0,0,0,.14)]"
                  aria-label="View full image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,.65)]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="aspect-[4/5] h-full w-full cursor-zoom-in object-cover"
                    onClick={() => setLightboxOpen(true)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#4a7254]">
                    Product Detail
                  </div>
                  <h1 className="mt-3 [font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] leading-[0.95] tracking-[-0.03em] text-[#0d0c0b]">
                    {product.name}
                  </h1>
                  <p className="mt-4 text-[length:var(--fs-small)] leading-[1.85] text-[#334836]">
                    {product.desc}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-[#ccd8ce] bg-[#f0f6f0] px-5 py-4">
                      <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.14em] text-[#4a7254]">
                        Category
                      </div>
                      <div className="mt-2 text-[length:var(--fs-body)] font-medium text-[#0d0c0b]">{category}</div>
                    </div>
                    <div className="rounded-[22px] border border-[#ccd8ce] bg-[#f0f6f0] px-5 py-4">
                      <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.14em] text-[#4a7254]">
                        Availability
                      </div>
                      <div className="mt-2 text-[length:var(--fs-body)] font-medium text-[#0d0c0b]">Pricing on enquiry</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3d22] px-7 py-3.5 text-[length:var(--fs-small)] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2d5a30]"
                  >
                    Enquire Now
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <Link
                    href={`/?category=${getCategorySlug(category)}&subcategory=${encodeURIComponent(slugifySegment(product.sub))}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#ccd8ce] px-7 py-3.5 text-[length:var(--fs-small)] font-medium text-[#3d5843] transition hover:border-[#7a9e82] hover:text-[#0d0c0b]"
                  >
                    Back to Collection
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[#4a7254]">
                  Related Products
                </div>
                <h2 className="mt-2 [font-family:var(--font-montserrat)] text-[length:var(--fs-h2)] leading-none text-[#0d0c0b]">
                  More from {category}
                </h2>
              </div>
              <Link href="/" className="hidden text-[length:var(--fs-caption)] font-medium text-[#3d5843] transition hover:text-[#0d0c0b] md:inline-flex">
                Back to storefront
              </Link>
            </div>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    category={category}
                    delay={index * 55}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-[#c0d2c2] bg-[linear-gradient(180deg,#f6fbf7_0%,#e8f3e9_100%)] px-6 py-10 text-center text-[length:var(--fs-small)] text-[#4a6652]">
                No related products are available for this item yet.
              </div>
            )}
          </section>
        </div>
      </main>

      <EnquiryModal
        category={category}
        product={modalOpen ? product : null}
        onClose={() => setModalOpen(false)}
      />

      <ImageLightbox
        src={product.img}
        alt={product.name}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
