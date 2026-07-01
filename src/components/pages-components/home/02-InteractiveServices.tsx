"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ServiceItem } from "@/src/lib/home/servicesData";

const VrHeadsetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#716A6E]"
  >
    <rect x="2" y="7" width="20" height="11" rx="2" ry="2"></rect>
    <path d="M12 7v4"></path>
    <path d="M8 12h.01"></path>
    <path d="M16 12h.01"></path>
    <path d="M7 18a2 2 0 0 1-2-2"></path>
    <path d="M17 18a2 2 0 0 0 2-2"></path>
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function InteractiveServices({
  services,
}: {
  services: ServiceItem[];
}) {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-0 overflow-hidden">
      <div className="w-full lg:w-[90%] max-w-[1400px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="flex flex-col group cursor-pointer"
            >
              <div className="mb-8 h-12 flex items-center">
                {service.iconType === "webfont" ? (
                  <i
                    className={`${service.iconValue} text-[46px] text-[#716A6E] transition-transform duration-500 group-hover:scale-110 group-hover:text-orange-500`}
                  ></i>
                ) : (
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {service.iconValue === "vr-headset" && <VrHeadsetIcon />}
                  </div>
                )}
              </div>

              <span className="text-[#A5A2A4] font-semibold text-[15px] mb-3 block transition-colors duration-300 group-hover:text-orange-500">
                {service.id}
              </span>

              <h3 className="text-[18px] font-bold text-[#4A4F5A] mb-3 leading-snug">
                {service.title}
              </h3>

              <p className="text-[#8A8F9A] text-[15px] leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <Link
                href={service.link}
                className="flex items-center space-x-4 w-fit mt-auto"
              >
                <span className="text-[15px] font-bold text-[#716A6E] group-hover:text-orange-500 transition-colors duration-300">
                  Read More
                </span>

                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#716A6E] text-white shadow-sm group-hover:bg-orange-500 group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
