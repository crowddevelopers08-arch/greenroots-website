import Image from "next/image";
import { Reveal } from "./reveal";

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Ahmedabad", "Pune", "Kolkata", "Hyderabad"];

const CITY_IMAGES = {
  Delhi: "/delhinew.png",
  Mumbai: "/mumbai.png",
  Bengaluru: "/bengaluru.png",
  Chennai: "/chennai.png",
  Ahmedabad: "/ahmedabad.png",
  Pune: "/pune.png",
  Kolkata: "/kolkata.png",
  Hyderabad: "/hyderabad.png",
};

export function WeSupportSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#e9f3ea,#f7fbf7)] px-4 py-6 sm:px-5 sm:py-8 md:px-12 md:py-12">
      <Reveal animation="fadeUp" duration={600} className="mb-5 text-center md:mb-8">
        <div className="mb-2 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
          Pan-India Presence
        </div>
        <h2 className="font-[var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0d0c0b]">
          We Support
        </h2>
        <p className="mx-auto mt-3 max-w-[560px] text-[length:var(--fs-small)] leading-[1.6] text-[#2d4430]">
          We&rsquo;re proud to extend our services across multiple cities, ensuring quality, creativity, and excellence reach you wherever you are.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5">
        {CITIES.map((city, i) => (
          <Reveal
            key={city}
            animation="scaleIn"
            delay={i * 60}
            duration={550}
            className="group flex flex-col items-center justify-center gap-2 rounded-[14px] bg-[#111d12] px-3 py-5 text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-2)] sm:rounded-[18px] sm:py-7"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden transition group-hover:scale-110">
              <Image 
                src={CITY_IMAGES[city as keyof typeof CITY_IMAGES]} 
                alt={city}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[length:var(--fs-small)] font-semibold text-white sm:text-[length:var(--fs-small)]">{city}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}