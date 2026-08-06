import type { KlasifikasiSuratProps } from "~/controllers/surat/modals/fields/klasifikasi-surat";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { DataOrmSuratKeluarType } from "./entity/surat-orm-type";
import TemplateSuratKeluar from "./infrastructure/template-surat-keluar";
import { currentTapel } from "~/lib/current-tapel";
import type RiwayatIdAkunClass from "../tendik/riwayat-id-akun-class";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import dtoSppd from "~/dtos/dto-sppd";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default class OrmSuratKeluar{
    private _data:DataOrmSuratKeluarType[];
    // private readonly instanceKlasifikasiSurat:TemplateSuratKeluar = new TemplateSuratKeluar();
    constructor(
        private readonly dtoSuratKeluar:SuratKeluarAppType[],
        private readonly instanceRiwayatAkun:RiwayatIdAkunClass,
        private readonly dtoSppd: SppdAppType[] = [],
        private readonly suratMasuk: SuratMasukAppType[] = [],
    ){
        this._data = [];
    }
    
    get data(){
        return this._data.filter(s=>s.status === "");
    }

    build():this{
        
        for(const item of this.dtoSuratKeluar){
            
            const tapelSurat = currentTapel({variant:'short', date:item.tglsurat});
            const instanceKlasifikasiSurat = new TemplateSuratKeluar(this.instanceRiwayatAkun, this.dtoSppd);
            const dataSuratMasuk = this.suratMasuk.find(s=>s.idbaris === item.refrensi_suratmasuk)
            const cekTemplate = instanceKlasifikasiSurat
                                    .setHasTemplate(item.indekssurat)
                                    .setPersonalPtk(item.target_ptk,item.tglsurat, item.idbaris, item.nosurat)
                                    // .setPersonalSiswa(item.target_siswa)
                                    .build();
            const newItem = {...item, tapelSurat, dataSuratMasuk, ...cekTemplate};
            this._data.push(newItem)
        }
        
        return this;
    }


}