export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { role, specialites, is_admin } = body;

    const supabase = createSupabaseAdmin();
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (role !== undefined) update.role = role;
    if (specialites !== undefined) update.specialites = specialites;
    if (is_admin !== undefined) {
      update.is_admin = Boolean(is_admin);
      update.role = is_admin ? "admin" : "eleve";
    }

    await supabase.from("profiles").update(update).eq("clerk_user_id", id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
