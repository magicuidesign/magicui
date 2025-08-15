"use client";

import { useState } from "react";
import { CircleX, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export interface AnimatedTagsProps {
  initialTags?: string[];
  selectedTags?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export default function AnimatedTags({
  initialTags = ["python", "javascript", "c++"],
  selectedTags: controlledSelectedTags,
  onChange,
  className = "",
}: AnimatedTagsProps) {
  const [uncontrolledSelectedTags, setUncontrolledSelectedTags] = useState<
    string[]
  >([]);

  const currentSelectedTags =
    controlledSelectedTags ?? uncontrolledSelectedTags;

  const availableTags = initialTags.filter(
    (tag) => !currentSelectedTags.includes(tag),
  );

  const handleSelectTag = (tag: string) => {
    const newSelection = [...currentSelectedTags, tag];
    if (onChange) {
      onChange(newSelection);
    } else {
      setUncontrolledSelectedTags(newSelection);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newSelection = currentSelectedTags.filter(
      (selected) => selected !== tag,
    );
    if (onChange) {
      onChange(newSelection);
    } else {
      setUncontrolledSelectedTags(newSelection);
    }
  };

  return (
    <div className={`flex w-[300px] flex-col gap-4 p-4 ${className}`}>
      <div className="flex flex-col items-start justify-center gap-1">
        <p id="selected-tags-label" className="text-foreground">
          Chosen Tags
        </p>
        <AnimatePresence>
          <ul
            aria-labelledby="selected-tags-label"
            className="bg-background flex min-h-12 w-full flex-wrap items-center gap-1 rounded-xl border border-border p-2"
          >
            {currentSelectedTags?.map((tag) => (
              <motion.li
                key={tag}
                onClick={() => handleRemoveTag(tag)}
                layout
                initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3, bounce: 0, type: "spring" }}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-primary px-2 py-1 transition-colors"
              >
                {tag}{" "}
                <CircleX
                  size={16}
                  className="flex items-center justify-center rounded-full transition-all duration-300 ease-in-out group-hover:text-red-400"
                />
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <ul
          aria-labelledby="available-tags-label"
          className="flex flex-wrap items-center gap-1"
        >
          {availableTags.map((tag, idx) => (
            <motion.li
              layout
              key={idx}
              className="group bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-border px-2 py-1 transition-colors"
              onClick={() => handleSelectTag(tag)}
              initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, bounce: 0, type: "spring" }}
            >
              {tag}{" "}
              <Plus
                size={16}
                className="flex items-center justify-center rounded-full transition-all duration-300 ease-in-out group-hover:text-primary"
              />
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}
