import type { OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import type { OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type"
import type { JSONContent } from "@tiptap/react"
import PgTunggalModal from "./fields/pg-tunggal-modal"
import { useMemo } from "react"

type Props = {
    dataOpsi:OpsiPilihanJawaban[],
    itemOpsiParent:(index:number)=>OpsiPilihanJawabanType|undefined
    handleContentOpsi: (index:number, content:string)=>void,
}
export default function EditContentOpsiJawaban ({
    dataOpsi,
    itemOpsiParent,
    handleContentOpsi,
}:Props){

    return (
        <div>
            {
                dataOpsi.map((opsi, index)=>{
                    const itemJsonParent = useMemo(()=>itemOpsiParent(index)?.content as unknown as  JSONContent,[]);
                    
                    return (
                        <PgTunggalModal valueJsonParent={itemJsonParent} index={index} onChangeValueJsonItem={handleContentOpsi}/>
                    )
                }
                )
            }
        </div>
    )
}