"use client";

import ScrollBlur from "@/registry/magicui/scroll-blur";

export default function ScrollblurDemo() {
  return (
    <div className="z-10 rounded-lg p-4">
      <ScrollBlur />
      <h2 className="pb-4 font-bold">
        Note: The scroll blur effect is shown at the bottom of the page as you
        scroll.
      </h2>
    </div>
  );
}
