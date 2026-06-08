"use client";

import { useEffect, useState } from "react";
import { PRODS, type CategoryKey } from "@/lib/store-data";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

type HeroSlideConfig = {
  cat: CategoryKey;
  productName: string;
  eyebrow: string;
  title: [string, string, string, string];
  note: string;
  /** Optional custom hero background image — overrides the product's catalogue cover */
  heroImg?: string;
};

function upgradeImage(url: string) {
  return url
    .replace(/w=\d+/i, "w=1800")
    .replace(/h=\d+/i, "h=1200")
    .replace(/q=\d+/i, "q=90");
}

const HERO_SLIDE_CONFIGS: HeroSlideConfig[] = [
  {
    cat: "Apparels",
    productName: "Puma",
    eyebrow: "Featured Collection — Sportswear",
    title: ["Puma", "Sportswear", "engineered", "to perform."],
    note: "High-performance Puma sportswear featuring innovative DryCELL moisture-wicking technology — bold athletic designs crafted for the modern professional.",
    heroImg: "https://res.cloudinary.com/diezixk4v/image/upload/v1780658301/9371367a-a235-48b9-9ad2-268bb77b2f17_zb0nna.png",
  },
  {
    cat: "Backpacks",
    productName: "Nasher Miles",
    eyebrow: "New Arrival — Travel & Bags",
    title: ["Nasher Miles", "Luggage", "built", "to explore."],
    note: "Premium polycarbonate shell trolleys and travel bags — 360° spinner wheels, TSA-approved locks, and refined designs crafted for every corporate journey.",
  },
  {
    cat: "Electronics",
    productName: "BLAUPUNKT",
    eyebrow: "Featured Collection — Electronics",
    title: ["Blaupunkt", "Audio", "crafted", "for impact."],
    note: "360° surround sound Bluetooth speakers with IPX6 waterproofing, 12-hour playtime, and TWS mode — premium audio solutions for standout corporate gifting.",
    heroImg: "https://res.cloudinary.com/diezixk4v/image/upload/v1780658627/3ddbc289-13e5-4aa5-8822-8cd244c7df02_nf2naq.png",
  },
  {
    cat: "Home Appliances",
    productName: "Pexpo",
    eyebrow: "New Arrival — Home & Kitchen",
    title: ["Pexpo", "Drinkware", "insulated", "to impress."],
    note: "Stainless steel insulated bottles and kitchenware with double-wall vacuum technology — a sleek, sophisticated corporate gifting range that leaves a lasting impression.",
    heroImg: "https://res.cloudinary.com/diezixk4v/image/upload/v1780661217/55abf178-3147-413b-b99a-65665878f0e5_bshsfh.png",
  },
  {
    cat: "Edible",
    productName: "Cacao Springs Festive Brochure",
    eyebrow: "Festive Collection — Edible Gifts",
    title: ["Cacao Springs", "Festive", "crafted", "to celebrate."],
    note: "Seasonal chocolate hampers and artisan gift boxes from Cacao Springs — premium edible corporate gifts curated for celebrations and special occasions.",
  },
  {
    cat: "B2B Importer",
    productName: "B2B Catalogue",
    eyebrow: "B2B Importer — Bulk Corporate Orders",
    title: ["B2B", "Importer", "scaled", "for business."],
    note: "Exclusive bulk corporate orders spanning every category — your one-stop B2B importer for premium branded gifting at competitive scale.",
  },
];

const HERO_SLIDES = HERO_SLIDE_CONFIGS.map((slide) => {
  const product = PRODS[slide.cat].find((item) => item.name === slide.productName);

  if (!product) {
    throw new Error(`Missing hero product: ${slide.productName}`);
  }

  const heroImg = slide.heroImg ?? product.img;
  return {
    ...slide,
    desc: product.desc,
    sub: product.sub,
    badge: product.badge,
    img: upgradeImage(heroImg),
    thumb: heroImg,
  };
});

const AUTOPLAY_MS = 5200;

