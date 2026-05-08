import { Reveal } from "./reveal";

const BRANDS = [
  "Wildcraft", "Delsey Paris", "JBL", "PUMA", "Borosil", "Hawkins",
  "Wonderchef", "Sheaffer", "Parker", "SWISS MILITARY", "Adidas",
  "Havells", "Noise", "SkullCandy", "Rare Rabbit", "ALLEN SOLLY",
  "FABER", "Lapis Bard", "Safari", "Reebok", "MIVI", "Blaupunkt",
];

export function BrandsSection() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="pb-8 pt-4 md:pb-16 md:pt-8">
      <Reveal animation="fadeUp" duration={600} className="mb-4 px-5 md:mb-6 md:px-12">
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
          Our Portfolio
        </div>
        <div className="font-[var(--font-cormorant)] text-[clamp(30px,3.5vw,46px)] leading-[1.06] tracking-[-0.01em]">
          Trusted Brands
        </div>
      </Reveal>

      <Reveal animation="fadeInBlur" duration={700} delay={100} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-[linear-gradient(to_right,#faf9f7,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-[linear-gradient(to_left,#faf9f7,transparent)]" />
        <div className="flex w-max gap-3" style={{ animation: "tickerMove 40s linear infinite" }}>
          {row.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="inline-flex shrink-0 items-center rounded-full border border-[#e4d9cb] bg-white px-6 py-3 text-[12.5px] font-medium tracking-[0.04em] text-[#5c5348] shadow-[0_2px_12px_rgba(0,0,0,.04)]"
            >
              {brand}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal animation="fadeInBlur" duration={700} delay={200} className="relative mt-3 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-[linear-gradient(to_right,#faf9f7,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-[linear-gradient(to_left,#faf9f7,transparent)]" />
        <div className="flex w-max gap-3" style={{ animation: "tickerMove 40s linear infinite reverse" }}>
          {[...row].reverse().map((brand, index) => (
            <div
              key={`${brand}-r-${index}`}
              className="inline-flex shrink-0 items-center rounded-full border border-[#d6c8b4] bg-[#faf9f7] px-6 py-3 text-[12.5px] font-medium tracking-[0.04em] text-[#5c5348]"
            >
              {brand}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
