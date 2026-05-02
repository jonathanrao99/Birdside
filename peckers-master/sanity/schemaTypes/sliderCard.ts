import { defineType, defineField } from "sanity";

export default defineType({
    name: "sliderCard",
    title: "Homepage Slider Cards",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Card Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
        defineField({
            name: "caption",
            title: "Caption",
            type: "text",
            rows: 3,
        }),
    ],
});