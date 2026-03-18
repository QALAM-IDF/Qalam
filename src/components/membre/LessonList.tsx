"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Circle } from "lucide-react";
import type { Lesson } from "@/types";

type LessonListProps = {
  lessons: Lesson[];
  courseId: string;
  currentLessonId: string;
};

export default function LessonList({
  lessons,
  courseId,
  currentLessonId,
}: LessonListProps) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentLessonId]);

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        backgroundColor: "var(--blanc-ivoire)",
        borderColor: "var(--or-brillant)",
      }}
    >
      <p
        className="mb-2 font-display text-sm font-medium"
        style={{ color: "var(--or-luxe)" }}
      >
        {lessons.filter((l) => l.completed).length} / {lessons.length} leçons
      </p>
      <div className="max-h-[400px] space-y-1 overflow-y-auto">
        {lessons.map((lesson, idx) => {
          const isActive = lesson.id === currentLessonId;
          const isCompleted = lesson.completed;
          return (
            <Link
              key={lesson.id}
              ref={isActive ? activeRef : undefined}
              href={`/espace-membre/cours/${courseId}/${lesson.id}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive ? "border-l-4" : ""
              }`}
              style={{
                backgroundColor: isActive
                  ? "rgba(212, 175, 55, 0.15)"
                  : isCompleted
                    ? "rgba(34, 197, 94, 0.1)"
                    : "transparent",
                borderLeftColor: isActive ? "var(--or-brillant)" : "transparent",
              }}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 shrink-0 text-green-600" />
              ) : (
                <Circle className="h-4 w-4 shrink-0" style={{ color: "var(--encre-douce)" }} />
              )}
              <span className="text-xs" style={{ color: "var(--or-luxe)" }}>
                {idx + 1}
              </span>
              <span
                className="truncate text-sm"
                style={{
                  color: isActive ? "var(--encre-noire)" : "var(--encre-douce)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {lesson.title}
              </span>
              <span className="ml-auto text-xs opacity-70">{lesson.duration}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
