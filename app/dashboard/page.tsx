"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  product: string | null;
  category: string | null;
  type: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

const STATUSES = ["New", "Contacted", "Qualified", "Won", "Lost"] as const;

const STATUS_META: Record<
  string,
  { dot: string; chip: string; accent: string }
> = {
  New: { dot: "#2f8f4e", chip: "bg-[#e4f0e6] text-[#1e3d22] border-[#b4ccb6]", accent: "#2f8f4e" },
  Contacted: { dot: "#3b6fb0", chip: "bg-[#e6eef7] text-[#274b7a] border-[#b6c8e0]", accent: "#3b6fb0" },
  Qualified: { dot: "#c98a1e", chip: "bg-[#fff2da] text-[#8a5a12] border-[#e8cf9a]", accent: "#c98a1e" },
  Won: { dot: "#1c6b34", chip: "bg-[#dff3e4] text-[#1c6b34] border-[#a6d9b4]", accent: "#1c6b34" },
  Lost: { dot: "#b0413e", chip: "bg-[#f7e6e6] text-[#8a2f2f] border-[#e0b4b4]", accent: "#b0413e" },
};

const AVATAR_COLORS = ["#2f8f4e", "#3b6fb0", "#c98a1e", "#1c6b34", "#8a5cc4", "#b0413e", "#0f8a8a"];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const i = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (i || "?").toUpperCase();
}

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function exportCsv(leads: Lead[]) {
  const headers = ["Name", "Phone", "Email", "Type", "Status", "Product", "Category", "Message", "Received"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.name, l.phone, l.email, l.type, l.status, l.product, l.category, l.message, new Date(l.createdAt).toLocaleString()]
      .map(esc)
      .join(",")
  );
  const csv = [headers.map(esc).join(","), ...rows].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `green-roots-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load leads.");
      const data = await res.json();
      setLeads(data.leads ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    const snapshot = leads;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setLeads(snapshot); // revert on failure
      throw new Error("Update failed");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const snapshot = leads;
    setLeads((cur) => cur.filter((l) => l.id !== id));
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setLeads(snapshot);
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length };
    for (const s of STATUSES) c[s] = 0;
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = leads.filter((l) => {
      if (filter !== "All" && l.status !== filter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.product ?? "").toLowerCase().includes(q)
      );
    });
    list.sort((a, b) => {
      const t = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sort === "newest" ? t : -t;
    });
    return list;
  }, [leads, filter, search, sort]);

  return (
    <main className="min-h-screen bg-[#eef4ef] text-[#0d0c0b]">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 border-b border-[#d4e2d6] bg-[#f5f9f5]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3d22] text-white shadow-[0_6px_16px_rgba(30,61,34,.25)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10Z" fill="currentColor" opacity=".9" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a6a50]">
                Green Roots
              </div>
              <h1 className="font-[family-name:var(--font-montserrat)] text-xl leading-tight tracking-[-0.01em] sm:text-2xl">
                Leads Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCsv(leads)}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#b4ccb6] bg-white px-4 py-2.5 text-sm font-medium transition hover:border-[#3d5843] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9m0 0 3-3m-3 3L5 7M2 12v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => {
                setRefreshing(true);
                load();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#1e3d22] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d5a30]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                className={refreshing ? "animate-spin" : ""}
              >
                <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8">
        {/* ── KPI stat tiles (also act as filters) ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatTile
            label="Total"
            value={counts.All}
            active={filter === "All"}
            accent="#1e3d22"
            onClick={() => setFilter("All")}
          />
          {STATUSES.map((s) => (
            <StatTile
              key={s}
              label={s}
              value={counts[s] ?? 0}
              active={filter === s}
              accent={STATUS_META[s].accent}
              onClick={() => setFilter(s)}
            />
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9e82]">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or product..."
              className="w-full rounded-full border-[1.5px] border-[#cadace] bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#7a9e82] focus:border-[#1e3d22]"
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border-[1.5px] border-[#cadace] bg-white px-4 py-2.5 text-sm">
            <span className="text-[#7a9e82]">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              className="cursor-pointer bg-transparent font-medium text-[#1e3d22] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border-[1.5px] border-[#e0b4b4] bg-[#f9eded] px-4 py-3 text-sm text-[#9e4a4a]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        {/* ── List ── */}
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState filter={filter} hasLeads={leads.length > 0} />
        ) : (
          <>
            <div className="mb-3 text-sm text-[#4a6a50]">
              Showing <span className="font-semibold text-[#1e3d22]">{visible.length}</span>{" "}
              {visible.length === 1 ? "lead" : "leads"}
            </div>
            <div className="space-y-3">
              {visible.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatus={(status) => updateLead(lead.id, { status })}
                  onDelete={() => deleteLead(lead.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function StatTile({
  label,
  value,
  active,
  accent,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-4 text-left transition ${
        active
          ? "border-transparent shadow-[0_8px_22px_rgba(30,61,34,.12)] ring-2 ring-[#1e3d22]"
          : "border-[#d4e2d6] hover:border-[#b4ccb6] hover:shadow-[0_6px_16px_rgba(30,61,34,.06)]"
      }`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: accent }}
      />
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4a6a50]">
          {label}
        </span>
      </div>
      <div className="font-[family-name:var(--font-montserrat)] text-3xl leading-none tracking-tight text-[#0d0c0b]">
        {value}
      </div>
    </button>
  );
}

