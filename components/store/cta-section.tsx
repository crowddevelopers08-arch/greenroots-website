import { type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onContact: () => void;
};

export function CtaSection({ onNav, onContact }: Props) {
  return (
    <section className="relative mx-4 mb-6 overflow-hidden rounded-[20px] bg-[#111d12] sm:mb-8 md:mx-12 md:mb-16 md:rounded-[32px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
        <div className="absolute left-[-10%] top-[-30%] h-[350px] w-[350px] rounded-full bg-[rgba(58,120,72,.10)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out infinite" }} />
        <div className="absolute bottom-[-20%] right-[-5%] h-[300px] w-[300px] rounded-full bg-[rgba(255,255,255,.04)] blur-3xl" style={{ animation: "glowPulse 4s ease-in-out 2s infinite" }} />
      </div>

      <div className="relative px-5 py-8 text-center sm:py-10 md:px-12 md:py-16">
        <Reveal animation="fadeInBlur" duration={700} className="flex flex-col items-center justify-center">
          <div className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3a7848]" />
            <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.90)]">
              Corporate Gifting
            </span>
          </div>

          <h2 className="mx-auto mb-3 max-w-[640px] font-[var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:mb-4">
            Ready to gift
            <br />
            <em className="text-[rgba(255,255,255,.88)]">with intention?</em>
          </h2>

          <p className="mx-auto mb-6 max-w-[440px] text-[length:var(--fs-small)] leading-[1.7] text-[rgba(255,255,255,.92)] sm:mb-8 sm:text-[length:var(--fs-small)]">
            Browse our full catalogue and enquire on any piece. Our team responds within 24 hours with pricing, availability and delivery options.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3.5">
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

          <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-[rgba(255,255,255,.06)] pt-5 sm:flex-row sm:flex-wrap sm:gap-6 md:mt-10 md:pt-8">
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
    </section>
  );
}