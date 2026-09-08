import type { SiswaType } from "~/types/siswa";


export interface CollectionGroupInterface{
    groupNis:string,
    data:SiswaType[],
}
export default class CollectionGroupNis{
    constructor(private readonly datasiswa:SiswaType[]){}
    
    buildCollection():CollectionGroupInterface[]{
        const nisMap = new Map<string, SiswaType[]>();
        const data = this.datasiswa.filter(s=>s.pd_nama !=="");
        for(const item of data){
            /** pastikan sudah ada */
            
            const nisFormat = item.nis === ""?"Kosong": item.nis.substring(0, 4);
            if(!nisMap.has(nisFormat)){
                nisMap.set(nisFormat,[]);
            }
            nisMap.get(nisFormat)!.push(item);

        }
        return [...nisMap.entries()].map(([groupNis, data]) => ({
                    groupNis,
                    data,
            })).sort((a, b)=>b.groupNis.localeCompare(a.groupNis));
    }
}