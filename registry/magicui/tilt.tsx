"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export interface TiltProps {
  children: React.ReactNode;
  perspective?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  speed?: number;
  className?: string;
  glareOpacity?: number;
  disabled?: boolean;
  rotationStrength?: number;
}

export function Tilt({
  children,
  perspective = 1000,
  tiltMaxAngleX = 20,
  tiltMaxAngleY = 20,
  scale = 1.01,
  speed = 200,
  className = "",
  glareOpacity = 0.2,
  disabled = false,
  rotationStrength = 0.3,
}: TiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: speed };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scaleValue = useSpring(1, springConfig);

  const tiltXInput = disabled ? [0, 0] : [-0.5, 0.5];
  const tiltYInput = disabled ? [0, 0] : [-0.5, 0.5];
  const tiltXOutput = disabled
    ? [0, 0]
    : [tiltMaxAngleX * rotationStrength, -tiltMaxAngleX * rotationStrength];
  const tiltYOutput = disabled
    ? [0, 0]
    : [-tiltMaxAngleY * rotationStrength, tiltMaxAngleY * rotationStrength];

  const tiltX = useTransform(mouseY, tiltXInput, tiltXOutput);
  const tiltY = useTransform(mouseX, tiltYInput, tiltYOutput);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || disabled) return;

    const rect = containerRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const posX = (e.clientX - centerX) / rect.width;
    const posY = (e.clientY - centerY) / rect.height;

    mouseX.set(posX);
    mouseY.set(posY);
  };

  useEffect(() => {
    if (disabled) return;

    const unsubscribeX = tiltX.onChange((v) => rotateX.set(v));
    const unsubscribeY = tiltY.onChange((v) => rotateY.set(v));

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [tiltX, tiltY, rotateX, rotateY, disabled]);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    scaleValue.set(scale);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    scaleValue.set(1);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: scaleValue,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>

        {isHovered && glareOpacity > 0 && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              borderRadius: "inherit",
              zIndex: 2,
            }}
          >
            <div
              className="absolute bg-gradient-radial from-white to-transparent"
              style={{
                top: glareY.get(),
                left: glareX.get(),
                width: "200%",
                height: "200%",
                opacity: glareOpacity,
                transform: "translate(-50%, -50%)",
                borderRadius: "inherit",
                pointerEvents: "none",
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
