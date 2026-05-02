import { defineType, defineField } from "sanity";

export default defineType({
    name: "footer",
    title: "Global — Site Footer",
    type: "document",
    fields: [

        defineField({
            name: "logo",
            title: "Main Logo",
            type: "image",
        }),

        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),

        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "object",
            fields: [
                { name: "instagram", type: "url" },
                { name: "facebook", type: "url" },
                { name: "twitter", type: "url" },
            ],
        }),

        defineField({
            name: "quickLinks",
            title: "Quick Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "url", type: "string" },
                    ],
                },
            ],
        }),

        defineField({
            name: "locations",
            title: "Locations",
            type: "array",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "legalLinks",
            title: "Legal Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "url", type: "string" },
                    ],
                },
            ],
        }),

        defineField({
            name: "copyright",
            title: "Copyright Text",
            type: "string",
        }),

        defineField({
            name: "bottomLogo",
            title: "Bottom Logo",
            type: "image",
        }),
    ],
});