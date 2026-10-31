import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export type AtpMapperBelongsToManyTagihanHasDataResponseType = Map<number, TagihanHasDataResponse[]>;
export type AtpBelongsToManyTagihanHasDataResponseType = {
    atp_id:number, 
    data:TagihanHasDataResponse[]
}
export default class AtpMapper{
    
    static buildAtpMapperInTagihanHasDataRespons(data:TagihanHasDataResponse[]):AtpMapperBelongsToManyTagihanHasDataResponseType{
        const mapper:AtpMapperBelongsToManyTagihanHasDataResponseType = new Map();
        
        for(const tagihan of data){
            
            /** get refrences from property BankSoalAppType[] */
            const bankSoalCollections = tagihan.bank_soal_collections;

            for(const {kd_id} of bankSoalCollections){

                const currentAtp = getOrCreateMap(mapper, kd_id, ()=>([]));
                
                /** avoid tagihan duplicate */
                currentAtp.some(item=>item.idbaris === tagihan.idbaris) ? currentAtp : currentAtp.push(tagihan)

            }
        }
        
        return mapper;
    }
    
    static AtpBelongsToManyTagihan(data:TagihanHasDataResponse[]):AtpBelongsToManyTagihanHasDataResponseType[]{

        const mapper = this.buildAtpMapperInTagihanHasDataRespons(data);

        return [...mapper.entries()].map(([atp_id, tagihan])=>({atp_id, data:tagihan}))
        
    }
}