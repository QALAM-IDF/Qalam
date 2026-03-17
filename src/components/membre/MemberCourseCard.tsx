"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Course } from "@/data/mock-courses";
import ProgressBar from "./ProgressBar";
import UnlockBanner from "./UnlockBanner";

type MemberCourseCardProps = {
  course: Course;
  progression: { completed: number; total: number };
  locked?: boolean;
};

const levelGradients: Record<string, string> = {
  decouverte:
    "linear-gradient(135deg, var(--beige-creme) 0%, var(--beige-chaud) 100%)",
  "essentiel-debutant":
    "linear-gradient(135deg, var(--encre-noire) 0%, #3d2b1f 100%)",
  "essentiel-intermediaire":
    "linear-gradient(135deg, var(--encre-noire) 0%, #3d2b1f 100%)",
  "essentiel-avance":
    "linear-gradient(135deg, var(--encre-noire) 0%, #3d2b1f 100%)",
  intensif:
    "linear-gradient(135deg, var(--magie-indigo) 0%, var(--magie-marine) 100%)",
  coranique:
    "linear-gradient(135deg, var(--magie-indigo) 0%, var(--magie-marine) 100%)",
};

const forfaitLabels: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

export default function MemberCourseCard({
  course,
  progression,
  locked = false,
}: MemberCourseCardProps) {
  const gradient =
    levelGradients[course.level] ?? levelGradients.decouverte;
  const firstIncomplete = course.lessons.find((l) => !l.completed);
  const nextLessonId = firstIncomplete?.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={!locked ? { y: -4 } : undefined}
      className="group relative overflow-hidden rounded-2xl border-2 border-[var(--or-brillant)]/30 transition-shadow hover:shadow-lg"
      style={{
        background: gradient,
        boxShadow: locked
          ? undefined
          : "0 4px 20px -8px rgba(184, 134, 11, 0.3)",
      }}
    >
      {locked && (
        <UnlockBanner forfaitRequired={forfaitLabels[course.forfait]} />
      )}
      <Link
        href={locked ? "#" : `/espace-membre/cours/${course.id}${nextLessonId ? `/${nextLessonId}` : ""}`}
        className={`block p-5 ${locked ? "pointer-events-none" : ""}`}
      >
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p
              className="font-arabic text-xl"
              style={{ color: "var(--beige-creme)" }}
            >
              {course.titleAr}
            </p>
            <span
              className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs opacity-90"
              style={{ color: "var(--or-brillant)" }}
            >
              {forfaitLabels[course.forfait]}
            </span>
          </div>
        </div>
        <h3
          className="font-display text-xl"
          style={{ color: "var(--beige-creme)" }}
        >
          {course.title}
        </h3>
        <p
          className="mt-2 line-clamp-2 text-sm opacity-90"
          style={{ color: "var(--beige-creme)" }}
        >
          {course.description}
        </p>
        <div className="mt-4">
          <ProgressBar
            completed={progression.completed}
            total={progression.total}
            showCount
            theme={
              course.level.includes("coranique") || course.level === "intensif"
                ? "enfants"
                : "default"
            }
          />
        </div>
        <p
          className="mt-2 text-xs"
          style={{ color: "var(--beige-creme)" }}
        >
          {course.totalHours}h · {course.totalLessons} leçons
        </p>
        <span
          className="mt-4 inline-block rounded-full px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: "var(--or-brillant)",
            color: "var(--encre-noire)",
          }}
        >
          {progression.completed > 0 ? "Continuer" : "Commencer"}
        </span>
      </Link>
    </motion.article>
  );
}
