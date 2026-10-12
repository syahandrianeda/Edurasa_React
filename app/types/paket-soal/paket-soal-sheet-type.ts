import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket"

export interface PaketSoalSheetType{
    idbaris:number,
    target_asesmen: TypePaketSoal,
    target_rombel:string,
    nama_paket:string,
    lintas_mapel:number,
    kode_mapel:string,
    id_banksoal:string,
    json_setting: string,
    start_time:string,
    id_file_json?:string,
    durasi:number,
    kurikulum_name:string,
    user:string,
    status:string,
    is_complete:number, 
    mapel_name:string
}