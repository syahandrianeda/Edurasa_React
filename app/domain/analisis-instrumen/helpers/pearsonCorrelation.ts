import { mean } from './mean';

export function pearsonCorrelation(
    x: number[],
    y: number[]
): number | null {
    if (x.length !== y.length || x.length < 2) {
        return null;
    }

    const meanX = mean(x);
    const meanY = mean(y);

    let numerator = 0;
    let denominatorX = 0;
    let denominatorY = 0;

    for (let i = 0; i < x.length; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;

        numerator += dx * dy;
        denominatorX += dx * dx;
        denominatorY += dy * dy;
    }

    const denominator = Math.sqrt(
        denominatorX * denominatorY
    );

    if (denominator === 0) {
        return null;
    }

    return numerator / denominator;
}