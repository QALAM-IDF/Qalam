import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";

const ReservationSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).max(100).optional(),
    firstName: z.string().min(1).max(50).optional(),
    subject: z.string().max(200).optional(),
    message: z.string().max(2000).optional(),
  })
  .passthrough();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = ReservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Email invalide ou données manquantes" },
        { status: 400 }
      );
    }
    const { subject, name, firstName, email, message, ...rest } = parsed.data;

    const displayName = name ?? firstName ?? "Inconnu";
    const subjectVal = subject ?? "Formulaire de contact";
    const messageVal = message ?? JSON.stringify(rest);
    const sourceVal = subject ?? "contact";

    const supabase = createSupabaseAdmin();
    await supabase.from("messages").insert({
      name: displayName,
      email: email ?? "",
      subject: subjectVal,
      message: messageVal,
      source: sourceVal,
    });

    const contactEmail = process.env.CONTACT_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    if (contactEmail && email) {
      sendEmail({
        to: contactEmail,
        subject: `📩 Nouveau message — ${subjectVal} — Qalam`,
        template: NotificationAdminEmail({
          senderName: displayName,
          senderEmail: email as string,
          subject: subjectVal,
          message: messageVal,
          source: sourceVal,
          receivedAt: new Date().toLocaleString("fr-FR"),
          adminUrl: siteUrl,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
