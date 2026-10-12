import type { NilaiSiswaAppType } from '~/types/penilaian/nilai-siswa-app-type';
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { TagihanHasDataResponse } from '../penilaian/type/tagihan-assesmen-type';
import type {
    AnalisisInstrumenMatrix,
    AnalisisInstrumenMatrixSiswa,
    AnalisisInstrumenMatrixSoal,
} from './AnalisisInstrumenType';
import type { BankSoalAppType } from '~/types/bank-soal/bank-soal-type';

export class AnalisisInstrumenMatrixBuilder {

    static build(
        tagihan: TagihanHasDataResponse
    ): AnalisisInstrumenMatrix {

        const soal = this.buildSoal(tagihan);

        /**
         * Ambil satu response final untuk setiap siswa.
         *
         * Aturan:
         * - hanya response untuk publikasi/paket yang sedang dianalisis
         * - jika terdapat lebih dari satu response,
         *   gunakan response terakhir
         */
        const responseBySiswa = this.buildResponseBySiswaMap(tagihan);
        
        /**
         * Hanya siswa yang mempunyai response
         * yang masuk ke analisis.
         */
        const siswaDenganResponse =
            tagihan.peserta
                .map((siswa) => ({
                    siswa,
                    response: responseBySiswa.get( siswa.id ),
                }))
                .filter(
                    (
                        item
                    ): item is {
                        siswa: TagihanHasDataResponse['peserta'][number];
                        response: NilaiSiswaAppType;
                    } => Boolean(item.response)
                );

        const siswa: AnalisisInstrumenMatrixSiswa[] = [];
        const skor: number[][] = [];
        const respon: (string | null)[][] = [];
        const answered: boolean[][] = [];

        siswaDenganResponse.forEach(
            ({ siswa: siswaData, response }, rowIndex) => {

                const rowSkor: number[] = [];
                const rowRespon: (string | null)[] = [];
                const rowAnswered: boolean[] = [];

                for (const soalData of soal) {

                    const itemResponse =
                        this.findResponse(
                            response.respon,
                            soalData.soal_id
                        );

                    /**
                     * Jangan menghitung ulang skor.
                     *
                     * `skor` merupakan skor resmi hasil
                     * proses koreksi/penilaian sebelumnya.
                     */
                    const itemScore = itemResponse?.skor ?? 0;
                    // const itemRespon = itemResponse?.respon ?? null;
                    const itemRespon = itemResponse?.respon ??  '';
                    const isAnswered = this.isAnswered(itemRespon);

                    rowSkor.push(itemScore);
                    rowRespon.push(itemRespon);
                    rowAnswered.push(isAnswered);
                }

                const totalSkor =
                    this.sum(rowSkor);

                const jumlahTerjawab =
                    rowAnswered.filter(Boolean).length;

                const jumlahTidakTerjawab =
                    rowAnswered.length -
                    jumlahTerjawab;

                /**
                 * Semua item mempunyai skala 0-100.
                 *
                 * Karena saat ini setiap item dianggap
                 * memiliki bobot yang sama:
                 *
                 * nilai = total skor / jumlah item
                 */
                const nilai =
                    soal.length > 0
                        ? totalSkor / soal.length
                        : 0;

                siswa.push({
                    siswa_id: siswaData.id,
                    siswa: siswaData,
                    rowIndex,
                    totalSkor,
                    jumlahTerjawab,
                    jumlahTidakTerjawab,
                    nilai,
                });

                skor.push(rowSkor);
                respon.push(rowRespon);
                answered.push(rowAnswered);
            }
        );

        return {
            // publikasi_id: tagihan.paket_soal_id,
            publikasi_id: tagihan.idbaris,
            siswa,
            soal,
            skor,
            respon,
            answered,
        };
    }

    /**
     * ============================================================
     * SOAL
     * ============================================================
     */

