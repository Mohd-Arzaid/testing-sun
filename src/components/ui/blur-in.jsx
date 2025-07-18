import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const BlurIn = ({ word, className, variant, duration = 1 }) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        "font-display text-center text-md font-bold drop-shadow-sm",
        className
      )}
    >
      {word}
    </motion.h1>
  );
};

export { BlurIn };
