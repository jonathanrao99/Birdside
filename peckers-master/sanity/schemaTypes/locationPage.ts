import { defineType, defineField } from "sanity";

export default defineType({
    name: "locationpage",
    title: "Find Us (Main Page) Content",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Location Name (e.g. Hitchin, Stevenage)",
            type: "string",
            description: "Used to identify this document. Ensure the slug matches the URL.",
        }),
        defineField({
            name: "slug",
            title: "Identifier Slug",
            type: "slug",
            description: "CRITICAL: Must be 'hitchin' or 'stevenage' to match the website pages.",
            options: { source: "name" },
        }),
        defineField({
            name: "established",
            title: "Established Year Text",
            type: "string",
            initialValue: "EST. 2024",
        }),
        defineField({
            name: "heroVideo",
            title: "Hero Background Video (Premium Upload)",
            type: "file",
            description: "Upload a high-quality .mp4 loop here.",
            options: {
                accept: "video/*"
            }
        }),
        defineField({
            name: "heroVideoUrl",
            title: "Alternative Video URL (External)",
            type: "url",
            description: "Only use if not uploading a file above.",
        }),
        defineField({
            name: "heroPoster",
            title: "Hero Poster Image (Recommended)",
            type: "image",
            description: "Static image shown while the video is loading. Critical for performance and LCP.",
            options: { hotspot: true },
        }),
        defineField({
            name: "logo",
            title: "Location Specific Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "historyTitle",
            title: "History Section Title",
            type: "string",
            initialValue: "HISTORY",
        }),
        defineField({
            name: "historyDescription",
            title: "Detailed History Text",
            type: "text",
            description: "Overwrites the default fallback text in the code.",
        }),

    ],
});