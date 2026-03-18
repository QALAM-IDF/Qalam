export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { RelanceEmail } from "@/lib/emails/templates/RelanceEmail";

function checkCronSecret(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  const param = req.nextUrl.searchParams.get("secret");
  return param === secret;
}

export async function GET(req: NextRequest) {
  if (!checkCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createSupabaseAdmin();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, clerk_user_id, forfait, expires_at")
    .eq("type", "mensuel")
    .eq("status", "expired")
    .not("expires_at", "is", null);

  if (!purchases?.length) {
    return NextResponse.json({ sent: 0 });
  }

  const expiredRecently = purchases.filter((p) => {
    const exp = p.expires_at ? new Date(p.expires_at) : null;
    return exp && exp < now && exp > sevenDaysAgo;
  });

  let sent = 0;
  for (const p of expiredRecently) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, first_name")
      .eq("clerk_user_id", p.clerk_user_id)
      .maybeSingle();
    if (!profile?.email) continue;

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("completed")
      .eq("clerk_user_id", p.clerk_user_id);
    const completed = (progress ?? []).filter((r) => r.completed).length;
    const progressionSummary =
      completed === 0
        ? "aucune leçon"
        : completed === 1
          ? "1 leçon complétée"
          : `${completed} leçons complétées`;

    const result = await sendEmail({
      to: profile.email,
      subject: "🔄 Votre accès Qalam a expiré — Renouvelez pour continuer",
      template: RelanceEmail({
        firstName: profile.first_name ?? "vous",
        forfait: p.forfait ?? "essentiel",
        expiredAt: p.expires_at ? new Date(p.expires_at).toLocaleDateString("fr-FR") : "",
        progressionSummary,
        siteUrl,
      }),
    });
    if (result.success) sent++;
  }

  return NextResponse.json({ sent });
}
