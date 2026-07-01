"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  textContainerVariants,
  fadeUpVariants,
  imageVariants,
} from "@/src/lib";

export default function MarketingSection() {
  return (
    <section className="w-full bg-slate-50 pb-24 overflow-hidden">
      <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full h-[450px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <Image
            src="/home/marketing.jpg"
            alt="Architectural team collaborating on a design blueprint"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-slate-900/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl max-w-[220px]">
            <div className="flex flex-col items-start">
              <span className="text-5xl font-extrabold text-white mb-2 tracking-tighter">
                100<span className="text-orange-500">%</span>
              </span>
              <span className="text-[14px] font-bold text-slate-300 uppercase tracking-widest leading-snug">
                Satisfaction
                <br /> Guarantee
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-8"
          >
            We design meaningful spaces powered by vision and technology.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-slate-600 text-[16px] md:text-[18px] leading-relaxed mb-10 font-medium"
          >
            At ARCHTECH, we combine architectural expertise with advanced
            visualization methods to create spaces that go beyond aesthetics.
            Every project begins with understanding human needs, spatial
            behavior, and the purpose behind the design. Through smart use of
            technology, we turn abstract ideas into precise, livable
            environments—where function, emotion, and innovation meet.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-12 sm:gap-6 border-t border-slate-200 pt-10"
          >
            <div className="flex-1">
              <ul className="space-y-4">
                {[
                  "Latest technologies",
                  "Finalizing Design",
                  "High-Quality Designs",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-slate-700 font-bold text-[15px]"
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
                <li className="flex items-center text-slate-500 font-semibold text-[15px] pt-2">
                  <span className="text-orange-500 mr-2">@</span> Mahboobeh
                  Shaban
                </li>
              </ul>
            </div>

            <div className="flex-1 flex flex-col gap-8 border-l-0 sm:border-l sm:border-slate-200 sm:pl-10">
              <div className="flex items-center gap-5">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
                  96<span className="text-orange-500">%</span>
                </span>
                <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider leading-snug">
                  Work
                  <br /> Experiences
                </span>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
                  85<span className="text-orange-500">%</span>
                </span>
                <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider leading-snug">
                  High-Quality
                  <br /> Designs
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
