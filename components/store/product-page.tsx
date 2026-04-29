import { CAT, PRODS, type CategoryKey, type Product } from "@/lib/store-data";
import { ProductCard } from "./product-card";

type Props = {
  category: CategoryKey;
  subcategory: string | null;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
  onEnquiry: (product: Product, category: CategoryKey) => void;
};

export function ProductPage({ category, subcategory, onNav, onEnquiry }: Props) {
  const config = CAT[category];
  const allProducts = PRODS[category];
  const filteredProducts =
    subcategory && subcategory !== "All"
      ? allProducts.filter((product) => product.sub === subcategory)
      : allProducts;
  const subImages = Object.fromEntries(
    config.subs.map((sub) => [
      sub,
      sub === "All" ? config.img : allProducts.find((product) => product.sub === sub)?.img ?? config.img,
    ])
  ) as Record<string, string>;

  const crumbs = [
    { label: "Home", action: () => onNav(null, null) },
    { label: category, action: () => onNav(category, null) },
    ...(subcategory && subcategory !== "All" ? [{ label: subcategory, action: null }] : []),
  ];

  return (
    <section
      className="px-5 pb-20 md:px-12 md:pb-24"
      style={{ animation: "fadeUp .4s var(--ease) forwards" }}
    >
      <div className="relative mb-10 overflow-hidden rounded-[32px] border border-[#ebe2d6] bg-[#fcfaf7]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ee_100%)]" />
          <div className="absolute left-0 top-0 h-full w-[6px]" style={{ backgroundColor: config.col }} />
          <div className="absolute right-[-10%] top-[-20%] h-[240px] w-[240px] rounded-full bg-white/80 blur-3xl md:h-[320px] md:w-[320px]" />
        </div>

        <div className="relative z-[1] px-5 py-8 md:px-8 md:py-9 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[12.5px] text-[#8c847a]">
            {crumbs.map((crumb, index) => (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span className="text-[#d6cab8]">›</span> : null}
                {crumb.action ? (
                  <button onClick={crumb.action} className="transition hover:text-[#0d0c0b]">
                    {crumb.label}
                  </button>
                ) : (
                  <span className="font-medium text-[#0d0c0b]">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div className="max-w-[760px]">
              <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#8c847a]">
                {category}
              </div>

              <div className="font-[var(--font-cormorant)] text-[clamp(38px,4.7vw,66px)] leading-[.96] tracking-[-0.025em] text-[#0d0c0b]">
                {subcategory && subcategory !== "All" ? subcategory : category}
              </div>

              <div className="mt-3 max-w-[540px] text-[13px] leading-[1.75] text-[#73685d] sm:text-[14px]">
                {filteredProducts.length} pieces · Enquire for pricing & availability
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <div className="rounded-[22px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_10px_30px_rgba(170,150,130,.08)] backdrop-blur-[6px]">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#8c847a]">
                  Available
                </div>
                <div className="mt-1 font-[var(--font-cormorant)] text-[30px] leading-none text-[#0d0c0b]">
                  {String(filteredProducts.length).padStart(2, "0")}
                </div>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfd2c1] bg-white px-[18px] py-[10px] text-[12.5px] font-medium text-[#5c5348] transition hover:-translate-y-px hover:border-[#b8a898] hover:text-[#0d0c0b]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Filter
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-[#e7dbcc] pt-5">
            <div className="flex flex-wrap gap-2.5">
              {config.subs.map((sub) => {
                const active = (subcategory ?? "All") === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => onNav(category, sub === "All" ? null : sub)}
                    className={`inline-flex items-center gap-2.5 rounded-full pl-2 pr-5 py-2 text-[12.5px] font-medium transition ${
                      active
                        ? "bg-[#0d0c0b] text-white shadow-[0_8px_18px_rgba(13,12,11,.14)]"
                        : "border border-[#dfd2c1] bg-white text-[#5c5348] hover:-translate-y-px hover:border-[#b8a898] hover:text-[#0d0c0b]"
                    }`}
                  >
                    <span className="h-9 w-9 overflow-hidden rounded-full border border-white/40 bg-[#f3ede5]">
                      <img
                        src={subImages[sub]}
                        alt={sub}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            category={category}
            delay={index * 55}
            onEnquiry={onEnquiry}
          />
        ))}
      </div>
    </section>
  );
}
