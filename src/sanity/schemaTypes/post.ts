import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "lang",
      title: "Langue",
      type: "string",
      options: {
        list: [
          { title: "Français", value: "fr" },
          { title: "Arabe", value: "ar" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Titre (FR)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé (FR)",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "titleAr", title: "Titre (AR)", type: "string" }),
    defineField({
      name: "excerptAr",
      title: "Résumé (AR)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "body",
      title: "Contenu (FR)",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "arabicWord",
          title: "Mot arabe encadré",
          fields: [
            { name: "arabic", title: "Mot arabe", type: "string" },
            {
              name: "transliteration",
              title: "Translittération",
              type: "string",
            },
            { name: "translation", title: "Traduction", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "bodyAr",
      title: "Contenu (AR)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta titre",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "ogImage",
          title: "Image Open Graph",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Article mis en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "readingTime",
      title: "Temps de lecture (min)",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `Par ${author}` : "",
        media,
      };
    },
  },
});
