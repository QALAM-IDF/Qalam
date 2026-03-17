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
    if (specialites.length === 0) {
      return NextResponse.json({ courses: [] });
    }

    const { data: courses } = await supabase
      .from("courses")
      .select("*, lessons(id, title, title_ar, order_index)")
      .eq("published", true)
      .in("univers", [...specialites, "mixte"])
      .order("created_at", { ascending: false });

    return NextResponse.json({ courses: courses ?? [] });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
