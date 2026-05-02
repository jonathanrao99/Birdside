import { sanityFetch } from "../../sanity/lib/live";
import HomePageClient from "./page-client";
import { fetchGoogleReviews } from "../lib/google-reviews";
import { urlFor } from "../../sanity/lib/image";
import { buildPageMetadata } from "../lib/seo";
import JsonLd from "../components/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  restaurantChainSchema,
} from "../lib/structured-data";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Peckers | Best Fried & Grilled Chicken in Stevenage & Hitchin",
    description:
      "Peckers is Hertfordshire's home of Seriously Good Chicken. Freshly fried and flame-grilled peri-peri chicken, gourmet burgers, crispy wings, and signature shakes in Stevenage and Hitchin.",
    keywords: [
      "best chicken near me",
      "best chicken in Stevenage",
      "best chicken in Hitchin",
      "best chicken in Hertfordshire",
      "peri peri chicken near me",
      "best peri peri in Hertfordshire",
      "fried chicken near me",
      "grilled chicken near me",
      "chicken takeaway near me",
      "chicken delivery near me",
      "best burger near me Hertfordshire",
      "where to eat near me Stevenage",
      "where to eat near me Hitchin",
      "chicken restaurant near me",
      "best wings near me",
      "food near me Hertfordshire",
      "Peckers chicken",
      "Seriously Good Chicken",
    ],
    path: "/",
  });
}


export default async function HomePage() {
  // Fetch homepage data on the server
  const { data: homepageData } = await sanityFetch({
    query: `*[_type == "homepage"] | order(_updatedAt desc)[0]{
        "videoUrl": heroVideo.asset->url,
        heroPoster,
        heroTitle,
        heroSubtitle,
        heroImage,
        locationsHeading,
        locationsSubtitle,
        journalHeading,
        journalSubtitle,
        journalCaption,
        ratingSection {
          heading,
          subheading,
          rating,
          totalReviews
        },
        signupSection {
          ...,
          backgroundImage
        }
    }`
  });

  // Fetch slider cards data on the server (for LatestNewsCards)
  const { data: sliderCards } = await sanityFetch({
    query: `*[_type == "sliderCard"] | order(order asc) {
    _id,
    title,
    image,
    order,
    caption
  }`
  });

  // Fetch locations data on the server (for CoopImages)
  const { data: locationsList } = await sanityFetch({
    query: `*[_type == "location"]{
    _id,
    name,
    image
  }`
  });

  // Fetch person details data on the server
  const { data: personDetails } = await sanityFetch({
    query: `*[_type == "homepagePersonDetails"][0] {
    heading,
    description,
    buttonText,
    image
  }`
  });

  // Fetch reviews data from Google
  const reviews = await fetchGoogleReviews();

  const aggregateRating =
    homepageData?.ratingSection?.rating && homepageData?.ratingSection?.totalReviews
      ? {
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          itemReviewed: { "@id": `https://www.peckerschicken.co.uk#restaurant` },
          ratingValue: homepageData.ratingSection.rating,
          reviewCount: homepageData.ratingSection.totalReviews,
        }
      : null;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          restaurantChainSchema(),
          aggregateRating,
        ]}
      />
      {homepageData?.videoUrl && (
        <>
          <link
            rel="preload"
            href={homepageData.videoUrl}
            as="video"
            type="video/mp4"
            // @ts-ignore
            fetchPriority="high"
          />
          {homepageData.heroPoster && (
            <link
              rel="preload"
              href={urlFor(homepageData.heroPoster).width(1920).quality(75).auto("format").url()}
              as="image"
              // @ts-ignore
              fetchPriority="high"
            />
          )}
        </>
      )}
      <HomePageClient
        initialHomepageData={homepageData}
        initialSliderCards={sliderCards}
        initialLocations={locationsList}
        initialPersonDetails={personDetails}
        initialReviews={reviews}
      />
    </>
  );
}
