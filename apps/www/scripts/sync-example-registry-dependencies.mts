import { promises as fs } from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

import { CodeBlockWriter, Node, Project, SyntaxKind } from "ts-morph"

const MAGICUI_IMPORT_PREFIX = "@/registry/magicui/"
const MAGICUI_PACKAGE_PREFIX = "@magicui/"
const EXAMPLE_IMPORT_PREFIX = "@/registry/example/"
const REGISTRY_IMPORT_PREFIX = "@/registry/"

const scriptPath = fileURLToPath(import.meta.url)
const appRoot = path.resolve(path.dirname(scriptPath), "..")
const registryRoot = path.join(appRoot, "registry")
const registryExamplesPath = path.join(registryRoot, "registry-examples.ts")
const registryUiPath = path.join(registryRoot, "registry-ui.ts")

type SyncMode = "check" | "fix"

type SyncOptions = {
  mode: SyncMode
}

type ExampleIssue = {
  exampleName: string
  exampleFiles: string[]
  extraDependencies: string[]
  missingDependencies: string[]
  missingFiles: string[]
}

// Detect direct CLI execution so this module can also be imported by builds.
function isMainModule() {
  return process.argv[1]
    ? path.resolve(process.argv[1]) === scriptPath
    : false
}

// Read plain string values from string literals and template literals.
function getStringLiteralValue(node: Node | undefined) {
  if (!node) {
    return null
  }

  if (
    Node.isStringLiteral(node) ||
    Node.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.getLiteralText()
  }

  return null
}

// Resolve a named object property when it exists as a simple assignment.
function getObjectPropertyAssignment(
  node: Node,
  propertyName: string
): Node | undefined {
  if (!Node.isObjectLiteralExpression(node)) {
    return undefined
  }

  const property = node.getProperty(propertyName)
  if (!property || !Node.isPropertyAssignment(property)) {
    return undefined
  }

  return property
}

// Extract string items from array properties like registryDependencies.
function getStringArrayValues(node: Node | undefined) {
  if (!node || !Node.isPropertyAssignment(node)) {
    return []
  }

  const initializer = node.getInitializer()
  if (!initializer || !Node.isArrayLiteralExpression(initializer)) {
    return []
  }

  return initializer
    .getElements()
    .flatMap((element) => {
      const value = getStringLiteralValue(element)
      return value ? [value] : []
    })
}

// Collect referenced .tsx files from an example's files array.
function getExampleFilePaths(node: Node) {
  const filesProperty = getObjectPropertyAssignment(node, "files")
  if (!filesProperty || !Node.isPropertyAssignment(filesProperty)) {
    return []
  }

  const initializer = filesProperty.getInitializer()
  if (!initializer || !Node.isArrayLiteralExpression(initializer)) {
    return []
  }

  return initializer
    .getElements()
    .flatMap((element) => {
      const stringPath = getStringLiteralValue(element)
      if (stringPath) {
        return [stringPath]
      }

      if (!Node.isObjectLiteralExpression(element)) {
        return []
      }

      const pathProperty = getObjectPropertyAssignment(element, "path")
      if (!pathProperty || !Node.isPropertyAssignment(pathProperty)) {
        return []
      }

      const filePath = getStringLiteralValue(pathProperty.getInitializer())
      return filePath ? [filePath] : []
    })
    .filter((filePath) => filePath.endsWith(".tsx"))
}

// Read the registry item name for reporting.
function getRegistryItemName(node: Node) {
  const nameProperty = getObjectPropertyAssignment(node, "name")
  if (!nameProperty || !Node.isPropertyAssignment(nameProperty)) {
    return "unknown"
  }

  return getStringLiteralValue(nameProperty.getInitializer()) ?? "unknown"
}

// Read the registry item type so only examples are processed.
function getRegistryItemType(node: Node) {
  const typeProperty = getObjectPropertyAssignment(node, "type")
  if (!typeProperty || !Node.isPropertyAssignment(typeProperty)) {
    return null
  }

  return getStringLiteralValue(typeProperty.getInitializer())
}

