import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "@/types/unist";

import Registry from "../registry.json";

export const styles = [
  {
    name: "default",
    label: "Default",
  },
] as const;

export type Style = (typeof styles)[number];

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (!name && !srcPath) {
          return null;
        }

        try {
          let src: string;

          if (srcPath) {
            src = srcPath as string;
          } else {
            const component = Registry.items.find((item) => item.name === name);

            if (!component) {
              return null;
            }

            src = fileName
              ? component.files.find((file) => {
                  return (
                    file.path.endsWith(`${fileName}.tsx`) ||
                    file.path.endsWith(`${fileName}.ts`)
                  );
                })?.path || component.files[0].path
              : component.files[0].path;
          }

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          // source = source.replaceAll(
          //   `@/registry/${style.name}/`,
          //   "@/components/",
          // );
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              // attributes: [
              //   {
              //     name: "styleName",
              //     type: "mdxJsxAttribute",
              //     value: style.name,
              //   },
              // ],
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_source_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentPreview" || node.name === "BlockPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const component = Registry.items.find((item) => item.name === name);

          if (!component) {
            return null;
          }

          const src = component.files[0].path;

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          // source = source.replaceAll(
          //   `@/registry/${style.name}/`,
          //   "@/components/",
          // );
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_usage_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

function getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, "src")?.value as string;

  if (!src) {
    return null;
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf8");

  return source;
}
