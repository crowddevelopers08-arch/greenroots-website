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
    <section className="bg-[linear-gradient(180deg,#f7fbf7,#e9f3ea)] px-4 py-4 sm:px-5 sm:py-6 md:px-12 md:py-12">
      <Reveal animation="fadeUp" duration={600} className="mb-4 md:mb-8">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d5843] sm:text-[10.5px]">
          How It Works
        </div>
        <div className="font-[var(--font-montserrat)] text-[clamp(28px,4vw,48px)] leading-[1.06] tracking-[-0.01em] text-[#0d0c0b]">
          Simple by design
        </div>
      </Reveal>

      <div className="grid overflow-hidden rounded-[16px] border border-[#cadace] sm:rounded-[20px] lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal
            key={step.number}
            animation="fadeUp"
            delay={index * 120}
            duration={600}
            className={`group bg-[linear-gradient(180deg,#fbfdfb,#eef4ef)] px-4 py-5 transition hover:bg-[#e4f0e6] sm:px-5 sm:py-6 md:px-8 md:py-8 ${
              index < steps.length - 1 ? "border-b border-[#cadace] lg:border-b-0 lg:border-r" : ""
            }`}
          >
            <div className="mb-3 font-[var(--font-montserrat)] text-[clamp(32px,3vw,48px)] leading-none font-light italic text-[#cadace] transition group-hover:text-[#b4ccb6] md:mb-4">
              {step.number}
            </div>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#b0c8b2] text-[#3d5843] transition group-hover:-rotate-[15deg] group-hover:border-[#0d0c0b] group-hover:text-[#0d0c0b]">
              {step.icon}
            </div>
            <div className="mb-2 font-[var(--font-montserrat)] text-[clamp(18px,2vw,24px)] text-[#0d0c0b]">{step.title}</div>
            <p className="text-[13px] leading-[1.6] text-[#2d4430]">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}