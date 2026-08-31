import { useCallback, useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import { type JSONContent } from "@tiptap/react";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";
import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import type { OpsiPilihanJawaban, PgKompleks, PgTunggal, } from "~/types/bank-soal/bentuk-soal-type";
import { generateAlphabet } from "~/lib/generateAlphabet";

interface OpsiBiasaProps{
    countOpsi:number,
    handlerSettingOpsiJawaban?:(arrayOpsi:OpsiPilihanJawaban[], indexKuncijawaban:number)=>void
}

export default function OpsiBiasa({ countOpsi, handlerSettingOpsiJawaban }: OpsiBiasaProps) {
    const [opsiJawaban, setOpsiJawaban] = useState<OpsiPilihanJawaban[]|undefined>([])
    const abjadCollections = generateAlphabet(countOpsi);
    
    /**
     * Update salah satu opsi
     */
    // const handleOptionChange = useCallback(
    //     (index: number, content: string) => {
    //         setJsonJawab((prev) => {
    //             if (!prev) return prev;

    //             const options = [...(prev.OpsiPilihanJawaban ?? [])];

    //             options[index] = { index, content, };

    //             return {
    //                 ...prev,
    //                 OpsiPilihanJawaban: options,
    //             };
    //         });
    //     },
    //     []
    // );
    useEffect(()=>{
        handlerSettingOpsiJawaban?.(opsiJawaban as OpsiPilihanJawaban[], 1);
        
    },[opsiJawaban])
    const handleSetOpsiJawaban = useCallback(
        (index:number, content:string)=>{
            
            setOpsiJawaban((prevState)=>{
                if(!prevState) return [];
                if(prevState.length === 0){
                    return [
                        {
                            index,
                            content
                        }
                    ]
                }else{
                    // prevState.splice(index,1);
                    prevState = prevState.filter(s=>s.index !== index)
                    
                    return [
                        ...prevState.filter(s=>s.index !== index),
                        {
                            index, content
                        }
                    ]
                };
                
            });
            
        },[countOpsi]
    )
    return (
        <div className="md:col-span-12 grid md:grid-cols-12 border">
            {abjadCollections.map((abjad, index) => (
                <OpsiAbjad
                    key={abjad}
                    abjad={abjad}
                    index={index}
                    // setOpsiJawaban={setOpsiJawaban}
                    // indexKunciJawaban={indexKunciJawaban}
                    // setIndexKunciJawaban={setIndexKunciJawaban}
                    onChange={handleSetOpsiJawaban}
                />
            ))}
        </div>
    );
}

interface OpsiAbjadProps {
    abjad: string;
    index: number;
    // setOpsiJawaban:Dispatch<SetStateAction<OpsiPilihanJawaban>>
    onChange: (index: number, html: string) => void;
    
    // indexKunciJawaban:number,
    // setIndexKunciJawaban:Dispatch<SetStateAction<number>>
}

function OpsiAbjad({
    abjad,
    index,
    // setOpsiJawaban,
    onChange,
    // indexKunciJawaban, 
    // setIndexKunciJawaban
}: OpsiAbjadProps) {
    const [valueJson, setValueJson] = useState<JSONContent | null>(null);

    
    useEffect(() => {
        const html = HtmlRenderer({ document: valueJson, });

        onChange(index, html || "");
    }, [valueJson, index, onChange]);

    return (
        <>
            <div className="col-span-3 border text-end pe-2 font-bold">
                Opsi {abjad}
            </div>

            <div className="col-span-8 border">
                <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson} />
            </div>

            <div className="col-span-1 border">
                <label>
                    Kunci Jawaban {abjad}
                    <input 
                        type="radio" 
                        name="kuncijawaban" 
                        // checked={indexKunciJawaban === index}
                        // onChange={()=>setIndexKunciJawaban(index)}
                        />
                </label>
            </div>
        </>
    );
}