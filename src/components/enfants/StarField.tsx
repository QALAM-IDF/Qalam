"use client";

import { useMemo } from "react";
import { useMobile } from "@/hooks/useMobile";

const stars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export default function StarField() {
  const isMobile = useMobile(768);

  const displayStars = useMemo(() => (isMobile ? stars.slice(0, 25) : stars), [isMobile]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {displayStars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-[#fff8dc]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {!isMobile && (
        <>
          <span
            className="absolute h-0.5 w-20 origin-left rounded-full bg-gradient-to-r from-white/90 to-transparent"
            style={{
              left: "15%",
              top: "20%",
              transform: "rotate(315deg)",
              animation: "shooting-star 1.5s ease-out 0s infinite",
            }}
          />
          <span
            className="absolute h-0.5 w-20 origin-left rounded-full bg-gradient-to-r from-white/90 to-transparent"
            style={{
              left: "55%",
              top: "25%",
              transform: "rotate(315deg)",
              animation: "shooting-star 1.5s ease-out 8s infinite",
            }}
          />
          <span
            className="absolute h-0.5 w-20 origin-left rounded-full bg-gradient-to-r from-white/90 to-transparent"
            style={{
              left: "30%",
              top: "45%",
              transform: "rotate(315deg)",
              animation: "shooting-star 1.5s ease-out 4s infinite",
            }}
          />
        </>
      )}
    </div>
  );
}
