"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 200, suffix: "+", label: "Curated Products" },
  { value: 50,  suffix: "+", label: "Premium Brands"   },
  { value: 6,   suffix: "",  label: "Categories"        },
  { value: 24,  suffix: "h", label: "Response Time"     },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, active, index }: { stat: typeof STATS[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.value, active);
  return (
    <div
      className="group flex flex-col items-center bg-[#faf9f7] px-6 py-11 text-center transition hover:bg-[#f4ede3]"
      style={active ? { animation: `scaleIn 0.6s cubic-bezier(.4,0,.2,1) ${index * 110}ms both` } : { opacity: 0 }}
    >
      <div className="font-[var(--font-cormorant)] text-[clamp(44px,5.5vw,72px)] leading-none font-light tracking-[-0.02em] text-[#0d0c0b]">
        {count}{stat.suffix}
      </div>
      <div className="mt-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8c847a] transition group-hover:text-[#5c5348]">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-5 py-10 md:px-12 md:py-14">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-[#e8ddd0] bg-[#e8ddd0] lg:grid-cols-4">
        {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} active={active} index={i} />)}
      </div>
    </section>
  );
}
