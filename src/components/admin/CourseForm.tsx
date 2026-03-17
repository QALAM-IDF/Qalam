"use client";

type CourseFormData = {
  title: string;
  title_ar: string;
  level: string;
  forfait: string;
  univers: string;
  description: string;
  total_hours: number;
  published: boolean;
};

type CourseFormProps = {
  data: CourseFormData;
  onChange: (data: CourseFormData) => void;
  isNew?: boolean;
  courseId?: string;
};

const LEVELS = [
  "decouverte",
  "essentiel-debutant",
  "essentiel-intermediaire",
  "essentiel-avance",
  "intensif",
  "coranique",
];
const FORFAITS = ["decouverte", "essentiel", "intensif"];
const UNIVERS = ["mixte", "hommes", "femmes", "enfants"];

export function CourseForm({
  data,
  onChange,
  isNew,
  courseId,
}: CourseFormProps) {
  const update = (patch: Partial<CourseFormData>) => {
    onChange({ ...data, ...patch });
  };

  return (
    <div
      className="rounded-xl border p-6"
      style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}
    >
      <h3 className="font-display text-lg font-semibold" style={{ color: "#fff" }}>
        Infos du cours
      </h3>
      {isNew && (
        <div className="mt-4">
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            ID du cours (slug, ex: decouverte-alphabet) *
          </label>
          <input
            type="text"
            value={courseId ?? ""}
            readOnly
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Titre FR *
          </label>
          <input
            type="text"
            value={data.title}
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
            value={data.title_ar}
            onChange={(e) => update({ title_ar: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Niveau
          </label>
          <select
            value={data.level}
            onChange={(e) => update({ level: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Forfait
          </label>
          <select
            value={data.forfait}
            onChange={(e) => update({ forfait: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          >
            {FORFAITS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Univers
          </label>
          <select
            value={data.univers}
            onChange={(e) => update({ univers: e.target.value })}
            className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          >
            {UNIVERS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs" style={{ color: "#888" }}>
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          rows={3}
          className="w-full rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
          style={{ borderColor: "#2a2a2a", color: "#fff" }}
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div>
          <label className="mb-1 block text-xs" style={{ color: "#888" }}>
            Heures totales
          </label>
          <input
            type="number"
            min={0}
            value={data.total_hours}
            onChange={(e) => update({ total_hours: Number(e.target.value) || 0 })}
            className="w-24 rounded border bg-[#0f0f0f] px-3 py-2 text-sm"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
        <label className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => update({ published: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm" style={{ color: "#888" }}>
            Publié
          </span>
        </label>
      </div>
    </div>
  );
}
