"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BridgedCarouselImageSource {
  srcSet: string
  /** Native viewport media query; independent of container queries. */
  media?: string
  type?: string
  sizes?: string
}

export interface BridgedCarouselImage {
  src: string
  alt: string
  srcSet?: string
  sizes?: string
  /** Ordered picture sources. The browser uses the first supported matching source. */
  sources?: BridgedCarouselImageSource[]
  /** Explicit static preview override; otherwise previews share responsive sources. */
  previewSrc?: string
  fit?: "cover" | "contain"
}

export interface BridgedCarouselItem {
  id: string
  title: string
  description?: string
  category?: string
  status?: string
  image?: BridgedCarouselImage
  badges?: string[]
  links?: Array<{ label: string; href: string; external?: boolean }>
  terminal?: {
    title?: string
    lines: Array<{ type: "command" | "output"; text: string }>
  }
  /** Custom media node (video, canvas, 3D element) replacing the media panel. */
  media?: React.ReactNode
}

export interface BridgedCarouselLabels {
  container?: string
  previous?: string
  next?: string
  pause?: string
  play?: string
  slide?: string
}

export interface BridgedCarouselItemState {
  active: boolean
  /** Slot position: -3..+3 (0 = active, ±1 = near, ±2 = far). */
  slot: number
  index: number
  select: () => void
}

export interface BridgedCarouselProps {
  /** Card data items. */
  items: BridgedCarouselItem[]
  /** Active card width. Sets `--carousel-active-width`. @default 762 */
  cardWidth?: number | string
  /** Active card height. Sets `--carousel-active-height`. @default 513 */
  cardHeight?: number | string
  /** Render slot for full card customization; inherits slot physics and SVG bridges. */
  children?: (
    item: BridgedCarouselItem,
    state: BridgedCarouselItemState
  ) => React.ReactNode
  /** Controlled active slide index. When set, the component is fully controlled. */
  activeIndex?: number
  /** Callback fired when the active slide changes. Receives the new index. */
  onSlideChange?: (index: number) => void
  /** Autoplay interval in ms, or `false` to disable. @default 3000 */
  autoplay?: number | false
  /** Initial active slide index in uncontrolled mode. @default 0 */
  defaultIndex?: number
  /** Enable cyclic wrap-around navigation. @default true */
  loop?: boolean
  /** Render SVG bridges between adjacent cards. @default true */
  showConnectors?: boolean
  /** Show the dots, arrows, and play/pause controls bar. @default true */
  showControls?: boolean
  /** Accessible labels for navigation and announcements. */
  labels?: BridgedCarouselLabels
  className?: string
  /** Supports `--carousel-*` custom properties. */
  style?: React.CSSProperties & {
    [key: `--carousel-${string}`]: string | number
  }
}

// ---------------------------------------------------------------------------
// Scoped Styles for BridgedCarousel (Single-file Self-contained)
// ---------------------------------------------------------------------------

