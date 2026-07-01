"use client";

import { motion } from "framer-motion";
import { containerVariants, ProcessStep } from "@/src/lib";
import { ProcessCard } from "../../cards";

export default function InteractiveProcess({
  steps,
}: {
  steps: ProcessStep[];
}) {
  return (
    <section className="relative w-full bg-[#FAFAFA] py-24 overflow-hidden z-0">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] lg:text-[250px] font-extrabold text-slate-200/40 select-none pointer-events-none whitespace-nowrap z-[-1] tracking-tighter leading-none">
        Process
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center text-slate-400  font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
            <span className="w-3 h-3 rounded-l-full bg-[#D4A394] mr-2"></span>
            STEPS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How we work ?
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {steps.map((step) => (
            <ProcessCard key={step.id} step={step} />
          ))}
        </motion.div>
      </div>
      <p className="text-center text-gray-500 font-medium text-[15px] p-8">
        <b>Note</b>: Clients and architects have the flexibility to choose
        individual services, such as mood board creation, rendering, or
        animation, based on their specific needs.
      </p>
    </section>
  );
}
