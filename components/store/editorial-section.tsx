import { type CategoryKey } from "@/lib/store-data";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function EditorialSection({ onNav }: Props) {
  return (
    <section className="mx-5 mb-16 grid min-h-[540px] overflow-hidden rounded-[28px] bg-[#0d0c0b] shadow-[var(--shadow-3)] md:mx-12 md:mb-24 lg:grid-cols-2">
      <div className="relative flex flex-col justify-between bg-[#0d0c0b] px-8 py-14 md:px-16 md:py-[72px]">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,.08)_20%,rgba(255,255,255,.08)_80%,transparent)] lg:block" />
        <div>
          <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.3)]">
            Featured Collection
          </div>
          <h2 className="font-[var(--font-cormorant)] text-[clamp(36px,4vw,60px)] leading-[1.04] font-light tracking-[-0.01em] text-white">
            Travel
            <br />
            in <em className="text-[rgba(255,255,255,.45)]">Style</em>
            <br />
            Always
          </h2>
          <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.7] font-light text-[rgba(255,255,255,.4)]">
            From Delsey Paris trolleys to Wildcraft backpacks — premium travel companions handpicked for corporate gifting and everyday use.
          </p>
          <button
            onClick={() => onNav("Bags", null)}
            className="mt-12 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-[26px] py-[13px] text-[13px] font-semibold text-[#0d0c0b] transition hover:-translate-y-0.5 hover:bg-[#f4ede3] hover:shadow-[var(--shadow-2)]"
          >
            Explore Bags
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="group relative min-h-[240px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=700&fit=crop&q=88"
          alt="Leather bags"
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,12,11,.35)_0%,transparent_40%)]" />
      </div>
    </section>
  );
}
