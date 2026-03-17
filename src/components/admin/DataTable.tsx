"use client";

import { useState } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  getSearchString?: (row: T) => string;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchable,
  searchPlaceholder = "Rechercher…",
  getSearchString,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 20;

  const filtered =
    searchable && search.trim() && getSearchString
      ? data.filter((row) =>
          getSearchString(row).toLowerCase().includes(search.toLowerCase())
        )
      : data;

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#2a2a2a" }}>
      {searchable && (
        <div className="border-b p-4" style={{ borderColor: "#2a2a2a" }}>
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="w-full max-w-sm rounded-lg border bg-[#1a1a1a] px-4 py-2 text-sm outline-none focus:border-[var(--or-brillant)]"
            style={{ borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: "#1a1a1a" }}>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 font-semibold"
                  style={{ color: "var(--or-brillant)" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={i}
                className="border-t transition-colors hover:bg-[rgba(212,175,55,0.05)]"
                style={{
                  borderColor: "#2a2a2a",
                  background: i % 2 === 0 ? "#1a1a1a" : "#151515",
                }}
              >
                {columns.map((col) => {
                  const value = row[col.key as keyof T];
                  return (
                    <td key={String(col.key)} className="px-4 py-3" style={{ color: "#ccc" }}>
                      {col.render ? col.render(value, row) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between border-t px-4 py-2"
          style={{ borderColor: "#2a2a2a", color: "#888" }}
        >
          <span className="text-xs">
            {filtered.length} résultat(s)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded px-3 py-1 text-xs disabled:opacity-50"
              style={{ background: "#2a2a2a", color: "#fff" }}
            >
              Précédent
            </button>
            <span className="px-2 py-1 text-xs">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded px-3 py-1 text-xs disabled:opacity-50"
              style={{ background: "#2a2a2a", color: "#fff" }}
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
