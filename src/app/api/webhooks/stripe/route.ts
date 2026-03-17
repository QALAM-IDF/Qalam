import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ConfirmationEmail } from "@/lib/emails/templates/ConfirmationEmail";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

const forfaitPrix: Record<string, number> = {
  decouverte: 120,
  essentiel: 299,
  intensif: 490,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig)
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerk_user_id = session.metadata?.clerk_user_id;
    const forfait = session.metadata?.forfait;
    const type = session.metadata?.type;

    if (clerk_user_id && forfait && type) {
      await supabase.from("purchases").insert({
        clerk_user_id,
        forfait,
        type,
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : null,
        stripe_subscription_id:
          typeof session.subscription === "string"
            ? session.subscription
            : null,
        status: "active",
        expires_at:
          type === "mensuel"
            ? new Date(
                Date.now() + 31 * 24 * 60 * 60 * 1000
              ).toISOString()
            : null,
      });

      const { data: profile } = await supabase
        .from("profiles")
        .select("email, first_name, last_name")
        .eq("clerk_user_id", clerk_user_id)
        .single();

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
      const contactEmail = process.env.CONTACT_EMAIL ?? "contact@qalam.academy";

      if (profile?.email) {
        await sendEmail({
          to: profile.email,
          subject: `✒️ Confirmation — Forfait ${forfait} activé — Qalam`,
          template: ConfirmationEmail({
            firstName: profile.first_name ?? "Cher élève",
            forfait,
            type,
            price: forfaitPrix[forfait] ?? 0,
            siteUrl,
          }),
        });
      }

      if (profile && contactEmail) {
        await sendEmail({
          to: contactEmail,
          subject: `💰 Nouveau paiement — ${profile.first_name ?? ""} — ${forfait}`,
          template: NotificationAdminEmail({
            senderName: [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Élève",
            senderEmail: profile.email,
            subject: `Paiement ${forfait} (${type})`,
            message: "Nouveau paiement confirmé par Stripe.",
            source: "stripe-payment",
            receivedAt: new Date().toLocaleString("fr-FR"),
            adminUrl: siteUrl,
          }),
        });
      }
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
    const sub = invoice.subscription;
    if (sub) {
      const subId = typeof sub === "string" ? sub : (sub as { id?: string })?.id;
      if (subId) {
        await supabase
          .from("purchases")
          .update({
            status: "active",
            expires_at: new Date(
              Date.now() + 31 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subId);
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from("purchases")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", sub.id);
  }

  return NextResponse.json({ received: true });
}
