export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();
    const action = req.nextUrl.searchParams.get("action");

    let query = supabase
      .from("access_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (action && action !== "tous") {
      query = query.eq("action", action);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ logs: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
