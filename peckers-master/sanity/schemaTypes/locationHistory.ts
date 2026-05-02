import { defineField, defineType } from "sanity";

export default defineType({
    name: "locationHistory",
    title: "Location Detail — History Section",
    type: "document",
    fields: [
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            options: {
                list: [
                    { title: "Stevenage", value: "stevenage" },
                    { title: "Hitchin", value: "hitchin" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "established",
            title: "Established",
            type: "string",
        }),

        defineField({
            name: "historyText",
            title: "History Text",
            type: "text",
        }),
    ],
});