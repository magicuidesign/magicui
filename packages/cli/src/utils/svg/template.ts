import { formatJSX } from "./format-jsx"

export const getTemplateHeaderTSX = (content: string) => `import type { SVGProps, FC } from "react";

${content}
`
export const getTemplateHeaderJSX = (content: string) => `/**
 * @typedef {import('react').SVGProps<SVGSVGElement>} SVGProps
 */

${content}`

export const getTemplateTSX = (name: string, svg: string, url: string) => `/**
 * → [${name}](${url})
 */
export const ${name}: FC<SVGProps<SVGSVGElement>> = (props) => (
  ${svg}
);
`
export const getTemplateJSX = (name: string, svg: string, url: string) => `/**
 * @preview [${name}](${url})
 * @param {SVGProps} props - The props for the SVG component
 * @returns {JSX.Element} - Returns an SVG element
 */
export const ${name} = (props) => (
  ${svg}
);
`

export const formatSVG = (string: string) => formatJSX(
    string.replace("<svg", "<svg {...props}").replace(/^\s*<\?xml\s+[^>]*\?>\s*/, '')
)

export function getNameFromURL(url: string, title: string) {
    const fileName = url.split('/').pop() ?? title
    const withoutExtension = fileName.replace('.svg', '');

    const name = withoutExtension.split(/[_-]+/).map((word, index) => {
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');

    return name;
}