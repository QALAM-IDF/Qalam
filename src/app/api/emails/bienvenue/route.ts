export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emails";
import { BienvenuEmail } from "@/lib/emails/templates/BienvenuEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, firstName, forfait } = body as {
      email?: string;
      firstName?: string;
      forfait?: string;
    };
    if (!email || !forfait) {
      return NextResponse.json(
        { error: "email et forfait requis" },
        { status: 400 }
      );
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
    await sendEmail({
      to: email,
      subject: `👋 Bienvenue dans votre espace Qalam, ${firstName ?? "vous"} !`,
      template: BienvenuEmail({
        firstName: firstName ?? "vous",
        forfait,
        siteUrl,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("bienvenue email error:", e);
    return NextResponse.json(
      { error: "Erreur envoi email" },
      { status: 500 }
    );
  }
}
