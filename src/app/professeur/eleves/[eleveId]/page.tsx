"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

type EleveDetail = {
  clerk_user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  forfait?: string | null;
  forfait_type?: string | null;
  purchased_at?: string | null;
};

type ProgressByCourse = {
  courseId: string;
  title: string;
  title_ar?: string | null;
  completed: number;
  total: number;
  lessons: Array<{ lesson_id: string; completed?: boolean; quiz_score?: number }>;
};

export default function ProfesseurEleveDetailPage() {
  const params = useParams();
  const eleveId = String(params?.eleveId ?? "");
  const [eleve, setEleve] = useState<EleveDetail | null>(null);
  const [progressByCourse, setProgressByCourse] = useState<ProgressByCourse[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eleveId) return;
    fetch(`/api/professeur/eleves/${eleveId}`)
      .then((r) => r.json())
      .then((d) => {
        setEleve(d.eleve ?? null);
        setProgressByCourse(d.progressByCourse ?? []);
      })
      .finally(() => setLoading(false));
  }, [eleveId]);

  if (loading) {
    return (
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Chargement…
      </p>
    );
  }
  if (!eleve) {
    return (
      <div>
        <p style={{ color: "#ef4444" }}>Élève introuvable.</p>
        <Link href="/professeur/eleves" className="mt-4 inline-block text-sm" style={{ color: "var(--or-brillant)" }}>
          ← Retour aux élèves
        </Link>
      </div>
    );
  }

  const name = [eleve.first_name, eleve.last_name].filter(Boolean).join(" ") || eleve.email || "Élève";

  return (
    <div>
      <Link
        href="/professeur/eleves"
        className="mb-6 inline-flex items-center gap-2 text-sm"
        style={{ color: "var(--or-brillant)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux élèves
      </Link>

      <header className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-xl border p-6" style={{ borderColor: "#1a2a1a", background: "#0d150d" }}>
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold"
            style={{ background: "var(--andalou-sauge)", color: "#fff" }}
          >
            {(eleve.first_name?.[0] ?? "?") + (eleve.last_name?.[0] ?? "")}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: "#fff" }}>
              {name}
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {eleve.email}
            </p>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Forfait : {eleve.forfait ?? "—"} · Inscription :{" "}
              {eleve.purchased_at
                ? new Date(eleve.purchased_at).toLocaleDateString("fr-FR")
                : "—"}
            </p>
          </div>
        </div>
        <Link
          href={`/professeur/messages?to=${encodeURIComponent(eleve.email ?? "")}&nom=${encodeURIComponent(name)}`}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--or-brillant)", color: "#0a0f0a" }}
        >
          <Mail className="h-4 w-4" />
          Envoyer un message
        </Link>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
          Progression par cours
        </h2>
        <div className="space-y-4">
          {progressByCourse.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucune progression enregistrée.
            </p>
          ) : (
            progressByCourse.map((c) => {
              const pct = c.total > 0 ? Math.round((100 * c.completed) / c.total) : 0;
              return (
                <div
                  key={c.courseId}
                  className="rounded-xl border p-4"
                  style={{ borderColor: "#1a2a1a", background: "#0d150d" }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: "#fff" }}>
                      {c.title}
                      {c.title_ar && (
                        <span className="ml-2 text-sm font-normal" style={{ color: "rgba(255,255,255,0.7)" }}>
                          — {c.title_ar}
                        </span>
                      )}
                    </h3>
                    <span className="text-sm" style={{ color: "var(--or-brillant)" }}>
                      {c.completed}/{c.total} leçons · {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: "#1a2a1a" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: "var(--or-brillant)" }}
                    />
                  </div>
                  <ul className="mt-3 space-y-1 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {c.lessons.slice(0, 5).map((l) => (
                      <li key={l.lesson_id}>
                        Leçon {l.lesson_id} : {l.completed ? "✓ Complétée" : "—"}
                        {l.quiz_score != null && ` (quiz: ${l.quiz_score})`}
                      </li>
                    ))}
                    {c.lessons.length > 5 && (
                      <li>… et {c.lessons.length - 5} autres</li>
                    )}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
          Notes (privées)
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes personnelles sur cet élève (non enregistrées pour l'instant)"
          rows={4}
          className="w-full rounded-lg border px-4 py-3"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        />
      </section>
    </div>
  );
}
