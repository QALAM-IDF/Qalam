import { createSupabaseAdmin } from "./supabase/server";
import type { Course, Lesson } from "@/data/mock-courses";

const access: Record<string, string[]> = {
  decouverte: ["decouverte"],
  essentiel: ["decouverte", "essentiel"],
  intensif: ["decouverte", "essentiel", "intensif"],
};

export const forfaitAccess: Record<string, string[]> = access;

type DbLesson = {
  id: string;
  title: string;
  title_ar: string | null;
  description: string | null;
  youtube_id: string | null;
  pdf_url: string | null;
  duration: string | null;
  order_index: number;
  published?: boolean;
};

type DbCourse = {
  id: string;
  title: string;
  title_ar: string | null;
  level: string;
  forfait: string;
  univers: string;
  description: string | null;
  total_hours: number;
  published?: boolean;
  lessons?: DbLesson[];
};

function mapLesson(l: DbLesson): Lesson {
  return {
    id: l.id,
    title: l.title,
    titleAr: l.title_ar ?? "",
    duration: l.duration ?? "",
    youtubeId: l.youtube_id ?? "",
    description: l.description ?? "",
    pdfUrl: l.pdf_url ?? undefined,
  };
}

function mapCourse(c: DbCourse): Course {
  const lessons = (c.lessons ?? [])
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
    .map(mapLesson);
  return {
    id: c.id,
    title: c.title,
    titleAr: c.title_ar ?? "",
    level: c.level as Course["level"],
    forfait: c.forfait as Course["forfait"],
    univers: c.univers as Course["univers"],
    description: c.description ?? "",
    totalHours: c.total_hours ?? 0,
    totalLessons: lessons.length,
    lessons,
  };
}

export async function getCoursesByForfait(forfait: string): Promise<Course[]> {
  const supabase = createSupabaseAdmin();
  const forfaits = access[forfait] ?? [];

  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(*)")
    .in("forfait", forfaits)
    .eq("published", true)
    .order("created_at");

  if (error) return [];
  return (data ?? []).map((c) => mapCourse(c as DbCourse));
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(*)")
    .eq("id", courseId)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapCourse(data as DbCourse);
}
