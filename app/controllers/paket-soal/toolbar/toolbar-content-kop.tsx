import {useCallback, useEffect, useMemo, useState} from 'react';
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple"
import type { kopColumn, kopKontentType } from "~/components/toolbars/kop-ttd/config-kop"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import {type PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket"
import { type Content, type JSONContent } from '@tiptap/react';
import { SampleDefaultKontenKop } from '~/components/toolbars/kop-ttd/default-kop';
import logokota from '../../../images/kotadepok.webp'
import logoSekolah from '../../../images/ratujaya1.png';
import { HtmlRenderer } from '~/components/editor-tip-tap/renderer/HtmlRenderer';
import { initialKopSoal } from './initial-kop';
import { renderNodeHtml } from '~/components/editor-tip-tap/renderer/NodeHtmlRenderer';
import type { PaketSoalDesign } from '~/domain/paket-soal/result/paket-soal';


export default function ToolbarContentKop(){
    
    const {value, updateExtra} = useFilterContext<PaketSoalDesign>()
    const isShowKOp = value?.extra?.setting?.identitas.showKop;
    const [dataKop, setDataKop] = useState<string[]>(value?.extra?.setting?.dataKopCustom ?? [])
    
    const handleInput = (index:number, value:string)=>{
        setDataKop(prev=> prev.map((m, i)=>i === index? value: m) )
    }
    
    useEffect(()=>{
        updateExtra(draft=>{
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>;
            setting.dataKopCustom = dataKop;
            // draft.dataKopCustom = dataKop
            draft.setting = setting;
        })
    }, [dataKop, updateExtra])
    return (
        <div>
            {
                isShowKOp ?
                (
                    <>
                    <div className="w-11/12 mt-4 bg-white dark:text-black mx-auto border flex flex-row text-[12px]">
                        <div className="w-2/12 flex gap-4 flex-col">
                            <div className='p-1 line-clamp-1 bg-slate-300 mb-1 text-sm'>Logo Kota</div>
                            <img src={logokota} className='h-31.25 w-auto mx-auto align-middle'/>
                        </div>
                        <div className="flex-1">
                            <div className='p-1 line-clamp-1 bg-slate-300 mb-1 text-sm text-center'>Text Logo</div>
                            <input value={dataKop[0]} onChange={(e)=>handleInput(0, e.currentTarget.value)} type="text" className='w-full text-center font-arial font-bold text-2xl'/>
                            <input value={dataKop[1]} onChange={(e)=>handleInput(1, e.currentTarget.value)} type="text" className='w-full text-center font-arial font-extrabold text-4xl mb-0 leading-none'/>
                            <input value={dataKop[2]} onChange={(e)=>handleInput(2, e.currentTarget.value)} type="text" className='w-full text-center font-arial font-extrabold text-2xl mb-0 leading-none'/>
                            <input value={dataKop[3]} onChange={(e)=>handleInput(3, e.currentTarget.value)} type="text" className='w-full text-center font-arial font-extrabold text-2xl mb-0 leading-none'/>
                        </div>
                        <div className="w-2/12 flex gap-4 flex-col">
                        <div className='p-1 line-clamp-1 bg-slate-300 mb-1 text-sm'>Logo Sekolah</div>
                            <img src={logoSekolah} className='h-31.25 w-auto mx-auto'/>
                        
                        </div>
                    </div>
                   
                    
                    </>
                ):(
                    <div className="w-full min-h-24 flex justify-center items-center">
                        Anda tidak menyertakan KOP Naskah di dalam paket soal
                       
                    </div>
                )
            }
        </div>
    )
}