import Link from "next/link";
import type { Metadata } from "next";
import { client, hasSanityConfig } from "@/sanity/lib/client";
import {
  allPostsQuery,
  allCategoriesQuery,
  featuredPostsQuery,
} from "@/sanity/lib/queries";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import ArticleCard from "@/components/blog/ArticleCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import type { SanityPostListItem } from "@/types/sanity";
import type { SanityCategory } from "@/types/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Le Blog Qalam",
  description:
    "Conseils, culture, grammaire et témoignages pour accompagner votre apprentissage de l'arabe.",
  openGraph: {
    title: "Le Blog Qalam | Qalam",
    description: "Conseils et articles pour apprendre l'arabe.",
  },
};

export default async function BlogPage() {
  const [posts, categories, featured] = hasSanityConfig
    ? await Promise.all([
        client.fetch<SanityPostListItem[]>(allPostsQuery),
        client.fetch<SanityCategory[]>(allCategoriesQuery),
        client.fetch<SanityPostListItem[]>(featuredPostsQuery),
      ])
    : [[], [], []];

  const featuredFirst = featured?.[0];

  return (
    <main id="main-content" className="overflow-hidden bg-[var(--beige-creme)] pt-20">
      <section className="section-shell pt-12 pb-16 text-center grain-overlay">
        <p
          className="font-arabic text-3xl mb-2"
          style={{ color: "var(--or-luxe)" }}
        >
          المدونة
        </p>
        <h1
          className="font-display text-5xl mb-4"
          style={{ color: "var(--encre-noire)" }}
        >
          Le Blog Qalam
        </h1>
        <p
          className="font-body text-lg max-w-xl mx-auto"
          style={{ color: "var(--encre-douce)" }}
        >
          Conseils, culture, grammaire et témoignages pour accompagner votre
          apprentissage de l&apos;arabe.
        </p>
        <CalligraphyDivider className="mx-auto mt-6 w-48" />
      </section>

      {featuredFirst && (
        <section className="section-shell py-8">
          <ArticleCard post={featuredFirst} featured />
        </section>
      )}

      <section className="section-shell pb-6">
        <CategoryFilter categories={categories ?? []} posts={posts ?? []} />
      </section>

      <section className="section-shell pb-20 text-center">
        <CalligraphyDivider className="mx-auto w-32 mb-8" />
        <Link
          href="/"
          className="font-display text-lg"
          style={{ color: "var(--or-luxe)" }}
        >
          ← Retour à l&apos;accueil
        </Link>
      </section>
    </main>
  );
}
