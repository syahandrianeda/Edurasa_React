import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { KoleksiMapelPaketSoal } from "~/domain/paket-soal/entities/koleksi-mapel-paket-soal";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";
import type { FormatElemen, ListBentukSoalType } from "../bentuk-soal-type";

export interface PaketSoalAppType{
    idbaris:number,
    target_asesmen:'rombel'|'siswa'
    target_rombel:string[],
    nama_paket:string,
    lintas_mapel:boolean,
    kode_mapel:string[],
    id_banksoal:number[],
    json_setting?: PraSettingBaku,
    json_desain: DataSoalDesignBaku
}

export interface PraSettingBaku{
        identitas?           : IdentitasKontenPaket,
        dataKopCustom       : string[],
        koleksi_mapel?       : KoleksiMapelPaketSoal, 
        data_target         : string[]
        count_bentuk_soal   : countBentukSoalPaketBaku[],
        kurikulum           : number[];//AtpAsOrm[]
        nomorSoalUrut       : boolean
}

export interface countBentukSoalPaketBaku{
    dataBentukSoal:ListBentukSoalType['name'],
    count:number
    description:string
}
export interface DataSoalDesignBaku{
    startNumber:number,
    bentukSoal:ListBentukSoalType['name']
    petunjukPengisian:string,
    dataSoal:DisplayFormatItemSoalBaku[]
}

export interface DisplayFormatItemSoalBaku{
    index:number,
    no_soal:number,
    idSoal:number,
    format_display?:FormatElemen,
    bentuk_soal?:ListBentukSoalType,
    showStimulus:boolean
}
