import { getNumberFromString } from "~/lib/get-number";
import type { SiswaType } from "~/types/siswa";
import KesiswaanData from "./kesiswaan-data";

export function StatistikPerRombel(data:SiswaType[], rombel:string){
    const all = data.filter(s=>
        s.aktif === 'aktif' &&
        s.jenjang === getNumberFromString(rombel) &&
        s.nama_rombel === rombel
    );
    return new KesiswaanData(all);
}
export function StatistikAllStatusPerRombel(data:SiswaType[], rombel:string){
    const all = data.filter(s=>
        // s.aktif !== 'non-aktif' &&
        // s.jenjang === getNumberFromString(rombel) &&
        s.nama_rombel === rombel
    );
    return new KesiswaanData(all);
}
export function StatistikPerJenjang(data:SiswaType[], rombel:string){
    const all = data.filter(s=>
        s.aktif === 'aktif' &&
        s.jenjang === getNumberFromString(rombel) 
    );
    return new KesiswaanData(all);
}

export function KoleksiTahunMasuk(data:SiswaType[], rombel:string){
    const all = data.filter(s=>
        s.masuk_tgl
    );
    return new KesiswaanData(all).collectAllYearsByKey('masuk_tgl').sort((a,b)=>b-a);
}