import type { Content, JSONContent } from "@tiptap/react"
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type ChangeEventHandler, type Dispatch, type SetStateAction } from "react"
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer"
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple"
import TiptapEditorSoalSimpleModal from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimpleModal"
import TooltipComp from "~/components/ui_edura/tooltip-comp"
import type { OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import type { OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type"

export default function EditorPgTunggal(
    {
        opsiParent, 
        setOpsiParent,
        kunciPgTunggal, 
        handleChangeKunciPgTunggal
}:{
    opsiParent:OpsiPilihanJawaban[]
    setOpsiParent:Dispatch<SetStateAction<OpsiPilihanJawaban[]>>,
    kunciPgTunggal:number[]
    handleChangeKunciPgTunggal:(v:number)=>void
}){
    const [html, setHtml] = useState<OpsiPilihanJawabanType[]>(opsiParent)
    
    
    const handleChange = useCallback((index:number, json:JSONContent|null)=>{
        const content = HtmlRenderer({document:json})
        setHtml(prev=>prev.map((m, i)=> i === index? {...m, content}: m))
    },[]);

    useEffect(()=>{
        setOpsiParent(html);
    }, [html, setOpsiParent])
    return (
            
            opsiParent.map((opsi, iOpsi)=>
                    <div className="relative my-4" key={iOpsi}>
                        <div className='absolute ps-1 pe-4 rounded-tr-2xl border-s-2 border-t boreder-e -top-3.5 border-slate-400 left-2 text-[10px] bg-slate-300 dark:bg-slate-600'>Opsi {String.fromCharCode(iOpsi + 65)}</div>
                        <TooltipComp content="Atur opsi ini sebagai opsi kunci jawaban">
                            <label className='absolute ps-4 pe-1 rounded-tl-2xl border-e-2 border-t boreder-e -top-3.5 border-slate-400 right-2 text-[10px] bg-slate-300 dark:bg-slate-600'>Set Jawaban
                                <input type="radio" name="radio_pg_tunggal" className="align-middle ms-2" checked={iOpsi === kunciPgTunggal[0]} onChange={(e)=>handleChangeKunciPgTunggal(iOpsi)}/>
                            </label>
                        </TooltipComp>
                        <TiptapEditorSoalSimpleModal className={`${kunciPgTunggal[0] === iOpsi? 'bg-green-300 dark:bg-sky-300 dark:text-black':''}`} valueJson={opsi.content} onChangeJson={(json)=>handleChange(iOpsi, json)}/>
                    </div>
                )

    )
}