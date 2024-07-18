// @ts-nocheck
import fs from "fs";
import path, { basename } from "path";
import { rimraf } from "rimraf";

import { downloadRegistry } from "../registry/index.tsx";
import { registrySchema } from "../registry/schema.ts";

const REGISTRY_PATH = path.join(process.cwd(), "public/registry");

const result = registrySchema.safeParse(downloadRegistry);

console.log("Building Registry...");

if (!result.success) {
  console.error(result.error);
  process.exit(1);
}
// ----------------------------------------------------------------------------
// Build registry/index.json.
// ----------------------------------------------------------------------------
const data = Object.values(result.data).sort((a, b) =>
  a.name.localeCompare(b.name),
);
const names = data; //.filter((item) => item.type === "components:ui")
const registryJson = JSON.stringify(names, null, 2);

// Create directory if it doesn't exist.
if (!fs.existsSync(REGISTRY_PATH)) {
  fs.mkdirSync(REGISTRY_PATH, { recursive: true });
}

rimraf.sync(path.join(REGISTRY_PATH, "index.json"));
fs.writeFileSync(path.join(REGISTRY_PATH, "index.json"), registryJson, "utf8");

// ----------------------------------------------------------------------------
// Build registry/components/["magicui" | "ui" | "example"]/[name].json.
// ----------------------------------------------------------------------------

for (const item of data) {
  const [parent, subfolder] = item.type.split(":");
  if (!parent || !subfolder) {
    console.warn(`Invalid type: ${item.type} for ${item.name}`);
    continue;
  }
  const targetPath = path.join(REGISTRY_PATH, parent, subfolder);
  // Create directory if it doesn't exist.
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const files = item.files?.map((file) => {
    const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");

    return {
      name: basename(file),
      content,
    };
  });

  const payload = {
    ...item,
    files,
  };

  fs.writeFileSync(
    path.join(targetPath, `${item.name}.json`),
    JSON.stringify(payload, null, 2),
    "utf8",
  );
}

console.log("Build Registry Done ✅");
