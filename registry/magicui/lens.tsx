"use client";

import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// #region Interfaces

/**
 * Position Interface
 *
 * @param x - The horizontal position of the lens.
 * @param y - The vertical position of the lens.
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Lens component props.
 *
 * @component
 * @param {Object} props - The component properties
 * @param {React.ReactNode} props.children - The content that will be magnified by the lens
 * @param {number} [props.zoomFactor=1.5] - The magnification factor of the lens
 * @param {number} [props.lensSize=170] - The size of the lens in pixels (works as a diameter)
 * @param {Object} [props.position] - Determines if the lens will remain in a fixed position ()
 * @param {boolean} [props.isStatic=false] - Determines if the lens will stay in a fixed position
 * @param {() => void} [props.isFocusing] - Callback called when the lens is focusing
 * @param {boolean} [props.hovering] - External hover state
 * @param {(hovering: boolean) => void} [props.setHovering] - Function to control external hover state
 */
interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: Position;
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  animationDuration?: number;
  lensColor?: string;
  ariaLabel?: string;
}

// #endregion

// #region Constants

const getLensStyles = (
  x: number,
  y: number,
  size: number,
  color = "black",
) => ({
  maskImage: `radial-gradient(circle ${size / 2}px at ${x}px ${y}px, ${color} 100%, transparent 100%)`,
  WebkitMaskImage: `radial-gradient(circle ${size / 2}px at ${x}px ${y}px, ${color} 100%, transparent 100%)`,
  transformOrigin: `${x}px ${y}px`,
});

const getZoomStyles = (x: number, y: number, factor: number) => ({
  transform: `scale(${factor})`,
  transformOrigin: `${x}px ${y}px`,
});

// #endregion

/**
 * Lens is a component that enables zooming into images, videos and other elements.
 * It creates a magnifying glass effect that follows the mouse cursor or stays in a static position.
 */
export function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  hovering,
  setHovering,
  animationDuration = 0.3,
  lensColor = "black",
  ariaLabel = "Área de zoom",
}: LensProps) {
  if (zoomFactor < 1) {
    console.warn("zoomFactor must be greater than 1!");
    zoomFactor = 1;
  }

  if (lensSize < 0) {
    console.warn("lensSize must be greater than 0!");
    lensSize = 170;
  }

  const [localIsHovering, setLocalIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 100,
    y: 100,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;

  // #region Callbacks

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, [setIsHovering]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, [setIsHovering]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsHovering(false);
      }
    },
    [setIsHovering],
  );

  const LensContent = useCallback(
    ({ x, y }: Position) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: animationDuration, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden"
        style={{
          ...getLensStyles(x, y, lensSize, lensColor),
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0"
          style={getZoomStyles(x, y, zoomFactor)}
        >
          {children}
        </div>
      </motion.div>
    ),
    [children, lensSize, zoomFactor, animationDuration, lensColor],
  );

  // #endregion

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}

      {isStatic ? (
        <div>
          <LensContent x={position.x} y={position.y} />
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <LensContent x={mousePosition.x} y={mousePosition.y} />
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
