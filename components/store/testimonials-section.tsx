"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const TESTIMONIALS = [
  {
    quote: "Green Roots delivered exceptional quality gifts for our entire leadership team. The product range and curation is truly unmatched in the corporate gifting space.",
    name: "Ravi Kumar",
    role: "Head of HR · TechCorp India",
    initial: "R",
  },
  {
    quote: "We've been sourcing corporate gifts through Green Roots for three years. Response time is always within hours, and the quality never disappoints.",
    name: "Priya Sharma",
    role: "Events Manager · Infosys",
    initial: "P",
  },
  {
    quote: "From Wildcraft bags to Borosil bottles — everything arrived perfectly packaged and on time. Our employees were genuinely impressed.",
    name: "Arjun Mehta",
    role: "Admin Director · HDFC Life",
    initial: "A",
  },
];

const STARS = (
  <div className="flex justify-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 12 12" fill="#b8975a">
        <path d="M6 1l1.3 3.9H11L8.2 7l1.1 3.9L6 8.9 2.7 10.9 3.8 7 1 4.9h3.7z" />
      </svg>
    ))}
  </div>
);

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex flex-col justify-between rounded-[24px] border border-[#ebe2d6] bg-white p-6 md:p-7">
      <div>
        <div className="mb-4 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#b8975a">
              <path d="M6 1l1.3 3.9H11L8.2 7l1.1 3.9L6 8.9 2.7 10.9 3.8 7 1 4.9h3.7z" />
            </svg>
          ))}
        </div>
        <p className="text-[14px] leading-[1.8] text-[#3d3530]">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-[#f0e8de] pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d0c0b] font-[var(--font-cormorant)] text-[18px] text-white">
          {t.initial}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#0d0c0b]">{t.name}</div>
          <div className="text-[11.5px] text-[#5c5348]">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const go = (dir: 1 | -1) => {
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAnimKey((k) => k + 1);
  };

  const goTo = (i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  return (
    <section className="pb-8 md:px-12 md:pb-16">
      <Reveal
        animation="fadeUp"
        duration={600}
        className="mb-6 flex flex-col items-start justify-between gap-3 px-5 md:mb-11 md:flex-row md:items-end md:px-0"
      >
        <div>
          <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
            What Clients Say
          </div>
          <div className="font-[var(--font-cormorant)] text-[clamp(28px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
            Trusted by teams
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="#b8975a">
                <path d="M6 1l1.3 3.9H11L8.2 7l1.1 3.9L6 8.9 2.7 10.9 3.8 7 1 4.9h3.7z" />
              </svg>
            ))}
          </div>
          <span className="text-[12.5px] font-medium text-[#5c5348]">5.0 · 120+ clients</span>
        </div>
      </Reveal>

      {/* ── Mobile: one-at-a-time centered carousel ── */}
      <div className="md:hidden">
        {/* Stars + quote + author — centered */}
        <div className="relative px-5">
          {/* Fade-in card */}
          <div
            key={animKey}
            className="flex flex-col items-center text-center"
            style={{ animation: "fadeInBlur 0.35s ease both" }}
          >
            {/* Stars */}
            <div className="mb-5">{STARS}</div>

            {/* Quote */}
            <p className="mb-6 text-[15px] leading-[1.85] text-[#3d3530]">
              &ldquo;{TESTIMONIALS[active].quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d0c0b] font-[var(--font-cormorant)] text-[20px] text-white">
                {TESTIMONIALS[active].initial}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#0d0c0b]">{TESTIMONIALS[active].name}</div>
                <div className="mt-0.5 text-[12px] text-[#5c5348]">{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d9cb] bg-white shadow-sm transition active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="#0d0c0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d9cb] bg-white shadow-sm transition active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="#0d0c0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-7 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-[#0d0c0b]" : "w-1.5 bg-[#d6cab8]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {TESTIMONIALS.map((t, index) => (
          <Reveal
            key={t.name}
            animation="scaleIn"
            delay={index * 110}
            duration={600}
            className="group rounded-[24px] transition hover:-translate-y-1 hover:shadow-[var(--shadow-2)]"
          >
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
