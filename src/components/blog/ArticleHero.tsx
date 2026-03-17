"use client";

import Image from "next/image";
import type { SanityPost } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

type ArticleHeroProps = {
  post: SanityPost;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleHero({ post }: ArticleHeroProps) {
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;

  return (
    <header className="section-shell pb-8">
      <div className="mb-4 flex flex-wrap gap-2">
        {post.categories?.map((cat) => (
          <span
            key={cat._id}
            className="rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: "var(--or-brillant)",
              color: "var(--encre-noire)",
            }}
          >
            {cat.title}
          </span>
        ))}
      </div>
      <h1
        className="font-display text-4xl font-semibold md:text-5xl"
        style={{ color: "var(--encre-noire)" }}
      >
        {post.title}
      </h1>
      {post.titleAr && (
        <p className="mt-2 font-arabic text-2xl italic" style={{ color: "var(--or-luxe)" }}>
          {post.titleAr}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--encre-douce)" }}>
        <span>{post.author?.name ?? "Qalam"}</span>
        <span>{formatDate(post.publishedAt)}</span>
        {post.readingTime != null && <span>{post.readingTime} min de lecture</span>}
      </div>
      {post.excerpt && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--encre-douce)" }}>
          {post.excerpt}
        </p>
      )}
      {imageUrl && (
        <figure className="mt-8 overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            width={1200}
            height={630}
            className="w-full object-cover"
            priority
          />
        </figure>
      )}
    </header>
  );
}
