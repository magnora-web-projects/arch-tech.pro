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
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>(".curvy-card");

      cards.forEach((card, i) => {
        const yOffset = i % 2 === 0 ? 250 : 350;

        gsap.fromTo(
          card,
          {
            y: yOffset,
            opacity: 0,
            rotationX: 25,
            scale: 0.9,
            filter: "blur(15px)",
            transformPerspective: 1200,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 20%",
              scrub: 1.5,
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
      className="w-full pt-40 pb-32 relative z-20 bg-transparent"
    >
      <div
        ref={containerRef}
        className="w-full lg:w-[85%] max-w-[1400px] mx-auto px-6 will-change-transform"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24 opacity-50"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 perspective-[2000px]">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`curvy-card flex flex-col group bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 relative overflow-hidden transform-gpu shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
                index % 2 !== 0 ? "md:mt-32" : ""
              }`}
            >
              <span className="absolute -top-10 -right-4 text-[160px] font-thin text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-1000 pointer-events-none tracking-tighter">
                {service.id}
              </span>

              <h3 className="text-2xl font-bold text-gray-100 mb-6 z-10 mt-12 tracking-tight group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>

              <p className="text-gray-400 text-[14px] leading-[1.8] mb-12 flex-grow z-10 font-light group-hover:text-gray-300 transition-colors duration-500">
                {service.description}
              </p>

              <Link
                href={service.link}
                className="flex items-center space-x-4 w-fit mt-auto z-10 group/btn"
              >
                <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-gray-500 group-hover/btn:text-white transition-colors duration-300">
                  Discover
                </span>
                <div className="w-10 h-10 rounded-full border border-gray-600/50 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-400 group-hover/btn:text-black transition-colors duration-500 transform group-hover/btn:translate-x-1"
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
