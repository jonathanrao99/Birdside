import { defineType, defineField } from "sanity";

export default defineType({
    name: "mapSection",
    title: "Location Detail — Map & Address",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Location Name",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" },
        }),
        defineField({
            name: "address",
            title: "Address",
            type: "text",
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
        }),
        defineField({
            name: "hours",
            title: "Opening Hours",
            type: "text",
        }),
        defineField({
            name: "mapEmbed",
            title: "Google Map Embed URL",
            type: "url",
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
    ],
});