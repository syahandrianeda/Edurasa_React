import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";

export default class AtpMapperBankSoalCollections{
    static build(bankSoal:BankSoalAppType[]):Map<number, BankSoalAppType[]>{
        const mapper = new Map<number, BankSoalAppType[]>();
        for(const soal of bankSoal){
            const {idbaris, kd_id} = soal;
            getOrCreateMap(mapper, kd_id, ()=>([])).push(soal)
        }
        return mapper;
    }
}