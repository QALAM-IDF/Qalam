"use client";

import Link from "next/link";
import { SessionCard } from "@/components/professeur/SessionCard";
import { EleveProgressCard } from "@/components/professeur/EleveProgressCard";

type Session = {
  id: string;
  title: string;
  title_ar?: string | null;
  univers?: string | null;
  session_date: string;
  duration_minutes?: number | null;
  zoom_link?: string | null;
};

type RecentEleve = {
  clerk_user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
};

export function ProfDashboardClient({
  nextSessions,
  recentEleves,
}: {
  nextSessions: Session[];
  recentEleves: RecentEleve[];
}) {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
          Prochaines sessions
        </h2>
        <div className="space-y-4">
          {nextSessions.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucune session planifiée.
            </p>
          ) : (
            nextSessions.map((s) => (
              <SessionCard
                key={s.id}
                id={s.id}
                title={s.title}
                title_ar={s.title_ar}
                univers={s.univers}
                session_date={s.session_date}
                duration_minutes={s.duration_minutes}
                zoom_link={s.zoom_link}
                onCopyZoom={(link) => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(link);
                  }
                }}
              />
            ))
          )}
        </div>
        <Link
          href="/professeur/planning"
          className="mt-3 inline-block text-sm"
          style={{ color: "var(--or-brillant)" }}
        >
          Voir le planning →
        </Link>
      </section>
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
          Élèves récents
        </h2>
        <div className="space-y-4">
          {recentEleves.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucun élève assigné.
            </p>
          ) : (
            recentEleves.map((e) => (
              <EleveProgressCard
                key={e.clerk_user_id}
                clerk_user_id={e.clerk_user_id}
                first_name={e.first_name}
                last_name={e.last_name}
                email={e.email}
                progressPercent={e.progressPercent}
                completedLessons={e.completedLessons}
                totalLessons={e.totalLessons}
              />
            ))
          )}
        </div>
        <Link
          href="/professeur/eleves"
          className="mt-3 inline-block text-sm"
          style={{ color: "var(--or-brillant)" }}
        >
          Voir mes élèves →
        </Link>
      </section>
    </div>
  );
}
