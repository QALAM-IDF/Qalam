"use client";

import { useMemo } from "react";
type TableOfContentsProps = {
  body: unknown[] | null | undefined;
};

export default function TableOfContents({ body }: TableOfContentsProps) {
  const headings = useMemo(() => {
    if (!body || !Array.isArray(body)) return [];
    const list: { level: number; text: string; slug: string }[] = [];
    for (const block of body) {
      const b = block as { _type?: string; style?: string; children?: { text?: string }[] };
      if (b._type === "block" && (b.style === "h2" || b.style === "h3")) {
        const text =
          b.children?.map((c) => (c as { text?: string }).text).join("") ?? "";
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
          .replace(/^-|-$/g, "");
        list.push({
          level: b.style === "h2" ? 2 : 3,
          text,
          slug,
        });
      }
    }
    return list;
  }, [body]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="rounded-xl border p-4 sticky top-24"
      style={{
        backgroundColor: "var(--blanc-ivoire)",
        borderColor: "var(--or-brillant)",
      }}
    >
      <p
        className="font-display text-sm font-semibold mb-3"
        style={{ color: "var(--or-luxe)" }}
      >
        Sommaire
      </p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li
            key={h.slug}
            className={h.level === 3 ? "pl-3" : ""}
          >
            <a
              href={`#${h.slug}`}
              className="text-sm hover:underline"
              style={{ color: "var(--encre-douce)" }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
