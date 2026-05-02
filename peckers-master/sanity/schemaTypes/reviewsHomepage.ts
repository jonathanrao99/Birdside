import { defineType, defineField } from "sanity";

export default defineType({
    name: "review",
    title: "Homepage — Community Voices (Reviews)",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Review Text",
            type: "text",
        }),
        defineField({
            name: "gradient",
            title: "Gradient",
            type: "string",
        }),
    ],
});