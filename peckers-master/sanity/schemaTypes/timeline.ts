import { defineType, defineField } from 'sanity'

export default defineType({
    name: "timeline",
    title: "Our Story Page — Heritage Timeline",
    type: "document",
    fields: [
        defineField({
            name: "year",
            title: "Year",
            type: "string",
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "highlight",
            title: "Highlight",
            type: "boolean",
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
            description: "The order in which the timeline point appears."
        })
    ],
});
