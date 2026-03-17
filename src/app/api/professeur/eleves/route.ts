export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const supabase = createSupabaseAdmin();

    const { data: profProfile } = await supabase
      .from("profiles")
      .select("specialites")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    const specialites = (profProfile?.specialites as string[] | null) ?? [];

    const { data: assignments } = await supabase
      .from("prof_eleves")
      .select("eleve_clerk_id")
      .eq("prof_clerk_id", userId);

    let eleveIds: string[] = [];
    if (assignments && assignments.length > 0) {
      eleveIds = assignments.map((a) => a.eleve_clerk_id);
    } else {
      const { data: allEleves } = await supabase
        .from("profiles")
        .select("clerk_user_id")
        .eq("role", "eleve");
      eleveIds = (allEleves ?? []).map((p) => p.clerk_user_id);
    }

    if (eleveIds.length === 0) {
      return NextResponse.json({ eleves: [] });
    }

    const elevesWithProgress: unknown[] = [];
    for (const eid of eleveIds) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", eid)
        .maybeSingle();
      if (!profile) continue;

      const { data: purchase } = await supabase
        .from("purchases")
        .select("forfait, status, type, purchased_at")
        .eq("clerk_user_id", eid)
        .eq("status", "active")
        .order("purchased_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id, completed, quiz_score")
        .eq("clerk_user_id", eid);

      elevesWithProgress.push({
        ...profile,
        forfait: purchase?.forfait ?? null,
        forfait_status: purchase?.status ?? null,
        forfait_type: purchase?.type ?? null,
        purchased_at: purchase?.purchased_at ?? null,
        lesson_progress: progress ?? [],
      });
    }

    return NextResponse.json({ eleves: elevesWithProgress });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
