"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type CategoryKey, type Product } from "@/lib/store-data";

type Props = {
  product: Product | null;
  category: CategoryKey | null;
  bookOpen?: boolean;
  onClose: () => void;
};

export function EnquiryModal({ product, category, bookOpen, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOpen = Boolean(product) || Boolean(bookOpen);

  useEffect(() => {
    if (!isOpen) {
      setSubmitting(false);
      setError(null);
      setForm({ name: "", phone: "", email: "", msg: "" });
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.msg,
          product: product?.name ?? null,
          category: category ?? null,
          type: product ? "enquiry" : "appointment",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      // Close modal and redirect to thank you page with full page refresh
      onClose();
      // Use window.location for full page navigation
      window.location.href = "/thank-you";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="flex items-start justify-between px-5 pt-6 sm:px-9 sm:pt-8">
          <div>
            <div className="mb-1.5 text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.12em] text-[#4a6a50]">
              {product ? "Product Enquiry" : "Book Appointment"}
            </div>
            <div className="[font-family:var(--font-montserrat)] text-[length:var(--fs-h3)] tracking-[-0.01em] text-[#0d0c0b] sm:text-[length:var(--fs-h3)]">
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
              <div className="mb-0.5 text-[length:var(--fs-small)] font-medium text-[#0d0c0b]">{product.name}</div>
              <div className="text-[length:var(--fs-caption)] text-[#4a6a50]">
                {category} · {product.sub}
              </div>
            </div>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 px-5 pb-6 sm:gap-[14px] sm:px-9 sm:pb-9"
        >
          <div className="grid gap-[14px] md:grid-cols-2">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={updateField("name")}
                placeholder="Your name"
                className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[length:var(--fs-small)] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
              />
            </Field>
            <Field label="Phone">
              <input
                required
                value={form.phone}
                onChange={updateField("phone")}
                placeholder="+1 000 000 0000"
                className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[length:var(--fs-small)] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
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
              className="rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[length:var(--fs-small)] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
            />
          </Field>
          {product && (
            <Field label="Product">
              <input
                readOnly
                value={product.name}
                className="rounded-xl border-[1.5px] border-[#cadace] bg-[#e4f0e6] px-4 py-3 text-[length:var(--fs-small)] text-[#3d5843] outline-none"
              />
            </Field>
          )}
          <Field label="Message">
            <textarea
              value={form.msg}
              onChange={updateField("msg")}
              placeholder="Size, quantity, customisation or any details..."
              className="min-h-[90px] resize-y rounded-xl border-[1.5px] border-[#cadace] bg-[#f5f9f5] px-4 py-3 text-[length:var(--fs-small)] leading-[1.5] outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
            />
          </Field>
          {error && (
            <p className="rounded-xl border-[1.5px] border-[#e0b4b4] bg-[#f9eded] px-4 py-3 text-center text-[length:var(--fs-caption)] text-[#9e4a4a]">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1e3d22] px-7 py-3.5 text-[length:var(--fs-small)] font-semibold tracking-[0.03em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d5a30] hover:shadow-[var(--shadow-2)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {submitting ? "Sending..." : "Get Quote"}
            {!submitting && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="text-center text-[length:var(--fs-caption)] leading-[1.55] text-[#3d5843]">
            We respond within 24 hours · No commitment required
          </p>
        </form>
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
      <span className="text-[length:var(--fs-caption)] font-semibold uppercase tracking-[0.08em] text-[#3d5843]">
        {label}
      </span>
      {children}
    </label>
  );
}