import BankSoalAppUndefined from "~/domain/bank-soal/orm/bank-soal-undifined";
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
}