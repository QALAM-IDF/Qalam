"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

type UnlockBannerProps = {
  forfaitRequired: string;
};

export default function UnlockBanner({ forfaitRequired }: UnlockBannerProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm">
      <Lock className="mb-4 h-12 w-12" style={{ color: "var(--or-brillant)" }} />
      <p
        className="mb-4 max-w-[200px] text-center text-sm"
        style={{ color: "var(--beige-creme)" }}
      >
        Disponible avec le forfait {forfaitRequired}
      </p>
      <Link
        href="/tarifs"
        className="rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--or-brillant)",
          color: "var(--encre-noire)",
        }}
      >
        Mettre à niveau
      </Link>
    </div>
  );
}
