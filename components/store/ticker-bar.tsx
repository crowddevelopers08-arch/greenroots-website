import { TICKER_ITEMS } from "@/lib/store-data";

export function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-t border-[rgba(255,255,255,.05)] bg-[#0d0c0b] py-[13px]">
      <div className="flex w-max" style={{ animation: "tickerMove 32s linear infinite" }}>
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-8 whitespace-nowrap px-8 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[rgba(255,255,255,.38)]"
          >
            {item}
            <span className="h-[3px] w-[3px] rounded-full bg-[#b8975a] opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
