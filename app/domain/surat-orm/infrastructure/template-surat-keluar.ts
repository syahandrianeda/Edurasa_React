import { KlasifikasiNoSurat, type KlasifikasiSuratKemendegriType } from "~/domain/surat/klasifikasi-surat-permendagri";
import type { DataOrmSuratKeluarType, kontenDataTemplate } from "../entity/surat-orm-type";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { currentTapel } from "~/lib/current-tapel";
import type { UserPtk } from "~/types";

interface TemplateSuratKeluarType{
    hasTemplate:boolean,
    dataTemplate?: kontenDataTemplate
}

export default class TemplateSuratKeluar{
    private resultTemplate:TemplateSuratKeluarType = {
        hasTemplate:false,
        dataTemplate:undefined
    }
    constructor(private readonly dataKlasifikasi:KlasifikasiSuratKemendegriType[] = KlasifikasiNoSurat){

    }
    get dataKlasifikasiHasTemplate():KlasifikasiSuratKemendegriType[]{
        return this.dataKlasifikasi.filter(s=>s.template)
    }
    setHasTemplate(template:string):this{
        
        const found = this.dataKlasifikasiHasTemplate.find(s=>s.template === template)
        this.resultTemplate.hasTemplate = Boolean(found?.template);
        if(found){
            this.resultTemplate.dataTemplate = {
                name: found.template!,
                // personalType:{id:2} as UserPtk
            }
        }
        return this;
    }
    build(){
        return structuredClone(this.resultTemplate);
    }
}