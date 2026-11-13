import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react"

/**
 * Public CSS variables for customizing the button.
 * Values can be overridden through the `style` prop.
 */
type SwapButtonVariables = {
  "--swap-btn-height"?: string
  "--swap-btn-radius"?: string
  "--swap-btn-font-size"?: string
  "--swap-btn-letter-spacing"?: string
  "--swap-btn-icon-size"?: string

  "--swap-btn-move-duration"?: string
  "--swap-btn-fill-duration"?: string
  "--swap-btn-color-duration"?: string
  "--swap-btn-easing"?: string

  "--swap-btn-accent"?: string
  "--swap-btn-text"?: string
  "--swap-btn-text-hover"?: string
  "--swap-btn-border"?: string

  "--swap-btn-icon-bg"?: string
  "--swap-btn-icon-color"?: string
  "--swap-btn-icon-bg-hover"?: string
  "--swap-btn-icon-color-hover"?: string

  "--swap-btn-focus-ring"?: string
  "--swap-btn-focus-offset"?: string
}

export type SwapButtonStyle = CSSProperties & SwapButtonVariables

type SharedProps = {
  children: ReactNode
  icon?: ReactNode
  className?: string
  style?: SwapButtonStyle
}

type SwapButtonAsButton = SharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "style" | "type"
  > & {
    href?: never
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  }

type SwapButtonAsLink = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "style"
  > & {
    href: string
    type?: never
  }

export type SwapButtonProps = SwapButtonAsButton | SwapButtonAsLink

const defaultStyles: SwapButtonStyle = {
  "--swap-btn-height": "52px",
  "--swap-btn-radius": "999px",
  "--swap-btn-font-size": "11px",
  "--swap-btn-letter-spacing": "2.5px",
  "--swap-btn-icon-size": "28px",

  "--swap-btn-move-duration": "var(--dur-move, 0.55s)",
  "--swap-btn-fill-duration": "var(--dur-fill, 0.50s)",
  "--swap-btn-color-duration": "var(--dur-color, 0.35s)",
  "--swap-btn-easing": "var(--ease-swap, cubic-bezier(0.76, 0, 0.24, 1))",

  "--swap-btn-accent": "var(--color-accent-red, #FF4D36)",
  "--swap-btn-text": "var(--color-primary-black, #0B0B0B)",
  "--swap-btn-text-hover": "#FFFFFF",
  "--swap-btn-border": "var(--color-primary-black, #FFFFFF)",

  "--swap-btn-icon-bg": "var(--swap-btn-accent)",
  "--swap-btn-icon-color": "#FFFFFF",
  "--swap-btn-icon-bg-hover": "#FFFFFF",
  "--swap-btn-icon-color-hover": "var(--swap-btn-accent)",

  "--swap-btn-focus-ring": "var(--swap-btn-accent)",
  "--swap-btn-focus-offset": "transparent",
}

/**
 * Main button styling.
 *
 * Tailwind handles the structure, background wipe,
 * typography, colors, focus ring, and transitions.
 */
const buttonClasses = [
  "group relative isolate inline-flex",
  "h-[var(--swap-btn-height)]",
  "items-center justify-start",
  "overflow-hidden",
  "rounded-[var(--swap-btn-radius)]",
  "border border-[color:var(--swap-btn-border)]",
  "bg-transparent",
  "pl-14 pr-4",

  "font-mono font-semibold uppercase leading-none",
  "text-[length:var(--swap-btn-font-size)]",
  "tracking-[var(--swap-btn-letter-spacing)]",

  "transition-colors",
  "duration-[var(--swap-btn-color-duration)]",

  "hover:text-[color:var(--swap-btn-text-hover)]",
  "focus-visible:text-[color:var(--swap-btn-text-hover)]",

  "before:absolute before:inset-0 before:z-0",
  "before:origin-left before:scale-x-0",
  "before:bg-[var(--swap-btn-accent)]",
  "before:content-['']",
  "before:transition-transform",
  "before:duration-[var(--swap-btn-fill-duration)]",
  "before:ease-[var(--swap-btn-easing)]",

  "hover:before:scale-x-100",
  "focus-visible:before:scale-x-100",
].join(" ")

/**
 * Label movement:
 * Default: translate3d(0, 0, 0)
 * Hover:   translate3d(-(icon size + 12px), 0, 0)
 *
 * This keeps the label and icon synchronized even
 * when the icon size is customized.
 */
const labelClasses = [
  "relative z-10 inline-block",
  "translate-x-0",
  "transition-transform",
  "duration-[var(--swap-btn-move-duration)]",
  "ease-[var(--swap-btn-easing)]",
  "group-hover:-translate-x-10",
  "group-focus-visible:-translate-x-10",
].join(" ")

const iconPositionClasses = [
  "absolute left-3 top-1/2 z-10",
  "h-7 w-7",
  "-translate-y-1/2",
  "transition-[left]",
  "duration-[var(--swap-btn-move-duration)]",
  "ease-[var(--swap-btn-easing)]",
  "group-hover:left-[calc(100%_-_40px)]",
  "group-focus-visible:left-[calc(100%_-_40px)]",
].join(" ")

const iconBadgeClasses = [
  "grid h-full w-full place-items-center",
  "rounded-full",

  "bg-[var(--swap-btn-icon-bg)]",
  "text-[color:var(--swap-btn-icon-color)]",

  "transition-colors",
  "duration-[var(--swap-btn-color-duration)]",
  "ease-[var(--swap-btn-easing)]",

  "group-hover:bg-[var(--swap-btn-icon-bg-hover)]",
  "group-hover:text-[color:var(--swap-btn-icon-color-hover)]",

  "group-focus-visible:bg-[var(--swap-btn-icon-bg-hover)]",
  "group-focus-visible:text-[color:var(--swap-btn-icon-color-hover)]",

  "[&>svg]:h-3.5 [&>svg]:w-3.5",
  "[&>svg]:shrink-0",
].join(" ")

function DefaultArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SlideSwapButton(props: SwapButtonProps) {
  const { children, icon, className, style, href, type, ...nativeProps } = props

  // Merge defaults with custom design tokens.
  const mergedStyle: SwapButtonStyle = {
    ...defaultStyles,
    ...style,
  }

  // Shared visual content.
  const content = (
    <>
      <span className={labelClasses}>{children}</span>

      <span
        aria-hidden="true"
        className={[
          iconPositionClasses,
          "`h-(--swap-btn-icon-size)",
          "w-(--swap-btn-icon-size)",
        ].join(" ")}
      >
        <span className={iconBadgeClasses}>{icon ?? <DefaultArrowIcon />}</span>
      </span>
    </>
  )

  const combinedClasses = [buttonClasses, className].filter(Boolean).join(" ")

  // Render an anchor whenever href is supplied.
  if (typeof href === "string") {
    return (
      <a
        {...(nativeProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        className={combinedClasses}
        style={mergedStyle}
      >
        {content}
      </a>
    )
  }

  // Otherwise render a native button.
  return (
    <button
      {...(nativeProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      type={type ?? "button"}
      className={combinedClasses}
      style={mergedStyle}
    >
      {content}
    </button>
  )
}
