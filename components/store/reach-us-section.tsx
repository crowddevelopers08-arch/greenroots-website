import { Reveal } from "./reveal";

type Props = {
  onContact: () => void;
};

const CONTACT_ROWS: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}[] = [
  {
    label: "Call Us",
    value: "8072319441 / 9962214100",
    href: "tel:+918072319441",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: "gifts@thegreenroots.in",
    href: "mailto:gifts@thegreenroots.in",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6.5l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Visit Us",
    value: "www.thegreenroots.in",
    href: "https://www.thegreenroots.in",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "W 55, 8th Street, 1st St, B-Sector, Anna Nagar West Extension, Chennai, Tamil Nadu 600101",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function ReachUsSection({ onContact }: Props) {
  return (
    <section className="relative mx-4 mb-6 overflow-hidden rounded-[20px] bg-[#111d12] sm:mb-8 md:mx-12 md:mb-24 md:rounded-[32px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
        <div className="absolute left-[-10%] top-[-30%] h-[420px] w-[420px] rounded-full bg-[rgba(58,120,72,.12)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out infinite" }} />
        <div className="absolute bottom-[-25%] right-[-8%] h-[380px] w-[380px] rounded-full bg-[rgba(255,255,255,.04)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out 2s infinite" }} />
      </div>

      <div className="relative grid gap-9 px-5 py-10 sm:px-10 sm:py-14 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-16 md:py-20">
        <Reveal animation="slideRight" duration={700}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3a7848]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.9)]">
              Get In Touch
            </span>
          </div>

          <h2 className="font-[var(--font-montserrat)] text-[clamp(34px,5.5vw,64px)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white">
            Reach Us
          </h2>

          <p className="mt-5 max-w-[380px] text-[14.5px] leading-[1.8] text-[rgba(255,255,255,.75)]">
            Let us help you enhance your brand presence with impactful and memorable merchandise!
          </p>

          <button
            onClick={onContact}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-[#111d12] transition hover:-translate-y-0.5 hover:bg-[#e4f0e6] hover:shadow-[var(--shadow-2)]"
          >
            Get in Touch
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>

        <Reveal
          animation="slideLeft"
          duration={700}
          delay={150}
          className="flex flex-col gap-6 border-t border-[rgba(255,255,255,.08)] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"
        >
          {CONTACT_ROWS.map((row) => {
            const inner = (
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.18)] text-[rgba(255,255,255,.85)] transition group-hover:border-[#3a7848] group-hover:text-white">
                  {row.icon}
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,.45)]">
                    {row.label}
                  </div>
                  <div className="mt-1 max-w-[300px] text-[14px] font-medium leading-[1.5] text-white">
                    {row.value}
                  </div>
                </div>
              </div>
            );
            return row.href ? (
              <a
                key={row.label}
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group transition hover:opacity-85"
              >
                {inner}
              </a>
            ) : (
              <div key={row.label} className="group">
                {inner}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
