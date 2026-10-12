import type { countBentukSoalPaketBaku } from "~/types/bank-soal/entities/countBentukSoalPaketBaku";
import type { CountBentukSoalPaket } from "../entities/count-bentuk-soal-paket";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PaketSoalStruktur } from "./PaketSoalStrukturType";
import BankSoalAppUndefined from "~/domain/bank-soal/orm/bank-soal-undifined";
import type { StrukturItemInstrumenGlobal } from "../entities/StrukturItemInstrumenGlobalType";

export class PaketSoalStrukturBuilder{
    static buildFromCountBentukSoalPaket(
        bankSoalCollections:(BankSoalAppType|undefined)[], 
        strukturNaskah:CountBentukSoalPaket[]
    ):PaketSoalStruktur[] {
        const bankSoalUndefined = BankSoalAppUndefined.build();
        const result:PaketSoalStruktur[]=[];

        let indexGlobal:number = 0;
        
        for(const struktur of strukturNaskah){
            const currentBentukSoal = struktur.dataBentukSoal;
            const currentCountBentukSoal = struktur.count;

            const dataSoalPerBentukSoal:StrukturItemInstrumenGlobal[]=[]
            
            /** isikan masing-masing soal berdasarkan count */
            for(let i:number = 0; i < currentCountBentukSoal ; i++){
                /** no_prefix selalu dimulai angka 1 tiap bentuk soal */;
                const no_prefix = (i + 1);
                const index = indexGlobal;
                const foundItemSoal = bankSoalCollections[indexGlobal];
                const soal = foundItemSoal ? foundItemSoal : bankSoalUndefined;
                dataSoalPerBentukSoal.push({
                    index, 
                    no_prefix,
                    soal_id: soal.idbaris,// ?? 0,
                    atp: soal.kd_id ,//?? 0,
                    bentuk_soal: currentBentukSoal.name,

                    soal,
                    bentuk_soal_detail:currentBentukSoal,
                    atp_soal:soal.snapshot_kurikulum

                });
                indexGlobal++;
            }
            result.push({
                ...struktur,
                soal: dataSoalPerBentukSoal
                } )
        }
        
        return result;
    }
}