const BRIDGED_CAROUSEL_STYLES = `
.bridged-carousel {
  --carousel-surface: var(--card, #ffffff);
  --carousel-shadow: 0 10px 30px rgb(95 109 119 / 0.08);
  --carousel-ink: var(--foreground, #09090b);
  --carousel-muted: var(--muted-foreground, #71717a);
  --carousel-badge: color-mix(in srgb, var(--muted, #f4f4f5) 70%, transparent);
  --carousel-accent: var(--primary, #0ea5e9);
  --carousel-move-duration: 620ms;
  --carousel-move-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --carousel-fade-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --carousel-active-width: 762px;
  --carousel-active-height: 513px;
  --carousel-gap: 20px;
  --carousel-near-width: 105px;
  --carousel-near-height: 344px;
  --carousel-far-width: 74px;
  --carousel-far-height: 205px;
  width: 100%;
  container-type: inline-size;
  color: var(--carousel-ink);
}

.dark .bridged-carousel {
  --carousel-surface: color-mix(in srgb, var(--background, #09090b) 75%, var(--card, #18181b));
  --carousel-shadow: 0 16px 28px rgb(0 0 0 / 0.28);
  --carousel-ink: var(--foreground, #fafafa);
  --carousel-muted: var(--muted-foreground, #a1a1aa);
  --carousel-badge: color-mix(in srgb, var(--muted, #27272a) 45%, transparent);
  --carousel-accent: var(--primary, #0ea5e9);
}

.bridged-carousel-stage {
  position: relative;
  isolation: isolate;
  height: var(--carousel-active-height);
  overflow-anchor: none;
  touch-action: pan-y;
  filter: drop-shadow(var(--carousel-shadow));
}

.bridged-carousel-card {
  --card-width: var(--carousel-active-width);
  --card-height: var(--carousel-active-height);
  --card-offset: 0px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: var(--card-width);
  height: var(--card-height);
  transform: translate(calc(-50% + var(--card-offset)), -50%);
  border-radius: 32px;
  border: 0;
  background: var(--carousel-surface);
  transition:
    width var(--carousel-move-duration) var(--carousel-move-ease),
    height var(--carousel-move-duration) var(--carousel-move-ease),
    transform var(--carousel-move-duration) var(--carousel-move-ease),
    opacity 180ms cubic-bezier(0.4, 0, 1, 1);
}

@supports (corner-shape: squircle) {
  .bridged-carousel-card {
    border-radius: 64px;
    corner-shape: squircle;
  }
}

.bridged-carousel-card[data-slot="-1"],
.bridged-carousel-card[data-slot="1"] {
  --card-width: var(--carousel-near-width);
  --card-height: var(--carousel-near-height);
}

.bridged-carousel-card[data-slot="-2"],
.bridged-carousel-card[data-slot="2"],
.bridged-carousel-card[data-slot="-3"],
.bridged-carousel-card[data-slot="3"] {
  --card-width: var(--carousel-far-width);
  --card-height: var(--carousel-far-height);
}

.bridged-carousel-card[data-slot="1"] {
  --card-offset: calc(
    var(--carousel-active-width) / 2 +
    var(--carousel-gap) +
    var(--carousel-near-width) / 2
  );
}

.bridged-carousel-card[data-slot="-1"] {
  --card-offset: calc(
    (var(--carousel-active-width) / 2 + var(--carousel-gap) + var(--carousel-near-width) / 2) * -1
  );
}

.bridged-carousel-card[data-slot="2"] {
  --card-offset: calc(
    var(--carousel-active-width) / 2 +
    var(--carousel-gap) +
    var(--carousel-near-width) +
    16px +
    var(--carousel-far-width) / 2
  );
}

.bridged-carousel-card[data-slot="-2"] {
  --card-offset: calc(
    (
      var(--carousel-active-width) / 2 +
      var(--carousel-gap) +
      var(--carousel-near-width) +
      16px +
      var(--carousel-far-width) / 2
    ) * -1
  );
}

.bridged-carousel-card[data-slot="3"] {
  --card-offset: 950px;
  opacity: 0;
  pointer-events: none;
}

.bridged-carousel-card[data-slot="-3"] {
  --card-offset: -950px;
  opacity: 0;
  pointer-events: none;
}

.bridged-carousel-card[data-wrap="true"] {
  transition: opacity 180ms ease;
}

.bridged-carousel-clip {
  position: absolute;
  inset: 0;
  overflow: clip;
  border-radius: inherit;
  corner-shape: inherit;
  contain: layout paint;
}

.bridged-carousel-preview {
  position: absolute;
  inset: 0;
  padding: 16px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 0;
  background: transparent;
  transition: opacity 220ms var(--carousel-fade-ease);
}

.bridged-carousel-image {
  display: block;
  width: 100%;
  height: 100%;
}

.bridged-carousel-preview img {
  display: block;
  margin: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.bridged-carousel-card[data-slot="0"] .bridged-carousel-preview {
  opacity: 0;
  pointer-events: none;
}

.bridged-carousel-content-frame {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--carousel-active-width);
  height: var(--carousel-active-height);
  transform: translate(-50%, -50%);
}

.bridged-carousel-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  gap: 16px;
  padding: 16px;
}

.bridged-carousel-content[data-custom] {
  display: block;
  padding: 0;
  opacity: 0;
  transition: opacity 90ms ease;
}

.bridged-carousel-card[data-slot="0"] .bridged-carousel-content[data-custom] {
  opacity: 1;
  transition: opacity 350ms var(--carousel-fade-ease);
}

.bridged-carousel-heading,
.bridged-carousel-details {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 90ms ease,
    transform 320ms var(--carousel-fade-ease);
}

.bridged-carousel-card[data-slot="0"] .bridged-carousel-heading,
.bridged-carousel-card[data-slot="0"] .bridged-carousel-details {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 320ms var(--carousel-fade-ease) 180ms,
    transform 440ms var(--carousel-fade-ease) 180ms;
}

.bridged-carousel-card[data-slot="0"] .bridged-carousel-details {
  transition-delay: 220ms;
}

.bridged-carousel-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  min-width: 0;
  padding: 16px;
}

.bridged-carousel-eyebrow {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.bridged-carousel-category {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--primary, #0ea5e9) 12%, transparent);
  color: var(--primary, #0ea5e9);
  border: 1px solid color-mix(in srgb, var(--primary, #0ea5e9) 28%, transparent);
  text-transform: uppercase;
}

.bridged-carousel-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-foreground, #71717a);
}

.bridged-carousel-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.65);
  display: inline-block;
}

.bridged-carousel-copy h3 {
  font-size: 32px;
  font-weight: 550;
  line-height: 1.16;
  letter-spacing: -0.04em;
  text-wrap: balance;
  color: var(--foreground, #09090b);
}

.bridged-carousel-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bridged-carousel-description {
  font-size: 1.12rem;
  line-height: 1.55;
  letter-spacing: -0.02em;
  text-wrap: pretty;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
  color: var(--muted-foreground, #71717a);
}

.bridged-carousel-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.bridged-carousel-badges li {
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  border: 0;
  border-radius: 0.35rem;
  background: color-mix(in srgb, var(--muted, #f4f4f5) 50%, transparent);
  color: var(--muted-foreground, #71717a);
  line-height: 1.4;
}

.bridged-carousel-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
}

.bridged-carousel-links a {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  font-size: 0.8rem;
  min-height: 28px;
  color: var(--muted-foreground, #71717a);
  text-underline-offset: 4px;
  transition: color 0.15s ease;
}

.bridged-carousel-links a:hover {
  color: var(--foreground, #09090b);
  text-decoration: underline;
}

.bridged-carousel-media {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-radius: 24px;
  border: 0;
  background: color-mix(in srgb, var(--muted, #f4f4f5) 35%, transparent);
  opacity: 0;
  transform: scale(1.025);
  transition:
    opacity 90ms ease,
    transform var(--carousel-move-duration) var(--carousel-move-ease);
}

.bridged-carousel-card[data-slot="0"] .bridged-carousel-media {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 350ms var(--carousel-fade-ease),
    transform var(--carousel-move-duration) var(--carousel-move-ease);
}

.bridged-carousel-media > .bridged-carousel-image {
  position: absolute;
  inset: 0;
}

.bridged-carousel-media > .bridged-carousel-image > img {
  display: block;
  margin: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bridged-carousel-media > .bridged-carousel-image > img[data-fit="contain"] {
  object-fit: contain;
  padding: 10px;
}

.bridged-carousel-terminal {
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  background: color-mix(in srgb, var(--background, #09090b) 92%, black);
  border: 0;
  border-radius: 20px;
  color: var(--foreground, #09090b);
}

.dark .bridged-carousel-terminal {
  border: 0;
  background: color-mix(in srgb, var(--background, #09090b) 96%, black);
  color: var(--foreground, #fafafa);
}

.bridged-carousel-terminal p {
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-foreground, #71717a);
  margin: 0;
}

.bridged-carousel-terminal pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  line-height: 1.6;
  font-size: 13px;
}

.bridged-carousel-terminal [data-type="command"] {
  color: var(--primary, #0ea5e9);
}

.bridged-carousel-connector {
  position: absolute;
  z-index: 0;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  color: var(--carousel-surface);
}

.bridged-carousel-connector > svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.bridged-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
}

.bridged-carousel-controls[hidden] {
  display: none;
}

.bridged-carousel-tabs {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bridged-carousel-tabs > button {
  width: 8px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  transition: width 300ms var(--carousel-fade-ease);
  position: relative;
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
}

.bridged-carousel-tabs > button::before {
  content: "";
  position: absolute;
  inset: -6px -2px;
}

.bridged-carousel-tabs > button[aria-selected="true"] {
  width: 80px;
}

.bridged-carousel-tab-track {
  display: block;
  width: 100%;
  height: 8px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--border, #e4e4e7) 70%, transparent);
  overflow: hidden;
}

.bridged-carousel-progress {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--primary, #0ea5e9);
  transform-origin: left;
}

.bridged-carousel-progress[data-animate="true"] {
  animation: bridged-carousel-progress linear forwards;
}

@keyframes bridged-carousel-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.bridged-carousel-arrow {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  color: var(--muted-foreground, #71717a);
  cursor: pointer;
  border-radius: 50%;
  border: 0;
  background: color-mix(in srgb, var(--muted, #f4f4f5) 45%, transparent);
  transition: all 0.2s ease;
  position: relative;
}

.bridged-carousel-arrow::before {
  content: "";
  position: absolute;
  inset: -6px;
}

.bridged-carousel-arrow:hover {
  color: var(--foreground, #09090b);
  background: color-mix(in srgb, var(--muted, #f4f4f5) 80%, transparent);
}

.bridged-carousel :is(button, a, article):focus-visible {
  outline: 2px solid var(--carousel-accent);
  outline-offset: 5px;
}

@container (max-width: 1079px) and (min-width: 850px) {
  .bridged-carousel-stage {
    --carousel-active-width: min(762px, calc(100cqw - 240px));
    --carousel-active-height: min(513px, max(460px, calc(var(--carousel-active-width) * 0.68)));
    --carousel-gap: 16px;
    --carousel-near-width: 95px;
    --carousel-near-height: 320px;
  }
  .bridged-carousel-copy h3 {
    font-size: 26px;
  }
  .bridged-carousel-description {
    font-size: 1rem;
    -webkit-line-clamp: 5;
  }
}

@container (max-width: 849px) and (min-width: 600px) {
  .bridged-carousel-stage {
    --carousel-active-width: min(600px, calc(100cqw - 180px));
    --carousel-active-height: min(480px, max(420px, calc(var(--carousel-active-width) * 0.72)));
    --carousel-gap: 12px;
    --carousel-near-width: 76px;
    --carousel-near-height: 290px;
  }
  .bridged-carousel-card[data-slot="2"],
  .bridged-carousel-card[data-slot="-2"],
  .bridged-carousel-card[data-slot="3"],
  .bridged-carousel-card[data-slot="-3"] {
    opacity: 0;
    pointer-events: none;
  }
  .bridged-carousel-content {
    gap: 12px;
    padding: 14px;
  }
  .bridged-carousel-copy {
    padding: 12px;
    gap: 14px;
  }
  .bridged-carousel-copy h3 {
    font-size: 22px;
    line-height: 1.2;
  }
  .bridged-carousel-description {
    font-size: 0.92rem;
    line-height: 1.5;
    -webkit-line-clamp: 4;
  }
  .bridged-carousel-terminal {
    padding: 16px;
    gap: 14px;
  }
  .bridged-carousel-terminal pre {
    font-size: 11px;
    line-height: 1.5;
  }
}

@container (max-width: 599px) {
  .bridged-carousel-stage {
    --carousel-active-width: min(340px, calc(100cqw - 60px));
    --carousel-active-height: 560px;
    --carousel-gap: 12px;
    --carousel-near-width: 44px;
    --carousel-near-height: 260px;
  }
  .bridged-carousel-content {
    grid-template-columns: 1fr;
    grid-template-rows: 1.05fr 1fr;
    gap: 14px;
    padding: 12px;
  }
  .bridged-carousel-copy {
    padding: 10px 12px;
    text-align: center;
    align-items: center;
    gap: 12px;
  }
  .bridged-carousel-copy h3 {
    font-size: 21px;
    line-height: 1.2;
  }
  .bridged-carousel-eyebrow {
    font-size: 11px;
    margin-bottom: 4px;
    justify-content: center;
  }
  .bridged-carousel-description {
    font-size: 0.9rem;
    -webkit-line-clamp: 4;
  }
  .bridged-carousel-details {
    gap: 10px;
    align-items: center;
  }
  .bridged-carousel-badges,
  .bridged-carousel-links {
    justify-content: center;
  }
  .bridged-carousel-badges li:nth-child(n + 4) {
    display: none;
  }
  .bridged-carousel-media {
    border-radius: 20px;
  }
  .bridged-carousel-terminal {
    padding: 14px;
    gap: 12px;
  }
  .bridged-carousel-terminal pre {
    font-size: 11px;
  }
  .bridged-carousel-controls {
    margin-top: 20px;
  }
  .bridged-carousel-card[data-slot="2"],
  .bridged-carousel-card[data-slot="-2"],
  .bridged-carousel-card[data-slot="3"],
  .bridged-carousel-card[data-slot="-3"] {
    opacity: 0;
    pointer-events: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bridged-carousel *,
  .bridged-carousel *::before {
    transition: none !important;
    animation: none !important;
  }
}

/* Dark mode visual enhancements: completely borderless, subdued outlines, deep atmospheric depth */
.dark .bridged-carousel-category {
  background: color-mix(in srgb, var(--primary, #0ea5e9) 18%, transparent);
  border-color: color-mix(in srgb, var(--primary, #0ea5e9) 36%, transparent);
  color: var(--primary, #0ea5e9);
}

.dark .bridged-carousel-status {
  color: var(--muted-foreground, #a1a1aa);
  opacity: 0.9;
}

.dark .bridged-carousel-description {
  color: color-mix(in srgb, var(--foreground, #fafafa) 78%, var(--muted-foreground, #a1a1aa));
}

.dark .bridged-carousel-badges li {
  border: 0;
  background: rgba(255, 255, 255, 0.07);
  color: var(--foreground, #fafafa);
}

.dark .bridged-carousel-links a {
  color: var(--muted-foreground, #a1a1aa);
}

.dark .bridged-carousel-links a:hover {
  color: var(--primary, #0ea5e9);
}

.dark .bridged-carousel-media {
  border: 0;
  background: rgba(0, 0, 0, 0.35);
}

.dark .bridged-carousel-preview img {
  opacity: 0.72;
  transition: opacity 0.3s ease;
}

.dark .bridged-carousel-card:hover .bridged-carousel-preview img {
  opacity: 0.95;
}

.dark .bridged-carousel-tab-track {
  background: rgba(255, 255, 255, 0.12);
}

.dark .bridged-carousel-progress {
  background: var(--foreground, #fafafa);
}

.dark .bridged-carousel-arrow {
  border: 0;
  color: var(--muted-foreground, #a1a1aa);
  background: rgba(255, 255, 255, 0.08);
}

.dark .bridged-carousel-arrow:hover {
  border: 0;
  color: var(--foreground, #fafafa);
  background: rgba(255, 255, 255, 0.18);
}
`

