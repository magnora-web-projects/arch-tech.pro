"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHeroScroll } from "@/src/hooks";
import { heroTextVariant } from "@/src/lib/animations/service";

export default function ServiceHero({
  title,
  banner_image,
  header_title,
  header_description,
}: {
  title: string;
  banner_image: string;
  header_title: string;
  header_description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y, opacity } = useHeroScroll(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full origin-bottom"
      >
        <Image
          src={banner_image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 mt-16">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={heroTextVariant}
          className="flex items-center space-x-3 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-6 md:mb-10"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">{title}</span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={heroTextVariant}
          className="text-5xl md:text-7xl lg:text-[100px] font-black text-white tracking-tighter leading-[1.1] max-w-6xl drop-shadow-2xl"
        >
          {header_title}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={heroTextVariant}
          className="text-slate-300 max-w-3xl mt-8 text-[16px] md:text-[18px] leading-relaxed font-medium"
        >
          {header_description}
        </motion.p>
      </div>
    </div>
  );
}
