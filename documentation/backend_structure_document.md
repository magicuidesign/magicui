# Backend Structure Document for goldenLA

This document outlines the backend setup for the goldenLA project. It covers the overall architecture, how content and data are managed, API design, hosting environment, infrastructure pieces, security practices, and monitoring plans. Anyone should be able to understand how the backend works and how it supports the application’s goals.

## 1. Backend Architecture

Our backend is built on **Next.js** using its App Router. There is no separate server application—Next.js handles both page generation and API routes in one framework. Key points:

- Monorepo setup with **Turborepo** and **pnpm** keeps the code organized and speeds up builds.
- **Static Site Generation (SSG):** Most pages (blog posts, documentation) are built at deploy time for maximum speed.
- **Server-Side Rendering (SSR):** Used selectively for pages that need up-to-the-minute data or on-the-fly image generation (Open Graph images).
- **Incremental Static Regeneration (ISR):** Allows certain pages to be re-built on demand (for example, after new content is published) without a full redeploy.
- **Serverless API Routes:** Lightweight endpoints live under `apps/www/app/api`, each deployed as a serverless function. They handle tasks like receiving blog-publish webhooks or generating dynamic images.

This setup scales automatically because it runs on a serverless platform (Vercel). We get:

- **Automatic scaling** when traffic spikes.
- **Low maintenance**, since there’s no traditional server to patch.
- **High performance**, as static pages are served from edge locations worldwide.

## 2. Database Management

We don’t use a traditional database. Instead, all content lives in the file system as MDX files. Here’s how it works:

- **File-based Content:** Blog posts and docs are stored in `apps/www/content` as `.mdx` files.
- **Frontmatter Metadata:** Each MDX file begins with a small block of YAML data (title, date, tags, summary). This metadata drives routing and page templates.
- **MDX Parser:** We use `@next/mdx` (via `Fumadocs-mdx`) to turn MDX into rich React pages.
- **Caching:** Once parsed at build time or first request, pages are cached on Vercel’s edge network for fast delivery.

This approach: no separate SQL/NoSQL server, less operational overhead, and content editors can update files directly or via a headless CMS that commits MDX to the repo.

## 3. Database Schema (Content Structure)

Since we rely on MDX files, our "schema" is really a folder and frontmatter convention:

- **Content Folders:**
  • `content/blog/` – all blog posts
  • `content/docs/` – all documentation pages

- **File Naming & Routing:**
  • Blog post: `2023-06-15-golden-la-launch.mdx`
    * Frontmatter: title, date, description, tags, slug
  • Doc page: `getting-started.mdx` or nested folders for versioned docs

- **Common Frontmatter Fields:**
  • `title` (string): Page title
  • `date` (YYYY-MM-DD): Publication date
  • `description` (string): Short summary for SEO and previews
  • `tags` (array): Keywords for filtering
  • `slug` (string, optional): Custom URL path

This simple, consistent structure lets Next.js discover content automatically and generate the correct routes.

## 4. API Design and Endpoints

We use Next.js API routes to handle server-side tasks. These endpoints live under `apps/www/app/api`: 

- **POST /api/blog-webhook**
  • Purpose: Receive webhook calls (e.g., from GitHub or a headless CMS) when new content is published.
  • Action: Validate a secret token, then trigger a rebuild or revalidation of affected pages via Next.js’s on-demand ISR.

- **GET /api/og/[...params]**
  • Purpose: Dynamically generate Open Graph images for sharing links.
  • Action: Take URL parameters (title, subtitle, theme), render an image with server-side React, and return it as PNG.

These routes:

- Follow a **RESTful style** by using HTTP methods (GET, POST).
- Use environment variables (`process.env.WEBHOOK_SECRET`) to keep secrets out of code.
- Are self-contained functions, so each one can scale independently.

## 5. Hosting Solutions

We host everything on **Vercel**, which is the platform created by the Next.js team. Benefits include:

- **Global Edge Network:** Static pages and serverless functions are served from locations near your users.
- **Zero-config Deploys:** Connect your GitHub repo, and every push automatically builds and deploys.
- **Built-in CDN & Caching:** Next.js pages, images, and API responses are cached intelligently.
- **Serverless Functions:** API routes scale without manual provisioning.
- **Cost Efficiency:** You pay for what you use, with a generous free tier for small to mid-sized projects.

## 6. Infrastructure Components

Under the hood, several pieces work together:

- **Load Balancer & Edge Routing:** Vercel automatically routes requests to the nearest edge server.
- **CDN:** All static assets (JavaScript bundles, CSS, images) and SSG pages are cached at the edge.
- **ISR Cache:** API calls to revalidate pages update the edge cache without a full redeploy.
- **Logging & Metrics:** Vercel provides real-time logs for builds and function invocations.

Optional 3rd-party add-ons (not in the code but easy to integrate):

- **Redis or in-memory cache** (via an external service) for session data or heavy computations.
- **Image CDN** (e.g., Cloudinary) if you need advanced image transformations.

## 7. Security Measures

We follow best practices to keep the backend safe:

- **HTTPS Everywhere:** Vercel enforces TLS on all domains automatically.
- **Secret Management:** Webhook tokens and API keys live in Vercel’s environment settings, not in code.
- **Webhook Validation:** The `/api/blog-webhook` endpoint checks a signature or token before accepting requests.
- **CORS Policies:** API routes only allow requests from approved origins.
- **Least Privilege:** If integrating a headless CMS or database later, we would create separate API users with minimal permissions.

## 8. Monitoring and Maintenance

To keep things running smoothly:

- **Build & Deployment Logs:** Vercel shows detailed logs for every deploy.
- **Function Metrics:** Track invocation counts, latencies, and errors via the Vercel dashboard.
- **Analytics:** We use PostHog (and optionally Google Analytics) to monitor user behavior, page performance, and API usage.
- **Automated Tests:** Vitest runs unit and integration tests on each pull request.
- **CI/CD Checks:** GitHub Actions lint code, run type checks, and execute tests before merging.
- **Dependency Updates:** Dependabot opens pull requests for outdated packages; we review and merge regularly.

## 9. Conclusion and Overall Backend Summary

goldenLA’s backend is a modern, low-maintenance setup built entirely on Next.js serverless features and file-based content. There’s no separate database server to manage—content editors add or update MDX files, and Next.js handles the rest. Hosting on Vercel ensures global performance, automatic scaling, and simple CI/CD. Security is baked in through HTTPS, secret validation, and environment variables. Monitoring and maintenance rely on built-in Vercel tools, PostHog analytics, and automated tests.

This configuration aligns perfectly with goldenLA’s goals:

- **Fast performance** through static generation and edge caching.
- **Easy content updates** via MDX and webhooks.
- **Scalability** without extra DevOps overhead.
- **Clear separation** between frontend presentation and lightweight backend logic.

With this structure, the team can focus on crafting engaging UI/UX experiences and creating great content, while knowing the backend will reliably support growth and change.