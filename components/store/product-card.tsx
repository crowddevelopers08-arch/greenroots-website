import { type CategoryKey, type Product } from "@/lib/store-data";

type Props = {
  product: Product;
  category: CategoryKey;
  delay?: number;
  onEnquiry: (product: Product, category: CategoryKey) => void;
};

export function ProductCard({ product, category, delay = 0, onEnquiry }: Props) {
  return (
    <button
      onClick={() => onEnquiry(product, category)}
      className="group flex translate-y-[18px] cursor-pointer flex-col overflow-hidden rounded-[18px] border border-[rgba(214,202,184,.5)] bg-[#faf9f7] text-left opacity-0 transition duration-300 hover:-translate-y-2 hover:border-[#d6cab8] hover:shadow-[var(--shadow-3)]"
      style={{ animation: `cardIn .5s var(--ease) ${delay}ms forwards` }}
    >
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden bg-[#f4ede3]">
        {product.badge ? (
          <span className="absolute left-3 top-3 z-[2] rounded-full bg-[#0d0c0b] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute right-3 top-3 z-[2] flex h-8 w-8 scale-80 items-center justify-center rounded-full bg-[rgba(250,249,247,.8)] text-[#5c5348] opacity-0 backdrop-blur-[8px] transition group-hover:scale-100 group-hover:opacity-100">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 11s-5-3.2-5-6.5a3 3 0 015 0 3 3 0 015 0c0 3.3-5 6.5-5 6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
        <img src={product.img} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,12,11,.78)_0%,transparent_52%)] opacity-0 transition group-hover:opacity-100" />
        <span className="absolute inset-x-[14px] bottom-[14px] translate-y-2.5 rounded-full bg-[#faf9f7] px-3 py-3 text-center text-[12.5px] font-semibold tracking-[0.02em] text-[#0d0c0b] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          Enquire Now
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-[18px] pb-5 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 text-sm leading-[1.3] font-medium text-[#0d0c0b]">{product.name}</div>
          <div className="mt-0.5 whitespace-nowrap text-[11.5px] font-medium text-[#8c847a]">POA</div>
        </div>
        <p className="flex-1 text-xs leading-[1.5] font-light text-[#5c5348]">{product.desc}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-[20px] bg-[#f4ede3] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#b8a898]">
            {product.sub}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eae0d2] text-[#5c5348] transition group-hover:bg-[#0d0c0b] group-hover:text-white">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
