import type { ListBentukSoalType, OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import EditorOpsiJawabanPgTunggal from "./editors/editor-pg-tunggal"
import type { Dispatch, SetStateAction } from "react";
import EditorOpsiJawabanPgKompleks from "./editors/editor-pg-kompleks";

type Props = {
    bentukSoal: ListBentukSoalType,
    dataOpsi:OpsiPilihanJawaban[],
    kunci?:number|number[]|number[][],
    setKunci?:  (v:number|number[])=>void
    handleChangeItemOpsi:(index:number, content:string)=>void
}
export default function SwitchEditorAlatJawab({
    bentukSoal,
    dataOpsi,
    kunci, 
    setKunci,
    handleChangeItemOpsi,
    }:Props){
    switch(bentukSoal.name){
        case 'pg':
            return <EditorOpsiJawabanPgTunggal 
                        dataOpsi={dataOpsi} 
                        kunci={kunci as number} 
                        setKunci={(v)=>setKunci?.(v)}
                        handleChangeItemOpsi={handleChangeItemOpsi}
                    />;
        case 'pg_kompleks':
            return <EditorOpsiJawabanPgKompleks 
                        dataOpsi={dataOpsi} 
                        kunci={kunci as number[]} 
                        setKunci={(v)=>setKunci?.(v)}
                        handleChangeItemOpsi={handleChangeItemOpsi}
                    />;
        default:
            return <p>On Proses</p>
    }
}