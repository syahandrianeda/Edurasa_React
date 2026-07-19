import type { SiswaType } from "~/types/siswa";
import type { dataNisIndexType, GroupIndukType } from "../entities/GroupIndukType";
import { ValidateNisnValue } from "../infrastructure/nisn/ValidateNisn";
import { DefineNis } from "../infrastructure/nis/DefineNis";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { NisNisnValidatorBuilder } from "../infrastructure/builders/NisNisnValidatorBuilder";
import { DefineRiwayatRaport } from "../infrastructure/riwayat-raport/define-riwayat-raport";

export class GroupingInduk{
    
    constructor(private readonly siswa:SiswaType[]){}

    group():GroupIndukType[]{
        const groups = new Map<string, GroupIndukType>();
        
        for(const data of this.siswa){
            const {nis, nisn} = data;
            
            const nisValidate = new DefineNis(nis).validate();
            const prefixNis = nisValidate.prefix;
            const indexNis = nisValidate.nisIndex
            const nisnValidate = new ValidateNisnValue().validate(nisn);

            
            
            if (!groups.has(prefixNis)) {
                groups.set(prefixNis, {
                    groupNis: prefixNis,
                    data: [],
                    dataOrderedInduk:[],
                    dataNisIndex:[],
                    summary: {
                        countInvalid: 0,
                        countInvalidNis: 0,
                        countInvalidNisn: 0,
                        countInvalidNisDuplicate:0, 
                        countInvalidNisnDuplicate:0,
                        validGroup:true
                        
                    },
                });
            }
            
            const group = groups.get(prefixNis)!;
            const validation = new NisNisnValidatorBuilder()//new ValidationBuilder()
                            .setNis(nisValidate.validate().validation)
                            .setNisn(nisnValidate)
                            .build();
            // const riwayatRapor = new DefineRiwayatRaport(data);
            

            const item: SiswaWithValidation = {
                data,
                validation,
                //riwayatRapor
            };

            group.data.push(item);
            const dataNisIndex:dataNisIndexType = {
                index: indexNis,data:item
            }
            group.dataNisIndex.push(dataNisIndex);



            if (!nisValidate.validation.valid) {
                group.summary.countInvalid++;
                group.summary.countInvalidNis++;
            }

            if (!nisnValidate.valid) {
                group.summary.countInvalid++;
                group.summary.countInvalidNisn++;
            }

        }


        return [...groups.values()].sort((a,b)=>a.groupNis.localeCompare(b.groupNis))
    }
}