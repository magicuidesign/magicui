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

Create the main component in `registry/components/magicui/example-component.tsx`

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

Provide a basic example to showcase your component in `registry/components/example/example-component-demo.tsx`

```typescript
import ExampleComponent from '@/registry/components/magicui/example-component'

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
npx magicui-cli add example-component
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="example-component" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

<ComponentSource name="example-component" />

</Steps>

## Props

| Prop  | Type   | Description                | Default |
| ----- | ------ | -------------------------- | ------- |
| color | String | The color of the component | "blue"  |
````

### 5. Update Registry

Export your component and example in the registry in `registry/index.tsx`

```typescript
const ui: Registry = {
  "example-component": {
    name: "example-component",
    type: "components:ui",
    files: ["registry/components/magicui/example-component.tsx"],
  },
};

const example: Registry = {
  "example-component-demo": {
    name: "example-component",
    type: "components:example",
    files: ["registry/components/example/example-component-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/example-component-demo"),
    ),
  },
};
```

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
