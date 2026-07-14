"use client";

import { useRef } from "react";
import WhatWeDoSection from "./06-what-we-do";
import InteractiveProcess from "../../interactive-components/home/HowWeWork";
import { ProcessStep, WORKFLOW_CONFIG } from "@/src/lib";
import { useWorkFlowAnimation } from "@/src/hooks";

export default function WorkFlow({ steps }: { steps: ProcessStep[] }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelARef = useRef<HTMLDivElement | null>(null);
  const panelBRef = useRef<HTMLDivElement | null>(null);
  const panelAContentRef = useRef<HTMLDivElement | null>(null);
  const panelBContentRef = useRef<HTMLDivElement | null>(null);
  const seamRef = useRef<HTMLDivElement | null>(null);

  const { reducedMotion } = useWorkFlowAnimation({
    wrapperRef,
    trackRef,
    panelARef,
    panelBRef,
    panelAContentRef,
    panelBContentRef,
    seamRef,
  });

  if (reducedMotion) {
    return (
      <div className="flex flex-col w-full">
        <WhatWeDoSection />
        <InteractiveProcess steps={steps} />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: "200vw" }}
      >
        <div
          ref={panelARef}
          className="relative h-full w-screen flex items-start will-change-transform overflow-hidden"
        >
          <div
            ref={panelAContentRef}
            className="w-full flex flex-col justify-center min-h-screen will-change-transform"
          >
            <WhatWeDoSection />
          </div>
        </div>

        <div
          ref={panelBRef}
          className="relative h-full w-screen flex items-start will-change-transform overflow-hidden"
        >
          <div
            ref={panelBContentRef}
            className="w-full flex flex-col justify-center min-h-screen will-change-transform"
          >
            <InteractiveProcess steps={steps} />
          </div>
        </div>
      </div>

      <div
        ref={seamRef}
        className="absolute top-0 bottom-0 left-1/2 w-px opacity-0 pointer-events-none z-20"
        style={WORKFLOW_CONFIG.SEAM_STYLE}
      />
    </div>
  );
}
