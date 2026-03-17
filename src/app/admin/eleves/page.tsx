"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";

type Eleve = {
  clerk_user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  forfait: string | null;
  status: string | null;
  purchased_at: string | null;
  created_at: string;
};

const forfaitColor: Record<string, string> = {
  decouverte: "#e8d5b0",
  essentiel: "var(--or-luxe)",
  intensif: "var(--or-brillant)",
};

export default function AdminElevesPage() {
  const [data, setData] = useState<Eleve[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/eleves")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === "" ? data : data.filter((e) => e.forfait === filter);

  const columns = [
    { key: "first_name", label: "Prénom" },
    { key: "last_name", label: "Nom" },
    { key: "email", label: "Email" },
    {
      key: "forfait",
      label: "Forfait",
      render: (v: unknown, row: Eleve) =>
        row.forfait ? (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              background: forfaitColor[row.forfait] ?? "#333",
              color: "#0f0f0f",
            }}
          >
            {row.forfait}
          </span>
        ) : (
          <span style={{ color: "#666" }}>—</span>
        ),
    },
    { key: "status", label: "Statut" },
    {
      key: "created_at",
      label: "Inscription",
      render: (v: unknown) =>
        v ? new Date(String(v)).toLocaleDateString("fr-FR") : "",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
          Élèves
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border bg-[#1a1a1a] px-3 py-2 text-sm"
          style={{ borderColor: "#2a2a2a", color: "#fff" }}
        >
          <option value="">Tous les forfaits</option>
          <option value="decouverte">Découverte</option>
          <option value="essentiel">Essentiel</option>
          <option value="intensif">Intensif</option>
        </select>
      </div>
      <div className="mt-6">
        {loading ? (
          <p style={{ color: "#888" }}>Chargement…</p>
        ) : (
          <DataTable
            data={filtered}
            columns={columns}
            searchable
            searchPlaceholder="Rechercher par nom ou email…"
            getSearchString={(row) =>
              [row.first_name, row.last_name, row.email].filter(Boolean).join(" ")
            }
          />
        )}
      </div>
    </div>
  );
}
