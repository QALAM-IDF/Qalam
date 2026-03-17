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
    const { role, specialites } = body;

    const supabase = createSupabaseAdmin();
    await supabase
      .from("profiles")
      .update({
        role: role ?? "eleve",
        specialites: specialites ?? [],
        updated_at: new Date().toISOString(),
      })
      .eq("clerk_user_id", id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