// ---------------------------------------------------------------------------
// Image Helper
// ---------------------------------------------------------------------------

function CarouselImage({
  image,
  preview = false,
}: {
  image: BridgedCarouselImage
  preview?: boolean
}) {
  const staticPreview = preview && image.previewSrc !== undefined
  return (
    <picture className="bridged-carousel-image">
      {!staticPreview &&
        image.sources?.map((source, index) => (
          <source
            key={`${index}-${source.media ?? ""}-${source.type ?? ""}`}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
            sizes={source.sizes ?? image.sizes}
          />
        ))}
      <img
        src={staticPreview ? image.previewSrc : image.src}
        srcSet={staticPreview ? undefined : image.srcSet}
        sizes={staticPreview ? undefined : image.sizes}
        alt={preview ? "" : image.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        data-fit={preview ? "cover" : (image.fit ?? "cover")}
      />
    </picture>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function BridgedCarousel({
  items,
  cardWidth,
  cardHeight,
  children,
  activeIndex,
  onSlideChange,
  autoplay = 3000,
  defaultIndex = 0,
  loop = true,
  showConnectors = true,
  showControls = true,
  labels,
  className,
  style,
}: BridgedCarouselProps) {
  const computedStyle: React.CSSProperties = {
    ...(cardWidth !== undefined && {
      "--carousel-active-width":
        typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
    }),
    ...(cardHeight !== undefined && {
      "--carousel-active-height":
        typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
    }),
    ...style,
  }
  const resolvedInterval = autoplay === false ? 0 : autoplay

  const resolvedLabels = {
    container: labels?.container ?? "Carousel showcase",
    previous: labels?.previous ?? "Previous",
    next: labels?.next ?? "Next",
    pause: labels?.pause ?? "Pause",
    play: labels?.play ?? "Play",
    slide: labels?.slide ?? "Slide",
  }

  const count = items.length
  const isControlled = activeIndex !== undefined
  const [internalSelected, setInternalSelected] = React.useState(
    Math.max(0, Math.min(defaultIndex, count - 1))
  )
  const selected = isControlled
    ? Math.max(0, Math.min(activeIndex, count - 1))
    : internalSelected
  const [previous, setPrevious] = React.useState(selected)
  const active = Math.min(selected, Math.max(0, count - 1))
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [paused, setPaused] = React.useState(
    autoplay === false || resolvedInterval === 0
  )
  const [visible, setVisible] = React.useState(false)
  const [pageVisible, setPageVisible] = React.useState(true)
  const [reducedMotion, setReducedMotion] = React.useState(true)

  const root = React.useRef<HTMLElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const connectors = React.useRef<Array<HTMLSpanElement | null>>([])
  const tabs = React.useRef<Array<HTMLButtonElement | null>>([])
  const touchStart = React.useRef<{ x: number; y: number } | null>(null)
  const id = React.useId()

  const canRotate = count > 1 && resolvedInterval > 0 && !reducedMotion
  const playing =
    canRotate && visible && pageVisible && !hovered && !focused && !paused

  // Sync motion preference and visibility
  React.useEffect(() => {
    const element = root.current
    if (!element || count === 0) return

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMotionChange = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      setReducedMotion(event.matches)
    }
    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden)
    }

    handleMotionChange(preference)
    handleVisibilityChange()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )
    observer.observe(element)

    preference.addEventListener("change", handleMotionChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      observer.disconnect()
      preference.removeEventListener("change", handleMotionChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [count])

  // Batch-measure animated card edges and draw dynamic SVG bridges
  React.useLayoutEffect(() => {
    const element = stage.current
    if (!element || count < 2 || !showConnectors) return

    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".bridged-carousel-card")
    )
    let frame = 0

    const draw = () => {
      frame = 0
      const bounds = element.getBoundingClientRect()
      // Defense against division by zero (PR #1002 lesson)
      const scale = bounds.width / Math.max(1, element.offsetWidth || 1)

      // Read phase: batch getBoundingClientRect before write phase
      const measured = cards
        .map((card) => {
          const rect = card.getBoundingClientRect()
          const computed = getComputedStyle(card)
          return { rect, opacity: Number(computed.opacity) || 0 }
        })
        .filter((card) => card.opacity > 0.001)
        .sort(
          (a, b) => a.rect.left - b.rect.left || b.rect.right - a.rect.right
        )

      // Exclude overlapping/fading cards trapped inside moving shells
      let rightmost = -Number.MAX_VALUE
      const edges = measured.filter((card) => {
        if (card.rect.right <= rightmost) return false
        rightmost = card.rect.right
        return true
      })

      const animating = cards.some((card) =>
        card
          .getAnimations()
          .some((animation) => animation.playState === "running")
      )

      const overlap = 1.5

      for (let index = 0; index < connectors.current.length; index += 1) {
        const bridge = connectors.current[index]
        if (!bridge) continue

        const left = edges[index]
        const right = edges[index + 1]
        const gap =
          left && right ? (right.rect.left - left.rect.right) / scale : 0

        // Clamping & math defense (PR #1002 lesson)
        if (!left || !right || gap <= 0 || gap >= 64) {
          bridge.style.opacity = "0"
          continue
        }

        const height = Math.min(left.rect.height, right.rect.height) / scale
        bridge.style.left = `${(left.rect.right - bounds.left) / scale - overlap}px`
        bridge.style.top = `${(left.rect.top + left.rect.height / 2 - bounds.top) / scale}px`
        bridge.style.width = `${gap + overlap * 2}px`
        bridge.style.height = `${Math.min(42, Math.max(28, height * 0.122))}px`
        bridge.style.opacity = String(
          Math.min(left.opacity, right.opacity) * Math.min(1, (64 - gap) / 32)
        )
      }

      if (animating) {
        frame = requestAnimationFrame(draw)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    draw()

    const observer = new ResizeObserver(schedule)
    observer.observe(element)
    element.addEventListener("transitionrun", schedule)
    element.addEventListener("transitionend", schedule)
    element.addEventListener("transitioncancel", schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      element.removeEventListener("transitionrun", schedule)
      element.removeEventListener("transitionend", schedule)
      element.removeEventListener("transitioncancel", schedule)
    }
  }, [active, count, items, showConnectors, reducedMotion])

  // Pre-decode selected and adjacent images
  React.useEffect(() => {
    if (!visible || count === 0) return

    for (const offset of [-1, 0, 1]) {
      const index = (active + offset + count) % count
      const image = root.current?.querySelector<HTMLImageElement>(
        `[data-slide-index="${index}"] .bridged-carousel-media img`
      )
      if (!image) continue
      image.loading = "eager"
      void image.decode().catch(() => {
        // Fallback gracefully
      })
    }
  }, [active, count, visible])

  const select = (index: number, focusTab = false) => {
    if (count < 2) return
    let next: number
    if (loop) {
      next = ((index % count) + count) % count
    } else {
      next = Math.max(0, Math.min(index, count - 1))
    }
    if (next === active) {
      if (focusTab) tabs.current[next]?.focus()
      return
    }
    setPrevious(active)
    if (!isControlled) {
      setInternalSelected(next)
    }
    onSlideChange?.(next)
    if (focusTab) tabs.current[next]?.focus()
  }

  if (count === 0) return null

  return (
    <section
      ref={root}
      className={cn("bridged-carousel", className)}
      style={computedStyle}
      aria-roledescription="carousel"
      aria-label={resolvedLabels.container}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      }}
    >
      <style>{BRIDGED_CAROUSEL_STYLES}</style>

      <div
        ref={stage}
        className="bridged-carousel-stage"
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = touch
            ? { x: touch.clientX, y: touch.clientY }
            : null
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current
          const touch = event.changedTouches[0]
          touchStart.current = null
          if (!start || !touch) return
          const dx = touch.clientX - start.x
          const dy = touch.clientY - start.y
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
            select(active + (dx < 0 ? 1 : -1))
          }
        }}
        onTouchCancel={() => {
          touchStart.current = null
        }}
      >
        {showConnectors &&
          items.slice(1).map((item, index) => (
            <span
              key={`connector-${item.id}`}
              ref={(element) => {
                connectors.current[index] = element
              }}
              className="bridged-carousel-connector"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 20 38"
                preserveAspectRatio="none"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M0 0H1C1 7 3 14 10 14S19 7 19 0H20V38H19C19 31 17 24 10 24S1 31 1 38H0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          ))}

        {items.map((item, index) => {
          let offset = (((index - active) % count) + count) % count
          if (offset > count / 2) offset -= count

          let previousOffset = (((index - previous) % count) + count) % count
          if (previousOffset > count / 2) previousOffset -= count

          const wrapped = Math.abs(offset - previousOffset) > count / 2
          const isActive = index === active
          const hidden = Math.abs(offset) > 2
          const slot = Math.max(-3, Math.min(3, offset))

          return (
            <div
              className="bridged-carousel-card"
              data-slot={slot}
              data-slide-index={index}
              data-wrap={wrapped || undefined}
              key={item.id}
              aria-hidden={hidden || undefined}
              inert={hidden}
            >
              <div className="bridged-carousel-clip">
                {children ? (
                  children(item, {
                    active: isActive,
                    slot,
                    index,
                    select: () => select(index),
                  })
                ) : (
                  <>
                    <button
                      type="button"
                      className="bridged-carousel-preview"
                      tabIndex={-1}
                      aria-hidden={isActive}
                      inert={isActive}
                      aria-label={`${resolvedLabels.slide} ${index + 1}: ${item.title}`}
                      onClick={() => select(index)}
                    >
                      {item.image ? (
                        <CarouselImage image={item.image} preview />
                      ) : (
                        <span>{item.title}</span>
                      )}
                    </button>

                    <div
                      className="bridged-carousel-content-frame"
                      inert={!isActive}
                      aria-hidden={!isActive}
                    >
                      <article
                        className="bridged-carousel-content"
                        id={`${id}-panel-${index}`}
                        role="tabpanel"
                        aria-labelledby={`${id}-tab-${index}`}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <div className="bridged-carousel-copy">
                          <div className="bridged-carousel-heading">
                            {(item.category || item.status) && (
                              <div className="bridged-carousel-eyebrow">
                                {item.category && (
                                  <span className="bridged-carousel-category">
                                    {item.category}
                                  </span>
                                )}
                                {item.status && (
                                  <span className="bridged-carousel-status">
                                    <span
                                      className="bridged-carousel-status-dot"
                                      aria-hidden="true"
                                    />
                                    {item.status}
                                  </span>
                                )}
                              </div>
                            )}
                            <h3>{item.title}</h3>
                          </div>

                          <div className="bridged-carousel-details">
                            {item.description && (
                              <p className="bridged-carousel-description">
                                {item.description}
                              </p>
                            )}
                            {item.badges && (
                              <ul className="bridged-carousel-badges">
                                {item.badges.map((badge) => (
                                  <li key={badge}>{badge}</li>
                                ))}
                              </ul>
                            )}
                            {item.links && (
                              <div className="bridged-carousel-links">
                                {item.links.map((link) => (
                                  <a
                                    key={link.href}
                                    href={link.href}
                                    target={
                                      link.external ? "_blank" : undefined
                                    }
                                    rel={
                                      link.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                  >
                                    {link.label}
                                    <span aria-hidden="true">
                                      {link.external ? " ↗" : " →"}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bridged-carousel-media">
                          {item.media ?? (
                            <>
                              {item.image && (
                                <CarouselImage image={item.image} />
                              )}
                              {item.terminal && (
                                <div className="bridged-carousel-terminal">
                                  <p>{item.terminal.title}</p>
                                  <pre>
                                    {item.terminal.lines.map(
                                      (line, lineIndex) => (
                                        <span
                                          key={`${lineIndex}-${line.text}`}
                                          data-type={line.type}
                                        >
                                          {line.type === "command" ? "$ " : ""}
                                          {line.text}
                                          {"\n"}
                                        </span>
                                      )
                                    )}
                                  </pre>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </article>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showControls && (
        <div className="bridged-carousel-controls" hidden={count < 2}>
          <button
            className="bridged-carousel-arrow"
            type="button"
            aria-label={resolvedLabels.previous}
            disabled={!loop && active === 0}
            onClick={() => select(active - 1)}
          >
            <ChevronLeft size={13} aria-hidden="true" />
          </button>

          <div
            className="bridged-carousel-tabs"
            role="tablist"
            aria-label={resolvedLabels.container}
          >
            {items.map((item, index) => (
              <button
                ref={(element) => {
                  tabs.current[index] = element
                }}
                key={item.id}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-controls={`${id}-panel-${index}`}
                aria-selected={index === active}
                aria-label={`${resolvedLabels.slide} ${index + 1}: ${item.title}`}
                tabIndex={index === active ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  let next: number | undefined
                  if (event.key === "ArrowRight") next = active + 1
                  if (event.key === "ArrowLeft") next = active - 1
                  if (event.key === "Home") next = 0
                  if (event.key === "End") next = count - 1
                  if (next !== undefined) {
                    event.preventDefault()
                    select(next, true)
                  }
                }}
              >
                <span className="bridged-carousel-tab-track">
                  {index === active && (
                    <span
                      key={`${item.id}-${active}`}
                      className="bridged-carousel-progress"
                      data-animate={canRotate}
                      style={{
                        animationDuration: `${resolvedInterval}ms`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                      onAnimationEnd={() => {
                        if (playing) select(active + 1)
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            className="bridged-carousel-arrow"
            type="button"
            aria-label={resolvedLabels.next}
            disabled={!loop && active === count - 1}
            onClick={() => select(active + 1)}
          >
            <ChevronRight size={13} aria-hidden="true" />
          </button>

          {canRotate && (
            <button
              className="bridged-carousel-arrow"
              type="button"
              aria-label={paused ? resolvedLabels.play : resolvedLabels.pause}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? (
                <Play size={11} aria-hidden="true" />
              ) : (
                <Pause size={11} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}

      <span
        className="sr-only"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        {`${resolvedLabels.slide} ${active + 1} / ${count}: ${items[active]?.title ?? ""}`}
      </span>
    </section>
  )
}
