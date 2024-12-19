import { blocks } from "./registry-blocks";
import { examples } from "./registry-examples";
import { hooks } from "./registry-hooks";
import { lib } from "./registry-lib";
import { themes } from "./registry-themes";
import { ui } from "./registry-ui";
import { Registry } from "./schema";

export const registry: Registry = [
  ...ui,
  ...examples,
  ...blocks,
  ...lib,
  ...hooks,
  ...themes,
];
