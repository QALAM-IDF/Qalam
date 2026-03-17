import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

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

    const displayName = name ?? firstName ?? "";
    const supabase = createSupabaseAdmin();
    await supabase.from("messages").insert({
      name: displayName,
      email: email ?? "",
      subject: subject ?? "Formulaire de contact",
      message: message ?? JSON.stringify(rest),
      source: subject ?? "contact",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
