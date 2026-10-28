import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { TagihanHasDataResponse } from "../../type/tagihan-assesmen-type";
import type { DataInstrumenPerKategoriAssesmen, StrukturKurikulumInKategoriAssesmenInterface } from "../types/StrukturKurikulumInKategoriAssesmenInterface";
import type { StrukturAtpInKategoriAssesmenMapperInterface, StrukturKurikulumInKategoriAssesmenMapperInterface } from "../types/StrukturKurikulumInKategoriAssesmenMapperType";
import type { KategoriAssesmenInPublikasiMapperType } from "../types/KategoriAssesmenInPublikasiMapperType";

export default class StrukturKurikulumInKategoriAssesmenBuilder{
    static build(data:TagihanHasDataResponse[]):StrukturKurikulumInKategoriAssesmenInterface[]{
        
        return []
    }
    static buildMapper(data:TagihanHasDataResponse[]):StrukturKurikulumInKategoriAssesmenMapperInterface{
        const kategoriTagihan:StrukturKurikulumInKategoriAssesmenMapperInterface = new Map();
        for(const {bank_soal_collections, tipe_assesmen, data_respons, total_instrumen,data_response_bySiswa, sebaran_kurikulum_by_bentuk_soal} of data){
            const currentTipeAsessmen= getOrCreateMap(kategoriTagihan,tipe_assesmen,()=>({
                strukturKurikulumMapper: new Map()
            }))
            const koleksiInstrumenPerBankSoal = bank_soal_collections.map(m=>m.snapshot_kurikulum?.atp_as_tp_id)
            bank_soal_collections.forEach(itemBankSoal=>{
                /** 
                 * `snapshot_kurikulum` sudah dibentuk oleh class `BankSoalCollectionsBuilder`,
                 * jadi, ketika soal tidak memiliki snapshot_kurikulum akan dikembalikan (return) ke snapshot_kurikulum default.
                 * snapshot_kurikulum default ada di `BankSoalAppUndefined.build()`
                 * */
                const {snapshot_kurikulum} = itemBankSoal;

                const {atp_as_tp_id, atp_as_tp_description, tp_as_cp_id, tp_as_cp_description, cp_id, cp_description, mapelname, kodemapel} = snapshot_kurikulum!

                const currentMapel = getOrCreateMap(currentTipeAsessmen.strukturKurikulumMapper, kodemapel,()=>({
                    mapelName: mapelname,
                    kodeMapel: kodemapel,
                    dataCpMapper: new Map()
                }));
                const currentCp = getOrCreateMap(currentMapel.dataCpMapper, cp_id, ()=>({
                    cp_id,
                    cp_description, 
                    dataTpMapper: new Map()
                }));
                const currentTp = getOrCreateMap(currentCp.dataTpMapper, tp_as_cp_id, ()=>({
                    tp_id: tp_as_cp_id, 
                    tp_as_cp_description: tp_as_cp_description,
                    dataAtpMapper: new Map()
                }));
                const currentAtp= getOrCreateMap(currentTp.dataAtpMapper, atp_as_tp_id,()=>({
                    atp_id:atp_as_tp_id,
                    atp_description: atp_as_tp_description,
                    dataTagihan: []  as  DataInstrumenPerKategoriAssesmen[]
                }));
                // const dataInstrumen = data_respons.filter(s=>s.respon.some(resTabTagihan=>resTabTagihan.atp === atp_as_tp_id)).map(m=>m.respon)
                // currentAtp.dataTagihan.push({
                //     kategori:tipe_assesmen,
                //     dataInstrumen: data
                // })

            })
        };
        
        return kategoriTagihan
    }
}