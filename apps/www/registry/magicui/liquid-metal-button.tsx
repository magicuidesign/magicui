import React from "react"
import { LiquidMetal } from "@paper-design/shaders-react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidMetalButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all overflow-hidden",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-lg outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default:
          "border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.1)] text-primary-foreground dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.3)] dark:text-primary",
        outline: "border border-input text-accent-foreground",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidMetalButtonVariants> {
  asChild?: boolean
  colorBack?: string
  colorTint?: string
  repetition?: number
  softness?: number
  shiftRed?: number
  shiftBlue?: number
  distortion?: number
  contour?: number
  shape?: "none" | "circle" | "daisy" | "metaballs"
  speed?: number
  scale?: number
}

const LiquidMetalButton = React.forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      colorBack,
      colorTint,
      repetition = 4,
      softness = 0.3,
      shiftRed = 0.3,
      shiftBlue = 0.3,
      distortion = 0.1,
      contour = 1,
      shape = "none",
      speed = 1,
      scale = 2,
      children,
      ...props
    },
    ref
  ) => {
    const defaultColorBack = "#0a0a0a"
    const defaultColorTint = "#ffffff"

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-slot="button"
        className={cn(liquidMetalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <LiquidMetal
            width="100%"
            height="100%"
            colorBack={colorBack ?? defaultColorBack}
            colorTint={colorTint ?? defaultColorTint}
            repetition={repetition}
            softness={softness}
            shiftRed={shiftRed}
            shiftBlue={shiftBlue}
            distortion={distortion}
            contour={contour}
            shape={shape}
            speed={speed}
            scale={scale}
          />
        </div>
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)

LiquidMetalButton.displayName = "LiquidMetalButton"

export {
  LiquidMetalButton,
  liquidMetalButtonVariants,
  type LiquidMetalButtonProps,
}
