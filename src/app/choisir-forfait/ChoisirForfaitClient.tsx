"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { forfaits } from "@/data/forfaits";
import { QalamLogo } from "@/components/shared/QalamLogo";
import { Check, Loader2 } from "lucide-react";

export default function ChoisirForfaitClient() {
  const [type, setType] = useState<"unique" | "mensuel">("unique");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleChoisir = async (forfaitId: string) => {
    setLoading(forfaitId);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forfait: forfaitId, type }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Erreur lors de la création du paiement. Réessayez.");
        setLoading(null);
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(null);
    }
  };

  const list = forfaits.filter((f) =>
    type === "unique" ? true : f.id !== "decouverte"
  );

  return (
    <main
      className="min-h-screen grain-overlay"
      style={{ background: "var(--beige-creme)" }}
    >
      <div className="text-center pt-16 pb-8 px-4">
        <QalamLogo height={52} className="mx-auto mb-6" />
        <p
          className="font-arabic text-2xl mb-2"
          style={{ color: "var(--or-luxe)" }}
        >
          اختر باقتك
        </p>
        <h1
          className="font-display text-4xl mb-2"
          style={{ color: "var(--encre-noire)" }}
        >
          Choisissez votre forfait
        </h1>
        <p className="font-body" style={{ color: "var(--encre-douce)" }}>
          Accédez à vos cours dès le paiement validé.
        </p>
      </div>

      <div className="flex justify-center mb-10 px-4">
        <div
          className="flex rounded-full p-1 gap-1"
          style={{ background: "var(--beige-chaud)" }}
        >
          {(["unique", "mensuel"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className="px-6 py-2 rounded-full font-body text-sm transition-all"
              style={{
                background: type === t ? "var(--or-brillant)" : "transparent",
                color:
                  type === t ? "var(--encre-noire)" : "var(--encre-douce)",
                fontWeight: type === t ? 700 : 400,
              }}
            >
              {t === "unique"
                ? "Paiement unique"
                : "Abonnement mensuel"}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p
          className="text-center mb-4 px-4"
          style={{ color: "var(--andalou-bordeaux)" }}
        >
          {error}
        </p>
      )}

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((forfait, i) => (
            <motion.div
              key={forfait.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--blanc-ivoire)",
                border: forfait.highlighted
                  ? "2px solid var(--or-brillant)"
                  : "1px solid var(--beige-profond)",
                borderRadius: "16px",
                padding: "28px",
                position: "relative",
                transform: forfait.highlighted ? "scale(1.03)" : "scale(1)",
              }}
            >
              {forfait.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-body font-bold"
                  style={{
                    background: "var(--or-brillant)",
                    color: "var(--encre-noire)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⭐ Le plus choisi
                </div>
              )}

              <p
                className="font-arabic text-2xl mb-1"
                style={{ color: "var(--or-luxe)" }}
              >
                {forfait.nameAr}
              </p>
              <h2
                className="font-display text-2xl mb-1"
                style={{ color: "var(--encre-noire)" }}
              >
                {forfait.name}
              </h2>
              <p
                className="font-body text-sm italic mb-4"
                style={{ color: "var(--encre-douce)" }}
              >
                {forfait.tagline}
              </p>

              <div className="mb-4">
                <span
                  className="font-display text-5xl"
                  style={{ color: "var(--encre-noire)" }}
                >
                  {type === "mensuel" && forfait.id === "essentiel"
                    ? "49"
                    : type === "mensuel" && forfait.id === "intensif"
                      ? "79"
                      : forfait.price}
                </span>
                <span
                  className="font-body text-xl ml-1"
                  style={{ color: "var(--encre-douce)" }}
                >
                  €{type === "mensuel" ? "/mois" : ""}
                </span>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "var(--encre-douce)" }}
                >
                  {type === "unique"
                    ? forfait.priceLabel ?? "paiement unique"
                    : "Sans engagement"}
                </p>
              </div>

              <ul className="mb-6 space-y-2">
                {forfait.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 font-body text-sm"
                    style={{ color: "var(--encre-douce)" }}
                  >
                    <Check
                      size={14}
                      style={{
                        color: "var(--or-luxe)",
                        marginTop: 3,
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleChoisir(forfait.id)}
                disabled={loading === forfait.id}
                className="w-full py-3 rounded-full font-display text-base transition-all flex items-center justify-center gap-2"
                style={{
                  background: forfait.highlighted
                    ? "var(--or-brillant)"
                    : "var(--encre-noire)",
                  color: forfait.highlighted
                    ? "var(--encre-noire)"
                    : "var(--or-brillant)",
                  opacity: loading === forfait.id ? 0.7 : 1,
                  cursor: loading === forfait.id ? "not-allowed" : "pointer",
                }}
              >
                {loading === forfait.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Redirection...
                  </>
                ) : (
                  "Choisir ce forfait →"
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <p
          className="text-center font-body text-sm mt-8"
          style={{ color: "var(--encre-douce)" }}
        >
          Paiement 100% sécurisé via Stripe. Accès immédiat après confirmation.
        </p>
      </div>
    </main>
  );
}