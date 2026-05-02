import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'saucePage',
    title: 'House-made Sauces Page',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'descLine1',
            title: 'Description Line 1',
            type: 'string'
        }),
        defineField({
            name: 'descLine2',
            title: 'Description Line 2',
            type: 'string'
        }),
        defineField({
            name: 'cal',
            title: 'Calories',
            type: 'string'
        }),
        defineField({
            name: 'protein',
            title: 'Protein (g)',
            type: 'string'
        }),
        defineField({
            name: 'carbs',
            title: 'Carbs (g)',
            type: 'string'
        }),
        defineField({
            name: 'fat',
            title: 'Fat (g)',
            type: 'string'
        }),
        defineField({
            name: 'bgImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'sauceImage',
            title: 'Sauce Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [{ type: 'string' }]
        })
    ]
})
