export interface Category {
    category: string;
    total: number;
}

type ThemeOptions = {
    light: string;
    dark: string;
};

export interface iSVG {
    id: number;
    title: string;
    category: string | string[];
    route: string | ThemeOptions;
    wordmark?: string | ThemeOptions;
    url: string;
}

export async function getSvgsList(categories?: string[]): Promise<iSVG[]> {

    if (!categories) {
        const response = await fetch(
            "https://svgl.app/api/svgs",
        );
        return (await response.json()) as iSVG[]
    }

    const responses = await Promise.all(categories.map(async (category) => {
        const response = await fetch(
            `https://svgl.app/api/svgs${category ? `?category=${category}` : ""}`,
        );
        return (await response.json()) as iSVG[]
    }))

    return responses.flat()

}

export async function getSvgCategory() {

    const response = await fetch(
        "https://svgl.app/api/categories",
    );

    return (await response.json()) as Category[]
}

export async function getSvgByName(name:string[]) {

    const responses = await Promise.all(name.map(async (category) => {
        const response = await fetch(
            `https://svgl.app/api/svgs?search=${category}`,
        );
        return (await response.json()) as iSVG[]
    }))

    return responses.flat()
}

export async function fetchSVGS(link: string[]) {

    const responses = await Promise.all(link.map(async (url) => {
        const response = await fetch(
            url,
        );
        return (await response.text()).split("><").join(">\n<")
    }))
    return responses
}
export async function fetchSVG(link: string) {

    const response = await fetch(
        link,
    );
    return (await response.text())
}