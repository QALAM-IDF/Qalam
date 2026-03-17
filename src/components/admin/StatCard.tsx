import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "var(--or-brillant)",
}: StatCardProps) {
  return (
    <div
      className="rounded-xl border p-6"
      style={{
        background: "#1a1a1a",
        borderColor: "#2a2a2a",
      }}
    >
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: `${color}20`, color }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p
        className="font-display text-3xl font-semibold"
        style={{ color: "#fff" }}
      >
        {value}
      </p>
      <p className="mt-1 text-sm" style={{ color: "#888" }}>
        {label}
      </p>
      {trend && (
        <p
          className="mt-2 text-xs"
          style={{
            color: trend.startsWith("+") ? "#22c55e" : trend.startsWith("-") ? "#ef4444" : "#888",
          }}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