// Read a registry array declaration like examples/ui so items can be inspected.
function getRegistryItemsDeclaration(sourceFile: Node, declarationName: string) {
  if (!Node.isSourceFile(sourceFile)) {
    return null
  }

  const declaration = sourceFile.getVariableDeclaration(declarationName)
  const initializer = declaration?.getInitializer()
  if (!initializer || !Node.isArrayLiteralExpression(initializer)) {
    return null
  }

  return initializer
}

// Preserve insertion order while removing duplicates.
function dedupe(values: string[]) {
  const seen = new Set<string>()

  return values.filter((value) => {
    if (seen.has(value)) {
      return false
    }

    seen.add(value)
    return true
  })
}

// Convert local registry imports into namespaced registry dependency ids.
function getRegistryDependencyName(moduleSpecifier: string) {
  const prefix = [MAGICUI_IMPORT_PREFIX, EXAMPLE_IMPORT_PREFIX].find((value) =>
    moduleSpecifier.startsWith(value)
  )

  if (!prefix) {
    return null
  }

  const itemName = moduleSpecifier.slice(prefix.length)
  if (!itemName) {
    return null
  }

  return `${MAGICUI_PACKAGE_PREFIX}${itemName}`
}

// Map registry source files back to their published registry dependency ids.
function getRegistryDependencyNameFromFilePath(filePath: string) {
  const registryItemRoots = [
    path.join(registryRoot, "magicui"),
    path.join(registryRoot, "example"),
  ]

  const matchingRoot = registryItemRoots.find((rootPath) => {
    const relativePath = path.relative(rootPath, filePath)
    return !relativePath.startsWith("..") && !path.isAbsolute(relativePath)
  })

  if (!matchingRoot) {
    return null
  }

  const relativePath = path.relative(matchingRoot, filePath)

  if (
    !/\.(ts|tsx)$/.test(relativePath)
  ) {
    return null
  }

  const packageName = relativePath
    .replace(/\.(ts|tsx)$/, "")
    .split(path.sep)
    .join("/")

  return `${MAGICUI_PACKAGE_PREFIX}${packageName}`
}

// Limit exact matching to magicui package entries and leave other deps alone.
function isMagicUiPackage(dependency: string) {
  return dependency.startsWith(MAGICUI_PACKAGE_PREFIX)
}

// Infer the primary UI package from example naming conventions like confetti-fireworks.
function inferRegistryDependenciesFromExampleName(
  exampleName: string,
  registryUiNames: string[]
) {
  const matchingUiNames = registryUiNames
    .filter((uiName) => {
      return exampleName === uiName || exampleName.startsWith(`${uiName}-`)
    })
    .sort((left, right) => right.length - left.length || left.localeCompare(right))

  const longestMatch = matchingUiNames.at(0)
  if (!longestMatch) {
    return []
  }

  return [`${MAGICUI_PACKAGE_PREFIX}${longestMatch}`]
}

// Collect static and dynamic module specifiers from a source file.
function collectModuleSpecifiersFromSourceFile(sourceFile: Node) {
  const importSpecifiers = sourceFile
    .getDescendantsOfKind(SyntaxKind.ImportDeclaration)
    .map((importDeclaration) => importDeclaration.getModuleSpecifierValue())

  const dynamicImportSpecifiers = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .flatMap((callExpression) => {
      if (callExpression.getExpression().getKind() !== SyntaxKind.ImportKeyword) {
        return []
      }

      return [getStringLiteralValue(callExpression.getArguments().at(0))]
    })
    .filter((specifier): specifier is string => specifier !== null)

  return dedupe([...importSpecifiers, ...dynamicImportSpecifiers])
}

