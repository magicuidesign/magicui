"use client";
import { useRef } from "react";
import Loader from "../magicui/loader";

const LoaderDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative rounded-lg min-h-[26rem] z-[1] w-full justify-center overflow-hidden "
      ref={ref}
    >
      <Loader
        name="jellyTriangle"
        size={"50"}
        containerRef={ref}
        bgColor="bg-gradient-to-b from-cyan-200/50 to-blue-300/50"
      />
    </div>
  );
};

export default LoaderDemo;
