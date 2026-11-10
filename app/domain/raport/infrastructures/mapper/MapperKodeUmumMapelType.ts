import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

export type MapperKodeUmumMapelType = Map<string, { nama_mapel_ijazah: string; mapel: jp_mapelApp[]; }>;

export default class MapelUmumRaportBuilder {
    
    static buildMapper(mapelRombel: jp_mapelApp[]): MapperKodeUmumMapelType {
        const mapperKodeUmumMapel: MapperKodeUmumMapelType = new Map();
        
        for (const mapel of mapelRombel) {
            const { source, nama_mapel_ijazah } = mapel;
            const kodeUmum = source.kode_umum;
            const currentMapelUmum = getOrCreateMap(mapperKodeUmumMapel, kodeUmum, () => ({
                nama_mapel_ijazah,
                mapel: []
            }));
            currentMapelUmum.mapel.push(mapel);
        }

        return mapperKodeUmumMapel;
    }

    static build(mapel:jp_mapelApp[]){
        const mapper = this.buildMapper(mapel);
        return [...mapper.values()]
    }
    
}
