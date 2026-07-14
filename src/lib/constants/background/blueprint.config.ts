import { motifShapes } from "@/src/components";
import { MotifKey } from "@/src/lib";

export const MOTIF_KEYS = Object.keys(motifShapes) as MotifKey[];

export const BLUEPRINT_LAYERS = [
  { spacing: 140, parallax: 0.05, opacity: 0.13 },
  { spacing: 88, parallax: 0.12, opacity: 0.19 },
  { spacing: 46, parallax: 0.22, opacity: 0.1 },
];

export const SNAP_RADIUS = 150;
export const HUD_UPDATE_INTERVAL = 60;
