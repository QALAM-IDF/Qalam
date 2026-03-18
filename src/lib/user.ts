import { auth, currentUser } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "./supabase/server";

export async function getOrCreateProfile() {
  try {
    const user = await currentUser();
    if (!user) return null;

    const supabase = createSupabaseAdmin();

    const { data: existing } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_user_id", user.id)
      .maybeSingle();

    if (existing) return existing;

    const { data: created, error: createError } = await supabase
      .from("profiles")
      .insert({
        clerk_user_id: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        first_name: user.firstName ?? "",
        last_name: user.lastName ?? "",
      })
      .select()
      .single();

    if (createError) {
      console.error("Profile creation error:", createError);
      return null;
    }

    return created;
  } catch (error) {
    console.error("getOrCreateProfile error:", error);
    return null;
  }
}

export async function getUserRole(clerkUserId: string): Promise<string> {
  try {
    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("clerk_user_id", clerkUserId)
      .maybeSingle();
    return (data?.role as string) ?? "eleve";
  } catch {
    return "eleve";
  }
}

export type MemberWithForfait = {
  id: string | null;
  label: string;
  forfait: string | null;
};

export async function getMembersWithForfait(clerkUserId: string): Promise<MemberWithForfait[]> {
  try {
    const supabase = createSupabaseAdmin();
    const { data: purchases } = await supabase
      .from("purchases")
      .select("forfait, type, status, expires_at, family_member_id")
      .eq("clerk_user_id", clerkUserId)
      .eq("status", "active")
      .order("purchased_at", { ascending: false });

    if (!purchases?.length) return [];

    const valid: { forfait: string; family_member_id: string | null }[] = [];
    for (const p of purchases) {
      if (p.type === "mensuel" && p.expires_at && new Date(p.expires_at) < new Date()) continue;
      valid.push({ forfait: p.forfait ?? "", family_member_id: p.family_member_id ?? null });
    }

    const members: MemberWithForfait[] = [];
    const seen = new Set<string | null>();
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("clerk_user_id", clerkUserId)
      .maybeSingle();

    for (const v of valid) {
      if (seen.has(v.family_member_id)) continue;
      seen.add(v.family_member_id);
      if (v.family_member_id === null) {
        const label = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() || "Moi-même";
        members.push({ id: null, label, forfait: v.forfait });
      } else {
        const { data: fm } = await supabase
          .from("family_members")
          .select("prenom, nom")
          .eq("id", v.family_member_id)
          .eq("clerk_user_id", clerkUserId)
          .maybeSingle();
        const label = fm ? [fm.prenom, fm.nom].filter(Boolean).join(" ").trim() : "Membre";
        members.push({ id: v.family_member_id, label, forfait: v.forfait });
      }
    }
    return members;
  } catch (error) {
    console.error("getMembersWithForfait error:", error);
    return [];
  }
}

export async function getUserForfait(clerkUserId: string): Promise<string | null> {
  try {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("purchases")
      .select("forfait, type, status, expires_at")
      .eq("clerk_user_id", clerkUserId)
      .eq("status", "active")
      .order("purchased_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;

    if (data.type === "mensuel" && data.expires_at) {
      const expired = new Date(data.expires_at) < new Date();
      if (expired) {
        await supabase
          .from("purchases")
          .update({ status: "expired", updated_at: new Date().toISOString() })
          .eq("clerk_user_id", clerkUserId)
          .eq("status", "active");
        return null;
      }
    }

    return data.forfait ?? null;
  } catch (error) {
    console.error("getUserForfait error:", error);
    return null;
  }
}

export async function getUserProgression(clerkUserId: string) {
  try {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("clerk_user_id", clerkUserId);

    if (error) return [];
    return data ?? [];
  } catch (error) {
    console.error("getUserProgression error:", error);
    return [];
  }
}
