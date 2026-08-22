import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context"
import type { OpsiPilihanJawaban, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import { useCallback, useEffect, useState } from "react";
import FieldPg from "../../FieldPg";
import { type JSONContent } from "@tiptap/react";

export default function CreatePg(){
    const {data, action} = useCreateItemSoalContext();
    const pg = data?.json_alat_jawab as PgTunggal;
    const formatOpsi = pg?.formatOpsi ?? 'vertical';
    const dataOpsi = pg?.OpsiPilihanJawaban ?? [];
    const countOpsi = dataOpsi.length;
    const [opsiPilihanJawaban, setOpsiPilihanJawaban] = useState<OpsiPilihanJawaban[]>(dataOpsi);
    // console.log({dataOpsi}, opsiPilihanJawaban, pg)
    const handleChangeItemOpsiBiasa = useCallback(
            (index:number, content:string)=>{
                setOpsiPilihanJawaban((prev)=>{
                        if(!prev) return prev;
                        const updateData = { index, content };

                    return prev.map((data, i) => i === index ? { ...data, content: updateData.content, } : data );
                    })    
                } ,[]);
    useEffect(()=>{
            setOpsiPilihanJawaban((prev) => {
                /** jika prev kosong tambahkan ini: */
                if (prev.length === 0) {
                    return Array.from({ length: countOpsi }, (_, index) => ({
                        content: "",
                        index,
                    }));
                }
                /** jika jumlah prev sebelumnya lebih banyak, hapus */
                if (prev.length > countOpsi) {
                    return prev.slice(0, countOpsi);
                }
                /** jika prev kurang, tambahkan sebanyak countOpsi */
                if (prev.length < countOpsi) {
                    return [
                        ...prev,
                        ...Array.from(
                            { length: countOpsi - prev.length },
                            (_, i) => ({
                                content: "",
                                index: prev.length + i,
                            })
                        ),
                    ];
                }
    
                return prev;
            });
            // const abjad = generateAlphabet(countOpsi);
            
            // setArrayAbjad(abjad)
            
            
        },[countOpsi]);
        
    useEffect(()=>{
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...pg, OpsiPilihanJawaban:opsiPilihanJawaban}
                }
            })
    
    },[opsiPilihanJawaban]);

    if(formatOpsi === 'table') return <p>Next Koding</p>
    return (
        <div className="border p-2">
            {
                opsiPilihanJawaban.map((m, i)=>
                    <FieldPg key={i} type="single" initialValue={m.content as unknown as JSONContent} onChange={handleChangeItemOpsiBiasa} index={i}/>
                )
            }
        </div>
    )
}