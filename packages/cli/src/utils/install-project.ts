import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { z } from "zod";

import { logger } from "./logger";

const baseUrl = process.env.PRO_REGISTRY_URL ?? "https://pro.magicui.design";

const projectTemplatesSchema = z.object({
  repo: z.string(),
  owner: z.string(),
  description: z.string(),
  preview: z.string(),
});

export const getAllProjectTemplates = async () => {
  return z
    .array(projectTemplatesSchema)
    .parse(
      await fetch(`${baseUrl}/registry/templates.json`).then((e) => e.json()),
    );
};

export const getProjectLink = async (
  repo: string,
  owner: string,
  env: string,
) => {
  const project = await fetch(`${baseUrl}/api/repo/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repo, owner, env }),
  }).then((e) => e.json());

  const linkZod = z.object({
    success: z.boolean(),
    status: z.number(),
    downloadUrl: z.string(),
  });

  return linkZod.parse(project);
};

export const getDataAndWrite = async (
  link: string,
  pathWithExtension: string,
) => {
  const response = await fetch(link);
  if (response.ok && response.body) {
    const writer = createWriteStream(pathWithExtension);
    Readable.fromWeb(response.body as any).pipe(writer);
    return true;
  }
  return false;
};