// Check whether an import points at another source file under apps/www/registry.
function getRegistryImportBasePath(
  fromFilePath: string,
  moduleSpecifier: string
) {
  if (moduleSpecifier.startsWith(REGISTRY_IMPORT_PREFIX)) {
    return path.join(registryRoot, moduleSpecifier.slice(REGISTRY_IMPORT_PREFIX.length))
  }

  if (!moduleSpecifier.startsWith(".")) {
    return null
  }

  const resolvedPath = path.resolve(path.dirname(fromFilePath), moduleSpecifier)
  const relativePath = path.relative(registryRoot, resolvedPath)

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null
  }

  return resolvedPath
}

// Resolve registry-local imports without needing a full tsconfig module resolver.
async function resolveRegistryImportPath(
  fromFilePath: string,
  moduleSpecifier: string
) {
  const basePath = getRegistryImportBasePath(fromFilePath, moduleSpecifier)
  if (!basePath) {
    return null
  }

  const candidates = /\.[mc]?[jt]sx?$/.test(basePath)
    ? [basePath]
    : [
        `${basePath}.tsx`,
        `${basePath}.ts`,
        path.join(basePath, "index.tsx"),
        path.join(basePath, "index.ts"),
      ]

  for (const candidate of candidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      continue
    }
  }

  return {
    missingImport: moduleSpecifier,
    sourceFile: path.relative(registryRoot, fromFilePath),
  }
}

// Walk the local registry import graph and collect all reachable @magicui/* packages.
async function collectRegistryDependenciesFromFile(
  project: Project,
  filePath: string,
  dependencies: Set<string>,
  missingFiles: string[],
  excludedDependencies: Set<string>,
  visitedFiles = new Set<string>()
) {
  const absolutePath = path.resolve(filePath)
  if (visitedFiles.has(absolutePath)) {
    return
  }

  visitedFiles.add(absolutePath)

  const sourceFile =
    project.getSourceFile(absolutePath) ??
    project.addSourceFileAtPathIfExists(absolutePath)

  if (!sourceFile) {
    missingFiles.push(path.relative(registryRoot, absolutePath))
    return
  }

  const fileDependency = getRegistryDependencyNameFromFilePath(absolutePath)
  if (fileDependency && !excludedDependencies.has(fileDependency)) {
    dependencies.add(fileDependency)
  }

  for (const moduleSpecifier of collectModuleSpecifiersFromSourceFile(sourceFile)) {
    const directDependency = getRegistryDependencyName(moduleSpecifier)
    if (directDependency && !excludedDependencies.has(directDependency)) {
      dependencies.add(directDependency)
    }

    const resolvedImport = await resolveRegistryImportPath(
      absolutePath,
      moduleSpecifier
    )

    if (!resolvedImport) {
      continue
    }

    if (typeof resolvedImport !== "string") {
      missingFiles.push(
        `${resolvedImport.sourceFile} -> ${resolvedImport.missingImport}`
      )
      continue
    }

    await collectRegistryDependenciesFromFile(
      project,
      resolvedImport,
      dependencies,
      missingFiles,
      excludedDependencies,
      visitedFiles
    )
  }
}

// Aggregate magicui dependencies across all files referenced by one example.
async function collectExampleRegistryDependencies(
  project: Project,
  filePaths: string[]
) {
  const missingFiles: string[] = []
  const dependencies = new Set<string>()
  const visitedFiles = new Set<string>()
  const excludedDependencies = new Set(
    filePaths
      .filter((filePath) => filePath.startsWith("example/"))
      .map((filePath) => {
        return getRegistryDependencyNameFromFilePath(path.join(registryRoot, filePath))
      })
      .filter((dependency): dependency is string => dependency !== null)
  )

  for (const filePath of filePaths) {
    const absolutePath = path.join(registryRoot, filePath)

    try {
      await fs.access(absolutePath)
    } catch {
      missingFiles.push(filePath)
      continue
    }

    await collectRegistryDependenciesFromFile(
      project,
      absolutePath,
      dependencies,
      missingFiles,
      excludedDependencies,
      visitedFiles
    )
  }

  return {
    dependencies: Array.from(dependencies).sort((left, right) =>
      left.localeCompare(right)
    ),
    missingFiles,
  }
}

