import { z } from "zod"

// TODO: Extract this to a shared package.
export const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  type: z.enum(["components:ui", "components:component", "components:example", "components:magicui", "components:blocks",]),

  /**
   * [theme][extend][animation][gradient]: "gradient 8s linear infinite"
   * [theme][extend][keyframes][gradient][to][backgroundPosition]: "var(--bg-size) 0"
   */
  tailwindConfig: z.record(
    // z.string().regex(/^(?:\[\w+\])+$/, "Invalid tailwind config path"),
    z.any(),
    z.any(),
  ).optional(),
})

export const registryIndexSchema = z.array(registryItemSchema)

export const registryItemWithContentSchema = registryItemSchema.extend({
  files: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
    })
  ),
})

export const registryWithContentSchema = z.array(registryItemWithContentSchema)

export const stylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
  })
)

export const registryBaseColorSchema = z.object({
  inlineColors: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  cssVars: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  inlineColorsTemplate: z.string(),
  cssVarsTemplate: z.string(),
})
