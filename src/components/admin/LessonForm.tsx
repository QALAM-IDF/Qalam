"use client";

import { useState } from "react";

export type LessonFormData = {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  youtube_id: string;
  pdf_url: string;
  duration: string;
  order_index: number;
  published: boolean;
};

type LessonFormProps = {
  lesson: LessonFormData;
  onChange: (data: LessonFormData) => void;
  onRemove?: () => void;
};

export function LessonForm({ lesson, onChange, onRemove }: LessonFormProps) {
  const [local, setLocal] = useState(lesson);

  const update = (patch: Partial<LessonFormData>) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange(next);
  };

  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Titre FR *
          </label>
          <input
            type="text"
            value={local.title}
            onChange={(e) => update({ title: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Titre AR
          </label>
          <input
            type="text"
            value={local.title_ar}
            onChange={(e) => update({ title_ar: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs" style={{ color: "#888" }}>
          YouTube ID
        </label>
        <input
          type="text"
          value={local.youtube_id}
          onChange={(e) => update({ youtube_id: e.target.value })}
          placeholder="dQw4w9WgXcQ"
          className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
          style={{ borderColor: "#2a2a2a", color: "#fff" }}
        />
        {local.youtube_id && (
          <div className="mt-2">
            <img
              src={`https://img.youtube.com/vi/${local.youtube_id}/mqdefault.jpg`}
              alt="Miniature YouTube"
              className="max-w-[320px] rounded border"
              style={{ borderColor: "#2a2a2a" }}
            />
          </div>
        )}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            URL PDF
          </label>
          <input
            type="url"
            value={local.pdf_url}
            onChange={(e) => update({ pdf_url: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Durée (ex: 18:42)
          </label>
          <input
            type="text"
            value={local.duration}
            onChange={(e) => update({ duration: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs" style={{ color: "#888" }}>
          Description
        </label>
        <textarea
          value={local.description}
          onChange={(e) => update({ description: e.target.value })}
          rows={2}
          className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
          style={{ borderColor: "#2a2a2a", color: "#fff" }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={local.published}
            onChange={(e) => update({ published: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm" style={{ color: "#888" }}>
            Publié
          </span>
        </label>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-400 hover:underline"
          >
            Supprimer la leçon
          </button>
        )}
      </div>
    </div>
  );
}
