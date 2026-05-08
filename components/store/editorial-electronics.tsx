import { type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

const HIGHLIGHTS = ["24-hr battery life", "IPX5 sweat resistant", "Signature deep bass"];

export function EditorialElectronics({ onNav }: Props) {
  return (
    <section className="mx-4 mb-8 overflow-hidden rounded-[24px] border border-[#ebe2d6] bg-[#fcfaf7] shadow-[var(--shadow-2)] md:mx-12 md:mb-24 md:rounded-[28px] lg:grid lg:grid-cols-2">
      <Reveal animation="slideLeft" duration={700} delay={150} className="group relative min-h-[260px] overflow-hidden lg:order-last">
        <img
          src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&h=700&fit=crop&q=88"
          alt="Premium electronics"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(252,250,247,.15)_0%,transparent_50%),linear-gradient(to_top,rgba(13,12,11,.22)_0%,transparent_55%)]" />
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
          {HIGHLIGHTS.map((item, i) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(255,255,255,.45)] bg-[rgba(255,255,255,.22)] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.04em] text-white backdrop-blur-[10px]"
              style={{ animation: `fadeUp 0.5s ease ${300 + i * 100}ms both` }}
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal animation="slideRight" duration={700} className="flex flex-col justify-between px-5 py-9 md:px-16 md:py-[72px]">
        <div>
          <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c5348]">
            New Arrivals
          </div>
          <h2 className="font-[var(--font-cormorant)] text-[clamp(36px,4vw,60px)] leading-[1.04] font-light tracking-[-0.01em] text-[#0d0c0b]">
            Sound that
            <br />
            moves <em className="text-[#b8975a]">you</em>
            <br />
            forward
          </h2>
          <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.75] text-[#3d3530]">
            JBL, Noise, Blaupunkt and more — premium audio and electronics curated for corporate gifting and personal use.
          </p>

          <div className="mt-8 grid max-w-[300px] grid-cols-3 gap-4">
            {[
              { value: "9",   label: "Brands"   },
              { value: "40+", label: "Products" },
              { value: "24h", label: "Dispatch" },
            ].map((item, i) => (
              <div key={item.label} className="text-center" style={{ animation: `fadeUp 0.5s ease ${500 + i * 80}ms both` }}>
                <div className="font-[var(--font-cormorant)] text-[28px] leading-none font-light text-[#0d0c0b]">
                  {item.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#5c5348]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onNav("Electronics", null)}
          className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#d6cab8] bg-[#0d0c0b] px-[26px] py-[13px] text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#252320] hover:shadow-[var(--shadow-2)] md:mt-12"
        >
          Explore Electronics
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Reveal>
    </section>
  );
}
