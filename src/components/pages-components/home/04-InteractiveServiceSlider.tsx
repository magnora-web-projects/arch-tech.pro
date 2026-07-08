"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCardItem } from "@/src/lib";
import ServiceCard from "../../cards/home/services2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveServiceSlider({
  cards,
}: {
  cards: ServiceCardItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal curvy scroll
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const duplicatedCards = [...cards, ...cards];

  return (
    <section
      ref={containerRef}
      className="w-full bg-transparent py-32 overflow-hidden relative z-10 backdrop-blur-xs"
    >
      <div className="w-[85%] max-w-[1400px] mx-auto mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          Intelligence{" "}
          <span className="text-gray-600 font-serif italic">Applied.</span>
        </h2>
      </div>

      <div className="flex w-full overflow-hidden py-10">
        <div
          ref={trackRef}
          className="flex gap-10 w-max px-10 will-change-transform"
        >
          {duplicatedCards.map((card, index) => (
            // Applying a slight Y offset for the "curvy" staggered look
            <div
              key={`${card.id}-${index}`}
              className={`transition-transform duration-700 hover:-translate-y-4 ${index % 2 !== 0 ? "mt-16" : ""}`}
            >
              <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden   transition-all duration-700">
                <ServiceCard card={card} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
