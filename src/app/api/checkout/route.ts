export const dynamic = "force-dynamic";

import Stripe from "stripe";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

const CheckoutSchema = z.object({
  forfait: z.string().min(1),
  type: z.enum(["unique", "mensuel"]),
  family_member_id: z.string().uuid().optional(),
  categorie: z
    .enum([
      "hommes",
      "femmes",
      "enfant-5-8",
      "enfant-9-12",
      "enfant-13-15",
      "particulier",
    ])
    .optional(),
});

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

function getPriceId(forfaitId: string, type: "unique" | "mensuel"): string | null {
  const env = process.env;
  const map: Record<string, { unique?: string; mensuel?: string }> = {
    decouverte: { unique: env.STRIPE_PRICE_DECOUVERTE_UNIQUE },
    essentiel: { unique: env.STRIPE_PRICE_ESSENTIEL_UNIQUE, mensuel: env.STRIPE_PRICE_ESSENTIEL_MENSUEL },
    intensif: { unique: env.STRIPE_PRICE_INTENSIF_UNIQUE, mensuel: env.STRIPE_PRICE_INTENSIF_MENSUEL },
    "hommes-decouverte": { unique: env.STRIPE_PRICE_HOMMES_DECOUVERTE },
    "hommes-essentiel": { unique: env.STRIPE_PRICE_HOMMES_ESSENTIEL_UNIQUE, mensuel: env.STRIPE_PRICE_HOMMES_ESSENTIEL_MENSUEL },
    "hommes-particulier": { unique: env.STRIPE_PRICE_HOMMES_PARTICULIER },
    "femmes-decouverte": { unique: env.STRIPE_PRICE_FEMMES_DECOUVERTE },
    "femmes-essentiel": { unique: env.STRIPE_PRICE_FEMMES_ESSENTIEL_UNIQUE, mensuel: env.STRIPE_PRICE_FEMMES_ESSENTIEL_MENSUEL },
    "femmes-particulier": { unique: env.STRIPE_PRICE_FEMMES_PARTICULIER },
    "enfant-5-8": { unique: env.STRIPE_PRICE_ENFANT_5_8 },
    "enfant-9-12": { unique: env.STRIPE_PRICE_ENFANT_9_12 },
    "enfant-13-15": { unique: env.STRIPE_PRICE_ENFANT_13_15 },
  };
  const entry = map[forfaitId];
  if (!entry) return null;
  const priceId = type === "mensuel" ? entry.mensuel ?? entry.unique : entry.unique;
  return priceId ?? null;
}

export async function POST(req: NextRequest) {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
    if (!userId)
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const parsed = CheckoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { forfait, type, family_member_id, categorie } = parsed.data;
    const priceId = getPriceId(forfait, type);
    if (!priceId)
      return NextResponse.json({ error: "Forfait invalide" }, { status: 400 });

    const isSubscription = type === "mensuel";

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      currency: "eur",
      locale: "fr",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/paiement-succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/choisir-forfait`,
      metadata: {
        clerk_user_id: userId,
        forfait,
        type,
        family_member_id: family_member_id ?? "",
        categorie: categorie ?? "",
      },
    };
    const session = await getStripe().checkout.sessions.create(params);

    if (!session.url)
      return NextResponse.json(
        { error: "Session URL manquante" },
        { status: 500 }
      );
    return NextResponse.json({ url: session.url });
  } catch (error) {
    Sentry.captureException(error, {
      extra: { route: "/api/checkout", userId },
      tags: { area: "payment" },
    });
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
