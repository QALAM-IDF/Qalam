import { auth, currentUser } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "./supabase/server";

export async function getOrCreateProfile() {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createSupabaseAdmin();

  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  if (existing) return existing;

  const { data: created } = await supabase
    .from("profiles")
    .insert({
      clerk_user_id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      first_name: user.firstName,
      last_name: user.lastName,
    })
    .select()
    .single();

  return created;
}

export async function getUserForfait(clerkUserId: string) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("purchases")
    .select("forfait, type, status, expires_at")
    .eq("clerk_user_id", clerkUserId)
    .eq("status", "active")
    .order("purchased_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data?.type === "mensuel" && data.expires_at) {
    if (new Date(data.expires_at) < new Date()) return null;
  }

  return data?.forfait ?? null;
}

export async function getUserProgression(clerkUserId: string) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("clerk_user_id", clerkUserId);

  return data ?? [];
}
