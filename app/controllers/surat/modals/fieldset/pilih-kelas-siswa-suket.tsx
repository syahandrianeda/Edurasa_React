import { useMemo, useState } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import type { SiswaType } from "~/types/siswa";
import { Field } from "~/components/ui/field";
import { InstanceOfRiwayatRombel } from "~/context-reduct/selectores/riwayat-rombel-selector";
import type RiwayatRombelClass from "~/domain/rombel/riwayat-rombel-class";
import { currentTapel } from "~/lib/current-tapel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

interface PilihSiswaSuketProps{
    value: SiswaType|null,
    setValue: (v:SiswaType)=>void
    values: SiswaType[], 
    rombel: string,
    tgl:Date
}
export default function PilihSiswaSuket({value, setValue, values, rombel, tgl}:PilihSiswaSuketProps){
    
    const AllSiswa:SiswaType[] = useAppSelector(selectAllSiswaDTO);
    const RiwayatInstance:RiwayatRombelClass = useAppSelector(InstanceOfRiwayatRombel);
    const tapelShort = currentTapel({variant:'short', date:tgl});
    const tapelFull = currentTapel({variant:'onlyTapel', date:tgl});
    const siswaWithRiwayatRombel = useMemo(()=>{
        const SiswaRombelCurrentTapel = RiwayatInstance.getAllSiswaInTapelHasRombel(tapelShort);
        const siswa = SiswaRombelCurrentTapel.map(m=>({...(AllSiswa.find(s=>s.id === m.id)),nama_rombel:m['tapel_'+tapelShort]}));
            return siswa as SiswaType[]
        },[AllSiswa, RiwayatInstance, tgl, values, rombel]);

    const ListSiswa = useMemo(()=>{
        return  siswaWithRiwayatRombel.filter(s=> !values.map(m=>m.id).includes(s.id!) && s.nama_rombel === rombel)
    },[siswaWithRiwayatRombel]);

    const handleSelectSiswa = (id:string)=>{
        const siswa= siswaWithRiwayatRombel?.find(s=> s.id === Number(id))
        if(siswa) setValue(siswa)
    }

    
    return (
        <Field className="relative w-10/12 mx-auto mt-4">
            <div className="absolute -top-3 left-0 text-xs bg-white px-4 ps-1 text-muted-foreground rounded-tr-2xl">Siswa kelas {rombel} di tapel {tapelFull}</div>
            <Select
                    value={value?.id.toString()??''}
                    onValueChange={handleSelectSiswa}
            >
                <SelectTrigger className="w-full text-center bg-white rounded-s-none">
                    <SelectValue placeholder={`Tambah siswa`}/>
                </SelectTrigger>

                <SelectContent>
                    {
                        ListSiswa.map((m, i)=>
                            <SelectItem
                                key={m.id}
                                value={m.id.toString()}
                                className="flex w-full justify-between gap-2"
                            >
                                <span>{m.pd_nama}</span> 
                                <span>{m.nama_rombel}</span>
                            </SelectItem>
                        )
                    }
                </SelectContent>
            </Select>
        </Field>
    )
}