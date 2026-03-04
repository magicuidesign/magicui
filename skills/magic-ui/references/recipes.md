# Magic UI Recipes

## Purpose

Use these recipes when the user asks for concrete UI sections rather than a single component.

## Recipe 1: Hero With Visual Depth

### Goal

Create a hero section with strong visual identity and clear CTA hierarchy.

### Suggested Stack

- Primary visual: `warp-background` or `animated-grid-pattern`
- Heading entrance: `blur-fade`
- CTA: `shiny-button`

### Steps

1. Install components:
```bash
npx shadcn@latest add @magicui/warp-background @magicui/blur-fade @magicui/shiny-button
```
2. Wrap hero content in the background component.
3. Animate heading and subheading with subtle stagger.
4. Keep one primary CTA and one secondary action.

### Guardrails

- Keep animations under control: avoid combining more than two high-motion effects in hero.
- Preserve text contrast over animated backgrounds.

## Recipe 2: Testimonial And Logo Trust Rail

### Goal

Show social proof without static blocks.

### Suggested Stack

- `marquee`
- `avatar-circles` (optional for compact profile clusters)

### Steps

1. Install:
```bash
npx shadcn@latest add @magicui/marquee @magicui/avatar-circles
```
2. Use horizontal marquee for desktop and reduced density on mobile.
3. If using avatar clusters, add concise labels and accessible alt text.

### Guardrails

- Ensure auto-scrolling content can pause on hover/focus for usability.
- Do not overload with long testimonial paragraphs in moving rails.

## Recipe 3: Feature Grid With Motion Highlights

### Goal

Present product capabilities in an interactive but readable grid.

### Suggested Stack

- `bento-grid`
- One text motion component per card group (`text-animate` or `word-rotate`)

### Steps

1. Install:
```bash
npx shadcn@latest add @magicui/bento-grid @magicui/text-animate
```
2. Keep card copy short and scannable.
3. Use motion for emphasis on only 1-2 cards.

### Guardrails

- Maintain consistent card heights where possible.
- Avoid running simultaneous animations in every card.

## Final Validation Checklist

- Layout works at mobile and desktop breakpoints.
- Interactive elements are reachable with keyboard navigation.
- Motion supports content hierarchy instead of competing with it.
- Added components compile with the current path alias setup.
