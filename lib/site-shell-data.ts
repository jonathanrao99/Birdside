/** Hand-maintained shell content (nav, footer). Webflow classes preserved for CSS/ix2. */

export const LINE_LOTTIE_SRC =
  "https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/67db0560131ca0b295186d93_line.lottie";

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
    href: "/",
    label: "Home",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b1",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134b4"
  },
  {
    href: "/about",
    label: "About",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b5",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134b8"
  },
  {
    href: "/menu",
    label: "Menu",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134b9",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134bc"
  },
  {
    href: "/locations",
    label: "Locations",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134c1",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134c4",
    lineLarge: true,
    lineAutoplay1: true,
    lineIx2Target0: true
  },
  {
    href: "/blog",
    label: "Blog",
    linkWId: "1968410c-ed6e-d558-6475-5b3f5ad134bd",
    lineWId: "1968410c-ed6e-d558-6475-5b3f5ad134c0"
  }
];

export const navLogo = {
  src: "/assets/birdside-logo.png",
  alt: "Birdside HTX"
};

export const navInfoBlocks = [
  {
    href: "/locations",
    iconWrapClass: "navbar_info-icon-wrap white",
    iconSrc:
      "https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/67db074cb5080aede0d7f5c2_location.json",
    iconWId: "1968410c-ed6e-d558-6475-5b3f5ad134fc",
    iconDuration: "2.0166666666666666",
    label: "Location",
    value: "New York, NY"
  },
  {
    href: "tel:987-654-3210",
    iconWrapClass: "navbar_info-icon-wrap",
    iconSrc:
      "https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/67db0837131ca0b2951b1071_chef-hat.json",
    iconWId: "1968410c-ed6e-d558-6475-5b3f5ad13505",
    iconDuration: "2.533333333333333",
    label: "Order now",
    value: "987-654-3210"
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
      href: "/locations/los-angeles-ca",
      label: "Location",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09f4",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e09f7",
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
  [
    {
      href: "/blog",
      label: "Blog",
      linkWId: "2da64e58-7a64-a03c-8c3f-856a365e09fd",
      lineWId: "2da64e58-7a64-a03c-8c3f-856a365e0a00"
    }
  ]
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

export const footerInfos = [
  {
    label: "Location",
    html: "1989 N Fry Rd, Katy, TX 77449"
  },
  {
    label: "Hours",
    html: "Open 7 Days a Week!<br/>Monday to Sunday 5PM - 12:30AM"
  },
  {
    label: "Contact Us",
    html: "(832) 873-8528<br/>birdsidehtx@gmail.com"
  }
] as const;
