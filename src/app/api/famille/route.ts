export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

const MemberSchema = z.object({
  prenom: z.string().min(1).max(50),
  nom: z.string().max(50).optional(),
  age: z.number().int().min(1).max(100).optional(),
  categorie: z.enum(["homme", "femme", "enfant-5-8", "enfant-9-12", "enfant-13-15"]),
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("family_members")
      .select(
        `
        *,
        purchases (forfait, status, type, expires_at)
      `
      )
      .eq("clerk_user_id", userId)
      .order("created_at", { ascending: true });

    return NextResponse.json({ members: data ?? [] });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: "/api/famille", method: "GET" }, tags: { area: "famille" } });
    console.error("GET famille error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = MemberSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const initiales = `${parsed.data.prenom[0]}${parsed.data.nom?.[0] ?? ""}`.toUpperCase();

    const { data, error } = await supabase
      .from("family_members")
      .insert({
        clerk_user_id: userId,
        prenom: parsed.data.prenom,
        nom: parsed.data.nom ?? null,
        age: parsed.data.age ?? null,
        categorie: parsed.data.categorie,
        avatar_initiales: initiales,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ member: data });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: "/api/famille", method: "POST" }, tags: { area: "famille" } });
    console.error("POST famille error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const id = body?.id;
    if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("family_members")
      .delete()
      .eq("id", id)
      .eq("clerk_user_id", userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: "/api/famille", method: "DELETE" }, tags: { area: "famille" } });
    console.error("DELETE famille error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
