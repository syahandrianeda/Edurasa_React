import { useState, type Dispatch, type SetStateAction } from "react";
import { Field, FieldGroup } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type";

export interface FieldDebitKreditProp{
    value:keyof TabunganAppType
    setValue: Dispatch<SetStateAction<keyof TabunganAppType>>
    disabled:boolean
}
export default function FieldDebitKredit({value, setValue, disabled}:FieldDebitKreditProp){
    // const [inputanKategori, setInputanKategori] = useState<keyof TabunganAppType>('masuk');
    
    const handleCheckedRadio = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {checked, value} = e.currentTarget;
        if(checked){
            setValue(value as keyof TabunganAppType)
        }    
    }

    return (
            <FieldGroup aria-disabled={disabled} className="relative flex-row mx-auto w-10/12 bg-white p-2 rounded-2xl justify-around mt-4">
                <div className="absolute top-0 left-1 -translate-y-4 text-xs w-fit p-1 rounded-e-2xl bg-white">Mode Input</div>
                    <Field orientation="horizontal" className="has-checked:bg-green-400 has-checked:rounded-2xl has-checked:p-1">
                        <Input 
                            disabled={disabled}
                            type="radio" 
                            checked={value === 'masuk'} 
                            name="masuk_keluar" 
                            onChange={handleCheckedRadio}
                            value="masuk" 
                            id="masuk" 
                            className="size-4"/>
                        <Label htmlFor="masuk" className="text-gray-500 text-xs w-full">Debit (Masuk)</Label>
                    </Field>
                    <Field orientation="horizontal" className="has-checked:bg-green-400 has-checked:rounded-2xl has-checked:p-1">
                        <Input 
                            disabled={disabled}
                            type="radio" 
                            name="masuk_keluar" 
                            value="keluar" 
                            checked={value === 'keluar'} 
                            onChange={handleCheckedRadio}
                            id="keluar" 
                            className="size-4"/>
                        <Label htmlFor="keluar" className="text-gray-500 text-xs w-full">Kredit (Keluar)</Label>
                    </Field>
                </FieldGroup>
            )
}