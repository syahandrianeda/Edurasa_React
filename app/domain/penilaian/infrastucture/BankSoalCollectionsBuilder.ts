import BankSoalAppUndefined from "~/domain/bank-soal/orm/bank-soal-undifined";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default class BankSoalCollectionsBuilder{
    static buildFromIdSoalCollection(idSoal:number[], refrensiBankSoal:BankSoalAppType[]):BankSoalAppType[]{
        return idSoal.map(numberId=>{
            const found = refrensiBankSoal.find(s=>s.idbaris === numberId);
            if(found){
                return found;
            }
            const bankSoalUndefined = BankSoalAppUndefined.build();
            return bankSoalUndefined;
        })
    }
    static buildFromStrukturKurikulumPublikasi(kurikulum:AtpHasManySoalType[]):BankSoalAppType[]{
        
        return kurikulum.map(m=>{
            const {hasSoal, ...snapshot_kurikulum} = m
            const bankSoalUndefined = BankSoalAppUndefined.build();
            const pertanyaan=`[${m.atp_as_tp_id}] ${m.atp_as_tp_description}`;
            const pembahasan_penskoran="Soal ini ditunjukkan untuk mengisi nilai KD "+pertanyaan;
            return {...bankSoalUndefined, pertanyaan, pembahasan_penskoran, bentuk_soal:'isian_singkat', snapshot_kurikulum}
        })

    

    }
}
