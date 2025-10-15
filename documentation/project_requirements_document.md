# Project Requirements Document (PRD)

## 1. Project Overview
**goldenLA** is a content-rich web application built on Next.js and React. It serves as a flexible foundation for startup landing pages, blogs, or documentation sites. Content editors write in MDX (Markdown + JSX), embedding React components directly in their articles. At build time or on demand, Next.js dynamically generates pages for blogs, docs, and marketing sections, delivering a fast, SEO-friendly experience.

The project is being built to streamline content publishing and deliver an engaging, animated user experience without sacrificing performance or developer efficiency. Key objectives are:

- Empower non-technical users to update content via MDX files.
- Provide a library of animated, customizable UI components (MagicUI) for visually rich interactions.
- Ensure fast load times (static site generation/SSR), SEO readiness (sitemaps, robots.txt), and simple deployment on Vercel.

## 2. In-Scope vs. Out-of-Scope

In-Scope (Version 1):
- MDX‐based content management for blog posts, documentation, and marketing pages.
- Dynamic routing for `/blog/[...slug]`, `/docs/[[...slug]]`, and marketing routes.
- Component-driven UI: text effects, image/media effects, animated buttons, 3D icon clouds, confetti, etc.
- Serverless API route for `blog-webhook` to trigger rebuilds on new content.
- SEO support: `robots.txt`, dynamic `sitemap.xml`, optimized `<head>` metadata.
- Analytics integration (PostHog, optional Google Analytics snippet).
- Monorepo management with Turborepo and pnpm, shared MagicUI component library.
- Linting/formatting (ESLint, Prettier), TypeScript for type safety, Vitest for unit tests.

Out-of-Scope (Future Phases):
- User authentication, profiles, or comments system.
- Integrated CMS admin UI (e.g., headless CMS dashboard).
- e-commerce or payment processing.
- Multi-language (i18n) support beyond basic folder structure.
- Advanced search or filtering UI.
- Real-time collaboration or chat features.

## 3. User Flow
When a visitor arrives at goldenLA’s homepage, the site loads statically generated HTML and CSS for the hero section, navigation bar, and a teaser of featured content. The top nav bar displays links: Home, Blog, Documentation. As the user scrolls, animated text effects, image blurs, and reveal-on-scroll components bring the page to life. A footer offers social links and an email signup form.

If the user clicks “Blog,” Next.js fetches the list of MDX posts at build time, generating a list page with teasers. Clicking a post slug opens a statically or server-rendered page showing the MDX content plus interactive UI components (e.g., morphing headings, confetti on scroll). In the docs section, nested dynamic routes fetch and render Markdown docs with embedded React demos. All pages include SEO metadata and analytics events, while the site remains responsive and optimized for mobile and desktop.

## 4. Core Features
- **MDX Content Management**: Store `.mdx` files under `apps/www/content`, embed React components inline.
- **Dynamic Routing**: Next.js App Router handles `/blog/[...slug]`, `/docs/[[...slug]]`, and marketing pages with SSG/SSR.
- **MagicUI Component Library**: Reusable, animated UI elements (text effects, image lenses, 3D icon clouds, animated buttons, etc.).
- **Serverless API**: `apps/www/app/api/blog-webhook/route.ts` to handle content publishing webhooks and trigger rebuilds.
- **SEO & Meta**: Automatic sitemap generation (`sitemap.ts`), `robots.ts`, Open Graph image generation (`og` folder).
- **Analytics**: PostHog integration, optional Google Analytics snippet in `analytics.tsx`.
- **Monorepo Orchestration**: Turborepo and pnpm workspace to manage `apps/www`, `registry/magicui`, and any future packages.
- **State Management**: Jotai for lightweight global state (e.g., theme toggles).
- **Styling & Animations**: Tailwind CSS for styling, Framer Motion for declarative animations.
- **Code Quality**: TypeScript types, ESLint/Prettier config, Vitest test suite.

## 5. Tech Stack & Tools
- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content Processing**: MDX (via `@next/mdx` or `fumadocs-mdx`)
- **Components**: Custom MagicUI library, shadcn/ui for base components
- **State**: Jotai
- **Monorepo**: Turborepo, pnpm
- **Deployment**: Vercel
- **Testing**: Vitest
- **Lint/Format**: ESLint, Prettier
- **CI/CD**: GitHub Actions for linting, testing, type checks
- **Analytics**: PostHog, (Google Analytics optional)

## 6. Non-Functional Requirements
- **Performance**: First Contentful Paint < 1s on 3G throttle; page load < 2s on mobile.
- **Responsiveness**: Fully mobile-first; all components adapt seamlessly to different viewports.
- **Accessibility (A11y)**: WCAG 2.1 AA compliance; semantic HTML, ARIA roles, keyboard navigation.
- **SEO**: Proper meta tags, sitemaps, robots.txt, optimized images (Next.js Image component).
- **Reliability**: 99.9% uptime on Vercel; graceful error handling and fallback UI.
- **Security**: Secure HTTP headers, no exposed secrets in client bundle, validate webhook payloads.
- **Maintainability**: Consistent code style, exhaustive TypeScript coverage, clear docs/examples in `registry/example`.

## 7. Constraints & Assumptions
- **Vercel Deployment**: Relies on Vercel’s Edge Functions and build pipeline for SSG/SSR.
- **MDX Workflow**: Editors commit MDX to Git; CI triggers rebuild—no headless CMS GUI.
- **MagicUI Versioning**: Component API may evolve; adhere to semantic versioning within the monorepo.
- **Third-Party Limits**: PostHog and analytics calls subject to their rate limits.
- **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge);
  IE11 support is not required.

## 8. Known Issues & Potential Pitfalls
- **Large Bundle Size**: Many specialized animations could bloat JS; mitigate with Next.js dynamic imports and code splitting.
- **MDX Parsing Errors**: Unexpected JSX in MDX may cause build failures; enforce MDX linting rules.
- **Hydration Mismatch**: Animations or random effects (confetti) can differ server vs. client; use consistent seeds or `useEffect` guard.
- **API Rate Limits**: Excessive webhook calls could hit platform limits; implement debounce or queueing.
- **Accessibility Gaps**: Custom animated components require manual A11y checks; include automated Lighthouse audits in CI.

**End of Document**