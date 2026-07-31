# Contributing to MagicUI

Thank you for your interest in contributing to MagicUI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to MagicUI.

Read the [example PR](https://github.com/magicuidesign/magicui/pull/780) to learn which files you need to add. **You only need to write 5 files to add a new component or effect** (plus committing the registry artifacts that `pnpm build:registry` generates for you) and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/magicuidesign/magicui/compare).

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**  
   Click [here](https://github.com/magicuidesign/magicui/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/magicui.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd magicui
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-branch
   ```

5. **Install dependencies**

   Requires Node 22 (see `.nvmrc`) and pnpm 9.

   ```bash
   pnpm i
   ```

6. **Create a `.env.local` file**

   ```bash
   touch .env.local && echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
   ```

7. **Run the project**
   ```bash
   pnpm dev
   ```

## Adding a New Component

To add a new component to MagicUI, you will need to modify several files. Follow these steps:

### 1. Create Component

Create the main component in `registry/magicui/example-component.tsx`

```typescript
import React from 'react'

export default function ExampleComponent() {
  return (
    <div>
      This is your component.
    </div>
  )
}
```

### 2. Create Component Demo

Provide a basic example to showcase your component in `registry/example/example-component-demo.tsx`

```typescript
import ExampleComponent from '@/registry/magicui/example-component'

export default function ExampleComponentDemo() {
  return (
    <div className="relative justify-center">
      <ExampleComponent />
    </div>
  )
}
```

### 3. Update Sidebar

Add your component to the sidebar in `config/docs.ts`

```typescript
{
    title: "Example Component",
    href: `/docs/components/example-component`,
    items: [],
    label: "New",
}
```

### 4. Create docs

Create an MDX file for documenting your component in `content/docs/components/example-component.mdx`

````md
---
title: Example Component
date: 2024-06-01
description: Example component for Magic UI
author: magicui
published: true
---

<ComponentPreview name="example-component-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @magicui/example-component
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="example-component" />

<Step>Update the import paths to match your project setup.</Step>

<Step>Add the required CSS animations</Step>

<Step>Add the following animations to your global CSS file inside the `@theme inline` block (e.g., `app/globals.css` or similar)</Step>

```css title="app/globals.css" {1-2,4-18}
--animate-example: example var(--duration) infinite linear;

@keyframes example {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
```

</Steps>

</TabsContent>

</Tabs>

## Props

| Prop    | Type     | Default  | Description                |
| ------- | -------- | -------- | -------------------------- |
| `color` | `String` | `"blue"` | The color of the component |
````

### 5. Update Registry

Export your component and example in the registry files:

In `registry/registry-ui.ts`:

```typescript
export const ui: Registry = [
  // ... existing components ...
  {
    name: "example-component",
    type: "registry:ui",
    title: "Example Component",
    description:
      "A versatile component that can be used to display various types of content such as text, images, or videos.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/example-component.tsx",
        type: "registry:ui",
      },
    ],
    // Add CSS variables for the component
    cssVars: {
      theme: {
        "animate-example": "example var(--duration) infinite linear",
      },
    },
    // Add CSS keyframes for the component
    css: {
      "@keyframes example": {
        from: {
          transform: "translateX(0)",
        },
        to: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
      },
    },
  },
];
```

In `registry/registry-examples.ts`:

```typescript
export const examples: Registry = [
  // ... existing examples ...
  {
    name: "example-component-demo",
    description: "An example of the example-component",
    type: "registry:example",
    registryDependencies: ["example-component"],
    files: [
      {
        path: "registry/example/example-component-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
```

Make sure to add any necessary dependencies, tailwind configurations, or other properties as needed for your specific component.

### 6. Build registry

```bash
pnpm build:registry
```

This regenerates the registry artifacts (`registry.json`, `registry/__index__.tsx`, `public/registry.json`, `public/r`, `public/llms.txt`, `public/llms-full.txt`). **Commit the generated files together with your component** — CI verifies they are up to date and fails otherwise.

## Adding to the showcase

### 1. Create your showcase as a MDX file

Create your showcase in `content/showcase/website-name.mdx`

```mdx
---
title: website-name.com
description: Website description
image: /showcase/website-name.png
href: https://website-name.com
featured: true
affiliation: YC S25, raised $10M
---
```

### 2. Create an image

Upload an image of your site to `public/showcase/website-name.png`

## Before Opening a Pull Request

Running the checks below locally first saves you a round trip with CI:

1. **Run all checks**

   ```bash
   pnpm check
   ```

   This runs `lint`, `typecheck`, `format:check`, and `registry-deps:check` — the four fastest CI gates. Most issues can be auto-fixed:

   ```bash
   pnpm lint:fix
   pnpm format:fix
   pnpm registry-deps:fix
   ```

   Note: `registry-deps:fix` updates `registry/registry-examples.ts`, so run `pnpm build:registry` afterwards to regenerate the artifacts.

2. **Build the registry and commit the generated files** (see "6. Build registry" above) if you changed anything under `registry/` or `config/site.ts`.

3. **Make sure the production build passes**

   ```bash
   pnpm build
   ```

   CI runs this too, and it is the slowest gate — catching a build break locally saves the longest round trip.

4. **Use Conventional Commits** (enforced by local git hooks, not by CI)

   Commit messages are validated by [commitlint](https://commitlint.js.org/) (e.g., `feat(marquee): add reverse prop`, `fix(globe): prevent crash on resize`). Use the same format for your PR title.

> [!NOTE]
> Git hooks (installed automatically with `pnpm i` via lefthook) run lint/format fixes on staged files and regenerate registry artifacts on commit, plus `typecheck` on push. They do not cover `registry-deps:check` or the production build.

## Ask for Help

For any help or questions, please open a new GitHub issue.
