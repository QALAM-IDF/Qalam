export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses")
      .select("*, lessons(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ courses: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const {
      id,
      title,
      title_ar,
      level,
      forfait,
      univers = "mixte",
      description,
      total_hours = 0,
      published = false,
    } = body;

    if (!id || !title || !level || !forfait) {
      return NextResponse.json(
        { error: "id, title, level, forfait requis" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses")
      .insert({
        id,
        title,
        title_ar: title_ar ?? null,
        level,
        forfait,
        univers,
        description: description ?? null,
        total_hours,
        published,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ course: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur" },
      { status: 403 }
    );
  }
}
