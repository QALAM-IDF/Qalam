export const dynamic = "force-dynamic";

import type { ReactElement } from "react";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emails";
import { ConfirmationEmail } from "@/lib/emails/templates/ConfirmationEmail";
import { BienvenuEmail } from "@/lib/emails/templates/BienvenuEmail";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";

/** Route de test des emails — UNIQUEMENT en développement */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Désactivé en production" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "confirmation";
  const to =
    searchParams.get("to") ?? process.env.CONTACT_EMAIL ?? "contact@qalam.academy";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const templates: Record<string, { subject: string; template: ReactElement }> = {
    confirmation: {
      subject: "✒️ TEST — Confirmation Qalam",
      template: ConfirmationEmail({
        firstName: "Test",
        forfait: "essentiel",
        type: "unique",
        price: 299,
        siteUrl,
      }),
    },
    bienvenu: {
      subject: "👋 TEST — Bienvenue Qalam",
      template: BienvenuEmail({
        firstName: "Test",
        forfait: "essentiel",
        siteUrl,
      }),
    },
    admin: {
      subject: "📩 TEST — Notification admin Qalam",
      template: NotificationAdminEmail({
        senderName: "Test User",
        senderEmail: "test@example.com",
        subject: "Test message",
        message: "Ceci est un message de test.",
        source: "test",
        receivedAt: new Date().toLocaleString("fr-FR"),
        adminUrl: siteUrl,
      }),
    },
  };

  const config = templates[type];
  if (!config) {
    return NextResponse.json(
      {
        error: "Type inconnu",
        available: Object.keys(templates),
      },
      { status: 400 }
    );
  }

  const result = await sendEmail({
    to,
    subject: config.subject,
    template: config.template,
  });
  return NextResponse.json({ result, to, type });
}
