"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "nouveau-cours";
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "1rem",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block" as const,
  marginBottom: "6px",
  color: "#aaa",
  fontSize: "0.875rem",
};

export default function AdminNouveauCoursPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    title_ar: "",
    level: "decouverte",
    forfait: "decouverte",
    univers: "mixte",
    description: "",
    total_hours: 10,
    published: false,
  });

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }

    setLoading(true);
    setError("");

    const id = slugify(form.title);

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id,
          title_ar: form.title_ar || null,
          description: form.description || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const courseId = data.course?.id ?? data.id ?? id;
        router.push(`/admin/cours/${courseId}`);
        return;
      }
      setError(data.error ?? "Erreur lors de la création");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <Link
        href="/admin/cours"
        className="mb-6 inline-flex items-center gap-2 text-sm"
        style={{ color: "var(--or-brillant)" }}
      >
        <ArrowLeft size={16} />
        Retour aux cours
      </Link>
      <h1
        className="font-display text-3xl font-semibold"
        style={{ color: "#fff", marginBottom: "32px" }}
      >
        Nouveau cours
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={labelStyle}>Titre (français) *</label>
          <input
            style={inputStyle}
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </div>

        <div>
          <label style={labelStyle}>Titre (arabe)</label>
          <input
            style={{ ...inputStyle, direction: "rtl" }}
            value={form.title_ar}
            onChange={(e) => setForm((p) => ({ ...p, title_ar: e.target.value }))}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Niveau</label>
            <select
              style={inputStyle}
              value={form.level}
              onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
            >
              <option value="decouverte">Débutant</option>
              <option value="essentiel-debutant">Intermédiaire</option>
              <option value="essentiel-avance">Avancé</option>
              <option value="coranique">Coranique / Tajwid</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Forfait requis</label>
            <select
              style={inputStyle}
              value={form.forfait}
              onChange={(e) => setForm((p) => ({ ...p, forfait: e.target.value }))}
            >
              <option value="decouverte">Découverte (120€)</option>
              <option value="essentiel">Essentiel (299€)</option>
              <option value="intensif">Intensif (490€)</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Univers</label>
            <select
              style={inputStyle}
              value={form.univers}
              onChange={(e) => setForm((p) => ({ ...p, univers: e.target.value }))}
            >
              <option value="mixte">Mixte (tous)</option>
              <option value="hommes">Hommes</option>
              <option value="femmes">Femmes</option>
              <option value="enfants">Enfants</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Heures totales</label>
            <input
              type="number"
              style={inputStyle}
              value={form.total_hours}
              onChange={(e) =>
                setForm((p) => ({ ...p, total_hours: Number(e.target.value) || 0 }))
              }
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) =>
              setForm((p) => ({ ...p, published: e.target.checked }))
            }
          />
          <label
            htmlFor="published"
            style={{ color: "#aaa", cursor: "pointer" }}
          >
            Publier immédiatement
          </label>
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: "0.875rem" }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: "var(--or-brillant)",
              color: "#1a1208",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 700,
              fontSize: "1rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Création…" : "Créer le cours →"}
          </button>
          <Link
            href="/admin/cours"
            style={{
              padding: "12px 24px",
              background: "#2a2a2a",
              color: "#aaa",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
