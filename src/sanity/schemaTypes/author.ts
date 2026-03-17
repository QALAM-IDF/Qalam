import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "nameAr", title: "Nom (AR)", type: "string" }),
    defineField({ name: "bio", title: "Bio (FR)", type: "text", rows: 3 }),
    defineField({ name: "bioAr", title: "Bio (AR)", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
    }),
  ],
});
