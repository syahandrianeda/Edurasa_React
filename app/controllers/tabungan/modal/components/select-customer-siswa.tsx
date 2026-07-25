import { useMemo } from "react";
import { Field } from "~/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAppSelector } from "~/context-reduct/hook";
import { DataCustomerSiswaCurrentRombel } from "~/context-reduct/selectores/data-siswa-aktif-keuangan";
import type { RekapBulananPerKelas } from "~/domain/tabungan/value-objects/rekap-bulan-perkelas-type";
import type { SiswaType } from "~/types/siswa";


export interface SelectCustormerSiswaProps {
    value?: SiswaType;
    onValueChange: (value: SiswaType) => void;
    dataSiswa:(SiswaType)[]
    disabled?: boolean;
}

export default function SelectCustormerSiswa({
        dataSiswa,
        value, 
        onValueChange, 
        disabled, 
    }: SelectCustormerSiswaProps) {
    
        
    return (
        <div className="relative mt-7">
            <div  className="bg-white dark:bg-sky-800 dark:text-sky-100 dark:border-sky-500 dark:border-t w-fit px-2 py-0 text-xs rounded-t-xl absolute top-0 left-1 -translate-y-3.5">Data Siswa</div>
            <Select
                disabled={disabled}
                value={value?.id?.toString()??''}
                
                onValueChange={(val) => {
                    const id = Number(val);
                    const siswa = dataSiswa.find(s=>s.id === id)
                    if(siswa) onValueChange(siswa);
                }}
            >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Pilih Siswa"/>
                </SelectTrigger>

                <SelectContent>
                    {dataSiswa.map(({ id, pd_nama }) => {
                        

                        return (
                            <SelectItem
                                key={id}
                                value={id.toString() ?? ''}
                            >
                                {pd_nama}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}