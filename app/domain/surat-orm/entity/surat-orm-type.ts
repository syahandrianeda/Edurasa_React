import type { templateSuratType } from "~/domain/surat/template-surat";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export interface DataOrmSuratKeluarType extends SuratKeluarAppType{
    hasTemplate:boolean,

    /** surat dikeluarkan di tapel apa */
    tapelSurat:string,

    dataTemplate?: kontenDataTemplate

    dataSuratMasuk?:SuratMasukAppType
    
}

export interface kontenDataTemplate{
    name:templateSuratType, 
    personalSppdType?:SppdAppType[]
}

