"use client";

import React, { useState } from "react";

import AnimatedTags from "@/registry/magicui/animated-tags";

const initialTags = ["python", "javascript", "c++", "rust", "golang"];

const AnimatedTagsDemo = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex min-h-[300px] w-full items-start justify-center">
      <AnimatedTags
        initialTags={initialTags}
        selectedTags={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export default AnimatedTagsDemo;
