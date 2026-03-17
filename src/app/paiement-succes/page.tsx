export const dynamic = "force-dynamic";

import Link from "next/link";
import { Suspense } from "react";
import ArabicPattern from "@/components/shared/ArabicPattern";

function SuccessContent() {
  return (
    <main
      className="grain-overlay flex min-h-screen flex-col items-center justify-center py-20"
      style={{ background: "var(--beige-creme)" }}
    >
      <ArabicPattern
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        color="var(--encre-douce)"
        animate
      />
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <p className="font-arabic text-4xl md:text-5xl" style={{ color: "var(--or-luxe)" }}>
          مبروك
        </p>
        <h1 className="font-display text-4xl md:text-5xl" style={{ color: "var(--encre-noire)" }}>
          Accès activé !
        </h1>
        <p className="max-w-md text-lg" style={{ color: "var(--encre-douce)" }}>
          Votre forfait Qalam est actif. Vous pouvez accéder à tous vos cours.
        </p>
        <Link
          href="/espace-membre"
          className="rounded-full border-2 px-8 py-3 font-display text-lg font-medium transition-opacity hover:opacity-90"
          style={{
            borderColor: "var(--or-luxe)",
            backgroundColor: "var(--or-luxe)",
            color: "var(--encre-noire)",
          }}
        >
          Accéder à mon espace →
        </Link>
      </div>
    </main>
  );
}

export default function PaiementSuccesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--beige-creme)]" />}>
      <SuccessContent />
    </Suspense>
  );
}
