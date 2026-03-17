"use client";

import type { SanityPostListItem } from "@/types/sanity";
import ArticleCard from "./ArticleCard";

type RelatedArticlesProps = {
  posts: SanityPostListItem[];
};

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t" style={{ borderColor: "var(--or-brillant)" }}>
      <h2
        className="font-display text-2xl mb-6"
        style={{ color: "var(--encre-noire)" }}
      >
        Articles similaires
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
