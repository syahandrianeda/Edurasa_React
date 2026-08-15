import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {useState, type ChangeEvent} from 'react';
import type { dokumenSerahTerimaType } from "./dokumen-serah-terima-type";
import { KeyRoundIcon, LockKeyhole, LockKeyholeOpen, Trash, Trash2Icon } from "lucide-react"

export default function ItemFormDocument({
    dokumen, 
    onEdit, 
    onDelete
}:{
    dokumen:dokumenSerahTerimaType,
    onEdit: (v:dokumenSerahTerimaType)=>void
    onDelete: (v:dokumenSerahTerimaType)=>void
}){
    const [canEdit, setCanEdit] = useState<boolean>(false);
    
    const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        const newValue = {...dokumen, name:value}
        onEdit(newValue);
    }
    const handleDelete = ()=>{
        onDelete(dokumen);
    }
    return (
        <>
            <label title="Edit">
                <Input
                    type="checkbox"
                    className="h-4 w-4 align-middle hidden border-0"
                    checked={canEdit}
                    onChange={()=>setCanEdit(v=>!v)}/>
                    {
                        !canEdit?<LockKeyhole size={16} className="text-rose-800 font-extrabold"/>:<LockKeyholeOpen size={16} className="text-green-800 font-extrabold"/>
                    }
            </label>
            <Field className="w-9/12">
                <Input
                    disabled={!canEdit}
                    type="text"
                    className={`border-0 outline-none ${canEdit?'border-b border-sky-300':''} border-black ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-sky-400  rounded-b-none  focus-within:border-b-2`}
                    value={dokumen.name}
                    onChange={onHandleChange}/>
            </Field>
            <button onClick={handleDelete}><Trash2Icon size={16}/></button>

        </>
    )
}