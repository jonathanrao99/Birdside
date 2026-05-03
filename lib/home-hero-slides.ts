/** Home hero slides — shared by server + client boundaries. */
export type HomeHeroSlide = {
  /** First line of the hero headline (full phrase = line1 + line2). */
  line1: string;
  line2: string;
  imageSrc: string;
  alt: string;
};

export const homeHeroSlides: HomeHeroSlide[] = [
  {
    line1: "Sando love.",
    line2: "Always.",
    imageSrc: "/assets/home/hero-marquee-panel.png",
    alt: "A cheeseburger on a wooden cutting board with ketchup."
  },
  {
    line1: "Wings done",
    line2: "right.",
    imageSrc: "/assets/home/hero-wings-tray.jpg",
    alt: "Saucy chicken wings in a takeout box with dipping sauces."
  },
  {
    line1: "Crispy tenders,",
    line2: "no contest.",
    imageSrc: "/assets/menu/items/extra-tender.jpg",
    alt: "A basket filled with french fries next to a burger."
  }
];
