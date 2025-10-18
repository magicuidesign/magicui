# Frontend Guideline Document for goldenLA

## 1. Frontend Architecture

**Framework & Language**
- **Next.js (App Router)**: Handles hybrid rendering (SSG, SSR, ISR) and file-based routing for pages and API routes.
- **React + TypeScript**: Enables component-driven development with strong typing for better code quality.

**Monorepo Setup**
- **Turborepo**: Orchestrates parallel builds and caching across packages.
- **pnpm**: Manages dependencies efficiently, sharing them across the monorepo.

**Component Library & Styling**
- **MagicUI & shadcn/ui**: A collection of reusable React components for rich, animated UI elements.
- **Tailwind CSS**: Utility-first CSS framework for rapid, consistent styling.
- **Framer Motion**: Declarative animation library powering interactive effects.

**Content & Data**
- **MDX**: Markdown with JSX for content files, allowing editors to embed React components directly.
- **Next.js API Routes**: Serverless endpoints (e.g., blog-webhook) living under `apps/www/app/api` for lightweight backend logic.

**Tooling & Build**
- **ESLint & Prettier**: Enforce code style and formatting.
- **Vitest**: Unit and integration tests for components and utilities.
- **Vercel**: Deployment platform optimized for Next.js projects.

**Scalability & Performance**
- **Code Splitting & Lazy Loading**: Next.js automatically splits code by route; dynamic imports for seldom-used components.
- **Image Optimization**: Built-in `next/image` for responsive, optimized images.
- **Caching & ISR**: Leveraging Turborepo cache and Next.js Incremental Static Regeneration for fast builds and updates.

## 2. Design Principles

1. **Usability**: Clear layouts, intuitive navigation, and consistent component behavior.
2. **Accessibility (A11y)**: Semantic HTML, proper ARIA attributes, keyboard-friendly components, and color contrast that meets WCAG guidelines.
3. **Responsiveness**: Mobile-first breakpoints in Tailwind ensure layouts adapt smoothly from small to large screens.
4. **Consistency**: Shared design tokens (colors, spacing, typography) and utility classes maintain a unified look and feel.
5. **Content-First**: MDX enables authors to drive page structure with content, keeping UI code separate.

*Application in UI design*:
- **Semantic Components**: Buttons, forms, and links follow HTML semantics.
- **Focus Management**: Custom focus outlines and skip-links for keyboard users.
- **Feedback & States**: Clear loading indicators, hover/focus states, and error messages.

## 3. Styling and Theming

**Approach**
- Utility-first (Tailwind CSS) with a central `tailwind.config.js` for design tokens.
- No additional preprocessors; Tailwind handles nesting and theming.

**Design Style**
- **Modern Flat** with subtle **glassmorphism** touches on hero backgrounds and cards.

**Color Palette**
- **Primary**: #4F46E5 (indigo-600)
- **Secondary**: #14B8A6 (teal-500)
- **Accent**: #FBBF24 (amber-400)
- **Neutral Dark**: #111827 (gray-900)
- **Neutral Light**: #F9FAFB (gray-50)
- **Error**: #EF4444 (red-500)
- **Success**: #10B981 (emerald-500)

**Typography**
- **Font Family**: Inter, with fallbacks `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Font Sizes & Weights**: Defined in Tailwind’s theme; base text at `text-base` (1rem), headings from `text-2xl` to `text-5xl`.

**Theming**
- Light and dark mode support via Tailwind’s `dark:` variants.
- Theme toggle state managed globally (Jotai atom) and applied via HTML `class`.

## 4. Component Structure

**Organization**
- `/apps/www/components` for shared UI pieces (buttons, cards, navbars).
- `/apps/www/registry/magicui` for specialized MagicUI components and examples.
- Group by feature or domain, e.g., `blog/`, `docs/`, `marketing/` subfolders.

**Reuse & Composition**
- **Atomic Components**: Small, single-responsibility parts (e.g., `Badge`, `Spinner`).
- **Molecules & Organisms**: Compose smaller pieces into more complex UI blocks (e.g., `BlogCard`, `HeroSection`).

**Benefits**
- **Maintainability**: Isolated changes without affecting unrelated parts.
- **Discoverability**: Clear folder structure and naming conventions.
- **Testability**: Small components are easier to unit-test.

## 5. State Management

**Library**
- **Jotai**: Lightweight, flexible atomic state management.

**Patterns**
- **Local State**: `useState` or component-scoped atoms for UI interactions (modals, toggles).
- **Global State**: Jotai atoms for theme, user preferences, or data shared across pages.
- **Async Data**: React Query or SWR can be added for server state; default fetches happen in `getStaticProps`/`getServerSideProps`.

**Sharing State**
- Provide atoms via a central `atoms.ts` file.
- Use `useAtom` in components to read/write state.

## 6. Routing and Navigation

**File-Based Routing**
- **App Router**: `app/` directory with nested `layout.tsx` and `page.tsx` files.
- **Dynamic Routes**: Folders like `[...slug]` for blog and docs.

**Navigation**
- **Next.js `<Link>`** component for internal links.
- **Navbars & Sidebars**: Placed in root or group-specific `layout.tsx` files.
- **Active States**: Tailwind classes with conditional logic to highlight current route.

## 7. Performance Optimization

- **Image Optimization**: Use `<Image>` from Next.js with `priority` for critical images.
- **Code Splitting**: Automatic route-based splitting; dynamic `import()` for heavy MagicUI components.
- **Lazy Loading**: Defer non-essential components or sections until needed (e.g., animations offscreen).
- **Caching**: ISR and SWR (if used) for data caching; Turborepo build cache.
- **Minification & Compression**: Handled by Next.js and Vercel by default.

## 8. Testing and Quality Assurance

**Unit & Integration Tests**
- **Vitest**: Run tests in Node and jsdom environments.
- **React Testing Library**: For testing component renders and user interactions.

**End-to-End (E2E) Tests**
- Recommended: **Playwright** or **Cypress** for critical user flows (blog creation, search, navigation).

**Linters & Formatters**
- **ESLint**: Enforce code conventions; custom Next.js and TypeScript rules.
- **Prettier**: Automatic code formatting on commit via Husky/Git hooks.

**CI/CD**
- **GitHub Actions**: Lint, type check, test on push and pull requests.
- **Accessibility Audits**: Integrate `axe-core` into tests for automated A11y checks.

## 9. Conclusion and Summary

This document outlines how goldenLA’s frontend is built for scalability, maintainability, and performance. By leveraging Next.js, React, TypeScript, and a component-driven approach, we ensure that new pages, features, and content can be added with minimal friction. Design principles centered on usability, accessibility, and responsiveness guide every UI decision. Tailwind CSS and MagicUI deliver a consistent, modern look, while Framer Motion brings animations to life. With Jotai handling state, Next.js routing, and a robust testing pipeline, the codebase remains reliable and easy to work with. Through these guidelines, any team member—technical or not—can understand, contribute to, and maintain the goldenLA frontend effectively.