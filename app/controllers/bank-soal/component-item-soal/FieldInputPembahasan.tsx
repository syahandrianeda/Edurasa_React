import { WrapperContentForm} from "./wrapper-content-form";
import TiptapEditorSoal from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoal";
import { useEffect, useMemo, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";

import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";

export function FieldInputPembahasan(){
    const {action} = useCreateItemSoalContext();
    const [valueJson, setValueJson] = useState<JSONContent | null>(null);

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
    },[stimulusHtml]);

    return (
        <WrapperContentForm keyTitle='Pembahasan/Penskoran'>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson}/>
        </WrapperContentForm>
    )
}