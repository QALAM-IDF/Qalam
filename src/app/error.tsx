"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        background: "var(--beige-creme)",
      }}
    >
      <p style={{ fontSize: 40 }}>⚠️</p>
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 28,
          color: "var(--encre-noire)",
        }}
      >
        Quelque chose s&apos;est mal passé
      </h2>
      <p style={{ color: "var(--encre-douce)" }}>
        L&apos;erreur a été signalée automatiquement.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 24px",
          background: "var(--or-brillant)",
          color: "var(--encre-noire)",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Réessayer
      </button>
    </div>
  );
}

