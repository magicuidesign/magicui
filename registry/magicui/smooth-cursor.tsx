"use client";

import { motion, useSpring, useMotionValue } from "motion/react";
import { FC, JSX, useEffect, useRef, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const rafId = useRef<number>(0);
  const timeoutId = useRef<any | undefined>(undefined);

  // Use motion values for better performance
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rotation = useMotionValue(0);
  const scale = useMotionValue(1);

  // Optimized spring configurations
  const smoothX = useSpring(cursorX, {
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  });
  const smoothY = useSpring(cursorY, {
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  });
  const smoothRotation = useSpring(rotation, {
    damping: 30,
    stiffness: 150,
    mass: 0.6,
  });
  const smoothScale = useSpring(scale, {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  });

  const updateVelocity = useCallback((currentPos: Position) => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastUpdateTime.current;

    if (deltaTime > 16) {
      // Throttle to ~60fps
      velocity.current = {
        x: (currentPos.x - lastMousePos.current.x) / deltaTime,
        y: (currentPos.y - lastMousePos.current.y) / deltaTime,
      };
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    }
  }, []);

  const smoothMouseMove = useCallback(
    (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      // Update cursor position immediately for responsiveness
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      // Calculate speed with optimized math
      const speedSquared = velocity.current.x ** 2 + velocity.current.y ** 2;

      if (speedSquared > 0.01) {
        // Reduced threshold for smoother rotation
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * 57.2958 + 90; // 180/PI ≈ 57.2958

        // Smooth angle interpolation
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        // Dampen rotation for smoother movement
        accumulatedRotation.current += angleDiff * 0.8;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        // Smooth scale animation
        scale.set(0.92);

        // Clear existing timeout
        if (timeoutId.current) clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
          scale.set(1);
        }, 100);
      }
    },
    [updateVelocity]
  );

  const throttledMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId.current = 0;
      });
    },
    [smoothMouseMove]
  );

  useEffect(() => {
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", throttledMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.body.style.cursor = "auto";
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [throttledMouseMove]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: smoothX,
        top: smoothY,
        x: "-50%",
        y: "-50%",
        rotate: smoothRotation,
        scale: smoothScale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      }}
    >
      {cursor}
    </motion.div>
  );
}
