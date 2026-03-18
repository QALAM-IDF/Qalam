import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { logAccess, LOG_ACTIONS } from "@/lib/logging";

export const dynamic = "force-dynamic";

const ProgressionSchema = z.object({
  courseId: z.string().min(1).max(100),
  lessonId: z.string().min(1).max(100),
  quizScore: z.number().int().min(0).max(100).optional(),
  watchTimeSeconds: z.number().int().min(0).optional(),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = ProgressionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { courseId, lessonId, quizScore } = parsed.data;

  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      clerk_user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
      quiz_score: quizScore ?? null,
    },
    { onConflict: "clerk_user_id,course_id,lesson_id" }
  );

  if (error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  logAccess(userId, LOG_ACTIONS.COMPLETE_LESSON, `lesson:${lessonId}`, req).catch(() => {});
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const supabase = createSupabaseAdmin();
  let query = supabase
    .from("lesson_progress")
    .select("*")
    .eq("clerk_user_id", userId);
  if (courseId) query = query.eq("course_id", courseId);
  const { data } = await query;

  return NextResponse.json(data ?? []);
}
