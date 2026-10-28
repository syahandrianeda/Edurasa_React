import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { SiswaType } from "~/types/siswa";

export function dataSiswaInMapel(data:jp_mapelApp[], kodeMapel:string):SiswaType[]{
    const foundMapel = data.find(s=>s.kode === kodeMapel);
    if(foundMapel){
        return foundMapel.data_students;
    }
    return []
}
