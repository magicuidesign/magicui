import * as z from "zod";

export const registrySchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(z.string()),
    type: z.enum([
      "components:ui",
      "components:magicui",
      "components:component",
      "components:example",
      "components:blocks",
    ]),
    component: z.function().args(z.any()).returns(z.any()).optional(),

    // [theme][extend][animation][gradient]: "gradient 8s linear infinite"
    // [theme][extend][keyframes][gradient][to][backgroundPosition]: "var(--bg-size) 0"
    tailwindConfig: z.record(z.any(), z.any()).optional(),
  }),
);

export type Registry = z.infer<typeof registrySchema>;