export function HeroSection({ onNav }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];

  const visibleIndices = [
    activeIndex,
    (activeIndex + 1) % HERO_SLIDES.length,
    (activeIndex + 2) % HERO_SLIDES.length,
  ];

  return (
    <section className="relative mt-[68px] min-h-[620px] overflow-hidden bg-[#0d0c0b] sm:min-h-[680px] xl:min-h-[calc(100svh-68px)]">
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.productName}
            src={slide.img}
            alt={slide.productName}
            className={`absolute inset-0 h-full w-full object-cover object-center sm:object-[72%_center] xl:object-[78%_center] transition-all duration-[1600ms] ease-out ${
              index === activeIndex ? "scale-100 opacity-[.92]" : "scale-[1.08] opacity-0"
            }`}
            style={{
              animation: index === activeIndex ? "heroDrift 14s ease-in-out infinite alternate" : undefined,
            }}
          />
        ))}
      </div>

      {/* Mobile overlay: bottom-heavy gradient so text stays readable while image shows at top */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,12,11,.96)_0%,rgba(13,12,11,.82)_32%,rgba(13,12,11,.50)_54%,rgba(13,12,11,.14)_72%,rgba(13,12,11,.10)_100%)] sm:hidden" />
      {/* Desktop overlay: left-heavy horizontal + vertical gradient for text legibility */}
      <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(to_right,rgba(13,12,11,.9)_0%,rgba(13,12,11,.68)_34%,rgba(13,12,11,.3)_60%,rgba(13,12,11,.16)_100%),linear-gradient(to_top,rgba(13,12,11,.68)_0%,rgba(13,12,11,.16)_42%,rgba(13,12,11,.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_75%_82%,rgba(255,255,255,.08),transparent_24%)] mix-blend-screen" />

      <div className="relative z-[2] mx-auto flex min-h-[620px] h-full w-full max-w-[1440px] flex-col justify-end px-4 pt-16 sm:min-h-[680px] sm:px-5 sm:pt-18 md:px-8 xl:min-h-[calc(100svh-68px)] xl:justify-center xl:px-12 xl:pb-8 xl:pt-6 max-[470px]:pt-6">
        <div className="w-full xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:items-center xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_232px] 2xl:gap-12">
          <div className="max-w-[720px] xl:max-w-[640px]">
            <div
              key={`${activeSlide.productName}-copy`}
              className="animate-[heroCopyIn_900ms_var(--ease)_both]"
            >
              <div className="mb-5 flex items-center gap-[14px] sm:mb-6">
                <span className="h-px w-9 bg-[rgba(255,255,255,.4)]" />
                <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[rgba(255,255,255,.88)] [text-shadow:0_1px_6px_rgba(0,0,0,.7)]">
                  {activeSlide.eyebrow}
                </span>
              </div>

              <h1 className="mb-5 max-w-[620px] [font-family:var(--font-cormorant)] text-[clamp(32px,8.5vw,92px)] leading-[.94] font-light tracking-[-0.02em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,.55)] sm:mb-6">
                {activeSlide.title[0]}
                <br />
                {activeSlide.title[1]}
                <br />
                <span className="text-[rgba(255,255,255,.88)]">{activeSlide.title[2]}</span>
                <br />
                <em className="text-[rgba(255,255,255,.82)]">{activeSlide.title[3]}</em>
              </h1>

              <p className="mb-3 max-w-[470px] text-[14px] leading-[1.7] text-[rgba(255,255,255,.95)] sm:text-[15.5px]">
                {activeSlide.note}
              </p>
              <p className="mb-7 max-w-[430px] text-[12px] leading-[1.8] uppercase tracking-[0.14em] text-[rgba(255,255,255,.80)] sm:mb-8">
                {activeSlide.desc}
              </p>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[14px]">
                <button
                  onClick={() => onNav(activeSlide.cat, null)}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold tracking-[0.02em] text-[#0d0c0b] transition hover:-translate-y-0.5 hover:bg-[#e4f0e6] hover:shadow-[var(--shadow-3)] sm:w-auto"
                >
                  Explore {activeSlide.cat}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => onNav(activeSlide.cat, activeSlide.sub)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[rgba(255,255,255,.3)] px-[26px] py-3.5 text-[13px] font-medium text-[rgba(255,255,255,.85)] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,.6)] hover:text-white sm:w-auto"
                >
                  View {activeSlide.sub}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[rgba(255,255,255,.68)]">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
                </span>
                <div className="flex w-[132px] gap-2">
                  {HERO_SLIDES.map((slide, index) => (
                    <button
                      key={`${slide.productName}-progress`}
                      aria-label={`Show ${slide.productName}`}
                      onClick={() => setActiveIndex(index)}
                      className="group h-6 flex-1 opacity-80"
                    >
                      <span className="block h-px w-full bg-[rgba(255,255,255,.2)]">
                        <span
                          className={`block h-full origin-left bg-white transition-transform duration-700 ${
                            index === activeIndex ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div
            style={{ animation: "fadeLeft .7s var(--ease) .5s both" }}
            className="mt-10 hidden xl:flex xl:w-[200px] xl:flex-col xl:gap-2 xl:justify-self-end 2xl:w-[216px]"
          >
            {visibleIndices.map((index) => {
              const slide = HERO_SLIDES[index];
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.productName}
                  onClick={() => {
                    if (isActive) {
                      onNav(slide.cat, slide.sub);
                      return;
                    }

                    setActiveIndex(index);
                  }}
                  className={`group w-full overflow-hidden rounded-2xl border text-left shadow-[0_8px_32px_rgba(0,0,0,.28)] backdrop-blur-[16px] transition ${
                    isActive
                      ? "border-[rgba(255,255,255,.55)] bg-[rgba(250,249,247,.96)] shadow-[0_18px_56px_rgba(0,0,0,.38)]"
                      : "border-[rgba(255,255,255,.28)] bg-[rgba(250,249,247,.84)] hover:-translate-x-1.5 hover:bg-[rgba(250,249,247,.96)] hover:shadow-[0_16px_48px_rgba(0,0,0,.35)]"
                  }`}
                >
                  <div className="overflow-hidden xl:h-[60px] 2xl:h-[68px]">
                    <img
                      src={slide.thumb}
                      alt={slide.productName}
                      className={`h-full w-full object-cover transition duration-700 ${
                        isActive ? "scale-[1.06]" : "group-hover:scale-110"
                      }`}
                    />
                  </div>
                  <div className="px-[11px] py-[8px]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-[11px] font-medium text-[#0d0c0b]">{slide.productName}</div>
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d0c0b] transition group-hover:-rotate-45">
                        <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                          <path d="M2 9L9 2M9 2H4M9 2v5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <div className="text-[10px] text-[#3d5843]">{slide.cat}</div>
                      {slide.badge ? (
                        <div className="rounded-full bg-[#ece5d8] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#675d50]">
                          {slide.badge}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-2 h-px w-full bg-[rgba(13,12,11,.08)]">
                      <div
                        className={`h-full origin-left bg-[#0d0c0b] transition-transform duration-[5200ms] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="mt-2 w-full rounded-2xl border border-[rgba(255,255,255,.18)] bg-[rgba(250,249,247,.12)] px-5 py-4 backdrop-blur-[12px]">
              <div className="mb-0.5 [font-family:var(--font-cormorant)] text-4xl leading-none font-light text-white">
                240+
              </div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[rgba(255,255,255,.72)]">
                Curated pieces
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile marquee brand strip (full-bleed, auto-scrolls like a ticker) ── */}
        <div className="mt-6 overflow-hidden -mx-4 sm:-mx-5 md:-mx-8 pb-6 xl:hidden">
          <div className="flex gap-3 w-max animate-[tickerMove_22s_linear_infinite] hover:[animation-play-state:paused]">
            {[...HERO_SLIDES, ...HERO_SLIDES].map((slide, i) => {
              const isActive = (i % HERO_SLIDES.length) === activeIndex;
              return (
                <button
                  key={`${slide.productName}-marquee-${i}`}
                  onClick={() => setActiveIndex(i % HERO_SLIDES.length)}
                  className={`w-[148px] shrink-0 overflow-hidden rounded-[16px] border text-left backdrop-blur-[12px] transition-colors ${
                    isActive
                      ? "border-[rgba(255,255,255,.45)] bg-[rgba(250,249,247,.20)]"
                      : "border-[rgba(255,255,255,.16)] bg-[rgba(250,249,247,.09)]"
                  }`}
                >
                  <div className="h-[76px] overflow-hidden">
                    <img src={slide.thumb} alt={slide.productName} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-2.5 py-2.5">
                    <div className="truncate text-[11.5px] font-medium leading-tight text-white">
                      {slide.productName}
                    </div>
                    <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.1em] text-[rgba(255,255,255,.68)]">
                      {slide.cat}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
