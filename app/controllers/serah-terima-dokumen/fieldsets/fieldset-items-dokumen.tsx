import { useImmer } from "use-immer";
import DokumenSerahTerima from "../fields/items-dokumen/dokumen-serah-terima";
import type { handleProps } from "../fields/props-serah-terima";
import type { dokumenSerahTerimaType } from "../fields/items-dokumen/dokumen-serah-terima-type";
import { useEffect } from "react";
let id:number=0
export default function FieldsetItemsDokumen({value,setValue}:handleProps){
    const initItemBarang = value?.item_barang?.map(m=>({id:id++, name:m}))
    const [dokumen, setDokumen] = useImmer<dokumenSerahTerimaType[]>( initItemBarang ?? []);
    useEffect(()=>{
        if(!dokumen) return;
        setValue(draft=>{
            draft.item_barang = dokumen.map(m=>m.name);
        })
    },[dokumen, setDokumen])
    return (
        <div className="mt-4 bg-linear-to-bl from-sky-200 to-purple-400 rounded-2xl p-2 shadow-lg shadow-purple-500">
            <DokumenSerahTerima dokumen={dokumen} setDokumen={setDokumen}/>
        </div>
    )
}