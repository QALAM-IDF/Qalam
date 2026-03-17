import type { CSSProperties } from "react";

type ArabicPatternProps = {
  opacity?: number;
  color?: string;
  size?: number;
  className?: string;
  animate?: boolean;
};

export default function ArabicPattern({
  opacity = 0.1,
  color = "currentColor",
  size = 180,
  className,
  animate = false,
}: ArabicPatternProps) {
  const style: CSSProperties = {
    "--pattern-size": `${size}px`,
    color,
    opacity,
    ...(animate && {
      animation: "rotate-slow 60s linear infinite",
      transformOrigin: "center center",
    }),
  } as CSSProperties;

  return (
    <div className={className} style={style} aria-hidden>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="currentColor" strokeWidth="2">
          <path d="M120 16 L144 72 L200 96 L144 120 L120 176 L96 120 L40 96 L96 72 Z" />
          <path d="M120 40 L136 80 L176 96 L136 112 L120 152 L104 112 L64 96 L104 80 Z" />
          <circle cx="120" cy="96" r="18" />
          <path d="M20 20L220 220M220 20L20 220" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
