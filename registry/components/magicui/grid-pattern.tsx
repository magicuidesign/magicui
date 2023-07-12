import { useId } from "react";

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  squares?: any;
  [key: string]: any;
}) {
  const id = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: [x: any, y: any]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export default GridPattern;