    private static buildSoal(
        tagihan: TagihanHasDataResponse
    ): AnalisisInstrumenMatrixSoal[] {

        /**
         * no_prefix adalah property response,
         * bukan property BankSoal.
         *
         * Kita buat map soal_id -> no_prefix sekali saja.
         */
        const noPrefixMap = this.buildNoPrefixMap(tagihan);

        return tagihan.bank_soal_collections.map(
            (soal: BankSoalAppType|undefined, columnIndex) => {

                const noPrefix =
                    noPrefixMap.get(
                        // soal.idbaris ?? 0
                        (columnIndex + 1)
                    );

                if(!soal){
                    return {
                    soal_id: 0,
                    soal: this.bankSoalUndefined(),
                    columnIndex,

                    /**
                     * Jika response tidak memiliki no_prefix,
                     * gunakan posisi soal dalam package.
                     */
                    // no_prefix: noPrefix ?? columnIndex + 1,
                    no_prefix: columnIndex + 1,
                };
                }
                return {
                    soal_id: soal.idbaris,
                    soal,
                    columnIndex,

                    /**
                     * Jika response tidak memiliki no_prefix,
                     * gunakan posisi soal dalam package.
                     */
                    // no_prefix: noPrefix ?? columnIndex + 1,
                    no_prefix: columnIndex+1
                };
            }
        );
    }
    private static bankSoalUndefined(){
        const namaTidakDikenal:string = 'Soal tidak terdeteksi'
        return {
                idbaris:0,
                fase_jenjang:[],
                /**
                 * meskipun `fase_jenjang` memungkinkan merujuk 2 kelas,
                 * property `jenjang_khusus` menandakan bahwa soal ini dikhususkan untuk kelas `jenjang_khusus`
                 */
                jenjang_khusus:0,
                /** kurikulum masih hardcode, nilai default: 'kurmer'
                 */
                kurikulum:namaTidakDikenal,
                kode_mapel:namaTidakDikenal,
                mapel_name:namaTidakDikenal,
                kd_id:0,
                kd_deskripsi:namaTidakDikenal,
                bentuk_soal:namaTidakDikenal,
                materi_pokok:namaTidakDikenal,
                indikator_soal:namaTidakDikenal,
                lk:namaTidakDikenal,
                ruang_lingkup:namaTidakDikenal,
                stimulus:'',
                pertanyaan:namaTidakDikenal,
                // jawaban:string|number|string[]|number[],
                jawaban:[],
                pembahasan_penskoran:namaTidakDikenal,
                oleh:namaTidakDikenal,
                refrensi:namaTidakDikenal,
                //-------
                auto_koreksi: 'manual',
                status: ''
        }
    }
    /**
     * Membuat map:
     *
     * soal_id -> no_prefix
     *
     * Kita cukup mengambil informasi dari response
     * pertama yang memilikinya.
     */
    private static buildNoPrefixMap(
        tagihan: TagihanHasDataResponse
    ): Map<number, number> {

        const result = new Map<number, number>();

        for ( const data of tagihan.data_response_bySiswa ) {

            const response =
                this.getResponseForPublication(
                    data.data,
                    // tagihan.paket_soal_id
                    tagihan.idbaris
                );

            if (!response) {
                continue;
            }

            for ( const item of response.respon ) {
                if (
                    item.soal_id === undefined ||
                    item.no_prefix === undefined
                ) {
                    continue;
                }

                /**
                 * Jangan overwrite nilai yang sudah ada.
                 */
                if (
                    !result.has(item.soal_id)
                ) {
                    result.set(
                        item.soal_id,
                        item.no_prefix
                    );
                }
            }
        }

        return result;
    }

    /**
     * ============================================================
     * RESPONSE SISWA
     * ============================================================
     */

    private static  buildResponseBySiswaMap(
        tagihan: TagihanHasDataResponse
    ): Map<number, NilaiSiswaAppType> {
        
        const result = new Map<number, NilaiSiswaAppType>();

        for ( const data of tagihan.data_response_bySiswa ) {
            
            // const response = this.getResponseForPublication( data.data, tagihan.paket_soal_id );
            const response = this.getResponseForPublication( data.data, tagihan.idbaris );
            
            if (!response) {
                continue;
            }

            result.set(
                // data.siswa.id,
                data.siswa.id,
                response
            );
        }

        return result;
    }

    /**
     * Mengambil response terakhir untuk
     * publikasi yang sedang dianalisis.
     *
     * Asumsi:
     * data[] sudah tersusun secara kronologis.
     */
    private static getResponseForPublication(
        data: NilaiSiswaAppType[],
        paketSoalId: number
    ): NilaiSiswaAppType | null {

        const filtered = data.filter( (item) => item.publikasi_id === paketSoalId );
        return filtered.at(-1) ?? null;
    }

    /**
     * ============================================================
     * ITEM RESPONSE
     * ============================================================
     */

    private static findResponse(
        response: RisponsePenilaianSiswa[],
        soalId: number
    ): RisponsePenilaianSiswa | undefined {
        const result = response.find( (item) => item.soal_id === soalId );
        
        return result;
    }

    /**
     * `respon` kosong/null berarti siswa
     * tidak menjawab item tersebut.
     */
    private static isAnswered(
        respon: string | null
    ): boolean {

        if (respon === null || respon === '') {
            return false;
        }

        return respon.trim() !== '';
    }

    /**
     * ============================================================
     * HELPER INTERNAL
     * ============================================================
     */

    private static sum(
        data: number[]
    ): number {

        return data.reduce(
            (total, value) =>
                total + value,
            0
        );
    }
}