export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("read", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
