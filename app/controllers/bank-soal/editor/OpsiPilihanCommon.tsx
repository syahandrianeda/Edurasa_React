import { useEffect, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { HtmlRenderer } from "~/components/editor-tip-tap/renderer/HtmlRenderer";
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import { Input } from "~/components/ui/input";

interface OpsiPilihanCommonProps{
    abjadCollection:string[],
    onChangeContent: (index:number, content:string)=>void;
    kunciJawaban:number, 
    setKunciJawaban:(v:number)=>void
}
export default function OpsiPilihanCommon({abjadCollection,kunciJawaban, setKunciJawaban, onChangeContent}:OpsiPilihanCommonProps){
    return (
        <div className="md:col-span-12 grid md:grid-cols-12 border">
            {abjadCollection.map((abjad, index) => (
                <EditorOpsiAbjad 
                    key={index}
                    abjad={abjad}
                    index={index}
                    onChange={onChangeContent}
                    kunciJawaban={kunciJawaban}
                    setKunciJawaban={setKunciJawaban}

                    />
            ))}
        </div>
    )
}


interface OpsiAbjadProps {
    abjad: string;
    index: number;
    onChange: (index: number, html: string) => void;
    kunciJawaban:number, 
    setKunciJawaban:(v:number)=>void
    
}
function EditorOpsiAbjad({
    abjad,
    index,
    onChange,
    kunciJawaban, 
    setKunciJawaban
    
}: OpsiAbjadProps) {
    const [valueJson, setValueJson] = useState<JSONContent | null>(null);

    
    useEffect(() => {
        const html = HtmlRenderer({ document: valueJson, });

        onChange(index, html || "");
    }, [valueJson, index, onChange]);

    return (
        <>
            <div className="col-span-12 md:col-span-3 border text-center md:text-end md:pe-2">
                <p className="font-bold"> Opsi {abjad} </p>
                {
                    kunciJawaban === index && (<p className="text-xs">Opsi {abjad} ini dijadikan kunci jawaban</p>)
                }
                <label className="text-xs space-y-1">
                    
                    <Input 
                        id={'kunci_'+abjad}
                        type="radio" 
                        name="kuncijawaban" 
                        title="Jadikan kunci jawaban"
                        className="h-4 w-4"
                        checked={kunciJawaban === index}
                        onChange={()=>setKunciJawaban(index)}

                        />
                </label>
            </div>

            <div className="col-span-8 md:col-span-9 border">
                <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={setValueJson} />
            </div>

            
        </>
    );
}