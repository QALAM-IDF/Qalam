"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SanityCategory } from "@/types/sanity";
import ArticleGrid from "./ArticleGrid";
import type { SanityPostListItem } from "@/types/sanity";

const categoryColorMap: Record<string, string> = {
  or: "var(--or-brillant)",
  desert: "var(--desert-ambre)",
  andalou: "var(--andalou-brique)",
  magie: "var(--magie-or)",
};

type CategoryFilterProps = {
  categories: SanityCategory[];
  posts: SanityPostListItem[];
};

export default function CategoryFilter({ categories, posts }: CategoryFilterProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filteredPosts =
    activeSlug == null
      ? posts
      : posts.filter((p) =>
          p.categories?.some((c) => c.slug?.current === activeSlug)
        );

  return (
    <div>
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:flex-nowrap">
        <button
          type="button"
          onClick={() => setActiveSlug(null)}
          className="shrink-0 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: activeSlug === null ? "var(--or-brillant)" : "var(--blanc-ivoire)",
            borderColor: "var(--or-brillant)",
            color: activeSlug === null ? "var(--encre-noire)" : "var(--encre-douce)",
          }}
        >
          Tous
        </button>
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug?.current;
          const bgColor = categoryColorMap[cat.color ?? "or"] ?? "var(--or-brillant)";
          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => setActiveSlug(cat.slug?.current ?? null)}
              className="shrink-0 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? bgColor : "var(--blanc-ivoire)",
                borderColor: bgColor,
                color: isActive ? "var(--encre-noire)" : "var(--encre-douce)",
              }}
            >
              {cat.title}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <ArticleGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
