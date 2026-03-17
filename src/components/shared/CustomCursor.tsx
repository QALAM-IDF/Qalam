"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const cursors: Record<string, { color: string }> = {
  "/": { color: "#D4AF37" },
  "/hommes": { color: "#C17F24" },
  "/femmes": { color: "#C4927A" },
  "/enfants": { color: "#FFD700" },
  "/tarifs": { color: "#D4AF37" },
};

export default function CustomCursor() {
  const pathname = usePathname();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [show, setShow] = useState(false);
  const shownRef = useRef(false);

  const config = cursors[pathname] ?? cursors["/"];

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const onMove = (e: MouseEvent) => {
      if (!shownRef.current) {
        shownRef.current = true;
        setShow(true);
      }
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!show) return;
    let raf: number;
    const lerp = 0.12;
    const updateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * lerp,
        y: prev.y + (pos.y - prev.y) * lerp,
      }));
      raf = requestAnimationFrame(updateTrail);
    };
    raf = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(raf);
  }, [show, pos.x, pos.y]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/professeur")) return null;
  if (!show) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[60] flex h-6 w-6 items-center justify-center rounded-full border border-[#d4af37aa] bg-[#f5efe0b0] text-[12px] backdrop-blur-sm"
        style={{
          transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`,
        }}
        aria-hidden
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={config.color}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed z-[59] flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af3733] backdrop-blur-[2px]"
        style={{
          transform: `translate(${trail.x - 20}px, ${trail.y - 20}px)`,
          backgroundColor: `${config.color}15`,
        }}
        aria-hidden
      />
    </>
  );
}
