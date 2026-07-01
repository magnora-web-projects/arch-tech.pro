"use client";

import { motion } from "framer-motion";
import { useInfiniteSlider } from "@/src/hooks/";

const PlusSeparator = () => (
  <div className="flex items-center justify-center text-[#716A6E] mx-8 md:mx-16 flex-shrink-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 10h-7V3h-2v7H3v2h7v7h2v-7h7z" />
    </svg>
  </div>
);

export default function InteractiveMarquee({ items }: { items: string[] }) {
  const { x, containerRef, handlers } = useInfiniteSlider(1.5);

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-white py-16 overflow-hidden flex items-center cursor-grab active:cursor-grabbing select-none">
      <motion.div
        ref={containerRef}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        dragElastic={0}
        {...handlers}
        className="flex items-center w-max"
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            {/* The Progressive Fill Text Component */}
            <div className="relative group flex items-center">
              {/* Layer 1: Outlined Base Text (Always visible) */}
              <span
                className="text-6xl sm:text-7xl md:text-[90px] font-extrabold tracking-wide text-transparent whitespace-nowrap transition-transform duration-500 group-hover:scale-105"
                style={{ WebkitTextStroke: "1.5px #E2E8F0" }}
              >
                {item}
              </span>

              {/* Layer 2: Solid Fill Overlay (Expands on hover) */}
              <span className="absolute left-0 top-0 text-6xl sm:text-7xl md:text-[90px] font-extrabold tracking-wide text-[#716A6E] whitespace-nowrap overflow-hidden w-0 group-hover:w-full transition-all duration-500 ease-out z-10 group-hover:scale-105 origin-left">
                {item}
              </span>
            </div>

            {/* Separator */}
            <PlusSeparator />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
