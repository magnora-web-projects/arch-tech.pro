import { motion } from "framer-motion";
import { cardVariants, ProcessStep } from "@/src/lib";

export default function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center text-center group bg-white/50 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-[#2B2D35] flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-500 shadow-md">
          <i className={`${step.iconClass} text-3xl text-white`}></i>
        </div>

        <div className="absolute -top-1 -right-4 text-[#8A8F9A] font-medium text-[15px] transition-colors duration-300 group-hover:text-orange-500">
          {step.numberPrefix}
        </div>
      </div>

      <h3 className="text-[20px] md:text-[22px] font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-orange-600">
        {step.title}
      </h3>

      <p className="text-slate-500 text-[15px] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
