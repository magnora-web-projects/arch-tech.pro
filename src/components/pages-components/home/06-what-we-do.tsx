"use client";

import { Accordion, ParallaxFurniture } from "@/src/components";
import { homeFaqData } from "@/src/lib";

export default function WhatWeDoSection() {
  return (
    <section className="backdrop-blur-xs w-full bg-transparent py-32 overflow-hidden relative z-10">
      <div className="w-[85%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="flex w-full flex-col">
          <span className="text-gray-500 text-xs tracking-[0.4em] uppercase mb-4">
            Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-12">
            Turning vision into{" "}
            <span className="text-gray-500 font-serif italic">reality.</span>
          </h2>
          {/* Ensure your Accordion component handles dark mode via props or CSS updates */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <Accordion
              subtitle="What We Do"
              title="How it turns your vision into reality."
              items={homeFaqData}
            />
          </div>
        </div>

        <ParallaxFurniture />
      </div>
    </section>
  );
}
