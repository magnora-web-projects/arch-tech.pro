"use client";

import { ReactLenis } from "lenis/react";
import { BluePrintBG } from ".";

export default function SmoothDarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.07, smoothWheel: true }}>
      <div className="relative min-h-screen bg-transparent text-gray-200 overflow-hidden selection:bg-white/20 selection:text-white">
        <BluePrintBG />
        <div className="relative z-10 ">{children}</div>
      </div>
    </ReactLenis>
  );
}
