import type { FormatElemen, ListBentukSoalType, OpsiPilihanJawaban, OpsiPilihanJawabanTable, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import FieldJumlahOpsi from "../../FieldJumlahOpsi";
import {useEffect, useMemo, useState} from "react"
import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { Switch } from "~/components/ui/switch";
import { Field } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";

export default function SettingCreatePg({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    const {data, action} = useCreateItemSoalContext();
    const pg = data?.json_alat_jawab as PgTunggal;
    const {OpsiPilihanJawaban, formatOpsi, opsiPilihanTabel, valid } = useMemo(()=>pg,[pg]);
    const [countOpsi, setCountOpsi] = useState<number>(OpsiPilihanJawaban.length);
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name);

    const handleOpsi = (v:number)=>{
        if(!optionNodes){
            alert('tidak ditemukan');
            return;
        }
        if(v >= optionNodes.prepareOptionsCount.min && v <= optionNodes.prepareOptionsCount.max ){
            setCountOpsi(v);
            
            let filter:OpsiPilihanJawaban[]=[]
            if(OpsiPilihanJawaban.length > v){
                filter = OpsiPilihanJawaban.filter((s,i)=> i < (v));
            }else if(OpsiPilihanJawaban.length < v){
                filter = [...OpsiPilihanJawaban, {content:'', index:OpsiPilihanJawaban.length-1}]
            }
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...pg, OpsiPilihanJawaban:filter}
                }
            });
            return;
        }
        alert(`Maaf, opsi jawaban dibatasi minimal ${optionNodes.prepareOptionsCount.min} opsi dan maksimal ${optionNodes.prepareOptionsCount.max}`);
    }
    const handleFormat = (v:boolean)=>{
        const newFormat:FormatElemen = v ? 'vertical' : 'table';
        
        action({
            type:'set_item_soal',
            payload: {
                json_alat_jawab:{...pg, formatOpsi: newFormat}
            }
        })
    }
    useEffect(()=>{
        const opsi = optionNodes?.decision ?? 4
        if(countOpsi === 0 && optionNodes){
            setCountOpsi(opsi);
            const opsiContentIndex:OpsiPilihanJawaban[] = [];
            const OpsiPilihanJawabanTable:OpsiPilihanJawabanTable[] = [];
            Array.from({ length: opsi }, (_, index) => {
                    const opsi:OpsiPilihanJawaban ={ content: "", index, };
                    opsiContentIndex.push(opsi) ;
                }
            );
            
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...pg, OpsiPilihanJawaban:opsiContentIndex}
                }
            });
        }
    },[])
    
    

    return (
        <div className="border flex justify-between w-1/2 gap-4">
            <FieldJumlahOpsi classNameLabel="text-nowrap" bentukSoal={bentukSoal} countOpsi={countOpsi} setCountOpsi={handleOpsi}/>
            <Field orientation={"horizontal"} className="w-full">
                <Switch id="formatOpsi" className="h-5" size="sm" checked={formatOpsi === 'vertical'} onCheckedChange={handleFormat}/>
                <Label htmlFor="formatOpsi">{formatOpsi === 'vertical'? 'List/Daftar':'Tabel'}</Label>
            </Field>
        </div>
    )
}