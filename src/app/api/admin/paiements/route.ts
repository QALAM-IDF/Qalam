export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

const prix: Record<string, Record<string, number>> = {
  decouverte: { unique: 120 },
  essentiel: { unique: 299, mensuel: 49 },
  intensif: { unique: 490, mensuel: 79 },
};

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createSupabaseAdmin();

    const { data: purchases } = await supabase
      .from("purchases")
      .select("*")
      .order("purchased_at", { ascending: false });

    const { data: profiles } = await supabase
      .from("profiles")
      .select("clerk_user_id, email");
    const emailByClerk = new Map(
      (profiles ?? []).map((p) => [p.clerk_user_id, p.email])
    );

    const withAmount = (purchases ?? []).map((p) => {
      const amount =
        p.type === "mensuel"
          ? prix[p.forfait]?.mensuel ?? 0
          : prix[p.forfait]?.unique ?? 0;
      return {
        ...p,
        amount,
        email: emailByClerk.get(p.clerk_user_id) ?? "",
      };
    });

    return NextResponse.json(withAmount);
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
