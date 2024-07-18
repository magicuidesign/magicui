import { getConfig } from "@/src/utils/get-config";
import { getEnv } from "@/src/utils/get-env";
import { handleError } from "@/src/utils/handle-error";
import {
    ASCII_PRO,
    ASCII_TEXT,
    ColorFullText,
    hasPro,
    logger,
    tryPro,
} from "@/src/utils/logger";
import { getSvgByName, getSvgCategory, getSvgsList, type iSVG } from "@/src/utils/svg/get-svgs-list";
import { getSvgFolderPath } from "@/src/utils/svg/path";
import { renderSvg } from "@/src/utils/svg/svg-file-template";
import chalk from "chalk";
import { Command } from "commander";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";

const addOptionsSchema = z.object({
    svgs: z.array(z.string()).optional(),
    all: z.boolean(),
    cwd: z.string(),
    category: z.string().optional(),
    path: z.string().optional(),
});

const MAGICUI_PRO_ENV = getEnv();

export const svgl = new Command()
    .name("icons")
    .description("add svgl icons to your project\n→ https://svgl.app/")
    .argument("[svgs...]", "the svg icons to add")
    .option("-t, --category [cat]", "the category to filter.")
    .option("-a, --all", "add all icons from a category", false)
    .option("-p, --path <path>", "the path to add the icons to.")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .action(async (svgs, opts) => {
        console.log(
            MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT,
            ColorFullText(!MAGICUI_PRO_ENV ? tryPro : hasPro),
        );
        try {
            const options = addOptionsSchema.parse({ svgs, ...opts });

            const cwd = path.resolve(options.cwd);

            if (!existsSync(cwd)) {
                logger.error(`The path ${cwd} does not exist. Please try again.`);
                process.exit(1);
            }

            const config = await getConfig(cwd);

            if (!config) {
                logger.warn(
                    `Configuration is missing. Please run ${chalk.green("init")
                    } to create a components.json file.`,
                );
                process.exit(1);
            }

            let selectedCategories = options.category ? [options.category] : []
            let selectedSvgsVar = options.svgs ? await getSvgByName(options.svgs) : []

            if (!options.svgs?.length) {

                if (!options.category) {
                    const AllCategories = await getSvgCategory()

                    const { selectCat } = await prompts({
                        type: "multiselect",
                        name: "selectCat",
                        message: "Which categories of icons would you like to fetch?",
                        hint: "Space to select. A to toggle all. Enter to submit.",
                        instructions: false,
                        choices: AllCategories.map((e) => ({
                            title: `${e.category} (${e.total}x)`,
                            value: e.category,
                            selected: false
                        }))
                    });

                    selectedCategories = selectCat as string[]
                }


                if (!selectedCategories?.length) {
                    logger.warn("No categories selected. Exiting.");
                    process.exit(0);
                }

                const svgIndex = await getSvgsList(selectedCategories);

                const { selectedSvgs } = await prompts({
                    type: "multiselect",
                    name: "selectedSvgs",
                    message: "Which icons would you like to download?",
                    hint: "Space to select. A to toggle all. Enter to submit.",
                    instructions: false,
                    choices: svgIndex.map((e) => ({
                        title: `${e.title}`,
                        value: e,
                        selected: options.all
                    }))
                });

                if (!selectedSvgs?.length) {
                    logger.warn("No icons selected. Exiting.");
                    process.exit(0);
                }

                selectedSvgsVar = selectedSvgs as iSVG[]

            }

            const targetDir = await getSvgFolderPath(
                config,
                options.path ? path.resolve(cwd, options.path) : undefined,
            );

            if (!targetDir) {
                logger.warn("Target directory path not detected. Exiting.");
                process.exit(0);
            }

            if (!existsSync(targetDir)) {
                await fs.mkdir(targetDir, { recursive: true });
            }

            logger.info(`${options.svgs?.length ? "Found" : "Selected"} ${selectedSvgsVar.length}x svgl icons.`);
            const spinner = ora("Downloading SVGs...").start();


            for (const svg of selectedSvgsVar) {
                const { name, content } = await renderSvg(svg);

                const fileName = `${name}.${config.tsx ? "tsx" : "jsx"}`

                const filePath = path.resolve(targetDir, fileName);

                await fs.writeFile(filePath, content);
            }

            // posthog.capture({
            //     event: "cli_add",
            //     distinctId: generateDistinctId(),
            //     properties: {
            //         components: selectedComponents,
            //         style: config.style,
            //         baseColor: config.tailwind.baseColor,
            //     },
            // });

            spinner.succeed("Done.");
        } catch (error) {
            handleError(error);
        }
    });