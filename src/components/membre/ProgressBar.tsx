"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  completed: number;
  total: number;
  label?: string;
  theme?: "default" | "hommes" | "femmes" | "enfants";
  showCount?: boolean;
  animate?: boolean;
};

const themeColors: Record<
  NonNullable<ProgressBarProps["theme"]>,
  { track: string; fill: string }
> = {
  default: {
    track: "var(--beige-chaud)",
    fill: "var(--or-brillant)",
  },
  hommes: {
    track: "var(--desert-horizon)",
    fill: "var(--desert-ambre)",
  },
  femmes: {
    track: "var(--andalou-ivoire)",
    fill: "var(--andalou-bordeaux)",
  },
  enfants: {
    track: "var(--magie-marine)",
    fill: "var(--magie-or)",
  },
};

export default function ProgressBar({
  completed,
  total,
  label,
  theme = "default",
  showCount = false,
  animate = true,
}: ProgressBarProps) {
  const colors = themeColors[theme];
  const percent = total > 0 ? Math.min(100, (completed / total) * 100) : 0;

  return (
    <div>
      {(showCount || label) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && (
            <span style={{ color: "var(--encre-douce)" }}>{label}</span>
          )}
          {showCount && (
            <span style={{ color: "var(--or-luxe)" }}>
              {completed} / {total} leçons
            </span>
          )}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: colors.track }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: colors.fill }}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  );
}
