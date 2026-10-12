import type { AnalisisInstrumenMatrix, } from './AnalisisInstrumenType';
import type { AnalisisInstrumenResultDetail, AnalisisInstrumenSoalResult, } from './AnalisisInstrumenResultType';
import { mean } from './helpers/mean';
import { pearsonCorrelation, } from './helpers/pearsonCorrelation';

export class AnalisisInstrumenAnalyzer {

    static analyze( matrix: AnalisisInstrumenMatrix ): AnalisisInstrumenResultDetail {
        const soal = matrix.soal.map( (_, columnIndex) => this.analyzeSoal( matrix, columnIndex ) );

        return {
            publikasi_id: matrix.publikasi_id,
            jumlahPeserta: matrix.siswa.length,
            jumlahSoal: matrix.soal.length,
            soal,
        };
    }

    private static analyzeSoal(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number
    ): AnalisisInstrumenSoalResult {

        const soal =
            matrix.soal[columnIndex];

        const itemScores =
            this.getItemScores(
                matrix,
                columnIndex
            );

        const itemAnswered =
            this.getItemAnswered(
                matrix,
                columnIndex
            );

        const jumlahPeserta =
            matrix.siswa.length;

        const jumlahTerjawab =
            itemAnswered.filter(Boolean).length;

        const jumlahTidakTerjawab =
            jumlahPeserta -
            jumlahTerjawab;

        const meanSkor =
            mean(itemScores);

        /**
         * Karena skor item berada pada skala 0-100:
         *
         * mean  = 0..100
         * proporsi = 0..1
         */
        const proporsiSkor =
            this.calculateProporsiSkor(
                meanSkor
            );

        /**
         * Untuk item polytomous,
         * proporsi skor digunakan sebagai
         * indeks kesukaran.
         */
        const tingkatKesukaran =
            this.calculateTingkatKesukaran(
                proporsiSkor
            );

        const persentaseTerjawab =
            jumlahPeserta === 0
                ? 0
                : (
                    jumlahTerjawab /
                    jumlahPeserta
                ) * 100;

        const korelasiItemTotal =
            this.calculateCorrectedItemTotalCorrelation(
                matrix,
                columnIndex
            );

        return {
            soal_id:
                soal.soal_id,

            no_prefix:
                soal.no_prefix,

            bentuk_soal:
                soal.soal.bentuk_soal,

            jumlahPeserta,

            jumlahTerjawab,

            jumlahTidakTerjawab,

            persentaseTerjawab,

            meanSkor,

            proporsiSkor,

            tingkatKesukaran,

            korelasiItemTotal,
        };
    }

    /**
     * ============================================================
     * ITEM SCORE
     * ============================================================
     */

    private static getItemScores(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number
    ): number[] {

        return matrix.skor.map(
            (row) =>
                row[columnIndex] ?? 0
        );
    }

    /**
     * ============================================================
     * ITEM ANSWERED
     * ============================================================
     */

    private static getItemAnswered(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number
    ): boolean[] {

        return matrix.answered.map(
            (row) =>
                row[columnIndex] ?? false
        );
    }

    /**
     * ============================================================
     * PROPORSI SKOR
     * ============================================================
     *
     * Skor resmi item:
     *
     *       0 .............. 100
     *
     * sehingga:
     *
     *       proporsi = meanSkor / 100
     *
     */

    private static calculateProporsiSkor(
        meanSkor: number
    ): number {

        return this.clamp(
            meanSkor / 100,
            0,
            1
        );
    }

    /**
     * ============================================================
     * TINGKAT KESUKARAN
     * ============================================================
     *
     * Untuk soal polytomous:
     *
     *       p = proporsi skor maksimum
     *
     * Jadi:
     *
     *       0   -> sangat sulit
     *       1   -> sangat mudah
     *
     * Tidak ada pembalikan nilai.
     */
    private static calculateTingkatKesukaran(
        proporsiSkor: number
    ): number {

        return this.clamp(
            proporsiSkor,
            0,
            1
        );
    }

    /**
     * ============================================================
     * CORRECTED ITEM-TOTAL CORRELATION
     * ============================================================
     *
     * Item dibandingkan dengan:
     *
     *       total skor TANPA item tersebut
     *
     * bukan total skor keseluruhan.
     *
     * Ini mencegah korelasi item dengan dirinya sendiri.
     */
    private static calculateCorrectedItemTotalCorrelation(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number
    ): number | null {

        if (matrix.siswa.length < 2) {
            return null;
        }

        const itemScores: number[] = [];
        const totalWithoutItem: number[] = [];

        for (
            let rowIndex = 0;
            rowIndex < matrix.siswa.length;
            rowIndex++
        ) {

            const row =
                matrix.skor[rowIndex];

            const itemScore =
                row[columnIndex] ?? 0;

            let total = 0;

            for (
                let currentColumnIndex = 0;
                currentColumnIndex < row.length;
                currentColumnIndex++
            ) {

                if (
                    currentColumnIndex ===
                    columnIndex
                ) {
                    continue;
                }

                total +=
                    row[currentColumnIndex] ?? 0;
            }

            itemScores.push(itemScore);
            totalWithoutItem.push(total);
        }

        return pearsonCorrelation(
            itemScores,
            totalWithoutItem
        );
    }

    /**
     * ============================================================
     * CLAMP
     * ============================================================
     */

    private static clamp(
        value: number,
        min: number,
        max: number
    ): number {

        return Math.min(
            Math.max(value, min),
            max
        );
    }
}