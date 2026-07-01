"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "@/src/lib";

interface AccordionProps {
  subtitle?: string;
  title: string;
  description?: string; // Optional: Used on sub-pages, omitted on home page
  items: FAQItem[];
}

export default function Accordion({
  subtitle,
  title,
  description,
  items,
}: AccordionProps) {
  // Track which accordion item is currently open. null means all are closed.
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full pr-0 lg:pr-12">
      {/* Dynamic Header Section */}
      <div className="mb-10">
        {subtitle && (
          <div className="flex items-center text-slate-500 font-bold text-[12px] uppercase tracking-widest mb-4">
            <span className="w-2 h-4 bg-slate-300 rounded-full mr-3"></span>
            {subtitle}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-4">
          {title}
        </h2>

        {/* Render description ONLY if it is provided as a prop */}
        {description && (
          <p className="text-slate-500 text-[16px] leading-relaxed mt-6">
            {description}
          </p>
        )}
      </div>

      {/* Accordion List */}
      <div className="flex flex-col border-t border-slate-200">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="border-b border-slate-200">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full py-6 text-left group"
              >
                <span
                  className={`text-[16px] md:text-[18px] font-bold transition-colors duration-300 ${isOpen ? "text-orange-500" : "text-slate-800 group-hover:text-orange-500"}`}
                >
                  {item.title}
                </span>

                {/* Plus / Minus Icon */}
                <div className="ml-4 flex-shrink-0 text-slate-400 group-hover:text-orange-500 transition-colors">
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  )}
                </div>
              </button>

              {/* Smooth Height Animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-500 text-[15px] leading-relaxed pb-6 pr-8">
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
