import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import {useEffect, useMemo, useState} from 'react';
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";
import { type JSONContent } from "@tiptap/react";

export default function FieldsetPembahsan(){
    const {action, data} = useCreateItemSoalContext();
    const [valueJson, setValueJson] = useState<JSONContent | null>(data.pembahasan_penskoran as unknown as JSONContent?? null);
    useEffect(()=>{
        
        if(data.pembahasan_penskoran === ''){
            setValueJson(null)
        }
    },[data.pembahasan_penskoran]);
    
    const stimulusHtml = useMemo(()=>{
        return  HtmlRenderer({document:valueJson})
    }, [valueJson]);

    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                pembahasan_penskoran:stimulusHtml
            }
        })
    },[stimulusHtml, action]);
    return (
        <div className="relative mt-7 gap-0 bg-linear-to-br pt-4 from-sky-300 via-emerald-300 to-purple-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
            <div className="font-bold absolute -top-2.5 text-sm left-0 bg-sky-300 ps-1 pe-4 rounded-tr-2xl">
                Pembahasan
            </div>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson}/>
        </div>
    )
}