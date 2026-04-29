import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  current: CategoryKey | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function CategoryTiles({ current, onNav }: Props) {
  return (
    <section className="px-5 pt-[60px] md:px-12 md:pt-24">
      <div className="mb-11 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-5">
        <div>
          <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8c847a]">
            Browse
          </div>
          <div className="font-[var(--font-cormorant)] text-[clamp(30px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
            All Categories
          </div>
        </div>
        <button className="hidden rounded-full border-[1.5px] border-[#d6cab8] px-[22px] py-2.5 text-[12.5px] font-medium text-[#5c5348] transition hover:-translate-y-px hover:border-[#5c5348] hover:text-[#0d0c0b] md:inline-flex">
          View All
        </button>
      </div>

      <div className="mb-24 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
        {Object.entries(CAT).map(([name, config]) => {
          const category = name as CategoryKey;
          return (
            <button
              key={category}
              onClick={() => onNav(category, null)}
              className={`group relative aspect-[0.78] overflow-hidden rounded-[20px] text-left transition duration-300 hover:z-[2] hover:-translate-y-2.5 hover:shadow-[var(--shadow-3)] sm:aspect-[2.2/4] ${
                current === category ? "ring-1 ring-[#b8975a]" : ""
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
              <div className="absolute inset-x-0 bottom-0 px-[14px] pb-5 pt-[18px]">
                <div className="mb-1 text-[13px] font-medium tracking-[0.01em] text-white">{category}</div>
                <div className="text-[10.5px] tracking-[0.04em] text-[rgba(255,255,255,.5)]">{config.cnt} pieces</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#b8975a] transition group-hover:scale-x-100" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
