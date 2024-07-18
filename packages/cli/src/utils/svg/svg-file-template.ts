import { formatJSX } from "./format-jsx"
import { fetchSVG, type iSVG } from "./get-svgs-list"

const getTemplateHeader = (content: string) => `import type { SVGProps, FC } from "react";

${content}
`

const getTemplate = (name: string, svg: string, url: string) => `/**
 * [${name}](${url})
 */
export const ${name}: FC<SVGProps<SVGSVGElement>> = (props) => (
  ${svg}
);
`

const formatSVG = (string: string) => formatJSX(
    string.replace("<svg", "<svg {...props}")
)

export const renderSvg = async (svg: iSVG) => {
    const { route, wordmark, title } = svg
    const titleWithout = title.replace(/ /g, '')

    const array = typeof route === "object" ? [route.dark, route.light] : [route]

    if (wordmark) {
        typeof wordmark === "object" ?
            array.push(
                wordmark.dark, wordmark.light
            ) :
            array.push(wordmark)
    }

    const svgContents = await Promise.all(array.map(async (url) => {
        const svg = await fetchSVG(url)
        const name = getNameFromURL(url, titleWithout)

        return getTemplate(name, formatSVG(svg), url)
    }))

    return {
        name: titleWithout,
        content: getTemplateHeader(
            svgContents.join('\n\n')
        )
    }
}

function getNameFromURL(url: string, title: string) {
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