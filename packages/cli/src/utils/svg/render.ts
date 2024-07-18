import { fetchSVG, type iSVG } from "./get-svgs-list"
import { formatSVG, getNameFromURL, getTemplateHeaderJSX, getTemplateHeaderTSX, getTemplateJSX, getTemplateTSX } from "./template"

export const renderSvg = async (svg: iSVG, tsx = true) => {
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
        const newSvg = formatSVG(svg)

        return tsx ? getTemplateTSX(name, newSvg, url) : getTemplateJSX(name, newSvg, url)
    }))

    const content = svgContents.join('\n\n')

    return {
        name: titleWithout,
        content: tsx ? getTemplateHeaderTSX(content) : getTemplateHeaderJSX(content)
    }
}