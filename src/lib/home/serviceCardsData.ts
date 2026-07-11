export interface ServiceCardItem {
  id: number;
  numberPrefix: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

export const serviceCardsData: ServiceCardItem[] = [
  {
    id: 1,
    numberPrefix: "01",
    image: "/services/interior-design-1.jpg",
    title: "Interior Design",
    description:
      "Creating functional, elegant spaces tailored to modern human behavior and lifestyle.",
    link: "/services/interior-design",
  },
  {
    id: 2,
    numberPrefix: "02",
    image: "/services/3d-visual-1.jpg", // Matched from your prompt
    title: "3D Visualization & Rendering",
    description:
      "High-fidelity architectural renderings that bring unbuilt concepts into vivid reality.",
    link: "/services/3d-visualization",
  },
  {
    id: 3,
    numberPrefix: "03",
    image: "/services/Concept & Mood Boards-1.jpg",
    title: "Concept & Mood Boards",
    description:
      "Curating textures, lighting, and spatial layouts to define the soul of your project.",
    link: "/services/concept-boards",
  },
  {
    id: 4,
    numberPrefix: "04",
    image: "/services/animated-1.png",
    title: "Animation & VR Experiences",
    description:
      "Step inside your future space with immersive, fully-realized virtual reality walk-throughs.",
    link: "/services/vr-experiences",
  },
];
