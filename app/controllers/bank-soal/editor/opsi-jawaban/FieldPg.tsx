import { useCallback, useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction, } from "react";
import { type JSONContent } from "@tiptap/react";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";


type FieldPgProps = {
    index:number,
    type:'single'|'multiple',
    initialValue:JSONContent,
    onChange: (i:number, v:string)=>void,
    kunci:number|number[],
    setKunci:(v:number|number[])=>void
}
export default function FieldPg({index, type, initialValue, onChange, kunci, setKunci}:FieldPgProps){
    const nameOpsi = type==='single'? String.fromCharCode(65 + index): (index+1);
    const [valueJson, setValueJson] = useState<JSONContent | null>(null);
    const {data} = useCreateItemSoalContext()
    useEffect(()=>{
        
        if(data.pertanyaan === ''){
            setValueJson(null)
        }
    },[data.pertanyaan, onChange]);
    
    
    useEffect(() => {
        const html = HtmlRenderer({ document: valueJson, });

        onChange(index, html || "");
    }, [valueJson, index, onChange]);
    
    const handleKunci = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, value} = e.currentTarget
        
        if(type === 'single'){
            if(checked) setKunci(Number(value))
        }else{
            const values = checked
                        ? [...(kunci as number[]), Number(value)]
                        : (kunci as number[]).filter(s=> s!==Number(value));
            setKunci(values)
        }

        // if(checked){
        //     setKunci(Number(value));
        // }
    }

    return (
        <div className="relative mt-7">
            <div className="absolute text-xs bg-slate-300 border-t border-sky-300 -top-4 left-1 ps-1 pe-4 rounded-tr-2xl">Opsi {nameOpsi}</div>
            <label className="absolute text-xs bg-slate-300 border-t has-checked:bg-emerald-300 border-sky-300 -top-4 right-1 ps-4 pe-1 rounded-tl-2xl">Kunci Jawaban 
                {
                    type === 'single'
                    ?(
                        <input name="opsiKunciJawaban" type="radio" checked={kunci===index} className="align-middle ms-4" value={index} onChange={handleKunci}/>
                    ):(
                        
                        <input name="opsiKunciJawaban" type="checkbox" checked={Array.isArray(kunci)?kunci.includes(index):kunci===index} className="align-middle ms-4" value={index} onChange={handleKunci}/>
                    )
                }
            </label>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson} />
            
        </div>
    )
}