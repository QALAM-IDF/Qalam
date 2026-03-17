"use client";

import React, { useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Mail, X } from "lucide-react";

type Message = {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  source: string | null;
  read: boolean;
  created_at: string;
};

export default function AdminMessagesPage() {
  const [data, setData] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setData(d))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
    if (selected?.id === id) setSelected((s) => (s ? { ...s, read: true } : null));
  };

  const columns: Column<Message>[] = [
    {
      key: "read",
      label: "",
      render: (v: unknown, row: Message) =>
        !row.read ? (
          <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
            Nouveau
          </span>
        ) : null,
    },
    { key: "name", label: "Nom", render: (v: unknown) => (v ?? "—") as React.ReactNode },
    { key: "email", label: "Email", render: (v: unknown) => (v ?? "—") as React.ReactNode },
    { key: "subject", label: "Sujet", render: (v: unknown) => (v ?? "—") as React.ReactNode },
    {
      key: "created_at",
      label: "Date",
      render: (v: unknown) =>
        (v ? new Date(String(v)).toLocaleString("fr-FR") : "") as React.ReactNode,
    },
    {
      key: "actions",
      label: "",
      render: (_: unknown, row: Message) => (
        <button
          type="button"
          onClick={() => {
            setSelected(row);
            if (!row.read) markRead(row.id);
          }}
          className="rounded px-2 py-1 text-sm"
          style={{ color: "var(--or-brillant)" }}
        >
          Voir
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Messages
      </h1>
      <div className="mt-6">
        {loading ? (
          <p style={{ color: "#888" }}>Chargement…</p>
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl border p-6"
            style={{
              background: "#1a1a1a",
              borderColor: "#2a2a2a",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl" style={{ color: "#fff" }}>
                {selected.subject ?? "Sans sujet"}
              </h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded p-2 hover:bg-[#2a2a2a]"
                style={{ color: "#888" }}
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-2 text-sm" style={{ color: "#888" }}>
              De : {selected.name ?? "—"} &lt;{selected.email ?? "—"}&gt;
            </p>
            <p className="mt-2 text-sm" style={{ color: "#888" }}>
              {selected.created_at
                ? new Date(selected.created_at).toLocaleString("fr-FR")
                : ""}
            </p>
            <div className="mt-4 whitespace-pre-wrap text-sm" style={{ color: "#ccc" }}>
              {selected.message ?? "—"}
            </div>
            <div className="mt-6 flex gap-2">
              {!selected.read && (
                <button
                  type="button"
                  onClick={() => markRead(selected.id)}
                  className="rounded-lg px-4 py-2 text-sm"
                  style={{
                    background: "#2a2a2a",
                    color: "#fff",
                  }}
                >
                  Marquer comme lu
                </button>
              )}
              <a
                href={`mailto:${selected.email ?? ""}`}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
                style={{
                  background: "var(--or-brillant)",
                  color: "#0f0f0f",
                }}
              >
                <Mail size={16} />
                Répondre
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
