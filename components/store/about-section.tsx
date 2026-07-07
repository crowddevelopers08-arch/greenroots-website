import { Reveal } from "./reveal";

export function AboutSection() {
  return (
    <section className="relative mx-4 mb-6 overflow-hidden rounded-[20px] sm:mb-8 md:mx-12 md:mb-24 md:rounded-[32px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600&h=1000&fit=crop&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,.5)_0%,rgba(13,10,8,.78)_55%,rgba(13,10,8,.94)_100%)]" />
      </div>

      <div className="relative px-5 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28">
        <Reveal animation="fadeInBlur" duration={700}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,.18)] bg-[rgba(255,255,255,.08)] px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fae6c]" />
            <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.9)]">
              Who We Are
            </span>
          </div>

          <h2 className="max-w-[720px] [font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
            About Us
          </h2>

          <p className="mt-6 max-w-[640px] text-[length:var(--fs-small)] leading-[1.9] text-[rgba(255,255,255,.82)] sm:text-[length:var(--fs-body)]">
            Green Roots is a premier gifting company dedicated to supporting clients across various industries throughout India. With a strong operational presence in Chennai, Delhi, Mumbai, Bangalore, Hyderabad, Kochi, and Pondicherry, we provide customized merchandise solutions tailored to meet the unique needs of our clients. Our expertise lies in sourcing, customizing, and delivering high-quality promotional products that enhance brand value and engagement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
