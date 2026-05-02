import { defineType, defineField } from "sanity";

export default defineType({
    name: "location",
    title: "Homepage Location Cards",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Location Name",
            type: "string",
        }),
        defineField({
            name: "subtitle",
            title: "Location Subtitle",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Location Image",
            type: "image",
            options: { hotspot: true },
        }),
    ],
});