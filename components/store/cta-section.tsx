import { type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onContact: () => void;
};

export function CtaSection({ onNav, onContact }: Props) {
  return (
    <section className="relative mx-4 mb-8 overflow-hidden rounded-[24px] bg-[#0d0c0b] md:mx-12 md:mb-24 md:rounded-[32px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
        <div className="absolute left-[-10%] top-[-30%] h-[500px] w-[500px] rounded-full bg-[rgba(184,151,90,.07)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out infinite" }} />
        <div className="absolute bottom-[-20%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[rgba(255,255,255,.04)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out 2s infinite" }} />
      </div>

      <div className="relative px-5 py-10 text-center md:px-16 md:py-24">
        <Reveal animation="fadeInBlur" duration={700}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8975a]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.90)]">
              Corporate Gifting
            </span>
          </div>

          <h2 className="mx-auto mb-5 max-w-[640px] font-[var(--font-cormorant)] text-[clamp(36px,5vw,72px)] leading-[1.02] font-light tracking-[-0.02em] text-white">
            Ready to gift
            <br />
            <em className="text-[rgba(255,255,255,.88)]">with intention?</em>
          </h2>

          <p className="mx-auto mb-10 max-w-[460px] text-[14.5px] leading-[1.75] text-[rgba(255,255,255,.92)]">
            Browse our full catalogue and enquire on any piece. Our team responds within 24 hours with pricing, availability and delivery options.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={() => onNav(null, null)}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13.5px] font-semibold text-[#0d0c0b] transition hover:-translate-y-0.5 hover:bg-[#f4ede3] hover:shadow-[var(--shadow-3)] sm:w-auto"
            >
              Browse All Products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={onContact}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,.28)] px-8 py-4 text-[13.5px] font-medium text-[rgba(255,255,255,.88)] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,.5)] hover:text-white sm:w-auto"
            >
              Contact Directly
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-[rgba(255,255,255,.06)] pt-6 sm:flex-row sm:flex-wrap sm:gap-8 md:mt-14 md:pt-10">
            {[
              { icon: "M9 12l2 2 4-4M7 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9", label: "No commitment required" },
              { icon: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zM12 6v6l4 2", label: "Response within 24 hours" },
              { icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM1 10h22", label: "Custom bulk pricing" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2.5" style={{ animation: `fadeUp 0.5s ease ${800 + i * 100}ms both` }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#b8975a]">
                  <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[12px] font-medium text-[rgba(255,255,255,.85)]">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
