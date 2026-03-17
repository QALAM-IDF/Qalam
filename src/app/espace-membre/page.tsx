"use client";

import Link from "next/link";
import { mockCourses, forfaitAccess } from "@/data/mock-courses";
import { useMember } from "@/context/MemberContext";
import MemberCourseCard from "@/components/membre/MemberCourseCard";
import ProgressBar from "@/components/membre/ProgressBar";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const forfaitLabels: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

function useProgressionByCourse(progression: { course_id: string; lesson_id: string; completed: boolean }[]) {
  const byCourse: Record<string, { completed: number; lessonIds: Set<string> }> = {};
  for (const p of progression) {
    if (!byCourse[p.course_id]) {
      byCourse[p.course_id] = { completed: 0, lessonIds: new Set() };
    }
    if (p.completed) {
      byCourse[p.course_id].completed += 1;
      byCourse[p.course_id].lessonIds.add(p.lesson_id);
    }
  }
  return byCourse;
}

export default function EspaceMembrePage() {
  const { profile, forfait, progression: rawProgression } = useMember();
  const progression = rawProgression ?? [];
  const byCourse = useProgressionByCourse(progression);
  const accessibleIds = forfait ? (forfaitAccess[forfait] ?? []) : [];

  const lastIncomplete = (() => {
    for (const courseId of accessibleIds) {
      const course = mockCourses.find((c) => c.id === courseId);
      if (!course) continue;
      const set = byCourse[courseId]?.lessonIds;
      const firstIncomplete = course.lessons.find(
        (l) => !set?.has(l.id)
      );
      if (firstIncomplete) {
        return { course, lesson: firstIncomplete };
      }
    }
    return null;
  })();

  const totalCompleted = Object.values(byCourse).reduce((s, p) => s + p.completed, 0);
  const hoursWatched = Math.round(
    (progression ?? []).reduce((s, p) => s + (p.watch_time_seconds ?? 0), 0) / 3600
  );
  const joinedAt = profile?.created_at ? new Date(profile.created_at) : new Date();
  const daysSinceJoin = Math.max(
    0,
    Math.floor((Date.now() - joinedAt.getTime()) / (24 * 60 * 60 * 1000))
  );

  return (
    <div className="section-shell py-12 md:py-16">
      <header className="mb-12 text-center md:text-left">
        <p
          className="font-arabic text-3xl md:text-4xl"
          style={{ color: "var(--or-luxe)" }}
        >
          مرحبا يا {profile?.first_name ?? ""}
        </p>
        <h1
          className="font-display text-4xl md:text-5xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Bienvenue dans votre espace Qalam
        </h1>
        <span
          className="mt-2 inline-block rounded-full px-4 py-1 text-sm font-medium"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.2)",
            color: "var(--or-brillant)",
          }}
        >
          {forfait ? forfaitLabels[forfait] : ""}
        </span>
        <div className="mt-4">
          <CalligraphyDivider className="mx-auto md:mx-0 w-32" />
        </div>
      </header>

      {lastIncomplete && (
        <section className="mb-12">
          <h2
            className="font-display text-2xl"
            style={{ color: "var(--encre-noire)" }}
          >
            Continuer là où vous en êtes
          </h2>
          <Link
            href={`/espace-membre/cours/${lastIncomplete.course.id}/${lastIncomplete.lesson.id}`}
            className="mt-4 block overflow-hidden rounded-2xl border-2 transition-shadow hover:shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--beige-chaud) 0%, var(--blanc-ivoire) 100%)",
              borderColor: "var(--or-brillant)",
            }}
          >
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
              <div
                className="h-24 w-full shrink-0 rounded-xl md:w-48"
                style={{ backgroundColor: "var(--or-luxe)" }}
              />
              <div className="flex-1">
                <p className="text-sm" style={{ color: "var(--or-luxe)" }}>
                  {lastIncomplete.course.title}
                </p>
                <h3
                  className="font-display text-xl"
                  style={{ color: "var(--encre-noire)" }}
                >
                  {lastIncomplete.lesson.title}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--encre-douce)" }}
                >
                  {lastIncomplete.lesson.duration} restantes
                </p>
              </div>
              <span
                className="inline-flex w-fit rounded-full px-5 py-2 font-medium"
                style={{
                  backgroundColor: "var(--or-brillant)",
                  color: "var(--encre-noire)",
                }}
              >
                Reprendre
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="mb-12">
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Mes cours
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCourses.map((course) => {
            const accessible = accessibleIds.includes(course.id);
            const prog = byCourse[course.id] ?? {
              completed: 0,
              total: course.totalLessons,
              lessonIds: new Set<string>(),
            };
            const total = course.totalLessons;
            const courseWithProgress = {
              ...course,
              lessons: course.lessons.map((l) => ({
                ...l,
                completed: prog.lessonIds?.has(l.id) ?? false,
              })),
            };
            return (
              <MemberCourseCard
                key={course.id}
                course={courseWithProgress}
                progression={{
                  completed: prog.completed,
                  total,
                }}
                locked={!accessible}
              />
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Ma progression globale
        </h2>
        <div className="mt-6 space-y-4">
          {accessibleIds.map((id) => {
            const course = mockCourses.find((c) => c.id === id);
            if (!course) return null;
            const prog = byCourse[id] ?? { completed: 0, lessonIds: new Set<string>() };
            const total = course.totalLessons;
            return (
              <div
                key={id}
                className="rounded-xl border p-4"
                style={{
                  borderColor: "var(--or-brillant)",
                  backgroundColor: "var(--blanc-ivoire)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-display"
                    style={{ color: "var(--encre-noire)" }}
                  >
                    {course.title}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--encre-douce)" }}
                  >
                    {prog.completed} / {total} leçons
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    completed={prog.completed}
                    total={total}
                    showCount={false}
                    animate
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2
          className="font-display text-2xl"
          style={{ color: "var(--encre-noire)" }}
        >
          Statistiques
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "var(--or-brillant)",
              backgroundColor: "var(--blanc-ivoire)",
            }}
          >
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--or-brillant)" }}
            >
              {totalCompleted}
            </p>
            <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
              Leçons complétées
            </p>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "var(--or-brillant)",
              backgroundColor: "var(--blanc-ivoire)",
            }}
          >
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--or-brillant)" }}
            >
              {hoursWatched}h
            </p>
            <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
              Heures regardées
            </p>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "var(--or-brillant)",
              backgroundColor: "var(--blanc-ivoire)",
            }}
          >
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--or-brillant)" }}
            >
              {daysSinceJoin}
            </p>
            <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
              Jours depuis l&apos;inscription
            </p>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "var(--or-brillant)",
              backgroundColor: "var(--blanc-ivoire)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--or-luxe)" }}
            >
              Prochain objectif
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--encre-douce)" }}>
              {lastIncomplete
                ? `Finir "${lastIncomplete.lesson.title}"`
                : "Continuer vos cours"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
