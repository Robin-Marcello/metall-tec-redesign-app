"use client";

import { useCountUp } from "@/hooks/useCountUp";

type Stat = { end: number; prefix: string; suffix: string; label: string };

const defaultStats: Stat[] = [
  { end: 150, prefix: "", suffix: "+", label: "Projekte realisiert" },
  { end: 15, prefix: "", suffix: " Jahre", label: "Erfahrung im Metallbau" },
  { end: 100, prefix: "", suffix: " %", label: "Fertigung in Österreich" },
];

function StatCard({ end, prefix, suffix, label, delay }: Stat & { delay: number }) {
  const { value, ref } = useCountUp(end, 1.8, delay);

  return (
    <div ref={ref} className="glass rounded-3xl p-7">
      <p className="font-display text-3xl font-semibold tracking-tight text-metal">
        {prefix}
        {value}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-mist">
        {label}
      </p>
    </div>
  );
}

export default function AnimatedStats({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <div className="thread-reactive grid gap-5 sm:grid-cols-3">
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} delay={i * 0.1} />
      ))}
    </div>
  );
}
