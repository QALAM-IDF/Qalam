import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id, title, titleAr, slug, excerpt, excerptAr,
    publishedAt, readingTime, featured, lang,
    mainImage { asset->, alt },
    categories[]->{ title, titleAr, slug, color },
    author->{ name, nameAr, image { asset-> } }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, titleAr, slug, excerpt, excerptAr,
    publishedAt, readingTime, lang,
    mainImage { asset->, alt },
    body, bodyAr,
    seo,
    categories[]->{ title, titleAr, slug, color },
    author->{ name, nameAr, bio, bioAr, role, image { asset-> } }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && $slug in categories[]->slug.current && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id, title, titleAr, slug, excerpt, publishedAt, readingTime, featured, lang,
    mainImage { asset->, alt },
    categories[]->{ title, titleAr, slug, color },
    author->{ name, image { asset-> } }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...3] {
    _id, title, titleAr, slug, excerpt, publishedAt, readingTime, lang,
    mainImage { asset->, alt },
    categories[]->{ title, slug, color }
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id, title, titleAr, slug, description, color
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $id && defined(publishedAt) && publishedAt <= now() && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc) [0...3] {
    _id, title, titleAr, slug, excerpt, publishedAt, readingTime, lang,
    mainImage { asset->, alt },
    categories[]->{ title, slug, color }
  }
`;
