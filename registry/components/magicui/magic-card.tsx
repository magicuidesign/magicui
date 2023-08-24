"use client";

import clsx, { ClassValue } from "clsx";
import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface MagicContainerProps {
  children?: ReactNode;
  className?: any;
}

const MagicContainer = ({ children, className }: MagicContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    init();
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
  }, []);

  useEffect(() => {
    init();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
    };
  }, [setBoxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const init = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;

      mouse.current.x = x;
      mouse.current.y = y;
      boxes.forEach((box) => {
        const boxX =
          -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
        const boxY =
          -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
        box.style.setProperty("--mouse-x", `${boxX}px`);
        box.style.setProperty("--mouse-y", `${boxY}px`);

        if (inside) {
          box.style.setProperty("--opacity", `1`);
        } else {
          box.style.setProperty("--opacity", `0`);
        }
      });
    }
  };

  return (
    <div className={cn("h-full w-full", className)} ref={containerRef}>
      {children}
    </div>
  );
};

interface MagicCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 600
   * @type number
   * @description
   * The size of the spotlight effect in pixels
   * */
  size?: number;

  /**
   * @default true
   * @type boolean
   * @description
   * Whether to show the spotlight
   * */
  spotlight?: boolean;

  /**
   * @default "rgba(255,255,255,0.03)"
   * @type string
   * @description
   * The color of the spotlight
   * */
  spotlightColor?: string;

  /**
   * @default true
   * @type boolean
   * @description
   * Whether to isolate the card which is being hovered
   * */
  isolated?: boolean;

  /**
   * @default "rgba(255,255,255,0.03)"
   * @type string
   * @description
   * The background of the card
   * */
  background?: string;

  [key: string]: any;
}

const MagicCard = ({
  className,
  children,
  size = 600,
  spotlight = true,
  spotlightColor = "rgba(120,119,198,0.1)",
  borderColor = "rgba(120,119,198,0.7)",
  isolated = true,
  ...props
}: MagicCardProps) => {
  return (
    <div
      {...props}
      className={cn("relative h-full w-full rounded-2xl", className)}
      style={
        {
          "--mask-size": `${size}px`,
          "--spotlight-color": `${spotlightColor}`,
          "--border-color": `${borderColor}`,
        } as CSSProperties
      }
    >
      {/* Border */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-gray-300 transition-opacity duration-500 dark:bg-gray-700",
          // "bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)]",
          "bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--border-color),transparent_100%)]",
        )}
      />

      {/* Background */}
      <div className={"absolute inset-[1px] rounded-2xl bg-background"} />

      {children}

      {/* Spotlight */}
      {spotlight && (
        <div
          className={
            "blur-xs pointer-events-none absolute left-0 top-0 h-full w-full rounded-2xl bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color),transparent_40%)] transition-opacity duration-500"
          }
        />
      )}
    </div>
  );
};

export { MagicCard, MagicContainer };
