// src/components/pages-components/home/04-InteractiveServiceSlider_2.tsx
"use client";

import { useRef, useEffect } from "react";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = trackWidth - viewportWidth;
        return distance > 0 ? distance : 0;
      };

      if (getScrollAmount() > 0) {
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <section className="w-full relative z-10 bg-transparent">
      <div
        ref={sectionRef}
        className="w-full h-screen flex flex-col justify-center overflow-hidden "
      >
        <div className="w-[85%] max-w-[1400px] mx-auto mb-16 shrink-0">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
            What we offer
            <span className="text-gray-600 font-serif italic"> for you ?</span>
          </h2>
        </div>

        <div className="flex w-full overflow-visible py-10 perspective-[2000px]">
          <div
            ref={trackRef}
            className="flex gap-6 lg:gap-12 w-max px-6 md:px-[7.5vw] will-change-transform"
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`transform-gpu transition-all duration-300 ${
                  index % 2 !== 0 ? "lg:mt-12" : ""
                }`}
              >
                <ServiceCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
