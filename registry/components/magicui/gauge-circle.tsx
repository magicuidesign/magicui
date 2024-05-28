import { cn } from "@/lib/utils";

interface Props {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export default function GaugeCircle({
  max=100,
  min=0,
  value=0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className
}: Props) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <style>
        {`
.gauge_circle {
--transition-length: 1s;
--transition-step: 200ms;
--delay: 0s;
--percent-to-deg: 3.6deg;
transform: translateZ(0);
} 

.gauge_animate .gauge_arc {
    stroke-dasharray: calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference);
    transition: var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay);
    transition-property: stroke-dasharray,transform;
    transform: rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)));
    transform-origin: calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)
}

.gauge_animate .gauge_arcSecondary {
    --offset-factor-secondary: calc(1 - var(--offset-factor));
    stroke-dasharray: calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference);
    transform: rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1);
    transition: all var(--transition-length) ease var(--delay);
    transform-origin: calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)
}

.gauge_animate .gauge_content {
    animation: gauge_fadeIn var(--transition-length) ease forwards;
    animation-delay: var(--delay)
}

@keyframes gauge_fadeIn {
    to {
        opacity: 1
    }
}
`}
      </style>
      <div
        className={cn(
          "gauge_circle gauge_animate !relative h-40 w-40 text-2xl font-semibold",
          className
        )}
        style={
          {
            "--circle-size": "100px",
            "--circumference": circumference,
            "--percent-to-px": `${percentPx}px`,
            "--gap-percent": "5",
            "--offset-factor": "0",
          } as React.CSSProperties
        }
      >
        <svg
          fill="none"
          className="h-full w-full"
          strokeWidth="2"
          viewBox="0 0 100 100"
        >
          {currentPercent <= 90 && currentPercent >= 0 && (
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="10"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gauge_arcSecondary opacity-100"
              style={
                {
                  stroke: gaugeSecondaryColor,
                  "--stroke-percent": 90 - currentPercent,
                } as React.CSSProperties
              }
            />
          )}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gauge_arc opacity-100"
            style={
              {
                stroke: gaugePrimaryColor,
                "--stroke-percent": currentPercent,
              } as React.CSSProperties
            }
          />
        </svg>
        <span
          data-current-value="50%"
          className="gauge_content absolute inset-0 m-auto h-fit w-fit opacity-0"
        >
          {currentPercent}
        </span>
      </div>
    </div>
  );
}
