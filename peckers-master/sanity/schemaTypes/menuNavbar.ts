import { defineType, defineField } from "sanity";

export default defineType({
    name: "menuNavbar",
    title: "Menu Page — Category Navigation",
    type: "document",
    fields: [
        defineField({
            name: "menuItems",
            title: "Menu Items",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string", title: "Title" },
                        { name: "link", type: "string", title: "Target URL/ID (e.g. #burgers)", initialValue: "#" },
                        { name: "isActive", type: "boolean", title: "Is Active?", initialValue: false }
                    ]
                }
            ]
        })
    ]
});
