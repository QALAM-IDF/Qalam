"use client";

import { useState } from "react";

type MessageFormProps = {
  defaultTo?: string;
  defaultSubject?: string;
  defaultMessage?: string;
  defaultEleveNom?: string;
  onSent?: () => void;
};

export function MessageForm({
  defaultTo = "",
  defaultSubject = "",
  defaultMessage = "",
  defaultEleveNom = "",
  onSent,
}: MessageFormProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);
  const [eleveNom, setEleveNom] = useState(defaultEleveNom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!to.trim() || !message.trim()) {
      setError("Destinataire et message requis.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/professeur/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: to.trim(),
          subject: subject.trim() || "Message de votre professeur",
          message: message.trim(),
          eleveNom: eleveNom.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur envoi");
        return;
      }
      setSuccess(true);
      setMessage("");
      setSubject("");
      onSent?.();
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Destinataire (email) *
        </label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="eleve@exemple.com"
          className="w-full rounded-lg border px-4 py-3"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Nom de l&apos;élève (pour le message)
        </label>
        <input
          type="text"
          value={eleveNom}
          onChange={(e) => setEleveNom(e.target.value)}
          placeholder="Prénom"
          className="w-full rounded-lg border px-4 py-3"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Sujet
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Message de votre professeur"
          className="w-full rounded-lg border px-4 py-3"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Message *
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder="Votre message..."
          className="w-full rounded-lg border px-4 py-3"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        />
      </div>
      {error && (
        <p className="text-sm" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm" style={{ color: "#22c55e" }}>
          Message envoyé.
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg px-6 py-3 font-medium transition-opacity disabled:opacity-50"
        style={{
          background: "var(--or-brillant)",
          color: "#0a0f0a",
        }}
      >
        {loading ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
