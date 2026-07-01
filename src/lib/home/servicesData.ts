export interface ServiceItem {
  id: number;
  iconType: "webfont" | "svg";
  iconValue: string;
  title: string;
  description: string;
  link: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    iconType: "webfont",
    iconValue: "flaticon-interior-design", // Your webfont class
    title: "Interior Design",
    description: "Shaping spaces that align with purpose and feeling.",
    link: "/services/interior-design",
  },
  {
    id: 2,
    iconType: "webfont",
    iconValue: "flaticon-3d-modeling",
    title: "3D Visualization & Rendering",
    description: "Turning ideas into vivid, detailed visual realities.",
    link: "/services/3d-visualization",
  },
  {
    id: 3,
    iconType: "webfont",
    iconValue: "flaticon-mood-board",
    title: "Concept & Mood Boards",
    description: "Translating vision into tangible design language.",
    link: "/services/concept-boards",
  },
  {
    id: 4,
    iconType: "svg",
    iconValue: "vr-headset", // Identifier for our custom SVG
    title: "Animation & VR Experiences",
    description: "Immersive journeys through your future space.",
    link: "/services/vr-experiences",
  },
];
