"use client";

import { useRef } from "react";
import { GOLD_LIGHT, GOLD_MID, MOTIF_KEYS } from "@/src/lib";
import { motifShapes, Corner } from ".";
import { useBlueprintEngine } from "@/src/hooks";

export default function Blueprint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudTextRef = useRef<HTMLSpanElement>(null);
  const motifRefs = useRef<(SVGGElement | null)[]>([]);

  useBlueprintEngine({
    canvasRef,
    crosshairRef,
    hudRef,
    hudTextRef,
    motifRefs,
  });

  return (
    <div className="fixed inset-0 z-[-1] w-screen h-screen pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#010a32] via-[#080808] to-[#461f1f]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-75"
      />

      <svg
        className="absolute inset-0 w-full h-full overflow-visible mix-blend-screen"
        style={{ opacity: 0.85 }}
      >
        {MOTIF_KEYS.map((key, i) => (
          <g
            key={key}
            ref={(el) => {
              motifRefs.current[i] = el;
            }}
            style={{
              transformBox: "fill-box",
              willChange: "transform, opacity",
              opacity: 0,
              // @ts-expect-error -- custom property for CSS var draw-in
              "--reveal": 0,
            }}
            stroke={`rgba(${GOLD_MID}, 1)`}
            fill="none"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              style={{
                strokeDasharray: 100,
                strokeDashoffset: "calc(100 * (1 - var(--reveal, 0)))",
              }}
            >
              {motifShapes[key]}
            </g>
          </g>
        ))}
      </svg>

      <div
        ref={crosshairRef}
        className="absolute top-0 left-0 w-0 h-0 opacity-0"
        style={{ willChange: "transform" }}
      >
        <div className="ch-ring relative -translate-x-1/2 -translate-y-1/2 w-14 h-14">
          <svg viewBox="0 0 56 56" className="w-full h-full">
            <circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke={`rgba(${GOLD_MID}, 0.55)`}
              strokeWidth="0.7"
              strokeDasharray="2,5"
            />
            <circle cx="28" cy="28" r="1.8" fill={`rgba(${GOLD_LIGHT}, 0.9)`} />
            <line
              x1="28"
              y1="6"
              x2="28"
              y2="14"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="28"
              y1="42"
              x2="28"
              y2="50"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="6"
              y1="28"
              x2="14"
              y2="28"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
            <line
              x1="42"
              y1="28"
              x2="50"
              y2="28"
              stroke={`rgba(${GOLD_LIGHT}, 0.7)`}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      <div
        ref={hudRef}
        className="absolute top-0 left-0 opacity-0 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div
          className="px-2 py-1 rounded-sm font-mono text-[0.62rem] tracking-[0.15em] border"
          style={{
            color: `rgba(${GOLD_LIGHT}, 0.95)`,
            background: "rgba(2, 2, 2, 0.55)",
            borderColor: `rgba(${GOLD_MID}, 0.35)`,
            backdropFilter: "blur(2px)",
          }}
        >
          <span ref={hudTextRef}>X 0000 · Y 0000</span>
        </div>
      </div>

      <Corner color={GOLD_LIGHT} className="top-6 left-6" />
      <Corner color={GOLD_LIGHT} className="top-6 right-6 rotate-90" />
      <Corner color={GOLD_LIGHT} className="bottom-6 right-6 rotate-180" />
      <Corner color={GOLD_LIGHT} className="bottom-6 left-6 -rotate-90" />
    </div>
  );
}
