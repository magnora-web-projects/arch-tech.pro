"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceItem } from "@/src/lib/home/servicesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveServices({
  services,
}: {
  services: ServiceItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".curvy-card");

      cards.forEach((card, i) => {
        // Dramatic curvy offset: alternating heavy X translations mapped to a curve
        const xOffset = i % 2 === 0 ? 150 : -150;
        const rotationOffset = i % 2 === 0 ? 10 : -10;

        gsap.fromTo(
          card,
          {
            y: 300,
            x: xOffset,
            opacity: 0,
            rotation: rotationOffset,
            scale: 0.8,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 40%",
              scrub: 1.5, // The scrub value creates the buttery follow-through
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-40 relative z-10 bg-transparent backdrop-blur-xs"
    >
      <div className="w-full lg:w-[85%] max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`curvy-card flex flex-col group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors duration-500 relative overflow-hidden ${
                index % 2 !== 0 ? "md:mt-24" : "" // Stagger the physical layout
              }`}
            >
              <span className="absolute -top-6 -right-2 text-[140px] font-black text-white/5 group-hover:text-white/10 transition-colors duration-700 pointer-events-none">
                0{service.id}
              </span>

              <h3 className="text-2xl font-bold text-gray-100 mb-4 z-10 mt-12 tracking-tight">
                {service.title}
              </h3>

              <p className="text-gray-400 text-[14px] leading-relaxed mb-10 flex-grow z-10 font-light">
                {service.description}
              </p>

              <Link
                href={service.link}
                className="flex items-center space-x-4 w-fit mt-auto z-10"
              >
                <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors">
                  Details
                </span>
                <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400 group-hover:text-black transition-colors"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
