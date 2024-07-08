#!/usr/bin/env node
import { add } from "@/src/commands/add";
import { init } from "@/src/commands/init";
import { posthog } from "@/src/utils/posthog";
import { Command } from "commander";

import { getEnv } from "./utils/get-env";
import { getPackageInfo } from "./utils/get-package-info";
import {
  ASCII_PRO,
  ASCII_TEXT,
  ColorFullText,
  hasPro,
  tryPro,
} from "./utils/logger";

process.on("SIGINT", async () => {
  await posthog.shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await posthog.shutdown();
  process.exit(0);
});

async function main() {
  const packageInfo = await getPackageInfo();
  const MAGICUI_PRO_ENV = getEnv();

  const program = new Command()
    .addHelpText("before", MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT)
    .addHelpText("after", ColorFullText(MAGICUI_PRO_ENV ? hasPro : tryPro))
    .name("magicui-cli")
    .description("Add Magic UI components to your apps.")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number",
    );

  program.addCommand(init).addCommand(add);

  // .addCommand(auth).addCommand(project);

  program.parse();
}

main();
