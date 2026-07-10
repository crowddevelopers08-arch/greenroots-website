import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedOn: string;
  sections: readonly LegalSection[];
};

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  updatedOn,
  sections,
}: Props) {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-5 py-8 text-[#0d0c0b] md:px-12 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-full border border-[#e7dbcc] bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(13,12,11,.05)] backdrop-blur-[10px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[length:var(--fs-caption)] font-medium text-[#5c5348] transition hover:text-[#0d0c0b]"
          >
            <span className="text-[length:var(--fs-body)] leading-none">←</span>
            Back to Store
          </Link>
          <div className="text-[length:var(--fs-caption)] uppercase tracking-[0.14em] text-[#8c847a]">
            Last updated {updatedOn}
          </div>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-[#ebe2d6] bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ee_100%)] shadow-[0_18px_70px_rgba(13,12,11,.06)]">
          <div className="border-b border-[#ebe2d6] px-6 py-10 md:px-10 md:py-14">
            <div className="mb-3 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
              {eyebrow}
            </div>
            <h1 className="max-w-3xl [font-family:var(--font-montserrat)] text-[length:var(--fs-h1)] leading-[0.96] tracking-[-0.03em] text-[#0d0c0b]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-[length:var(--fs-body)] leading-[1.8] text-[#3d3530]">
              {intro}
            </p>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[24px] border border-[#efe5d8] bg-white/72 px-5 py-5 shadow-[0_8px_28px_rgba(13,12,11,.03)] md:px-6"
                >
                  <h2 className="mb-3 [font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] leading-none text-[#0d0c0b]">
                    {section.title}
                  </h2>
                  <div className="grid gap-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[length:var(--fs-small)] leading-[1.85] text-[#433b36]">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="grid gap-2 pt-1 text-[length:var(--fs-small)] leading-[1.8] text-[#433b36]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8975a]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-[#e7dbcc] bg-[#f4ede3] px-5 py-5 md:px-6">
              <div className="mb-2 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.15em] text-[#8c847a]">
                Contact
              </div>
              <p className="text-[length:var(--fs-small)] leading-[1.8] text-[#433b36]">
                For any policy or legal questions, contact Green Roots at{" "}
                <a className="font-medium text-[#0d0c0b] underline decoration-[#d6cab8] underline-offset-4" href="mailto:gifts@thegreenroots.in">
                  gifts@thegreenroots.in
                </a>{" "}
                or{" "}
                <a className="font-medium text-[#0d0c0b] underline decoration-[#d6cab8] underline-offset-4" href="tel:+918072319441">
                  8072319441 / 9962214100
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
