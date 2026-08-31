import { useCallback } from "react";
import { InputText, InputTextArea } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { Field } from "~/components/ui/field";
import {type BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default function EditMateriPokok(){
    const {currentData, setCurrentData} = useFormEdura<BankSoalAppType>();
    const {materi_pokok} = currentData
    const onChangeInput = useCallback(
            (value: string) => {
                setCurrentData(draft=>{
                    draft.materi_pokok = value;
                })
            }, [setCurrentData] );
        
    return (
        <div className="relative mt-4">
            <div className='absolute ps-1 pe-4 dark:bg-slate-700 rounded-tr-2xl border-s-2 border-t boreder-e -top-3.5 border-slate-400 left-2 text-[10px] bg-slate-300'>Materi Pokok:</div>
            <Field orientation="horizontal">
                <InputText
                    label=""
                    value={materi_pokok}
                    className="text-wrap shadow shadow-sky-400 dark:bg-white dark:text-black"
                    
                    onInput={(e) => onChangeInput(e.currentTarget.value)}
                />
            </Field>
        </div>
    )
}