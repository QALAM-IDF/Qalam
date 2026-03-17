import { currentUser } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "./supabase/server";

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("clerk_user_id", user.id)
      .maybeSingle();

    if (data?.is_admin === true) return true;

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      return user.emailAddresses.some(
        (e) => e.emailAddress === adminEmail
      );
    }

    return false;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error("Accès non autorisé — Admin requis");
  }
}

export async function promoteToAdmin(clerkUserId: string): Promise<void> {
  const supabase = createSupabaseAdmin();
  await supabase
    .from("profiles")
    .update({ is_admin: true, role: "admin", updated_at: new Date().toISOString() })
    .eq("clerk_user_id", clerkUserId);
}

export async function revokeAdmin(clerkUserId: string): Promise<void> {
  const supabase = createSupabaseAdmin();
  await supabase
    .from("profiles")
    .update({ is_admin: false, role: "eleve", updated_at: new Date().toISOString() })
    .eq("clerk_user_id", clerkUserId);
}
