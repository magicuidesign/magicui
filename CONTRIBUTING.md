# Contributing to MagicUI

Thank you for your interest in contributing to MagicUI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to MagicUI.

Read the [example PR](https://github.com/magicuidesign/magicui/pull/12) to learn which files you need to add. **You only need to change 5 files to add a new component or effect** and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/magicuidesign/magicui/compare).

- [Getting Started](#getting-started)
  - [Fork and Clone the Repository](#fork-and-clone-the-repository)
  - [Adding a New Component](#adding-a-new-component)
    - [1. Add Sidebar Button Meta for Your Component](#1-add-sidebar-button-meta-for-your-component)
    - [2. Create Your Component](#2-create-your-component)
    - [3. Create a Basic Example Showcasing Your Component](#3-create-a-basic-example-showcasing-your-component)
    - [4. Create MDX Page for Your Component](#4-create-mdx-page-for-your-component)
    - [5. Add Registry Export](#5-add-registry-export)

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

### 1. Add Sidebar Button Meta for Your Component

**File:** `config/docs.ts`

Add metadata for your component in the sidebar navigation.

```typescript
// Add sidebar button meta for your component
{
    title: "Example Component",
    href: `/docs/components/example-component`,
    items: [],
    label: "New",
}
```

### 2. Create Your Component

**File:** `registry/components/magicui/example-component.tsx`

Create the main component file.

```typescript
// Create your component here
import React from 'react'

const ExampleComponent = () => {
  return (
    <div>
      This is your component.
    </div>
  )
}

export default ExampleComponent;
```

### 3. Create a Basic Example Showcasing Your Component

**File:** `registry/components/example/example-component-demo.tsx`

Provide a basic example to showcase your component.

```typescript
// Create a very basic example showcasing your component
import ExampleComponent from '@/registry/components/magicui/example-component'

const ExampleComponentDemo = () => (
  <div className="relative justify-center">
    <ExampleComponent />
  </div>
)

export default ExampleComponentDemo;
```

### 4. Create MDX Page for Your Component

**File:** `content/docs/components/example-component.mdx`

Create an MDX file for documenting your component.

````md
---
title: Example Component
date: 2024-06-01
description: Example component for demonstrating MagicUI integration
author: Bankkroll
published: true
---

<ComponentPreview name="example-component-demo" />

<Steps>

### Installation

Copy and paste the following code into your project.

```text
components/magicui/example-component.tsx
```

<ComponentSource name="example-component" />

</Steps>

## Props

| Prop  | Type   | Description                | Default |
| ----- | ------ | -------------------------- | ------- |
| color | String | The color of the component | "blue"  |

## Credits

- Credit to [Bankk](https://www.x.com/bankkroll_eth)
````

### 5. Add Registry Export

**File:** `registry/index.tsx`

Export your component and example in the registry.

```typescript
const ui: Registry = {
  // other components
  "example-component": {
    name: "example-component",
    type: "components:ui",
    files: ["registry/components/magicui/example-component.tsx"],
  },
};

const example: Registry = {
  // other examples
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

2. Run CLI script from `/packages/cli` folder

```bash
pnpm run install
```

```bash
pnpm run dev
```

```bash
pnpm run build
```

```bash
pnpm run release
```

Lots more useful scripts are available in package.json

The CLI in development uses index.json from default `3000` port on localhost. Otherwise [https://magicui.design](https://magicui.design/registry/index.json)

## Ask for Help

For any help or questions, please open a new GitHub issue and we will get back to you :)
