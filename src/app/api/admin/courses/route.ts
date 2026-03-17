export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();
    const { data: courses, error } = await supabase
      .from("courses")
      .select(`
        id, title, title_ar, level, forfait, univers,
        description, total_hours, published, created_at,
        lessons (id, title, order_index, published)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ courses: [] });
    }
    return NextResponse.json({ courses: courses ?? [] });
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json().catch(() => ({}));
    if (!body?.id || !body?.title || !body?.level || !body?.forfait) {
      return NextResponse.json(
        { error: "id, title, level, forfait requis" },
        { status: 400 }
      );
    }
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("courses")
      .insert({
        id: body.id,
        title: body.title,
        title_ar: body.title_ar ?? null,
        level: body.level,
        forfait: body.forfait,
        univers: body.univers ?? "mixte",
        description: body.description ?? null,
        total_hours: body.total_hours ?? 0,
        published: body.published ?? false,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ course: data });
  } catch (error) {
    console.error("POST courses error:", error);
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
