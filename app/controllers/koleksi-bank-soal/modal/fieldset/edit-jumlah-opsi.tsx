import {useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction} from 'react';
import { InputText } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import type{ OpsiPilihanJawabanType } from '~/types/bank-soal/bentuk-soal/json-alat-jawab-type';
import type { PgTunggalType } from '~/types/bank-soal/bentuk-soal/pg-type';

export default function EditJumlahOpsiPG({opsiJawaban, setOpsiJawaban}:{opsiJawaban:PgTunggalType, setOpsiJawaban:Dispatch<SetStateAction<PgTunggalType>>}){
    
    const [countOpsi, setCountOpsi] = useState<number>(opsiJawaban.OpsiPilihanJawaban.length);
    const [opsiPgLocal, setOpsiPgLocal] = useState<OpsiPilihanJawabanType[]>(opsiJawaban.OpsiPilihanJawaban ?? [])


    const handleChangeCountOpsi = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        setCountOpsi(Number(value))
    }
    useEffect(()=>{
        setOpsiPgLocal((prev)=>{
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
        })
    },[countOpsi])

    useEffect(()=>{

        setOpsiJawaban((prev)=>{
            return {...prev, OpsiPilihanJawaban:opsiPgLocal}
        })
    },[opsiPgLocal])
    return (
        <Field className="relative mt-4">
            <InputText type="number" label="Edit Jumlah Opsi" value={countOpsi} onChange={handleChangeCountOpsi}></InputText>
        </Field>
    )
}