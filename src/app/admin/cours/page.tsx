"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type Course = {
  id: string;
  title: string;
  title_ar?: string | null;
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

function PublishButton({
  courseId,
  published,
  onToggle,
}: {
  courseId: string;
  published: boolean;
  onToggle: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (res.ok) onToggle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1 rounded px-2 py-1 text-xs"
      style={{
        background: published ? "#0a2a0a" : "#2a1010",
        color: published ? "#4ade80" : "#f87171",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "…" : published ? "Dépublier" : "Publier"}
    </button>
  );
}

export default function AdminCoursPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string>("tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/courses")
      .then((r) => r.json())
      .then((data) => {
        const list = data?.courses ?? (Array.isArray(data) ? data : []);
        setCourses(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === "tous" || filter === ""
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
    {
      key: "title",
      label: "Titre",
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 600, color: "#fff" }}>{row.title}</div>
          {row.title_ar && (
            <div style={{ color: "var(--or-brillant)", fontSize: "0.8rem" }}>
              {row.title_ar}
            </div>
          )}
        </div>
      ),
    },
    { key: "level", label: "Niveau" },
    {
      key: "forfait",
      label: "Forfait",
      render: (v) => forfaitLabel[String(v)] ?? String(v),
    },
    {
      key: "lessons",
      label: "Leçons",
      render: (_, row) => (
        <span style={{ color: "#aaa", fontSize: "0.875rem" }}>
          {row.lessons?.length ?? 0} leçon(s)
        </span>
      ),
    },
    {
      key: "published",
      label: "Statut",
      render: (_, row) => (
        <PublishButton
          courseId={row.id}
          published={row.published}
          onToggle={() => handleTogglePublish(row)}
        />
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
            style={{ borderColor: "#2a2a2a", color: "#fff", cursor: "pointer" }}
          >
            <option value="tous">Tous les forfaits</option>
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
