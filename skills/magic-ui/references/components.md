# Magic UI Component Reference

## Purpose

Use this document to choose the right Magic UI component and avoid integration mistakes before implementation.

## Install Contract

- Initialize shadcn once per project:
```bash
npx shadcn@latest init
```
- Add components via registry:
```bash
npx shadcn@latest add @magicui/<component-slug>
```
- Default import path is usually:
```tsx
import { ComponentName } from "@/components/ui/<component-slug>"
```

If the project does not use `@/` aliases, adapt import paths to local conventions.

## Families

### Layout And Social Proof

- `marquee`
- `avatar-circles`
- `bento-grid`

Use for logo rails, testimonial movement, and feature grids.

### Hero And Visual Anchors

- `globe`
- `warp-background`
- `animated-grid-pattern`
- `retro-grid`

Use one primary visual anchor per hero to keep hierarchy clear.

### Text Motion

- `blur-fade`
- `text-animate`
- `word-rotate`
- `sparkles-text`
- `typing-animation`

Use when product messaging needs motion emphasis.

### Buttons And CTA Emphasis

- `shiny-button`
- `shimmer-button`
- `rainbow-button`
- `ripple-button`

Keep CTA style consistent within one page section.

### Ambient Effects

- `particles`
- `flickering-grid`
- `dot-pattern`
- `grid-pattern`
- `light-rays`

Use these as supporting layers, not primary content.

## Integration Notes

- Some components require additional dependencies (for example `cobe`, `motion` for `globe` patterns).
- Some components require global CSS keyframes (for example `marquee` variants).
- Prefer prop-level customization before editing generated source.
- If customization grows large, wrap the component in a local section component rather than editing registry output directly.

## Quality Checks

- Accessibility: interactive controls remain keyboard-accessible.
- Readability: animated backgrounds do not reduce text contrast.
- Responsiveness: no horizontal overflow on small screens.
- Performance: avoid stacking multiple expensive animated backgrounds in one viewport.
