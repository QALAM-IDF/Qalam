"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageForm } from "@/components/professeur/MessageForm";

type Eleve = {
  clerk_user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
};

export default function ProfesseurMessagesPage() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to") ?? "";
  const nomParam = searchParams.get("nom") ?? "";

  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [selectedEmail, setSelectedEmail] = useState(toParam);
  const [selectedNom, setSelectedNom] = useState(nomParam);

  useEffect(() => {
    if (toParam) setSelectedEmail(toParam);
    if (nomParam) setSelectedNom(nomParam);
  }, [toParam, nomParam]);

  useEffect(() => {
    fetch("/api/professeur/eleves")
      .then((r) => r.json())
      .then((d) => setEleves(d.eleves ?? []));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Messages
      </h1>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Envoyer un email à un élève
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="mb-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
            Destinataire rapide
          </h2>
          <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border p-2" style={{ borderColor: "#1a2a1a" }}>
            {eleves.length === 0 ? (
              <p className="p-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Aucun élève
              </p>
            ) : (
              eleves.map((e) => {
                const name = [e.first_name, e.last_name].filter(Boolean).join(" ") || e.email || "—";
                const email = e.email ?? "";
                const isSelected = selectedEmail === email;
                return (
                  <button
                    key={e.clerk_user_id}
                    type="button"
                    onClick={() => {
                      setSelectedEmail(email);
                      setSelectedNom(name);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm transition-colors"
                    style={{
                      background: isSelected ? "rgba(212, 175, 55, 0.2)" : "transparent",
                      color: isSelected ? "var(--or-brillant)" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    <span className="block truncate font-medium">{name}</span>
                    <span className="block truncate text-xs opacity-70">{email}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-6" style={{ borderColor: "#1a2a1a", background: "#0d150d" }}>
            <MessageForm
              key={`${selectedEmail}-${selectedNom}`}
              defaultTo={selectedEmail}
              defaultEleveNom={selectedNom}
              defaultSubject="Message de votre professeur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
