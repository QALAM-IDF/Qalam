import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

const PRICE_MAP: Record<string, Record<string, string>> = {
  decouverte: { unique: process.env.STRIPE_PRICE_DECOUVERTE_UNIQUE! },
  essentiel: {
    unique: process.env.STRIPE_PRICE_ESSENTIEL_UNIQUE!,
    mensuel: process.env.STRIPE_PRICE_ESSENTIEL_MENSUEL!,
  },
  intensif: {
    unique: process.env.STRIPE_PRICE_INTENSIF_UNIQUE!,
    mensuel: process.env.STRIPE_PRICE_INTENSIF_MENSUEL!,
  },
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const { forfait, type } = body as { forfait?: string; type?: string };
  const priceId = forfait && type ? PRICE_MAP[forfait]?.[type] : undefined;
  if (!priceId || !forfait || !type)
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
    metadata: { clerk_user_id: userId, forfait, type },
  };
  const session = await getStripe().checkout.sessions.create(params);

  if (!session.url)
    return NextResponse.json(
      { error: "Session URL manquante" },
      { status: 500 }
    );
  return NextResponse.json({ url: session.url });
}
