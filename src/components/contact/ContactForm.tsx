"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `Contact: ${formData.subject || "Demande de renseignement"}`,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle
          size={48}
          style={{ color: "var(--or-luxe)", margin: "0 auto 16px" }}
        />
        <h3
          className="font-display text-2xl mb-2"
          style={{ color: "var(--encre-noire)" }}
        >
          Message envoyé !
        </h3>
        <p
          className="font-body"
          style={{ color: "var(--encre-douce)" }}
        >
          Nous vous répondrons dans les 24h ouvrées.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--beige-creme)",
    border: "1px solid var(--beige-profond)",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "var(--encre-noire)",
    fontFamily: "var(--font-lato)",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const labelStyle = {
    display: "block" as const,
    marginBottom: "6px",
    fontSize: "0.875rem",
    color: "var(--encre-douce)",
    fontFamily: "var(--font-lato)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label htmlFor="contact-name" style={labelStyle}>Nom complet *</label>
        <input
          id="contact-name"
          type="text"
          style={inputStyle}
          value={formData.name}
          onChange={(e) =>
            setFormData((p) => ({ ...p, name: e.target.value }))
          }
          aria-required
        />
      </div>
      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email *</label>
        <input
          id="contact-email"
          type="email"
          style={inputStyle}
          value={formData.email}
          onChange={(e) =>
            setFormData((p) => ({ ...p, email: e.target.value }))
          }
          aria-required
        />
      </div>
      <div>
        <label htmlFor="contact-subject" style={labelStyle}>Sujet</label>
        <input
          id="contact-subject"
          type="text"
          style={inputStyle}
          placeholder="Ex: Question sur le forfait Essentiel"
          value={formData.subject}
          onChange={(e) =>
            setFormData((p) => ({ ...p, subject: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Message *</label>
        <textarea
          id="contact-message"
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
          value={formData.message}
          onChange={(e) =>
            setFormData((p) => ({ ...p, message: e.target.value }))
          }
          aria-required
        />
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          style={{
            color: "var(--andalou-bordeaux)",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "14px",
          background: "var(--or-brillant)",
          color: "var(--encre-noire)",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.1rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          "Envoi..."
        ) : (
          <>
            <Send size={18} />
            Envoyer le message
          </>
        )}
      </button>
    </div>
  );
}
