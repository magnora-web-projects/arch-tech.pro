"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeroSlider } from "@/src/hooks";
import { SlideItem } from "@/src/lib";

export default function InteractiveHeroSlider({
  slides,
}: {
  slides: SlideItem[];
}) {
  const { current, nextSlide, prevSlide, goToSlide } = useHeroSlider(
    slides.length,
  );

  if (!slides || slides.length === 0) return null;

  return (
    <section className="w-full mx-auto h-[100vh] relative overflow-hidden rounded-b-2xl group shadow-xl bg-slate-950">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="90vw"
              quality={75}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
              style={{
                transform: isActive ? "scale(1)" : "scale(1.05)",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6 max-w-4xl mx-auto">
              <span
                className={`text-orange-400 font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 transition-all duration-700 delay-300 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {slide.subtitle}
              </span>

              <h1
                className={`text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight transition-all duration-700 delay-500 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {slide.title}
              </h1>

              <p
                className={`text-base md:text-lg text-gray-300 max-w-2xl font-medium mb-8 leading-relaxed transition-all duration-700 delay-700 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {slide.description}
              </p>

              <div
                className={`transition-all duration-700 delay-900 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <Link
                  href={slide.ctaLink}
                  className="inline-block bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 max-md:hidden"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 max-md:hidden"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex space-x-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === current
                ? "w-8 bg-orange-400"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
