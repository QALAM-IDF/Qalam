import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { articleJsonLd } from "@/lib/seo";
import ArticleHero from "@/components/blog/ArticleHero";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedArticles from "@/components/blog/RelatedArticles";
import type { SanityPost } from "@/types/sanity";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!post) return { title: "Article | Qalam" };

  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!post) notFound();

  const categorySlugs =
    post.categories?.map((c) => c.slug?.current).filter(Boolean) ?? [];
  const related = await client.fetch<SanityPost[]>(relatedPostsQuery, {
    id: post._id,
    categorySlugs,
  });

  const isAr = post.lang === "ar";
  const body = isAr && post.bodyAr ? post.bodyAr : post.body;

  return (
    <main className="min-h-screen bg-[var(--beige-creme)] pt-20">
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)),
        }}
        strategy="afterInteractive"
      />

      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <ArticleHero post={post} />
            <div className="mt-10">
              <PortableTextRenderer
                value={Array.isArray(body) ? body : []}
                dir={isAr ? "rtl" : "ltr"}
              />
            </div>
            <RelatedArticles posts={related ?? []} />
          </div>
          <aside className="order-first lg:order-last">
            <TableOfContents body={post.body as unknown[]} />
            {post.author && (
              <div
                className="mt-8 rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--blanc-ivoire)",
                  borderColor: "var(--or-brillant)",
                }}
              >
                <p
                  className="font-display text-sm font-semibold mb-2"
                  style={{ color: "var(--or-luxe)" }}
                >
                  Auteur
                </p>
                <p
                  className="font-display text-lg"
                  style={{ color: "var(--encre-noire)" }}
                >
                  {post.author.name}
                </p>
                {post.author.role && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--encre-douce)" }}
                  >
                    {post.author.role}
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
