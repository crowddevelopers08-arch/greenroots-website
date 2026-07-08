import { Reveal } from "./reveal";
import { STORE_ASSETS } from "@/lib/store-assets";

const HIGHLIGHTS = [
  "On-Time Delivery",
  "End-to-End Solutions",
  "Trusted by leading Brands",
  "Competitive Pricing",
];

export function EditorialElectronics() {
  return (
    <section className="mx-4 mb-6 overflow-hidden rounded-[20px] border border-[#ccd8ce] bg-[linear-gradient(180deg,#f7fbf7,#eef6ef)] shadow-[var(--shadow-2)] sm:mb-8 md:mx-12 md:mb-16 md:rounded-[28px] lg:grid lg:grid-cols-2">
      <Reveal animation="slideLeft" duration={700} delay={150} className="group relative min-h-[180px] overflow-hidden sm:min-h-[220px] md:min-h-[260px]">
        <img
          src={STORE_ASSETS.editorialWhyUs}
          alt="Green Roots corporate gifting solutions"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(240,246,240,.15)_0%,transparent_50%),linear-gradient(to_top,rgba(13,12,11,.22)_0%,transparent_55%)]" />
      </Reveal>

      <Reveal animation="slideRight" duration={700} className="flex flex-col justify-center px-5 py-8 md:px-12 md:py-12">
        <div>
          <div className="mb-4 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[#3d5843]">
            Why Choose Green Roots
          </div>
          <h2 className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold leading-[1.04] tracking-[-0.01em] text-[#0d0c0b] whitespace-nowrap">
            Why <span className="text-[#3a7848]">Us?</span>
          </h2>
          <p className="mt-3 max-w-[520px] text-[length:var(--fs-small)] leading-[1.6] text-[#2d4430]">
            We specialize in creating memorable corporate gifts that enhance your brand identity and strengthen client relationships. Our wide range of customisable gifts ensures a personal touch that aligns with your brand message.
          </p>

          <div className="mt-5 grid max-w-[320px] grid-cols-2 gap-3 sm:max-w-[420px]">
            {[
              { value: "On-Time", label: "Delivery" },
              { value: "End-to-End", label: "Solutions" },
              { value: "Trusted", label: "Leading Brands" },
              { value: "Competitive", label: "Pricing" },
            ].map((item, i) => (
              <div key={item.label} className="text-center" style={{ animation: `fadeUp 0.5s ease ${500 + i * 80}ms both` }}>
                <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-body)] leading-none text-[#0d0c0b] sm:text-[length:var(--fs-h4)]">
                  {item.value}
                </div>
                <div className="mt-0.5 text-[length:var(--fs-caption)] uppercase tracking-[0.12em] text-[#3d5843]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
