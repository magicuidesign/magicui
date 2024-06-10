import { Command } from "commander";
import { clearAll, getEnv, login } from "../utils/get-env";
import { getAllProjectTemplates, getProjectLink, getDataAndWrite } from "../utils/install-project";
import {
    ASCII_TEXT,
    ASCII_PRO,
    ColorFullText,
    tryPro,
    hasPro,
} from "../utils/logger";
import { z } from "zod";
import prompts from "prompts";
import { logger } from "../utils/logger";

const optionSchema = z.object({
    template: z.string().optional(),
});

const MAGICUI_PRO_ENV = getEnv();
const authMessage = `

Go to Magic UI Pro website for auth secrets.
  → https://pro.magicui.design

`;

export const project = new Command()
    .name("project")
    .description("Download premium template & start new project.")
    .option("-t, --template <env>", "the secret env to authenticate.")
    .action(async (opts) => {
        console.log(
            MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT,
            ColorFullText(
                !MAGICUI_PRO_ENV
                    ? authMessage
                    : hasPro,
            ),
        );

        const options = optionSchema.parse(opts);
        const allTemplates = [{
            repo: "portfolio-template",
            owner: "dillionverma",
            preview: "",
            description: "hi",

        }]

        const getSelectedTemplates = async () => {
            if (!options.template) {

                const { templates } = await prompts({
                    type: "select",
                    name: "templates",
                    message: "Which project templates would you like to download?",
                    hint: "Enter/Space to select",
                    instructions: false,
                    choices: allTemplates.map(
                        (entry) => ({
                            title: entry.repo,
                            value: entry.repo,
                            description: `${entry.description}\n preview → ${entry.preview}`
                        }),
                    ),
                }) as { templates?: string }

                return templates
            }
            return options.template
        }

        const name = await getSelectedTemplates()

        if (!name) {
            logger.warn("Invalid template selection")
            return;
        }

        const data = allTemplates.find(e => e.repo === name)

        if (!data) {
            logger.warn("Selected Template is not exist")
            return;
        }

        const file = await getProjectLink(data.repo, data.owner)

        if (!file.success) {
            logger.error("Failed to fetch project downloading link")
            return;
        }
        const fileName = `${data.repo}.zip`
        const success = await getDataAndWrite(file.downloadUrl, fileName)

        if (!success) {
            logger.error("Failed to fetch/write project zip file")
            return;
        }
        logger.success(`Downloaded ${fileName} on current directory`)
    });
