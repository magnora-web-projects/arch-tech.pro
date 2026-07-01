export interface SlideItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const heroSlides: SlideItem[] = [
  {
    id: 1,
    image: "/home/slider-1.png",
    subtitle: "MODERN GERMAN DESIGN",
    title: "Elevating Interior Spaces",
    description:
      "Blending minimalist aesthetics with functional architecture to create timeless, sophisticated living environments.",
    ctaText: "Explore Projects",
    ctaLink: "/portfolio",
  },
  {
    id: 2,
    image: "/home/slider-2.png",
    subtitle: "INTERIOR ELEGANCE",
    title: "Designing with Purpose and Light",
    description:
      "Crafting bespoke interiors that harmonize natural, high-quality materials with cutting-edge architectural trends.",
    ctaText: "Our Services",
    ctaLink: "/services",
  },
  {
    id: 3,
    image: "/home/slider-3.png",
    subtitle: "BESPOKE ENVIRONMENTS",
    title: "Tailored Residential & Commercial Spaces",
    description:
      "From luxury urban apartments to modern corporate offices, we redefine interior architecture across Germany.",
    ctaText: "Read Blog",
    ctaLink: "/blog",
  },
  {
    id: 4,
    image: "/home/slider-4.png",
    subtitle: "SUSTAINABLE LIVING",
    title: "Eco-Conscious Interior Solutions",
    description:
      "Implementing sustainable materials and energy-efficient spatial designs without ever compromising on luxury.",
    ctaText: "Contact Us",
    ctaLink: "/contact",
  },
  {
    id: 5,
    image: "/home/slider-5.png",
    subtitle: "ENGINEERING AESTHETICS",
    title: "Precision in Every Detail",
    description:
      "Combining renowned German engineering standards with refined interior styling to bring your ultimate vision to life.",
    ctaText: "About Our Vision",
    ctaLink: "/about",
  },
];
