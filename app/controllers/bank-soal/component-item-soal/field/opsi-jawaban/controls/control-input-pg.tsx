import { useCallback, useEffect, useState, type Dispatch } from "react";
import type { BankSoalAction } from "~/controllers/bank-soal/reducer-item-soal/action-type-item-soal";
import type { PgTunggal,PgKompleks,PilihanBenarSalahType,PilihanMenjodohkan, OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import { type JSONContent } from "@tiptap/react";
import FieldPg from "../../FieldPg";

type props={
    dataOpsi:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    action:Dispatch<BankSoalAction>
}
export default function ControlInputPg({dataOpsi, action}:props){
    const {OpsiPilihanJawaban, formatOpsi, valid} = dataOpsi as unknown as PgTunggal
    const [contentIndex, setContentIndex] = useState<OpsiPilihanJawaban[]>(OpsiPilihanJawaban);
    const [kunci, setKunci] = useState<number>(valid ?? 0)
    console.log('controlinput',{valid,kunci});
    
    
    const handleChangeItemOpsiBiasa = useCallback((index:number, content:string) =>{
            // const newData = OpsiPilihanJawaban.map((m, i)=> i===index? {...m, content:content}: m);
            // console.log({OpsiPilihanJawaban, newData})
            // action({
            //     type:'set_item_soal',
            //     payload:{
            //         json_alat_jawab:{
            //             formatOpsi,
            //             OpsiPilihanJawaban:newData,
            //             valid
            //         }
            //     }
            // })
            setContentIndex((prev)=>{
                if(!prev) return prev;
                console.log('prev callback', prev, contentIndex, OpsiPilihanJawaban);
                const updateData = { index, content };

            return prev.map((data, i) => i === index ? { ...data, content: updateData.content, } : data );
            })
        },[]);

    useEffect(()=>{
        console.log('dipanggil', contentIndex, kunci)
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab:{
                    formatOpsi, 
                    OpsiPilihanJawaban:contentIndex, 
                    valid:kunci
                },
                jawaban: kunci && String.fromCharCode(kunci+65)
            }
        });
        
    },[contentIndex,kunci, valid]);

    useEffect(()=>{
        console.log('pengarush opsi Pilihan Jawaban', OpsiPilihanJawaban, contentIndex  )
        if(contentIndex.length === 0){
            setContentIndex(OpsiPilihanJawaban)
        }else if( contentIndex.length !== OpsiPilihanJawaban.length ){
            setContentIndex(OpsiPilihanJawaban)
        }

    },[OpsiPilihanJawaban])
    
    return (
        <div>
{
                OpsiPilihanJawaban.map((m, i)=>
                    <FieldPg kunci={kunci} setKunci={(v)=>setKunci(Number(v))} key={i} type="single" initialValue={m.content as unknown as JSONContent} onChange={handleChangeItemOpsiBiasa} index={i}/>
                )
            }
        </div>
    )
}