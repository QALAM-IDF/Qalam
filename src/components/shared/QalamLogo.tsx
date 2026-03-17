"use client";

type QalamLogoProps = {
  className?: string;
  color?: string;
  height?: number;
  invert?: boolean;
};

export function QalamLogo({
  className = "",
  color,
  height = 48,
  invert = false,
}: QalamLogoProps) {
  const mainColor = color ?? (invert ? "#f5e6c8" : "#7a6248");
  const subColor = invert ? "#e8d5b0" : "#9a7c5a";
  const ratio = 2.2;
  const width = height * ratio;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 100"
      width={width}
      height={height}
      className={className}
      aria-label="Qalam — Apprenez la langue arabe"
      role="img"
    >
      {/* Plume */}
      <g transform="translate(148, 4) rotate(35)">
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="52"
          stroke={mainColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 4 Q2 10 1 18 Q0 26 3 32 Q6 38 8 44"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M10 10 Q3 15 2 22 Q1 29 4 35"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.6"
          opacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M10 4 Q18 10 19 18 Q20 26 17 32 Q14 38 12 44"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M10 10 Q17 15 18 22 Q19 29 16 35"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.6"
          opacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M10 2 Q19 12 19 22 Q19 34 10 50 Q1 34 1 22 Q1 12 10 2 Z"
          fill={mainColor}
          opacity="0.15"
        />
        <path
          d="M8 44 Q10 52 12 44"
          fill={mainColor}
          opacity="0.8"
          strokeLinecap="round"
        />
      </g>

      {/* Texte Qalam */}
      <text
        x="12"
        y="62"
        fontFamily="'Cormorant Garamond', 'Georgia', serif"
        fontStyle="italic"
        fontWeight="500"
        fontSize="46"
        fill={mainColor}
        letterSpacing="-1"
      >
        Qalam
      </text>

      {/* Sous-titre */}
      <text
        x="18"
        y="80"
        fontFamily="'Cormorant Garamond', 'Georgia', serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="13"
        fill={subColor}
        letterSpacing="0.5"
      >
        Apprenez la langue arabe
      </text>

      {/* Courbe décorative */}
      <path
        d="M12 67 Q8 72 14 74"
        fill="none"
        stroke={mainColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
