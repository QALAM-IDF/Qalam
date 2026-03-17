export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";

type Params = { params: Promise<{ eleveId: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const { eleveId } = await params;
    const supabase = createSupabaseAdmin();

    const { data: assignments } = await supabase
      .from("prof_eleves")
      .select("eleve_clerk_id")
      .eq("prof_clerk_id", userId);
    const allowedIds = (assignments ?? []).map((a) => a.eleve_clerk_id);
    const { data: allEleves } = await supabase
      .from("profiles")
      .select("clerk_user_id")
      .eq("role", "eleve");
    const fallbackIds = (allEleves ?? []).map((p) => p.clerk_user_id);
    const canAccess =
      allowedIds.length > 0 ? allowedIds.includes(eleveId) : fallbackIds.includes(eleveId);
    if (!canAccess) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_user_id", eleveId)
      .maybeSingle();
    if (!profile) return NextResponse.json({ error: "Élève introuvable" }, { status: 404 });

    const { data: purchase } = await supabase
      .from("purchases")
      .select("forfait, status, type, purchased_at")
      .eq("clerk_user_id", eleveId)
      .eq("status", "active")
      .order("purchased_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("course_id, lesson_id, completed, quiz_score")
      .eq("clerk_user_id", eleveId);

    const { data: courses } = await supabase
      .from("courses")
      .select("id, title, title_ar")
      .eq("published", true);
    const courseTitles: Record<string, { title: string; title_ar?: string | null }> = {};
    (courses ?? []).forEach((c) => {
      courseTitles[c.id] = { title: c.title, title_ar: c.title_ar };
    });

    const byCourse: Record<
      string,
      { completed: number; total: number; lessons: Array<{ lesson_id: string; completed?: boolean; quiz_score?: number }> }
    > = {};
    (progress ?? []).forEach((p) => {
      if (!byCourse[p.course_id]) {
        byCourse[p.course_id] = { completed: 0, total: 0, lessons: [] };
      }
      byCourse[p.course_id].total++;
      if (p.completed) byCourse[p.course_id].completed++;
      byCourse[p.course_id].lessons.push({
        lesson_id: p.lesson_id,
        completed: p.completed,
        quiz_score: p.quiz_score ?? undefined,
      });
    });

    return NextResponse.json({
      eleve: {
        ...profile,
        forfait: purchase?.forfait ?? null,
        forfait_type: purchase?.type ?? null,
        purchased_at: purchase?.purchased_at ?? null,
      },
      progressByCourse: Object.entries(byCourse).map(([courseId, data]) => ({
        courseId,
        ...courseTitles[courseId],
        ...data,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
