import type {
    AnalisisInstrumenMatrix,
} from './AnalisisInstrumenType';

// import type {
//     DiagnosisInstrumenResult,
//     DiagnosisSoalResult,
// } from './AnalisisSoalDiagnosisType';

import type {
    AnalisisInstrumenSummary,
    DistribusiDayaPembeda,
    DistribusiDiagnosis,
    DistribusiStatusSoal,
    RekomendasiInstrumen,
    ReliabilitasInstrumen,
} from './AnalisisInstrumenSummaryType';

// import {
//     calculateCronbachAlpha,
// } from './helpers/cronbachAlpha';

import {
    diagnoseReliabilitas,
} from './helpers/diagnoseReliabilitas';
import type { DiagnosisInstrumenResult, DiagnosisSoalResult } from './AnalisisSoalDiagnoserType';
import { calculateCronbachAlpha } from './helpers/cronbachAlpha';

export class AnalisisInstrumenSummaryBuilder {

    static build(
        matrix: AnalisisInstrumenMatrix,
        diagnosis: DiagnosisInstrumenResult
    ): AnalisisInstrumenSummary {

        const tingkatKesukaran =
            this.buildDistribusiKesukaran(
                diagnosis.soal
            );

        const dayaPembeda =
            this.buildDistribusiDayaPembeda(
                diagnosis.soal
            );

        const statusSoal =
            this.buildDistribusiStatus(
                diagnosis.soal
            );

        const reliabilitas =
            this.buildReliabilitas(
                matrix
            );

        const rekomendasi =
            this.buildRekomendasi(
                diagnosis.soal
            );

        return {
            publikasi_id:
                matrix.publikasi_id,

            jumlahPeserta:
                matrix.siswa.length,

            jumlahSoal:
                matrix.soal.length,

            tingkatKesukaran,

            dayaPembeda,

            statusSoal,

            reliabilitas,

            rekomendasi,
        };
    }

    /**
     * ============================================================
     * KESUKARAN
     * ============================================================
     */

    private static buildDistribusiKesukaran(
        soal: DiagnosisSoalResult[]
    ): DistribusiDiagnosis {

        const result: DistribusiDiagnosis = {
            sulit: 0,
            sedang: 0,
            mudah: 0,
            tidakDapatDitentukan: 0,
        };

        for (const item of soal) {

            switch (
                item.tingkatKesukaran
            ) {

                case 'sulit':
                    result.sulit++;
                    break;

                case 'sedang':
                    result.sedang++;
                    break;

                case 'mudah':
                    result.mudah++;
                    break;

                case 'tidak_dapat_ditentukan':
                    result.tidakDapatDitentukan++;
                    break;
            }
        }

        return result;
    }

    /**
     * ============================================================
     * DAYA PEMBEDA
     * ============================================================
     */

    private static buildDistribusiDayaPembeda(
        soal: DiagnosisSoalResult[]
    ): DistribusiDayaPembeda {

        const result: DistribusiDayaPembeda = {
            sangatRendah: 0,
            rendah: 0,
            cukup: 0,
            baik: 0,
            tidakDapatDitentukan: 0,
        };

        for (const item of soal) {

            switch (
                item.dayaPembeda
            ) {

                case 'sangat_rendah':
                    result.sangatRendah++;
                    break;

                case 'rendah':
                    result.rendah++;
                    break;

                case 'cukup':
                    result.cukup++;
                    break;

                case 'baik':
                    result.baik++;
                    break;

                case 'tidak_dapat_ditentukan':
                    result.tidakDapatDitentukan++;
                    break;
            }
        }

        return result;
    }

    /**
     * ============================================================
     * STATUS SOAL
     * ============================================================
     */

    private static buildDistribusiStatus(
        soal: DiagnosisSoalResult[]
    ): DistribusiStatusSoal {

        const result: DistribusiStatusSoal = {
            baik: 0,
            cukup: 0,
            perluDitinjau: 0,
            bermasalah: 0,
            tidakDapatDianalisis: 0,
        };

        for (const item of soal) {

            switch (item.status) {

                case 'baik':
                    result.baik++;
                    break;

                case 'cukup':
                    result.cukup++;
                    break;

                case 'perlu_ditinjau':
                    result.perluDitinjau++;
                    break;

                case 'bermasalah':
                    result.bermasalah++;
                    break;

                case 'tidak_dapat_dianalisis':
                    result.tidakDapatDianalisis++;
                    break;
            }
        }

        return result;
    }

    /**
     * ============================================================
     * RELIABILITAS
     * ============================================================
     */

    private static buildReliabilitas(
        matrix: AnalisisInstrumenMatrix
    ): ReliabilitasInstrumen {

        const jumlahPeserta =
            matrix.siswa.length;

        const jumlahItem =
            matrix.soal.length;

        const cronbachAlpha =
            calculateCronbachAlpha(
                matrix.skor
            );

        return {
            cronbachAlpha,

            kategori:
                diagnoseReliabilitas(
                    cronbachAlpha
                ),

            jumlahPeserta,

            jumlahItem,
        };
    }

    /**
     * ============================================================
     * REKOMENDASI
     * ============================================================
     */

    private static buildRekomendasi(
        soal: DiagnosisSoalResult[]
    ): RekomendasiInstrumen {

        const jumlahDipertahankan =
            soal.filter(
                item =>
                    item.status === 'baik' ||
                    item.status === 'cukup'
            ).length;

        const jumlahPerluDitinjau =
            soal.filter(
                item =>
                    item.status ===
                    'perlu_ditinjau'
            ).length;

        const jumlahBermasalah =
            soal.filter(
                item =>
                    item.status ===
                    'bermasalah'
            ).length;

        /**
         * Soal yang tidak dapat dianalisis
         * tidak dimasukkan sebagai
         * "dipertahankan".
         */
        const jumlahDapatDinilai =
            jumlahDipertahankan +
            jumlahPerluDitinjau +
            jumlahBermasalah;

        const persentaseDipertahankan =
            jumlahDapatDinilai === 0
                ? 0
                : (
                    jumlahDipertahankan /
                    jumlahDapatDinilai
                ) * 100;

        const pesan =
            this.buildPesanRekomendasi(
                jumlahDipertahankan,
                jumlahPerluDitinjau,
                jumlahBermasalah
            );

        return {
            jumlahDipertahankan,

            jumlahPerluDitinjau,

            jumlahBermasalah,

            persentaseDipertahankan,

            pesan,
        };
    }

    /**
     * ============================================================
     * PESAN
     * ============================================================
     */

    private static buildPesanRekomendasi(
        jumlahDipertahankan: number,
        jumlahPerluDitinjau: number,
        jumlahBermasalah: number
    ): string[] {

        const pesan: string[] = [];

        if (
            jumlahDipertahankan > 0
        ) {
            pesan.push(
                `${jumlahDipertahankan} soal dapat dipertahankan.`
            );
        }

        if (
            jumlahPerluDitinjau > 0
        ) {
            pesan.push(
                `${jumlahPerluDitinjau} soal perlu ditinjau kembali, terutama pada daya pembeda atau pengecohnya.`
            );
        }

        if (
            jumlahBermasalah > 0
        ) {
            pesan.push(
                `${jumlahBermasalah} soal menunjukkan masalah yang cukup serius dan sebaiknya diperiksa sebelum digunakan kembali.`
            );
        }

        if (
            pesan.length === 0
        ) {
            pesan.push(
                'Belum terdapat soal yang dapat diberikan rekomendasi karena data analisis belum mencukupi.'
            );
        }

        return pesan;
    }
}