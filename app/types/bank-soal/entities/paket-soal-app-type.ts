import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { PraSettingBaku } from "./PraSettingBaku";
import type { PublikasiPaketAppType, PublikasiPaketAppValidWithPaketSoal } from "./publikasi-paket-app-type";

export interface PaketSoalAppType{
     idbaris:number,
        target_asesmen: TypePaketSoal,
        target_rombel:string,
        nama_paket:string,
        lintas_mapel:boolean,
        kode_mapel:string[],
        id_banksoal:number[],
        // json_setting?: PraSettingBaku,
        json_setting?: PraSettingPaket,
        start_time:Date,
        id_file_json?:string, 
        durasi:number,
        kurikulum_name:string,
        user:string,
        status:string,
        is_complete:boolean,
        mapel_name:string[]
}

export interface PaketSoalAppWithPublikasi extends PaketSoalAppType{
        // data_publikasi: PublikasiPaketAppType[]
        data_publikasi: PublikasiPaketAppValidWithPaketSoal[]
}

