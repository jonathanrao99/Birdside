import { defineType, defineField } from "sanity";

export default defineType({
    name: "homepagePersonDetails",
    title: "Homepage Our Heritage (FOR THE LOVE OF CHICKEN)",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "buttonText",
            title: "Button Text",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Person Image",
            type: "image",
            options: { hotspot: true },
        }),
    ],
});