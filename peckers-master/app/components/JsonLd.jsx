/**
 * Renders one or more JSON-LD blocks. Pass either a single object or an array.
 */
export default function JsonLd({ data }) {
    if (!data) return null;
    const items = Array.isArray(data) ? data : [data];
    return (
        <>
            {items.map((item, i) =>
                item ? (
                    <script
                        key={i}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                    />
                ) : null,
            )}
        </>
    );
}
