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
  const { current, nextSlide, prevSlide, goToSlide } = useHeroSlider(
    slides.length,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scale-down on scroll
      gsap.to(".hero-bg-image", {
        scale: 1.2,
        yPercent: 15,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!slides || slides.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto h-[100vh] relative overflow-hidden group bg-transparent"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] cubic-bezier(0.87, 0, 0.13, 1) ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden clip-path-hero">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                quality={90}
                priority={index === 0}
                className="hero-bg-image object-cover object-center transform transition-transform duration-[8000ms] ease-out"
                style={{ transform: isActive ? "scale(1)" : "scale(1.15)" }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6 max-w-5xl mx-auto mix-blend-difference">
              <div className="overflow-hidden mb-4">
                <span
                  className={`block text-gray-400 font-medium tracking-[0.4em] text-xs md:text-sm uppercase transition-transform duration-1000 delay-300 ${isActive ? "translate-y-0" : "translate-y-full"}`}
                >
                  {slide.subtitle}
                </span>
              </div>

              <div className="overflow-hidden mb-6">
                <h1
                  className={`text-5xl md:text-8xl lg:text-[100px] font-extrabold text-white leading-[0.9] tracking-tighter transition-transform duration-1000 delay-500 ${isActive ? "translate-y-0" : "translate-y-[120%]"}`}
                >
                  {slide.title}
                </h1>
              </div>

              <div className="overflow-hidden mb-12">
                <p
                  className={`text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed transition-transform duration-1000 delay-700 ${isActive ? "translate-y-0" : "translate-y-[120%]"}`}
                >
                  {slide.description}
                </p>
              </div>

              <div
                className={`transition-opacity duration-1000 delay-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
              >
                <Link
                  href={slide.ctaLink}
                  className="inline-block bg-transparent border border-gray-500 text-gray-200 hover:bg-gray-100 hover:text-black font-semibold px-10 py-4 rounded-full transition-all duration-500 text-sm tracking-widest uppercase"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modern minimal navigation arrows */}
      <div className="absolute bottom-12 left-12 z-40 flex gap-4">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
