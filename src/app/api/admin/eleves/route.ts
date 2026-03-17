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
      .select("*")
      .order("created_at", { ascending: false });

    if (!profiles) return NextResponse.json({ eleves: [] });

    const elevesWithForfait = await Promise.all(
      profiles.map(async (profile) => {
        const { data: purchase } = await supabase
          .from("purchases")
          .select("forfait, type, status, purchased_at, expires_at")
          .eq("clerk_user_id", profile.clerk_user_id)
          .eq("status", "active")
          .order("purchased_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        return {
          ...profile,
          forfait: purchase?.forfait ?? null,
          forfait_type: purchase?.type ?? null,
          forfait_status: purchase?.status ?? null,
          purchased_at: purchase?.purchased_at ?? null,
          expires_at: purchase?.expires_at ?? null,
        };
      })
    );

    return NextResponse.json({ eleves: elevesWithForfait });
  } catch (error) {
    console.error("GET eleves error:", error);
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
