"use client";

import { useEffect, useRef, useState } from "react";
import { CAT, PRODS, type CategoryKey } from "@/lib/store-data";

type Props = {
  open: boolean;
  onClose: () => void;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

// Build a flat search index: categories + all brand/product subs
const SEARCH_INDEX = (Object.keys(CAT) as CategoryKey[]).flatMap((cat) => [
  { label: cat, sub: null, cat, type: "category" as const },
  ...CAT[cat].subs
    .filter((s) => s !== "All")
    .map((sub) => ({ label: sub, sub, cat, type: "brand" as const })),
]);

export function SearchBar({ open, onClose, onNav }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.cat.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = (item: typeof SEARCH_INDEX[number]) => {
    onNav(item.cat, item.sub);
    onClose();
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "Enter" && results.length > 0) handleSelect(results[0]);
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[250] bg-[#f5f9f5] px-4 py-4 shadow-[var(--shadow-2)] transition sm:px-5 md:px-12 md:py-[18px] ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[640px]">
        {/* Input row */}
        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0 text-[#4a7254]">
            <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search brands, categories, products…"
            className="min-w-0 flex-1 rounded-full border-[1.5px] border-[#ccd8ce] bg-[#e4f0e6] px-[22px] py-3 text-[length:var(--fs-body)] outline-none transition focus:border-[#3a7848] focus:bg-white"
          />
          <button onClick={onClose} className="px-2 py-2 text-[length:var(--fs-small)] font-medium text-[#3d5843] transition hover:text-[#0d0c0b] sm:px-3">
            Cancel
          </button>
        </div>

        {/* Live results */}
        {results.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-[20px] border border-[#ccd8ce] bg-white shadow-[var(--shadow-3)]">
            {results.map((item, i) => (
              <button
                key={`${item.cat}-${item.label}-${i}`}
                onClick={() => handleSelect(item)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-[#e4f0e6]"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[length:var(--fs-caption)] font-bold uppercase text-white"
                  style={{ background: CAT[item.cat].col }}
                >
                  {item.cat.slice(0, 2)}
                </span>
                <span className="flex-1">
                  <span className="block text-[length:var(--fs-small)] font-medium text-[#0d0c0b]">{item.label}</span>
                  <span className="text-[length:var(--fs-caption)] text-[#4a6652]">
                    {item.type === "category" ? "Category" : item.cat}
                  </span>
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#3a7848]">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Quick category pills shown when no query */}
        {query.trim().length === 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(CAT) as CategoryKey[]).map((cat) => (
              <button
                key={cat}
                onClick={() => { onNav(cat, null); onClose(); setQuery(""); }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ccd8ce] bg-white px-4 py-2 text-[length:var(--fs-caption)] font-medium text-[#3d5843] transition hover:border-[#3a7848] hover:bg-[#e4f0e6] hover:text-[#0d0c0b]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: CAT[cat].col }}
                />
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
