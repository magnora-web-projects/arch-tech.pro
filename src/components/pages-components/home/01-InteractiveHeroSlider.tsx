"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroSlider } from "@/src/hooks";
import { SlideItem } from "@/src/lib";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveHeroSlider({
  slides,
}: {
  slides: SlideItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current, nextSlide, prevSlide } = useHeroSlider(slides.length);

  const bgXTo = useRef<gsap.QuickToFunc | null>(null);
  const bgYTo = useRef<gsap.QuickToFunc | null>(null);
  const textXTo = useRef<gsap.QuickToFunc | null>(null);
  const textYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      bgXTo.current = gsap.quickTo(".hero-bg-image", "x", {
        duration: 0.9,
        ease: "power2.out",
      });
      bgYTo.current = gsap.quickTo(".hero-bg-image", "y", {
        duration: 0.9,
        ease: "power2.out",
      });
      textXTo.current = gsap.quickTo(".hero-text-wrapper", "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      textYTo.current = gsap.quickTo(".hero-text-wrapper", "y", {
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(".hero-main-render-wrapper", {
        scale: 1.15,
        opacity: 0,
        yPercent: -15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1.2,
          pin: true,
          pinSpacing: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !bgXTo.current ||
      !bgYTo.current ||
      !textXTo.current ||
      !textYTo.current
    )
      return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xFactor = clientX / innerWidth - 0.5;
    const yFactor = clientY / innerHeight - 0.5;

    bgXTo.current(xFactor * 25);
    bgYTo.current(yFactor * 25);
    textXTo.current(xFactor * 55);
    textYTo.current(yFactor * 55);
  };

  const handleMouseLeave = () => {
    if (
      !bgXTo.current ||
      !bgYTo.current ||
      !textXTo.current ||
      !textYTo.current
    )
      return;
    bgXTo.current(0);
    bgYTo.current(0);
    textXTo.current(0);
    textYTo.current(0);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section className="w-full h-screen relative bg-transparent z-0">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full mx-auto h-screen relative group overflow-hidden select-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="hero-main-render-wrapper absolute inset-0 w-full h-full will-change-transform transform-gpu">
          {slides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] cubic-bezier(0.87, 0, 0.13, 1) ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 scale-105"
                }`}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden clip-path-hero">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="w-full"
                    quality={95}
                    priority={index === 0}
                    className="hero-bg-image object-cover object-center transform transition-transform duration-[8000ms] ease-out will-change-transform scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none opacity-80" />

                <div className="hero-text-wrapper absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6 max-w-5xl mx-auto mix-blend-normal pointer-events-none will-change-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  <div className="overflow-hidden mb-5">
                    <span
                      className={`block text-[#D4A394] font-bold tracking-[0.5em] text-xs md:text-sm uppercase transition-transform duration-1000 delay-300 ${isActive ? "translate-y-0" : "translate-y-full"}`}
                    >
                      {slide.subtitle}
                    </span>
                  </div>

                  <div className="overflow-hidden mb-6">
                    <h1
                      className={`text-5xl md:text-8xl lg:text-[100px] font-black text-white leading-[0.95] tracking-tighter transition-transform duration-1000 delay-500 ${isActive ? "translate-y-0" : "translate-y-[120%]"}`}
                    >
                      {slide.title}
                    </h1>
                  </div>

                  <div className="overflow-hidden mb-12">
                    <p
                      className={`text-base md:text-xl text-zinc-100 max-w-2xl font-normal leading-relaxed transition-transform duration-1000 delay-700 ${isActive ? "translate-y-0" : "translate-y-[120%]"}`}
                    >
                      {slide.description}
                    </p>
                  </div>

                  <div
                    className={`transition-opacity duration-1000 delay-1000 pointer-events-auto ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="inline-block bg-white text-black hover:bg-transparent hover:text-white border border-white font-bold px-10 py-4 rounded-full transition-all duration-500 text-sm tracking-widest uppercase shadow-2xl"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-12 left-12 z-40 flex gap-4 pointer-events-auto">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white bg-black/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md shadow-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white bg-black/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md shadow-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
