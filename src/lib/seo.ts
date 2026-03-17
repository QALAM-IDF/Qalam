import type { Metadata } from "next";
import type { SanityPost } from "@/types/sanity";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qalam.academy";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Qalam — Apprenez la langue arabe",
    template: "%s | Qalam",
  },
  description:
    "Qalam, école de langue arabe en ligne. Cours pour hommes, femmes et enfants. Tous niveaux, du débutant au coranique.",
  keywords: [
    "cours arabe",
    "apprendre arabe",
    "arabe en ligne",
    "tajwid",
    "coran",
    "langue arabe débutant",
  ],
  authors: [{ name: "Qalam" }],
  creator: "Qalam",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Qalam",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Qalam — Apprenez la langue arabe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qalam — Apprenez la langue arabe",
    description: "Cours d'arabe en ligne pour tous niveaux.",
  },
  robots: { index: true, follow: true },
};

export function courseJsonLd(course: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: course.url,
    provider: {
      "@type": "Organization",
      name: "Qalam",
      url: baseUrl,
    },
  };
}

export function articleJsonLd(post: SanityPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Qalam",
    },
    publisher: {
      "@type": "Organization",
      name: "Qalam",
      url: baseUrl,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Qalam",
    description: "École de langue arabe en ligne",
    url: baseUrl,
    email: "contact@qalam.academy",
    offers: [
      { "@type": "Offer", name: "Forfait Découverte", price: "120", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Forfait Essentiel", price: "299", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Forfait Intensif", price: "490", priceCurrency: "EUR" },
    ],
  };
}
