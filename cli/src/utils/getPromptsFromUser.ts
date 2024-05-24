import prompts from "prompts";
import { TComponent, getAvailableComponents } from "./get-components";
import { logger } from "./logger";

type UserPrompt = {
  components: TComponent[];
  dir: string;
  componentsNotFound?: string[];
};

export async function getPromptsFromUser(
  inputComponents: string[],
): Promise<UserPrompt> {
  const availableComponents = await getAvailableComponents();

  if (!availableComponents?.length) {
    logger.error(
      "An error occurred while fetching components. Please try again.",
    );
    process.exit(0);
  }

  // for no specific component, display compelete list of components
  if (!inputComponents.length) {
    const options = await prompts([
      {
        type: "multiselect",
        name: "components",
        message: "Which component(s) would you like to add?",
        hint: "Space to select. A to select all. I to invert selection.",
        instructions: false,
        choices: availableComponents.map((component) => ({
          title: component.name,
          value: component,
        })),
      },
      {
        type: "text",
        name: "dir",
        message: "Where would you like to install the component(s)",
        initial: "./components/magicui",
      },
    ]);
    return options;
  }

  // handling specific components
  // checking valid components name
  const validComponents = new Set(availableComponents.map((c) => c.name));

  const filteredSelectedComponents = inputComponents.filter((c) =>
    validComponents.has(c),
  );

  // exiting if not even component is matched with available components
  if (!filteredSelectedComponents.length) {
    logger.error("Selected components not found. Exiting");
    process.exit(0);
  }

  const options = await prompts([
    {
      type: "text",
      name: "dir",
      message: "Where would you like to install the component(s)",
      initial: "./components/magicui",
    },
  ]);
  return {
    components: availableComponents.filter((c) =>
      filteredSelectedComponents.includes(c.name),
    ),
    dir: options.dir,
    componentsNotFound: inputComponents.filter((c) => !validComponents.has(c)),
  };
}
