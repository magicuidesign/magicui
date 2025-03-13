"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BlobBackgroundProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Number of blobs to render
     * @default 8
     */
    blobCount?: number;
    /**
     * Base size of the blobs (will vary slightly)
     * @default 250
     */
    blobSize?: number;
    /**
     * How far blobs can move from center
     * @default 150
     */
    range?: number;
    /**
     * How fast the colors change (ms)
     * @default 5000
     */
    speed?: number;
    /**
     * Blur amount for the blobs
     * @default 60
     */
    blur?: number;
}

interface Blob {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    angle: number;
    speed: number;
    range: number;
    color: {
        current: RGB;
        target: RGB;
    };
}

interface RGB {
    r: number;
    g: number;
    b: number;
}

const color = (): RGB => {
    const hue = Math.random() * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const convertHue = (t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    return {
        r: Math.round(convertHue(h + 1 / 3) * 255),
        g: Math.round(convertHue(h) * 255),
        b: Math.round(convertHue(h - 1 / 3) * 255),
    };
};

export function BlobBackground({
    className,
    blobCount = 8,
    blobSize = 250,
    range = 150,
    speed = 5000,
    blur = 60,
    ...props
}: BlobBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const offscreenRef = React.useRef<OffscreenCanvas | null>(null);
    const animationRef = React.useRef<number>();
    const blobsRef = React.useRef<Blob[]>([]);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        offscreenRef.current = new OffscreenCanvas(1, 1);
        const offscreenCtx = offscreenRef.current.getContext("2d", { alpha: true });
        if (!offscreenCtx) return;

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            if (offscreenRef.current) {
                offscreenRef.current.width = width;
                offscreenRef.current.height = height;
            }

            initializeBlobs(width, height);
        };

        const initializeBlobs = (width: number, height: number) => {
            const centerX = width / 2;
            const centerY = height / 2;

            blobsRef.current = Array.from({ length: blobCount }, (_, i) => {
                const initialColor = color();
                const targetColor = color();
                const angle = (i / blobCount) * Math.PI * 2;

                return {
                    baseX: centerX,
                    baseY: centerY,
                    x: centerX,
                    y: centerY,
                    radius: Math.random() * (blobSize * 0.4) + blobSize,
                    angle,
                    speed: 0.002 + Math.random() * 0.001,
                    range: range + Math.random() * (range * 0.3),
                    color: {
                        current: initialColor,
                        target: targetColor,
                    },
                };
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const colorInterval = setInterval(() => {
            blobsRef.current.forEach((blob) => {
                blob.color.target = color();
            });
        }, speed);

        let time = 0;
        const animate = () => {
            if (!canvas || !offscreenRef.current) return;

            const offscreenCtx = offscreenRef.current.getContext("2d");
            if (!offscreenCtx || !ctx) return;

            time += 0.01;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            offscreenCtx.clearRect(0, 0, offscreenRef.current.width, offscreenRef.current.height);

            blobsRef.current.forEach((blob) => {
                blob.angle += blob.speed;
                const wobble = Math.sin(time + blob.angle) * 30;
                blob.x = blob.baseX + Math.cos(blob.angle) * (blob.range + wobble);
                blob.y =
                    blob.baseY + Math.sin(blob.angle * 1.5) * (blob.range + wobble);

                blob.color.current.r +=
                    (blob.color.target.r - blob.color.current.r) * 0.01;
                blob.color.current.g +=
                    (blob.color.target.g - blob.color.current.g) * 0.01;
                blob.color.current.b +=
                    (blob.color.target.b - blob.color.current.b) * 0.01;

                const gradient = offscreenCtx.createRadialGradient(
                    blob.x,
                    blob.y,
                    0,
                    blob.x,
                    blob.y,
                    blob.radius,
                );

                const { r, g, b } = blob.color.current;
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`);
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // set to "rgba(0, 0, 0, 0)" if parent is closer to black than white

                offscreenCtx.fillStyle = gradient;
                offscreenCtx.beginPath();
                offscreenCtx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
                offscreenCtx.fill();
            });
            ctx.filter = `blur(${blur}px)`;
            ctx.drawImage(offscreenRef.current, 0, 0);
            ctx.filter = "none";

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(colorInterval);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [blobCount, blobSize, range, speed, blur]);

    return (
        <div
            className={cn(
                "relative min-h-[350px] h-full w-full overflow-hidden",
                className,
            )}
            {...props}
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                aria-hidden="true"
            />
        </div>
    );
}
