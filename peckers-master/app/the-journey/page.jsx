
import { sanityFetch } from "../../sanity/lib/live";
import TheJourneyPageClient from "./page-client";
import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Our Story | The Peckers Journey",
        description:
            "From a community legacy in Hitchin to Hertfordshire's favourite chicken restaurant. The story behind Peckers - two brothers, one mission, Seriously Good Chicken.",
        keywords: [
            "Peckers story",
            "Peckers Hitchin origin",
            "about Peckers chicken",
            "community chicken brand Hitchin",
            "independent chicken restaurant story",
            "family chicken restaurant Hertfordshire",
            "Peckers founders",
            "best chicken brand UK story",
            "who are Peckers",
        ],
        path: "/the-journey",
    });
}


export default async function TheJourneyPage() {
    let storyData = {
        pageData: {
            heading: "THE PECKERS JOURNEY",
            subtitle: "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES",
            timeline: [],
            slides: [
                {
                    heading: "A FAMILY LEGACY, REIMAGINED",
                    subHeading: "From Grandad’s 1978 off-license to the launch of Peckers. We’ve brought our family spirit full circle, building a modern brand on the same spot where it all began.",
                    content: [
                        "Our story doesn’t start with a recipe, it starts with a neighbourhood.",
                        "While we lived nearby in Hitchin, we spent much of our childhood at our grandad’s off-licence in Westmill. We grew up playing in the park next door and bringing him dinner during his shifts.",
                        "That shop was more than a business to our family; it was a local landmark, and the customers were familiar faces we saw year after year. We watched our grandad treat everyone who walked through the door with genuine respect, building a reputation where neighbours still ask after him fondly decades later.",
                        "Growing up around that counter shaped how we see the world. Our grandad and our father taught us that if you 'Look after your customers and stand by your principles, the business side will take care of itself.' We learned early on that being a local business owner means more than just a transaction; it’s about being a familiar face on the corner.",
                        "These principles weren't just lessons from the past; they became our lifeline when our community faced its biggest challenge yet."
                    ],
                    quote: "This wasn’t built in a boardroom. It was built by showing up, every day.",
                    storyImages: []
                },
                {
                    heading: "A FAMILY LEGACY, REIMAGINED",
                    subHeading: "From Grandad’s 1978 off-license to the launch of Peckers. We’ve brought our family spirit full circle, building a modern brand on the same spot where it all began.",
                    content: [
                        "In March 2020, during the height of the COVID-19 pandemic, the world went into lockdown, but the needs of our community didn't stop. While everyone stayed inside, we knew we couldn't just sit behind a counter.",
                        "We remember it clearly, a phone call from an elderly lady who was upset and worried. She had no family nearby and hadn't been able to get a supermarket delivery for days. Even though she lived 30 minutes away, we loaded the car and went to her.",
                        "That one delivery sparked something much bigger. Soon, we were delivering groceries all over the area, and the operation grew so quickly that the whole community began volunteering to help us drop off food. It was never about creating extra business or revenue, it was about helping our neighbours when they had no one else to turn to.",
                        "It is incredible to look back and realise that those deliveries during COVID-19 are the very reason we were able to bring Peckers to life. Because we supported the community in their time of need, the council saw our dedication and gave us the chance to open our doors. We didn't just buy a site, we earned a place in the heart of Hitchin, Westmill, and the surrounding areas, through years of mutual support and trust.",
                        "With the community's blessing and our family's values as our compass, we decided to turn our lifelong passion into a new kind of neighbourhood landmark."
                    ],
                    quote: "Community first has always been our north star.",
                    storyImages: []
                },
                {
                    heading: "A FAMILY LEGACY, REIMAGINED",
                    subHeading: "From Grandad’s 1978 off-license to the launch of Peckers. We’ve brought our family spirit full circle, building a modern brand on the same spot where it all began.",
                    content: [
                        "Transitioning from grocery stores to the world of food took us out of our comfort zone, but our passion made the journey easy. For cultural reasons, we grew up only eating chicken and lamb. This lifelong connection to chicken, combined with a genuine love for business, led us to spot a gap in the market for a high-quality, quick-serve restaurant that didn't compromise on service.",
                        "Opening Peckers Hitchin in 2023 was a surreal, 'full circle' moment. Standing on the same spot where our grandfather started his shop over 50 years ago, we realised that while the product has changed, the mission hasn't. As we look toward 2026 and our dream of taking Peckers across the UK, we promise to keep that family-run feel alive.",
                        "We aren't a faceless chain; we are two brothers who complement each other and treat every customer like a neighbour."
                    ],
                    quote: "The same corner, a new offer, the same heart.",
                    storyImages: []
                }
            ]
        },
        bottomPageData: {
            journeySection: {
                heading: "THE PECKERS JOURNEY",
                subtitle: "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES",
                timeline: [
                    { year: "2021", location: "THE BEGINNING" },
                    { year: "2022", location: "EXPANDING" }
                ],
                whereNextHeading: "WHERE NEXT ?",
                whereNextPlaceholder: "Suggest a city...",
                whereNextButtonText: "SUBMIT"
            }
        },
        bottomTimeline: []
    };

    try {
        // Fetch all story related data on the server with a timeout protection
        const { data: fetchedData } = await sanityFetch({
            query: `{
            "pageData": *[_type == "ourStoryPage"][0]{
                heading,
                content,
                quote,
                founderImage {
                    asset->{
                        _id,
                        url
                    }
                },
                storyImages[] {
                    ...,
                    asset->{
                        _id,
                        url
                    }
                },
                slides[] {
                    heading,
                    subHeading,
                    content,
                    quote,
                    storyImages[] {
                        ...,
                        asset->{
                            _id,
                            url
                        }
                    }
                },
                circleSectionHeading,
                establishedYear,
                timeline
            },
            "bottomPageData": *[_type == "ourStoryBottomPage"][0]{
                journeySection,
                mobileRoadmap
            },
            "bottomTimeline": *[_type == "timeline"] | order(order asc)
        }`
        });

        if (fetchedData) {
            storyData = fetchedData;
        }
    } catch (error) {
        console.error("Sanity fetch failed on Journey page:", error);
    }


    return <TheJourneyPageClient initialStoryData={storyData} />;
}

