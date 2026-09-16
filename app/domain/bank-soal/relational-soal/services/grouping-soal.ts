import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import { ListBentukSoal } from "../../list-bentuk-soal";
import type { GroupingBentukSoalType } from "../type";


export default class GroupingSoal{
    static GroupingByBentukSoal (BankSoal:BankSoalAppType[]):GroupingBentukSoalType[]{
        const mapBentukSoal = new Map<string, GroupingBentukSoalType>();
        for(const item of BankSoal){
            const keyBentukSoal = item.bentuk_soal;
            if(!mapBentukSoal.has(keyBentukSoal)){
                const foundDefineBentukSoal = ListBentukSoal.find(s=>s.name === keyBentukSoal);
                mapBentukSoal.set(keyBentukSoal, 
                    {
                        bentukSoal:foundDefineBentukSoal!,
                        data:[]
                    }
                );
            }
            mapBentukSoal.get(keyBentukSoal)!.data.push(item)
        }
        return [...mapBentukSoal.entries()].map(([key, value])=>({
            bentukSoal:value.bentukSoal,
            data: value.data
        }))
    }
    static GroupingByMapel (bankSoal:BankSoalAppType[]){
        const groupMapel = new Map<string, {kodeMapel:string, mapelName:string, data:Map<string, GroupingBentukSoalType>}>();
        for(const item of bankSoal){
            const keyKodeMapel = item.kode_mapel;
            const mapelName = item.mapel_name;
            const bentukSoal = item.bentuk_soal;

            if(!groupMapel.has(keyKodeMapel)){
                groupMapel.set(keyKodeMapel, 
                    {
                        kodeMapel:keyKodeMapel, 
                        mapelName,
                        data: new Map()
                    }
                )
            }
            
            const dataSoalMap = groupMapel.get(keyKodeMapel)
            if(!dataSoalMap?.data.has(bentukSoal)){
                const foundBentukSoal = ListBentukSoal.find(s=>s.name === bentukSoal)!;
                dataSoalMap?.data.set(bentukSoal, 
                    {
                        bentukSoal: foundBentukSoal, 
                        data:[]
                    }
                )
            }
            
            dataSoalMap?.data.get(bentukSoal)?.data.push(item);
        }
        return [...groupMapel.entries()].map(([kodeMapel, valueMap])=>{
            const mapelName = valueMap.mapelName;
            const data = [...valueMap.data.entries()].map(([bentukSoal, data])=>({bentukSoal, data}))
            return {
                kodeMapel,
                mapelName,
                data
            }
        })
    }
}