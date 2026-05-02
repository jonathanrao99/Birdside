import { defineType, defineField } from "sanity"

export default defineType({
    name: "uniquenessSubSection",
    title: "Peckers Standard — Detail Sections",
    type: "document",

    fields: [
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [

                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string"
                        }),

                        defineField({
                            name: "previewText",
                            title: "Preview Text",
                            type: "text"
                        }),

                        defineField({
                            name: "expandedText",
                            title: "Expanded Text",
                            type: "text"
                        }),

                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true }
                        }),

                        defineField({
                            name: "video",
                            title: "Video",
                            type: "file",
                            options: {
                                accept: "video/*"
                            }
                        })

                    ]
                }
            ]
        })
    ]
})