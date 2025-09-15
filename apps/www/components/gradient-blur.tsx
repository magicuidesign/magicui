import React from "react";

import { cn } from "@/lib/utils";

interface GradientBlurProps {
  numberOfLayers?: number;
  className?: string;
}

const GradientBlur: React.FC<GradientBlurProps> = ({
  numberOfLayers = 6,
  className = "",
}) => {
  const generateLayers = () => {
    const layers = [];
    for (let i = 0; i < numberOfLayers; i++) {
      const blurAmount = Math.pow(2, i);
      const startPercent = (i * 100) / numberOfLayers;
      const midPercent = ((i + 1) * 100) / numberOfLayers;
      const endPercent = ((i + 2) * 100) / numberOfLayers;
      layers.push(
        <div
          key={i}
          className="absolute inset-0"
          style={{
            zIndex: i + 2,
            backdropFilter: `blur(${blurAmount}px)`,
            mask: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) ${startPercent}%,
              rgba(0, 0, 0, 1) ${midPercent}%,
              rgba(0, 0, 0, 1) ${endPercent}%,
              rgba(0, 0, 0, 0) ${endPercent + (endPercent - midPercent)}%
            )`,
          }}
        />,
      );
    }
    return layers;
  };

  return (
    <div className={cn(`z-5 pointer-events-none inset-x-0 h-full`, className)}>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backdropFilter: "blur(0.5px)",
          mask: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) ${100 / (numberOfLayers * 4)}%,
            rgba(0, 0, 0, 1) ${100 / (numberOfLayers * 2)}%,
            rgba(0, 0, 0, 0) ${(100 * 3) / (numberOfLayers * 4)}%
          )`,
        }}
      />
      {generateLayers()}
      <div
        className="absolute inset-0"
        style={{
          zIndex: numberOfLayers + 2,
          backdropFilter: `blur(${Math.pow(2, numberOfLayers)}px)`,
          mask: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) ${100 - 100 / (numberOfLayers * 2)}%,
            rgba(0, 0, 0, 1) 100%
          )`,
        }}
      />
    </div>
  );
};

export default GradientBlur;
