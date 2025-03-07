"use client";

import React, { useEffect, useRef } from "react";

interface GradientMaskedTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientMaskedText({
  children,
  className = "",
}: GradientMaskedTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  // Updated effect to compute font size from both inline and class styles
  useEffect(() => {
    if (containerRef.current) {
      // Get all styles, including those from classes
      const computedStyle = window.getComputedStyle(containerRef.current);
      const computedFontSize = parseFloat(computedStyle.fontSize);

      // Set the fontSize after all styles are applied
      // Using requestAnimationFrame to ensure styles are fully loaded
      requestAnimationFrame(() => {
        setFontSize(computedFontSize);
      });
    }
  }, [className]); // Add className as dependency to re-run when classes change

  // Update dependency array to use inferred fontSize
  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setDimensions({
        width: bbox.width,
        height: bbox.height,
      });
    }
  }, [children, fontSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    const colors = [
      "#FF0080",
      "#7928CA",
      "#0070F3",
      "#22c55e",
      "#ff4d4d",
      "#f97316",
    ];

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.003;

      colors.forEach((color, i) => {
        const x =
          canvas.width *
          (0.5 +
            Math.cos(time * 0.8 + i * 1.3) * 0.4 +
            Math.sin(time * 0.5 + i * 0.7) * 0.2);
        const y =
          canvas.height *
          (0.5 +
            Math.sin(time * 0.7 + i * 1.5) * 0.4 +
            Math.cos(time * 0.6 + i * 0.8) * 0.2);

        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          canvas.width * 0.4,
        );

        gradient.addColorStop(0, `${color}99`);
        gradient.addColorStop(0.5, `${color}33`);
        gradient.addColorStop(1, "#00000000");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [dimensions]);

  return (
    <span
      ref={containerRef}
      className={`inline-block align-middle ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <div className="relative">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0"
        >
          <defs>
            <mask id={`text-mask-${children}`}>
              <rect width="100%" height="100%" fill="black" />
              <text
                ref={textRef}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                style={{ fontSize }}
              >
                {children}
              </text>
            </mask>
          </defs>
        </svg>

        <canvas
          ref={canvasRef}
          style={{
            maskImage: `url(#text-mask-${children})`,
            WebkitMaskImage: `url(#text-mask-${children})`,
          }}
          className="h-full w-full"
        />
      </div>
    </span>
  );
}
