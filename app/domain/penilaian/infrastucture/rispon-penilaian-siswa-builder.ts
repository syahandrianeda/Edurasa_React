import BankSoalAppUndefined from "~/domain/bank-soal/orm/bank-soal-undifined";
import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import type { RisponseDanTemplateKoreksiType } from "./RisponseDanTemplateKoreksiType";

/**
 * @deprecated gunakan RisponseNilaiSiswaBuilder untuk mendapatkan `respon` atau 
 */
export default class RisponsePenilaianSiswaBuilder{
    static build(
        bankSoalCollections: (BankSoalAppType|undefined)[], 
        strukturNaskah: CountBentukSoalPaket[], 
        responSheet: RisponsePenilaianSiswa[]
    ): RisponseDanTemplateKoreksiType {
        
        const respon:RisponsePenilaianSiswa[]=[];
        const sebaran:TemplateKoreksiSiswaType[]=[]
        let indexGlobal:number = 0;
        const bankSoalUndefined = BankSoalAppUndefined.build();
        
        for(const strukturSoal of strukturNaskah){
            const bentukSoal = strukturSoal.dataBentukSoal;
            const dataSoalCurrentBentukSoal = bankSoalCollections;//.filter(s=>s?.bentuk_soal === bentukSoal.name);
            const dataResponCurrentBentukSoal = responSheet.filter(s=>s.bentuk_soal === bentukSoal.name);
            const currentBentukSoalDataTemplateKoreksi:DataTemplateKoreksiSiswa[]=[];

            /** 
             * membuat data respon berdasarkan struktur soal 
             * jumlah soal ditentukan 
             */
            for(let i:number = 0 ; i < strukturSoal.count ; i++){
                const no_prefix = (i+1);
                const bankSoal = dataSoalCurrentBentukSoal[indexGlobal] 
                                ? dataSoalCurrentBentukSoal[indexGlobal] 
                                : bankSoalUndefined;
                const foundRespon = dataResponCurrentBentukSoal.find(s=>s.no_prefix === no_prefix);
                
                const skor = responSheet[indexGlobal]?.skor ?? 0;
                
                const rispon:RisponsePenilaianSiswa = {
                    index: indexGlobal,
                    no_prefix,
                    soal_id: bankSoal?.idbaris ?? 0,
                    atp: bankSoal?.kd_id ?? 0,
                    bentuk_soal:bentukSoal.name,
                    skor,
                    respon:foundRespon?.respon ?? null,

                    atp_soal:bankSoal?.snapshot_kurikulum,
                    soal:   bankSoal,
                    bentuk_soal_detail:bentukSoal
                    
                }
                respon.push(rispon);
                const dataItem:DataTemplateKoreksiSiswa = {
                        soal: bankSoal,
                        no_prefix,
                        respon: rispon
                    }
                currentBentukSoalDataTemplateKoreksi.push(dataItem);

                
                indexGlobal++
            }
            const currentSebaranBentukSoal: TemplateKoreksiSiswaType = {
                bentuk_soal: bentukSoal,
                data: currentBentukSoalDataTemplateKoreksi
            }
            sebaran.push(currentSebaranBentukSoal);
        }
        return {
            respon,
            sebaran
        }
                
    }
    static buildRisponse( bankSoalCollections: (BankSoalAppType|undefined)[], strukturNaskah: CountBentukSoalPaket[], responSheet: RisponsePenilaianSiswa[] ): RisponsePenilaianSiswa[] {
        const bankSoalUndefined = BankSoalAppUndefined.build();
        const result:RisponsePenilaianSiswa[]=[];

        let indexGlobal:number = 0;
        
        for(const struktur of strukturNaskah){
            const currentBentukSoal = struktur.dataBentukSoal;
            const currentCountBentukSoal = struktur.count;
            
            /** isikan masing-masing soal berdasarkan count */
            for(let i:number = 0; i < currentCountBentukSoal ; i++){
                /** no_prefix selalu dimulai angka 1 tiap bentuk soal */;
                const no_prefix = (i + 1);
                const index = indexGlobal;
                const foundItemSoal = bankSoalCollections[indexGlobal];
                const foundRespon = responSheet.find(s=>s.no_prefix === no_prefix && s.bentuk_soal === struktur.dataBentukSoal.name);
                const soal = foundItemSoal ? foundItemSoal : bankSoalUndefined;
                const respon = foundRespon? foundRespon.respon: null;
                const skor = responSheet[indexGlobal]?.skor ?? 0;
                result.push({
                    index, 
                    no_prefix,
                    bentuk_soal: currentBentukSoal.name,
                    respon,
                    soal_id: soal.idbaris,
                    atp: soal.kd_id,
                    skor

                });
                indexGlobal++;
            }
        }
        
        return result;
    }
    static buildTemplateKoreksi(bankSoalCollections: (BankSoalAppType|undefined)[], strukturNaskah: CountBentukSoalPaket[], responSheet: RisponsePenilaianSiswa[]):TemplateKoreksiSiswaType[]{
            const result:TemplateKoreksiSiswaType[]=[];
            let indexGlobal:number = 0;
            const bankSoalUndefined:BankSoalAppType = BankSoalAppUndefined.build();
        
            for(const struktur of strukturNaskah){
                const currentBentukSoal = struktur.dataBentukSoal;
                const currentCountBentukSoal = struktur.count;
                const currentBentukSoalDataTemplateKoreksi:DataTemplateKoreksiSiswa[]=[];
                /** isikan masing-masing soal berdasarkan count */
                for(let i:number = 0; i < currentCountBentukSoal ; i++){
                    /** no_prefix selalu dimulai angka 1 tiap bentuk soal */;
                    const no_prefix = (i + 1);
                    const foundItemSoal = bankSoalCollections[indexGlobal];
                    const foundRespon = responSheet.find(s=>s.no_prefix === no_prefix && s.bentuk_soal === struktur.dataBentukSoal.name);
                    const soal = foundItemSoal ? foundItemSoal : bankSoalUndefined;
                    const skor = responSheet[indexGlobal]?.skor ?? 0;
                    const rispon:RisponsePenilaianSiswa = {
                        index: indexGlobal,
                        no_prefix,
                        soal_id: soal.idbaris ?? 0,
                        atp: soal.kd_id ?? 0,
                        bentuk_soal:currentBentukSoal.name,
                        skor,
                        respon:foundRespon?.respon ?? null,

                        atp_soal:soal.snapshot_kurikulum,
                        soal:soal,
                        bentuk_soal_detail:currentBentukSoal
                    };
                    
                    currentBentukSoalDataTemplateKoreksi.push({
                        soal,
                        no_prefix,
                        respon: rispon
                    })
                    
                    indexGlobal++;
                }
                
                result.push({
                    bentuk_soal:currentBentukSoal,
                    data:currentBentukSoalDataTemplateKoreksi
                })
            }
        
        return result;
    }
}