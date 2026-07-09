"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ServiceCardItem } from "@/src/lib";
import ServiceCard from "../../cards/home/services2";

export default function InteractiveServiceSlider({
  cards,
}: {
  cards: ServiceCardItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);

  const speed = 1.0;

  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      if (!trackRef.current) return;
      const halfWidth = trackRef.current.scrollWidth / 2;

      if (latestX <= -halfWidth) {
        x.set(latestX + halfWidth);
      } else if (latestX > 0) {
        x.set(latestX - halfWidth);
      }
    });
    return unsubscribe;
  }, [x]);

  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging) return;
    x.set(x.get() - speed * (delta / 16));
  });

  const duplicatedCards = [...cards, ...cards, ...cards, ...cards];

  return (
    <section className="w-full bg-transparent py-32 overflow-hidden relative z-10 backdrop-blur-xs">
      <div className="w-[85%] max-w-[1400px] mx-auto mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          Intelligence{" "}
          <span className="text-gray-600 font-serif italic">Applied.</span>
        </h2>
      </div>

      <div className="flex w-full overflow-hidden py-10 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-10 w-max px-6 md:px-10"
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className={`transition-transform duration-700 hover:-translate-y-4 ${
                index % 2 !== 0 ? "mt-16" : ""
              }`}
              style={{ pointerEvents: isDragging ? "none" : "auto" }}
            >
              <ServiceCard card={card} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
