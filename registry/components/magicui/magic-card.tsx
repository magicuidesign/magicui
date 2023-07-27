"use client";

import clsx, { ClassValue } from "clsx";
import React, {
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
        Array.from(containerRef.current.children).map((el) => el as HTMLElement)
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
    <div className={className} ref={containerRef}>
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
   * ]@default "#475569"
   * @type string
   * @description
   * The border color of the card
   */
  borderColor?: string;

  /**
   * @default 1
   * @type number
   * @description
   * The border width of the card
   * */
  borderWidth?: number;

  /**
   * @default 16
   * @type number
   * @description
   * The border radius of the card
   * */
  borderRadius?: number;

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
}

const MagicCard = ({
  as: Element = <div />, // Default to 'div' if no component is passed
  className,
  children,
  size = 600,
  borderColor = "rgba(120,119,198)",
  borderWidth = 1,
  borderRadius = 16,
  spotlight = true,
  spotlightColor = "rgba(120,119,198,0.08)",
  isolated = true,
  background = `rgba(120,119,198, 0.2)`,
}: MagicCardProps) => {
  const spotlightStyles =
    "before:pointer-events-none before:absolute before:w-full before:h-full before:rounded-[var(--border-radius)] before:top-0 before:left-0 before:duration-500 before:transition-opacity before:bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color),transparent_40%)] before:z-[3] before:blur-xs";

  const borderStyles =
    "after:pointer-events-none after:absolute after:w-full after:h-full after:rounded-[var(--border-radius)] after:top-0 after:left-0 after:duration-500 after:transition-opacity after:bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--border-color),transparent_40%)] after:z-[1]";

  return React.cloneElement(
    Element,
    {
      style: {
        "--border-radius": `${borderRadius}px`,
        "--border-width": `${borderWidth}px`,
        "--border-color": `${borderColor}`,
        "--mask-size": `${size}px`,
        "--spotlight-color": `${spotlightColor}`,
        background,
      } as CSSProperties,
      className: cn(
        "relative w-full h-full rounded-[var(--border-radius)] overflow-hidden",
        isolated && [borderStyles, "after:opacity-0 after:hover:opacity-100"],
        isolated &&
          spotlight && [
            spotlightStyles,
            "before:opacity-0 before:hover:opacity-100",
          ],
        !isolated && [borderStyles, "after:opacity-[var(--opacity)]"],
        !isolated &&
          spotlight && [spotlightStyles, "before:opacity-[var(--opacity)]"]
      ),
    },
    <div
      className={cn(
        "absolute inset-[var(--border-width)] rounded-[var(--border-radius)] z-[2]",
        className
      )}
    >
      {children}
    </div>
  );
};

export { MagicCard, MagicContainer };
