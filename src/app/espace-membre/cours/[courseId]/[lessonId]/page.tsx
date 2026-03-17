"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import Link from "next/link";
import { mockCourses, forfaitAccess } from "@/data/mock-courses";
import type { Lesson } from "@/data/mock-courses";
import { useMember } from "@/context/MemberContext";
import VideoPlayer from "@/components/membre/VideoPlayer";
import LessonList from "@/components/membre/LessonList";
import QuizBlock from "@/components/membre/QuizBlock";

export default function LessonPage() {
  const params = useParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const { courseId, lessonId } = params;
  const { forfait, progression } = useMember();

  const { course, lesson, nextLesson, lessonIndex, lessonsWithProgress } =
    useMemo(() => {
      const c = mockCourses.find((x) => x.id === courseId);
      if (!c)
        return {
          course: null,
          lesson: null,
          nextLesson: null,
          lessonIndex: 0,
          lessonsWithProgress: [],
        };
      const completedSet = new Set(
        progression
          .filter((p) => p.course_id === courseId && p.completed)
          .map((p) => p.lesson_id)
      );
      const lessonsWithProgress: (Lesson & { completed?: boolean })[] =
        c.lessons.map((l) => ({ ...l, completed: completedSet.has(l.id) }));
      const idx = c.lessons.findIndex((l) => l.id === lessonId);
      if (idx < 0)
        return {
          course: c,
          lesson: null,
          nextLesson: null,
          lessonIndex: 0,
          lessonsWithProgress,
        };
      const l = c.lessons[idx]!;
      const next = c.lessons[idx + 1] ?? null;
      return {
        course: c,
        lesson: l,
        nextLesson: next,
        lessonIndex: idx + 1,
        lessonsWithProgress,
      };
    }, [courseId, lessonId, progression]);

  const saveProgress = useCallback(
    async (quizScore?: number) => {
      await fetch("/api/progression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          lessonId,
          ...(quizScore != null && { quizScore }),
        }),
      });
    },
    [courseId, lessonId]
  );

  if (!course || !lesson) {
    return (
      <div className="section-shell py-12">
        <p style={{ color: "var(--encre-douce)" }}>Leçon introuvable.</p>
        <Link href="/espace-membre" className="mt-4 inline-block underline">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  const accessibleIds = forfait ? (forfaitAccess[forfait] ?? []) : [];
  if (!accessibleIds.includes(courseId)) {
    router.replace("/espace-membre");
    return null;
  }

  const nextHref = nextLesson
    ? `/espace-membre/cours/${courseId}/${nextLesson.id}`
    : `/espace-membre/cours/${courseId}`;

  return (
    <div className="section-shell py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <VideoPlayer
            youtubeId={lesson.youtubeId}
            title={lesson.title}
            titleAr={lesson.titleAr}
            duration={lesson.duration}
            description={lesson.description}
            lessonNumber={lessonIndex}
            totalLessons={course.totalLessons}
            pdfUrl={lesson.pdfUrl}
            onComplete={() => saveProgress()}
          />
          {lesson.quiz && lesson.quiz.length > 0 && (
            <QuizBlock
              questions={lesson.quiz}
              nextLessonHref={nextHref}
              onComplete={(score) => {
                const total = lesson.quiz!.length;
                const percent = total > 0 ? Math.round((score / total) * 100) : 0;
                saveProgress(percent);
              }}
            />
          )}
        </div>
        <div className="order-first lg:order-last">
          <LessonList
            lessons={lessonsWithProgress}
            courseId={courseId}
            currentLessonId={lessonId}
          />
        </div>
      </div>
    </div>
  );
}
