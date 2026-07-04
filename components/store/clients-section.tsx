import Image from "next/image";
import { Reveal } from "./reveal";

const CLIENTS = [
  { name: "L&T", src: "/l&t.png", width: 220, height: 120 },
  { name: "TATA", src: "/tata.webp", width: 220, height: 160 },
  { name: "V-Guard", src: "/V-Guard-Logo.png", width: 220, height: 170 },
  { name: "Tube Investments", src: "/Tube.jpg", width: 220, height: 120 },
  { name: "Equitas Small Finance Bank", src: "/equitas-small-finance-bank.png", width: 240, height: 120 },
  { name: "KONE", src: "/kone.png", width: 180, height: 140 },
  { name: "Chola", src: "/chola.png", width: 220, height: 140 },
  { name: "TAFE", src: "/tafe.jpg", width: 200, height: 140 },
  { name: "Premji Invest", src: "/premji.png", width: 240, height: 120 },
  { name: "TATA Play", src: "/tata-play.png", width: 200, height: 140 },
  { name: "Sundaram-Clayton", src: "/tvs.png", width: 220, height: 150 },
  { name: "IndusInd Bank", src: "/IndusIndBankJPEGlogo.png", width: 240, height: 120 },
  { name: "Hexaware", src: "/hexaware.png", width: 220, height: 160 },
  { name: "Straive", src: "/strive.png", width: 240, height: 130 },
  { name: "Axis Bank", src: "/axisbank.png", width: 220, height: 130 },
  { name: "Reserve Bank of India", src: "/reservebank.png", width: 170, height: 170 },
] as const;

export function ClientsSection() {
  return (
    <section className="px-4 py-10 sm:px-5 sm:py-14 md:px-12 md:py-20">
      <Reveal animation="fadeUp" duration={600} className="mb-7 text-center md:mb-11">
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
          Who We Work With
        </div>
        <h2 className="font-[var(--font-montserrat)] text-[clamp(32px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0d0c0b]">
          Our Clients
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.7] text-[#2d4430]">
          We take pride in serving top-tier brands and political campaigns, including:
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10">
        {CLIENTS.map((client, i) => (
          <Reveal
            key={client.name}
            animation="scaleIn"
            delay={i * 45}
            duration={500}
            className="flex min-h-[92px] items-center justify-center px-2 py-2 sm:min-h-[104px]"
          >
            <Image
              src={client.src}
              alt={client.name}
              width={client.width}
              height={client.height}
              className="h-auto max-h-[78px] w-full max-w-[180px] object-contain sm:max-h-[92px] sm:max-w-[210px]"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
