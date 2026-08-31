import { WrapperContentForm} from "./content-wraper-fieldset";
import { useEffect, useMemo, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";


export function FieldInputJawabanIsian(){
    const {action, data} = useCreateItemSoalContext();
    const [valueJson, setValueJson] = useState<JSONContent | null>(data.jawaban.join(' ') as unknown as JSONContent?? null);
    
    useEffect(()=>{
        
        if(data.pertanyaan === ''){
            setValueJson(null)
        }
    },[data.pertanyaan]);
    
    const stimulusHtml = useMemo(()=>{
        return  HtmlRenderer({document:valueJson})
    }, [valueJson]);

    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                jawaban:[stimulusHtml]
            }
        })
    },[stimulusHtml, action]);

    return (
        <WrapperContentForm keyTitle='Jawaban'>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson}/>
        </WrapperContentForm>
    )
}