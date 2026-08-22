import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context"
import type { OpsiPilihanJawaban, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import { useCallback, useEffect, useMemo, useState } from "react";
import FieldPg from "../../FieldPg";
import { type JSONContent } from "@tiptap/react";

export default function CreatePg(){
    const {data, action} = useCreateItemSoalContext();
    const pg = data?.json_alat_jawab as PgTunggal;
    const {OpsiPilihanJawaban, formatOpsi, opsiPilihanTabel, valid } = useMemo(()=> pg,[data?.json_alat_jawab]);
    
    const handleChangeItemOpsiBiasa = useCallback((index:number, v:string) =>{
        const newData = OpsiPilihanJawaban.map((m, i)=> i === index? {...m, content:v}: m)
        console.log(newData)
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab:{
                    ...pg, 
                    OpsiPilihanJawaban: [...OpsiPilihanJawaban, {index, content:v}]
                }
            }
        })

    },[])

    if(formatOpsi === 'table') return <p>Next Koding</p>
    return (
        <div className="border p-2">
            {
                OpsiPilihanJawaban.map((m, i)=>
                    <FieldPg key={i} type="single" initialValue={m.content as unknown as JSONContent} onChange={handleChangeItemOpsiBiasa} index={i}/>
                )
            }
        </div>
    )
}