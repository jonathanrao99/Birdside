import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/structured-data";
import { SEO_CONFIG } from "../../lib/seo";

/**
 * Emits BreadcrumbList + ItemList JSON-LD for any menu sub-page.
 *
 * @param {Object} props
 * @param {string} props.categoryName e.g. "Wings"
 * @param {string} props.categoryPath e.g. "/menu/wings"
 * @param {Array}  [props.items]      menu items (name, ingredients) for ItemList
 */
export default function MenuPageJsonLd({ categoryName, categoryPath, items = [] }) {
    const itemList = items.length
        ? {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: items.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: item.name,
                  description: item.ingredients,
                  url: `${SEO_CONFIG.baseUrl}${categoryPath}#${slug(item.name)}`,
              })),
          }
        : null;

    return (
        <JsonLd
            data={[
                breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Menu", path: "/menu" },
                    { name: categoryName, path: categoryPath },
                ]),
                itemList,
            ]}
        />
    );
}

function slug(s) {
    return String(s || "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}
