"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import { imageVariants, containerVariants } from "@/src/lib";

export default function ParallaxFurniture() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yFloor = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const ySofa = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  const yChair = useTransform(scrollYProgress, [0, 1], ["-15%", "20%"]);

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers the entrance animation slightly before scrolling into full view
      className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center"
    >
      {/* Base Layer: Floor */}
      <motion.div
        variants={imageVariants}
        style={{ y: yFloor }} // Scroll Parallax
        className="absolute z-0 w-[80%] md:w-[70%] h-auto shadow-2xl"
      >
        <Image
          src="/home/floor-1.jpg"
          alt="Modern rug and coffee table layout"
          width={800}
          height={800}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Top Layer: Sofa */}
      <motion.div
        variants={imageVariants}
        style={{ y: ySofa }} // Scroll Parallax
        className="absolute z-20 top-0 right-[-5%] w-[60%] md:w-[50%] drop-shadow-2xl"
      >
        <Image
          src="/home/sofa-1.png"
          alt="Green modern sofa"
          width={600}
          height={400}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Middle Layer: Chair */}
      <motion.div
        variants={imageVariants}
        style={{ y: yChair }} // Scroll Parallax
        className="absolute z-10 bottom-[10%] left-0 w-[45%] md:w-[40%] drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]"
      >
        <Image
          src="/home/chair-1.png"
          alt="Accent chair"
          width={500}
          height={600}
          className="w-full h-auto object-contain transform -rotate-12"
        />
      </motion.div>
    </motion.div>
  );
}
