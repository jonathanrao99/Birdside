/** Hand-maintained shell content (nav, footer). Webflow classes preserved for CSS/ix2. */

export type NavMainLink = {
  href: string;
  label: string;
  linkWId: string;
  lineWId: string;
  lineLarge?: boolean;
  lineAutoplay1?: boolean;
  lineIx2Target0?: boolean;
};

export const navMainLinks: NavMainLink[] = [
  {
    href: "/menu",
    label: "Menu",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b9",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134bc"
  },
  {
    href: "/sauce-lab",
    label: "Sauce Lab",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b1",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134b4"
  },
  {
    href: "/locations",
    label: "Find Us",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134c1",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134c4"
  },
  {
    href: "/catering",
    label: "Catering",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134bd",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134c0"
  },
  {
    href: "/about",
    label: "Our Story",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b5",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134b8"
  }
];

export const navLogo = {
  src: "/assets/birdside-logo.png",
  alt: "Birdside HTX"
};

/** Square Online / pickup ordering (navbar “Order now”). */
export const ORDER_NOW_URL = "https://birdsidehtx.square.site/";

export const navInfoBlocks = [
  {
    href: "/locations",
    iconWrapClass: "navbar_info-icon-wrap white",
    iconType: "location",
    label: "Location",
    value: "Katy, TX"
  },
  {
    href: ORDER_NOW_URL,
    iconWrapClass: "navbar_info-icon-wrap",
    iconType: "order",
    label: "Order now",
    value: "(832) 873-8528"
  }
] as const;

export type FooterNavLink = {
  href: string;
  label: string;
  linkWId: string;
  lineWId: string;
  lineLarge?: boolean;
  lineAutoplay1?: boolean;
  lineIx2Target0?: boolean;
};

export const footerLinkGroups: FooterNavLink[][] = [
  [
    {
      href: "/",
      label: "Home",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09e3",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09e6"
    },
    {
      href: "/about",
      label: "About",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09e7",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09ea"
    },
    {
      href: "/menu",
      label: "Menu",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09eb",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09ee"
    }
  ],
  [
    {
      href: "/locations",
      label: "Locations",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09f0",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09f3",
      lineLarge: true,
      lineAutoplay1: true,
      lineIx2Target0: true
    },
    {
      href: "/contact",
      label: "Contact",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09f8",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09fb",
      lineLarge: true,
      lineAutoplay1: true,
      lineIx2Target0: true
    }
  ],
];

export const footerSocialLinks = [
  {
    href: "https://www.facebook.com/birdsidehtx",
    label: "Facebook",
    iconSrc: "https://cdn.simpleicons.org/facebook/ffffff"
  },
  {
    href: "https://www.instagram.com/birdsidehtx",
    label: "Instagram",
    iconSrc: "https://cdn.simpleicons.org/instagram/ffffff"
  },
  {
    href: "https://www.tiktok.com/@birdsidehtx",
    label: "TikTok",
    iconSrc: "https://cdn.simpleicons.org/tiktok/ffffff"
  },
  {
    href: "https://g.page/r/CSfiAT-j5v43EAE/review",
    label: "Google",
    iconSrc: "https://cdn.simpleicons.org/google/ffffff"
  },
  {
    href: "https://www.yelp.com/biz/birdside-htx-katy?osq=Birdside+HTX&override_cta=Request+pricing+%26+availability",
    label: "Yelp",
    iconSrc: "https://cdn.simpleicons.org/yelp/ffffff"
  }
] as const;

/** Google Maps short link for the Katy location */
export const FOOTER_GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/qPayB7SuizsmpvBXA";

export type FooterInfoBody =
  | { kind: "lines"; lines: string[] }
  | { kind: "link"; href: string; text: string; external?: boolean }
  | { kind: "links"; items: { href: string; text: string; external?: boolean }[] };

export type FooterInfoBlock = {
  label: string;
  body: FooterInfoBody;
};

export const footerInfoBlocks: FooterInfoBlock[] = [
  {
    label: "Location",
    body: {
      kind: "link",
      href: FOOTER_GOOGLE_MAPS_URL,
      text: "1989 N Fry Rd, Katy, TX 77449",
      external: true
    }
  },
  {
    label: "Hours",
    body: {
      kind: "lines",
      lines: ["Open 7 Days a Week!", "5PM - 12:30AM"]
    }
  },
  {
    label: "Contact Us",
    body: {
      kind: "links",
      items: [
        { href: "tel:+18328738528", text: "(832) 873-8528" },
        {
          href: "mailto:birdsidehtx@gmail.com",
          text: "birdsidehtx@gmail.com"
        }
      ]
    }
  }
];
