import katex from "katex";

export function renderKatex(
    latex: string,
    displayMode = false,
): string {

    return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
    });

}

export function renderKatexToSvg(
    latex: string,
): string {

    return `https://latex.codecogs.com/svg.image?${encodeURIComponent(latex)}`;

}