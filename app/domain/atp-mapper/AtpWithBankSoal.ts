import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { AtpContainKoleksiBankSoalMapperType, AtpContainKoleksiBankSoalType } from "./AtpContainKoleksiBankSoalType";

export default class AtpWithBankSoal{
    static buildMapper(sumberTagihan:TagihanHasDataResponse[]):AtpContainKoleksiBankSoalMapperType{
        const mapper:AtpContainKoleksiBankSoalMapperType = new Map();
         for(const tagihan of sumberTagihan){
                    const {bank_soal_collections} = tagihan;
                    
                    for(const bankSoal of bank_soal_collections){
                        const {kd_id, snapshot_kurikulum, kd_deskripsi} = bankSoal
                        getOrCreateMap(mapper, kd_id, ()=>([])).push(bankSoal);
                    }
                }
        
        return mapper;
    }
}