#!/usr/bin/env node
import { add } from "@/src/commands/add"
import { diff } from "@/src/commands/diff"
import { init } from "@/src/commands/init"
import { Command } from "commander"

import { getPackageInfo } from "./utils/get-package-info"
import { ASCII_TEXT, ColorFullText, tryPro } from "./utils/logger"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {

  const packageInfo = await getPackageInfo()

  const program = new Command().addHelpText("before", ASCII_TEXT).addHelpText("after", ColorFullText(tryPro))
    .name("magicui")
    .description("Add Magic UI components to your apps.")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init).addCommand(add).addCommand(diff)

  program.parse()
}

main()
