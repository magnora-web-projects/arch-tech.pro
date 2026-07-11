"use client";

import { motion } from "framer-motion";
import { fadeUpVariant } from "@/src/lib/animations/service";

export default function ServiceFeatures({ features }: { features: string[] }) {
  if (!features || features.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-orange-500 group-hover:text-white transition-colors duration-500"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 className="text-white font-bold text-lg leading-snug">
            {feature}
          </h4>
        </div>
      ))}
    </motion.div>
  );
}
