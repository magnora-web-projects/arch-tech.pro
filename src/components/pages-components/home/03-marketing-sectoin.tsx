"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarketingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic image reveal
      gsap.fromTo(
        ".marketing-mask",
        {
          clipPath: "inset(30% 10% 30% 10% rounded 2rem)",
          filter: "grayscale(100%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% rounded 2rem)",
          filter: "grayscale(20%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.from(".marketing-text", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-transparent py-32 overflow-hidden relative z-10  -xs"
    >
      <div className="w-[85%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="marketing-mask relative w-full h-[600px] lg:h-[800px] overflow-hidden rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10">
          <Image
            ref={imgRef}
            src="/home/marketing.jpg"
            alt="Architectural Blueprint"
            fill
            className="object-cover scale-110"
            sizes="(max-width: 1024px) 90vw, 45vw"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-10 left-10 p-8 rounded-2xl  -md bg-white/5 border border-white/10">
            <span className="text-6xl font-black text-white tracking-tighter block mb-2">
              100<span className="text-gray-500 font-light">%</span>
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.3em]">
              Precision
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="marketing-text mb-6">
            <span className="text-gray-500 text-xs tracking-[0.4em] uppercase">
              Creative Vision
            </span>
          </div>

          <h2 className="marketing-text text-4xl md:text-6xl lg:text-[70px] font-extrabold text-white leading-[1.1] tracking-tighter mb-10">
            The Art of
            <br />
            <span className="text-gray-500 italic font-serif">Structure.</span>
          </h2>

          <p className="marketing-text text-gray-400 text-lg leading-relaxed mb-16 font-light max-w-lg">
            We sculpt environments that respond to human presence. By merging
            raw brutalism with ethereal lighting, we transform spatial
            limitations into masterpieces of interior logic.
          </p>

          <div className="marketing-text flex gap-12 border-t border-white/10 pt-12">
            <div className="flex flex-col">
              <span className="text-5xl font-black text-white mb-2 tracking-tighter">
                96<span className="text-gray-600">%</span>
              </span>
              <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                Execution
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl font-black text-white mb-2 tracking-tighter">
                85<span className="text-gray-600">%</span>
              </span>
              <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                Innovation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
