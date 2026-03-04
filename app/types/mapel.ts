import type { Agama } from "./enums/agama"

export interface InterfaceMapel {
    id:number,
    nama:string,
    kode:string,
    kode_umum:string,
    muatan:string, // Kelompok Mapel (nasional dan lokal)
    grup:string, // group A/B
    kelompok:string // kelompok Agama atau umum,
    penganut?:Agama
}
export interface MapelRaportRombel{
    id:number,
    rombel:string,
    mapel:InterfaceMapel[],
    kelompok_agama:Agama[],
    kelompok_umum:string[]
}