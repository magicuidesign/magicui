"use client";

import { motion } from "motion/react"; // Updated import for MagicUI
import React, {
  HTMLAttributes,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils"; // Use MagicUI's utility function

interface AnimatedGridBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  animatedCellsCount?: number;
  animationSpeed?: number;
  glowIntensity?: number;
  animationDelay?: number;
  backgroundColor?: string;
}

const AnimatedGridCell = ({
  gridSize,
  column,
  delay,
  speed,
  glowIntensity,
  gridColor,
  viewportHeight,
}: {
  gridSize: number;
  column: number;
  delay: number;
  speed: number;
  glowIntensity: number;
  gridColor: string;
  viewportHeight: number;
}) => {
  const hue =
    gridColor === "cyan"
      ? "180"
      : gridColor === "blue"
        ? "220"
        : gridColor === "green"
          ? "120"
          : "180";
  const totalDistance = viewportHeight + gridSize * 12;

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{
        left: `${column * gridSize}px`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
      }}
      initial={{ y: -gridSize * 6, opacity: 0 }}
      animate={{
        y: totalDistance,
        opacity: [0, glowIntensity * 0.5, glowIntensity, glowIntensity, 0],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: Math.random() * 2 + 1,
      }}
    >
      {/* Main glowing cell */}
      <div
        className="w-full h-full"
        style={{
          background: `hsl(${hue} 100% 70% / ${glowIntensity})`,
          boxShadow: `0 0 ${gridSize}px hsl(${hue} 100% 70% / ${glowIntensity * 0.8})`,
          border: `1px solid hsl(${hue} 100% 50% / ${glowIntensity})`,
        }}
      />

      {/* Simple trailing cells */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full"
          style={{
            top: `-${(i + 1) * gridSize}px`,
            background: `hsl(${hue} 100% 50% / ${glowIntensity * (0.7 - i * 0.12)})`,
            border: `1px solid hsl(${hue} 100% 50% / ${glowIntensity * (0.5 - i * 0.08)})`,
          }}
        />
      ))}
    </motion.div>
  );
};

export const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({
  children,
  className,
  gridSize = 20,
  gridColor = "cyan",
  animatedCellsCount = 8,
  animationSpeed = 6,
  glowIntensity = 0.6,
  animationDelay = 3,
  backgroundColor = "hsl(0 0% 3%)",
  ...props
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const generateAnimatedCells = useCallback(() => {
    if (dimensions.width === 0) return [];

    const columns = Math.ceil(dimensions.width / gridSize) + 1;

    return Array.from({ length: animatedCellsCount }, (_, i) => ({
      id: i,
      column: Math.floor(Math.random() * columns),
      delay: Math.random() * animationDelay,
      speed: animationSpeed + Math.random() * 2 - 1,
    }));
  }, [
    animatedCellsCount,
    gridSize,
    animationDelay,
    animationSpeed,
    dimensions.width,
  ]);

  const animatedCells = useMemo(
    () => generateAnimatedCells(),
    [generateAnimatedCells],
  );

  const gridColorValue = useMemo(() => {
    const colorMap: Record<string, string> = {
      cyan: "hsl(180 100% 50% / 0.2)",
      blue: "hsl(220 100% 50% / 0.2)",
      green: "hsl(120 100% 50% / 0.2)",
      purple: "hsl(280 100% 50% / 0.2)",
      pink: "hsl(320 100% 50% / 0.2)",
    };
    return colorMap[gridColor] || "hsl(180 100% 50% / 0.2)";
  }, [gridColor]);

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Static Grid Background - NO ANIMATION */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor,
          backgroundImage: `
            linear-gradient(${gridColorValue} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColorValue} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Animated Grid Cells */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {animatedCells.map((cell) => (
          <AnimatedGridCell
            key={cell.id}
            gridSize={gridSize}
            column={cell.column}
            delay={cell.delay}
            speed={cell.speed}
            glowIntensity={glowIntensity}
            gridColor={gridColor}
            viewportHeight={dimensions.height}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
