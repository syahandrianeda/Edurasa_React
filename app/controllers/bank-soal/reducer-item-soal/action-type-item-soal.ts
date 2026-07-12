import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type"
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm"

/**
 * idbaris:0,
    fase_jenjang:propertyKuriklum?.kelas ??[],
    jenjang_khusus:resolveNumber(Rombel),
    kurikulum:'kurmer',
    kode_mapel:propertyKuriklum?.kodemapel ?? '',
    mapel_name:fokusMapel,
    kd_id:propertyKuriklum?.atp_as_tp_id ?? 0,
    kd_deskripsi:propertyKuriklum?.atp_as_tp_description ?? '',
    bentuk_soal:bentukSoal?.name ??'',
    materi_pokok:'',
    indikator_soal:'',
    lk:'',
    ruang_lingkup:'',
    stimulus:'',
    pertanyaan:'',
    jawaban:'',//string|number|string[]|number[],
    pembahasan_penskoran:'',//string,
    // json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    snapshot_kurikulum:propertyKuriklum,
    oleh:me?.name,
    refrensi:'',
 */
export type BankSoalAction =
    | setIdbaris
    | setBentukSoal
    | setCreatorItemSoal
    | removeJson_alat_jawab
    | setPropertyKurikulum
    | setItemSoal
    | resetItemSoal
    | initializeItemSoal
    ;

export interface setIdbaris{
    type: 'idbaris',
    payload:number
}
export interface removeJson_alat_jawab{
    type:'remove_json_alat_jawab',
    //payload: 'json_alat_jawab'
    // payload?:string
};
export interface setPropertyKurikulum{
    type:'propertyKurikulum',
    payload:AtpAsOrm
}
export interface setBentukSoal{
    type:'bentuk_soal',
    payload:ListBentukSoalType
}
export interface setCreatorItemSoal{
    type:'creator',
    payload:string
}
export interface setItemSoal{
    type:'set_item_soal',
    payload:Partial<BankSoalAppType>;
}
export interface resetItemSoal{
    type: 'reset'
}
export interface initializeItemSoal{
    type: "initialize",
    payload: {
        kurikulum:AtpAsOrm,
        bentukSoal:ListBentukSoalType,
        creator:string,
        jenjang:number,
        mapel:string,
    },
}
// export interface setFase_jenjang{
//     type: 'fase_jenjang',
//     payload: number[]
// }
// export interface setJenjang_khusus{
//     type:'jenjang_khusus',
//     payload:number
// }
// export interface setKurikulum{
//     type: 'kurikulum',
//     payload:string
// }
// export interface setKode_mapel{
//     type:'kode_mapel',
//     payload:string
// }
