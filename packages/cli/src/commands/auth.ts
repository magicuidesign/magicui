import { Command } from "commander";
import prompts from "prompts";
import { z } from "zod";

import { clearAll, getEnv, login } from "../utils/get-env";
import {
  ASCII_PRO,
  ASCII_TEXT,
  authMessage,
  ColorFullText,
  hasPro,
  tryPro,
} from "../utils/logger";

const optionSchema = z.object({
  clear: z.boolean(),
  login: z.string().optional(),
});

const MAGICUI_PRO_ENV = getEnv();

export const auth = new Command()
  .addHelpText("before", MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT)
  .name("auth")
  .description("For the Magic UI Pro Users. Authenticate your account.")
  .option("-l, --login <env>", "the secret env to authenticate.")
  .option("-d, --clear", "clear the auth secrets.", false)
  .action(async (opts) => {
    const options = optionSchema.parse(opts);

    switch (true) {
      case options.clear: {
        const isClear = await prompts({
          type: "confirm",
          name: "value",
          message:
            "Are you sure you want to log out and clear the auth secrets?",
          choices: [
            { title: "Yes", value: true },
            { title: "No", value: false },
          ],
        });

        if (isClear.value) {
          clearAll();
          console.log("Logged out ✅");
        }

        break;
      }
      case options.login !== undefined: {
        const isLogined = await login(options.login);
        if (isLogined) {
          console.log(ColorFullText(hasPro));
        }
        break;
      }
      default: {
        console.log(
          MAGICUI_PRO_ENV ? ASCII_PRO : ASCII_TEXT,
          ColorFullText(!MAGICUI_PRO_ENV ? authMessage : hasPro),
        );
      }
    }
  });
