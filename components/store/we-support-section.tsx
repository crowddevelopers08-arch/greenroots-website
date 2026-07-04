import { Reveal } from "./reveal";

const ICONS = [
  // Dome
  <svg key="dome" width="24" height="24" viewBox="0 0 26 26" fill="none">
    <path d="M6 22V13a7 7 0 0 1 14 0v9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M13 13V6M10 6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  // Arch / gate
  <svg key="arch" width="24" height="24" viewBox="0 0 26 26" fill="none">
    <path d="M7 22V11a6 6 0 0 1 12 0v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 22v-6M17 22v-6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  // Tower / minaret
  <svg key="tower" width="24" height="24" viewBox="0 0 26 26" fill="none">
    <path d="M13 3l3 4h-6l3-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 7h8v15H9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M11 22v-4h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  // Fort
  <svg key="fort" width="24" height="24" viewBox="0 0 26 26" fill="none">
    <path d="M5 22V9h3V6h3v3h4V6h3v3h3v13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M4 22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
];

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Ahmedabad", "Pune", "Kolkata", "Hyderabad"];

export function WeSupportSection() {
  return (
    <section className="px-4 py-10 sm:px-5 sm:py-14 md:px-12 md:py-20">
      <Reveal animation="fadeUp" duration={600} className="mb-7 text-center md:mb-11">
        <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3d5843]">
          Pan-India Presence
        </div>
        <h2 className="font-[var(--font-montserrat)] text-[clamp(32px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#0d0c0b]">
          We Support
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#2d4430]">
          We&rsquo;re proud to extend our services across multiple cities, ensuring quality, creativity, and excellence reach you wherever you are.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {CITIES.map((city, i) => (
          <Reveal
            key={city}
            animation="scaleIn"
            delay={i * 60}
            duration={550}
            className="group flex flex-col items-center justify-center gap-3 rounded-[16px] bg-[#111d12] px-4 py-8 text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-2)] sm:rounded-[20px] sm:py-10"
          >
            <span className="text-[rgba(255,255,255,.85)] transition group-hover:text-[#5fae6c]">
              {ICONS[i % ICONS.length]}
            </span>
            <span className="text-[14px] font-semibold text-white sm:text-[15px]">{city}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
