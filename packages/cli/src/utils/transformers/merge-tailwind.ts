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
    const mergeTailwindFunc = mergeTailwind

    const updatedMiddle = ''

    const runThis = `
    const require = (str) => \`<require>\${str}<require>\`
    const json = ${middle}

    const newTailwindConfig = mergeTailwindFunc(json, ...listOfTailwindUpdates)

    updatedMiddle = JSON.stringify(newTailwindConfig, null, 2)`

    try {
        // why eval? 
        // because tailwind config consist of plugins & require functions
        // which are not supported by JSON.parse()
        eval(runThis)
    }
    catch (e) {
        return null
    }

    if (updatedMiddle.length === 0) return null

    const newTailwindConfig = `${start} ${
        formatKeys(replaceRequire(updatedMiddle))
    }${end}`

    return newTailwindConfig
}