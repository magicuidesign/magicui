import { getRegistryItem } from "@/lib/registry"

/**
 * Replaces ComponentSource tags in content with actual source code from the registry.
 *
 * This function searches for `<ComponentSource name="XXXXX" ... >` tags in the provided
 * content and replaces them with formatted code blocks containing the actual source code
 * from the component registry.
 *
 * @param content - The content string containing ComponentSource tags to be replaced
 * @returns A promise that resolves to the content with ComponentSource tags replaced by actual source code
 *
 * @example
 * ```typescript
 * const content = '<ComponentSource name="button" />';
 * const result = await replaceComponentSource(content);
 * // Returns: ```tsx\n[actual button component source code]\n```
 * ```
 */

export const replaceComponentSource = async (content: string) => {
  // Replace <ComponentSource name="XXXXX" ... > with actual source code
  const componentSourceMatches = [
    ...content.matchAll(/<ComponentSource\s+name="([^"]+)"[^>]*>/g),
  ]
  if (componentSourceMatches.length === 0) {
    return content
  }

  const replacements = await Promise.all(
    componentSourceMatches.map(async ([fullMatch, name]) => {
      const component = await getRegistryItem(name)
      if (!component?.files?.[0]?.content) {
        return fullMatch
      }

      return `\`\`\`tsx\n${component.files[0].content}\n\`\`\``
    })
  )

  let previousIndex = 0
  let nextContent = ""

  for (const [index, match] of componentSourceMatches.entries()) {
    const startIndex = match.index ?? previousIndex
    nextContent += content.slice(previousIndex, startIndex)
    nextContent += replacements[index]
    previousIndex = startIndex + match[0].length
  }

  return `${nextContent}${content.slice(previousIndex)}`
}
