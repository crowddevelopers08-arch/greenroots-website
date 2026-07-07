import Image from "next/image";
import { Reveal } from "./reveal";

const BRANDS = [
  { name: "adidas", src: "/adidas.png" },
  { name: "Blaupunkt", src: "/Blaupunkt.png" },
  { name: "JBL", src: "/jbl.png" },
  { name: "MIVI", src: "/mivi.png" },
  { name: "Nasher Miles", src: "/nahser.png" },
  { name: "Noise", src: "/noise.png" },
  { name: "Parker", src: "/parker.png" },
  { name: "Pepe Jeans", src: "/pepe.png" },
  { name: "Pexpo", src: "/pexpo.png" },
  { name: "Pigeon", src: "/pigeon.png" },
  { name: "Prestige", src: "/prestige.png" },
  { name: "Puma", src: "/puma.png" },
  { name: "Reebok", src: "/reebok.png" },
  { name: "Safari", src: "/safari.png" },
  { name: "Sheaffer", src: "/sheaffer.png" },
  { name: "Skechers", src: "/skechers.png" },
  { name: "SkullCandy", src: "/skullcandy.png" },
  { name: "Toburo", src: "/tuburo.png" },
];

function BrandLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="inline-flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-[#ccd8ce] bg-white px-6 py-4 shadow-[0_2px_12px_rgba(30,61,34,.04)]">
      <Image
        src={src}
        alt={name}
        width={176}
        height={60}
        className="max-h-full w-auto object-contain"
      />
    </div>
  );
}

export function BrandsSection() {
  const half = BRANDS.slice(0, Math.ceil(BRANDS.length / 2));
  const otherHalf = BRANDS.slice(Math.ceil(BRANDS.length / 2));
  const rowA = [...half, ...half];
  const rowB = [...otherHalf, ...otherHalf];

  return (
    <section className="bg-[linear-gradient(180deg,#f7fbf7,#e9f3ea)] pb-6 pt-4 sm:pb-8 md:pb-16 md:pt-8">
      <Reveal animation="fadeUp" duration={600} className="mb-4 px-4 sm:px-5 md:mb-6 md:px-12">
        <div className="mb-2 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
          Our Portfolio
        </div>
        <div className="font-[var(--font-montserrat)] text-[length:var(--fs-h2)] leading-[1.06] tracking-[-0.01em]">
          Trusted Brands
        </div>
      </Reveal>

      <Reveal animation="fadeInBlur" duration={700} delay={100} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-[linear-gradient(to_right,#f5f9f5,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-[linear-gradient(to_left,#f5f9f5,transparent)]" />
        <div className="flex w-max gap-3" style={{ animation: "tickerMove 40s linear infinite" }}>
          {rowA.map((brand, index) => (
            <BrandLogo key={`${brand.name}-${index}`} name={brand.name} src={brand.src} />
          ))}
        </div>
      </Reveal>

      <Reveal animation="fadeInBlur" duration={700} delay={200} className="relative mt-3 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-[linear-gradient(to_right,#f5f9f5,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-[linear-gradient(to_left,#f5f9f5,transparent)]" />
        <div className="flex w-max gap-3" style={{ animation: "tickerMove 40s linear infinite reverse" }}>
          {rowB.map((brand, index) => (
            <BrandLogo key={`${brand.name}-r-${index}`} name={brand.name} src={brand.src} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
