import { CSSProperties } from "react";

type Type = "circle" | "ellipse";

type Origin =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

interface RadialProps {
  /**
   * The type of radial gradient
   * @default circle
   * @type string
   */
  type?: Type;
  /**
   * The color to transition from
   * @default #00000000
   * @type string
   * */
  from?: string;

  /**
   * The color to transition to
   * @default #290A5C
   * @type string
   * */
  to?: string;

  /**
   * The size of the gradient in pixels
   * @default 300
   * @type number
   * */
  size?: number;

  /**
   * The origin of the gradient
   * @default center
   * @type string
   * */
  origin?: Origin;

  /**
   * The class name to apply to the gradient
   * @default ""
   * @type string
   * */
  className?: string;
}

const RadialGradient = ({
  type = "circle",
  from = "rgba(120,119,198,0.3)",
  to = "hsla(0, 0%, 0%, 0)",
  size = 300,
  origin = "center",
  className,
}: RadialProps) => {
  const styles: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    inset: 0,
    backgroundImage: `radial-gradient(${type} ${size}px at ${origin}, ${from}, ${to})`,
  };

  return <div className={className} style={styles} />;
};

export default RadialGradient;
