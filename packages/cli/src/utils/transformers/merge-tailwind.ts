import { mergician } from "mergician"

export const mergeTailwind = (config: object, ...userConfig: object[]): object => {
    return mergician({
        appendArrays: true,
        dedupArrays: true,
        invokeGetters: true,
    })(config, ...userConfig)
}

const findPosition = (input: string): number => {
    const pattern = /=\s*{/;
    const match = pattern.exec(input);
    return match ? match.index : -1;
};

const findLastClosingBracePosition = (input: string): number => {
    const pattern = /}[^}]*$/;
    const match = input.match(pattern);
    return match ? input.lastIndexOf(match[0]) + match[0].indexOf('}') : -1;
};

const replaceRequire = (input: string): string => {
    const pattern = /"<require>(.*?)<require>"/g;
    return input.replace(pattern, (match, p1) => {
        return `require('${p1}')`;
    });
};

const replaceTemplateStringsWithExternal = (jsonString: string): string => {
    return jsonString.replace(/\$\{([^}]+)\}/g, '<external>$1<external>');
}

const replaceExternal = (input: string): string => {
    const pattern = /<external>(.*?)<external>/g;
    return input.replace(pattern, (match, p1) => {
        return `$\{${p1}\}`;
    });
};

const formatQuotes = (input: string): string => {
    const pattern = /"(.*?)"/g;
    return input.replace(pattern, (match, p1:string) => {
        // Check if `p1` does not include the template literal placeholder syntax "${"
        // If true, return the original `match` without any modifications
        if (!p1.includes("${")) {
            return match;
        }
        return `\`${p1}\``;
    });
};


const isValidString = (str: string): boolean => {
    const regex = /^[A-Za-z_][A-Za-z0-9_]*$/;
    return regex.test(str);
}

const formatKeys = (input: string): string => {
    const pattern = /"([^"]+)":/g;
    return input.replace(pattern, (match, p1) => {
        if (!isValidString(p1)) return match
        return `${p1}:`;
    });
};


export const updatedTailwindConfig = (tailwindConfig: string, listOfTailwindUpdates: object[], type: string): string | null => {
    const f = findPosition(tailwindConfig);
    const l = findLastClosingBracePosition(tailwindConfig);

    if (f === -1 || l === -1) {
        return null;
    }

    const start = tailwindConfig.slice(0, f + 1);
    const end = tailwindConfig.slice(l + 1);
    const middle = tailwindConfig.slice(f + 1, l + 1);

    const changedMiddle = replaceTemplateStringsWithExternal(middle)

    const mergeTailwindFunc = mergeTailwind
    const newJsons = listOfTailwindUpdates

    // biome-ignore lint/style/useConst: <explanation>
    let updatedMiddle = ''

    const runThis = `
    const require = (str) => \`<require>\${str}<require>\`
    const json = ${changedMiddle}

    const newTailwindConfig = mergeTailwindFunc(json, ...newJsons)

    updatedMiddle = JSON.stringify(newTailwindConfig, null, 2)`

    try {
        // why eval? 
        // because tailwind config consist of plugins & require functions & template strings
        // which are not supported by JSON.parse()

        // biome-ignore lint/security/noGlobalEval: <explanation>
        eval(runThis)
    }
    catch (e) {
        // console.log(e)
        return null
    }

    if (updatedMiddle.length === 0) return null

    const newTailwindConfig = `${start} ${
        pipe(
            updatedMiddle,
            replaceRequire,
            replaceExternal,
            formatKeys,
            formatQuotes
        )
    }${end}`

    return newTailwindConfig
}

const pipe = <T>(x: T, ...fns: ((x: T) => T)[]) => fns.reduce((v, f) => f(v), x);