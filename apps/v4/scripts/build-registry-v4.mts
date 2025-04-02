import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { rimraf } from "rimraf";
import { registryItemSchema, type Registry } from "shadcn/registry";
import { z } from "zod";

import { lib } from "../../../registry/registry-lib";
import { ui } from "../../../registry/registry-ui-v4";
import { examples } from "../../../registry/registry-examples-v4";

const DEPRECATED_ITEMS = ["toast"];

const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        type: "registry:style",
        dependencies: [
          "tw-animate-css",
          "class-variance-authority",
          "lucide-react",
        ],
        registryDependencies: ["utils"],
        cssVars: {},
        files: [],
      },
      ...ui,
      ...lib,
      ...examples,
    ].filter((item) => {
      return !DEPRECATED_ITEMS.includes(item.name);
    })
  ),
} satisfies Registry;

async function buildRegistryIndex() {
  let index = `/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {`;
  for (const item of registry.items) {
    const resolveFiles = item.files?.map((file) => `${file.path}`);
    if (!resolveFiles) {
      continue;
    }

    const componentPath = item.files?.[0]?.path
      ? `@/apps/v4/${item.files[0].path}`
      : "";

    index += `
  "${item.name}": {
    name: "${item.name}",
    description: "${item.description ?? ""}",
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files?.map((file) => {
      const filePath = `apps/v4/${typeof file === "string" ? file : file.path}`;
      const resolvedFilePath = path.resolve(filePath);
      return typeof file === "string"
        ? `"${resolvedFilePath}"`
        : `{
      path: "${filePath}",
      type: "${file.type}",
      target: "${file.target ?? ""}"
    }`;
    })}],
    component: ${
      componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    })`
        : "null"
    },
    meta: ${JSON.stringify(item.meta)},
  },`;
  }

  index += `
  }`;

  const outputPath = path.join(process.cwd(), "__registry__/index.tsx");
  rimraf.sync(outputPath);
  await fs.writeFile(outputPath, index);
}

async function buildRegistryJsonFile() {
  const fixedRegistry = {
    ...registry,
    items: registry.items.map((item) => {
      console.log(`\n📂 Component: ${item.name}`);
      const files = item.files?.map((file) => {
        const fixedFile = {
          ...file,
          path: `${file.path}`,
        };
        const absolutePath = path.resolve(process.cwd(), fixedFile.path);
        console.log(`  └─ ${absolutePath}`);
        return fixedFile;
      });

      return {
        ...item,
        files,
      };
    }),
  };

  const outputPath = path.join(process.cwd(), `registry.json`);
  rimraf.sync(outputPath);
  await fs.writeFile(outputPath, JSON.stringify(fixedRegistry, null, 2));
}

async function buildRegistry() {
  return new Promise((resolve, reject) => {
    const command = `pnpm dlx shadcn build registry.json --output ../../public/r/v4`;
    const process = exec(command);

    process.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

try {
  console.log("🗂️ Building registry/__index__.tsx...");
  await buildRegistryIndex();

  console.log("💅 Building registry.json...");
  await buildRegistryJsonFile();

  console.log("🏗️ Building registry...");
  await buildRegistry();
} catch (error) {
  console.error(error);
  process.exit(1);
}
