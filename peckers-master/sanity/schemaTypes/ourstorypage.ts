import { defineType, defineField } from "sanity";

export default defineType({
    name: "ourStoryPage",
    title: "Our Story Page — Primary Content",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: "Main Heading",
            type: "string",
        }),

        defineField({
            name: "content",
            title: "Story Paragraphs",
            type: "array",
            of: [{ type: "text" }],
        }),

        defineField({
            name: "quote",
            title: "Highlighted Quote",
            type: "string",
        }),

        defineField({
            name: "founderImage",
            title: "Founder Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "storyImages",
            title: "Story Images (Optional, for auto-slide)",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "description",
                            type: "string",
                            title: "Image Description",
                        },
                    ],
                }
            ],
        }),
        defineField({
            name: "slides",
            title: "Story Slides",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "slide",
                    fields: [
                        defineField({
                            name: "heading",
                            title: "Heading",
                            type: "string",
                        }),
                        defineField({
                            name: "subHeading",
                            title: "Sub-headline",
                            type: "string",
                        }),
                        defineField({
                            name: "content",
                            title: "Body text",
                            description: "Multiple paragraphs for the slide body.",
                            type: "array",
                            of: [{ type: "text" }],
                        }),
                        defineField({
                            name: "quote",
                            title: "Highlighted quote",
                            type: "string",
                        }),
                        defineField({
                            name: "storyImages",
                            title: "Story Images",
                            type: "array",
                            of: [
                                {
                                    type: "image",
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: "description",
                                            type: "string",
                                            title: "Image Description",
                                        },
                                    ],
                                }
                            ],
                        }),
                    ],
                }
            ],
        }),
        defineField({
            name: "circleSectionHeading",
            title: "Circle Section Heading",
            type: "string",
        }),
        defineField({
            name: "establishedYear",
            title: "Established Year",
            type: "string",
        }),
        defineField({
            name: "timeline",
            title: "Timeline",
            type: "array",
            of: [
                {
                    type: "object",
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
                            title: "Highlight this card?",
                            type: "boolean",
                        }),
                        defineField({
                            name: "borderStyle",
                            title: "Border Style (e.g., border-dashed border-zinc-700)",
                            type: "string",
                        }),
                        defineField({
                            name: "mobileRoadmap",
                            title: "Mobile Roadmap Section",
                            type: "object",
                            fields: [
                                defineField({
                                    name: "heading",
                                    type: "string",
                                }),
                                defineField({
                                    name: "estYear",
                                    type: "string",
                                }),
                                defineField({
                                    name: "timeline",
                                    type: "array",
                                    of: [
                                        {
                                            type: "object",
                                            fields: [
                                                defineField({ name: "year", type: "string" }),
                                                defineField({ name: "title", type: "string" }),
                                                defineField({ name: "description", type: "text" }),
                                                defineField({ name: "highlight", type: "boolean" }),
                                            ],
                                        },
                                    ],
                                }),
                            ],
                        })
                    ],
                },
            ],
        })
    ],
});