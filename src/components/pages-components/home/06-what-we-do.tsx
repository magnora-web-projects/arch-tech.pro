Accordion;
import { Accordion, ParallaxFurniture } from "@/src/components";
import { homeFaqData } from "@/src/lib";

export default function WhatWeDoSection() {
  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        <div className="flex w-full">
          <Accordion
            subtitle="What We Do"
            title="How it turns your vision into reality."
            items={homeFaqData}
          />
        </div>

        <div className="flex w-full relative">
          <ParallaxFurniture />
        </div>
      </div>
    </section>
  );
}
