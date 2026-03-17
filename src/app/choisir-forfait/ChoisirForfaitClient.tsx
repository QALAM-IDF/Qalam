"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const FORFAITS_UNIQUE: { id: string; name: string; nameAr: string; price: number; priceLabel: string }[] = [
  { id: "decouverte", name: "Découverte", nameAr: "الاكتشاف", price: 120, priceLabel: "paiement unique" },
  { id: "essentiel", name: "Essentiel", nameAr: "الأساسي", price: 299, priceLabel: "paiement unique" },
  { id: "intensif", name: "Intensif", nameAr: "المكثف", price: 490, priceLabel: "paiement unique" },
];

const FORFAITS_MENSUEL: { id: string; name: string; nameAr: string; price: number; priceLabel: string }[] = [
  { id: "essentiel", name: "Essentiel", nameAr: "الأساسي", price: 49, priceLabel: "€/mois" },
  { id: "intensif", name: "Intensif", nameAr: "المكثف", price: 79, priceLabel: "€/mois" },
];

export default function ChoisirForfaitClient() {
  const [tab, setTab] = useState<"unique" | "mensuel">("unique");
  const [loading, setLoading] = useState<string | null>(null);

  const handleChoose = async (forfait: string, type: "unique" | "mensuel") => {
    setLoading(`${forfait}-${type}`);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forfait, type }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Erreur");
    } catch {
      setLoading(null);
    } finally {
      setLoading(null);
    }
  };

  const list = tab === "unique" ? FORFAITS_UNIQUE : FORFAITS_MENSUEL;

  return (
    <div className="mt-12">
      <div className="flex justify-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setTab("unique")}
          className="rounded-full px-6 py-2 font-display text-sm font-medium transition-all"
          style={{
            backgroundColor: tab === "unique" ? "var(--or-luxe)" : "transparent",
            color: tab === "unique" ? "var(--encre-noire)" : "var(--encre-douce)",
            border: "2px solid var(--or-brillant)",
          }}
        >
          Paiement unique
        </button>
        <button
          type="button"
          onClick={() => setTab("mensuel")}
          className="rounded-full px-6 py-2 font-display text-sm font-medium transition-all"
          style={{
            backgroundColor: tab === "mensuel" ? "var(--or-luxe)" : "transparent",
            color: tab === "mensuel" ? "var(--encre-noire)" : "var(--encre-douce)",
            border: "2px solid var(--or-brillant)",
          }}
        >
          Abonnement mensuel
        </button>
      </div>
      <CalligraphyDivider className="mx-auto mb-10 w-48" color="var(--or-brillant)" compact />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {list.map((f) => (
          <motion.article
            key={`${f.id}-${tab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: "var(--blanc-ivoire)",
              borderColor: "var(--or-brillant)",
            }}
          >
            <p className="font-arabic text-2xl" style={{ color: "var(--or-luxe)" }}>
              {f.nameAr}
            </p>
            <h3 className="font-display text-xl mt-1" style={{ color: "var(--encre-noire)" }}>
              {f.name}
            </h3>
            <p className="mt-4 font-display text-4xl" style={{ color: "var(--or-brillant)" }}>
              {f.price}€
            </p>
            <p className="text-sm" style={{ color: "var(--encre-douce)" }}>
              {f.priceLabel}
            </p>
            <button
              type="button"
              disabled={!!loading}
              onClick={() => handleChoose(f.id, tab)}
              className="mt-6 w-full rounded-full py-3 font-display text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{
                backgroundColor: "var(--or-luxe)",
                color: "var(--encre-noire)",
              }}
            >
              {loading === `${f.id}-${tab}` ? "Redirection…" : "Choisir ce forfait"}
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
