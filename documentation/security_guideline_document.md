# Security Guidelines for goldenLA

This document outlines essential security practices tailored to the **goldenLA** Next.js/React application. Adherence to these guidelines will help ensure the application is robust, resilient, and secure by design.

---

## 1. Authentication & Access Control

- **Identify Protected Resources**  
  • Review all API routes (`apps/www/app/api/**`) and dynamic pages to determine which require authentication or authorization.  
  • Ensure routes for administrative actions (e.g., content publishing webhooks) are locked down.

- **Implement Robust Authentication**  
  • If user accounts exist, use industry‐standard flows (e.g., NextAuth.js) with OAuth or email/password + MFA.  
  • Store passwords hashed with Argon2 or bcrypt (unique salts) in a secure database—not in code or environment variables.

- **Secure Session & Token Management**  
  • For session cookies: set `Secure`, `HttpOnly`, and `SameSite=Strict` attributes.  
  • If using JWTs, validate `alg` (avoid “none”), verify signatures, enforce `exp`/`iat`, and rotate secrets regularly.  
  • Enforce session timeouts (idle and absolute) and provide a logout endpoint to revoke tokens or clear sessions server‐side.

- **Role-Based Access Control (RBAC)**  
  • Define roles (e.g., `editor`, `admin`, `viewer`) and scope permissions per API endpoint.  
  • Perform server‐side authorization checks on every request—never trust client‐supplied role data.

- **Least Privilege**  
  • Grant minimal permissions to database users, serverless functions, and CI/CD service accounts.  
  • Avoid running build or deployment agents with administrative OS privileges.

---

## 2. Input Handling & Processing

- **Validate & Sanitize All Inputs**  
  • Treat all MDX frontmatter fields, query parameters (`[...slug]`), and API payloads as untrusted.  
  • Apply strong schema validation (e.g., `zod`, `Yup`) in Next.js API routes to enforce types and allowed values.

- **Prevent Injection Attacks**  
  • Use parameterized queries or an ORM (e.g., Prisma) for any database interactions.  
  • Sanitize any content that’s rendered as HTML; if allowing raw HTML/JSX in MDX, use an HTML sanitizer (e.g., `DOMPurify`).

- **Mitigate Cross-Site Scripting (XSS)**  
  • Escape or encode user‐supplied content in templates and React components.  
  • Adopt a strong Content Security Policy (CSP) via `next.config.js` headers to limit scripts, styles, and frame sources.

- **Secure File Uploads** *(if applicable)*  
  • Restrict file types and sizes.  
  • Store uploads outside the public directory or on a dedicated object storage (e.g., AWS S3) with strict ACLs.  
  • Scan uploads for malware and sanitize filenames to prevent path traversal.

- **Protect API Redirects**  
  • If redirecting users after actions (e.g., login), validate `redirectTo` against an internal allow‐list of paths.

---

## 3. Data Protection & Privacy

- **Encrypt Data in Transit & at Rest**  
  • Enforce HTTPS/TLS (1.2+) for all Vercel domains.  
  • Use database encryption features for PII fields or store them in a dedicated encrypted vault.

- **Manage Secrets Securely**  
  • Store API keys, database credentials, and third‐party secrets in Vercel Environment Variables or a secrets manager (e.g., AWS Secrets Manager).  
  • Rotate credentials regularly and audit access.

- **Minimize Data Exposure**  
  • Only include necessary fields in API responses—avoid returning internal IDs or PII.  
  • Mask or redact sensitive values in logs (e.g., user emails, tokens).

- **Compliance & Data Retention**  
  • If storing user data, implement GDPR/CCPA processes: consent capture, data deletion, and audit logs.  
  • Document data retention policies and ensure automated cleanup of stale data.

---

## 4. API & Service Security

- **Enforce HTTPS Everywhere**  
  • Redirect all HTTP traffic to HTTPS in Vercel or via `next.config.js`.

- **Rate Limiting & Throttling**  
  • Integrate rate‐limiting at the edge (e.g., Vercel Edge Functions) or via middleware to prevent brute‐force and DoS attacks.

- **CORS Hardening**  
  • Only allow trusted origins in your CORS policy.  
  • For credentials‐passing requests, set `Access-Control-Allow-Credentials: true` and use a strict origin list.

- **API Versioning**  
  • Namespace routes (e.g., `/api/v1/blog-webhook`) to manage future changes without breaking clients.

- **Minimal Data Surface**  
  • Return only required data per endpoint and avoid large payloads if not necessary.  
  • Implement pagination or cursor-based queries for large datasets.

---

## 5. Web Application Security Hygiene

- **CSRF Protection**  
  • Use anti‐CSRF tokens for all state‐changing requests (POST/PUT/DELETE) or leverage Next.js built‐in CSRF middleware.

- **Security Headers**  
  • Configure HTTP headers via `next.config.js` or middleware:  
    - `Strict-Transport-Security`  
    - `Content-Security-Policy`  
    - `X-Content-Type-Options: nosniff`  
    - `X-Frame-Options: DENY`  
    - `Referrer-Policy: strict-origin-when-cross-origin`

- **Secure Cookies**  
  • Ensure cookies used for sessions or JWTs have `Secure`, `HttpOnly`, and appropriate `SameSite` settings.

- **Prevent Clickjacking**  
  • Set `X-Frame-Options: DENY` or define `frame-ancestors` in CSP.

- **Avoid Sensitive Data in Client Storage**  
  • Do not store tokens or PII in `localStorage`/`sessionStorage`; rely on secure, HttpOnly cookies or in-memory stores.

---

## 6. Infrastructure & Configuration Management

- **Harden Vercel Deployment**  
  • Disable preview deployments for untrusted branches or limit them to private environments.  
  • Ensure environment variables are scoped correctly (Production vs. Preview).

- **Secure TLS/SSL Configuration**  
  • Use only TLS 1.2+ and disable weak ciphers. Verify via SSL Labs or automated scans.

- **Disable Debug in Production**  
  • Ensure `next.config.js` has `reactStrictMode: true` and remove any `debug` flags from production builds.

- **Least Privilege on Services**  
  • In GitHub Actions or CI, use fine-grained tokens (e.g., GitHub App with minimal perms) rather than full repo tokens.

- **Regular Updates**  
  • Keep Node.js runtime, Next.js, React, and all dependencies up to date. Automate security audits via GitHub Dependabot or pnpm audit.

---

## 7. Dependency Management

- **Use Approved Dependencies**  
  • Vet libraries (e.g., `magicui`, `framer-motion`, `jotai`) for active maintenance and known vulnerabilities.

- **Lockfile & Reproducible Builds**  
  • Commit `pnpm-lock.yaml` to version control.  
  • Run `pnpm install --frozen-lockfile` in CI to prevent unexpected upgrades.

- **Automated Vulnerability Scanning**  
  • Integrate SCA tools (e.g., GitHub Dependabot, Snyk) to auto-detect CVEs in dependencies.

- **Minimize Attack Surface**  
  • Remove unused packages and scripts from `package.json`.  
  • Only install production dependencies for production builds (`pnpm install --prod`).

---

By embedding these security controls throughout the development lifecycle, **goldenLA** will maintain strong defenses against common threats and ensure user data and content remain protected. Regularly revisit and update these guidelines as the application evolves and new threats emerge.