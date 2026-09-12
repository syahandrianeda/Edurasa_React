import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket"

export interface PaketSoalSheetType{
    idbaris:number,
    target_asesmen: TypePaketSoal,
    target_rombel:string,
    nama_paket:string,
    lintas_mapel:number,
    kode_mapel:string,
    id_banksoal:string,
    json_setting?: string,
    // json_desain:string
    start_time:string,
    durasi:number,
    kurikulum_name:string,
    user:string
}