import type { InterfaceMapel } from "./mapel";

export interface jp_mapelSheet{
    // idbaris:number,
    // idmapel:number,
    // namarombel:string,
    // jenjang:number,
    // jp:number,
    // index_mapel:number,
    // status:string
        idbaris:number,
        kode:string,
        idmapel:number,
        nama_mapel:string,
        jp_perminggu:number,
        following_students:number,
        required_penganut?:string,
        nama_mapel_ijazah:string,
        status:string,
        nama_rombel?:string,
        index_in_rombel:number,

}
export interface jp_mapelApp extends jp_mapelSheet{
    // idbaris:number,
    // idmapel:number,
    // namarombel:string,
    // jenjang:number,
    // jp:number,
    // index_mapel:number,
    // status:string
        source:InterfaceMapel
}