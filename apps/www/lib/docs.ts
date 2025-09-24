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
  for (const [fullMatch, name] of componentSourceMatches) {
    const component = await getRegistryItem(name)
    if (component?.files?.[0]?.content) {
      const sourceCode = component.files[0].content
      const replacement = `\`\`\`tsx\n${sourceCode}\n\`\`\``
      content = content.replace(fullMatch, replacement)
    } else {
      content = content.replace(fullMatch, fullMatch)
    }
  }

  return content
}
