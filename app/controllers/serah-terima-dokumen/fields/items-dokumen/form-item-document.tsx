import  { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {useState, type ChangeEvent} from 'react';
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";

export default function FormItemDokumen({handleAdd}:{handleAdd:(v:string)=>void}){
    const [value, setValue] = useState<string>('');
    const handleChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        
        setValue(value);
    }
    const handleKlik = ()=>{
        if(value==="") {
            alert('Silakan isi Nama Dokumen yang diserahkan')
            return;
        };
        handleAdd(value);
        setValue('')
    }
    return (
        <Field className="relative flex w-full border-b-2 pb-1 border-purple-600 flex-col gap-1 md:flex-row text-sm items-center px-2 md:px-4">
            <Input
                value={value}
                className="min-w-8/12 bg-sky-50"
                onChange={handleChangeValue}
                placeholder="Tambah Nama Dokumen yang diserah/terimakan"
                />
            <ButtonCommitAwesome className="py-1 px-4 w-full" labelButton="Tambah Dokumen" onClick={handleKlik}/>
        </Field>
    )
}