// import type {
//     KategoriReliabilitas,
// } from '../AnalisisInstrumenSummaryType';

import type { KategoriReliabilitas } from "../AnalisisInstrumenSummaryType";

export function diagnoseReliabilitas(
    alpha: number | null
): KategoriReliabilitas {

    if (
        alpha === null ||
        !Number.isFinite(alpha)
    ) {
        return 'tidak_dapat_ditentukan';
    }

    if (alpha >= 0.90) {
        return 'sangat_baik';
    }

    if (alpha >= 0.80) {
        return 'baik';
    }

    if (alpha >= 0.70) {
        return 'cukup';
    }

    if (alpha >= 0.60) {
        return 'rendah';
    }

    return 'sangat_rendah';
}