import { InputText } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import type { handleProps} from "../fields/props-serah-terima";
import { useState, type ChangeEvent } from "react";
import { CalendarPicker } from "~/components/form-custom/calendar";

export default function FieldsetNamaKegiatan({value, setValue}:handleProps){
    const [input, setInput] = useState<string>(value.nama_kegiatan);
    const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        setInput(value);
        setValue(draft=>{
            draft.nama_kegiatan = value;
        })
    }

    const handleDate = (value:string|Date)=>{
            if(!value) return;
            setValue(draft=>{
                draft.start_date = typeof(value) === 'string'? new Date(value):value;
            })
        }

    return (
        <div className="flex gap-2 flex-col md:flex-row w-fit">
            <Field className="relative mt-4 md:w-8/12">
                <InputText 
                    label="Nama Kegiatan" 
                    placeholder="Nama Kegiatan" 
                    labelClassName="peer-placeholder-shown:w-fit" 
                    className="shadow-lg shadow-purple-500"
                    value={input} 
                    onChange={handleInput}/>
                
                
                    
            </Field>
            <Field className="md:w-4/12">
                <CalendarPicker
                    id="id_tgl_surat"
                    className=" mt-4"
                    label="Tanggal Kegiatan"
                    currentDate={value.start_date ?? new Date()}
                    handleChangeDate={handleDate}/>
            </Field>
        </div>
    )
}