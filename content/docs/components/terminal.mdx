---
title: Terminal
date: 2025-01-16
description: An implementation of the MacOS terminal. Useful for showcasing a command line interface.
author: dillionverma
published: true
---

<ComponentPreview name="terminal-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add "https://magicui.design/r/terminal"
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="terminal" />

</Steps>

</TabsContent>

</Tabs>

## Usage

```tsx
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
```

```tsx
<Terminal>
  <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

  <AnimatedSpan className="text-green-500">✔ Preflight checks.</AnimatedSpan>

  <AnimatedSpan className="text-green-500">
    ✔ Validating Tailwind CSS.
  </AnimatedSpan>

  <TypingAnimation className="text-muted-foreground">
    Success! Project initialization completed.
  </TypingAnimation>
</Terminal>
```

The terminal sequences its children automatically. Each `TypingAnimation` or `AnimatedSpan` starts when the previous finishes. Manual `delay` props are optional and typically unnecessary.

## Props

### Terminal

| Prop          | Type        | Default | Description                                                    |
| ------------- | ----------- | ------- | -------------------------------------------------------------- |
| `children`    | `ReactNode` | `-`     | Terminal content: a list of `TypingAnimation`/`AnimatedSpan`.  |
| `className`   | `string`    | `-`     | Custom CSS class for styling.                                  |
| `sequence`    | `boolean`   | `true`  | Enable auto sequencing so each line starts after the previous. |
| `startOnView` | `boolean`   | `true`  | Start sequencing when the terminal enters the viewport.        |

### AnimatedSpan

| Prop          | Type        | Default | Description                                                                 |
| ------------- | ----------- | ------- | --------------------------------------------------------------------------- |
| `children`    | `ReactNode` | `-`     | Content to be faded in.                                                     |
| `className`   | `string`    | `-`     | Custom CSS class for styling.                                               |
| `delay`       | `number`    | `0`     | Delay in ms before animation starts (used when `sequence` is `false`).      |
| `startOnView` | `boolean`   | `false` | If `true`, waits for viewport visibility before animating when unsequenced. |

### TypingAnimation

| Prop          | Type                | Default  | Description                                                              |
| ------------- | ------------------- | -------- | ------------------------------------------------------------------------ |
| `children`    | `string`            | `-`      | Text to be typed.                                                        |
| `className`   | `string`            | `-`      | Custom CSS class for styling.                                            |
| `duration`    | `number`            | `60`     | Milliseconds per character.                                              |
| `delay`       | `number`            | `0`      | Delay in ms before typing starts (used when `sequence` is `false`).      |
| `as`          | `React.ElementType` | `"span"` | The component type to render.                                            |
| `startOnView` | `boolean`           | `true`   | If `true`, waits for viewport visibility before typing when unsequenced. |

```tsx
// Start immediately (ignore viewport)
<Terminal startOnView={false}>
  <TypingAnimation>Immediate start</TypingAnimation>
</Terminal>

// Opt out of sequencing and use manual delays
<Terminal sequence={false}>
  <TypingAnimation delay={500}>First</TypingAnimation>
  <AnimatedSpan delay={1500}>Second</AnimatedSpan>
</Terminal>
```
