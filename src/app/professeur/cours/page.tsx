"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users } from "lucide-react";

type Course = {
  id: string;
  title: string;
  title_ar?: string | null;
  level?: string | null;
  univers?: string | null;
  lessons?: Array<{ id: string; title?: string; title_ar?: string | null; order_index?: number }>;
};

export default function ProfesseurCoursPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/professeur/cours")
      .then((r) => r.json())
      .then((d) => setCourses(d.courses ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Mes cours
      </h1>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Cours publiés dans vos univers (lecture seule)
      </p>

      {loading ? (
        <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Chargement…
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.length === 0 ? (
            <p className="col-span-full text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucun cours assigné.
            </p>
          ) : (
            courses.map((c) => {
              const lessonCount = c.lessons?.length ?? 0;
              return (
                <div
                  key={c.id}
                  className="rounded-xl border p-5"
                  style={{
                    background: "#0d150d",
                    borderColor: "#1a2a1a",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="rounded px-2 py-0.5 text-xs"
                        style={{
                          background: "rgba(212, 175, 55, 0.2)",
                          color: "var(--or-brillant)",
                        }}
                      >
                        {c.univers ?? "mixte"}
                      </span>
                      <span className="ml-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {c.level ?? "—"}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-3 font-semibold" style={{ color: "#fff" }}>
                    {c.title}
                  </h2>
                  {c.title_ar && (
                    <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {c.title_ar}
                    </p>
                  )}
                  <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {lessonCount} leçon{lessonCount !== 1 ? "s" : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/espace-membre/cours/${c.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                      style={{
                        background: "rgba(212, 175, 55, 0.2)",
                        color: "var(--or-brillant)",
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Voir les leçons
                    </Link>
                    <Link
                      href={`/professeur/eleves?cours=${c.id}`}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                      style={{
                        background: "rgba(45, 79, 45, 0.5)",
                        color: "var(--andalou-sauge)",
                      }}
                    >
                      <Users className="h-4 w-4" />
                      Voir les élèves
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
