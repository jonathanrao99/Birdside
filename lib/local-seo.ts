import { GOOGLE_MAPS_URL, ORDER_NOW_URL, footerSocialLinks } from "@/lib/site-shell-data";
import type { OurMenuData } from "@/lib/our-menu-types";
import { getSiteUrl } from "@/lib/site-url";

export const LOCAL_BUSINESS = {
  name: "Birdside HTX",
  legalName: "Birdside HTX",
  description:
    "Birdside HTX serves Houston hot chicken, wings, sandos, sides, and sauces in Katy, TX, open late seven days a week.",
  phone: "+18328738528",
  displayPhone: "(832) 873-8528",
  email: "hello@birdsidehtx.com",
  streetAddress: "1989 N Fry Rd",
  addressLocality: "Katy",
  addressRegion: "TX",
  postalCode: "77449",
  addressCountry: "US",
  latitude: 29.795342875050014,
  longitude: -95.72206822445575,
  priceRange: "$$",
  servesCuisine: [
    "Hot Chicken",
    "Chicken Wings",
    "Nashville Hot Chicken",
    "Sandos",
    "American"
  ],
  areaServed: ["Katy", "Houston", "Greater Houston", "West Houston"],
  hoursText: "Open 7 days a week, 5PM - 12:30AM",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:00",
      closes: "00:30"
    }
  ],
  mapsUrl: GOOGLE_MAPS_URL,
  orderUrl: ORDER_NOW_URL,
  logoPath: "/assets/brand/birdside-logo.png",
  imagePath: "/assets/home/hero-wings-tray.jpg",
  ogImagePath: "/assets/home/template-hero-bg.webp"
} as const;

export const BIRDSIDE_FAQS = [
  {
    question: "Where is Birdside HTX located?",
    answer:
      "Birdside HTX is located at 1989 N Fry Rd, Katy, TX 77449, serving Katy, West Houston, and the Greater Houston area."
  },
  {
    question: "What are Birdside HTX hours?",
    answer: "Birdside HTX is open seven days a week from 5PM to 12:30AM."
  },
  {
    question: "Can I order Birdside HTX online?",
    answer:
      "Yes. You can order Birdside HTX online for pickup through the Order Now link on the website."
  },
  {
    question: "What does Birdside HTX serve?",
    answer:
      "Birdside HTX serves Houston hot chicken, Nashville-style sandos, crispy wings, tenders, loaded fries, mac and cheese, slaw, drinks, and house sauces."
  },
  {
    question: "Does Birdside HTX offer catering?",
    answer:
      "Yes. Birdside HTX offers catering for events in Katy and Houston. Use the catering or contact page to start a catering request."
  },
  {
    question: "How spicy is Birdside HTX hot chicken?",
    answer:
      "Birdside HTX is built for big Houston flavor, with hot chicken, wings, and sauces for different heat levels and cravings."
  },
  {
    question: "Where can I find allergen information?",
    answer:
      "Visit the allergen information page or contact Birdside HTX directly before ordering if you have food allergies or dietary concerns."
  }
] as const;

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, getSiteUrl()).toString();
}

export function buildRestaurantJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FastFoodRestaurant"],
    "@id": `${siteUrl}/#restaurant`,
    name: LOCAL_BUSINESS.name,
    legalName: LOCAL_BUSINESS.legalName,
    url: siteUrl,
    description: LOCAL_BUSINESS.description,
    telephone: LOCAL_BUSINESS.phone,
    email: LOCAL_BUSINESS.email,
    priceRange: LOCAL_BUSINESS.priceRange,
    logo: absoluteUrl(LOCAL_BUSINESS.logoPath),
    image: absoluteUrl(LOCAL_BUSINESS.imagePath),
    hasMap: LOCAL_BUSINESS.mapsUrl,
    sameAs: footerSocialLinks.map((link) => link.href),
    servesCuisine: LOCAL_BUSINESS.servesCuisine,
    areaServed: LOCAL_BUSINESS.areaServed.map((name) => ({
      "@type": "City",
      name
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCAL_BUSINESS.streetAddress,
      addressLocality: LOCAL_BUSINESS.addressLocality,
      addressRegion: LOCAL_BUSINESS.addressRegion,
      postalCode: LOCAL_BUSINESS.postalCode,
      addressCountry: LOCAL_BUSINESS.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCAL_BUSINESS.latitude,
      longitude: LOCAL_BUSINESS.longitude
    },
    openingHoursSpecification: LOCAL_BUSINESS.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes
    })),
    hasMenu: absoluteUrl("/menu"),
    acceptsReservations: false,
    potentialAction: {
      "@type": "OrderAction",
      target: LOCAL_BUSINESS.orderUrl,
      deliveryMethod: "https://schema.org/OnSitePickup"
    }
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: LOCAL_BUSINESS.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#restaurant` },
    inLanguage: "en-US"
  };
}

export function buildBreadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

function parsePrice(price: string) {
  const match = price.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/);
  return match?.[1];
}

export function buildMenuJsonLd(data: OurMenuData) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: "Birdside HTX Menu",
    url: absoluteUrl("/menu"),
    provider: { "@id": `${siteUrl}/#restaurant` },
    inLanguage: "en-US",
    hasMenuSection: data.tabs.map((tab) => ({
      "@type": "MenuSection",
      name: tab.label,
      hasMenuItem: tab.items.map((item) => {
        const price = parsePrice(item.price);
        return {
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          image: absoluteUrl(item.imageSrc),
          url: absoluteUrl(item.productHref),
          ...(price
            ? {
                offers: {
                  "@type": "Offer",
                  price,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: LOCAL_BUSINESS.orderUrl
                }
              }
            : {})
        };
      })
    }))
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BIRDSIDE_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
