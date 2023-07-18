"use client";

import { cn } from "@/lib/utils";

const RetroGrid = ({ className }: { className?: string }) => {
  const gridStyle = {
    width: "100%",
    height: "600px",
    overflow: "hidden",
    zIndex: 10,
    perspective: "450px",
  };

  // const gridFadeStyle = {
  //   width: "100%",
  //   height: "100%",
  //   // position: "absolute",
  //   zIndex: 11,
  //   background:
  //     "radial-gradient(circle at 50% 50%, rgba(120,119,198,0.3) 0%, rgba(0, 0, 0, 0.6) 80%)",
  // };

  const gridLinesStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 0), linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 0)",
    backgroundSize: "40px 40px",
    backgroundRepeat: "repeat",
    transformOrigin: "100% 0 0",
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      <div style={gridStyle}>
        <div
          className="w-screen h-screen animate-grid"
          style={gridLinesStyle}
        />
      </div>
    </div>
  );
};

export default RetroGrid;
