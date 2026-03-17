export const dynamic = "force-dynamic";

import Link from "next/link";

export default function AbonnementExpirePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--beige-creme)" }}
    >
      <div
        className="max-w-md w-full rounded-2xl border-2 p-8 text-center"
        style={{
          borderColor: "rgba(185, 28, 28, 0.3)",
          background: "rgba(254, 226, 226, 0.4)",
        }}
      >
        <h1
          className="font-display text-2xl md:text-3xl font-semibold mb-4"
          style={{ color: "#991b1b" }}
        >
          Votre abonnement a expiré
        </h1>
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: "var(--encre-douce)" }}
        >
          Renouvelez pour continuer votre apprentissage. Votre progression est
          sauvegardée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/choisir-forfait"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-display font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            Renouveler mon accès →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-display font-medium border-2 transition-colors"
            style={{
              borderColor: "var(--or-luxe)",
              color: "var(--encre-noire)",
            }}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
