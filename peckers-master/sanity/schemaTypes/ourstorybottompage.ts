import { defineType, defineField } from "sanity";

export default defineType({
    name: "ourStoryBottomPage",
    title: "Our Story Page — Secondary Content",
    type: "document",
    fields: [
        defineField({
            name: "journeySection",
            title: "Journey Section",
            type: "object",
            fields: [
                defineField({
                    name: "heading",
                    type: "string",
                }),
                defineField({
                    name: "subtitle",
                    type: "string",
                }),
                defineField({
                    name: "backgroundImage",
                    type: "image",
                }),
                defineField({
                    name: "timeline",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            fields: [
                                defineField({ name: "year", type: "string" }),
                                defineField({ name: "location", type: "string" }),
                            ],
                        },
                    ],
                }),
                defineField({
                    name: "whereNextHeading",
                    title: "Where Next Heading",
                    type: "string",
                    initialValue: "WHERE NEXT ?",
                }),
                defineField({
                    name: "whereNextPlaceholder",
                    title: "Where Next Placeholder",
                    type: "string",
                    initialValue: "Suggest a city...",
                }),
                defineField({
                    name: "whereNextButtonText",
                    title: "Where Next Button Text",
                    type: "string",
                    initialValue: "SUBMIT",
                }),
            ],
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
                                defineField({
                                    name: "borderStyle",
                                    title: "Border Style (e.g., border-solid border-zinc-800)",
                                    type: "string",
                                }),
                            ],
                        },
                    ],
                }),
            ],
        })
    ],
});