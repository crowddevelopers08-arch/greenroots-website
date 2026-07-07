import { Reveal } from "./reveal";

export function EditorialSection() {
  return (
    <section className="mx-4 mb-6 grid overflow-hidden rounded-[20px] bg-[#111d12] shadow-[var(--shadow-3)] sm:mb-8 md:mx-12 md:mb-16 md:min-h-[440px] md:rounded-[28px] lg:grid-cols-2">
      <div className="relative flex flex-col justify-center bg-[#111d12] px-5 py-8 md:px-12 md:py-12">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,.08)_20%,rgba(255,255,255,.08)_80%,transparent)] lg:block" />
        <Reveal animation="slideRight" duration={700}>
          <div>
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3a7848]" />
              <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.80)]">
                Who We Are
              </span>
            </div>
            <h2 className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold leading-[1.04] tracking-[-0.01em] text-white whitespace-nowrap">
              About <span className="text-[rgba(255,255,255,.78)]">Us</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[length:var(--fs-small)] leading-[1.7] text-[rgba(255,255,255,.92)]">
              Green Roots is a premier gifting company dedicated to supporting clients across various industries throughout India. With a strong operational presence in Chennai, Delhi, Mumbai, Bangalore, Hyderabad, Kochi, and Pondicherry, we provide customized merchandise solutions tailored to meet the unique needs of our clients. Our expertise lies in sourcing, customizing, and delivering high-quality promotional products that enhance brand value and engagement.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal animation="slideLeft" duration={700} delay={150} className="group relative min-h-[200px] overflow-hidden md:min-h-[240px]">
        <img
          src="https://res.cloudinary.com/diezixk4v/image/upload/Cross_Gift_Sets_for_Diwali_page-0002_q7qrhp"
          alt="Green Roots corporate gifting presentation"
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,29,18,.35)_0%,transparent_40%)]" />
      </Reveal>
    </section>
  );
}