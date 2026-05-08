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
};

function upgradeImage(url: string) {
  return url
    .replace(/w=\d+/i, "w=1800")
    .replace(/h=\d+/i, "h=1200")
    .replace(/q=\d+/i, "q=90");
}

const HERO_SLIDE_CONFIGS: HeroSlideConfig[] = [
  {
    cat: "Bags",
    productName: "Wildcraft",
    eyebrow: "Featured Collection - Backpacks",
    title: ["Wildcraft", "Campus", "for", "adventure."],
    note: "Engineered for the everyday explorer — 30L capacity, padded laptop sleeve, and ergonomic shoulder straps built to last.",
  },
  {
    cat: "Electronics",
    productName: "JBL B2B",
    eyebrow: "New Arrival - Earbuds",
    title: ["JBL Pure", "Bass", "goes", "wireless."],
    note: "24-hour total battery life, IPX5 sweat resistance, and JBL's signature deep bass sound in a truly wireless form.",
  },
  {
    cat: "Apparel",
    productName: "Crocodile Polo",
    eyebrow: "Curated Drop - Polo Shirts",
    title: ["Crocodile", "Polo", "for", "presence."],
    note: "Premium pique knit, embroidered heritage logo, and a classic three-button placket — corporate gifting elevated.",
  },
  {
    cat: "Home Appliances",
    productName: "Wonderchef",
    eyebrow: "Home Collection - Kitchen Appliances",
    title: ["Wonderchef", "Kitchen", "blends", "wellness."],
    note: "PFOA-free hard anodised cookware, Nutri-blend mixers, and induction-compatible designs — the modern kitchen, elevated.",
  },
  {
    cat: "Premium Gifts",
    productName: "Sheaffer",
    eyebrow: "Premium Gifts - Luxury Pens",
    title: ["Sheaffer", "Prestige", "in every", "stroke."],
    note: "Glossy black lacquer rollerballs, palladium trim, and premium fountain pen combinations — gifting that leaves a lasting mark.",
  },
  {
    cat: "Water Bottles",
    productName: "Divine Copper",
    eyebrow: "Wellness Collection - Copper Bottles",
    title: ["Divine", "Copper", "for", "wellness."],
    note: "Hand-etched pure copper bottles with Ayurvedic wellness benefits — the art of mindful hydration, beautifully crafted.",
  },
];

const HERO_SLIDES = HERO_SLIDE_CONFIGS.map((slide) => {
  const product = PRODS[slide.cat].find((item) => item.name === slide.productName);

  if (!product) {
    throw new Error(`Missing hero product: ${slide.productName}`);
  }

  return {
    ...slide,
    desc: product.desc,
    sub: product.sub,
    badge: product.badge,
    img: upgradeImage(product.img),
    thumb: product.img,
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
            className={`absolute inset-0 h-full w-full object-cover object-[72%_center] transition-all duration-[1600ms] ease-out xl:object-[78%_center] ${
              index === activeIndex ? "scale-100 opacity-[.92]" : "scale-[1.08] opacity-0"
            }`}
            style={{
              animation: index === activeIndex ? "heroDrift 14s ease-in-out infinite alternate" : undefined,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,12,11,.9)_0%,rgba(13,12,11,.68)_34%,rgba(13,12,11,.3)_60%,rgba(13,12,11,.16)_100%),linear-gradient(to_top,rgba(13,12,11,.68)_0%,rgba(13,12,11,.16)_42%,rgba(13,12,11,.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_75%_82%,rgba(255,255,255,.08),transparent_24%)] mix-blend-screen" />

      <div className="relative z-[2] mx-auto flex min-h-[620px] h-full w-full max-w-[1440px] items-end px-4 pb-20 pt-16 sm:min-h-[680px] sm:px-5 sm:pb-24 sm:pt-18 md:px-8 xl:min-h-[calc(100svh-68px)] xl:items-center xl:px-12 xl:pb-8 xl:pt-6">
        <div className="w-full xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:items-center xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_232px] 2xl:gap-12">
          <div className="max-w-[720px] xl:max-w-[640px]">
            <div
              key={`${activeSlide.productName}-copy`}
              className="animate-[heroCopyIn_900ms_var(--ease)_both]"
            >
              <div className="mb-5 flex items-center gap-[14px] sm:mb-6">
                <span className="h-px w-9 bg-[rgba(255,255,255,.4)]" />
                <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[rgba(255,255,255,.88)]">
                  {activeSlide.eyebrow}
                </span>
              </div>

              <h1 className="mb-5 max-w-[620px] font-[var(--font-cormorant)] text-[clamp(40px,8vw,92px)] leading-[.94] font-light tracking-[-0.02em] text-white sm:mb-6">
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
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold tracking-[0.02em] text-[#0d0c0b] transition hover:-translate-y-0.5 hover:bg-[#f4ede3] hover:shadow-[var(--shadow-3)] sm:w-auto"
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

            <div className="mt-7 flex gap-3 overflow-x-auto pb-1 xl:hidden">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${slide.productName}-mobile`}
                    onClick={() => setActiveIndex(index)}
                    className={`min-w-[180px] overflow-hidden rounded-[18px] border text-left backdrop-blur-[12px] transition ${
                      isActive
                        ? "border-[rgba(255,255,255,.4)] bg-[rgba(250,249,247,.18)]"
                        : "border-[rgba(255,255,255,.18)] bg-[rgba(250,249,247,.1)]"
                    }`}
                  >
                    <div className="h-24 overflow-hidden">
                      <img src={slide.thumb} alt={slide.productName} className="h-full w-full object-cover" />
                    </div>
                    <div className="px-3 py-3">
                      <div className="text-[12px] font-medium text-white">{slide.productName}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-[rgba(255,255,255,.75)]">
                        {slide.cat}
                      </div>
                    </div>
                  </button>
                );
              })}
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
                      <div className="text-[10px] text-[#5c5348]">{slide.cat}</div>
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
              <div className="mb-0.5 font-[var(--font-cormorant)] text-4xl leading-none font-light text-white">
                240+
              </div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[rgba(255,255,255,.72)]">
                Curated pieces
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ animation: "fadeUp .6s var(--ease) .8s both" }}
        className="absolute bottom-6 left-4 z-[3] flex items-center gap-3 text-[10.5px] uppercase tracking-[0.14em] text-[rgba(255,255,255,.65)] sm:bottom-8 sm:left-5 md:left-8 xl:left-12"
      >
        <div className="relative h-10 w-px overflow-hidden bg-[rgba(255,255,255,.2)]">
          <span
            className="absolute inset-x-0 h-full bg-[rgba(255,255,255,.6)]"
            style={{ top: "-100%", animation: "scrollTick 2s var(--ease) infinite" }}
          />
        </div>
        Scroll
      </div>
    </section>
  );
}
