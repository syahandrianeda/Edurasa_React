import ImportNilaiByKdToSheetKategori from "~/controllers/assesmen-penilaian/modals/Import-nilai-by-kd-to-sheet-kategori";
import type { ImportKategoriAssesmenSkorKdRepositoryInterface } from "~/domain/interfaces/import-kategori-assesmen-skor-kd-repo-interface";
import type { ImportKategoriAssesmenSkorKdServiceInterface } from "~/domain/interfaces/import-kategori-assesmen-skor-kd-service-interface";
import ImportKategoriAssesmenSkorKdRepository from "../repositories/ImportKategoriAssesmenSkorkdRepository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";
import { helperFormatNumberInKategoriTagihan } from "~/lib/helper-format-number-koreksian";
import type { ParameterServiceSkorKdImport } from "~/controllers/assesmen-penilaian/modals/import-skor-kd/ParameterServiceSkorKdImport";
import { isDev, namaTab } from "~/lib/nama-tab-environment";

export default class ImportKategoriAssesmenSkorKdService implements ImportKategoriAssesmenSkorKdServiceInterface{
    constructor(
        public repo:ImportKategoriAssesmenSkorKdRepositoryInterface = new ImportKategoriAssesmenSkorKdRepository()
    ){
        
    }
    async update(param: ParameterServiceSkorKdImport): Promise<ApiResponse<ValidatedResponseSiswa>> {
        try{
            const formatParamLanjutan = helperFormatNumberInKategoriTagihan(param.keyNumeric)
            const idss = this.repo.createIdssJenjang(param.jenjang)
            const tab = namaTab(param.tab)
            const dataParam = param.data;
            const data = {
                    idss,
                    tab,
                    data:JSON.stringify(dataParam),
                    key_match:'siswa_id',
                    key_index:'idbaris',
                    schema:JSON.stringify({
                        idbaris:'number',
                        siswa_id: 'number',
                        ...formatParamLanjutan
                    }),
                    action:'upsert',
                }
                    
                    
            return await this.repo.update(data);

        }catch(er){
            console.log(er);
            throw er
        }
    }
    async create(param: ParameterServiceSkorKdImport): Promise<ApiResponse<ValidatedResponseSiswa>> {
        const formatParamLanjutan = helperFormatNumberInKategoriTagihan(param.keyNumeric)
        const idss = this.repo.createIdssJenjang(param.jenjang)
        const tab = param.tab;//isDev? 'trial_'+ param.tab: param.tab;
        const dataParam = param.data;
        const data = {
                idss,
                tab,
                data:JSON.stringify(dataParam),
                key_match:'siswa_id',
                key_index:'idbaris',
                schema:JSON.stringify({
                    idbaris:'number',
                    siswa_id: 'number',
                    ...formatParamLanjutan
                }),
                action:'upsert'
            }
                
                
        return await this.repo.update(data);
    }
}