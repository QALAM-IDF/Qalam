export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();

    const { data: profiles } = await supabase
      .from("profiles")
      .select("clerk_user_id, email, first_name, last_name, created_at");

    const { data: purchases } = await supabase
      .from("purchases")
      .select("clerk_user_id, forfait, status, purchased_at, type")
      .eq("status", "active")
      .order("purchased_at", { ascending: false });

    const byUser = new Map<string, { forfait: string; status: string; purchased_at: string; type: string }>();
    for (const p of purchases ?? []) {
      if (!byUser.has(p.clerk_user_id)) {
        byUser.set(p.clerk_user_id, {
          forfait: p.forfait,
          status: p.status,
          purchased_at: p.purchased_at,
          type: p.type,
        });
      }
    }

    const eleves = (profiles ?? []).map((pr) => ({
      clerk_user_id: pr.clerk_user_id,
      email: pr.email,
      first_name: pr.first_name ?? "",
      last_name: pr.last_name ?? "",
      forfait: byUser.get(pr.clerk_user_id)?.forfait ?? null,
      status: byUser.get(pr.clerk_user_id)?.status ?? null,
      purchased_at: byUser.get(pr.clerk_user_id)?.purchased_at ?? null,
      type: byUser.get(pr.clerk_user_id)?.type ?? null,
      created_at: pr.created_at,
    }));

    return NextResponse.json(eleves);
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
