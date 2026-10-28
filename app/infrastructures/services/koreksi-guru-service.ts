import type { KoreksiGuruRepositoryInterface } from "~/domain/interfaces/koreksi-guru-repository-interface";
import type { KoreksiGuruServiceInterface } from "~/domain/interfaces/koreksi-guru-service-interface";
import KoreksiGuruRepository from "../repositories/koreksi-guru-repository";
import type { ApiResponse } from "~/configs/appscript-config";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import { getNumberFromString } from "~/lib/get-number";
import { isDev, namaTab } from "~/lib/nama-tab-environment";
import { helperFormatNumberInKategoriTagihan, helperFormatNumberInResponTagihan } from "~/lib/helper-format-number-koreksian";
import { store } from "~/context-reduct/redux-provider";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import helperCreateTypeNumberFormatSpreadsheet from "~/lib/helper-create-type-number-format-spreadsheet";

export default class KoreksiGuruService implements KoreksiGuruServiceInterface{
    constructor(
        public Repo: KoreksiGuruRepositoryInterface = new KoreksiGuruRepository()
    ) {}

    async update(paramUtama: NilaiSiswaSheetType, paramLanjutan:Record<string,any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        /** cari dulu `param` utama atau param yang hanya punya `key = tipe_assesmen` */
        
        const rombel = paramUtama.rombel;
        const tipe_assesmen = paramUtama.tipe_assesmen;
        const jenjang = getNumberFromString(rombel);
        const targetFirstTab = namaTab(`respon_tagihan_${jenjang}`);
        const targetSecondTab = namaTab(tipe_assesmen);
        const idss = this.Repo.repoIdsNilai(jenjang);
        const formatParamUtama = helperFormatNumberInResponTagihan(paramUtama);

        // const paramCheckKeyLanjutan  = this.helperMergeParamLanjutan(tipe_assesmen, paramLanjutan)
        const paramCheckKeyLanjutan  = helperCreateTypeNumberFormatSpreadsheet(tipe_assesmen, paramLanjutan)
        const formatParamLanjutan = helperFormatNumberInKategoriTagihan(paramCheckKeyLanjutan );
        
        const data = [
            {
                idss,
                tab: targetFirstTab,
                data:JSON.stringify([paramUtama]),
                key_match:'idbaris',
                key_index:'idbaris',
                schema: JSON.stringify({
                    idbaris:'number',
                    start_time:'datetime',
                    paket_soal_id:'number',
                    end_time:'datetime',
                    publikasi_id: 'number',
                    siswa_id: 'number',
                    ...formatParamUtama
                })
            },
            {
                idss,
                tab:targetSecondTab,
                data:JSON.stringify([paramLanjutan]),
                key_match:'siswa_id',
                key_index:'idbaris',
                schema:JSON.stringify({
                    idbaris:'number',
                    siswa_id: 'number',
                    ...formatParamLanjutan
                })
            }
        ]
        const parameter = {
            action: 'upsertMultipleTab',
            data:JSON.stringify(data)
        }
        console.log({parameter})
        return await this.Repo.update(parameter)
    }

    // helperMergeParamLanjutan(tipe_assesmen:KategoriTagihanType, paramLanjutan:Record<string, any>){
    //     const st = store.getState();
    //     const rombel = paramLanjutan.rombel;
    //     const jenjang = getNumberFromString(rombel);
    //     switch (tipe_assesmen){
    //         case 'harian' :{
    //             const found = st.harian.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //             return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         }
    //         case 'mid_semester' :{
    //             const found = st.midSemester.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //             return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         }
    //         case 'akhir_semester' :{
    //             const found = st.akhirSemester.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //             return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         }
    //         case 'ujian_sekolah' :{
    //             const found = st.us.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //             return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         }
    //         case 'remedial_pengayaan' :{
    //             const found = st.remdialPengayaan.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //             return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         }
    //         // default:{
    //         //      const found = st.harian.data.find(s=>s.jenjang === jenjang)?.objekKosong;
    //         //     return found ? {...found, ...paramLanjutan}:paramLanjutan;
    //         // }
    //     }
    // }

    async create(paramUtama: Record<string, any>, paramLanjutan:Record<string,any>): Promise<ApiResponse<NilaiSiswaSheetType>> {
        /** cari dulu `param` utama atau param yang hanya punya `key = tipe_assesmen` */
        const rombel = paramUtama.rombel;
        const tipe_assesmen = paramUtama.tipe_assesmen;
        const jenjang = getNumberFromString(rombel);
        const targetFirstTab = namaTab(`respon_tagihan_${jenjang}`);
        const targetSecondTab = namaTab(tipe_assesmen);
        
        const data = [
            {
                idss:'',
                tab: targetFirstTab,
                data:JSON.stringify(paramUtama)
            },
            {
                idss:'',
                tab:targetSecondTab,
                data:JSON.stringify(paramLanjutan)
            }
        ]
        const parameter = {
            action: 'upsertMultipleTab',
            data
        }
        return await this.Repo.update(parameter)
    }

    async delete(param:Record<string, any>):Promise<ApiResponse<NilaiSiswaSheetType>>{
        const rombel = param.rombel;
        
        const jenjang = getNumberFromString(rombel);
        const targetFirstTab = namaTab(`respon_tagihan_${jenjang}`);
        
        const idss = this.Repo.repoIdsNilai(jenjang);
        const formatParamUtama = helperFormatNumberInResponTagihan(param as NilaiSiswaSheetType);
        const parameter = {
                idss,
                tab: targetFirstTab,
                data:JSON.stringify([param]),
                key_match:'idbaris',
                key_index:'idbaris',
                schema: JSON.stringify({
                    idbaris:'number',
                    start_time:'datetime',
                    paket_soal_id:'number',
                    end_time:'datetime',
                    publikasi_id: 'number',
                    siswa_id: 'number',
                    ...formatParamUtama
                }),
                action:'upsert'
            }
        
        return await this.Repo.create(parameter);
    }

   

   
}