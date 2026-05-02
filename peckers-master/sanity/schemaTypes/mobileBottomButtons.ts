import { defineType, defineField } from "sanity";

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "logo",
            title: "Navigation Logo",
            type: "image",
            description: "Main logo shown in the navbar.",
            options: { hotspot: true },
        }),
        defineField({
            name: "clickCollectUrl",
            title: "Click & Collect URL",
            type: "url",
        }),
        defineField({
            name: "deliveryUrl",
            title: "Delivery URL",
            type: "url",
        }),
        defineField({
            name: "siteTitle",
            title: "Site Title",
            type: "string",
        }),
        defineField({
            name: "siteDescription",
            title: "Site Description",
            type: "text",
        }),
    ],
});