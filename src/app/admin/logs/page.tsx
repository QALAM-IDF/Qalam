"use client";

import { useEffect, useState } from "react";

type Log = {
  id: string;
  clerk_user_id: string | null;
  email: string | null;
  role: string | null;
  action: string;
  resource: string | null;
  ip_address: string | null;
  created_at: string;
};

const ACTION_OPTIONS = [
  "tous",
  "view_course",
  "view_lesson",
  "complete_lesson",
  "access_denied",
  "purchase",
  "login",
  "subscription_expired",
  "admin_action",
  "prof_action",
];

const actionBadgeStyle = (action: string) => {
  if (action === "access_denied") return { bg: "#2a1515", color: "#f87171" };
  if (action === "purchase") return { bg: "#052005", color: "#4ade80" };
  if (action === "view_course" || action === "view_lesson") return { bg: "#0a1a2a", color: "#7dd3fc" };
  return { bg: "#1a1a1a", color: "#999" };
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [actionFilter, setActionFilter] = useState("tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(() => setLoading(true));
    const url = actionFilter === "tous" ? "/api/admin/logs" : `/api/admin/logs?action=${encodeURIComponent(actionFilter)}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setLogs(d.logs ?? []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [actionFilter]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
        <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff", margin: 0 }}>
          Logs d&apos;accès
        </h1>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "0.875rem",
          }}
        >
          {ACTION_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a === "tous" ? "Toutes les actions" : a}
            </option>
          ))}
        </select>
      </div>

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
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ background: "#151515", borderBottom: "1px solid #2a2a2a" }}>
                  {["Date", "Utilisateur", "Rôle", "Action", "Ressource", "IP"].map((h) => (
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
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "24px", color: "#666", textAlign: "center" }}>
                      Aucun log
                    </td>
                  </tr>
                ) : (
                  logs.map((log, i) => {
                    const badge = actionBadgeStyle(log.action);
                    return (
                      <tr
                        key={log.id}
                        style={{
                          background: i % 2 === 0 ? "#1a1a1a" : "#161616",
                          borderBottom: "1px solid #222",
                        }}
                      >
                        <td style={{ padding: "12px 16px", color: "#888", fontSize: "0.8rem" }}>
                          {new Date(log.created_at).toLocaleString("fr-FR")}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#ccc", fontSize: "0.875rem" }}>
                          {log.email ?? log.clerk_user_id ?? "—"}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#888", fontSize: "0.8rem" }}>
                          {log.role ?? "—"}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "0.75rem",
                              background: badge.bg,
                              color: badge.color,
                            }}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#999", fontSize: "0.8rem" }}>
                          {log.resource ?? "—"}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#666", fontSize: "0.75rem" }}>
                          {log.ip_address ?? "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
