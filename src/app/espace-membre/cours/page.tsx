"use client";

import { useEffect, useState } from "react";
import { forfaitAccess } from "@/lib/courses";
import type { Course } from "@/data/mock-courses";
import { useMember } from "@/context/MemberContext";
import MemberCourseCard from "@/components/membre/MemberCourseCard";

function useProgressionByCourse(progression: { course_id: string; completed: boolean }[]) {
  const byCourse: Record<string, number> = {};
  for (const p of progression) {
    if (p.completed) byCourse[p.course_id] = (byCourse[p.course_id] ?? 0) + 1;
  }
  return byCourse;
}

export default function CoursPage() {
  const { forfait, progression } = useMember();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const byCourse = useProgressionByCourse(progression);
  const accessibleIds = forfait ? (forfaitAccess[forfait] ?? []) : [];

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

  return (
    <div className="section-shell py-12 md:py-16">
      <header className="mb-12">
        <p className="font-arabic text-3xl" style={{ color: "var(--or-luxe)" }}>
          دوراتي
        </p>
        <h1 className="font-display text-4xl" style={{ color: "var(--encre-noire)" }}>
          Mes cours
        </h1>
      </header>
      {loading ? (
        <p style={{ color: "var(--encre-douce)" }}>Chargement des cours…</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const accessible = accessibleIds.includes(course.id);
            const completed = byCourse[course.id] ?? 0;
            return (
              <MemberCourseCard
                key={course.id}
                course={course}
                progression={{ completed, total: course.totalLessons }}
                locked={!accessible}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
