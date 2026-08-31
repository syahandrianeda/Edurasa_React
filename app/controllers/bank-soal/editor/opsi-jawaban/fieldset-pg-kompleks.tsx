import {type ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { CreateItemSoalContextProps } from "../../reducer-item-soal/immer-reducer-context";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";
import ContentWrapperOpsi from "./content-wrapper-setting";
import CountOpsi from "./count-opsi";
import { useCallback, useEffect, useState } from "react";
import type { OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type";
import EditorOpsiJawabanPgKompleks from "./editor-pg-kompleks";

export default function FieldsetPgKompleks({data, action, bentukSoal}:CreateItemSoalContextProps & {bentukSoal:ListBentukSoalType}){
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
        // setValid(prev=>prev.filter(m=>m !== (countOpsi-1)))
        // setValid(prev=> prev.slice(0, countOpsi));
        if(countOpsi < OpsiPilihanJawaban.length){
            
            setValid(prev=>{
                if(prev.includes(countOpsi)){
                    return prev.filter(s=>s!==(countOpsi))
                }
                return prev
            })
        }
        
    },[countOpsi, setOpsiPilihanJawaban, setValid]);

   

    useEffect(()=>{
        
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab: {OpsiPilihanJawaban, valid, formatOpsi:'vertical'},
                jawaban:valid.map(m=>'opsi ' + (m+1))

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
                <EditorOpsiJawabanPgKompleks 
                    dataOpsi={OpsiPilihanJawaban} 
                    kunci={valid} 
                    setKunci={(v)=>setValid(v as number[])}
                    handleChangeItemOpsi={handleChangeItemOpsi}/>
            </ContentWrapperCreteOpsiJawaban>
        )
}