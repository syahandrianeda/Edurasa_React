import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

export interface SanitizerKodeMapelRaportType{
    kodeMapel:jp_mapelApp['kode']
}
export function SanitizerKodeMapelRaport<T extends SanitizerKodeMapelRaportType>(array: T[], kodeMapel: string[]): T[]{
    return array.filter(s=>kodeMapel.includes(s.kodeMapel))
}
