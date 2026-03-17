import type { MetadataRoute } from "next";
import { client, hasSanityConfig } from "@/sanity/lib/client";
import { allPostSlugsQuery } from "@/sanity/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = hasSanityConfig
    ? await client.fetch<{ slug: string }[]>(allPostSlugsQuery).catch(() => [])
    : [];

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/hommes",
    "/femmes",
    "/enfants",
    "/tarifs",
    "/blog",
    "/a-propos",
    "/connexion",
    "/inscription",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
