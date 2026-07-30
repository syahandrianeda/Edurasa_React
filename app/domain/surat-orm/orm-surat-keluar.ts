import type { KlasifikasiSuratProps } from "~/controllers/surat/modals/fields/klasifikasi-surat";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { DataOrmSuratKeluarType } from "./entity/surat-orm-type";
import TemplateSuratKeluar from "./infrastructure/template-surat-keluar";
import { currentTapel } from "~/lib/current-tapel";

export default class OrmSuratKeluar{
    private _data:DataOrmSuratKeluarType[];
    private readonly instanceKlasifikasiSurat:TemplateSuratKeluar = new TemplateSuratKeluar();
    constructor(private readonly dtoSuratKeluar:SuratKeluarAppType[]){
        this._data = [];
    }
    
    get data(){
        return this._data;
    }

    build():this{
        
        for(const item of this.dtoSuratKeluar){
            const tapelSurat = currentTapel({variant:'short', date:item.tglsurat});
            const cekTemplate = this.instanceKlasifikasiSurat
                                    .setHasTemplate(item.indekssurat)
                                    // .setPersonalPtk(item.target_ptk)
                                    // .setPersonalSiswa(item.target_siswa)
                                    .build()
            const newItem = {...item, tapelSurat, ...cekTemplate};
            this._data.push(newItem)

            
        }
        
        return this;
    }


}