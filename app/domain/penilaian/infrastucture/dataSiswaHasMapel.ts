import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { SiswaType } from "~/types/siswa";

export type DataSiswaHasMapelType = {
    dataSiswa: SiswaType,
    mapel:jp_mapelApp[]
}
export function dataSiswaHasMapel(siswa: SiswaType[], data: jp_mapelApp[]):DataSiswaHasMapelType[] {
    return siswa.map(currentSiswa => {
        const mapel = data.filter(s => s.data_students.some(siswaMapel => siswaMapel.id === currentSiswa.id));
        return {
            dataSiswa: currentSiswa,
            mapel
        };
    });
}
