import React from "react";
import CareersLandingPage from "./CareersLandingPage";
import CrewPage from "./CrewPage";
import RolesWithPeckers from "./RolesWithPeckers";
import ApplyDetailsPage from "./ApplyDetailsPage";
import { sanityFetch } from "../../sanity/lib/live";
import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Peckers Careers | Join the Crew",
        description:
            "Looking for a career in food? Join the Peckers crew in Hertfordshire. Explore our kitchen and front-of-house roles and apply today.",
        keywords: [
            "Peckers careers",
            "chicken restaurant jobs",
            "kitchen jobs Stevenage",
            "kitchen jobs Hitchin",
            "front of house jobs Hertfordshire",
            "Peckers crew",
            "hospitality jobs UK",
            "restaurant careers",
        ],
        path: "/careers",
    });
}


export default async function CareersPage() {
    let careersData = null;

    try {
        const { data } = await sanityFetch({
            query: `*[_type == "crewPage"][0]{
            tagline,
            landingHeading1,
            landingHeading2,
            heading,
            description,
            crewMembers[] {
                label,
                image {
                    asset->{
                        _id,
                        url
                    }
                }
            },
            rolesTitle,
            perks[] {
                title,
                description
            },
            applyTitle,
            applySubtitle
        }`
        });
        careersData = data;
    } catch (error) {
        console.error("Sanity fetch failed on Careers page:", error);
    }

    return (
        <div id="main-content">
            <CareersLandingPage initialData={careersData} />
            {/* <RolesWithPeckers initialData={careersData} /> */}
            <ApplyDetailsPage initialData={careersData} />
        </div>
    );
}
