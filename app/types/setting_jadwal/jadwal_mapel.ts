import type { jp_mapelApp } from "../mapel/jp_mapel"

export type jadwalMapelSheet = {

    idbaris:number,
    idmapel:number,
    index_hari:number,
    jp:number,
    namarombel:string,
    start_at:Date,
    end_at:Date,

}
export type jadwalMapelApp = {
    idbaris:number,
    idmapel:number,
    index_hari:number,
    jp:number,
    namarombel:string,
    start_at:string,
    end_at:string,

}

export type jadwalMapelAccordTable={
    
    idbaris:number,
    jam_ke:number,
    waktu:string,
    namarombel:string,
    sn:number,
    sl:number,
    rb:number,
    km:number,
    jm:number,
    sb:number,
}
export type jadwalMapelAccordTableApp={
    
    idbaris:number,
    jam_ke:number,
    waktu:string,
    namarombel:string,
    sn?:jp_mapelApp,
    sl?:jp_mapelApp,
    rb?:jp_mapelApp,
    km?:jp_mapelApp,
    jm?:jp_mapelApp,
    sb?:jp_mapelApp,
}