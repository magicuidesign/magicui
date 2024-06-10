#!/usr/bin/env node
import { add } from "@/src/commands/add";
import { diff } from "@/src/commands/diff";
import { init } from "@/src/commands/init";
import { Command } from "commander";

import { getPackageInfo } from "./utils/get-package-info";
import { getEnv } from "./utils/get-env";
import {
	ASCII_TEXT,
	ASCII_PRO,
	ColorFullText,
	tryPro,
	hasPro,
} from "./utils/logger";
import { auth } from "./commands/auth";
import { project } from "./commands/template";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
	const packageInfo = await getPackageInfo();
	const MAGICUI_PRO_ENV = getEnv();

	const program = new Command()
		.addHelpText("before", MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT)
		.addHelpText("after", ColorFullText(MAGICUI_PRO_ENV ? hasPro : tryPro))
		.name("magicui")
		.description("Add Magic UI components to your apps.")
		.version(
			packageInfo.version || "1.0.0",
			"-v, --version",
			"display the version number",
		);

	program.addCommand(init).addCommand(add).addCommand(auth).addCommand(project)

	program.parse();
}

main();
