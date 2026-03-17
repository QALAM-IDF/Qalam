export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const supabase = createSupabaseAdmin();
    const { data: sessions } = await supabase
      .from("sessions")
      .select("*")
      .eq("prof_clerk_id", userId)
      .gte("session_date", new Date().toISOString())
      .order("session_date", { ascending: true });

    return NextResponse.json({ sessions: sessions ?? [] });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const {
      title,
      title_ar,
      univers,
      session_date,
      duration_minutes = 90,
      zoom_link,
      notes,
    } = body;

    if (!title || !session_date) {
      return NextResponse.json(
        { error: "title et session_date requis" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("sessions")
      .insert({
        prof_clerk_id: userId,
        title,
        title_ar: title_ar ?? null,
        univers: univers ?? "mixte",
        session_date: new Date(session_date).toISOString(),
        duration_minutes: duration_minutes ?? 90,
        zoom_link: zoom_link ?? null,
        notes: notes ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ session: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur" },
      { status: 403 }
    );
  }
}
