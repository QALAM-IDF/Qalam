export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { mockCourses, forfaitAccess } from "@/data/mock-courses";
import { getUserForfait, getUserProgression } from "@/lib/user";
import LessonList from "@/components/membre/LessonList";
import ProgressBar from "@/components/membre/ProgressBar";

type Props = { params: Promise<{ courseId: string }> };

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/connexion");

  const [forfait, progression] = await Promise.all([
    getUserForfait(userId),
    getUserProgression(userId),
  ]);

  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) notFound();

  const accessibleIds = forfait ? (forfaitAccess[forfait] ?? []) : [];
  const accessible = accessibleIds.includes(courseId);
  if (!accessible) notFound();

  const completedCount = progression.filter(
    (p) => p.course_id === courseId && p.completed
  ).length;
  const prog = { completed: completedCount, total: course.totalLessons };

  const completedSet = new Set(
    progression
      .filter((p) => p.course_id === courseId && p.completed)
      .map((p) => p.lesson_id)
  );
  const lessonsWithProgress = course.lessons.map((l) => ({
    ...l,
    completed: completedSet.has(l.id),
  }));

  const firstLesson = course.lessons[0];

  return (
    <div className="section-shell py-12 md:py-16">
      <header className="mb-8">
        <p className="font-arabic text-2xl" style={{ color: "var(--or-luxe)" }}>
          {course.titleAr}
        </p>
        <h1
          className="font-display text-3xl md:text-4xl"
          style={{ color: "var(--encre-noire)" }}
        >
          {course.title}
        </h1>
        <p className="mt-2" style={{ color: "var(--encre-douce)" }}>
          {course.description}
        </p>
        <div className="mt-4">
          <ProgressBar
            completed={prog.completed}
            total={prog.total}
            showCount
            animate
          />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2
            className="mb-4 font-display text-xl"
            style={{ color: "var(--encre-noire)" }}
          >
            Leçons
          </h2>
          {firstLesson && (
            <Link
              href={`/espace-membre/cours/${courseId}/${firstLesson.id}`}
              className="block rounded-xl border p-6 transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: "var(--blanc-ivoire)",
                borderColor: "var(--or-brillant)",
              }}
            >
              <p
                className="font-arabic text-lg"
                style={{ color: "var(--or-luxe)" }}
              >
                {firstLesson.titleAr}
              </p>
              <h3
                className="font-display text-xl"
                style={{ color: "var(--encre-noire)" }}
              >
                {firstLesson.title}
              </h3>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--encre-douce)" }}
              >
                {firstLesson.duration}
              </p>
            </Link>
          )}
        </div>
        <div>
          <LessonList
            lessons={lessonsWithProgress}
            courseId={courseId}
            currentLessonId={firstLesson?.id ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
