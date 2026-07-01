export interface ProcessStep {
  id: number;
  numberPrefix: string;
  iconClass: string;
  title: string;
  description: string;
}

export const processData: ProcessStep[] = [
  {
    id: 1,
    numberPrefix: "01",
    iconClass: "pbmit-xinterio-icon-engineer",
    title: "1. Initial Consultation",
    description:
      "We begin with an in-depth discussion to understand your vision, style preferences, and specific project needs. Whether meeting online or in person, this conversation lays the foundation for a successful collaboration and captures the essence of your design aspirations.",
  },
  {
    id: 2,
    numberPrefix: "02",
    iconClass: "pbmit-xinterio-icon-compass",
    title: "2. Cost Proposal",
    description:
      "Preparation Immediately following our consultation, we craft a tailored cost proposal. This proposal reflects the selected services—ranging from interior design and mood board creation to rendering and animation—ensuring you have a clear and transparent understanding of the investment required.",
  },
  {
    id: 3,
    numberPrefix: "03",
    iconClass: "pbmit-xinterio-icon-tools",
    title: "3. Concept Development & Mood Boards",
    description:
      "Our creative team then develops innovative design concepts, focusing on premium materials, harmonious color palettes, and personalized style elements. We create custom mood boards that serve as inspiration and a visual reference for your unique project.",
  },
  {
    id: 4,
    numberPrefix: "04",
    iconClass: "pbmit-xinterio-icon-axis",
    title: "4. Preliminary Planning",
    description:
      "In this phase, we produce detailed 2D designs and pre-renderings that outline the architectural direction and overall project layout. These visuals act as a roadmap, aligning the project's vision before moving on to more refined details.",
  },
  {
    id: 5,
    numberPrefix: "05",
    iconClass: "flaticon-chat",
    title: "5. Client Feedback",
    description:
      "We present an initial, simplified version of the design, including an immersive VR walkthrough of your space. Your feedback is essential at this stage, and we welcome any revisions to ensure that the final design fully meets your expectations.",
  },
  {
    id: 6,
    numberPrefix: "06",
    iconClass: "pbmit-xinterio-icon-house-design",
    title: "6. Final Design & Planning",
    description:
      "The process culminates in meticulous final planning and design refinement. We deliver comprehensive documentation along with final renderings or animations, bringing your vision to life with precision and attention to detail.",
  },
];
