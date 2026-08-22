import type { AtpKurikulumType } from "./atp-kurikulum"
import type { ElemenCpType } from "./elemen-cp"
import type { faseMerdekaType } from "./kurikulum-type"

export type protaSheet={
    // idbaris:number,
    // cp_idbaris:number,
    // tp_idbaris:number,
    // atp_idbaris:number,
    // rombel:number,
    // semester:number,
    // index_prota:number,
    // kode_mapel:string,
    // alokasi_waktu:number,
    // refrensi:string
    idbaris:number,
    cp_idbaris:number,
    tp_idbaris:number,
    atp_idbaris:number,
    rombel:string,
    semester:string,
    index_prota:number,
    kode_mapel:string,
    alokasi_waktu:number,
    refrensi:string,
    status:string

}

export type protaSheetApp={
    idbaris:number,
    cp_idbaris:number,
    tp_idbaris:number,
    atp_idbaris:number,
    rombel:string,
    semester:number[],
    index_prota:number,
    kode_mapel:string,
    alokasi_waktu:number,
    refrensi:string,
    status:string
}
export type protaApp={
    idbaris:number,
    cp:ElemenCpType,
    tp_as_cp:tp_as_cp,
    atp_as_tp:AtpKurikulumType,
    rombel:string,
    semester:number[],
    index_prota:number,
    kode_mapel:string,
    alokasi_waktu:number,
    refrensi:string
}

export type tp_as_cp={
    tp_as_cp_description:string,
    tp_as_cp_id:number,
    tab:string
}

export type ProtaOrm={
    kodemapel:string,
    fase:faseMerdekaType
    kelas:number[],
    atp_as_orm:AtpAsOrm[]
}

export type AtpAsOrm={
    idbaris_server?:number,
    atp_as_tp_description:string,
    atp_as_tp_id:number,
    tp_as_cp_description?:string,
    tp_as_cp_id?:number,
    cp_description?:string,
    cp_id?:number,
    elemen?:string,
    lingkup_materi?:string,
    kelas:number[],
    kodemapel?:string;
    mapelname?:string
    fase?:string
    invalid:boolean,
    message:string[]
}
export type ItemAtpAsProtaEditable = AtpAsOrm & {
    alokasi:number,
    index_prota?: number,
    // tgl_alokasi?:Date,
    // total_alokasi_implement?:number,
    state_modify:state_modify,
    semester:number[]
}
export type state_modify='servered'|'not_servered'|'modify';

export type DataAtpAsProtaEditable={
    data: ItemAtpAsProtaEditable[],
    total:number,
    total_in_year:number,
    protaServer:protaSheetApp[],
    rombel:string,
    kodemapel:string
}

export type koleksiMapelByJp={
    kodemapel:string,
    jadwal:mapelJpInJadwal[],
    total_jp:number,
    total_day:number,
    total_jp_in_year:number
    total_day_semester1:number,
    total_day_semester2:number,
    total_jp_semester1:number,
    total_jp_semester2:number,
}
export type mapelJpInJadwal={
    index_hari:number,
    kode_hari:'sn' | 'sl' | 'rb' | 'km' | 'jm' | 'sb'
    nama_hari:string
    count_jp:number
    count_day_in_year:number
    count_jp_in_year:number
    count_day_in_semester1:number
    count_day_in_semester2:number
    count_jp_in_semester1:number
    count_jp_in_semester2:number



}