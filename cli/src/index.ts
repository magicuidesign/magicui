#!/usr/bin/env node
import { getPromptsFromUser } from "./utils/getPromptsFromUser";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { execa } from "execa";
import ora from "ora";
import { getPackageManager } from "./utils/getPackageManager";
import { logger } from "./utils/logger";
import { Command } from "commander";

// event listeners to kill process

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("magicui")
    .description("Adds magicui components to your project")
    .version("0.0.1", "-v,--version", "outputs the version number");

  program
    .command("add [components...]")
    .description("Add components to the folder")
    .action(async (inputComponents: string[]) => {
      const { components, dir, componentsNotFound } =
        await getPromptsFromUser(inputComponents);

      const destinationDir = path.join(process.cwd(), dir);
      console.log(destinationDir);
      if (!existsSync(destinationDir)) {
        const spinner = ora(`Creating ${dir}...`).start();
        await fs.mkdir(destinationDir, { recursive: true });
        spinner.succeed("Created directory");
      }

      const packageManager = getPackageManager();

      logger.success("Installing components");

      for (const component of components) {
        const spinner = ora(`${component.name}...`).start();

        for (const file of component.files) {
          const filePath = path.resolve(dir, file.name);
          await fs.writeFile(filePath, file.content);
        }

        if (component.dependencies?.length) {
          const dependencies = component.dependencies.join(" ");
          await execa(packageManager, [
            packageManager === "npm" ? "install" : "add",
            dependencies,
          ]);
        }
        spinner.succeed(component.name);
      }

      if (componentsNotFound && componentsNotFound.length) {
        logger.info(`${componentsNotFound.join(" ")} were not found. Exiting`);
        process.exit(0);
      }
    });

  // handle invalid commands
  program.on("command:*", (operands) => {
    console.error(`error: unknown command '${operands[0]}'`);
    program.outputHelp();
    process.exit(0);
  });

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
  }

  program.parse();
}

main();
