"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ServiceItem } from "@/src/lib/home/servicesData";
import { containerVariants, cardVariants } from "@/src/lib";

const VrHeadsetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="11" rx="2" ry="2"></rect>
    <path d="M12 7v4"></path>
    <path d="M8 12h.01"></path>
    <path d="M16 12h.01"></path>
    <path d="M7 18a2 2 0 0 1-2-2"></path>
    <path d="M17 18a2 2 0 0 0 2-2"></path>
  </svg>
);

export default function InteractiveServices({
  services,
}: {
  services: ServiceItem[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full bg-slate-50 py-32 md:px-12 lg:px-0 overflow-hidden">
      <div className="w-full lg:w-[90%] max-w-[1400px] mx-auto">
        <motion.div
          ref={sliderRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible px-6 md:px-0 pb-12 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isDragging
              ? "cursor-grabbing snap-none"
              : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="relative flex flex-col group min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center select-none bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-transparent hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ pointerEvents: isDragging ? "none" : "auto" }}
            >
              {/* Subtle Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Massive Ghost Typography Number */}
              <span className="absolute top-2 right-4 text-[100px] font-extrabold text-slate-50 group-hover:text-orange-50 transition-colors duration-700 leading-none pointer-events-none z-0">
                0{service.id}
              </span>

              {/* Icon Container Block */}
              <div className="mb-10 w-16 h-16 rounded-2xl bg-slate-100/60 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-orange-500/25 z-10">
                {service.iconType === "webfont" ? (
                  <i
                    className={`${service.iconValue} text-[32px] text-slate-600 group-hover:text-white transition-colors duration-500`}
                  ></i>
                ) : (
                  <div className="text-slate-600 group-hover:text-white transition-colors duration-500 flex items-center justify-center">
                    {service.iconValue === "vr-headset" && <VrHeadsetIcon />}
                  </div>
                )}
              </div>

              {/* Content Block */}
              <h3 className="text-[20px] font-bold text-slate-900 mb-3 z-10 leading-snug group-hover:text-orange-600 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-slate-500 text-[15px] leading-relaxed mb-10 flex-grow z-10 pr-4">
                {service.description}
              </p>

              {/* Modernized Button */}
              <Link
                href={service.link}
                className="flex items-center space-x-3 w-fit mt-auto cursor-pointer z-10"
                draggable={false}
              >
                <span className="text-[14px] font-bold text-slate-600 group-hover:text-orange-600 transition-colors duration-300">
                  Explore Service
                </span>

                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
