import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function StoreFooter({ onNav }: Props) {
  return (
    <footer className="bg-[#0d0c0b] px-5 py-[60px] text-[rgba(255,255,255,.8)] md:px-12 md:py-[88px]">
      <div className="mb-16 grid gap-10 md:grid-cols-2 xl:grid-cols-[2.2fr_1fr_1fr_1fr] xl:gap-14">
        <div>
          <div className="mb-[14px] flex items-center gap-2.5 font-[var(--font-cormorant)] text-[28px] tracking-[0.12em]">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[rgba(255,255,255,.2)] text-[10px] tracking-[0.06em] text-[rgba(255,255,255,.4)]">
              A
            </span>
            AURÉ
          </div>
          <p className="max-w-[290px] text-[13.5px] leading-[1.75] font-light text-[rgba(255,255,255,.32)]">
            Premium clothing and accessories, available by enquiry. Every piece is curated with intention and enduring craft.
          </p>
          <div className="mt-9">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,.28)]">
              Stay updated
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-4 py-2.5 text-[12.5px] text-white outline-none transition placeholder:text-[rgba(255,255,255,.25)] focus:border-[rgba(255,255,255,.25)] sm:min-w-[220px]"
              />
              <button className="w-full rounded-full border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.1)] px-5 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-[rgba(255,255,255,.18)] sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
          <div className="mt-7 flex gap-2.5">
            <SocialIcon d="M7.5 1.5C4.2 1.5 1.5 4.2 1.5 7.5s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
            <SocialIcon d="M1.5 4h12M1.5 7.5h12M1.5 11h7" />
            <SocialIcon d="M1 11L5.5 6.5 1 2M7.5 11h6.5" />
          </div>
        </div>

        <FooterColumn title="Collections">
          {(Object.keys(CAT) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => onNav(category, null)}
              className="text-left text-[13.5px] font-light text-[rgba(255,255,255,.45)] transition hover:text-white"
            >
              {category}
            </button>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {["About Us", "Our Story", "Sustainability", "Press", "Careers"].map((item) => (
            <span key={item} className="text-[13.5px] font-light text-[rgba(255,255,255,.45)] transition hover:text-white">
              {item}
            </span>
          ))}
        </FooterColumn>

        <div>
          <FooterColumn title="Contact">
            <span className="text-[13.5px] font-light text-[rgba(255,255,255,.45)]">hello@aure.co</span>
            <span className="text-[13.5px] font-light text-[rgba(255,255,255,.45)]">+1 (800) 287-3400</span>
            <span className="text-[13.5px] font-light text-[rgba(255,255,255,.45)]">Mon-Fri, 9am-6pm EST</span>
          </FooterColumn>
          <div className="mt-7">
            <FooterColumn title="Legal">
              {["Privacy Policy", "Terms", "Returns"].map((item) => (
                <span key={item} className="text-[13.5px] font-light text-[rgba(255,255,255,.45)] transition hover:text-white">
                  {item}
                </span>
              ))}
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(255,255,255,.06)] pt-7">
        <span className="text-xs font-light text-[rgba(255,255,255,.2)]">© 2026 AURÉ. All rights reserved.</span>
        <span className="text-xs font-light text-[rgba(255,255,255,.2)]">Crafted with care for quality.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,.28)]">
        {title}
      </div>
      <div className="flex flex-col gap-[13px]">{children}</div>
    </div>
  );
}

function SocialIcon({ d }: { d: string }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,.1)] text-[rgba(255,255,255,.4)] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,.28)] hover:text-white">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
