"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ExternalLink } from "lucide-react";

type Paiement = {
  id: string;
  clerk_user_id: string;
  forfait: string;
  type: string;
  status: string;
  purchased_at: string;
  stripe_session_id: string | null;
  amount: number;
  email: string;
};

const STRIPE_DASHBOARD = "https://dashboard.stripe.com";

export default function AdminPaiementsPage() {
  const [data, setData] = useState<Paiement[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/paiements")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === "" ? data : data.filter((p) => p.status === filter);
  const totalRevenus = filtered.reduce((acc, p) => acc + (p.amount ?? 0), 0);

  const columns = [
    {
      key: "purchased_at",
      label: "Date",
      render: (v: unknown) =>
        v ? new Date(String(v)).toLocaleDateString("fr-FR") : "",
    },
    { key: "email", label: "Email élève" },
    { key: "forfait", label: "Forfait" },
    {
      key: "type",
      label: "Type",
      render: (v: unknown) => (v === "mensuel" ? "Mensuel" : "Unique"),
    },
    {
      key: "amount",
      label: "Montant",
      render: (v: unknown) => (v != null ? `${v} €` : "—"),
    },
    { key: "status", label: "Statut" },
    {
      key: "stripe_session_id",
      label: "Stripe",
      render: (v: unknown, row: Paiement) =>
        row.stripe_session_id ? (
          <a
            href={`${STRIPE_DASHBOARD}/payments/${row.stripe_session_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--or-brillant)] hover:underline"
          >
            Voir <ExternalLink size={12} />
          </a>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
          Paiements
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold" style={{ color: "var(--or-brillant)" }}>
            Total : {totalRevenus} €
          </p>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border bg-[#1a1a1a] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          >
            <option value="">Tous</option>
            <option value="active">Actifs</option>
            <option value="cancelled">Annulés</option>
            <option value="expired">Expirés</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        {loading ? (
          <p style={{ color: "#888" }}>Chargement…</p>
        ) : (
          <DataTable data={filtered} columns={columns} />
        )}
      </div>
    </div>
  );
}
