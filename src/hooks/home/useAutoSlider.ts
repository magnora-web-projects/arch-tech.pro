import { useState, useRef, useEffect } from "react";
import { useMotionValue, useAnimationFrame } from "framer-motion";

export const useInfiniteSlider = (speed = 1) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      if (!containerRef.current) return;

      const singleSetWidth = containerRef.current.scrollWidth / 2;

      if (latestX <= -singleSetWidth) {
        x.set(latestX + singleSetWidth);
      } else if (latestX > 0) {
        x.set(latestX - singleSetWidth);
      }
    });

    return unsubscribe;
  }, [x]);

  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging || !containerRef.current) return;

    x.set(x.get() - speed * (delta / 16));
  });

  return {
    x,
    containerRef,
    handlers: {
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => setIsDragging(false),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
};
