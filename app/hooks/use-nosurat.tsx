import { useMemo } from "react";
import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export default function useNoSuratFormat(currentData:SuratKeluarAppType, prefix:string){
    return useMemo(()=>{
            const noUrut = currentData.id_nosurat.padStart(3,'0');
            const namaSekolah=NAMA_SEKOLAH;
            const romawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
            const tgl = currentData.tglsurat;
            const indexBulan = tgl.getMonth();
            const tahun = tgl.getFullYear()
            const sufix = `${romawi[indexBulan]}/${tahun}`
            return `${prefix}/${noUrut}-${namaSekolah}/${sufix}`;
        },
    [prefix, currentData.nosurat, currentData.id_nosurat, currentData.tglsurat])
}