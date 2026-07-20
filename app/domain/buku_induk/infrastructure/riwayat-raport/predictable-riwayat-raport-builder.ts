import type { GroupIndukType } from "../../entities/GroupIndukType";
import { DefineRiwayatRaport } from "./define-riwayat-raport";

export class PredictableRiwayatRaportBuilder{
    
    build(groups:GroupIndukType[]):GroupIndukType[]{
        for(const group of groups){
            //abaikan group NIS yang tidak valid (Tapel 1213/1314)
            if(group.summary.validGroup){
                for(const dataSiswa of group.data){
                    const {data:itemSiswa, validation:itemValid} = dataSiswa;
                    const riwayatRaport = new DefineRiwayatRaport(itemSiswa)
                    
                }
            }
        }
        return [];
    }
}