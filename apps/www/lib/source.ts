import { blog, docs, showcase } from "@/.source";
import { loader } from "fumadocs-core/source";

export const source: ReturnType<typeof loader> = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const blogSource: ReturnType<typeof loader> = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});

export const showcaseSource: ReturnType<typeof loader> = loader({
  baseUrl: "/showcase",
  source: showcase.toFumadocsSource(),
});
