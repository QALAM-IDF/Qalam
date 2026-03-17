export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emails";
import { RappelCoursEmail } from "@/lib/emails/templates/RappelCoursEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      email,
      firstName,
      coursTitle,
      coursTitleAr,
      sessionDate,
      zoomLink,
    } = body as {
      email?: string;
      firstName?: string;
      coursTitle?: string;
      coursTitleAr?: string;
      sessionDate?: string;
      zoomLink?: string;
    };
    if (!email || !coursTitle || !sessionDate) {
      return NextResponse.json(
        { error: "email, coursTitle et sessionDate requis" },
        { status: 400 }
      );
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
    await sendEmail({
      to: email,
      subject: "⏰ Rappel — Votre cours commence demain — Qalam",
      template: RappelCoursEmail({
        firstName: firstName ?? "vous",
        coursTitle,
        coursTitleAr: coursTitleAr ?? "",
        sessionDate,
        zoomLink,
        siteUrl,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("rappel email error:", e);
    return NextResponse.json(
      { error: "Erreur envoi email" },
      { status: 500 }
    );
  }
}
