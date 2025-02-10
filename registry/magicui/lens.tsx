"use client";

import React, { useCallback, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Position {
  /** The x coordinate of the lens */
  x: number;
  /** The y coordinate of the lens */
  y: number;
}

interface LensProps {
  /** The children of the lens */
  children: React.ReactNode;
  /** The zoom factor of the lens */
  zoomFactor?: number;
  /** The size of the lens */
  lensSize?: number;
  /** The position of the lens */
  position?: Position;
  /** The default position of the lens */
  defaultPosition?: Position;
  /** Whether the lens is static */
  isStatic?: boolean;
  /** The duration of the animation */
  animationDuration?: number;
  /** The color of the lens */
  lensColor?: string;
  /** The aria label of the lens */
  ariaLabel?: string;
}

const createLensStyles = (
  x: number,
  y: number,
  size: number,
  color: string,
) => ({
  maskImage: `radial-gradient(circle ${size / 2}px at ${x}px ${y}px, ${color} 100%, transparent 100%)`,
  WebkitMaskImage: `radial-gradient(circle ${size / 2}px at ${x}px ${y}px, ${color} 100%, transparent 100%)`,
  transformOrigin: `${x}px ${y}px`,
});

const createZoomStyles = (x: number, y: number, factor: number) => ({
  transform: `scale(${factor})`,
  transformOrigin: `${x}px ${y}px`,
});

export function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  animationDuration = 0.3,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) {
  const validatedZoomFactor = zoomFactor < 1 ? 1 : zoomFactor;
  const validatedLensSize = lensSize < 0 ? 170 : lensSize;

  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 100,
    y: 100,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsHovering(false);
  }, []);

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: animationDuration, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden"
        style={{
          ...createLensStyles(x, y, validatedLensSize, lensColor),
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0"
          style={createZoomStyles(x, y, validatedZoomFactor)}
        >
          {children}
        </div>
      </motion.div>
    );
  }, [
    currentPosition,
    validatedLensSize,
    lensColor,
    validatedZoomFactor,
    children,
    animationDuration,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {isStatic || defaultPosition ? (
        <div>{LensContent}</div>
      ) : (
        <AnimatePresence>
          {isHovering && <div>{LensContent}</div>}
        </AnimatePresence>
      )}
    </div>
  );
}
