"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

type CalligraphyDividerProps = {
  className?: string;
  color?: string;
  compact?: boolean;
};

export default function CalligraphyDivider({
  className,
  color = "var(--or-brillant)",
  compact = false,
}: CalligraphyDividerProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 600 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 20 20 Q 150 5 300 20 Q 450 35 580 20"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={600}
        strokeDashoffset={isInView ? 0 : 600}
        style={{
          transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
        }}
      />
      {!compact && (
        <>
          <circle
            cx="20"
            cy="20"
            r="3"
            fill={color}
            style={{
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.5s 2s",
            }}
          />
          <circle
            cx="580"
            cy="20"
            r="3"
            fill={color}
            style={{
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.5s 2s",
            }}
          />
        </>
      )}
    </svg>
  );
}