// Upsert registryDependencies while keeping the property near files.
function setRegistryDependencies(node: Node, dependencies: string[]) {
  if (!Node.isObjectLiteralExpression(node)) {
    return
  }

  const normalizedDependencies = dedupe(dependencies)
  const existingProperty = getObjectPropertyAssignment(
    node,
    "registryDependencies"
  )
  const filesPropertyIndex = node
    .getProperties()
    .findIndex((property) => {
      return Node.isPropertyAssignment(property) && property.getName() === "files"
    })

  const initializer = (writer: CodeBlockWriter) => {
    writer.write("[")

    if (normalizedDependencies.length === 0) {
      writer.write("]")
      return
    }

    writer.newLine()
    writer.indent(() => {
      for (const dependency of normalizedDependencies) {
        writer.writeLine(`${JSON.stringify(dependency)},`)
      }
    })
    writer.write("]")
  }

  if (existingProperty && Node.isPropertyAssignment(existingProperty)) {
    existingProperty.setInitializer(initializer)
    return
  }

  const insertIndex =
    filesPropertyIndex >= 0 ? filesPropertyIndex : node.getProperties().length

  node.insertPropertyAssignment(insertIndex, {
    name: "registryDependencies",
    initializer,
  })
}

// Format one mismatch entry for CLI output.
function formatIssue(issue: ExampleIssue) {
  const fileList =
    issue.exampleFiles.length > 0 ? issue.exampleFiles.join(", ") : "no files"
  const extraDependencies =
    issue.extraDependencies.length > 0
      ? issue.extraDependencies.join(", ")
      : "none"
  const missingDependencies =
    issue.missingDependencies.length > 0
      ? issue.missingDependencies.join(", ")
      : "none"
  const missingFiles =
    issue.missingFiles.length > 0 ? issue.missingFiles.join(", ") : "none"

  return [
    `- ${issue.exampleName}`,
    `  files: ${fileList}`,
    `  extra registryDependencies: ${extraDependencies}`,
    `  missing registryDependencies: ${missingDependencies}`,
    `  missing files: ${missingFiles}`,
  ].join("\n")
}

// Treat missing files or missing dependencies as failures that need action.
function hasBlockingIssue(issue: ExampleIssue) {
  return issue.missingDependencies.length > 0 || issue.missingFiles.length > 0
}

// Treat extra dependencies as non-blocking warnings to avoid destructive churn.
function hasWarningIssue(issue: ExampleIssue) {
  return issue.extraDependencies.length > 0 && !hasBlockingIssue(issue)
}

// Raise a hard failure when an example points at files that cannot be read.
export function assertNoMissingExampleFiles(issues: ExampleIssue[]) {
  const missingFileIssues = issues.filter((issue) => issue.missingFiles.length > 0)
  if (missingFileIssues.length === 0) {
    return
  }

  const issueSummary = missingFileIssues.map(formatIssue).join("\n")
  throw new Error(
    [
      "registry example dependency sync failed because some example files are missing:",
      issueSummary,
    ].join("\n")
  )
}

