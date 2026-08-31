import {type ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { CreateItemSoalContextProps } from "../../reducer-item-soal/immer-reducer-context";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";
import ContentWrapperOpsi from "./content-wrapper-setting";
import CountOpsi from "./count-opsi";
import { useCallback, useEffect, useState } from "react";
import type { OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type";
import EditorOpsiJawabanPgTunggal from "./editor-pg-tunggal";

export default function FieldsetPgTunggal({data, action, bentukSoal}:CreateItemSoalContextProps & {bentukSoal:ListBentukSoalType}){
    const [countOpsi, setCountOpsi] = useState<number>();
    const [OpsiPilihanJawaban, setOpsiPilihanJawaban] = useState<OpsiPilihanJawabanType[]>(data.json_alat_jawab?.OpsiPilihanJawaban ?? []);
    const [valid, setValid] = useState<number[]>([0])

    useEffect(()=>{
        
        if(!countOpsi) return
        setOpsiPilihanJawaban((prev)=>{
            
            if(prev.length === 0){
                return Array.from({length:countOpsi}, (_,index)=>({
                    index,
                    content:''
                }))
            }
            
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
        setValid(prev=>{
            if(prev.length === 0){
                return [0]
            }
            if(prev.length > 1){
                return prev.slice(0,1)
            }
            if(prev[0] > (countOpsi-1)){
                return [countOpsi-1]
            }
            return prev;
        })
    },[countOpsi, setOpsiPilihanJawaban, valid]);

    useEffect(()=>{
        
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab: {OpsiPilihanJawaban, valid, formatOpsi:'vertical'},
                jawaban:valid.map(m=>String.fromCharCode(65+m))

            }
        })
    }, [OpsiPilihanJawaban, valid, action]);
    
    const handleChangeItemOpsi = useCallback((index:number, content:string) =>{
                setOpsiPilihanJawaban(prev=>{
                    if(!prev) return OpsiPilihanJawaban;
                    return prev.map((m, i)=> i === index ? {...m, content} : m)

                })
            },[]);
    return (
        <ContentWrapperCreteOpsiJawaban>
            <ContentWrapperOpsi formatOpsi="vertical" bentukSoal={bentukSoal}>
                <CountOpsi bentukSoal={bentukSoal} countOpsi={countOpsi??0} setCountOpsi={setCountOpsi}/>
            </ContentWrapperOpsi>
            <EditorOpsiJawabanPgTunggal 
                dataOpsi={OpsiPilihanJawaban} 
                kunci={valid[0]} 
                setKunci={(v)=>setValid([v as number])}
                handleChangeItemOpsi={handleChangeItemOpsi}/>
        </ContentWrapperCreteOpsiJawaban>
    )
}