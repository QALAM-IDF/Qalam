"use client";

import Link from "next/link";

type EleveProgressCardProps = {
  clerk_user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  progressPercent?: number;
  completedLessons?: number;
  totalLessons?: number;
};

export function EleveProgressCard({
  clerk_user_id,
  first_name,
  last_name,
  email,
  progressPercent = 0,
  completedLessons = 0,
  totalLessons = 0,
}: EleveProgressCardProps) {
  const name = [first_name, last_name].filter(Boolean).join(" ") || email || "Élève";

  return (
    <Link
      href={`/professeur/eleves/${clerk_user_id}`}
      className="block rounded-xl border p-4 transition-colors"
      style={{
        background: "#0d150d",
        borderColor: "#1a2a1a",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{
            background: "var(--andalou-sauge)",
            color: "#fff",
          }}
        >
          {(first_name?.[0] ?? "?") + (last_name?.[0] ?? "")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium" style={{ color: "#fff" }}>
            {name}
          </p>
          <p className="truncate text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {email}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-semibold" style={{ color: "var(--or-brillant)" }}>
            {totalLessons > 0 ? Math.round(progressPercent) : 0}%
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
            {completedLessons}/{totalLessons} leçons
          </p>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "#1a2a1a" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${totalLessons > 0 ? progressPercent : 0}%`,
            background: "var(--or-brillant)",
          }}
        />
      </div>
    </Link>
  );
}
