import { cn } from "@/lib/utils";
import React from "react";

interface GlassmorphismButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "circle" | "diamond";
  color?: string;
  children: React.ReactNode;
}

/**
 * A React functional component that renders a customizable glassmorphism-styled button.
 * This button supports a "diamond" variant and allows for dynamic color and className customization.
 * It includes hover effects, animations, and a visually appealing glass-like appearance.
 *
 * @param {GlassmorphismButtonProps} props - The properties for the GlassmorphismButton component.
 * @param {string} [props.variant="diamond"] - The visual style variant of the button. Defaults to "diamond".
 * @param {string} [props.color="purple"] - The color of the button. Defaults to "purple".
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the underlying button element.
 * @returns {JSX.Element} The rendered glassmorphism button component.
 */
export const GlassmorphismButton = React.forwardRef<
  HTMLButtonElement,
  GlassmorphismButtonProps
>(
  (
    { variant = "diamond", color = "purple", children, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        style={{ color }}
        className={cn(
          "group relative w-fit h-12 m-2 transition-all duration-500 cursor-pointer",
          // before styling
          "before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-16 before:h-16 before:rounded-full before:transition-all before:duration-500 before:pointer-events-none before:bg-current",
          // before hover styling
          "hover:before:w-full hover:before:h-full hover:before:rounded-4xl hover:before:rotate-0",
          // before shadow / glow
          "before:shadow-current before:shadow-[0_0_5px_current,0_0_15px_current,0_0_30px_current,0_0_60px_current]",
          // diamond variant
          variant === "diamond" &&
            "before:rotate-45 before:rounded-[10px] before:w-14 before:h-14",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "inset-0 relative px-10 w-full h-full flex justify-center items-center z-10 rounded-4xl",
            "text-white hover:text-white",
            "bg-white/5 dark:bg-white/10",
            "backdrop-blur-lg",
            "border-t border-b border-white/30 dark:border-white/10",
            // hover transition
            "hover:tracking-wide transition-all duration-500 overflow-hidden",
            // before styling
            "before:content-[''] before:absolute before:top-0 before:left-[80%] before:w-1/2 before:h-full before:-translate-x-[150%] before:skew-x-[45deg] before:transition-all before:duration-500",
            // before background color
            "before:bg-gradient-to-l before:from-white/20 dark:before:from-white/15 before:to-transparent",
            // on hover before styles
            "hover:before:translate-x-[200%]",
            // on group hover styles
            "group-hover:translate-y-px",
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

GlassmorphismButton.displayName = "GlassmorphismButton";
