export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses")
      .select("*, lessons(*)")
      .eq("id", id)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const supabase = createSupabaseAdmin();

    const {
      title,
      title_ar,
      level,
      forfait,
      univers,
      description,
      total_hours,
      published,
      lessons,
    } = body;

    if (title !== undefined) {
      const { error } = await supabase
        .from("courses")
        .update({
          ...(title != null && { title }),
          ...(title_ar != null && { title_ar }),
          ...(level != null && { level }),
          ...(forfait != null && { forfait }),
          ...(univers != null && { univers }),
          ...(description != null && { description }),
          ...(total_hours != null && { total_hours }),
          ...(published != null && { published }),
        })
        .eq("id", id);
      if (error) throw error;
    }

    if (Array.isArray(lessons)) {
      for (const lesson of lessons) {
        const {
          id: lessonId,
          title: lt,
          title_ar: lta,
          description: ld,
          youtube_id,
          pdf_url,
          duration,
          order_index,
          published: lp,
        } = lesson;
        if (!lessonId) continue;

        const payload = {
          course_id: id,
          ...(lt != null && { title: lt }),
          ...(lta != null && { title_ar: lta }),
          ...(ld != null && { description: ld }),
          ...(youtube_id != null && { youtube_id }),
          ...(pdf_url != null && { pdf_url }),
          ...(duration != null && { duration }),
          ...(order_index != null && { order_index }),
          ...(lp != null && { published: lp }),
        };

        const { error: upsertErr } = await supabase
          .from("lessons")
          .upsert(payload, { onConflict: "id" });
        if (upsertErr) throw upsertErr;
      }
    }

    const { data } = await supabase
      .from("courses")
      .select("*, lessons(*)")
      .eq("id", id)
      .single();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur" },
      { status: 403 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
