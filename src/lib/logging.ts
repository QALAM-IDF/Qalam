import { createSupabaseAdmin } from "./supabase/server";
import type { NextRequest } from "next/server";

export async function logAccess(
  clerkUserId: string | null,
  action: string,
  resource?: string,
  req?: NextRequest,
  metadata?: Record<string, unknown>
) {
  try {
    const supabase = createSupabaseAdmin();
    let email: string | null = null;
    let role: string | null = null;
    if (clerkUserId) {
      const { data } = await supabase
        .from("profiles")
        .select("email, role")
        .eq("clerk_user_id", clerkUserId)
        .maybeSingle();
      email = data?.email ?? null;
      role = data?.role ?? null;
    }
    await supabase.from("access_logs").insert({
      clerk_user_id: clerkUserId,
      email,
      role,
      action,
      resource: resource ?? null,
      metadata: metadata ?? {},
      ip_address:
        req?.headers.get("x-forwarded-for") ??
        req?.headers.get("x-real-ip") ??
        null,
    });
  } catch (error) {
    console.error("logAccess error:", error);
  }
}

export const LOG_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  VIEW_COURSE: "view_course",
  VIEW_LESSON: "view_lesson",
  COMPLETE_LESSON: "complete_lesson",
  QUIZ_ATTEMPT: "quiz_attempt",
  ACCESS_DENIED: "access_denied",
  PURCHASE: "purchase",
  SUBSCRIPTION_EXPIRED: "subscription_expired",
  ADMIN_ACTION: "admin_action",
  PROF_ACTION: "prof_action",
} as const;
