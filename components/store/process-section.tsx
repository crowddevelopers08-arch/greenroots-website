import { Reveal } from "./reveal";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Browse",
      description: "Explore 200+ premium pieces across 7 carefully curated categories.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M7 4l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Enquire",
      description: "Fill out our simple form for any piece. Takes less than a minute, no commitment required.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Receive",
      description: "Our team responds within 24 hours with pricing, availability and bespoke delivery options.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="px-4 pb-6 sm:px-5 sm:pb-8 md:px-12 md:pb-16">
      <Reveal animation="fadeUp" duration={600} className="mb-5 md:mb-11">
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d5843] sm:mb-2 sm:text-[10.5px]">
          How It Works
        </div>
        <div className="font-[var(--font-cormorant)] text-[clamp(26px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
          Simple by design
        </div>
      </Reveal>

      <div className="grid overflow-hidden rounded-[20px] border border-[#cadace] sm:rounded-[28px] lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal
            key={step.number}
            animation="fadeUp"
            delay={index * 120}
            duration={600}
            className={`group bg-[#f5f9f5] px-5 py-7 transition hover:bg-[#e4f0e6] sm:px-6 sm:py-8 md:px-11 md:py-[52px] ${
              index < steps.length - 1 ? "border-b border-[#cadace] lg:border-b-0 lg:border-r" : ""
            }`}
          >
            <div className="mb-4 font-[var(--font-cormorant)] text-[60px] leading-none font-light italic text-[#cadace] transition group-hover:text-[#b4ccb6] md:mb-7 md:text-[80px]">
              {step.number}
            </div>
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#b0c8b2] text-[#3d5843] transition group-hover:-rotate-[15deg] group-hover:border-[#0d0c0b] group-hover:text-[#0d0c0b]">
              {step.icon}
            </div>
            <div className="mb-3 font-[var(--font-cormorant)] text-2xl text-[#0d0c0b]">{step.title}</div>
            <p className="text-[14px] leading-[1.75] text-[#2d4430]">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
