import { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export const heroTextVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: any) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: custom * 0.2, ease: "easeOut" as const },
  }),
};
