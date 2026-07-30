import type { UserPtk } from "~/types";
import type { SiswaType } from "~/types/siswa";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export interface DataOrmSuratKeluarType extends SuratKeluarAppType{
    hasTemplate:boolean,

    /** surat dikeluarkan di tapel apa */
    tapelSurat:string,

    dataTemplate?: kontenDataTemplate
}

export interface kontenDataTemplate{
    name:string, 
    personalType?:SiswaType|UserPtk
}
