import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Peckers Careers | Join the Team",
        description:
            "Join the Peckers family in Stevenage and Hitchin. We're looking for passionate people to join our kitchen and front-of-house teams. Apply today.",
        keywords: [
            "jobs in Stevenage",
            "Hitchin restaurant careers",
            "Peckers chicken jobs",
            "hospitality careers",
            "working at Peckers",
            "food service jobs Hertfordshire",
            "local restaurant vacancies",
            "kitchen jobs Hertfordshire",
        ],
        path: "/careers",
    });
}


export default function CareersLayout({ children }) {
    return <>{children}</>;
}
