import { Reveal } from "./reveal";

const REASONS = [
  {
    label: "On-Time Delivery",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M1 3h15v13H1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "End-to-End Solutions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Trusted by leading Brands",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l7 3v6c0 5-3 8.5-7 10-4-1.5-7-5-7-10V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Competitive Pricing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.71 3.24L3 3a1 1 0 0 0-1 1l.24 6.71a2 2 0 0 0 .59 1.29l9.58 9.58a2 2 0 0 0 2.83 0l6.35-6.35a2 2 0 0 0 0-2.82z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
];

export function WhyUsSection() {
  return (
    <section className="px-4 py-10 sm:px-5 sm:py-14 md:px-12 md:py-20">
      <Reveal animation="fadeUp" duration={600} className="mb-6 md:mb-9">
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
          Why Choose Green Roots
        </div>
        <h2 className="font-[var(--font-montserrat)] text-[clamp(32px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0d0c0b]">
          Why Us?
        </h2>
      </Reveal>

      <Reveal animation="fadeUp" duration={600} delay={80}>
        <div className="mb-8 h-px w-full bg-[#0d0c0b]" />
      </Reveal>

      <div className="mb-8 grid grid-cols-2 gap-y-9 sm:grid-cols-4 sm:gap-6">
        {REASONS.map((reason, i) => (
          <Reveal
            key={reason.label}
            animation="fadeUp"
            delay={i * 100}
            duration={550}
            className="flex flex-col items-center gap-3 text-center sm:border-l sm:border-[#e0ece0] sm:px-4 sm:first:border-l-0"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0d0c0b] text-[#0d0c0b] transition hover:bg-[#0d0c0b] hover:text-white">
              {reason.icon}
            </div>
            <div className="max-w-[140px] text-[13.5px] font-semibold leading-snug text-[#0d0c0b]">
              {reason.label}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal animation="fadeUp" duration={600} delay={120}>
        <div className="mb-8 h-px w-full bg-[#e0ece0]" />
      </Reveal>

      <Reveal animation="fadeUp" duration={600} delay={160}>
        <p className="max-w-[760px] text-[14.5px] leading-[1.8] text-[#2d4430]">
          We specialize in creating memorable corporate gifts that enhance your brand identity and strengthen client relationships. Our wide range of customisable gifts ensures a personal touch that aligns with your brand message.
        </p>
      </Reveal>
    </section>
  );
}
