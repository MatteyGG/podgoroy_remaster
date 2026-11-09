"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

export default function AnimatedSliderFrame({ children, direction, arched = false }: {
  children: React.ReactNode;
  direction: "left" | "right";
  arched?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const frameVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : direction === "right" ? "20%" : "-20%" },
    visible: { opacity: 1, x: 0, transition: { duration: reducedMotion ? 0 : 0.7, ease: "easeOut" } },
  };
  const shadowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.18, transition: { duration: reducedMotion ? 0 : 0.7 } },
  };

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={frameVariants}
    >
      <motion.div
        aria-hidden="true"
        variants={shadowVariants}
        className={`absolute inset-0 z-0 bg-black blur-lg ${arched ? "slider-arch" : "rounded-2xl"}`}
      />
      <div className={`relative z-10 overflow-hidden shadow-lg ${arched ? "slider-arch" : "rounded-2xl"}`}>
        {children}
      </div>
    </motion.div>
  );
}
