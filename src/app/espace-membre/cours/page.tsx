"use client";

import { mockCourses, forfaitAccess } from "@/data/mock-courses";
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
  const byCourse = useProgressionByCourse(progression);
  const accessibleIds = forfait ? (forfaitAccess[forfait] ?? []) : [];

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => {
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
    </div>
  );
}
