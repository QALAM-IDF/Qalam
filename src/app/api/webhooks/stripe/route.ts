import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

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
        .select("email, first_name")
        .eq("clerk_user_id", clerk_user_id)
        .single();

      if (profile?.email) {
        const resend = getResend();
        if (resend) {
          await resend.emails.send({
          from: `Qalam <${process.env.CONTACT_EMAIL ?? "contact@qalam.academy"}>`,
          to: profile.email,
          subject: "✒️ Votre accès Qalam est activé !",
          html: `
          <p>Bonjour ${profile.first_name ?? ""},</p>
          <p>Votre forfait <strong>${forfait}</strong> est activé.</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy"}/espace-membre">Accéder à mes cours →</a></p>
          <p>À bientôt sur Qalam ✒️</p>
        `,
          });
        }
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
