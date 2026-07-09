"use client";

import { useState, useEffect, useRef } from "react";
import { CAT, PRODS, type CategoryKey, type Product } from "@/lib/store-data";

/** 5 hand-picked products shown in the homepage featured carousel */
const FEATURED: { product: Product; category: CategoryKey }[] = [
  { product: PRODS["Backpacks"][0],  category: "Backpacks" },   // Canvas Bag
  { product: PRODS["Backpacks"][1],  category: "Backpacks" },   // Toburo Bags
  { product: PRODS["Backpacks"][2],  category: "Backpacks" },   // God_s
  { product: PRODS["Backpacks"][3],  category: "Backpacks" },   // Nasher Miles
  { product: PRODS["Apparels"][12],  category: "Apparels"  },   // Adidas
];
const DESKTOP_VISIBLE   = 3;                                     // cards visible at once on desktop
const DESKTOP_MAX_SLIDE = FEATURED.length - DESKTOP_VISIBLE;    // 5 - 3 = 2
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
import { ClientsSection } from "./clients-section";
import { TestimonialsSection } from "./testimonials-section";
import { WeSupportSection } from "./we-support-section";
import { CombinedSection } from "./reach-us-section";
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

  // ── Featured carousel (mobile auto-advance) ──────────────────────────────
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const [desktopSlide, setDesktopSlide] = useState(0);
  const touchStartX = useRef(0);
  const carouselPaused = useRef(false);

  useEffect(() => {
    // Mobile: auto-advance every 3.5 s (pauses on touch)
    const mobileId = setInterval(() => {
      if (!carouselPaused.current) {
        setFeaturedSlide((s) => (s + 1) % FEATURED.length);
      }
    }, 3500);
    // Desktop: auto-advance through the 3 pages every 3.8 s
    const desktopId = setInterval(() => {
      setDesktopSlide((s) => (s + 1) % (DESKTOP_MAX_SLIDE + 1));
    }, 3800);
    return () => {
      clearInterval(mobileId);
      clearInterval(desktopId);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    carouselPaused.current = true;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setFeaturedSlide((s) =>
        delta > 0
          ? (s + 1) % FEATURED.length
          : (s - 1 + FEATURED.length) % FEATURED.length
      );
    }
    carouselPaused.current = false;
  };

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
      <div className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-4 sm:gap-3">

        {/* WhatsApp */}
        <div className="relative" style={{ animation: "fabPopIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.2s both" }}>
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
            style={{ animation: "fabRing 2s ease-out 1.2s infinite" }}
          />
          <a
            href="https://wa.me/918072319441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{ width: 46, height: 46 }}
            className="relative flex items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-[52px] sm:w-[52px]"
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
            href="tel:+918072319441"
            aria-label="Call us now"
            style={{ width: 46, height: 46 }}
            className="relative flex items-center justify-center rounded-full bg-[#1976d2] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-[52px] sm:w-[52px]"
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
            style={{ width: 46, height: 46 }}
            className="relative flex items-center justify-center rounded-full bg-[#4a7c59] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-[52px] sm:w-[52px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>

      </div>

    <main
      className="min-h-screen bg-[linear-gradient(180deg,#f7fbf7,#eef6ef)] text-[#0d0c0b]"
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
          {/* Intro → credibility */}
          <HeroSection onNav={nav} />
          <TickerBar />
          <StatsSection />

          {/* Shop entry point */}
          <CategoryTiles current={category} onNav={nav} />

          {/* Featured storytelling */}
          <EditorialSection />
          <EditorialElectronics />

          {/* Trust: brands we carry + clients we serve */}
          <BrandsSection />
          <ClientsSection />

          {/* How we work → our values → social proof */}
          <ProcessSection />
          <WeSupportSection />
          <TestimonialsSection />
          <section className="pb-8 sm:pb-12 md:pb-24">

            {/* ── Heading + View All (padded) ── */}
            {/* <div className="mb-4 flex items-start justify-between gap-3 px-4 sm:px-5 md:mb-7 md:px-12">
              <div>
                <div className="mb-1.5 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
                  Handpicked
                </div>
                <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h2)] leading-[1.06] tracking-[-0.01em]">
                  Featured Products
                </div>
              </div>
              <button
                onClick={() => nav("Backpacks", null)}
                className="mt-1 shrink-0 rounded-full border border-[#b4ccb6] px-4 py-2 text-[length:var(--fs-caption)] font-medium text-[#3d5843] transition hover:-translate-y-px hover:border-[#3a7848] hover:text-[#0d0c0b] sm:px-5 sm:py-2.5 sm:text-[length:var(--fs-caption)]"
              >
                View All
              </button>
            </div> */}

            {/* ── Category pills (padded) ── */}
            {/* <div className="mb-4 overflow-x-auto px-4 py-1 sm:px-5 md:mb-6 md:px-12">
              <div className="flex w-max gap-2">
                {(Object.keys(CAT) as CategoryKey[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => nav(cat, null)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ccd8ce] bg-white px-3.5 py-1.5 text-[length:var(--fs-caption)] font-medium text-[#3d5843] whitespace-nowrap transition hover:-translate-y-px hover:border-[#3a7848] hover:bg-[#e4f0e6] hover:text-[#0d0c0b] sm:gap-2 sm:px-4 sm:py-2 sm:text-[length:var(--fs-caption)]"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: CAT[cat].col }} />
                    {cat}
                  </button>
                ))}
              </div>
            </div> */}

            {/* ── Mobile: padded 1-card auto-carousel ── */}
            {/* <div className="px-4 sm:hidden">
              <div
                className="overflow-hidden rounded-[18px] border border-[#e0ece0]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ transform: `translateX(-${featuredSlide * 100}%)` }}
                >
                  {FEATURED.map(({ product, category: cat }) => (
                    <div
                      key={product.id}
                      className="relative w-full shrink-0 cursor-pointer"
                      onClick={() => nav(cat, product.sub)}
                    >
           
                      <div className="h-[240px] w-full overflow-hidden bg-[#f0f6f0]">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-full object-contain p-3 transition duration-500"
                        />
                      </div>
                      {product.badge && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#1e3d22] px-2.5 py-1 text-[length:var(--fs-caption)] font-bold uppercase tracking-[0.1em] text-white">
                          {product.badge}
                        </span>
                      )}
                      <div className="border-t border-[#e0ece0] bg-[#f5f9f5] px-4 py-4">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[length:var(--fs-small)] font-semibold leading-[1.3] text-[#0d0c0b]">{product.name}</span>
                          <span className="whitespace-nowrap text-[length:var(--fs-caption)] font-medium text-[#4a6a50]">POA</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[length:var(--fs-caption)] leading-relaxed text-[#3d5843]">{product.desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="rounded-[20px] bg-[#e4f0e6] px-2.5 py-1 text-[length:var(--fs-caption)] font-bold uppercase tracking-[0.1em] text-[#4a7254]">
                            {product.sub}
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d0e0d2] text-[#3d5843]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 border-t border-[#e0ece0] bg-[#f5f9f5] py-3">
                  {FEATURED.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === featuredSlide ? "w-5 bg-[#1e3d22]" : "w-1.5 bg-[#c0d0c2]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div> */}

            {/* ── Desktop: 3-at-a-time carousel with side padding ── */}
            {/* <div className="hidden sm:block sm:px-5 md:px-12">
       
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {Array.from({ length: DESKTOP_MAX_SLIDE + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDesktopSlide(i)}
                      aria-label={`Desktop page ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === desktopSlide ? "w-5 bg-[#1e3d22]" : "w-1.5 bg-[#c0d0c2]"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDesktopSlide((s) => Math.max(0, s - 1))}
                    disabled={desktopSlide === 0}
                    aria-label="Previous"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c0d0c2] bg-white text-[#3d5843] transition hover:border-[#3a7848] hover:bg-[#1e3d22] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDesktopSlide((s) => Math.min(DESKTOP_MAX_SLIDE, s + 1))}
                    disabled={desktopSlide === DESKTOP_MAX_SLIDE}
                    aria-label="Next"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c0d0c2] bg-white text-[#3d5843] transition hover:border-[#3a7848] hover:bg-[#1e3d22] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
    
              <div className="overflow-hidden rounded-[20px] border border-[#e0ece0]">
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ transform: `translateX(-${desktopSlide * (100 / DESKTOP_VISIBLE)}%)` }}
                >
                  {FEATURED.map(({ product, category: cat }, index) => (
                    <div
                      key={product.id}
                      onClick={() => nav(cat, product.sub)}
                      style={{ width: `${100 / DESKTOP_VISIBLE}%`, flexShrink: 0 }}
                      className={`group relative cursor-pointer bg-[#f5f9f5] ${
                        index < FEATURED.length - 1 ? "border-r border-[#e0ece0]" : ""
                      }`}
                    >
   
                      <div className="h-[260px] overflow-hidden bg-[#f0f6f0]">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      {product.badge && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#1e3d22] px-2.5 py-1 text-[length:var(--fs-caption)] font-bold uppercase tracking-[0.1em] text-white">
                          {product.badge}
                        </span>
                      )}

                      <div className="border-t border-[#e0ece0] p-4">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[length:var(--fs-small)] font-semibold leading-[1.3] text-[#0d0c0b]">{product.name}</span>
                          <span className="whitespace-nowrap text-[length:var(--fs-caption)] font-medium text-[#4a6a50]">POA</span>
                        </div>
                        <p className="mt-1.5 line-clamp-2 text-[length:var(--fs-caption)] leading-[1.5] text-[#3d5843]">{product.desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="rounded-[20px] bg-[#e4f0e6] px-2 py-0.5 text-[length:var(--fs-caption)] font-bold uppercase tracking-[0.1em] text-[#4a7254]">
                            {product.sub}
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d0e0d2] text-[#3d5843] transition duration-200 group-hover:bg-[#1e3d22] group-hover:text-white">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

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

      {!category && <CombinedSection onNav={nav} onContact={openContact} />}
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
