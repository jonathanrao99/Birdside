import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'enquiriesSection',
    title: 'Location Detail — Enquiries Section',
    type: 'document',
    fields: [
        defineField({
            name: 'locationName',
            title: 'Location Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'locationName' },
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'events',
            title: 'Event Types',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                    ]
                }
            ]
        }),

        defineField({
            name: 'formFields',
            title: 'Form Fields',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string'
                        },
                        {
                            name: 'placeholder',
                            title: 'Placeholder',
                            type: 'string'
                        },
                        {
                            name: 'type',
                            title: 'Input Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Text', value: 'text' },
                                    { title: 'Number', value: 'number' },
                                    { title: 'Date', value: 'date' },
                                    { title: 'Time', value: 'time' },
                                    { title: 'Textarea', value: 'textarea' }
                                ]
                            }
                        }
                    ],
                    name: 'formField'
                })
            ]
        }),
        defineField({
            name: 'buttonText',
            title: 'Submit Button Text',
            type: 'string'
        })
    ]
})
