export interface FAQItem {
  id: number;
  title: string;
  content: string;
}

export const homeFaqData: FAQItem[] = [
  {
    id: 1,
    title: "1. What is Interior design, and why do I need it?",
    content:
      "It's a process where we create realistic 3D images of your space before it's built. These visuals show materials, lighting, layout, and more—helping you see exactly how the design will look.",
  },
  {
    id: 2,
    title: "2. How does 3D visualization help my project?",
    content:
      "3D visualization eliminates guesswork. It allows you to experience the spatial flow, test different material combinations, and make informed decisions before any physical construction begins, saving time and money.",
  },
  {
    id: 3,
    title: "3. Why are concept boards important in design?",
    content:
      "Concept boards set the emotional and visual tone of the project. They ensure that both the designer and the client are aligned on the aesthetic direction, textures, and color palettes early in the process.",
  },
  {
    id: 4,
    title: "4. What's the benefit of using VR in interior design?",
    content:
      "Virtual Reality allows you to step inside your unbuilt space. You can perceive true scale, lighting dynamics, and spatial relationships in a way that traditional 2D images simply cannot convey.",
  },
];
