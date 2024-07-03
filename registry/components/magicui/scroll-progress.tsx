import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}

export default function ScrollProgress({
  className,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
      <motion.div
        className={cn("fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] z-[1000]", className)}
        style={{
          scaleX,
        }}
      />
  );
}
