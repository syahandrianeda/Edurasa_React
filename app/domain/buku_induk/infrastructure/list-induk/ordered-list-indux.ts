import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { dataNisIndexType, GroupIndukType } from "../../entities/GroupIndukType";
import type { SiswaType } from "~/types/siswa";
import { getIsianSiswa } from "~/infrastructures/session-storage/isian-siswa";
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik";

export class OrderedListInduk{
    validate(groups: GroupIndukType[]): GroupIndukType[] {
    
        for (const group of groups) {
            const indexCollection = group.dataNisIndex.map(m=>m.index)
            const hasFirstIndex = indexCollection.includes(1);
            group.summary.validGroup = hasFirstIndex;
            if(hasFirstIndex){
                group.dataOrderedInduk = this.buildOrderedListIndux(group.groupNis,group.dataNisIndex )
            }else{
                group.dataOrderedInduk = group.dataNisIndex.map(m=>m.data!)
            }
        }
        return groups;
    }
    buildOrderedListIndux(prefix:string,data:dataNisIndexType[]):SiswaWithValidation[]{
        const ListIndex = data.map(m=>m.index);
        const max = Math.max(...ListIndex);
        const result:SiswaWithValidation[] = [];
        const dataKosong = getIsianSiswa();
         const DataDefault:SiswaType = {...dataKosong,
                aktif:'aktif',
                id:-1,
                masuk_tgl:new Date(),
                time_stamp:new Date(),
            };
        Array.from({length:max}).forEach((_, index)=>{
            const find = data.filter(s=>s.index === (index+1));
            if(find.length>0){
                find.forEach(finddata=>{
                    const {data, validation} = finddata.data
                    result.push({data, validation})

                })
            }else{
                result.push({
                    data:{...DataDefault,   
                        id:-1,
                        nis: prefix +"XX"+(index+1).toString().padStart(3,"0"),
                        pd_nama:''
                    } as SiswaType
                    , 
                    validation:{
                        errors:{
                            nis:'NIS Tidak Terlacak'
                        }, duplicate:{}, isValid:false}
                })
            }
            
        })
        return result
    }
}