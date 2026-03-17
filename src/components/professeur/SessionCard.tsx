"use client";

import { Calendar, Clock, Copy, Send } from "lucide-react";

type SessionCardProps = {
  id: string;
  title: string;
  title_ar?: string | null;
  univers?: string | null;
  session_date: string;
  duration_minutes?: number | null;
  zoom_link?: string | null;
  onCopyZoom?: (link: string) => void;
  onSendRappel?: (session: { title: string; session_date: string; zoom_link?: string | null }) => void;
  onDelete?: (id: string) => void;
};

export function SessionCard({
  id,
  title,
  title_ar,
  univers,
  session_date,
  duration_minutes = 90,
  zoom_link,
  onCopyZoom,
  onSendRappel,
  onDelete,
}: SessionCardProps) {
  const date = new Date(session_date);
  const dateStr = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: "#0d150d",
        borderColor: "#1a2a1a",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{ background: "var(--andalou-sauge)", color: "#fff" }}
            >
              {univers ?? "mixte"}
            </span>
          </div>
          <h3 className="mt-2 font-semibold" style={{ color: "#fff" }}>
            {title}
            {title_ar && (
              <span className="ml-2 text-sm font-normal" style={{ color: "rgba(255,255,255,0.7)" }}>
                — {title_ar}
              </span>
            )}
          </h3>
          <div className="mt-2 flex items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {timeStr} · {duration_minutes} min
            </span>
          </div>
          {zoom_link && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  onCopyZoom?.(zoom_link);
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(zoom_link);
                  }
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                style={{
                  background: "rgba(212, 175, 55, 0.2)",
                  color: "var(--or-brillant)",
                }}
              >
                <Copy className="h-4 w-4" />
                Copier le lien Zoom
              </button>
              {onSendRappel && (
                <button
                  type="button"
                  onClick={() => onSendRappel({ title, session_date, zoom_link })}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                  style={{
                    background: "rgba(45, 79, 45, 0.5)",
                    color: "var(--andalou-sauge)",
                  }}
                >
                  <Send className="h-4 w-4" />
                  Envoyer rappel
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(id)}
                  className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/20"
                >
                  Supprimer
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
