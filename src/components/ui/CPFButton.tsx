"use client";

import { useState } from "react";

type CPFButtonProps = {
  langue: "arabe" | "anglais";
  href?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function CPFButton({ langue, href, className, id, style, children }: CPFButtonProps) {
  const [showInfo, setShowInfo] = useState(false);

  if (href && href !== "#") {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children ?? `S'inscrire avec mon CPF — ${langue === "arabe" ? "Arabe" : "Anglais"}`}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        id={id}
        onClick={() => setShowInfo(true)}
        className={className}
        style={style}
      >
        {children ?? `S'inscrire avec mon CPF — ${langue === "arabe" ? "Arabe" : "Anglais"}`}
      </button>

      {showInfo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cpf-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            style={{
              background: "var(--blanc-ivoire)",
              borderRadius: 12,
              padding: 32,
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontSize: "2rem", marginBottom: 8 }} aria-hidden>📋</p>
            <h3
              id="cpf-modal-title"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.5rem",
                marginBottom: 12,
              }}
            >
              Formation CPF — {langue === "arabe" ? "Arabe" : "Anglais"}
            </h3>
            <p style={{ color: "var(--encre-douce)", marginBottom: 16 }}>
              Nos formations CPF sont en cours de référencement sur Mon Compte
              Formation. Contactez-nous pour être informé dès que les inscriptions
              sont ouvertes.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "var(--or-brillant)",
                color: "var(--encre-noire)",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Nous contacter →
            </a>
            <br />
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              style={{
                marginTop: 8,
                background: "none",
                border: "none",
                color: "var(--encre-douce)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
