import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      subject,
      name,
      firstName,
      email,
      message,
      ...rest
    } = body as {
      subject?: string;
      name?: string;
      firstName?: string;
      email?: string;
      message?: string;
      [key: string]: unknown;
    };

    const displayName = (name ?? firstName ?? "Inconnu") as string;
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
