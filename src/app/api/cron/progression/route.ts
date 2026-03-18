export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ProgressionEmail } from "@/lib/emails/templates/ProgressionEmail";
import { getCoursesByForfait } from "@/lib/courses";

function checkCronSecret(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  const param = req.nextUrl.searchParams.get("secret");
  return param === secret;
}

export async function GET(req: NextRequest) {
  if (!checkCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createSupabaseAdmin();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";

  const { data: purchases } = await supabase
    .from("purchases")
    .select("clerk_user_id, forfait")
    .eq("status", "active");

  if (!purchases?.length) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  for (const p of purchases) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, first_name")
      .eq("clerk_user_id", p.clerk_user_id)
      .maybeSingle();
    if (!profile?.email) continue;

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("course_id, lesson_id, completed")
      .eq("clerk_user_id", p.clerk_user_id);

    const completed = (progress ?? []).filter((r) => r.completed).length;
    const courses = await getCoursesByForfait(p.forfait ?? "decouverte");
    const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);
    const percentComplete = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

    const byCourse: Record<string, { completed: number; total: number }> = {};
    for (const c of courses) {
      const lessonIds = new Set(c.lessons.map((l) => l.id));
      const completedInCourse = (progress ?? []).filter(
        (r) => r.course_id === c.id && r.completed
      ).length;
      byCourse[c.id] = { completed: completedInCourse, total: lessonIds.size };
    }
    const coursesInProgress = courses
      .filter((c) => (byCourse[c.id]?.completed ?? 0) < (byCourse[c.id]?.total ?? 1))
      .map((c) => ({
        title: c.title,
        progress: (byCourse[c.id]?.total ?? 0) > 0
          ? Math.round(((byCourse[c.id]?.completed ?? 0) / (byCourse[c.id]?.total ?? 1)) * 100)
          : 0,
      }));

    let nextLesson: { title: string; courseTitle: string } | undefined;
    for (const c of courses) {
      const completedSet = new Set(
        (progress ?? [])
          .filter((r) => r.course_id === c.id && r.completed)
          .map((r) => r.lesson_id)
      );
      const firstIncomplete = c.lessons.find((l) => !completedSet.has(l.id));
      if (firstIncomplete) {
        nextLesson = { title: firstIncomplete.title, courseTitle: c.title };
        break;
      }
    }

    const result = await sendEmail({
      to: profile.email,
      subject: "📊 Votre progression cette semaine — Qalam",
      template: ProgressionEmail({
        firstName: profile.first_name ?? "vous",
        lessonsCompleted: completed,
        totalLessons,
        percentComplete,
        coursesInProgress,
        nextLesson,
        siteUrl,
      }),
    });
    if (result.success) sent++;
  }

  return NextResponse.json({ sent });
}
