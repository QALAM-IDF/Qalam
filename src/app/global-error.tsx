"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
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
    <html lang="fr">
      <body
        style={{
          background: "#f5efe0",
          fontFamily: "Georgia, serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: 16,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <p style={{ fontSize: 48, marginBottom: 8 }}>✒️</p>
          <h1 style={{ fontSize: 32, color: "#1a1208", marginBottom: 8 }}>
            Une erreur est survenue
          </h1>
          <p style={{ color: "#3d2b1f", marginBottom: 24 }}>
            Notre équipe a été automatiquement notifiée. Veuillez réessayer.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                background: "#d4af37",
                color: "#1a1208",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Réessayer
            </button>
            <Link
              href="/"
              style={{
                padding: "12px 24px",
                background: "#1a1208",
                color: "#d4af37",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

