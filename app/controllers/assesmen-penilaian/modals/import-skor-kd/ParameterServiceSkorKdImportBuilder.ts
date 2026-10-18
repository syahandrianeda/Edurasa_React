import type { TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import type { ParameterServiceSkorKdImport } from "./ParameterServiceSkorKdImport";
import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";

export default class ParameterServiceSkorKdImportBuilder{
    static build(dataSource:TemplateImportSkorToKd[],jenjang: number,currentData: TagihanHasDataResponse):ParameterServiceSkorKdImport{
        const tab = currentData.tipe_assesmen;
        const jenis_tagihan = currentData.jenis_tagihan.kode;
        const publikasi_id = currentData.idbaris;
        
        const  keyNumeric = currentData.keySkorKD.map(key=>{
           const newKey = jenis_tagihan+'_'+key + '_' + publikasi_id
                return {
                    [newKey]: 0
                }
        }).reduce((a,b)=>({...a,...b}));

        const data:ValidatedResponseSiswa[] = dataSource.map(m=>{
            const {siswa_id, nama_siswa, rombel, dataSkorDecision, jenisTagihan, publikasi_id} = m;
            const sebaran = Object.entries(dataSkorDecision).map(([key,value])=>{
                const newKey = jenisTagihan+'_'+key + '_' + publikasi_id
                return {
                    [newKey]: value===null?undefined:value
                }
            }).reduce((a,b)=>({...a,...b}));

            return {
                idbaris: 0,
                siswa_id,
                nama_siswa,
                rombel,
                ...sebaran
            }
        })
        console.log({dataSource, data})
        return {
            data,
            jenjang,
            tab,
            keyNumeric
        }
    }
}