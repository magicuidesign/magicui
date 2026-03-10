---
name: magic-ui
description: Use this skill when users want to add, customize, or troubleshoot Magic UI components in React/Next.js projects. It covers component selection, shadcn registry installation (`@magicui/*`), integration patterns, and practical quality checks for accessibility and maintainability.
metadata:
  short-description: Build and customize UIs with Magic UI components
---

# Magic UI

Use this skill when the task involves Magic UI components, animated UI sections, or converting static sections into interactive UI using the Magic UI registry.

## When To Apply

Apply this skill when users ask to:

- Add a Magic UI component (for example: marquee, globe, blur-fade, shiny-button)
- Build a section with Magic UI effects (hero, testimonials, CTA, feature grid)
- Replace custom animation code with Magic UI components
- Troubleshoot installation/import issues for `@magicui/*`

## Core Workflow

1. Define the UI outcome first.
  - Identify section type, tone, motion intensity, and responsive behavior.
  - Keep motion intentional; avoid stacking many high-motion effects in one viewport.

2. Confirm project prerequisites.
  - Project should be React/Next.js with Tailwind CSS.
  - shadcn must be initialized before adding registry components:
```bash
npx shadcn@latest init
```

3. Install the selected component(s).
```bash
npx shadcn@latest add @magicui/<component-slug>
```
Example:
```bash
npx shadcn@latest add @magicui/magic-card
```

4. Integrate into the target section.
  - Import from the generated path (typically `@/components/ui/<component-slug>`).
  - Keep component APIs intact; prefer prop/className customization over rewriting internals.
  - If docs mention extra dependencies or CSS keyframes, add them during integration.

5. Validate quality before finishing.
  - Accessibility: semantic HTML, keyboard access, meaningful labels/text.
  - Responsiveness: check mobile layout and overflow behavior.
  - Performance: avoid unnecessary client-only wrappers and heavy animation stacking.
  - Maintainability: keep new code modular and consistent with existing project conventions.

## References To Load On Demand

- For component choice, install shape, and dependency expectations:
  - Read `references/components.md`
- For section-level implementation patterns:
  - Read `references/recipes.md`

## Quick Component Selection Heuristics

- Social proof/logo rails: `marquee`, `avatar-circles`
- Hero visual impact: `globe`, `warp-background`, `animated-grid-pattern`
- Text animation: `blur-fade`, `text-animate`, `word-rotate`, `sparkles-text`
- CTA emphasis: `shiny-button`, `shimmer-button`, `rainbow-button`
- Ambient backgrounds: `grid-pattern`, `dot-pattern`, `particles`, `flickering-grid`

Start with 1 core component + 1 supporting effect, then expand only if needed.

## Troubleshooting

- `components.json` or registry init error:
  - Run `npx shadcn@latest init` in the project root.
- Import path mismatch (`@/` alias not configured):
  - Use the project's alias style or relative imports.
- Visual mismatch after install:
  - Check for required global CSS/keyframes listed in the component docs.
- Missing package errors:
  - Install dependencies listed in the component's manual installation steps.

## Reference Links

- Magic UI docs: `https://magicui.design/docs`
- Component docs: `https://magicui.design/docs/components`
- Installation: `https://magicui.design/docs/installation`
- MCP setup (optional, for AI IDE workflows): `https://magicui.design/docs/mcp`
