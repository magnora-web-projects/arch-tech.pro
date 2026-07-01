"use client";

import { motion } from "framer-motion";
import { ServiceCardItem } from "@/src/lib";
import { useInfiniteSlider } from "@/src/hooks/";
import ServiceCard from "../../cards/home/services2";

export default function InteractiveServiceSlider({
  cards,
}: {
  cards: ServiceCardItem[];
}) {
  const { x, containerRef, handlers } = useInfiniteSlider(1.2);

  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="w-full lg:w-[90%] max-w-[1400px] mx-auto px-6 md:px-12 lg:px-0">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl text-center md:text-5xl font-extrabold text-slate-900 tracking-tight">
            What we offer for you ?
          </h2>
        </div>
      </div>

      <div className="flex w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={containerRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          dragElastic={0}
          {...handlers}
          // ADD "items-stretch" HERE 👇
          className="flex items-stretch gap-8 w-max px-4 md:px-8"
        >
          {duplicatedCards.map((card, index) => (
            <div key={`${card.id}-${index}`}>
              <ServiceCard card={card} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
