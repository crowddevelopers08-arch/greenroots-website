"use client";

import { useState } from "react";
import { CAT, PRODS, type CategoryKey, type Product } from "@/lib/store-data";
import { LoadingScreen } from "./loading-screen";
import { StoreHeader } from "./store-header";
import { HeroSection } from "./hero-section";
import { TickerBar } from "./ticker-bar";
import { StatsSection } from "./stats-section";
import { CategoryTiles } from "./category-tiles";
import { BrandsSection } from "./brands-section";
import { EditorialSection } from "./editorial-section";
import { EditorialElectronics } from "./editorial-electronics";
import { ProcessSection } from "./process-section";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";
import { ProductCard } from "./product-card";
import { ProductPage } from "./product-page";
import { SearchBar } from "./search-bar";
import { EnquiryModal } from "./enquiry-modal";
import { StoreFooter } from "./store-footer";

type Props = {
  initialCategory?: CategoryKey | null;
  initialSubcategory?: string | null;
};

export function Storefront({ initialCategory = null, initialSubcategory = null }: Props) {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryKey | null>(initialCategory);
  const [subcategory, setSubcategory] = useState<string | null>(initialSubcategory);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalCategory, setModalCategory] = useState<CategoryKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const nav = (nextCategory: CategoryKey | null, nextSubcategory: string | null) => {
    setCategory(nextCategory);
    setSubcategory(nextSubcategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEnquiry = (product: Product, productCategory: CategoryKey) => {
    setModalProduct(product);
    setModalCategory(productCategory);
  };

  const openContact = () => {
    setModalProduct(null);
    setModalCategory(null);
    setBookOpen(true);
  };

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* Floating action buttons — bottom-right, icon-only */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">

        {/* WhatsApp */}
        <div className="relative" style={{ animation: "fabPopIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.2s both" }}>
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
            style={{ animation: "fabRing 2s ease-out 1.2s infinite" }}
          />
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{ width: 52, height: 52 }}
            className="relative flex items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        {/* Call Now */}
        <div className="relative" style={{ animation: "fabPopIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.4s both" }}>
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[#1976d2]"
            style={{ animation: "fabRing 2s ease-out 1.8s infinite" }}
          />
          <a
            href="tel:+919999999999"
            aria-label="Call us now"
            style={{ width: 52, height: 52 }}
            className="relative flex items-center justify-center rounded-full bg-[#1976d2] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </a>
        </div>

        {/* Book Now */}
        <div className="relative" style={{ animation: "fabPopIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.6s both" }}>
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[#4a7c59]"
            style={{ animation: "fabRing 2s ease-out 2.4s infinite" }}
          />
          <button
            onClick={() => setBookOpen(true)}
            aria-label="Book an appointment"
            style={{ width: 52, height: 52 }}
            className="relative flex items-center justify-center rounded-full bg-[#4a7c59] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>

      </div>

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
      <StoreHeader
        activeCategory={category}
        onNav={nav}
        onSearch={() => setSearchOpen(true)}
        onContact={openContact}
      />

      {!category ? (
        <>
          <HeroSection onNav={nav} />
          <TickerBar />
          <StatsSection />
          <CategoryTiles current={category} onNav={nav} />
          <BrandsSection />
          <EditorialSection onNav={nav} />
          <EditorialElectronics onNav={nav} />
          <ProcessSection />
          <TestimonialsSection />
          <section className="px-5 pb-8 md:px-12 md:pb-24">
            <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-5 md:mb-9">
              <div>
                <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
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

      {!category && <CtaSection onNav={nav} onContact={openContact} />}
      <StoreFooter onNav={nav} />
      <EnquiryModal
        category={modalCategory}
        product={modalProduct}
        bookOpen={bookOpen}
        onClose={() => {
          setModalProduct(null);
          setModalCategory(null);
          setBookOpen(false);
        }}
      />
    </main>
    </>
  );
}
