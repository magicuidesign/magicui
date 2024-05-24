import fs from "fs";
import { ui as availableComponents } from "@/registry/index";
import { ComponentTypeCli } from "./utils";
import path from "path";

const payload: ComponentTypeCli[] = Object.values(availableComponents)
  .map((component) => {
    const files: ComponentTypeCli["files"] = component.files.map((file) => {
      const content = fs
        .readFileSync(path.join(process.cwd(), file), "utf-8")
        .replace(/\r\n/g, "\n");
      // replacing since my git config crlf is not working...
      return {
        name: `${component.name}.tsx`,
        dir: "components/magicui",
        content,
      };
    });
    return {
      files,
      name: component.name,
      dependencies: component.dependencies,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(
  path.join(process.cwd(), "app/api/components/components.json"),
  JSON.stringify(payload, null, 2),
);

console.log(`Total=${payload.length}. Check api/components/components.json`);
