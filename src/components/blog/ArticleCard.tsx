"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SanityPostListItem } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

const categoryColorMap: Record<string, string> = {
  or: "var(--or-brillant)",
  desert: "var(--desert-ambre)",
  andalou: "var(--andalou-brique)",
  magie: "var(--magie-or)",
};

type ArticleCardProps = {
  post: SanityPostListItem;
  featured?: boolean;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const slug = post.slug?.current ?? "";
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(800).height(450).url()
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`overflow-hidden rounded-2xl border-2 transition-shadow hover:shadow-lg ${
        featured ? "md:flex" : ""
      }`}
      style={{
        backgroundColor: "var(--blanc-ivoire)",
        borderColor: "var(--beige-profond)",
        boxShadow: featured ? "0 20px 40px -16px rgba(0,0,0,0.12)" : undefined,
      }}
    >
      <Link href={`/blog/${slug}`} className={featured ? "md:flex md:w-full" : "block"}>
        <div
          className={`relative bg-[var(--encre-noire)] ${
            featured ? "md:w-1/2 md:min-h-[280px]" : "aspect-video"
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
              sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{ backgroundColor: "var(--or-luxe)" }}
            />
          )}
          {featured && (
            <span
              className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--or-brillant)",
                color: "var(--encre-noire)",
              }}
            >
              À la une
            </span>
          )}
        </div>
        <div className={`p-6 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories?.slice(0, 2).map((cat) => (
              <span
                key={cat._id}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: categoryColorMap[cat.color ?? "or"] ?? "var(--or-brillant)",
                  color: "var(--encre-noire)",
                }}
              >
                {cat.title}
              </span>
            ))}
          </div>
          <h2
            className={`font-display font-semibold line-clamp-2 ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
            style={{ color: "var(--encre-noire)" }}
          >
            {post.title}
          </h2>
          {post.titleAr && (
            <p
              className="mt-1 font-arabic text-lg italic"
              style={{ color: "var(--or-luxe)" }}
            >
              {post.titleAr}
            </p>
          )}
          {post.excerpt && (
            <p
              className="mt-2 line-clamp-3 text-sm leading-relaxed"
              style={{ color: "var(--encre-douce)" }}
            >
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3">
            {post.author?.image?.asset && (
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[var(--beige-profond)]">
                <Image
                  src={urlFor(post.author.image).width(64).height(64).url()}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <span className="text-sm" style={{ color: "var(--encre-douce)" }}>
              {post.author?.name ?? "Qalam"}
            </span>
            <span className="text-sm" style={{ color: "var(--encre-douce)" }}>
              · {formatDate(post.publishedAt)}
            </span>
            {post.readingTime != null && (
              <span className="text-sm" style={{ color: "var(--encre-douce)" }}>
                · {post.readingTime} min
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
