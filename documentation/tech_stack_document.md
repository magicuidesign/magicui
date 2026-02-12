# Tech Stack Document

This document explains the technologies behind the **goldenLA** project in simple terms. It covers the main tools and services used, why they were chosen, and how they work together to deliver a fast, engaging, and easy-to-manage website.

## 1. Frontend Technologies
These are the tools that run in your browser and shape what you see and how you interact with the site.

- **Next.js (React framework)**
  - Builds pages that can be generated ahead of time (Static Site Generation) or on demand (Server-Side Rendering).
  - Offers routing, image optimization, and built-in performance features.
- **React**
  - The core library for building reusable user interface components.
- **TypeScript**
  - Adds clear labels (types) to data, helping catch errors early and improving code readability.
- **Tailwind CSS**
  - A utility-first styling tool that speeds up design by providing ready-made CSS classes.
- **Framer Motion**
  - A simple way to add smooth animations and transitions to components.
- **MagicUI** (custom component library)
  - A collection of ready-to-use, animated UI blocks (buttons, text effects, image effects).
- **shadcn/ui**
  - Provides foundational UI pieces that MagicUI builds upon.
- **Jotai**
  - A lightweight tool to manage shared data (state) across components.
- **MDX (Markdown + JSX)**
  - Lets content authors write pages in Markdown while embedding React components for interactivity.
- **Analytics & SEO**
  - **PostHog** and **Google Analytics** track user behavior.
  - **robots.txt** and **sitemap.xml** guide search engines for better discoverability.

These choices work together to ensure the site is visually appealing, interactive, and easy to update without touching complex code.

## 2. Backend Technologies
These are the tools that run on the server, handle data, and support the features you use.

- **Next.js API Routes (Serverless Functions)**
  - Small, on-demand endpoints for tasks like handling webhooks when new blog posts are published.
- **Node.js Runtime**
  - The environment that runs the server-side code.
- **TypeScript**
  - Ensures server code is clear and error-free.
- **File-Based Content (MDX files)**
  - Blog posts and documentation live as files in the repository, so updates are as simple as editing text files.

By keeping data in files and using lightweight serverless functions, the backend is easy to maintain and scales automatically as traffic grows.

## 3. Infrastructure and Deployment
This section covers where the code lives, how it’s built, and how it gets published.

- **Git & GitHub**
  - Version control for tracking changes and collaborating on code.
- **pnpm (Package Manager)**
  - Efficiently installs and manages project dependencies in a multi-package setup.
- **Turborepo**
  - Orchestrates builds and code sharing across multiple packages (the main app, UI libraries, utilities).
- **GitHub Actions**
  - Automates checks (linting, formatting, type-checking, testing) whenever code is changed.
- **Vercel**
  - Hosts the site, automatically building and deploying it on every code update.
  - Provides a global Content Delivery Network (CDN) for fast page loads worldwide.

Together, these tools ensure reliable, repeatable builds and make it easy to roll out updates without downtime.

## 4. Third-Party Integrations
These external services enhance the site’s functionality without rebuilding common features from scratch.

- **PostHog & Google Analytics**
  - Collect insights on how visitors use the site.
- **Webhook Listeners**
  - Automatically trigger rebuilds when new content is published from external systems (e.g., a CMS).

By plugging into proven services, the project stays focused on its unique features while relying on best-in-class solutions for analytics and content workflows.

## 5. Security and Performance Considerations
Key measures taken to keep data safe and the site speedy.

- **TypeScript, ESLint & Prettier**
  - Prevent code errors and maintain consistent style across the team.
- **Next.js Built-In Optimizations**
  - Static generation, automatic code splitting, and smart caching for fast page loads.
- **Image Optimization**
  - Automatic resizing and modern formats (WebP/AVIF) for faster downloads.
- **Accessibility Best Practices**
  - Semantic HTML and ARIA attributes ensure the site works for everyone, including those using screen readers.
- **Security Headers & HTTPS**
  - Enforced by the hosting platform (Vercel) to protect data in transit.

These practices help deliver a smooth, reliable experience to all users while keeping the codebase healthy and secure.

## 6. Conclusion and Overall Tech Stack Summary
The **goldenLA** project combines modern, developer-friendly tools with proven third-party services to build a dynamic, content-driven website. 

Highlights:
- A React/Next.js frontend for rich, interactive pages and animations.
- MDX content files for easy updates by non-developers.
- Tailwind CSS and Framer Motion for consistent styling and smooth effects.
- Serverless API Routes for lightweight backend tasks like webhooks.
- A monorepo setup with pnpm and Turborepo to share code and speed up builds.
- Automated CI/CD and hosting on Vercel for reliable, global deployments.

This carefully chosen stack ensures that content editors, designers, and developers can all work efficiently, delivering a fast and engaging experience to site visitors while keeping maintenance straightforward.