"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFaq } from "@/src/hooks";
import {
  slideLeftVariant,
  slideRightVariant,
} from "@/src/lib/animations/service";
import { FAQItemServicesPage } from "@/src/lib/types/";

export default function ServiceFaq({
  title,
  description,
  faqs,
}: {
  title: string;
  description: string;
  faqs: FAQItemServicesPage[];
}) {
  const { openIndex, toggleFaq } = useFaq(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-32 md:mt-48 pt-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideRightVariant}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="flex items-center text-orange-500 font-bold text-[11px] uppercase tracking-[0.2em] mb-6">
            <span className="w-8 h-[2px] bg-orange-500 mr-4"></span>
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
            {title}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideLeftVariant}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                className={`group cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-white/5 border-white/20"
                    : "bg-transparent border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between p-6 md:p-8">
                  <h4
                    className={`text-lg md:text-xl font-bold transition-colors duration-300 pr-8 ${
                      isOpen
                        ? "text-orange-500"
                        : "text-white group-hover:text-slate-200"
                    }`}
                  >
                    {faq.question}
                  </h4>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isOpen
                        ? "border-orange-500 bg-orange-500 text-white rotate-180"
                        : "border-white/20 text-white/50 group-hover:text-white group-hover:border-white/50"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-slate-400 text-[16px] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
