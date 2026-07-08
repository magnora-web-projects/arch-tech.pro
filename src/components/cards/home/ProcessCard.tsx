import { motion } from "framer-motion";
import { cardVariants, ProcessStep } from "@/src/lib";

export default function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center text-center group bg-[#0d0d0d]/30 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all duration-500">
          <i
            className={`${step.iconClass} text-2xl text-zinc-400 group-hover:text-white transition-colors`}
          ></i>
        </div>

        <div className="absolute -top-2 -right-6 text-zinc-600 font-semibold text-[13px] tracking-wider transition-colors duration-300 group-hover:text-white">
          {step.numberPrefix}
        </div>
      </div>

      <h3 className="text-[20px] md:text-[22px] font-bold text-gray-200 mb-4 transition-colors duration-300 group-hover:text-white">
        {step.title}
      </h3>

      <p className="text-zinc-400 text-[15px] leading-relaxed font-light">
        {step.description}
      </p>
    </motion.div>
  );
}
