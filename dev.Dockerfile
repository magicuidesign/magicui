FROM node:20-alpine

ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_APP_URL
ARG RESEND_API_KEY
ARG STRIPE_API_KEY
ARG NEXT_PUBLIC_STRIPE_PAYMENT_LINK
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
ARG NODE_ENV
ARG SERVER_URL
ARG STRIPE_SECRET_KEY_LIVE
ARG STRIPE_WEBHOOK_SECRET

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY . .
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
RUN npx prisma generate

# Start Next.js in development mode based on the preferred package manager
CMD \
    if [ -f yarn.lock ]; then yarn dev; \
    elif [ -f package-lock.json ]; then npm run dev; \
    elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
    else npm run dev; \
    fi