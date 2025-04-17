# Contributing to MagicUI

Thank you for your interest in contributing to MagicUI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to MagicUI.

Read the [example PR](https://github.com/magicuidesign/magicui/pull/12) to learn which files you need to add. **You only need to change 5 files to add a new component or effect** and it only takes around 10 minutes of work!

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
npx shadcn@latest add "https://magicui.design/r/example-component"
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
        target: "components/magicui/example-component.tsx",
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

### 7. Format and fix linting before committing

```bash
pnpm format:write
```

```bash
pnpm lint:fix
```

Make sure to run these two commands before committing your changes.

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

## How to use CLI

1. Run CLI script from project `root` folder

```bash
pnpm run install:cli
```

```bash
pnpm run dev:cli
```

```bash
pnpm run build:cli
```

```bash
pnpm run release:cli
```

The CLI in development uses index.json from default `3000` port on localhost. Otherwise [https://magicui.design](https://magicui.design/registry/index.json)

## Ask for Help

For any help or questions, please open a new GitHub issue.
