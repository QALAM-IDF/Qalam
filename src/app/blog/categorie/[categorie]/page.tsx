import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  postsByCategoryQuery,
  allCategoriesQuery,
} from "@/sanity/lib/queries";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";
import ArticleGrid from "@/components/blog/ArticleGrid";
import type { SanityPostListItem } from "@/types/sanity";
import type { SanityCategory } from "@/types/sanity";

type Props = {
  params: Promise<{ categorie: string }>;
};

export const revalidate = 3600;

export default async function BlogCategoriePage({ params }: Props) {
  const { categorie } = await params;
  const [posts, categories] = await Promise.all([
    client.fetch<SanityPostListItem[]>(postsByCategoryQuery, { slug: categorie }),
    client.fetch<SanityCategory[]>(allCategoriesQuery),
  ]);

  const currentCategory = categories?.find(
    (c) => c.slug?.current === categorie
  );
  if (!currentCategory && (categories?.length ?? 0) > 0) notFound();

  return (
    <main className="min-h-screen bg-[var(--beige-creme)] pt-20">
      <section className="section-shell py-12">
        <p
          className="font-arabic text-2xl mb-2"
          style={{ color: "var(--or-luxe)" }}
        >
          {currentCategory?.titleAr ?? "المدونة"}
        </p>
        <h1
          className="font-display text-4xl mb-4"
          style={{ color: "var(--encre-noire)" }}
        >
          {currentCategory?.title ?? categorie}
        </h1>
        {currentCategory?.description && (
          <p
            className="max-w-2xl text-lg"
            style={{ color: "var(--encre-douce)" }}
          >
            {currentCategory.description}
          </p>
        )}
        <CalligraphyDivider className="mt-6 w-48" />
      </section>

      <section className="section-shell pb-20">
        <ArticleGrid posts={posts ?? []} />
        <div className="mt-12">
          <Link
            href="/blog"
            className="font-display text-lg"
            style={{ color: "var(--or-luxe)" }}
          >
            ← Tous les articles
          </Link>
        </div>
      </section>
    </main>
  );
}
