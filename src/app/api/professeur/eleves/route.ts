export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const supabase = createSupabaseAdmin();

    const { data: profProfile } = await supabase
      .from("profiles")
      .select("specialites")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    const specialites = (profProfile?.specialites as string[] | null) ?? [];
    if (specialites.length === 0) {
      return NextResponse.json({ eleves: [] });
    }

    const { data: assignments } = await supabase
      .from("prof_eleves")
      .select("eleve_clerk_id")
      .eq("prof_clerk_id", userId);

    let eleveIds: string[] = [];
    if (assignments && assignments.length > 0) {
      eleveIds = assignments.map((a) => a.eleve_clerk_id);
    } else {
      const { data: allEleves } = await supabase
        .from("profiles")
        .select("clerk_user_id")
        .eq("role", "eleve");
      eleveIds = (allEleves ?? []).map((p) => p.clerk_user_id);
    }

    if (eleveIds.length === 0) {
      return NextResponse.json({ eleves: [] });
    }

    const elevesWithProgress: unknown[] = [];
    for (const eid of eleveIds) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", eid)
        .maybeSingle();
      if (!profile) continue;
      const profileUnivers = (profile as { univers?: string }).univers;
      if (profileUnivers && !specialites.includes(profileUnivers)) continue;

      const { data: purchases } = await supabase
        .from("purchases")
        .select("forfait, status, type, purchased_at, family_member_id")
        .eq("clerk_user_id", eid)
        .eq("status", "active")
        .order("purchased_at", { ascending: false });

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id, completed, quiz_score")
        .eq("clerk_user_id", eid);

      const profileName = [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim() || profile.email || "—";
      const slots: { family_member_id: string | null; forfait: string; status: string; type: string; purchased_at: string | null }[] = [];
      for (const p of purchases ?? []) {
        slots.push({
          family_member_id: p.family_member_id ?? null,
          forfait: p.forfait ?? "",
          status: p.status ?? "active",
          type: p.type ?? "unique",
          purchased_at: p.purchased_at ?? null,
        });
      }
      if (slots.length === 0) {
        elevesWithProgress.push({
          ...profile,
          forfait: null,
          forfait_status: null,
          forfait_type: null,
          purchased_at: null,
          lesson_progress: progress ?? [],
          family_member_id: null,
          display_name: profileName,
        });
        continue;
      }
      const { data: familyMembers } = await supabase
        .from("family_members")
        .select("id, prenom, nom, categorie")
        .eq("clerk_user_id", eid);

      for (const slot of slots) {
        const displayName =
          slot.family_member_id === null
            ? profileName
            : (familyMembers ?? []).find((fm) => fm.id === slot.family_member_id)
              ? `${(familyMembers ?? []).find((fm) => fm.id === slot.family_member_id)!.prenom} ${((familyMembers ?? []).find((fm) => fm.id === slot.family_member_id)!.nom ?? "").trim()}`.trim()
              : "Membre";
        const categorie = slot.family_member_id !== null
          ? (familyMembers ?? []).find((fm) => fm.id === slot.family_member_id)?.categorie ?? null
          : null;
        elevesWithProgress.push({
          ...profile,
          forfait: slot.forfait,
          forfait_status: slot.status,
          forfait_type: slot.type,
          purchased_at: slot.purchased_at,
          lesson_progress: progress ?? [],
          family_member_id: slot.family_member_id,
          display_name: displayName,
          membre_categorie: categorie,
        });
      }
    }

    return NextResponse.json({ eleves: elevesWithProgress });
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }
}
