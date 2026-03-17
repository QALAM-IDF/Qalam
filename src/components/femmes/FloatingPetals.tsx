"use client";

import { useMemo } from "react";
import { useMobile } from "@/hooks/useMobile";

const colors = ["#e8c4a0", "#f5e6c8", "#c4b896", "#d4c4a8"];

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 12 + 8,
  delay: Math.random() * 12,
  duration: Math.random() * 8 + 12,
  rotation: Math.random() * 360,
}));

export default function FloatingPetals() {
  const isMobile = useMobile(768);

  const displayPetals = useMemo(() => (isMobile ? [] : petals), [isMobile]);

  if (displayPetals.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {displayPetals.map((petal) => (
        <span
          key={petal.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${petal.x}%`,
            top: "-5%",
            width: petal.size,
            height: petal.size * 1.6,
            backgroundColor: colors[petal.id % colors.length],
            transform: `rotate(${petal.rotation}deg)`,
            animation: "petal-fall linear infinite",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
