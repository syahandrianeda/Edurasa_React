import { mean } from './mean';

export function variance(data: number[]): number {
    if (data.length < 2) {
        return 0;
    }

    const average = mean(data);

    return (
        data.reduce(
            (total, value) =>
                total + Math.pow(value - average, 2),
            0
        ) /
        (data.length - 1)
    );
}