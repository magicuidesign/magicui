import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import { registryItemSchema } from "shadcn/schema"
import type { RegistryItem } from "shadcn/schema"

import { Index } from "@/registry/__index__"

// Fumadocs zod v4 compat type fix. Temporary.
interface RegistryItemFile {
  path: string
  type?: RegistryItem["type"]
  target?: string
}

export function getRegistryComponent(name: string) {
  return Index[name]?.component
}

interface RegistryItemFileWithContent extends RegistryItemFile {
  content: string
}

const registryImportPattern =
  /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

const getCachedFileContent = cache(
  async (filePath: string, fileType: RegistryItem["type"] | undefined) => {
    let code = await fs.readFile(filePath, "utf-8")

    // Some registry items use default exports, but published snippets should not.
    if (fileType !== "registry:page") {
      code = code.replaceAll("export default", "export")
    }

    return fixImport(code)
  }
)

const getCachedRegistryItem = cache(async (name: string) => {
  const item = Index[name]

  if (!item) {
    return null
  }

  const normalizedItem = {
    ...item,
    files: normalizeRegistryItemFiles(item.files),
  }

  // Fail early before doing expensive file operations.
  const result = registryItemSchema.safeParse(normalizedItem)
  if (!result.success) {
    return null
  }

  const files = fixFilePaths(
    await Promise.all(
      (result.data.files ?? []).map(async (file) => {
        const content = await getCachedFileContent(file.path, file.type)
        return {
          ...file,
          path: path.relative(process.cwd(), file.path),
          content,
        }
      })
    )
  )

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    return null
  }

  return parsed.data
})

export async function getRegistryItem(name: string) {
  return getCachedRegistryItem(name)
}

function normalizeRegistryItemFiles(files: unknown) {
  if (!Array.isArray(files)) {
    return files
  }

  return files.map((file) => {
    if (typeof file === "string") {
      return { path: file }
    }

    return file
  })
}

function getFileTarget(file: RegistryItemFile) {
  let target = file.target

  if (!target || target === "") {
    const fileName = path.basename(file.path)
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }
  }

  return target ?? ""
}

function fixFilePaths(files: RegistryItemFileWithContent[]) {
  if (files.length === 0) {
    return []
  }

  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    }
  })
}

export function fixImport(content: string) {
  const replacement = (
    match: string,
    _sourcePath: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(registryImportPattern, replacement)
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        } else {
          // Move to next level in the tree
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
