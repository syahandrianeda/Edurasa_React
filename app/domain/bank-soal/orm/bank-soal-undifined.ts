import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default class BankSoalAppUndefined{
    static build(): BankSoalAppType{
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
}