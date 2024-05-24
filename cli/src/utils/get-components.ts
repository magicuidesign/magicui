// import fetch from "node-fetch"; // for older node versions
import fetch from "node-fetch";
import * as z from "zod";
export const componentSchemaCli = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      name: z.string(),
      dir: z.string(),
      content: z.string(),
    }),
  ),
});

export type TComponent = z.infer<typeof componentSchemaCli>;

export const componentSchemaParser = z.array(componentSchemaCli);

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://magicui.design"
    : "http://localhost:3000";

export async function getAvailableComponents() {
  try {
    const res = await fetch(`${baseUrl}/api/components`);
    const components = await res.json();
    return componentSchemaParser.parse(components);
  } catch (e) {
    throw new Error("Failed to fetch magicui components");
  }
}
