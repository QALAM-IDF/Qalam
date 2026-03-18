"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Course, ForfaitId } from "@/types";
import { forfaitAccess } from "@/lib/courses";
import { useMember } from "@/context/MemberContext";
import ProgressBar from "@/components/membre/ProgressBar";

function useProgressionByCourse(progression: { course_id: string; completed: boolean }[]) {
  const byCourse: Record<string, number> = {};
  for (const p of progression) {
    if (p.completed) byCourse[p.course_id] = (byCourse[p.course_id] ?? 0) + 1;
  }
  return byCourse;
}

const activities = [
  { type: "lesson", text: "Leçon complétée", ago: "récemment", icon: "✅" },
  { type: "quiz", text: "Quiz réussi", ago: "récemment", icon: "📝" },
  { type: "course", text: "Cours commencé", ago: "récemment", icon: "🎯" },
];

export default function ProgressionPage() {
  const { forfait, progression } = useMember();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const byCourse = useProgressionByCourse(progression);
  const accessibleIds = forfait ? (forfaitAccess[forfait as ForfaitId] ?? []) : [];

  useEffect(() => {
    if (!forfait) {
      queueMicrotask(() => {
        setCourses([]);
        setLoading(false);
      });
      return;
    }
    queueMicrotask(() => setLoading(true));
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data?.courses) ? data.courses : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [forfait]);

  const totalCompleted = Object.values(byCourse).reduce((s, n) => s + n, 0);
  const totalLessons = courses
    .filter((c) => c.forfait && accessibleIds.includes(c.forfait))
    .reduce((sum, c) => sum + (c.totalLessons ?? c.lessons.length), 0);
  const percent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="section-shell py-12 md:py-16">
      <header className="mb-12">
        <p className="font-arabic text-3xl" style={{ color: "var(--or-luxe)" }}>
          مسيرتي
        </p>
        <h1
          className="font-display text-4xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Ma progression
        </h1>
      </header>

      <section className="mb-12">
        <div
          className="rounded-2xl border-2 p-8"
          style={{
            backgroundColor: "var(--blanc-ivoire)",
            borderColor: "var(--or-brillant)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
            Progression globale
          </p>
          <p
            className="mt-1 font-display text-4xl font-bold"
            style={{ color: "var(--or-brillant)" }}
          >
            {percent}%
          </p>
          <div className="mt-4">
            <ProgressBar
              completed={totalCompleted}
              total={totalLessons}
              showCount
              animate
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Par cours
        </h2>
        <div className="mt-6 space-y-6">
          {loading ? (
            <p style={{ color: "var(--encre-douce)" }}>Chargement…</p>
          ) : (
            courses
              .filter((c) => c.forfait && accessibleIds.includes(c.forfait))
              .map((course) => {
                const completed = byCourse[course.id] ?? 0;
                const total = course.totalLessons ?? course.lessons.length;
                return (
              <div
                key={course.id}
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: "var(--blanc-ivoire)",
                  borderColor: "var(--or-brillant)",
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p
                      className="font-arabic text-xl"
                      style={{ color: "var(--or-luxe)" }}
                    >
                      {course.titleAr}
                    </p>
                    <h3
                      className="font-display text-xl"
                      style={{ color: "var(--encre-noire)" }}
                    >
                      {course.title}
                    </h3>
                  </div>
                  <Link
                    href={`/espace-membre/cours/${course.id}`}
                    className="inline-flex rounded-full px-4 py-2 text-sm font-medium"
                    style={{
                      backgroundColor: "var(--or-brillant)",
                      color: "var(--encre-noire)",
                    }}
                  >
                    Accéder au cours
                  </Link>
                </div>
                <div className="mt-4">
                  <ProgressBar
                    completed={completed}
                    total={total}
                    showCount
                    animate
                  />
                </div>
              </div>
            );
              })
            )}
        </div>
      </section>

      <section className="mb-12">
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Activités récentes
        </h2>
        <div className="mt-6 space-y-4">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blanc-ivoire)",
                borderColor: "var(--beige-profond)",
              }}
            >
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <p style={{ color: "var(--encre-noire)" }}>{a.text}</p>
                <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
                  {a.ago}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Prochaines étapes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/espace-membre"
            className="block rounded-xl border p-4 transition-shadow hover:shadow-lg"
            style={{
              backgroundColor: "var(--blanc-ivoire)",
              borderColor: "var(--or-brillant)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--or-luxe)" }}
            >
              Tableau de bord
            </p>
            <p className="mt-1" style={{ color: "var(--encre-noire)" }}>
              Continuer mes cours
            </p>
          </Link>
          <Link
            href="/espace-membre/cours"
            className="block rounded-xl border p-4 transition-shadow hover:shadow-lg"
            style={{
              backgroundColor: "var(--blanc-ivoire)",
              borderColor: "var(--or-brillant)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--or-luxe)" }}
            >
              Mes cours
            </p>
            <p className="mt-1" style={{ color: "var(--encre-noire)" }}>
              Voir tous les cours
            </p>
          </Link>
          <Link
            href="/choisir-forfait"
            className="block rounded-xl border p-4 transition-shadow hover:shadow-lg"
            style={{
              backgroundColor: "var(--blanc-ivoire)",
              borderColor: "var(--or-brillant)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--or-luxe)" }}
            >
              Mettre à niveau
            </p>
            <p className="mt-1" style={{ color: "var(--encre-noire)" }}>
              Accéder au Tajwid (forfait Intensif)
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
