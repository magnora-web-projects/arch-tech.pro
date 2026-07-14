"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStep } from "@/src/lib";
import { ProcessCard } from "../../cards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveProcess({
  steps,
}: {
  steps: ProcessStep[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepCards = gsap.utils.toArray<HTMLElement>(".weaving-step");

      stepCards.forEach((card, i) => {
        // Alternating extreme curves
        const startX = i % 2 === 0 ? -300 : 300;

        gsap.fromTo(
          card,
          { opacity: 0, x: startX, y: 200, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              scrub: 1.2,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" relative w-full bg-transparent py-40 overflow-hidden z-10"
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] font-black text-white/5 select-none pointer-events-none whitespace-nowrap z-[-1] tracking-tighter mix-blend-overlay">
        SYSTEM
      </div>

      <div className="w-[85%] max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Architectural{" "}
            <span className="text-gray-500 italic font-serif">Process.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-px before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent before:hidden md:before:block">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`weaving-step flex w-full  ${
                index % 2 === 0
                  ? "md:justify-end md:pr-16"
                  : "md:mt-40 md:pl-16"
              }`}
            >
              <div className="relative w-full max-w-lg group ">
                <div className="absolute -top-12 left-4 text-zinc-800 font-black text-7xl select-none pointer-events-none z-0 tracking-tighter transition-colors duration-500 group-hover:text-zinc-700">
                  0{index + 1}
                </div>

                <div className="relative z-10   transition-all duration-500 w-full">
                  <ProcessCard step={step} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
