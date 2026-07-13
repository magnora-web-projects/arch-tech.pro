"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mockPortfolio = [
  { id: 1, title: "Modern Villa", src: "/portfolio/villa.jpg" },
  { id: 2, title: "Renovation", src: "/portfolio/renovation.jpg" },
  { id: 3, title: "Mood Boards", src: "/portfolio/mood-boards.jpg" },
  { id: 4, title: "Booth Design", src: "/portfolio/booth-design.png" },
];

export default function PortfolioPresent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLDivElement>(".portfolio-depth-card");

      const totalScrollDistance = items.length * 1000;

      gsap.to(items, {
        z: 800,
        opacity: (i) => (i === items.length - 1 ? 1 : 0),
        scale: 1.5,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScrollDistance}`,
          pin: true,
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full z-10 bg-transparent">
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ perspective: "1500px", perspectiveOrigin: "50% 50%" }}
      >
        <div className="absolute top-20 left-0 w-full text-center z-50 pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mix-blend-difference">
            Selected
            <span className="text-gray-600 font-serif italic"> Works.</span>
          </h2>
        </div>

        <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
          {mockPortfolio.map((item, index) => {
            const initialZ = -1500 - index * 2000;
            const rotation = index % 2 === 0 ? 5 : -5;

            return (
              <div
                key={item.id}
                className="portfolio-depth-card absolute w-[80vw] md:w-[60vw] max-w-4xl aspect-video rounded-3xl overflow-hidden will-change-transform shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
                style={{
                  transform: `translateZ(${initialZ}px) rotateZ(${rotation}deg)`,
                  opacity: Math.max(0.1, 1 - index * 0.2),
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white z-10">
                  <span className="text-sm font-medium tracking-[0.3em] uppercase text-gray-400 mb-2 block">
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
