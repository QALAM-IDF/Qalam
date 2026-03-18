export const dynamic = "force-dynamic";

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/emails";
import { ConfirmationEmail } from "@/lib/emails/templates/ConfirmationEmail";
import { NotificationAdminEmail } from "@/lib/emails/templates/NotificationAdminEmail";
import { WebhookAlertEmail } from "@/lib/emails/templates/WebhookAlertEmail";
import { logAccess, LOG_ACTIONS } from "@/lib/logging";
import * as Sentry from "@sentry/nextjs";

const forfaitPrix: Record<string, number> = {
  decouverte: 120,
  essentiel: 299,
  intensif: 490,
  "hommes-decouverte": 120,
  "hommes-essentiel": 299,
  "hommes-particulier": 490,
  "femmes-decouverte": 120,
  "femmes-essentiel": 299,
  "femmes-particulier": 490,
  "enfant-5-8": 149,
  "enfant-9-12": 179,
  "enfant-13-15": 219,
};

async function alertAdmin(
  type: string,
  details: Record<string, unknown>
): Promise<void> {
  try {
    Sentry.captureException(new Error(`Stripe webhook: ${type}`), {
      extra: details,
      tags: { webhook_type: type },
      level: "error",
    });

    const adminEmail = process.env.CONTACT_EMAIL;
    if (!adminEmail) return;
    await sendEmail({
      to: adminEmail,
      subject: `⚠️ ALERTE Stripe — ${type} — Qalam`,
      template: WebhookAlertEmail({ type, details }),
    });
  } catch (e) {
    console.error("alertAdmin failed:", e);
  }
}

async function sendEmailsAfterPurchase(
  email: string,
  firstName: string,
  forfait: string,
  type: string,
  _clerkUserId: string
): Promise<void> {
  if (!email) return;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";
  const contactEmail = process.env.CONTACT_EMAIL ?? "contact@qalam.academy";

  const results = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: `✒️ Confirmation — Forfait ${forfait} activé — Qalam`,
      template: ConfirmationEmail({
        firstName: firstName || "Cher élève",
        forfait,
        type,
        price: forfaitPrix[forfait] ?? 0,
        siteUrl,
      }),
    }),
    sendEmail({
      to: contactEmail,
      subject: `💰 Nouveau paiement — ${firstName} — ${forfait}`,
      template: NotificationAdminEmail({
        senderName: firstName,
        senderEmail: email,
        subject: `Paiement ${forfait} (${type})`,
        message: "Nouveau paiement Stripe confirmé.",
        source: "stripe-payment",
        receivedAt: new Date().toLocaleString("fr-FR"),
        adminUrl: siteUrl,
      }),
    }),
  ]);
  results.forEach((r) => r.status === "rejected" && console.error("Email error:", r.reason));
}

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

    const clerk_user_id = session.metadata?.clerk_user_id as string | undefined;
    const forfait = session.metadata?.forfait as string | undefined;
    const type = (session.metadata?.type as string) ?? "unique";
    const family_member_id = (session.metadata?.family_member_id as string) || null;
    const _categorie = session.metadata?.categorie as string | undefined;

    if (!clerk_user_id || !forfait) {
      console.error("Missing metadata:", { clerk_user_id, forfait, type });
      await alertAdmin("metadata_manquante", {
        session_id: session.id,
        clerk_user_id: clerk_user_id ?? null,
        forfait: forfait ?? null,
        type,
      });
      return NextResponse.json(
        { error: "Missing metadata" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        received: true,
        status: "already_processed",
      });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, first_name, last_name")
      .eq("clerk_user_id", clerk_user_id)
      .maybeSingle();

    if (!profile) {
      const details = session.customer_details as { email?: string; name?: string } | null | undefined;
      const customerEmail = details?.email ?? "";
      const name = details?.name ?? "";
      const parts = name.trim().split(/\s+/);
      const first = parts[0] ?? "";
      const last = parts.slice(1).join(" ") ?? "";
      await supabase.from("profiles").insert({
        clerk_user_id,
        email: customerEmail || "",
        first_name: first,
        last_name: last,
      });
    }

    const { error: insertError } = await supabase.from("purchases").insert({
      clerk_user_id,
      forfait,
      type: type ?? "unique",
      family_member_id: family_member_id || null,
      stripe_session_id: session.id,
      stripe_customer_id: (session.customer as string) ?? null,
      stripe_subscription_id: (session.subscription as string) ?? null,
      status: "active",
      expires_at:
        type === "mensuel"
          ? new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString()
          : null,
    });

    if (insertError) {
      console.error("CRITICAL — Insert purchases failed:", insertError);
      await alertAdmin("insert_failed", {
        session_id: session.id,
        clerk_user_id,
        forfait,
        type,
        error: insertError.message,
        amount: session.amount_total ?? null,
        customer_email: (session.customer_details as { email?: string } | null)?.email ?? null,
      });
      return NextResponse.json({
        received: true,
        status: "insert_failed_admin_alerted",
      });
    }

    logAccess(clerk_user_id, LOG_ACTIONS.PURCHASE, `forfait:${forfait}`, req).catch(() => {});

    const { data: profileAfter } = await supabase
      .from("profiles")
      .select("email, first_name, last_name")
      .eq("clerk_user_id", clerk_user_id)
      .maybeSingle();

    const details = session.customer_details as { email?: string; name?: string } | null | undefined;
    const emailTo = profileAfter?.email ?? details?.email ?? "";
    const firstName = profileAfter?.first_name ?? "";

    sendEmailsAfterPurchase(emailTo, firstName, forfait, type, clerk_user_id).catch((e) =>
      console.error("sendEmailsAfterPurchase error:", e)
    );
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
      const { error } = await supabase
        .from("purchases")
        .update({
          status: "active",
          expires_at: new Date(
            Date.now() + 31 * 24 * 60 * 60 * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub);
      if (error) {
        console.error("Renouvellement failed:", error);
        await alertAdmin("renewal_failed", {
          subscription_id: sub,
          error: error.message,
        });
      }
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
