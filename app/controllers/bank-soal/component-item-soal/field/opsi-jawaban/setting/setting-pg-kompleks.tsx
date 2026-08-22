import { Field } from "~/components/ui/field";
import FieldJumlahOpsi from "../../FieldJumlahOpsi";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import type { SwitchOpsiProps } from "../export-type-switch-props";
import type { OpsiPilihanJawaban, PgKompleks, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import { useEffect } from "react";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";

export default function SettingPgKompleks({bentukSoal,dataOpsi, action}:SwitchOpsiProps){
    const {OpsiPilihanJawaban,formatOpsi} = dataOpsi as unknown as PgKompleks;
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name)! ?? 4;

    const handleFormat = (v:boolean)=>{
        const newFormat = v 
                        ? 'vertical'
                        : 'table';
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab:{...dataOpsi, formatOpsi:newFormat}
            }
        })
    };

    const handleOpsi = (v:number)=>{
        if(v >= optionNodes.prepareOptionsCount.min && v <= optionNodes.prepareOptionsCount.max ){

            let filter:OpsiPilihanJawaban[]=[]
            if(OpsiPilihanJawaban.length > v){
                filter = OpsiPilihanJawaban.filter((s,i)=> i < (v));
            }else if(OpsiPilihanJawaban.length < v){
                filter = [...OpsiPilihanJawaban, {content:'', index:OpsiPilihanJawaban.length-1}]
            }
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...dataOpsi, OpsiPilihanJawaban:filter}
                }
            });
            return 
        }
        alert(`Maaf, opsi jawaban dibatasi minimal ${optionNodes.prepareOptionsCount.min} opsi dan maksimal ${optionNodes.prepareOptionsCount.max}`);
    //         
    };

    useEffect(()=>{
        if(OpsiPilihanJawaban.length === 0 ){
            const newOpsi:OpsiPilihanJawaban[]=[...Array.from({length:optionNodes.decision}, (_,i)=>({content:'', index:i}))];
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{OpsiPilihanJawaban:newOpsi} as PgTunggal
                }
            })
        }
    },[optionNodes, OpsiPilihanJawaban.length]);

    return (
        <div className="flex justify-between w-1/2 gap-4">
            <FieldJumlahOpsi classNameLabel="text-nowrap" bentukSoal={bentukSoal} countOpsi={OpsiPilihanJawaban.length} setCountOpsi={handleOpsi}/>
            <Field orientation={"horizontal"} className="w-full">
                <Switch id="formatOpsi" className="h-5" size="sm" checked={formatOpsi === 'vertical'} onCheckedChange={handleFormat}/>
                <Label htmlFor="formatOpsi">{formatOpsi === 'vertical'? 'List/Daftar':'Tabel'}</Label>
            </Field>
        </div>
    )
}