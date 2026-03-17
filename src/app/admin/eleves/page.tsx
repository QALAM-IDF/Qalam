"use client";

import { useState, useEffect } from "react";

type Eleve = {
  clerk_user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  forfait: string | null;
  forfait_type: string | null;
  forfait_status: string | null;
  purchased_at: string | null;
  expires_at: string | null;
  role?: string | null;
};

const forfaitColors: Record<string, { bg: string; color: string }> = {
  decouverte: { bg: "#1a1a00", color: "#ffd700" },
  essentiel: { bg: "#0a1a00", color: "#4ade80" },
  intensif: { bg: "#1a0a00", color: "#fb923c" },
};

const roleConfig: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  professeur: { bg: "#052020", color: "#2dd4bf", label: "Prof ✦" },
  admin: { bg: "#2a1f00", color: "#d4af37", label: "Admin" },
  eleve: { bg: "#1a1a1a", color: "#666", label: "Élève" },
};

function RoleButton({
  eleveId,
  currentRole,
  onUpdate,
}: {
  eleveId: string;
  currentRole: string;
  onUpdate: () => void;
}) {
  const [role, setRole] = useState(currentRole ?? "eleve");
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    const newRole = role === "professeur" ? "eleve" : "professeur";
    setLoading(true);
    const res = await fetch(`/api/admin/eleves/${eleveId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setRole(newRole);
      onUpdate();
    }
    setLoading(false);
  };

  const config = roleConfig[role] ?? roleConfig.eleve;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "0.75rem",
          background: config.bg,
          color: config.color,
        }}
      >
        {config.label}
      </span>
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        style={{
          padding: "4px 10px",
          background: "#2a2a2a",
          color: "#aaa",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.75rem",
          cursor: "pointer",
        }}
      >
        {loading ? "…" : role === "professeur" ? "→ Élève" : "→ Prof"}
      </button>
    </div>
  );
}

export default function ElevesAdminPage() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/eleves")
      .then((r) => r.json())
      .then((data) => {
        setEleves(data.eleves ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = eleves.filter(
    (e) =>
      search === "" ||
      `${e.first_name ?? ""} ${e.last_name ?? ""} ${e.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1
          className="font-display text-3xl font-semibold"
          style={{ color: "#fff", margin: 0 }}
        >
          Élèves
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "0.875rem",
            margin: "4px 0 0",
          }}
        >
          {loading ? "…" : `${filtered.length} élève(s)`}
        </p>
      </div>

      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px 14px",
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "0.9rem",
          marginBottom: "20px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {loading ? (
        <p style={{ color: "#666" }}>Chargement…</p>
      ) : (
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #2a2a2a",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "#151515",
                  borderBottom: "1px solid #2a2a2a",
                }}
              >
                {[
                  "Prénom",
                  "Nom",
                  "Email",
                  "Forfait",
                  "Type",
                  "Statut",
                  "Rôle",
                  "Inscrit le",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      color: "#d4af37",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((eleve, i) => (
                <tr
                  key={eleve.clerk_user_id}
                  style={{
                    background: i % 2 === 0 ? "#1a1a1a" : "#161616",
                    borderBottom: "1px solid #222",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    {eleve.first_name ?? "—"}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#fff",
                    }}
                  >
                    {eleve.last_name ?? "—"}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#999",
                      fontSize: "0.875rem",
                    }}
                  >
                    {eleve.email}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {eleve.forfait ? (
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background:
                            forfaitColors[eleve.forfait]?.bg ?? "#1a1a1a",
                          color:
                            forfaitColors[eleve.forfait]?.color ?? "#999",
                          border: `1px solid ${forfaitColors[eleve.forfait]?.color ?? "#333"}40`,
                        }}
                      >
                        {eleve.forfait.charAt(0).toUpperCase() +
                          eleve.forfait.slice(1)}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#555",
                          fontSize: "0.875rem",
                        }}
                      >
                        Aucun
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#888",
                      fontSize: "0.8rem",
                    }}
                  >
                    {eleve.forfait_type === "mensuel"
                      ? "🔄 Mensuel"
                      : eleve.forfait_type === "unique"
                        ? "✅ Unique"
                        : "—"}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        background:
                          eleve.forfait_status === "active"
                            ? "#052005"
                            : "#2a2a2a",
                        color:
                          eleve.forfait_status === "active"
                            ? "#4ade80"
                            : "#666",
                      }}
                    >
                      {eleve.forfait_status === "active" ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <RoleButton
                      eleveId={eleve.clerk_user_id}
                      currentRole={eleve.role ?? "eleve"}
                      onUpdate={() => {
                        fetch("/api/admin/eleves")
                          .then((r) => r.json())
                          .then((data) => setEleves(data.eleves ?? []));
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#666",
                      fontSize: "0.8rem",
                    }}
                  >
                    {eleve.created_at
                      ? new Date(eleve.created_at).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
