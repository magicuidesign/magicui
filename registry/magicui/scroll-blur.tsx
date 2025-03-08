"use client";

import { useEffect, useState, ReactNode } from "react";

interface ScrollBlurProps {
  children?: ReactNode;
  blurHeight?: number; // Height of the blur effect in pixels
  blurStrength?: number; // Strength of the blur effect (1-20)
  blurColor?: string; // Color of the blur gradient
}

export default function ScrollBlur({
  children,
  blurHeight = 30,
  blurStrength = 8,
  blurColor = "rgba(26, 26, 26, 0.8)",
}: ScrollBlurProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Get initial measurements
    setViewportHeight(window.innerHeight);
    setContentHeight(document.body.scrollHeight);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setContentHeight(document.body.scrollHeight);
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate blur opacity based on scroll position
  const calculateBlurOpacity = () => {
    // If we're near the bottom of the page, reduce the blur
    const maxScroll = contentHeight - viewportHeight;
    if (maxScroll <= 0) return 0;

    const scrollPercentage = scrollPosition / maxScroll;
    const remainingScroll = 1 - scrollPercentage;

    // Fade out blur as we approach the bottom
    if (remainingScroll < 0.2) {
      return remainingScroll * 5; // Linear fade out in the last 20%
    }

    return 1; // Full opacity otherwise
  };

  const blurOpacity = calculateBlurOpacity();

  return (
    <div className="relative">
      {/* Main content */}
      {children && <div className="relative">{children}</div>}

      {/* Blur overlay */}
      {scrollPosition > 50 && (
        <div
          className="fixed bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: `${blurHeight}px`,
            background: `linear-gradient(to bottom, transparent, ${blurColor})`,
            backdropFilter: `blur(${blurStrength * blurOpacity}px)`,
            WebkitBackdropFilter: `blur(${blurStrength * blurOpacity}px)`,
            opacity: blurOpacity,
            transition: "opacity 0.2s ease-out, backdrop-filter 0.2s ease-out",
            zIndex: 50, // Increased z-index to ensure it appears above the sidebar
          }}
        />
      )}
    </div>
  );
}
