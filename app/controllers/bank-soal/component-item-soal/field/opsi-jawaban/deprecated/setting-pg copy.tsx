import type { FormatElemen, ListBentukSoalType, OpsiPilihanJawaban, OpsiPilihanJawabanTable, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import FieldJumlahOpsi from "../../FieldJumlahOpsi";
import {useEffect, useState} from "react"
import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { Switch } from "~/components/ui/switch";
import { Field } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";

export default function SettingCreatePg({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    const {data, action} = useCreateItemSoalContext();
    const pg = data?.json_alat_jawab as PgTunggal;
    const formatOpsi = pg?.formatOpsi ?? 'vertical';
    const dataOpsi = pg?.OpsiPilihanJawaban ?? [];
    const [countOpsi, setCountOpsi] = useState<number>(pg.OpsiPilihanJawaban?.length);
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name);
    
    console.log({dataOpsi}, countOpsi, pg)
    const handleOpsi = (v:number)=> {
        if(!optionNodes){
            alert('tidak ditemukan');
            return;
        }
        if(v >= optionNodes.prepareOptionsCount.min && v <= optionNodes.prepareOptionsCount.max ){
            setCountOpsi(v);
            /** build data OpsiPilihanJawaban */
            let OpsiPilihanJawaban:OpsiPilihanJawaban[] = [];
            const OpsiPilihanJawabanTable:OpsiPilihanJawabanTable[] = [];
            if(dataOpsi.length === 0){
                Array.from({ length: countOpsi }, (_, index) => {
                        const opsi:OpsiPilihanJawaban ={ content: "", index, };
                        OpsiPilihanJawaban.push(opsi) ;
                    }
                );
            }
            if(dataOpsi.length > v){
                OpsiPilihanJawaban = dataOpsi.filter((s,i)=>i <(v));
            }
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...pg, OpsiPilihanJawaban}
                }
            })

            return;
        }
        alert(`Maaf, opsi jawaban dibatasi minimal ${optionNodes.prepareOptionsCount.min} opsi dan maksimal ${optionNodes.prepareOptionsCount.max}`);
    };

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
        if(dataOpsi.length === 0 && optionNodes){ 
            setCountOpsi(optionNodes.decision);
            const OpsiPilihanJawaban:OpsiPilihanJawaban[] = [];
            const OpsiPilihanJawabanTable:OpsiPilihanJawabanTable[] = [];
            Array.from({ length: optionNodes.decision }, (_, index) => {
                    const opsi:OpsiPilihanJawaban ={ content: "", index, };
                    OpsiPilihanJawaban.push(opsi) ;
                }
            );
            
            action({
                type:'set_item_soal',
                payload:{
                    json_alat_jawab:{...pg, OpsiPilihanJawaban}
                }
            });
            console.log(data.json_alat_jawab)
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