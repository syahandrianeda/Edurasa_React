import { type JSONContent } from "@tiptap/react";
import { Fragment, useState } from "react";
import TiptapEditorOpsiTable from "~/components/editor-tip-tap/rte-formulir/TiptapEditorOpsiTable";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function OpsiTable({abjadCollections}:{abjadCollections:string[]}){
    const [col, setCol] = useState<number>(3);
    const [valueJson, setValueJson] = useState<JSONContent|null>(null);

    const onChangeColumnCount = (v:number)=>{
        setCol(v);
    }
    
    console.log('valueJson', valueJson?.content);
    console.log(col, abjadCollections.length);
    return (
        <div className="md:col-span-12 grid md:grid-cols-12 border">
            <div className="col-span-3 flex gap-2 text-xs justify-items-stretch">
                <div className="border text-nowrap pe-2">Jumlah Kolom :</div>
                <div className="border px-2">
                    <Field orientation="horizontal" className="gap-2 justify-between">
                        <Label className="text-xs has-checked:bg-green-300 has-[input:checked]:after:content-['✓'] has-[input:checked]:after:ms-2 p-1">1 Kolom
                            <Input type="radio" name="col" checked={col === 2} className="w-16 hidden" value={col} onChange={()=>onChangeColumnCount(2)}/>
                        </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2 justify-between">
                        <Label className="text-xs has-checked:bg-green-300 has-[input:checked]:after:content-['✓'] has-[input:checked]:after:ms-2 p-1">2 Kolom
                            <Input type="radio" name="col" checked={col === 3} className="w-16 hidden" value={col} onChange={()=>onChangeColumnCount(3)}/>
                        </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2 justify-between">
                        <Label className="text-xs has-checked:bg-green-300 has-[input:checked]:after:content-['✓'] has-[input:checked]:after:ms-2 p-1">3 Kolom
                            <Input type="radio" name="col" checked={col === 4} className="w-16 hidden" value={col} onChange={()=>onChangeColumnCount(4)}/>
                        </Label>
                    </Field>
                </div>
            </div>
            <div className="col-span-9 grid md:grid-cols-9 gap-1">
                <div className="col-span-7">
                    <TiptapEditorOpsiTable col={col} row={abjadCollections.length} valueJson={valueJson} onChangeJson={setValueJson}/>
                </div>
                <div className="col-span-2">Kunci</div>
            </div>
        </div>
    )
}
