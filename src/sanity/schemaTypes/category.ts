import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre (FR)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "titleAr", title: "Titre (AR)", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Couleur",
      type: "string",
      options: {
        list: [
          { title: "Doré", value: "or" },
          { title: "Désert", value: "desert" },
          { title: "Andalou", value: "andalou" },
          { title: "Magie", value: "magie" },
        ],
      },
    }),
  ],
});
