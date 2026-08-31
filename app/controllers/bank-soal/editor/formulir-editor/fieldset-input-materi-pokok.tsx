import { Field } from "~/components/ui/field";
import {WrapperContentForm} from "./content-wraper-fieldset";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { useCallback, useEffect, useState, type ChangeEvent, type InputEvent } from "react";
import { Input } from "~/components/ui/input";

export function FieldInputMateriPokok(){
    const {data, action} = useCreateItemSoalContext();
    const [input, setInput] = useState<string>(data.materi_pokok);
    useEffect(()=>{
        if(data.materi_pokok === ''){
            setInput('')
        }
    }, [data.materi_pokok])
    const onInput = useCallback((value:string)=>{
        
        setInput(value);
    },[])
    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                materi_pokok: input
            }
        })
    },[input]);

    return (
        <WrapperContentForm keyTitle='Materi Pokok'>
            <Field className="mt-0 pt-0">
                <Input
                    type="text"
                    className="w-full bg-white rounded-none mx-1 mt-0"
                    placeholder="Tentukan materi pokok di sini"
                    value={input}
                    onChange={(e)=>onInput(e.currentTarget.value)}
                    />
            </Field>
        </WrapperContentForm>
    )
}