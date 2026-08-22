import { Field } from "~/components/ui/field";
import FieldJumlahOpsi from "../../FieldJumlahOpsi";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import type { SwitchOpsiProps } from "../export-type-switch-props";
import type { OpsiPilihanJawaban, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import { useEffect, useState } from "react";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";

export default function SettingPg({bentukSoal,dataOpsi, action}:SwitchOpsiProps){
    const {OpsiPilihanJawaban,formatOpsi, valid} = dataOpsi as unknown as PgTunggal;
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name)!;
    
    /** local state */
    const [contentIndex, setContentIndex] = useState<OpsiPilihanJawaban[]>(OpsiPilihanJawaban)
    const [countOpsi, setCountOpsi] = useState<number>(optionNodes.decision);
    const [kunci, setKunci ] = useState<number|undefined>(valid)

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
            setCountOpsi(v);
            // setKunci((prev)=>{
            //     /** jika kunci sebelumnya nilai lebih dari jumlahopsi, maka kembalikan ke A 
            //      *  Misal, kuncinya adalah `D` artinya `kunciJawaban` = 3 (diawali index),
            //      * sementara D dihapus karena countOpsinya bernilai 3, maka
            //      * if(3>(3-1)) => 3 > 2 => benar;
            //      * jika kunci A, opsi dihapus sampai C (countOpsi: 3)
            //      * if(0 > 2) =>salah, jadi dikembalikan ke A via `return prev`
            //     */
            //     if (!prev) return 0
            //     if(prev > (v-1)){
            //         return v-1
            //     }
            //     return prev;
            // });
            return 
        }
        alert(`Maaf, opsi jawaban dibatasi minimal ${optionNodes.prepareOptionsCount.min} opsi dan maksimal ${optionNodes.prepareOptionsCount.max}`);
    //         
    };
    useEffect(()=>{
        if(!valid){
            setKunci(0)
        }else{
            setKunci(prev=>{
                console.log('setter', {prev, countOpsi})
                if(!prev) return valid
                if(prev > countOpsi-1){
                    return countOpsi-1
                }
                return prev
            })
        }
    },[valid, countOpsi]);

    useEffect(()=>{
        setContentIndex((prev) => {
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
    },[countOpsi]);

    useEffect(()=>{
        // const kunci = valid && (valid > countOpsi-1)
        //             ? (valid-1)
        //             : valid;
                    console.log('pengaruh ubah jumlah opsi terhadap kunci jawaban', kunci, valid, contentIndex.length)
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab:{
                    OpsiPilihanJawaban:contentIndex,
                    formatOpsi, 
                    valid:kunci
                }
            }
        })
    },[contentIndex, kunci])
    
    
    return (
        <div className="flex justify-between w-1/2 gap-4">
            <FieldJumlahOpsi classNameLabel="text-nowrap" bentukSoal={bentukSoal} countOpsi={countOpsi} setCountOpsi={handleOpsi}/>
            <Field orientation={"horizontal"} className="w-full">
                <Switch id="formatOpsi" className="h-5" size="sm" checked={formatOpsi === 'vertical'} onCheckedChange={handleFormat}/>
                <Label htmlFor="formatOpsi">{formatOpsi === 'vertical'? 'List/Daftar':'Tabel'}</Label>
            </Field>
            {countOpsi}
            {kunci}
        </div>
    )
}