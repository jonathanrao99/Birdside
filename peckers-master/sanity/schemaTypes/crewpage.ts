export default {
    name: 'crewPage',
    title: 'Careers Page Content',
    type: 'document',
    fields: [
        // Landing Section
        {
            name: 'tagline',
            title: 'Landing Tagline',
            type: 'string',
        },
        {
            name: 'landingHeading1',
            title: 'Landing Heading Line 1',
            type: 'string',
        },
        {
            name: 'landingHeading2',
            title: 'Landing Heading Line 2',
            type: 'string',
        },
        // Crew Section
        {
            name: 'heading',
            title: 'Crew Section Heading',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Crew Section Description',
            type: 'text',
        },
        {
            name: 'crewMembers',
            title: 'Crew Members',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Member/Team Label',
                            type: 'string',
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
            ],
        },
        // Roles Section
        {
            name: 'rolesTitle',
            title: 'Roles Section Title',
            type: 'string',
        },
        {
            name: 'perks',
            title: 'Roles Perks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Perk Title',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Perk Description',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        // Apply Section
        {
            name: 'applyTitle',
            title: 'Apply Section Title',
            type: 'string',
        },
        {
            name: 'applySubtitle',
            title: 'Apply Section Subtitle',
            type: 'string',
        },
    ],
}
