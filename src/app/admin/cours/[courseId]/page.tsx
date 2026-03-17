"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { CourseForm } from "@/components/admin/CourseForm";
import { LessonForm, type LessonFormData } from "@/components/admin/LessonForm";

type CourseLesson = {
  id: string;
  title: string;
  title_ar: string | null;
  description: string | null;
  youtube_id: string | null;
  pdf_url: string | null;
  duration: string | null;
  order_index: number;
  published: boolean;
};

type Course = {
  id: string;
  title: string;
  title_ar: string | null;
  level: string;
  forfait: string;
  univers: string;
  description: string | null;
  total_hours: number;
  published: boolean;
  lessons?: CourseLesson[];
};

const defaultCourse = {
  title: "",
  title_ar: "",
  level: "decouverte",
  forfait: "decouverte",
  univers: "mixte",
  description: "",
  total_hours: 0,
  published: false,
};

function toLessonFormData(l: CourseLesson): LessonFormData {
  return {
    id: l.id,
    title: l.title,
    title_ar: l.title_ar ?? "",
    description: l.description ?? "",
    youtube_id: l.youtube_id ?? "",
    pdf_url: l.pdf_url ?? "",
    duration: l.duration ?? "",
    order_index: l.order_index ?? 0,
    published: l.published ?? false,
  };
}

export default function AdminCoursEditPage() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const courseId = params.courseId;
  const [course, setCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState(defaultCourse);
  const [lessons, setLessons] = useState<LessonFormData[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    fetch(`/api/admin/courses/${courseId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.id) {
          setCourse(data);
          setCourseForm({
            title: data.title ?? "",
            title_ar: data.title_ar ?? "",
            level: data.level ?? "decouverte",
            forfait: data.forfait ?? "decouverte",
            univers: data.univers ?? "mixte",
            description: data.description ?? "",
            total_hours: data.total_hours ?? 0,
            published: data.published ?? false,
          });
          setLessons(
            (data.lessons ?? []).sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index).map(toLessonFormData)
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...courseForm,
          lessons: lessons.map((l, i) => ({ ...l, order_index: i })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        setLessons(
          (data.lessons ?? [])
            .sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
            .map(toLessonFormData)
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const addLesson = () => {
    const id = `lesson-${Date.now()}`;
    setLessons((prev) => [
      ...prev,
      {
        id,
        title: "",
        title_ar: "",
        description: "",
        youtube_id: "",
        pdf_url: "",
        duration: "",
        order_index: lessons.length,
        published: false,
      },
    ]);
  };

  const removeLesson = (index: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return <p style={{ color: "#888" }}>Chargement…</p>;
  }
  if (!course) {
    return (
      <div>
        <p style={{ color: "#888" }}>Cours introuvable.</p>
        <Link href="/admin/cours" className="mt-4 inline-block text-[var(--or-brillant)]">
          ← Retour aux cours
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/cours"
        className="mb-6 inline-flex items-center gap-2 text-sm"
        style={{ color: "var(--or-brillant)" }}
      >
        <ArrowLeft size={16} />
        Retour aux cours
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
          Éditer : {course.title}
        </h1>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
          style={{
            background: "var(--or-brillant)",
            color: "#0f0f0f",
          }}
        >
          <Save size={16} />
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      <div className="space-y-8">
        <CourseForm data={courseForm} onChange={setCourseForm} />

        <div>
          <h2 className="font-display text-xl font-semibold" style={{ color: "#fff" }}>
            Leçons
          </h2>
          <div className="mt-4 space-y-4">
            {lessons.map((lesson, index) => (
              <LessonForm
                key={lesson.id}
                lesson={lesson}
                onChange={(next) => {
                  setLessons((prev) => prev.map((l, i) => (i === index ? next : l)));
                }}
                onRemove={() => removeLesson(index)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addLesson}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm"
            style={{ borderColor: "var(--or-brillant)", color: "var(--or-brillant)" }}
          >
            <Plus size={18} />
            Ajouter une leçon
          </button>
        </div>
      </div>
    </div>
  );
}
