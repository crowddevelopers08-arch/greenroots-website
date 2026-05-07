"use client";

import { useState } from "react";
import { CAT, PRODS, type CategoryKey, type Product } from "@/lib/store-data";
import { StoreHeader } from "./store-header";
import { HeroSection } from "./hero-section";
import { TickerBar } from "./ticker-bar";
import { CategoryTiles } from "./category-tiles";
import { EditorialSection } from "./editorial-section";
import { ProcessSection } from "./process-section";
import { ProductCard } from "./product-card";
import { ProductPage } from "./product-page";
import { SearchBar } from "./search-bar";
import { EnquiryModal } from "./enquiry-modal";
import { StoreFooter } from "./store-footer";

export function Storefront() {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalCategory, setModalCategory] = useState<CategoryKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const nav = (nextCategory: CategoryKey | null, nextSubcategory: string | null) => {
    setCategory(nextCategory);
    setSubcategory(nextSubcategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEnquiry = (product: Product, productCategory: CategoryKey) => {
    setModalProduct(product);
    setModalCategory(productCategory);
  };

  return (
    <main
      className="min-h-screen bg-[#faf9f7] text-[#0d0c0b]"
      style={
        {
          ["--ease" as string]: "cubic-bezier(.4,0,.2,1)",
          ["--spring" as string]: "cubic-bezier(.34,1.56,.64,1)",
          ["--shadow-1" as string]: "0 1px 4px rgba(0,0,0,.05),0 4px 20px rgba(0,0,0,.07)",
          ["--shadow-2" as string]: "0 4px 28px rgba(0,0,0,.11),0 2px 8px rgba(0,0,0,.06)",
          ["--shadow-3" as string]: "0 12px 56px rgba(0,0,0,.16),0 4px 16px rgba(0,0,0,.08)",
          ["--shadow-4" as string]: "0 28px 88px rgba(0,0,0,.22),0 8px 28px rgba(0,0,0,.1)",
        } as React.CSSProperties
      }
    >
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} onNav={nav} />
      <StoreHeader activeCategory={category} onNav={nav} onSearch={() => setSearchOpen(true)} />

      {!category ? (
        <>
          <HeroSection onNav={nav} />
          <TickerBar />
          <CategoryTiles current={category} onNav={nav} />
          <EditorialSection onNav={nav} />
          <ProcessSection />
          <section className="px-5 pb-16 md:px-12 md:pb-24">
            <div className="mb-9 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-5">
              <div>
                <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8c847a]">
                  Handpicked
                </div>
                <div className="font-[var(--font-cormorant)] text-[clamp(30px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
                  Featured Products
                </div>
              </div>
              <button
                onClick={() => nav("Bags", null)}
                className="hidden rounded-full border border-[#d6cab8] px-5 py-2.5 text-[12.5px] font-medium text-[#5c5348] transition hover:-translate-y-px hover:border-[#5c5348] hover:text-[#0d0c0b] md:inline-flex"
              >
                View All Bags
              </button>
            </div>
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {PRODS["Bags"].slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category="Bags"
                  delay={index * 70}
                  onEnquiry={openEnquiry}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="h-[68px]" />
          <ProductPage
            category={category}
            subcategory={subcategory}
            onNav={nav}
            onEnquiry={openEnquiry}
          />
        </>
      )}

      <StoreFooter onNav={nav} />
      <EnquiryModal
        category={modalCategory}
        product={modalProduct}
        onClose={() => {
          setModalProduct(null);
          setModalCategory(null);
        }}
      />
    </main>
  );
}
