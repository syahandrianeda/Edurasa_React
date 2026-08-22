
import type { SwitchSettingJsonAlatJawabHandlerPropsType } from "../export-type-switch-props";
import { useCallback, useEffect, useState, type Dispatch } from "react";
import type { BankSoalAction } from "~/controllers/bank-soal/reducer-item-soal/action-type-item-soal";
import type { PgTunggal,PgKompleks,PilihanBenarSalahType,PilihanMenjodohkan, OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import { type JSONContent } from "@tiptap/react";
import FieldPg from "../../FieldPg";

export default function ({
    bentukSoal,
    dataOpsi,
    action
    }:SwitchSettingJsonAlatJawabHandlerPropsType){
        const {OpsiPilihanJawaban, formatOpsi, valid} = dataOpsi as PgTunggal;
        // console.log('function dirender dan ini terpanggil',valid, OpsiPilihanJawaban);
        const [kunci, setKunci] = useState<number>(valid??0);
        const [localContents, setLocalContents] = useState<OpsiPilihanJawaban[]>(OpsiPilihanJawaban)
        console.log('render',{valid, kunci});

        const handleChangeItemOpsiBiasa = useCallback((index:number, content:string) =>{
            setLocalContents(prev=>{
                if(!prev) return OpsiPilihanJawaban;
                return prev.map((m, i)=> i === index ? {...m, content} : m)

            })
            console.log('ketika ketik', valid, kunci)
        },[]);

        useEffect(()=>{
            // console.log('useEffect LocalContents mengecek OpsiPilihanJawaban', OpsiPilihanJawaban, localContents)
            if(OpsiPilihanJawaban.length !== localContents.length){
                console.log('useEffect dimanfaatkan untuk mengubah jumlah localContents', valid)
                setLocalContents(OpsiPilihanJawaban)
            }
        },[OpsiPilihanJawaban]);

        useEffect(()=>{
            console.log('useEffect dari valid', valid, kunci);
            setKunci(kunci)
        },[valid])
        
        useEffect(()=>{
            console.log('useEffect localContents saat ngetik dijalankan, ngecek valid', valid, kunci)
            action({
                OpsiPilihanJawaban:localContents,
                formatOpsi,
                valid:kunci
            }, 'json_alat_jawab')
        }, [localContents]);

        return (
            <div>
            {
                            OpsiPilihanJawaban.map((m, i)=>
                                <FieldPg 
                                    kunci={kunci} 
                                    setKunci={(v)=>setKunci(Number(v))} 
                                    key={i} 
                                    type="single" 
                                    initialValue={m.content as unknown as JSONContent} 
                                    onChange={handleChangeItemOpsiBiasa} index={i}
                                    />
                            )
                        }
                    </div>
        )
}