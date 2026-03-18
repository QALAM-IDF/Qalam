export const dynamic = "force-dynamic";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { requireProf } from "@/lib/prof";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ProfMessageEmail } from "@/lib/emails/templates/ProfMessageEmail";

const MessageSchema = z.object({
  to: z.string().email("Email invalide"),
  eleveNom: z.string().min(1).max(100).optional(),
  subject: z.string().min(1).max(200).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    await requireProf();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

    const body = await req.json().catch(() => null);
    const parsed = MessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { to, eleveNom, subject, message } = parsed.data;
    const subjectVal = subject ?? "Message de votre professeur";
    const eleveNomVal = eleveNom ?? "élève";

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
      subject: `[Qalam] ${subjectVal}`,
      template: ProfMessageEmail({
        eleveNom: eleveNomVal,
        profNom,
        message,
        siteUrl,
      }),
    });

    await supabase.from("messages").insert({
      name: profNom,
      email: to,
      subject: subjectVal,
      message,
      source: "professeur",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("prof message error:", e);
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }
}
