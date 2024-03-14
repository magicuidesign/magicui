import { UnistNode, UnistTree } from "@/types/unist";
import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import { registry } from "../registry";
// import { styles } from "../registry/styles"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: src } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          // for (const style of styles) {
          const component = registry[name];
          const src = component.files[0];

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`@/registry/`, "@/");
          // source = source.replaceAll("export default", "export");

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
          // }
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
          // for (const style of styles) {
          const component = registry[name];
          const src = component.files[0];

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // console.log("name ", name);
          // console.log("source ", source);

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`@/registry/`, "@/");
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
          // }
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

// function getComponentSourceFileContent(node: UnistNode) {
//   const src = getNodeAttributeByName(node, "src")?.value as string;

//   if (!src) {
//     return null;
//   }

//   // Read the source file.
//   const filePath = path.join(process.cwd(), src);
//   const source = fs.readFileSync(filePath, "utf8");

//   return source;
// }
