import { Command } from "commander";
import prompts from "prompts";
import { z } from "zod";

import { getEnv } from "../utils/get-env";
import {
  getAllProjectTemplates,
  getDataAndWrite,
  getProjectLink,
} from "../utils/install-project";
import {
  ASCII_PRO,
  ASCII_TEXT,
  authMessage,
  ColorFullText,
  hasPro,
  logger,
} from "../utils/logger";

const optionSchema = z.object({
  template: z.string().optional(),
});

const MAGICUI_PRO_ENV = getEnv();

export const project = new Command()
  .name("project")
  .description("Download premium template & start new project.")
  .option("-t, --template <env>", "the secret env to authenticate.")
  .action(async (opts) => {
    console.log(
      MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT,
      ColorFullText(!MAGICUI_PRO_ENV ? authMessage : hasPro),
    );

    const options = optionSchema.parse(opts);
    const allTemplates = await getAllProjectTemplates();

    const getSelectedTemplates = async () => {
      if (!options.template) {
        const { templates } = (await prompts({
          type: "select",
          name: "templates",
          message: "Which project templates would you like to download?",
          hint: "Enter/Space to select",
          instructions: false,
          choices: allTemplates.map((entry) => ({
            title: entry.repo,
            value: entry.repo,
            description: `${entry.description}\n preview → ${entry.preview}`,
          })),
        })) as { templates?: string };

        return templates;
      }
      return options.template;
    };

    const name = await getSelectedTemplates();

    if (!name) {
      logger.warn("Invalid template selection");
      return;
    }

    const data = allTemplates.find((e) => e.repo === name);

    if (!data) {
      logger.warn("Selected Template is not exist");
      return;
    }

    if (!MAGICUI_PRO_ENV) {
      logger.warn("You are not authenticated to download premium templates.");
      return;
    }

    const file = await getProjectLink(data.repo, data.owner, MAGICUI_PRO_ENV);

    if (!file.success) {
      logger.error("Failed to fetch project downloading link");
      return;
    }
    const fileName = `${data.repo}.zip`;
    const success = await getDataAndWrite(file.downloadUrl, fileName);

    if (!success) {
      logger.error("Failed to fetch/write project zip file");
      return;
    }
    logger.success(`Downloaded ${fileName} on current directory`);
  });
