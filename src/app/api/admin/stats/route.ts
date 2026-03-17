export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();

    const [
      { count: totalEleves },
      { count: totalActifs },
      { data: purchases },
      { count: totalMessages },
      { count: totalCours },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase
        .from("purchases")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("purchases")
        .select("forfait, type")
        .eq("status", "active"),
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
      supabase
        .from("courses")
        .select("*", { count: "exact", head: true })
        .eq("published", true),
    ]);

    const prix: Record<string, number> = {
      decouverte: 120,
      essentiel: 299,
      intensif: 490,
    };
    const revenus = (purchases ?? []).reduce((acc, p) => {
      if (p.type === "unique")
        return acc + (prix[p.forfait as keyof typeof prix] ?? 0);
      if (p.forfait === "essentiel") return acc + 49;
      if (p.forfait === "intensif") return acc + 79;
      return acc;
    }, 0);

    return NextResponse.json({
      totalEleves: totalEleves ?? 0,
      totalActifs: totalActifs ?? 0,
      revenus,
      messagesNonLus: totalMessages ?? 0,
      totalCours: totalCours ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
