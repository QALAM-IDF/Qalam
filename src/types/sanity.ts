export type SanityCategory = {
  _id: string;
  title: string;
  titleAr?: string;
  slug: { current: string };
  description?: string;
  color?: string;
};

export type SanityAuthor = {
  name: string;
  nameAr?: string;
  bio?: string;
  bioAr?: string;
  role?: string;
  image?: { asset?: { _ref?: string; url?: string } };
};

export type SanityPost = {
  _id: string;
  title: string;
  titleAr?: string;
  slug: { current: string };
  excerpt?: string;
  excerptAr?: string;
  publishedAt?: string;
  readingTime?: number;
  featured?: boolean;
  lang?: string;
  mainImage?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
  body?: unknown;
  bodyAr?: unknown;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset?: { _ref?: string } };
  };
  categories?: SanityCategory[];
  author?: SanityAuthor;
};

export type SanityPostListItem = Pick<
  SanityPost,
  | "_id"
  | "title"
  | "titleAr"
  | "slug"
  | "excerpt"
  | "excerptAr"
  | "publishedAt"
  | "readingTime"
  | "featured"
  | "lang"
  | "mainImage"
  | "categories"
  | "author"
>;
