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
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#b8975a">
        <path d="M6 1l1.3 3.9H11L8.2 7l1.1 3.9L6 8.9 2.7 10.9 3.8 7 1 4.9h3.7z" />
      </svg>
    ))}
  </div>
);

export function TestimonialsSection() {
  return (
    <section className="px-5 pb-12 md:px-12 md:pb-16">
      <Reveal animation="fadeUp" duration={600} className="mb-11 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8c847a]">
            What Clients Say
          </div>
          <div className="font-[var(--font-cormorant)] text-[clamp(30px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
            Trusted by teams
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
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

      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, index) => (
          <Reveal
            key={t.name}
            animation="scaleIn"
            delay={index * 110}
            duration={600}
            className="group flex flex-col justify-between rounded-[24px] border border-[#ebe2d6] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-2)]"
          >
            <div>
              <div className="mb-5">{STARS}</div>
              <p className="text-[14px] leading-[1.8] font-light text-[#5c5348]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-7 flex items-center gap-3 border-t border-[#f0e8de] pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d0c0b] font-[var(--font-cormorant)] text-[18px] font-light text-white">
                {t.initial}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#0d0c0b]">{t.name}</div>
                <div className="text-[11.5px] text-[#8c847a]">{t.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
