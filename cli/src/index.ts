#!/usr/bin/env node

//
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { execa } from "execa";
import ora from "ora";
import { getPackageManager } from "./utils/getPackageManager";
import { logger } from "./utils/logger";
import { Command } from "commander";
import {
  getPromptsForComponents,
  getPromptsforInit,
} from "./utils/getPromptsFromUser";

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
        await getPromptsForComponents(inputComponents);

      // checking if the src directory exists
      const destinationDir = existsSync(path.join(process.cwd(), "src"))
        ? path.join(process.cwd(), "src", dir)
        : path.join(process.cwd(), dir);

      if (!existsSync(destinationDir)) {
        const spinner = ora(`Creating ${destinationDir}...`).start();
        await fs.mkdir(destinationDir, { recursive: true });
        spinner.succeed("Created directory");
      }

      const packageManager = getPackageManager();

      logger.success("Installing components");

      for (const component of components) {
        const spinner = ora(`${component.name}...`).start();

        for (const file of component.files) {
          const filePath = path.resolve(destinationDir, file.name);
          await fs.writeFile(filePath, file.content);
        }

        if (component.dependencies?.length) {
          for (const dep of component.dependencies) {
            await execa(packageManager, [
              packageManager === "npm" ? "install" : "add",
              dep,
            ]);
          }
        }
        spinner.succeed(component.name);
        logger.success(`${component.name} installed`);
      }

      if (componentsNotFound && componentsNotFound.length) {
        logger.info(`${componentsNotFound.join(" ")} were not found. Exiting`);
        process.exit(0);
      }
    });

  // init command

  const libUtilsFile = `import clsx, { ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
   
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }`;

  program
    .command("init")
    .description(
      "Installs requried dependencies and built required directories",
    )
    .action(async () => {
      const { root, isSrc } = await getPromptsforInit();
      let workDir: string;
      workDir = root;

      if (root === ".") {
        workDir = process.cwd();
      }

      if (!existsSync(path.join(workDir, "package.json"))) {
        logger.info("No package json detected. Exiting");
        process.exit(0);
      }
      const packageManager = getPackageManager();

      const defaultDeps = ["clsx", "tailwind-merge", "framer-motion"];
      const spinner = ora("Initializing components").start();

      for (const dep of defaultDeps) {
        await execa(packageManager, [
          packageManager === "npm" ? "install" : "add",
          dep,
        ]);
      }

      const destinationDir = isSrc
        ? path.join(workDir, "src", "lib")
        : path.join(workDir, "lib");

      if (!existsSync(destinationDir)) {
        await fs.mkdir(destinationDir, { recursive: true });
      }
      await fs.writeFile(path.join(destinationDir, "utils.ts"), libUtilsFile);

      spinner.succeed(
        "project initliazed. Try adding component using npx magicui add",
      );
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
