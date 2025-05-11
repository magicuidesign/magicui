import React from "react";

interface FlipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fromTop?: boolean;
  flipBgColor?: string;
  flipTextColor?: string;
  flippedText?: string;
}

const FlipButton = React.forwardRef<HTMLButtonElement, FlipButtonProps>(
  (
    {
      children,
      fromTop,
      flipBgColor = "white",
      flipTextColor = "black",
      flippedText,
      className,
      ...props
    },
    ref,
  ) => {
    const displayedFlipTextContent = flippedText || children;
    return (
      <button
        ref={ref}
        className={`relative inline-flex items-center justify-center rounded-full bg-black px-7 py-3 overflow-hidden cursor-pointer group h-12 ${className}`}
        {...props}
      >
        <span
          className={`absolute inset-0 rounded-full bg-white transition-transform duration-300 ease-in-out z-0 ${
            fromTop
              ? "-translate-y-full group-hover:-translate-y-0"
              : "translate-y-full group-hover:translate-y-0"
          } `}
          style={{ backgroundColor: flipBgColor }}
        />
        <div className="grid z-10">
          <span
            style={{
              gridArea: "1 / 1 / 1 / 1",
              visibility: "hidden",
              whiteSpace: "nowrap",
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            style={{
              gridArea: "1 / 1 / 1 / 1",
              visibility: "hidden",
              whiteSpace: "nowrap",
            }}
            aria-hidden="true"
          >
            {displayedFlipTextContent}
          </span>
          <span
            className="relative flex items-center justify-center overflow-hidden"
            style={{ gridArea: "1 / 1 / 1 / 1" }}
          >
            <span
              className={`block transition-transform duration-700 whitespace-nowrap ${
                fromTop
                  ? "group-hover:translate-y-full"
                  : "group-hover:-translate-y-full"
              }`}
            >
              {children}
            </span>
            <span
              className={`absolute block whitespace-nowrap duration-700 text-black ${
                fromTop ? "-top-full" : "top-full"
              } transition-transform ${
                fromTop
                  ? "group-hover:translate-y-[100%]"
                  : "group-hover:translate-y-[-100%]"
              } left-1/2 transform -translate-x-1/2`}
              style={{ color: flipTextColor }}
            >
              {displayedFlipTextContent}
            </span>
          </span>
        </div>
      </button>
    );
  },
);

FlipButton.displayName = "FlipButton";

export default FlipButton;
