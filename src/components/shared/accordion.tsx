"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "@/src/lib";

interface AccordionProps {
  subtitle?: string;
  title: string;
  description?: string;
  items: FAQItem[];
}

export default function Accordion({
  subtitle,
  title,
  description,
  items,
}: AccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full pr-0 lg:pr-6 bg-transparent">
      <div className="mb-12">
        {subtitle && (
          <div className="flex items-center text-zinc-500 font-medium text-[11px] uppercase tracking-[0.3em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mr-3"></span>
            {subtitle}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-4">
          {title}
        </h2>

        {description && (
          <p className="text-zinc-400 text-[15px] font-light leading-relaxed mt-6 max-w-lg">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col border-t border-white/10">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="border-b border-white/5">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full py-6 text-left group"
              >
                <span
                  className={`text-[16px] md:text-[18px] font-semibold tracking-tight transition-colors duration-300 ${
                    isOpen
                      ? "text-white"
                      : "text-zinc-400 group-hover:text-white"
                  }`}
                >
                  {item.title}
                </span>

                <div className="ml-4 flex-shrink-0 text-zinc-500 group-hover:text-white transition-colors">
                  <div
                    className={`w-8 h-8 rounded-full border border-white/5 flex items-center justify-center transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-400 text-[14px] leading-relaxed pb-6 pr-8 font-light">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
