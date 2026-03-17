export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ProfMessageEmail } from "@/lib/emails/templates/ProfMessageEmail";

export async function POST(req: NextRequest) {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const { to, subject, message, eleveNom } = body as {
      to?: string;
      subject?: string;
      message?: string;
      eleveNom?: string;
    };

    if (!to || !message) {
      return NextResponse.json(
        { error: "to et message requis" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { data: prof } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    const profNom = [prof?.first_name, prof?.last_name].filter(Boolean).join(" ") || "Votre professeur";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";

    await sendEmail({
      to,
      subject: `[Qalam] ${subject ?? "Message de votre professeur"}`,
      template: ProfMessageEmail({
        eleveNom: eleveNom ?? "élève",
        profNom,
        message,
        siteUrl,
      }),
    });

    await supabase.from("messages").insert({
      name: profNom,
      email: to,
      subject: subject ?? "Message professeur",
      message,
      source: "professeur",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("prof message error:", e);
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }
}
