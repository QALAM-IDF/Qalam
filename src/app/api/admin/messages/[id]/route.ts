export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { read } = body;

    const supabase = createSupabaseAdmin();
    const updates: { read?: boolean } = {};
    if (typeof read === "boolean") updates.read = read;

    const { error } = await supabase
      .from("messages")
      .update(updates)
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
