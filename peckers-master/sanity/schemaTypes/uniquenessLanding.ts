import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'uniquenessLanding',
    title: 'Peckers Standard — Landing Section',
    type: 'document',

    fields: [

        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true }
        }),

        defineField({
            name: 'gradientImage',
            title: 'Gradient Overlay',
            type: 'image',
            options: { hotspot: true }
        }),

        defineField({
            name: 'titleLine1',
            title: 'Title Line 1',
            type: 'string'
        }),

        defineField({
            name: 'titleLine2',
            title: 'Title Line 2',
            type: 'string'
        }),

        defineField({
            name: 'titleHighlight',
            title: 'Highlighted Title',
            type: 'string'
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })

    ]
})