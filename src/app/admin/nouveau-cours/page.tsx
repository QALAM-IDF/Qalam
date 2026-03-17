"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/components/admin/CourseForm";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "nouveau-cours";
}

export default function AdminNouveauCoursPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    title_ar: "",
    level: "decouverte",
    forfait: "decouverte",
    univers: "mixte",
    description: "",
    total_hours: 0,
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const courseId = form.title ? slugify(form.title) : "";

  const handleCreate = async () => {
    if (!form.title.trim()) {
      setError("Le titre est requis.");
      return;
    }
    const id = slugify(form.title);
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: form.title,
          title_ar: form.title_ar || null,
          level: form.level,
          forfait: form.forfait,
          univers: form.univers,
          description: form.description || null,
          total_hours: form.total_hours,
          published: form.published,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/admin/cours/${data.id}`);
        return;
      }
      setError(data.error ?? "Erreur lors de la création.");
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/cours"
        className="mb-6 inline-flex items-center gap-2 text-sm"
        style={{ color: "var(--or-brillant)" }}
      >
        <ArrowLeft size={16} />
        Retour aux cours
      </Link>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Nouveau cours
      </h1>
      <div className="mt-6">
        <CourseForm
          data={form}
          onChange={setForm}
          isNew
          courseId={courseId}
        />
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={handleCreate}
          disabled={saving || !form.title.trim()}
          className="rounded-lg px-6 py-2 font-medium disabled:opacity-50"
          style={{
            background: "var(--or-brillant)",
            color: "#0f0f0f",
          }}
        >
          {saving ? "Création…" : "Créer le cours"}
        </button>
      </div>
    </div>
  );
}
