import type { CubeRoot, PecahanBiasa, PecahanCampuran, RootMath, SquareRoot } from "../type";

export type LatexCategory =
    | "pecahanBiasa"
    | "pecahanCampuran"
    | "akarKuadrat"
    | "akarPangkatTiga"
    | "latexFormula";

export function getLatexCategory(latex: string): LatexCategory {
    const value = latex.trim();

    // 3\frac{4}{5}
    if (/^\d+\\frac\{[^{}]+\}\{[^{}]+\}$/.test(value)) {
        return "pecahanCampuran";
    }

    // \frac{1}{3}
    if (/^\\frac\{[^{}]+\}\{[^{}]+\}$/.test(value)) {
        return "pecahanBiasa";
    }

    // \sqrt[3]{7}
    if (/^\\sqrt\[3\]\{[^{}]+\}$/.test(value)) {
        return "akarPangkatTiga";
    }

    // \sqrt{6}
    if (/^\\sqrt\{[^{}]+\}$/.test(value)) {
        return "akarKuadrat";
    }

    return "latexFormula";
}

export function getFraction(latex: string):PecahanBiasa|null {
    const match = latex.match(/^\\frac\{(-?\d+)\}\{(-?\d+)\}$/);

    if (!match) return null;

    return {
        numerator: Number(match[1]),
        denominator: Number(match[2]),
    };
}

export function getMixedFraction(latex: string):PecahanCampuran|null {
    const match = latex.match(/^(-?\d+)\\frac\{(-?\d+)\}\{(-?\d+)\}$/);

    if (!match) return null;

    return {
        satuan: Number(match[1]),
        numerator: Number(match[2]),
        denominator: Number(match[3]),
    };
}

export function getSquareRoot(latex: string): SquareRoot | null {
    const match = latex.match(/^\\sqrt\{(-?\d+)\}$/);

    if (!match) return null;

    return {
        value: Number(match[1]),
    };
}
export function getCubeRoot(latex: string): CubeRoot | null {
    const match = latex.match(/^\\sqrt\[3\]\{(-?\d+)\}$/);

    if (!match) return null;

    return {
        value: Number(match[1]),
    };
}
export function getRoot(latex: string): RootMath | null {
    const square = latex.match(/^\\sqrt\{(-?\d+)\}$/);

    if (square) {
        return {
            degree: 2,
            value: Number(square[1]),
        };
    }

    const nth = latex.match(/^\\sqrt\[(\d+)\]\{(-?\d+)\}$/);

    if (nth) {
        return {
            degree: Number(nth[1]),
            value: Number(nth[2]),
        };
    }

    return null;
}