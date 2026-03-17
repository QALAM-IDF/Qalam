import { Resend } from "resend";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export type SendEmailOptions = {
  to: string;
  subject: string;
  template: ReactElement;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  template,
  replyTo,
}: SendEmailOptions) {
  try {
    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY not set, email not sent");
      return { success: false as const, error: new Error("No API key") };
    }
    const html = await render(template);
    const from = `Qalam <${process.env.CONTACT_EMAIL ?? "contact@qalam.academy"}>`;
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo: replyTo ?? process.env.CONTACT_EMAIL ?? "contact@qalam.academy",
    });
    if (error) {
      console.error("Resend error:", error);
      return { success: false as const, error };
    }
    return { success: true as const, data };
  } catch (error) {
    console.error("sendEmail error:", error);
    return { success: false as const, error };
  }
}
