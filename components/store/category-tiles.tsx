"use client";

import { useRef } from "react";
import { CAT, type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  current: CategoryKey | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function CategoryTiles({ current, onNav }: Props) {
  const entries = Object.entries(CAT) as [CategoryKey, (typeof CAT)[CategoryKey]][];
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(180deg,#e9f3ea,#f7fbf7)] px-4 pb-6 pt-5 sm:px-5 sm:pb-8 md:px-12 md:pb-16 md:pt-12">
      <Reveal animation="fadeUp" duration={600} className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:flex-row sm:items-end sm:gap-5 md:mb-11">
        <div>
          <div className="mb-1.5 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#3d5843] sm:mb-2 sm:text-[length:var(--fs-caption)]">
            Browse
          </div>
          <div className="font-[var(--font-montserrat)] text-[length:var(--fs-h2)] leading-[1.06] tracking-[-0.01em]">
            All Categories
          </div>
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Carousel arrows — desktop */}
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Previous categories"
            className="hidden h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#b4ccb6] text-[#3d5843] transition hover:-translate-y-px hover:border-[#3d5843] hover:text-[#0d0c0b] md:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Next categories"
            className="hidden h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#b4ccb6] text-[#3d5843] transition hover:-translate-y-px hover:border-[#3d5843] hover:text-[#0d0c0b] md:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => onNav("Backpacks", null)}
            className="rounded-full border-[1.5px] border-[#b4ccb6] px-4 py-2 text-[length:var(--fs-caption)] font-medium text-[#3d5843] transition hover:-translate-y-px hover:border-[#3d5843] hover:text-[#0d0c0b] sm:px-[22px] sm:py-2.5 sm:text-[length:var(--fs-caption)]"
          >
            View All
          </button>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth px-4 pb-2 sm:gap-3 sm:px-5 md:mx-0 md:px-0"
      >
        {entries.map(([category, config], index) => (
          <Reveal
            key={category}
            animation="scaleIn"
            delay={index * 70}
            duration={550}
            as="button"
            onClick={() => onNav(category, null)}
            className={`group relative aspect-square w-[46%] shrink-0 snap-start overflow-hidden rounded-[16px] text-left transition duration-300 hover:z-[2] hover:-translate-y-2.5 hover:shadow-[var(--shadow-3)] sm:aspect-[0.78] sm:w-[30%] sm:rounded-[20px] md:w-[calc((100%-4*0.75rem)/5)] ${
              current === category ? "ring-1 ring-[#1e3d22]" : ""
            }`}
          >
            <img
              src={config.img}
              alt={category}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,12,11,.88)_0%,rgba(13,12,11,.3)_40%,rgba(13,12,11,.05)_70%)] transition group-hover:opacity-95" />
            <div className="absolute right-3.5 top-3.5 flex h-[30px] w-[30px] translate-y-[-4px] items-center justify-center rounded-full border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.12)] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-2.5 pb-3 pt-4 sm:px-[14px] sm:pb-5 sm:pt-[18px]">
              <div className="mb-0.5 text-[length:var(--fs-caption)] font-medium tracking-[0.01em] text-white sm:mb-1 sm:text-[length:var(--fs-small)]">{category}</div>
              <div className="text-[length:var(--fs-caption)] tracking-[0.04em] text-[rgba(255,255,255,.78)] sm:text-[length:var(--fs-caption)]">{config.cnt} pieces</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#3a7848] transition group-hover:scale-x-100" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
