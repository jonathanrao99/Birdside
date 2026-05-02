import { defineType, defineField } from "sanity";

export default defineType({
    name: "homepage",
    title: "Homepage — Main Hero Configuration",
    type: "document",
    fields: [
        defineField({ name: "heroTitle", type: "string" }),
        defineField({ name: "heroSubtitle", type: "text" }),
        defineField({ name: "heroImage", type: "image" }),
        defineField({
            name: "heroVideo",
            title: "Hero Background Video",
            type: "file",
            options: {
                accept: "video/*"
            }
        }),
        defineField({
            name: "heroPoster",
            title: "Hero Poster Image (Recommended)",
            type: "image",
            description: "Static image displayed while the video loads. Critical for performance and LCP.",
            options: { hotspot: true },
        }),
        defineField({ name: "locationsHeading", type: "string", title: "Locations Section Heading" }),
        defineField({ name: "locationsSubtitle", type: "text", title: "Locations Section Subtitle" }),
        defineField({ name: "journalHeading", type: "string", title: "Journal Section Heading" }),
        defineField({ name: "journalSubtitle", type: "text", title: "Journal Section Subtitle" }),
        defineField({ name: "journalCaption", type: "text", title: "Journal Section Caption (Below Cards)" }),
        defineField({
            name: "ratingSection",
            title: "Rating Section",
            type: "object",
            fields: [
                defineField({ name: "heading", type: "string" }),
                defineField({ name: "subheading", type: "text" }),
                defineField({ name: "rating", type: "number" }),
                defineField({ name: "totalReviews", type: "number" }),
            ],

        }),
        defineField({
            name: "signupSection",
            title: "Sign Up Section",
            type: "object",
            fields: [
                defineField({ name: "heading", type: "string" }),
                defineField({ name: "description", type: "text" }),
                defineField({ name: "subText", type: "text" }),
                defineField({ name: "buttonText", type: "string" }),
                defineField({
                    name: "backgroundImage",
                    type: "image",
                    options: { hotspot: true },
                }),
            ],
        }),
    ],
});