"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Eleve = {
  clerk_user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  display_name?: string | null;
  forfait?: string | null;
  forfait_status?: string | null;
  forfait_type?: string | null;
  purchased_at?: string | null;
  family_member_id?: string | null;
  membre_categorie?: string | null;
  lesson_progress?: Array<{ course_id: string; lesson_id: string; completed?: boolean }>;
};

function progressPercent(progress: Eleve["lesson_progress"]): number {
  if (!progress?.length) return 0;
  const completed = progress.filter((p) => p.completed).length;
  return progress.length > 0 ? Math.round((100 * completed) / progress.length) : 0;
}

export default function ProfesseurElevesPage() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [universFilter, setUniversFilter] = useState<string>("tous");

  useEffect(() => {
    fetch("/api/professeur/eleves")
      .then((r) => r.json())
      .then((d) => {
        setEleves(d.eleves ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = eleves.filter((e) => {
    const name = [e.first_name, e.last_name].filter(Boolean).join(" ").toLowerCase();
    const email = (e.email ?? "").toLowerCase();
    const q = search.toLowerCase().trim();
    if (q && !name.includes(q) && !email.includes(q)) return false;
    return true;
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Mes élèves
      </h1>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Progression et suivi
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.5)" }} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4"
            style={{
              background: "#0d150d",
              borderColor: "#1a2a1a",
              color: "#fff",
            }}
          />
        </div>
        <select
          value={universFilter}
          onChange={(e) => setUniversFilter(e.target.value)}
          className="rounded-lg border px-4 py-2"
          style={{
            background: "#0d150d",
            borderColor: "#1a2a1a",
            color: "#fff",
          }}
        >
          <option value="tous">Tous les univers</option>
          <option value="hommes">Hommes</option>
          <option value="enfants">Enfants</option>
          <option value="femmes">Femmes</option>
          <option value="mixte">Mixte</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Chargement…
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border" style={{ borderColor: "#1a2a1a" }}>
          <table className="w-full text-left">
            <thead style={{ background: "#0d150d" }}>
              <tr>
                <th className="p-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Élève
                </th>
                <th className="p-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Email
                </th>
                <th className="p-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Forfait
                </th>
                <th className="p-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Progression
                </th>
                <th className="p-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Dernière activité
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const name = e.display_name ?? ([e.first_name, e.last_name].filter(Boolean).join(" ") || e.email || "—");
                const pct = progressPercent(e.lesson_progress);
                const lastActivity = e.purchased_at
                  ? new Date(e.purchased_at).toLocaleDateString("fr-FR")
                  : "—";
                return (
                  <tr
                    key={`${e.clerk_user_id}-${e.family_member_id ?? "self"}`}
                    className="border-t transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                    style={{ borderColor: "#1a2a1a" }}
                  >
                    <td className="p-4">
                      <Link
                        href={`/professeur/eleves/${e.clerk_user_id}`}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                          style={{
                            background: "var(--andalou-sauge)",
                            color: "#fff",
                          }}
                        >
                          {(e.first_name?.[0] ?? "?") + (e.last_name?.[0] ?? "")}
                        </div>
                        <span style={{ color: "#fff" }}>{name}</span>
                      </Link>
                    </td>
                    <td className="p-4 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {e.email ?? "—"}
                    </td>
                    <td className="p-4">
                      <span
                        className="rounded px-2 py-0.5 text-xs mr-1"
                        style={{
                          background: "rgba(212, 175, 55, 0.2)",
                          color: "var(--or-brillant)",
                        }}
                      >
                        {e.forfait ?? "—"}
                      </span>
                      {e.membre_categorie && (
                        <span
                          className="rounded px-2 py-0.5 text-xs"
                          style={{
                            background: "rgba(74, 222, 128, 0.2)",
                            color: "#4ade80",
                          }}
                        >
                          {e.membre_categorie}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-20 overflow-hidden rounded-full"
                          style={{ background: "#1a2a1a" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: "var(--or-brillant)",
                            }}
                          />
                        </div>
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {lastActivity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucun élève trouvé.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
