import { type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
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

export function CombinedSection({ onNav, onContact }: Props) {
  return (
    <section className="mx-4 mb-6 overflow-hidden rounded-[20px] bg-[#111d12] sm:mb-8 md:mx-12 md:mb-16 md:rounded-[32px]">
      <div className="relative grid md:grid-cols-2">
        {/* Left Side - CTA Section */}
        <div className="relative overflow-hidden rounded-[20px] md:rounded-l-[32px] md:rounded-r-none">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-10%] top-[-30%] h-[350px] w-[350px] rounded-full bg-[rgba(58,120,72,.10)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out infinite" }} />
            <div className="absolute bottom-[-20%] right-[-5%] h-[300px] w-[300px] rounded-full bg-[rgba(255,255,255,.04)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out 2s infinite" }} />
          </div>

          <div className="relative px-5 py-8 text-left sm:py-10 md:px-8 md:py-12">
            <Reveal animation="fadeInBlur" duration={700} className="flex flex-col">
              <div className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3a7848]" />
                <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.90)]">
                  Corporate Gifting
                </span>
              </div>

              <h2 className="mb-3 max-w-[640px] [font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:mb-4">
                Ready to gift
                <br />
                <span className="not-italic text-[rgba(255,255,255,.88)]">with intention?</span>
              </h2>

              <p className="mb-6 max-w-[440px] text-[length:var(--fs-small)] leading-[1.7] text-[rgba(255,255,255,.92)] sm:mb-8 sm:text-[length:var(--fs-small)]">
                Browse our full catalogue and enquire on any piece. Our team responds within 24 hours with pricing, availability and delivery options.
              </p>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-3.5">
                <button
                  onClick={() => onNav(null, null)}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[length:var(--fs-small)] font-semibold text-[#111d12] transition hover:-translate-y-0.5 hover:bg-[#e4f0e6] hover:shadow-[var(--shadow-3)] sm:w-auto"
                >
                  Browse All Products
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={onContact}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,.28)] px-7 py-3.5 text-[length:var(--fs-small)] font-medium text-[rgba(255,255,255,.88)] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,.5)] hover:text-white sm:w-auto"
                >
                  Contact Directly
                </button>
              </div>

              <div className="mt-6 flex flex-col items-start gap-3 border-t border-[rgba(255,255,255,.06)] pt-5 sm:flex-row sm:flex-wrap sm:gap-6 md:mt-8 md:pt-6">
                {[
                  { icon: "M9 12l2 2 4-4M7 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9", label: "No commitment required" },
                  { icon: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zM12 6v6l4 2", label: "Response within 24 hours" },
                  { icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM1 10h22", label: "Custom bulk pricing" },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2" style={{ animation: `fadeUp 0.5s ease ${700 + i * 100}ms both` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#3a7848]">
                      <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[length:var(--fs-caption)] font-medium text-[rgba(255,255,255,.85)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side - Reach Us Section */}
        <div className="relative overflow-hidden rounded-[20px] md:rounded-r-[32px] md:rounded-l-none md:border-l md:border-[rgba(255,255,255,.08)]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-10%] top-[-30%] h-[300px] w-[300px] rounded-full bg-[rgba(58,120,72,.12)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out infinite" }} />
            <div className="absolute bottom-[-25%] right-[-8%] h-[280px] w-[280px] rounded-full bg-[rgba(255,255,255,.04)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out 2s infinite" }} />
          </div>

          <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-8 md:py-12">
            <div className="flex flex-col h-full">
              <Reveal animation="slideRight" duration={700}>
                   <div className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3a7848]" />
                <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.90)]">
                 Get In Touch
                </span>
              </div>

                <h2 className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
                  Reach Us
                </h2>
                

                <p className="mt-3 max-w-[380px] text-[length:var(--fs-small)] leading-[1.7] text-[rgba(255,255,255,.75)]">
                  Let us help you enhance your brand presence with impactful and memorable merchandise!
                </p>

                <button
                  onClick={onContact}
                  className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[length:var(--fs-caption)] font-semibold text-[#111d12] transition hover:-translate-y-0.5 hover:bg-[#e4f0e6] hover:shadow-[var(--shadow-2)]"
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
                className="mt-6 flex flex-col gap-4 border-t border-[rgba(255,255,255,.08)] pt-5 md:mt-8 md:pt-6"
              >
                {/* Row 1: Call Us and Email Us side by side on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONTACT_ROWS.slice(0, 2).map((row) => {
                    const inner = (
                      <div className="flex items-start gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.18)] text-[rgba(255,255,255,.85)] transition group-hover:border-[#3a7848] group-hover:text-white">
                          {row.icon}
                        </span>
                        <div>
                          <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,.45)]">
                            {row.label}
                          </div>
                          <div className="mt-0.5 text-[length:var(--fs-small)] font-medium leading-[1.4] text-white">
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
                </div>

                {/* Row 2: Address full width with two lines */}
                {CONTACT_ROWS.slice(2, 3).map((row) => {
                  const addressParts = row.value.split(', ');
                  const firstLine = addressParts.slice(0, 4).join(', ');
                  const secondLine = addressParts.slice(4).join(', ');

                  const inner = (
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,.18)] text-[rgba(255,255,255,.85)] transition group-hover:border-[#3a7848] group-hover:text-white">
                        {row.icon}
                      </span>
                      <div>
                        <div className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,.45)]">
                          {row.label}
                        </div>
                        <div className="mt-0.5 text-[length:var(--fs-small)] font-medium leading-[1.4] text-white">
                          <span className="block">{firstLine}</span>
                          <span className="block">{secondLine}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}