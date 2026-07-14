"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const DotSeparator = () => (
  <div className="w-3 h-3 rounded-full bg-gray-600 mx-10 md:mx-20 flex-shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
);

export default function InteractiveMarquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -33.33,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    });
    return () => ctx.revert();
  }, []);

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full py-24 overflow-hidden flex items-center bg-transparent border-y border-white/5 relative z-10  -xs">
      <div
        ref={trackRef}
        className="flex items-center w-max will-change-transform"
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            <span
              className="text-7xl sm:text-8xl md:text-[120px] font-black tracking-tighter text-transparent uppercase whitespace-nowrap"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {item}
            </span>
            <DotSeparator />
          </div>
        ))}
      </div>
    </div>
  );
}
