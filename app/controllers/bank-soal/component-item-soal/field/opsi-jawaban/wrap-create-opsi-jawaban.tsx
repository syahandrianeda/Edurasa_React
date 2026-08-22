import { useCallback, useEffect, useState, type Dispatch, type SetStateAction} from "react";
import type { FormatElemen,OpsiPilihanJawaban, ListBentukSoalType, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { type OpsiPilihanJawabanType, type JsonAlatJawab } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type";
import SettingCountOpsi from "./setting-count-opsi";
import SwitchEditorAlatJawab from "./switch-editor-alat-jawab";
import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import OpsiTable from "~/controllers/bank-soal/editor/OpsiTable";
import { generateAlphabet } from "~/lib/generateAlphabet";
import { isDev } from "~/lib/nama-tab-environment";


export default function WrapCreateOpsiJawaban({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    const {data, action} = useCreateItemSoalContext();
    const {OpsiPilihanJawaban, formatOpsi, valid, OpsiPilihanJawabanTable} = data.json_alat_jawab as JsonAlatJawabTupple
    
    /** local state */
    const [countOpsi, setCountOpsi] = useState<number>(OpsiPilihanJawaban?.length);
    const [contentsIndex, setContensIndex] = useState<OpsiPilihanJawaban[]>(OpsiPilihanJawaban ??[])
    const [kunci, setKunci] = useState<JsonAlatJawabTupple['valid']>(valid);
    const [displayOpsi, setDisplayOpsi] = useState<FormatElemen>(formatOpsi);
    const [arrayAbjad, setArrayAbjad] = useState<string[]>([]);

    const handleCountOpsi = useCallback((v:number)=>{
        setCountOpsi(v);
    },[])

    const handleDisplayOpsi = useCallback((v:boolean)=>{
        const display = v
                        ? 'table'
                        : 'vertical';
        setDisplayOpsi(display);
        
    },[])

    const handleKunciJawaban = useCallback((value:number|number[])=>{
        if(Array.isArray(value)){
            setKunci(value);
        }else{
            setKunci(value);
        }

    },[])
    
    const handleChangeItemOpsiBiasa = useCallback((index:number, content:string) =>{
            setContensIndex(prev=>{
                if(!prev) return OpsiPilihanJawaban;
                return prev.map((m, i)=> i === index ? {...m, content} : m)

            })
        },[]);
    
    useEffect(()=>{
            if(['pg'].includes(bentukSoal.name)){
                setKunci(0);
                setCountOpsi(4);
            }else{
                setKunci([0])
            }
        
    },[bentukSoal, setKunci])

    useEffect(()=>{
        setContensIndex((prev) => {
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
        
        setKunci((prev)=>{
            if(typeof prev === 'number'){
                if(prev === 0){
                    return prev
                }else if(prev > (countOpsi - 1)){
                    return (countOpsi - 1)
                }else{
                    return prev
                }
            }else{
                return (prev as number[]).filter(s=>s !== (countOpsi-1))
            }
        });
        const abjad = generateAlphabet(countOpsi);
                
                setArrayAbjad(abjad)
    },[countOpsi])

    useEffect(()=>{
        const normalize:number[] = Array.isArray(kunci) ? kunci.flat(): [kunci];
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab: {
                    OpsiPilihanJawaban:contentsIndex,
                    // valid: kunci,
                    valid: normalize,
                    formatOpsi:displayOpsi
                },
                jawaban:bentukSoal.name==='pg'?normalize.map(m=>String.fromCharCode(65 + m)):normalize//.join(', ')
            }
        })
    },[
        contentsIndex, 
        kunci,
        formatOpsi
    ])
    
    return (
        <div className="relative mt-8 gap-0 bg-linear-to-br  via-amber-300 from-gray-300 to-purple-300 shadow-md shadow-sky-600 rounded-tr-2xl rounded-b-2xl p-2 mb-3">
            <div className="font-bold absolute ps-1 pe-4 rounded-tr-2xl -top-4 left-0 bg-sky-300 text-xs">
                Opsi Jawaban:
            </div>
            <SettingCountOpsi 
                bentukSoal={bentukSoal} 
                countOpsi={countOpsi}
                onChangeCountOpsi = {handleCountOpsi}
                formatOpsi={displayOpsi}
                handleFormat={handleDisplayOpsi}
                />
            {
                displayOpsi === 'vertical' 
                    ? ( 
                        <SwitchEditorAlatJawab 
                                bentukSoal={bentukSoal}
                                dataOpsi={contentsIndex}
                                kunci={kunci}
                                setKunci={handleKunciJawaban}
                                handleChangeItemOpsi={handleChangeItemOpsiBiasa}
                            />
                        )
                    :(isDev?<OpsiTable abjadCollections={arrayAbjad}/>:'Opsi Jawaban dalam Format Tabel dalam proses pengembangan')
            }

        </div>
    )
}