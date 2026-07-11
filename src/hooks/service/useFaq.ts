"use client";

import { useState } from "react";

export function useFaq(initialIndex: number | null = 0) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return { openIndex, toggleFaq };
}
