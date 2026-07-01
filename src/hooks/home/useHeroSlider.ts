import { useState, useEffect, useCallback } from "react";

export const useHeroSlider = (
  totalSlides: number,
  autoPlayInterval: number = 6000,
) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, totalSlides]);

  return {
    current,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