function LeadCard({
  lead,
  onStatus,
  onDelete,
}: {
  lead: Lead;
  onStatus: (status: string) => Promise<void>;
  onDelete: () => void;
}) {
  const meta = STATUS_META[lead.status] ?? { accent: "#7a9e82", chip: "border-[#cadace] bg-white" };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#d4e2d6] bg-white shadow-[0_4px_14px_rgba(30,61,34,.04)] transition hover:shadow-[0_10px_28px_rgba(30,61,34,.09)]">
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: meta.accent }} />
      <div className="p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: avatarColor(lead.name) }}
            >
              {initials(lead.name)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold">{lead.name}</span>
                <span className="rounded-full bg-[#eef4ef] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#4a6a50]">
                  {lead.type}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#f5f9f5] px-2.5 py-1 text-sm text-[#3d5843] transition hover:bg-[#e4f0e6]"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3.5C3 3 3.5 2.5 4 2.5h1.5c.4 0 .8.3.9.7l.6 2c.1.4 0 .8-.3 1l-1 .9a9 9 0 0 0 3.7 3.7l.9-1c.2-.3.6-.4 1-.3l2 .6c.4.1.7.5.7.9V13c0 .5-.5 1-1 1A11 11 0 0 1 3 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  {lead.phone}
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#f5f9f5] px-2.5 py-1 text-sm text-[#3d5843] transition hover:bg-[#e4f0e6]"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="m3 5 5 3.5L13 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {lead.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={lead.status}
                onChange={(e) => {
                  void onStatus(e.target.value).catch(() => {});
                }}
                className={`cursor-pointer appearance-none rounded-full border-[1.5px] py-1.5 pl-3 pr-8 text-sm font-semibold outline-none ${meta.chip}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <button
              onClick={onDelete}
              aria-label="Delete lead"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#e6d0d0] text-[#b0413e] transition hover:border-[#e0b4b4] hover:bg-[#f9eded]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 3.5h10M5 3.5V2h4v1.5M3.5 3.5l.5 8h6l.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {(lead.product || lead.category) && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#cadace] bg-[#f5f9f5] px-3 py-1.5 text-sm">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#4a6a50]">
              <path d="M2.5 5.5 8 2.5l5.5 3v5L8 13.5l-5.5-3v-5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M2.5 5.5 8 8.5m0 0 5.5-3M8 8.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-[#1e3d22]">{lead.product ?? "—"}</span>
            {lead.category && <span className="text-[#7a9e82]">· {lead.category}</span>}
          </div>
        )}

        {lead.message && (
          <p className="mt-3 rounded-xl border border-[#eef4ef] bg-[#f5f9f5] px-3.5 py-2.5 text-sm leading-relaxed text-[#2d4430]">
            {lead.message}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#7a9e82]">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span title={new Date(lead.createdAt).toLocaleString()}>
            Received {timeAgo(lead.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[#d4e2d6] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-[#e4f0e6]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded bg-[#e4f0e6]" />
          <div className="h-3 w-64 rounded bg-[#eef4ef]" />
        </div>
        <div className="h-8 w-24 rounded-full bg-[#e4f0e6]" />
      </div>
      <div className="mt-4 h-10 w-full rounded-xl bg-[#eef4ef]" />
    </div>
  );
}

function EmptyState({ filter, hasLeads }: { filter: string; hasLeads: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cadace] bg-white py-20 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e4f0e6]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4a6a50]">
          <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="font-[family-name:var(--font-montserrat)] text-lg text-[#1e3d22]">
        {hasLeads && filter !== "All" ? `No ${filter} leads` : "No leads yet"}
      </div>
      <p className="mt-1 text-sm text-[#4a6a50]">
        {hasLeads && filter !== "All"
          ? "Try a different status filter or search."
          : "New enquiries from the website will appear here."}
      </p>
    </div>
  );
}