// Compare imported magicui components with declared registryDependencies.
export async function syncExampleRegistryDependencies({
  mode,
}: SyncOptions): Promise<ExampleIssue[]> {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
  })
  const registryExamplesSourceFile =
    project.addSourceFileAtPath(registryExamplesPath)
  const registryUiSourceFile = project.addSourceFileAtPath(registryUiPath)

  const initializer = getRegistryItemsDeclaration(
    registryExamplesSourceFile,
    "examples"
  )
  const uiInitializer = getRegistryItemsDeclaration(registryUiSourceFile, "ui")

  if (!initializer) {
    throw new Error("Could not find the examples array in registry-examples.ts.")
  }

  if (!uiInitializer) {
    throw new Error("Could not find the ui array in registry-ui.ts.")
  }

  const registryUiNames = uiInitializer
    .getElements()
    .flatMap((item) => {
      if (!Node.isObjectLiteralExpression(item)) {
        return []
      }

      if (getRegistryItemType(item) !== "registry:ui") {
        return []
      }

      return [getRegistryItemName(item)]
    })
    .sort((left, right) => right.length - left.length || left.localeCompare(right))

  const issues: ExampleIssue[] = []

  for (const item of initializer.getElements()) {
    if (!Node.isObjectLiteralExpression(item)) {
      continue
    }

    if (getRegistryItemType(item) !== "registry:example") {
      continue
    }

    const exampleName = getRegistryItemName(item)
    const exampleFiles = getExampleFilePaths(item)
    const currentDependencies = getStringArrayValues(
      getObjectPropertyAssignment(item, "registryDependencies")
    )
    const { dependencies: importedDependencies, missingFiles } =
      await collectExampleRegistryDependencies(project, exampleFiles)
    const inferredDependencies = inferRegistryDependenciesFromExampleName(
      exampleName,
      registryUiNames
    )
    const expectedDependencies = dedupe([
      ...importedDependencies,
      ...inferredDependencies,
    ]).sort((left, right) => left.localeCompare(right))

    const normalizedCurrentDependencies = dedupe(currentDependencies)
    const currentMagicUiDependencies = normalizedCurrentDependencies.filter(
      isMagicUiPackage
    )
    const extraDependencies = currentMagicUiDependencies.filter((dependency) => {
      return !expectedDependencies.includes(dependency)
    })
    const missingDependencies = expectedDependencies.filter((dependency) => {
      return !currentMagicUiDependencies.includes(dependency)
    })
    const nextDependencies = [...normalizedCurrentDependencies, ...missingDependencies]
    const dependenciesChanged =
      nextDependencies.length !== currentDependencies.length ||
      nextDependencies.some(
        (dependency, index) => dependency !== currentDependencies[index]
      )

    if (dependenciesChanged || missingFiles.length > 0) {
      issues.push({
        exampleName,
        exampleFiles,
        extraDependencies,
        missingDependencies,
        missingFiles,
      })
    }

    if (mode === "fix" && dependenciesChanged) {
      setRegistryDependencies(item, nextDependencies)
    }
  }

  if (mode === "fix" && registryExamplesSourceFile.isSaved() === false) {
    await registryExamplesSourceFile.save()
  }

  return issues
}

// Expose a small check/fix CLI for local runs and package scripts.
async function main() {
  const mode = process.argv.includes("--check") ? "check" : "fix"
  const issues = await syncExampleRegistryDependencies({ mode })
  const blockingIssues = issues.filter(hasBlockingIssue)
  const warningIssues = issues.filter(hasWarningIssue)

  if (issues.length === 0) {
    console.log("registry example dependencies are in sync")
    return
  }

  const blockingIssueSummary = blockingIssues.map(formatIssue).join("\n")
  const warningIssueSummary = warningIssues.map(formatIssue).join("\n")

  if (mode === "check") {
    if (blockingIssues.length > 0) {
      console.error("registry example dependency mismatches found:")
      console.error(blockingIssueSummary)
      process.exit(1)
    }

    console.warn("registry example dependencies have non-blocking warnings:")
    console.warn(warningIssueSummary)
    return
  }

  try {
    assertNoMissingExampleFiles(issues)
  } catch (error) {
    console.error("registry example dependency sync completed with missing files:")
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }

  if (blockingIssues.length > 0) {
    console.log("updated registry example dependencies:")
    console.log(blockingIssueSummary)
  } else {
    console.log("registry example dependencies are in sync")
  }

  if (warningIssues.length > 0) {
    console.warn("registry example dependencies have non-blocking warnings:")
    console.warn(warningIssueSummary)
  }
}

if (isMainModule()) {
  await main()
}
