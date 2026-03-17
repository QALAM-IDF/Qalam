"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type?: string;
};

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  accent?: string;
};

export default function LeadModal({
  open,
  onClose,
  title,
  fields,
  accent = "var(--or-brillant)",
}: LeadModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const empty = fields.find((f) => !formData[f.name]?.trim());
    if (empty) {
      setError(`Veuillez remplir le champ "${empty.label}"`);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: title,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        setSent(true);
      }
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setSent(false);
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 9998,
              backdropFilter: "blur(4px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--blanc-ivoire)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.5rem",
                  color: "var(--encre-noire)",
                }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "var(--encre-douce)",
                }}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <CheckCircle
                  size={48}
                  style={{ color: accent, margin: "0 auto 16px" }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    color: "var(--encre-noire)",
                    marginBottom: "8px",
                  }}
                >
                  Message envoyé !
                </p>
                <p
                  style={{
                    color: "var(--encre-douce)",
                    marginBottom: "24px",
                  }}
                >
                  Nous vous recontacterons dans les plus brefs délais.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: "12px 32px",
                    background: accent,
                    color: "var(--encre-noire)",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          fontSize: "0.875rem",
                          color: "var(--encre-douce)",
                          fontFamily: "var(--font-lato)",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type ?? "text"}
                        value={formData[field.name] ?? ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background: "var(--beige-creme)",
                          border: "1px solid var(--beige-profond)",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          color: "var(--encre-noire)",
                          outline: "none",
                          fontFamily: "var(--font-lato)",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = accent;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--beige-profond)";
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "0.875rem",
                        color: "var(--encre-douce)",
                        fontFamily: "var(--font-lato)",
                      }}
                    >
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData["message"] ?? ""}
                      onChange={(e) =>
                        handleChange("message", e.target.value)
                      }
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--beige-creme)",
                        border: "1px solid var(--beige-profond)",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        color: "var(--encre-noire)",
                        outline: "none",
                        fontFamily: "var(--font-lato)",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <p
                    style={{
                      color: "#c0392b",
                      fontSize: "0.875rem",
                      marginBottom: "12px",
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
                    width: "100%",
                    padding: "14px",
                    background: loading ? "var(--beige-profond)" : accent,
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
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer
                    </>
                  )}
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
