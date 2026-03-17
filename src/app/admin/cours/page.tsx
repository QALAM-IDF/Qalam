"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type Course = {
  id: string;
  title: string;
  level: string;
  forfait: string;
  published: boolean;
  lessons?: { id: string }[];
};

const forfaitLabel: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

export default function AdminCoursPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/courses")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === ""
      ? courses
      : courses.filter((c) => c.forfait === filter);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce cours et toutes ses leçons ?")) return;
    const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (res.ok) setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleTogglePublish = async (c: Course) => {
    const res = await fetch(`/api/admin/courses/${c.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, published: !c.published }),
    });
    if (res.ok)
      setCourses((prev) =>
        prev.map((x) => (x.id === c.id ? { ...x, published: !x.published } : x))
      );
  };

  const columns: { key: keyof Course | string; label: string; render?: (value: unknown, row: Course) => React.ReactNode }[] = [
    { key: "title", label: "Titre" },
    { key: "level", label: "Niveau" },
    {
      key: "forfait",
      label: "Forfait",
      render: (v) => forfaitLabel[String(v)] ?? String(v),
    },
    {
      key: "lessons",
      label: "Leçons",
      render: (_, row) => row.lessons?.length ?? 0,
    },
    {
      key: "published",
      label: "Statut",
      render: (v, row) => (
        <button
          type="button"
          onClick={() => handleTogglePublish(row)}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs"
          style={{
            background: row.published ? "rgba(34,197,94,0.2)" : "rgba(156,163,175,0.2)",
            color: row.published ? "#22c55e" : "#9ca3af",
          }}
        >
          {row.published ? <Eye size={12} /> : <EyeOff size={12} />}
          {row.published ? "Publié" : "Brouillon"}
        </button>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/cours/${row.id}`}
            className="rounded p-1.5 transition-colors hover:bg-[#2a2a2a]"
            style={{ color: "var(--or-brillant)" }}
            aria-label="Éditer"
          >
            <Pencil size={16} />
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="rounded p-1.5 text-red-400 transition-colors hover:bg-[#2a2a2a]"
            aria-label="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
          Cours
        </h1>
        <div className="flex gap-2">
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
          <Link
            href="/admin/nouveau-cours"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--or-brillant)",
              color: "#0f0f0f",
            }}
          >
            <PlusCircle size={18} />
            Nouveau cours
          </Link>
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
