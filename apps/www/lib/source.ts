import { blog, docs, showcase } from "@/.source"
import { loader } from "fumadocs-core/source"

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
})

export const showcaseSource = loader({
  baseUrl: "/showcase",
  source: showcase.toFumadocsSource(),
})
