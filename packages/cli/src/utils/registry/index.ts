import path from "path";
import { Config } from "@/src/utils/get-config";
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
  stylesSchema,
} from "@/src/utils/registry/schema";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { z } from "zod";

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? "https://magicui.design";
const proBaseUrl = process.env.PRO_REGISTRY_URL ?? "https://pro.magicui.design";
const shadcnBaseUrl = "https://ui.shadcn.com";

type theTree = z.infer<typeof registryIndexSchema>;

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndexMagicUI(env?: boolean) {
  try {
    const [result] = await fetchRegistry(["index.json"], baseUrl);
    const [resultPro] = env
      ? await fetchRegistry(["index.json"], proBaseUrl)
      : [[]];

    // @ts-ignore
    return registryIndexSchema.parse([...result, ...resultPro]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch components from Magic UI registry.");
  }
}

export async function getRegistryIndexShadcn() {
  try {
    const [result] = await fetchRegistry(["index.json"], shadcnBaseUrl);

    return registryIndexSchema.parse(result);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch components from Shadcn UI registry.");
  }
}

export async function getRegistryStyles() {
  try {
    const [result] = await fetchRegistry(["styles/index.json"], shadcnBaseUrl);

    return stylesSchema.parse(result);
  } catch (error) {
    throw new Error("Failed to fetch styles from registry.");
  }
}

export async function getRegistryBaseColors() {
  return [
    {
      name: "slate",
      label: "Slate",
    },
    {
      name: "gray",
      label: "Gray",
    },
    {
      name: "zinc",
      label: "Zinc",
    },
    {
      name: "neutral",
      label: "Neutral",
    },
    {
      name: "stone",
      label: "Stone",
    },
  ];
}

export async function getRegistryBaseColor(baseColor: string) {
  try {
    const [result] = await fetchRegistry(
      [`colors/${baseColor}.json`],
      shadcnBaseUrl,
    );

    return registryBaseColorSchema.parse(result);
  } catch (error) {
    throw new Error("Failed to fetch base color from registry.");
  }
}

export async function resolveTreeWithShadcn(
  shadcnIndex: theTree,
  index: theTree,
  names: string[],
  calledByShadcn = false,
): Promise<{ shadcnTree: theTree; magicuiTree: theTree }> {
  const shadcnTree: theTree = [];
  const magicuiTree: theTree = [];

  for (const name of names) {
    if (!calledByShadcn) {
      const entry = index.find((e) => e.name === name);

      if (!entry) {
        const newName = name.split(":")[1];
        const shadcnEntry = shadcnIndex.find((e) => e.name === newName);

        if (!shadcnEntry) {
          continue;
        }
        shadcnTree.push(shadcnEntry);

        if (shadcnEntry.registryDependencies) {
          const { shadcnTree: shadcnTreeDependencies } =
            await resolveTreeWithShadcn(
              shadcnIndex,
              index,
              shadcnEntry.registryDependencies,
              true,
            );
          shadcnTree.push(...shadcnTreeDependencies);
        }
      }

      entry && magicuiTree.push(entry);

      if (entry && entry.registryDependencies) {
        const {
          magicuiTree: magicuiTreeDependencies,
          shadcnTree: shadcnTreeDependencies,
        } = await resolveTreeWithShadcn(
          shadcnIndex,
          index,
          entry.registryDependencies,
          false,
        );
        shadcnTree.push(...shadcnTreeDependencies);
        magicuiTree.push(...magicuiTreeDependencies);
      }
    } else {
      const entry = shadcnIndex.find((e) => e.name === name);

      if (!entry) {
        continue;
      }

      shadcnTree.push(entry);

      if (entry.registryDependencies) {
        const { shadcnTree: shadcnTreeDependencies } =
          await resolveTreeWithShadcn(
            shadcnIndex,
            index,
            entry.registryDependencies,
            true,
          );
        shadcnTree.push(...shadcnTreeDependencies);
      }
    }
  }

  return {
    shadcnTree: shadcnTree.filter(
      (component, index, self) =>
        self.findIndex((c) => c.name === component.name) === index,
    ),
    magicuiTree: magicuiTree.filter(
      (component, index, self) =>
        self.findIndex((c) => c.name === component.name) === index,
    ),
  };
}

export async function resolveTree(index: theTree, names: string[]) {
  const tree: theTree = [];

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  return tree.filter(
    (component, index, self) =>
      self.findIndex((c) => c.name === component.name) === index,
  );
}

export async function fetchTree(tree: theTree, env?: string) {
  try {
    const treeNormal = tree.filter((item) => !item.type.includes("blocks"));
    const treePro = tree.filter((item) => item.type.includes("blocks"));
    // {baseUrl}/registry/components/magicui/[name].json.
    const paths = treeNormal.map((item) => {
      const [parent, subfolder] = item.type.split(":");
      return `${parent}/${subfolder}/${item.name}.json`;
    });
    const result = await fetchRegistry(paths, baseUrl);

    const pathsPro = treePro.map((item) => {
      const [parent, subfolder] = item.type.split(":");
      return `${parent}/${subfolder}/${item.name}.json`;
    });
    const resultPro = await fetchRegistry(pathsPro, proBaseUrl, env);

    return registryWithContentSchema.parse([...result, ...resultPro]);
  } catch (error) {
    throw new Error(`Failed to fetch tree from Magic UI registry.`);
  }
}

export async function fetchTreeFromShadcn(style: string, tree: theTree) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`);
    const result = await fetchRegistry(paths, shadcnBaseUrl);

    return registryWithContentSchema.parse(result);
  } catch (error) {
    throw new Error(`Failed to fetch tree from Shadcn UI registry.`);
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemWithContentSchema>, "type">,
  override?: string,
) {
  if (override) {
    return override;
  }

  const [parent, type] = item.type.split(":");
  if (!(parent in config.resolvedPaths)) {
    return null;
  }

  return path.join(
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths],
    type,
  );
}

async function fetchRegistry(
  paths: string[],
  fetchBaseUrl = baseUrl,
  env?: string,
) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${fetchBaseUrl}/registry/${path}`, {
          agent,
          headers: env
            ? {
                // the Pro registry route will valid this env cookie
                cookie: `x-magicui-env=${env}`,
              }
            : {},
        });
        return await response.json();
      }),
    );
    return results;
  } catch (error) {
    throw new Error(`Failed to fetch registry from ${fetchBaseUrl}.`);
  }
}
