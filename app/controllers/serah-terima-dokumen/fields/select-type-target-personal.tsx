import { useState } from "react";
import { SelectCommonsField } from "~/components/selects/select-commons";
import type { handleProps } from "./props-serah-terima";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";

export default function SelectTypeTargetPersonal({value, setValue,disabled}:handleProps){
    const dataPersonalType = Object.entries(PersonalTypeEnum).map(([key, value])=>(
        { key:key, value:value}) as const);
    
    const [personal, setPersonal] = useState<string>(value.type_target ?? '');
    
    const handlePerson =(v:string)=>{
        setPersonal(v);
        setValue(draft=>{
            draft.type_target = v as PersonalTypeEnum;
            draft.target_person = [];
        });
    };

    return (
        <SelectCommonsField
            fieldClassName="md:w-2/5"
            labelClassName="max-w-2/5"
            label="Pilih Personal"
            value={personal}
            setValue={handlePerson}
            data = {dataPersonalType}
            labelSelected='value'
            keySelected='key'
            disabled={disabled}
            />
    )
}