import { WrapperContentForm} from "../wrapper-content-form";
import TiptapEditorSoal from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoal";
import { useEffect, useMemo, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";

import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";


export function FieldInputStimulan(){
    const {action, data} = useCreateItemSoalContext();
    const [valueJson, setValueJson] = useState<JSONContent | null>(data.stimulus as unknown as JSONContent);

    const stimulusHtml = useMemo(()=>{
        return  HtmlRenderer({document:valueJson})
    }, [valueJson]);

    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                stimulus:stimulusHtml
            }
        })
    },[stimulusHtml]);

    return (
        <WrapperContentForm keyTitle='Stimulan (Ilustrasi)'>
            <div className="absolute -top-5 right-3 pe-2 ps-4 rounded-tl-2xl bg-linear-to-tr from-sky-300 via-amber-300 to-purple-300">Opsional</div>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson}/>
        </WrapperContentForm>
    )
}

/**
 *   <div className="editor-document">
            <DocumentRenderer document={valueJson} />
            <hr className="border-b"/>
                <div dangerouslySetInnerHTML={{__html:dataHtmlString}}/>
                </div> 
 */