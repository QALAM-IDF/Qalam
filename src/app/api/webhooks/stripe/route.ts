export const dynamic = "force-dynamic";

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ConfirmationEmail } from "@/lib/emails/templates/ConfirmationEmail";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";

const forfaitPrix: Record<string, number> = {
  decouverte: 120,
  essentiel: 299,
  intensif: 490,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Checkout session completed:", session.id);
    console.log("Metadata:", session.metadata);

    const clerk_user_id = session.metadata?.clerk_user_id;
    const forfait = session.metadata?.forfait;
    const type = session.metadata?.type ?? "unique";

    if (!clerk_user_id || !forfait) {
      console.error("Missing metadata:", { clerk_user_id, forfait, type });
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("purchases").insert({
      clerk_user_id,
      forfait,
      type: type ?? "unique",
      stripe_session_id: session.id,
      stripe_customer_id:
        (session.customer as string) ?? null,
      stripe_subscription_id:
        (session.subscription as string) ?? null,
      status: "active",
      expires_at:
        type === "mensuel"
          ? new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString()
          : null,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
    } else {
      console.log("Purchase inserted successfully");

      const { data: profile } = await supabase
        .from("profiles")
        .select("email, first_name, last_name")
        .eq("clerk_user_id", clerk_user_id)
        .single();

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
      const contactEmail = process.env.CONTACT_EMAIL ?? "contact@qalam.academy";

      if (profile?.email) {
        sendEmail({
          to: profile.email,
          subject: `✒️ Confirmation — Forfait ${forfait} activé — Qalam`,
          template: ConfirmationEmail({
            firstName: profile.first_name ?? "Cher élève",
            forfait,
            type,
            price: forfaitPrix[forfait] ?? 0,
            siteUrl,
          }),
        }).catch(() => {});
      }

      if (profile && contactEmail) {
        sendEmail({
          to: contactEmail,
          subject: `💰 Nouveau paiement — ${profile.first_name ?? ""} — ${forfait}`,
          template: NotificationAdminEmail({
            senderName:
              [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
              "Élève",
            senderEmail: profile.email,
            subject: `Paiement ${forfait} (${type})`,
            message: "Nouveau paiement confirmé par Stripe.",
            source: "stripe-payment",
            receivedAt: new Date().toLocaleString("fr-FR"),
            adminUrl: siteUrl,
          }),
        }).catch(() => {});
      }
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice & {
      subscription?: string | { id?: string };
    };
    const sub =
      typeof invoice.subscription === "string"
        ? invoice.subscription
        : (invoice.subscription as { id?: string } | undefined)?.id;
    if (sub) {
      await supabase
        .from("purchases")
        .update({
          status: "active",
          expires_at: new Date(
            Date.now() + 31 * 24 * 60 * 60 * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from("purchases")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_subscription_id", sub.id);
  }

  return NextResponse.json({ received: true });
}
