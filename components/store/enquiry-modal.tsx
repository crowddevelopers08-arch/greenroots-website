"use client";

import { useEffect, useMemo, useState } from "react";
import { type CategoryKey, type Product } from "@/lib/store-data";

type Props = {
  product: Product | null;
  category: CategoryKey | null;
  bookOpen?: boolean;
  onClose: () => void;
};

export function EnquiryModal({ product, category, bookOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [done, setDone] = useState(false);

  const isOpen = Boolean(product) || Boolean(bookOpen);

  useEffect(() => {
    if (!isOpen) {
      setDone(false);
      setForm({ name: "", phone: "", email: "", msg: "" });
    }
  }, [isOpen]);

  const message = useMemo(
    () => product
      ? `Thank you, ${form.name || "there"}! Your request for ${product.name} has been received. We'll be in touch within 24 hours.`
      : `Thank you, ${form.name || "there"}! Your booking request has been received. We'll confirm your appointment within 24 hours.`,
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
      className={`fixed inset-0 z-[300] flex items-end justify-center bg-[rgba(17,29,18,.55)] p-0 backdrop-blur-[14px] transition sm:items-center sm:p-5 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-[520px] overflow-hidden rounded-t-[28px] bg-[#f5f9f5] shadow-[var(--shadow-4)] transition duration-300 sm:rounded-3xl ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {!done ? (
          <>
            <div className="flex items-start justify-between px-5 pt-6 sm:px-9 sm:pt-8">
              <div>
                <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#4a6a50]">
                  {product ? "Product Enquiry" : "Book Appointment"}
                </div>
                <div className="font-[var(--font-montserrat)] text-[26px] tracking-[-0.01em] text-[#0d0c0b] sm:text-[30px]">
                  {product ? "Request Details" : "Get in Touch"}
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e4f0e6] text-[#3d5843] transition hover:bg-[#d0e0d2] hover:text-[#0d0c0b]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {product ? (
              <div className="mx-5 my-4 flex items-center gap-3 rounded-xl border border-[#cadace] bg-[#e4f0e6] p-3 sm:mx-9 sm:my-5 sm:gap-[14px] sm:p-[14px]">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-[#d0e0d2] sm:h-[52px] sm:w-[52px]">
                  <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-medium text-[#0d0c0b]">{product.name}</div>
                  <div className="text-xs text-[#4a6a50]">
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
              className="flex flex-col gap-3 px-5 pb-6 sm:gap-[14px] sm:px-9 sm:pb-9"
            >
              <div className="grid gap-[14px] md:grid-cols-2">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your name"
                    className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="+1 000 000 0000"
                    className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
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
                  className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[13.5px] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
                />
              </Field>
              {product && (
                <Field label="Product">
                  <input
                    readOnly
                    value={product.name}
                    className="rounded-xl border-[1.5px] border-[#cadace] bg-[#e4f0e6] px-4 py-3 text-[13.5px] text-[#3d5843] outline-none"
                  />
                </Field>
              )}
              <Field label="Message">
                <textarea
                  value={form.msg}
                  onChange={updateField("msg")}
                  placeholder="Size, quantity, customisation or any details..."
                  className="min-h-[90px] resize-y rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[13.5px] leading-[1.5] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
                />
              </Field>
              <button className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1e3d22] px-7 py-3.5 text-[13.5px] font-semibold tracking-[0.03em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d5a30] hover:shadow-[var(--shadow-2)]">
                Get Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-center text-[12px] leading-[1.55] text-[#3d5843]">
                We respond within 24 hours · No commitment required
              </p>
            </form>
          </>
        ) : (
          <div className="px-6 py-12 text-center sm:px-9 sm:py-16">
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1.5px] border-[#b4ccb6]">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 13l6 6L21 7" stroke="#1e3d22" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mb-3 font-[var(--font-montserrat)] text-[32px]">Enquiry Sent</h2>
            <p className="mb-8 text-[15px] leading-[1.7] text-[#2d4430]">{message}</p>
            <button
              onClick={onClose}
              className="rounded-full border-[1.5px] border-[#b4ccb6] px-9 py-3 text-[13.5px] font-medium text-[#0d0c0b] transition hover:border-[#3d5843]"
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
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#3d5843]">
        {label}
      </span>
      {children}
    </label>
  );
}
