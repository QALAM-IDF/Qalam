export const dynamic = "force-dynamic";

import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

const CreateCourseSchema = z.object({
  id: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  title_ar: z.string().max(200).optional(),
  level: z.string().min(1).max(100),
  forfait: z.enum(["decouverte", "essentiel", "intensif"]),
  univers: z.enum(["hommes", "femmes", "enfants", "mixte"]).default("mixte"),
  description: z.string().max(1000).optional(),
  total_hours: z.number().int().min(0).max(100).default(0),
  published: z.boolean().default(false),
});

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
    const body = await req.json().catch(() => null);
    const parsed = CreateCourseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const supabase = createSupabaseAdmin();
    const p = parsed.data;

    const { data, error } = await supabase
      .from("courses")
      .insert({
        id: p.id,
        title: p.title,
        title_ar: p.title_ar ?? null,
        level: p.level,
        forfait: p.forfait,
        univers: p.univers,
        description: p.description ?? null,
        total_hours: p.total_hours,
        published: p.published,
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
