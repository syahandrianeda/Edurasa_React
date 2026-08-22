import { useCallback, type Dispatch, type SetStateAction } from "react"
import { type JSONContent } from "@tiptap/react";
import type {OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type"
import FieldPg from "../../FieldPg";

type Props  = {
    dataOpsi: OpsiPilihanJawabanType[],
    kunci: number[], 
    setKunci: (v: number | number[]) => void
    handleChangeItemOpsi: (index:number, content:string)=>void
}
export default function EditorOpsiJawabanPgKompleks({
    dataOpsi,
    kunci, 
    setKunci,
    handleChangeItemOpsi
    }:Props){

    return (
            <div>
            {
                            dataOpsi.map((m, i)=>
                                <FieldPg 
                                    kunci={kunci} 
                                    setKunci={setKunci} 
                                    key={i} 
                                    type="multiple" 
                                    initialValue={m.content as unknown as JSONContent} 
                                    onChange={handleChangeItemOpsi} index={i}
                                    />
                            )
                        }
                    </div>
        )
}