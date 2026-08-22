import type { AtpAsOrm } from "../kurikulum/prota-orm";
import type { BenarSalahType } from "./bentuk-soal/benar-salah-type";
// import type { PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "./bentuk-soal-type";
import type { JsonAlatJawab } from "./bentuk-soal/json-alat-jawab-type";
import type { MenjodohkanType } from "./bentuk-soal/menjodohkan-type";
import type { PgKompleksType } from "./bentuk-soal/pg-kompleks-type";
import type { PgTunggalType } from "./bentuk-soal/pg-type";

export interface BankSoalSheetType{
    idbaris: number,
    fase_jenjang: string,
    jenjang_khusus: number,
    kurikulum: string,
    kode_mapel: string,
    mapel_name: string,
    kd_id: number,
    kd_deskripsi: string,
    bentuk_soal: string,
    materi_pokok: string,
    indikator_soal: string,
    lk: string,
    ruang_lingkup: string,
    stimulus: string,
    pertanyaan: string,
    auto_koreksi: string,
    jawaban: string,
    pembahasan_penskoran: string,
    json_alat_jawab: string,
    snapshot_kurikulum: string,
    oleh: string,
    refrensi: string,


};

export interface BankSoalAppType{
    /** idbaris untuk idbaris di sheet */
    idbaris:number,
    /** fase soal ini merujuk pada atp, 
     * jika atp digunakan di 2 kelas, maka  soal ini 
     * berpotensi untuk digunakan di 2 kelas itu
     * */
    fase_jenjang:number[],
    /**
     * meskipun `fase_jenjang` memungkinkan merujuk 2 kelas,
     * property `jenjang_khusus` menandakan bahwa soal ini dikhususkan untuk kelas `jenjang_khusus`
     */
    jenjang_khusus:number,
    /** kurikulum masih hardcode, nilai default: 'kurmer'
     */
    kurikulum:string,
    kode_mapel:string,
    mapel_name:string,
    kd_id:number,
    kd_deskripsi:string,
    bentuk_soal:string,
    materi_pokok:string,
    indikator_soal:string,
    lk:string,
    ruang_lingkup:string,
    stimulus:string,
    pertanyaan:string,
    jawaban:string|number|string[]|number[],
    pembahasan_penskoran:string,
    // json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    // json_alat_jawab?: JsonAlatJawab
    json_alat_jawab?:JsonAlatJawabTupple
    snapshot_kurikulum?: AtpAsOrm,//SnapshotAtpType,
    oleh:string,
    refrensi:string,
    //-------
    auto_koreksi: string,

}
export type JsonAlatJawabTupple = 
    | PgTunggalType
    | PgKompleksType
    | MenjodohkanType
    | BenarSalahType;

/** ganti dengan AtpAsOrm
 * ---------
 * type AtpAsOrm tidak punya ini:
 * ----------------------
 *  atp_description:string,
    atp_id:number,
    tp_description:string,
    tp_id:number,
    -----------------------
 */
export interface SnapshotAtpType{
    atp_description:string,
    atp_id:number,
    tp_description:string,
    tp_id:number,
    cp_description:string,
    cp_id:number,
    kelas:number[],
    kodemapel:string;
    fase:string
}

