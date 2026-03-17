import { currentUser } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "./supabase/server";

export async function isProf(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;
    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("clerk_user_id", user.id)
      .maybeSingle();
    return data?.role === "professeur";
  } catch {
    return false;
  }
}

export async function getProfProfile() {
  try {
    const user = await currentUser();
    if (!user) return null;
    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("profiles")
      .select("*, specialites")
      .eq("clerk_user_id", user.id)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function requireProf() {
  const prof = await isProf();
  if (!prof) throw new Error("Accès non autorisé");
}
