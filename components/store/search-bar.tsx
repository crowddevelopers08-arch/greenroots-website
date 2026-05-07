"use client";

import { useEffect, useRef, useState } from "react";
import { CAT, type CategoryKey } from "@/lib/store-data";

type Props = {
  open: boolean;
  onClose: () => void;
  onNav: (category: CategoryKey | null, subcategory: string | null) => void;
};

export function SearchBar({ open, onClose, onNav }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key === "Enter" && query.trim()) {
      const match = (Object.keys(CAT) as CategoryKey[]).find((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );

      if (match) {
        onNav(match, null);
        onClose();
        setQuery("");
      }
    }
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[250] bg-[#faf9f7] px-4 py-4 shadow-[var(--shadow-2)] transition sm:px-5 md:px-12 md:py-[18px] ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[640px] flex-wrap items-center gap-3 sm:flex-nowrap">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0 text-[#8c847a]">
          <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search - Bags, Electronics, Apparel, Gifts..."
          className="min-w-0 flex-1 rounded-full border-[1.5px] border-[#eae0d2] bg-[#f4ede3] px-[22px] py-3 text-[15px] outline-none transition focus:border-[#b8a898] focus:bg-[#faf9f7]"
        />
        <button onClick={onClose} className="px-2 py-2 text-[13.5px] font-medium text-[#8c847a] sm:px-3">
          Cancel
        </button>
      </div>
    </div>
  );
}
