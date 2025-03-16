export function formatJSX(jsx: string) {
    const newJsx = jsx.replace(/>\s+</g, '><')
        .replace(/\s+(?=[^>]*<)/g, ' ')
        .replace(/(<\/?[^\s>]+(?:\s+[^>]*)?>\s*)/g, '\n$1')
        .replace(/^\s*[\r\n]/gm, '');

    let formatted = '';
    let indent = 1;
    const lines = newJsx.split('\n');

    for (let line of lines) {
        line = line.trim();


        if (line.match(/^<\//)) {
            indent--;
        }

        if (line.match(/^<[^/]/)) {
            formatted += `${'  '.repeat(Math.max(0, indent)) + line}\n`;
            if (!line.match(/(\/>|<\/[^>]+>)$/)) {
                indent++;
            }
        } else {
            formatted += `${'  '.repeat(Math.max(0, indent)) + line}\n`;
        }
    }

    return formatted.trim();
}