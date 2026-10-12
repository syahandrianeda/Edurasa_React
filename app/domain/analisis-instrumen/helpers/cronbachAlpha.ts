// import { variance } from './variance';

import { variance } from "./variance";

export function calculateCronbachAlpha(
    scores: number[][]
): number | null {

    const jumlahPeserta =
        scores.length;

    if (jumlahPeserta < 2) {
        return null;
    }

    const jumlahItem =
        scores[0]?.length ?? 0;

    if (jumlahItem < 2) {
        return null;
    }

    /**
     * Pastikan setiap row memiliki
     * jumlah item yang sama.
     */
    const isValidMatrix =
        scores.every(
            row =>
                row.length ===
                jumlahItem
        );

    if (!isValidMatrix) {
        return null;
    }

    /**
     * Varians masing-masing item.
     */
    const varianceItems: number[] = [];

    for (
        let columnIndex = 0;
        columnIndex < jumlahItem;
        columnIndex++
    ) {

        const itemScores =
            scores.map(
                row =>
                    row[columnIndex]
            );

        varianceItems.push(
            variance(itemScores)
        );
    }

    const sumVarianceItems =
        varianceItems.reduce(
            (total, value) =>
                total + value,
            0
        );

    /**
     * Total skor masing-masing peserta.
     */
    const totalScores =
        scores.map(
            row =>
                row.reduce(
                    (total, value) =>
                        total + value,
                    0
                )
        );

    const varianceTotal =
        variance(totalScores);

    /**
     * Jika varians total = 0,
     * alpha tidak dapat ditentukan.
     */
    if (varianceTotal === 0) {
        return null;
    }

    const alpha =
        (
            jumlahItem /
            (jumlahItem - 1)
        ) *
        (
            1 -
            (
                sumVarianceItems /
                varianceTotal
            )
        );

    return Number.isFinite(alpha)
        ? alpha
        : null;
}