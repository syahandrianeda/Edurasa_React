import type {
    AnalisisInstrumenMatrix,
} from './AnalisisInstrumenType';
import type { AnalisisPengecohOpsiResult, AnalisisPengecohResult, AnalisisPengecohSoalResult } from './AnalisisPengecohOpsiResult';


import {
    parseIndexRespon,
} from './helpers/parseIndexRespon';
import { parseIndexResponPgTunggal } from './helpers/parseIndexResponPgTunggal';

export class AnalisisPengecohAnalyzer {

    private static readonly BENTUK_SOAL =
        'pg';

    private static readonly PROPORSI_KELOMPOK = 0.3;//0.27;

    static analyze(
        matrix: AnalisisInstrumenMatrix
    ): AnalisisPengecohResult {

        const kelompok = this.buildKelompokTinggiRendah( matrix );
        const soal: AnalisisPengecohSoalResult[] = [];

        matrix.soal.forEach( (soalMatrix, columnIndex) => {
                const bentukSoal = soalMatrix.soal.bentuk_soal;
                /**
                 * Pengecoh hanya berlaku
                 * untuk PG Tunggal.
                 */
                if ( bentukSoal !== this.BENTUK_SOAL ) {
                    return;
                }

                const result = this.analyzeSoal( matrix, columnIndex, kelompok );

                soal.push(result);
            }
        );

        return {
            publikasi_id: matrix.publikasi_id,
            jumlahPeserta: matrix.siswa.length,
            soal,
        };
    }

    /**
     * ============================================================
     * ANALISIS SOAL
     * ============================================================
     */

    private static analyzeSoal(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number,
        kelompok: KelompokTinggiRendah
    ): AnalisisPengecohSoalResult {

        const soalMatrix = matrix.soal[columnIndex];
        const soal = soalMatrix.soal;
        const jsonAlatJawab = soal.json_alat_jawab;
        /**
         * Karena method ini hanya dipanggil
         * untuk PG Tunggal, valid seharusnya
         * tersedia.
         */
        const kunciIndex = this.getKunciIndex( jsonAlatJawab );

        const jumlahPeserta = matrix.siswa.length;

        const answered = matrix.answered.map( row => row[columnIndex] ?? false );

        const jumlahTerjawab = answered.filter(Boolean).length;

        const jumlahTidakTerjawab = jumlahPeserta - jumlahTerjawab;
        const opsi = this.buildOpsiResult(
                matrix,
                columnIndex,
                kunciIndex,
                kelompok,
                jumlahPeserta,
                jumlahTerjawab
            );

        return { 
            soal_id: soalMatrix.soal_id,
            no_prefix: soalMatrix.no_prefix,
            bentuk_soal: soal.bentuk_soal,
            opsi,
            kunciIndex,
            jumlahPeserta,
            jumlahTerjawab,
            jumlahTidakTerjawab,
        };
    }

    /**
     * ============================================================
     * OPSI
     * ============================================================
     */

    private static buildOpsiResult(
        matrix: AnalisisInstrumenMatrix,
        columnIndex: number,
        kunciIndex: number | null,
        kelompok: KelompokTinggiRendah,
        jumlahPeserta: number,
        jumlahTerjawab: number
    ): AnalisisPengecohOpsiResult[] {

        const soal = matrix.soal[columnIndex].soal;
        const jsonAlatJawab = soal.json_alat_jawab;
        
        if (!jsonAlatJawab) {
            return [];
        }

        const opsi = jsonAlatJawab.OpsiPilihanJawaban ?? [];
        
        return opsi.map((option) => {

            const index = option.index;

            let jumlahPemilih = 0;
            let jumlahKelompokTinggi = 0;
            let jumlahKelompokRendah = 0;

            for ( let rowIndex = 0; rowIndex < matrix.respon.length; rowIndex++ ) {
            
                // const respon = parseIndexRespon( matrix.respon[rowIndex][columnIndex] );
                const respon = parseIndexResponPgTunggal( matrix.respon[rowIndex][columnIndex] );
                
                if (respon !== index) {
                    continue;
                }

                jumlahPemilih++;

                if ( kelompok.tinggi.has( rowIndex ) ) {
                    jumlahKelompokTinggi++;
                }

                if ( kelompok.rendah.has( rowIndex ) ) {
                    jumlahKelompokRendah++;
                }
            }

            const persentasePemilih = jumlahPeserta === 0 ? 0 : ( jumlahPemilih / jumlahPeserta ) * 100;

            const persentasePemilihDariTerjawab = jumlahTerjawab === 0 ? 0 : ( jumlahPemilih / jumlahTerjawab ) * 100;

            const jumlahKelompok = kelompok.tinggi.size;

            const persentaseKelompokTinggi = jumlahKelompok === 0 ? 0 : ( jumlahKelompokTinggi / jumlahKelompok ) * 100;

            const persentaseKelompokRendah = jumlahKelompok === 0 ? 0 : ( jumlahKelompokRendah / jumlahKelompok ) * 100;

            const indeksPengecoh = persentaseKelompokRendah - persentaseKelompokTinggi;

            const isKunci = kunciIndex !== null && index === kunciIndex;

            /**
             * Kunci tidak dinilai sebagai
             * pengecoh.
             *
             * Untuk pengecoh:
             * - harus bukan kunci
             * - minimal dipilih satu peserta
             * - indeks harus positif
             */
            const berfungsi = !isKunci && jumlahPemilih > 0 && indeksPengecoh > 0;

            return {
                index,
                content: option.content,
                isKunci,
                jumlahPemilih,
                persentasePemilih,
                persentasePemilihDariTerjawab,
                jumlahKelompokTinggi,
                jumlahKelompokRendah,
                persentaseKelompokTinggi,
                persentaseKelompokRendah,
                indeksPengecoh,
                berfungsi,
            };
        });
    }

    /**
     * ============================================================
     * KUNCI
     * ============================================================
     */

    private static getKunciIndex(
        jsonAlatJawab:
            AnalisisInstrumenMatrix['soal'][number]['soal']['json_alat_jawab']
    ): number | null {

        if (!jsonAlatJawab) {
            return null;
        }

        const valid = jsonAlatJawab.valid;
        if (!Array.isArray(valid)) {
            return null;
        }

        const first = valid[0];
        
        if ( typeof first !== 'number' || !Number.isInteger(first) ) { return null; }

        return first;
    }

    /**
     * ============================================================
     * KELOMPOK TINGGI / RENDAH
     * ============================================================
     */

    private static buildKelompokTinggiRendah(
        matrix: AnalisisInstrumenMatrix
    ): KelompokTinggiRendah {

        const jumlahPeserta = matrix.siswa.length;

        if (jumlahPeserta === 0) {
            return { tinggi: new Set<number>(), rendah: new Set<number>(), };
        }

        const jumlahKelompok = Math.max( 1, Math.floor( jumlahPeserta * this.PROPORSI_KELOMPOK ) );
        
        const sorted = matrix.siswa.map((siswa) => ({
                    rowIndex: siswa.rowIndex,
                    totalSkor: siswa.totalSkor,
                }))
                .sort( (a, b) => b.totalSkor - a.totalSkor );

        const tinggi = new Set<number>( sorted.slice( 0, jumlahKelompok ).map( item => item.rowIndex ) 
                                    );
        const rendah = new Set<number>( sorted.slice( Math.max( 0, sorted.length - jumlahKelompok ) )
                                        .map( item => item.rowIndex ) );
        
        
        return {
            tinggi,
            rendah,
        };
    }
}

interface KelompokTinggiRendah {
    tinggi: Set<number>;
    rendah: Set<number>;
}