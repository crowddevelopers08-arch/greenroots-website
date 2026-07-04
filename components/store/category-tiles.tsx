import { CAT, type CategoryKey } from "@/lib/store-data";
import { Reveal } from "./reveal";

type Props = {
  current: CategoryKey | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function CategoryTiles({ current, onNav }: Props) {
  const entries = Object.entries(CAT) as [CategoryKey, (typeof CAT)[CategoryKey]][];

  return (
    <section className="px-4 pt-5 sm:px-5 md:px-12 md:pt-12">
      <Reveal animation="fadeUp" duration={600} className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:flex-row sm:items-end sm:gap-5 md:mb-11">
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3d5843] sm:mb-2 sm:text-[10.5px]">
            Browse
          </div>
          <div className="font-[var(--font-montserrat)] text-[clamp(26px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
            All Categories
          </div>
        </div>
        <button
          onClick={() => onNav("Backpacks", null)}
          className="mt-1 shrink-0 rounded-full border-[1.5px] border-[#b4ccb6] px-4 py-2 text-[11.5px] font-medium text-[#3d5843] transition hover:-translate-y-px hover:border-[#3d5843] hover:text-[#0d0c0b] sm:px-[22px] sm:py-2.5 sm:text-[12.5px]"
        >
          View All
        </button>
      </Reveal>

      <div className="mb-4 grid grid-cols-3 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {entries.map(([category, config], index) => (
          <Reveal
            key={category}
            animation="scaleIn"
            delay={index * 70}
            duration={550}
            as="button"
            onClick={() => onNav(category, null)}
            className={`group relative aspect-square overflow-hidden rounded-[16px] text-left transition duration-300 hover:z-[2] hover:-translate-y-2.5 hover:shadow-[var(--shadow-3)] sm:aspect-[0.78] sm:rounded-[20px] ${
              current === category ? "ring-1 ring-[#1e3d22]" : ""
            }`}
          >
            <img
              src={config.img}
              alt={category}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,12,11,.88)_0%,rgba(13,12,11,.3)_40%,rgba(13,12,11,.05)_70%)] transition group-hover:opacity-95" />
            <div className="absolute right-3.5 top-3.5 flex h-[30px] w-[30px] translate-y-[-4px] items-center justify-center rounded-full border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.12)] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 9L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-2.5 pb-3 pt-4 sm:px-[14px] sm:pb-5 sm:pt-[18px]">
              <div className="mb-0.5 text-[11px] font-medium tracking-[0.01em] text-white sm:mb-1 sm:text-[13px]">{category}</div>
              <div className="text-[9.5px] tracking-[0.04em] text-[rgba(255,255,255,.78)] sm:text-[10.5px]">{config.cnt} pieces</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#3a7848] transition group-hover:scale-x-100" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
