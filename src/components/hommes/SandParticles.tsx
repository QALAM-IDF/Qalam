"use client";

import { useMemo } from "react";
import { useMobile } from "@/hooks/useMobile";

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  bottom: Math.random() * 30,
  size: Math.random() * 2 + 2,
  delay: Math.random() * 6,
  duration: Math.random() * 6 + 6,
}));

export default function SandParticles() {
  const isMobile = useMobile(768);

  const displayParticles = useMemo(() => (isMobile ? [] : particles), [isMobile]);

  if (displayParticles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {displayParticles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#F5E6C8]"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            animation: "sand-drift ease-in-out infinite",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
