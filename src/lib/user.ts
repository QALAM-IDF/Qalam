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

export async function getUserForfait(clerkUserId: string) {
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
      if (new Date(data.expires_at) < new Date()) return null;
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
