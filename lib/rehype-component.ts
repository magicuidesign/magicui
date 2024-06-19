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
        handleComponentSource(node);
      }

      if (node.name === "ComponentPreview" || node.name === "BlockPreview") {
        handleComponentPreview(node);
      }
    });
  };
}

function handleComponentSource(node: UnistNode) {
  const name = getNodeAttributeByName(node, "name")?.value as string;
  const multi = getNodeAttributeByName(node, "multi")?.value as string;

  if (!name) {
    return null;
  }

  try {
    const component = registry[name];

    if (multi) {
      const tsxSrc = component.files[0];
      const svelteSrc = component.files[1];
      const tsxSource = readFileContent(tsxSrc);
      const svelteSource = readFileContent(svelteSrc);

      addCodeAsChildren(node, tsxSrc, tsxSource, "tsx");
      addCodeAsChildren(node, svelteSrc, svelteSource, "svelte");
    } else {
      const src = component.files[0];
      const source = readFileContent(src);
      addCodeAsChildren(node, src, source, "tsx"); // Assuming tsx as default language
    }
  } catch (error) {
    console.error(error);
  }
}

function handleComponentPreview(node: UnistNode) {
  const name = getNodeAttributeByName(node, "name")?.value as string;

  if (!name) {
    return null;
  }

  try {
    const component = registry[name];
    const src = component.files[0];
    const source = readFileContent(src);

    addCodeAsChildren(node, src, source, "tsx");
  } catch (error) {
    console.error(error);
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

function readFileContent(src: string): string {
  const filePath = path.join(process.cwd(), src);
  let source = fs.readFileSync(filePath, "utf8");
  source = replaceImports(source);
  return source;
}

function replaceImports(source: string): string {
  // Replace imports.
  // TODO: Use @swc/core and a visitor to replace this.
  // For now a simple regex should do.
  source = source.replaceAll(`@/registry/`, "@/");
  // source = source.replaceAll("export default", "export");
  return source;
}

function addCodeAsChildren(
  node: UnistNode,
  src: string,
  source: string,
  language: string,
) {
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
            className: [`language-${language}`],
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
