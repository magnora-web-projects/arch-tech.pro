"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import TornadoBackground from "./00-TornadoBackground";

export default function SmoothDarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.07, smoothWheel: true }}>
      <div className="relative min-h-screen bg-transparent text-gray-200 overflow-hidden selection:bg-white/20 selection:text-white">
        <TornadoBackground />

        <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-semibold tracking-tighter whitespace-nowrap text-white"
            style={{ opacity: 0.012 }}
          >
            ARCHTECH
          </div>

          <div
            className="absolute top-1/4 -left-40 -rotate-90 text-[120px] font-medium tracking-widest uppercase text-white"
            style={{ opacity: 0.012 }}
          >
            Structure
          </div>

          <div
            className="absolute bottom-1/4 -right-24 rotate-90 text-[120px] font-medium tracking-widest uppercase text-white"
            style={{ opacity: 0.012 }}
          >
            Precision
          </div>

          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"
            style={{ opacity: 0.01 }}
          ></div>
        </div>
        <div className="relative z-10 ">{children}</div>
      </div>
    </ReactLenis>
  );
}
