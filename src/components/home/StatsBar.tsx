"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 500, suffix: "+", label: "eleves formes" },
  { value: 4, suffix: "", label: "niveaux d'enseignement" },
  { value: 98, suffix: "%", label: "satisfaction" },
  { value: 30, suffix: "h", label: "par forfait" },
];

function StatItem({
  value,
  suffix,
  label,
  enabled,
}: {
  value: number;
  suffix: string;
  label: string;
  enabled: boolean;
}) {
  const { count } = useCountUp(value, 2000, { enabled });
  return (
    <div className="rounded-xl bg-[var(--blanc-ivoire)] p-4 text-center">
      <p className="font-display text-3xl text-[var(--or-luxe)] lg:text-4xl xl:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs tracking-[0.15em] uppercase text-[var(--encre-douce)]">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.4 });

  return (
    <div
      ref={ref}
      className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-[var(--or-brillant)]/40 bg-[var(--beige-chaud)]/50 p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          enabled={isInView}
        />
      ))}
    </div>
  );
}
