"use client";

import { useEffect, useMemo, useState } from "react";
import { type CategoryKey, type Product } from "@/lib/store-data";

type Props = {
  product: Product | null;
  category: CategoryKey | null;
  onClose: () => void;
};

export function EnquiryModal({ product, category, onClose }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [done, setDone] = useState(false);

  const isOpen = Boolean(product);

  useEffect(() => {
    if (!isOpen) {
      setDone(false);
      setForm({ name: "", phone: "", email: "", msg: "" });
    }
  }, [isOpen]);

  const message = useMemo(
    () => `Thank you, ${form.name || "there"}! Your request for ${product?.name ?? "this product"} has been received. We'll be in touch within 24 hours.`,
    [form.name, product]
  );

  const updateField =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(13,12,11,.55)] p-5 backdrop-blur-[14px] transition ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-[520px] overflow-hidden rounded-3xl bg-[#faf9f7] shadow-[var(--shadow-4)] transition duration-300 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {!done ? (
          <>
            <div className="flex items-start justify-between px-9 pt-8">
              <div>
                <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#8c847a]">
                  Product Enquiry
                </div>
                <div className="font-[var(--font-cormorant)] text-[30px] tracking-[-0.01em] text-[#0d0c0b]">
                  Request Details
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4ede3] text-[#5c5348] transition hover:bg-[#eae0d2] hover:text-[#0d0c0b]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {product ? (
              <div className="mx-9 my-5 flex items-center gap-[14px] rounded-xl border border-[#eae0d2] bg-[#f4ede3] p-[14px]">
                <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[10px] bg-[#eae0d2]">
                  <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-medium text-[#0d0c0b]">{product.name}</div>
                  <div className="text-xs text-[#8c847a]">
                    {category} · {product.sub}
                  </div>
                </div>
              </div>
            ) : null}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setDone(true);
              }}
              className="flex flex-col gap-[14px] px-9 pb-9"
            >
              <div className="grid gap-[14px] md:grid-cols-2">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your name"
                    className="rounded-xl border-[1.5px] border-[#eae0d2] bg-[#faf9f7] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#b8a898] focus:border-[#252320]"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="+1 000 000 0000"
                    className="rounded-xl border-[1.5px] border-[#eae0d2] bg-[#faf9f7] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#b8a898] focus:border-[#252320]"
                  />
                </Field>
              </div>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder="your@email.com"
                  className="rounded-xl border-[1.5px] border-[#eae0d2] bg-[#faf9f7] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#b8a898] focus:border-[#252320]"
                />
              </Field>
              <Field label="Product">
                <input
                  readOnly
                  value={product?.name ?? ""}
                  className="rounded-xl border-[1.5px] border-[#eae0d2] bg-[#f4ede3] px-4 py-3 text-[13.5px] text-[#5c5348] outline-none"
                />
              </Field>
              <Field label="Message">
                <textarea
                  value={form.msg}
                  onChange={updateField("msg")}
                  placeholder="Size, quantity, customisation or any details..."
                  className="min-h-[90px] resize-y rounded-xl border-[1.5px] border-[#eae0d2] bg-[#faf9f7] px-4 py-3 text-[13.5px] leading-[1.5] outline-none transition placeholder:text-[#b8a898] focus:border-[#252320]"
                />
              </Field>
              <button className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0d0c0b] px-7 py-3.5 text-[13.5px] font-semibold tracking-[0.03em] text-white transition hover:-translate-y-0.5 hover:bg-[#252320] hover:shadow-[var(--shadow-2)]">
                Get Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-center text-[11px] leading-[1.55] text-[#8c847a]">
                We respond within 24 hours · No commitment required
              </p>
            </form>
          </>
        ) : (
          <div className="px-9 py-16 text-center">
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1.5px] border-[#d6cab8]">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 13l6 6L21 7" stroke="#0d0c0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mb-3 font-[var(--font-cormorant)] text-[32px]">Enquiry Sent</h2>
            <p className="mb-8 text-[15px] leading-[1.7] font-light text-[#5c5348]">{message}</p>
            <button
              onClick={onClose}
              className="rounded-full border-[1.5px] border-[#d6cab8] px-9 py-3 text-[13.5px] font-medium text-[#0d0c0b] transition hover:border-[#5c5348]"
            >
              Back to Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#5c5348]">
        {label}
      </span>
      {children}
    </label>
  );
}
