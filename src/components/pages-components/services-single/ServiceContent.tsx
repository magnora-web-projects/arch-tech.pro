"use client";

import { motion } from "framer-motion";
import { fadeUpVariant } from "@/src/lib/animations/service";

export default function ServiceContent({ content }: { content: string }) {
  if (!content) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariant}
      className="w-full text-white prose-headings:text-white prose-p:text-slate-400 prose-blockquote:border-orange-500 prose-blockquote:text-slate-300"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
