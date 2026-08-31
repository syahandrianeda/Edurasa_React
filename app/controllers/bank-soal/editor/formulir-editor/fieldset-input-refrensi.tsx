import { Field } from "~/components/ui/field";
import {WrapperContentForm} from "./content-wraper-fieldset";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { useCallback, useEffect, useState, } from "react";
import { Input } from "~/components/ui/input";

export function FieldInputRefrensi(){
    const {data, action} = useCreateItemSoalContext();
    const [input, setInput] = useState<string>(data.refrensi ??'');
    useEffect(()=>{
        if(data.refrensi === ''){
            setInput('')
        }
    }, [data.refrensi])
    const onInput = useCallback((value:string)=>{
        
        setInput(value);
    },[])
    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                refrensi: input
            }
        })
    },[input]);

    return (
        <WrapperContentForm keyTitle='Refrensi (Opsional)'>
            <Field className="mt-0 pt-0">
                <Input
                    type="text"
                    className="w-full bg-white rounded-none mx-1 mt-0"
                    placeholder="Tuliskan refrensi soal buatan Anda"
                    value={input}
                    onChange={(e)=>onInput(e.currentTarget.value)}
                    />
            </Field>
        </WrapperContentForm>
    )
}