import { motifShapes } from "@/src/components/background/motifShapes";

export type Sweep = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
};

export type MotifDef = {
  id: string;
  baseX: number;
  baseYFactor: number;
  depth: number;
  scale: number;
  rotation: number;
  render: () => React.ReactNode;
};

export type MotifKey = keyof typeof motifShapes;
