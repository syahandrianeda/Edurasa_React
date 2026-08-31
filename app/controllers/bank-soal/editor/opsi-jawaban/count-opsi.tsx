import {useEffect, useState, type Dispatch, type SetStateAction} from 'react';
import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";
import { cn } from '~/lib/utils';
import type { ListBentukSoalType, OpsiPilihanJawaban, OpsiPilihanTabel } from "~/types/bank-soal/bentuk-soal-type";


export default function CountOpsi({
    bentukSoal,
    countOpsi, 
    setCountOpsi,
    classNameField,
    classNameLabel,
    classNameInput,
    

    }:{
        bentukSoal:ListBentukSoalType,
        classNameField?:string,
        classNameLabel?:string, 
        classNameInput?:string,
        countOpsi:number,
        setCountOpsi:(v:number)=>void,
        // setKunciJawaban: Dispatch<SetStateAction<number>>
    }){

    // const [countOpsi, setCountOpsi] = useState<number>(4);
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name);
    
    const handlerCountOpsi = (v:number)=>{
        if(!optionNodes)return;

        if(v >= optionNodes.prepareOptionsCount.min && v <= optionNodes.prepareOptionsCount.max ){
            setCountOpsi(v);
            /** ===== countOpsi 
             * disini seharusnya jumlah opsiJawaban berubah
             *  tapi akan dihandle oleh useEffect dari devedency `countOpsi`
             */

            /** ==== berefek ke kunci jawaban
             * Karena jumlah opsi berubah, data `OpsiPilihanJawabanBerubah`, 
             * seharusnya, kunci jawaban `valid` juga berubah;
             * perubahan `OpsiJawabanBerubah` menjadikan `valid` kembali ke awal
             * setKunciJawababIndex(0);
             * atau, 
             * jika kunci jawaban sebelumnya index-nya terhapus, kembalikan ke nol, jika tidak biarkan
             */
            // setKunciJawaban((prev)=>{
            //     /** jika kunci sebelumnya nilai lebih dari jumlahopsi, maka kembalikan ke A 
            //      *  Misal, kuncinya adalah `D` artinya `kunciJawaban` = 3 (diawali index),
            //      * sementara D dihapus karena countOpsinya bernilai 3, maka
            //      * if(3>(3-1)) => 3 > 2 => benar;
            //      * jika kunci A, opsi dihapus sampai C (countOpsi: 3)
            //      * if(0 > 2) =>salah, jadi dikembalikan ke A via `return prev`
            //     */
            //     if(prev > (v-1)){
            //         return 0
            //     }
            //     return prev;
            // });
            /** cegah untuk  lanjut*/
            return;
        }
        alert(`'Jumlah Opsi opsi minimal ${optionNodes.prepareOptionsCount.min}, maksimal ${optionNodes.prepareOptionsCount.max}`);
    };
    useEffect(()=>{
        if(countOpsi === 0) {
            setCountOpsi(optionNodes?.decision!)
        }
        
    },[]);

    return (
        <Field orientation="horizontal" className={cn("gap-2 text-xs py-1 w-fit", classNameField)}>
            <label htmlFor="jumlahOpsi" className={cn('text-xs',classNameLabel)}>Atur Jumlah Opsi</label>
            <Input type="number"
                    id="jumlahOpsi" 
                    className={cn("w-20 py-0 h-5 text-xs", classNameInput)}
                    min={optionNodes?.prepareOptionsCount.min} 
                    max={optionNodes?.prepareOptionsCount.max}
                    value={countOpsi}
                    onChange={(e)=>handlerCountOpsi(Number(e.currentTarget.value))}
                    // onChange={(e)=>setCountOpsi(Number(e.currentTarget.value))}
                    />

        </Field>
    )
}