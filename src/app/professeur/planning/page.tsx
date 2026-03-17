"use client";

import { useEffect, useState } from "react";
import { SessionCard } from "@/components/professeur/SessionCard";
import { Calendar, Clock } from "lucide-react";

type Session = {
  id: string;
  title: string;
  title_ar?: string | null;
  univers?: string | null;
  session_date: string;
  duration_minutes?: number | null;
  zoom_link?: string | null;
  notes?: string | null;
};

export default function ProfesseurPlanningPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    title_ar: "",
    univers: "mixte",
    session_date: "",
    session_time: "",
    duration_minutes: 90,
    zoom_link: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/professeur/planning")
      .then((r) => r.json())
      .then((d) => setSessions(d.sessions ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.session_date || !form.session_time) {
      setError("Titre, date et heure requis.");
      return;
    }
    const session_date = new Date(`${form.session_date}T${form.session_time}`).toISOString();
    setSending(true);
    try {
      const res = await fetch("/api/professeur/planning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          title_ar: form.title_ar.trim() || null,
          univers: form.univers,
          session_date,
          duration_minutes: form.duration_minutes,
          zoom_link: form.zoom_link.trim() || null,
          notes: form.notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setForm({
        title: "",
        title_ar: "",
        univers: "mixte",
        session_date: "",
        session_time: "",
        duration_minutes: 90,
        zoom_link: "",
        notes: "",
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette session ?")) return;
    await fetch(`/api/professeur/planning/${id}`, { method: "DELETE" });
    load();
  };

  const inputClass =
    "w-full rounded-lg border px-4 py-2 bg-[#0d150d] border-[#1a2a1a] text-white placeholder:text-white/50";

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold" style={{ color: "#fff" }}>
        Planning
      </h1>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        Sessions et rappels
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
            Prochaines sessions
          </h2>
          {loading ? (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Chargement…
            </p>
          ) : sessions.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Aucune session planifiée.
            </p>
          ) : (
            <div className="space-y-4">
              {sessions.map((s) => (
                <SessionCard
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  title_ar={s.title_ar}
                  univers={s.univers}
                  session_date={s.session_date}
                  duration_minutes={s.duration_minutes}
                  zoom_link={s.zoom_link}
                  onCopyZoom={(link) => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(link);
                    }
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "#fff" }}>
            Nouvelle session
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Titre *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className={inputClass}
                placeholder="Session hommes - Module 1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Titre (arabe)
              </label>
              <input
                type="text"
                value={form.title_ar}
                onChange={(e) => setForm((p) => ({ ...p, title_ar: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Univers
              </label>
              <select
                value={form.univers}
                onChange={(e) => setForm((p) => ({ ...p, univers: e.target.value }))}
                className={inputClass}
              >
                <option value="hommes">Hommes</option>
                <option value="femmes">Femmes</option>
                <option value="enfants">Enfants</option>
                <option value="mixte">Mixte</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Date *
                </label>
                <input
                  type="date"
                  value={form.session_date}
                  onChange={(e) => setForm((p) => ({ ...p, session_date: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Heure *
                </label>
                <input
                  type="time"
                  value={form.session_time}
                  onChange={(e) => setForm((p) => ({ ...p, session_time: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Durée (minutes)
              </label>
              <input
                type="number"
                min={30}
                value={form.duration_minutes}
                onChange={(e) => setForm((p) => ({ ...p, duration_minutes: Number(e.target.value) || 90 }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Lien Zoom
              </label>
              <input
                type="url"
                value={form.zoom_link}
                onChange={(e) => setForm((p) => ({ ...p, zoom_link: e.target.value }))}
                className={inputClass}
                placeholder="https://zoom.us/j/..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={2}
                className={inputClass}
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: "#ef4444" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="rounded-lg px-6 py-3 font-medium disabled:opacity-50"
              style={{ background: "var(--or-brillant)", color: "#0a0f0a" }}
            >
              {sending ? "Enregistrement…" : "Planifier"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
