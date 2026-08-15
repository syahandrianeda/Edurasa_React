import { InputTextArea } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import type { handleProps} from "../fields/props-serah-terima";
import { useState, type ChangeEvent } from "react";

export default function FieldsetKeteranganKegiatanSerahTerima({value, setValue}:handleProps){
    const [input, setInput] = useState<string>(value.keterangan);
    const handleInput = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const {value} = e.currentTarget;
        setInput(value);
        setValue(draft=>{
            draft.keterangan = value;
        })

    }

    return (
        <Field className="relative mt-4">
            <InputTextArea 
                label="Keterangan" 
                placeholder="Deskripsikan keterangan serah terima" 
                labelClassName="peer-placeholder-shown:w-10/12 peer-placeholder-shown:top-5" 
                value={input} 
                className="shadow-lg shadow-purple-500"
                onChange={handleInput}/>
        </Field>

    )
}