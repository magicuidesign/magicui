"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const Masonry = dynamic(() => import("masonic").then((mod) => mod.Masonry), {
  ssr: false,
});

interface ExpandableMasonarySectionProps {
  children: React.ReactNode[];
}

export function ExpandableMasonarySection({
  children,
}: ExpandableMasonarySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <motion.div
        ref={sectionRef}
        className="relative overflow-hidden"
        initial={{ maxHeight: "800px" }}
        animate={{ maxHeight: expanded ? "4000px" : "800px" }}
        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        exit={{ maxHeight: "800px" }}
      >
        <Masonry
          items={children}
          columnGutter={16}
          columnWidth={300}
          render={({ data }) => <>{data}</>}
        />
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background"
            />
          )}
        </AnimatePresence>
      </motion.div>
      <Button
        onClick={handleToggle}
        className="mx-auto mt-4 block"
        variant="outline"
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </>
  );
}
