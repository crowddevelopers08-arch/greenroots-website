"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageLightbox } from "./image-lightbox";
import { getProductHref, type CategoryKey, type Product } from "@/lib/store-data";

/** Strips baked-in white borders from Cloudinary catalogue cover images */
function trimCloudinary(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/e_trim:10/");
}

type Props = {
  product: Product;
  category: CategoryKey;
  delay?: number;
  onEnquiry?: (product: Product, category: CategoryKey) => void;
  /** When provided, clicking the card calls this instead of navigating to the product-detail URL */
  onBrandClick?: () => void;
};

export function ProductCard({ product, category, delay = 0, onBrandClick }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cardInner = (
    <>
      <div className="relative overflow-hidden bg-[#e4f0e6]">
        {product.badge ? (
          <span className="absolute left-3 top-3 z-[2] rounded-full bg-[#1e3d22] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">
            {product.badge}
          </span>
        ) : null}
        <img
          src={trimCloudinary(product.img)}
          alt={product.name}
          className="block w-full h-auto transition duration-700 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,12,11,.78)_0%,transparent_52%)] opacity-0 transition group-hover:opacity-100" />
        <span className="absolute inset-x-[14px] bottom-[14px] translate-y-2.5 rounded-full bg-[#f5f9f5] px-3 py-3 text-center text-[12.5px] font-semibold tracking-[0.02em] text-[#0d0c0b] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          {onBrandClick ? "View Catalogue" : "View Product"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-[18px] pb-5 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 text-sm font-medium leading-[1.3] text-[#0d0c0b]">{product.name}</div>
          <div className="mt-0.5 whitespace-nowrap text-[11.5px] font-medium text-[#4a6a50]">POA</div>
        </div>
        <p className="flex-1 text-xs font-light leading-[1.5] text-[#3d5843]">{product.desc}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-[20px] bg-[#e4f0e6] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#4a7254]">
            {product.sub}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d0e0d2] text-[#3d5843] transition group-hover:bg-[#1e3d22] group-hover:text-white">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Outer wrapper — holds the clickable area AND the expand button as siblings */}
      <div
        className="group relative flex translate-y-[18px] flex-col overflow-hidden rounded-[18px] border border-[rgba(180,204,182,.5)] bg-[#f5f9f5] opacity-0 transition duration-300 hover:-translate-y-2 hover:border-[#b4ccb6] hover:shadow-[var(--shadow-3)]"
        style={{ animation: `cardIn .5s var(--ease) ${delay}ms forwards` }}
      >
        {/* Navigable area — Link for product detail, button for brand catalogue */}
        {onBrandClick ? (
          <button onClick={onBrandClick} className="flex flex-col text-left w-full">
            {cardInner}
          </button>
        ) : (
          <Link href={getProductHref(category, product)} className="flex flex-col">
            {cardInner}
          </Link>
        )}

        {/* Expand button — sits OUTSIDE the Link so it never triggers navigation */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-3 top-3 z-[10] flex h-8 w-8 scale-100 items-center justify-center rounded-full bg-[rgba(245,249,245,.92)] text-[#3d5843] opacity-100 backdrop-blur-[8px] transition duration-200 hover:bg-white hover:text-[#0d0c0b] md:scale-90 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
          aria-label="View full image"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ImageLightbox
        src={product.img}
        alt={product.name}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
