import { useEffect, useMemo, useState } from "react";
import SelectBulanCurrentTapel, { formatter } from "~/components/fields/select-bulan";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Field } from "~/components/ui/field"
import { DataCustomerSiswaCurrentRombel } from "~/context-reduct/selectores/data-siswa-aktif-keuangan";
import type{ SiswaType } from "~/types/siswa";
import SelectCustormerSiswa from "../modal/components/select-customer-siswa";
import { useAppSelector } from "~/context-reduct/hook";
import { SwitchModePenabungAktif } from "~/components/toolbars/state-toolbar/comp-switch";
import { DataTabunganRekapCurrentRombel, DataTabunganRekapPenabungAktifCurrentRombel, DtoDataTabunganCurrentRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import { createRekapBulananPerKelas } from "~/domain/tabungan/service/create-rekap-tabungan";

export type BulanType = {
    value:Date,
    label:string
}
export type JenisRekapType  =  {
    value:string,
    label: string;
}

const JenisRekap:JenisRekapType[] = [
    {
        value:'bulanan',
        label:'Bulanan'
    },
    {
        value:'total',
        label:'Total'
    },
    {
        value:'snapshot',
        label:'Snapshot'
    },
]
const JenisKelompokData:JenisRekapType[] = [
    {
        value:'perSiswa',
        label:'per Siswa'
    },
    {
        value:'perKelas',
        label:'per Kelas/Rombel'
    },
]

export default function JenisRekapKeuangan(){
    const {value, updateExtra} = useFilterContext<{
        jenisRekap?:JenisRekapType,
        jenisKelompokData?:JenisRekapType,
        fokusBulan?:BulanType,
        fokusSiswa?:SiswaType,
        onlyPenabung?:boolean
    }>();
    const SiswaRombel:SiswaType[] = useAppSelector(DataCustomerSiswaCurrentRombel);
    const penabungAktif = useAppSelector(DataTabunganRekapPenabungAktifCurrentRombel);
    const [bulan, setBulan] = useState(() => new Date());
    const [nasabah, setNasabah] = useState<SiswaType>();

    
    const dataCustomer = useMemo(()=>{
        if(value?.extra?.onlyPenabung){
            const map = penabungAktif.map(m=>m.siswa_id);
            return SiswaRombel.filter(s=> map.includes(s.id))
        }
        return SiswaRombel
    },[SiswaRombel, value?.extra?.onlyPenabung, penabungAktif])

    useEffect(()=>{
        const namaBulan = formatter.format(bulan);
        updateExtra(draft=>{
            draft.fokusBulan ={value:bulan, label:namaBulan}
        })
    }, [bulan]);

    useEffect(()=>{
        updateExtra(draft=>{
            draft.jenisRekap = JenisRekap[0];
            draft.jenisKelompokData = JenisKelompokData[0]
        });
        
    },[]);

    useEffect(()=>{

        updateExtra(draft=>{
            draft.fokusSiswa = nasabah
        })
    },[nasabah])

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700  dark:text-black  border shadow-sky-300 shadow-sm relative bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className="bg-white dark:bg-sky-700 dark:text-sky-100 dark:border-sky-300 dark:border w-fit px-2 py-0 text-xs rounded-t-xl absolute top-0 left-1 -translate-y-4.5">Jenis Kategori</div>
                <Field className="relative mt-2">
                    <div className="text-xs absolute bg-white dark:text-gray-100 text-gray-500 dark:bg-sky-900 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1">Jenis Rekap</div>
                    <ol className="list-none list-inside bg-white p-2 rounded dark:bg-sky-900">
                        {
                            JenisRekap.map((m, index)=>
                                <li key={m.value+'_'+index} className="py-1 has-checked:underline">
                                        <label htmlFor={m.value} className="flex gap-2 text-xs cursor-pointer capitalize has-checked:font-bold has-checked:text-blue-800 dark:has-checked:text-yellow-300">
                                            <input
                                                type="radio"
                                                value={m.value}
                                                name="jenis-rekap"
                                                id={m.value}
                                                checked={m.value === value?.extra?.jenisRekap?.value}
                                                onChange={() => updateExtra(draft=>{ draft.jenisRekap = m })}
                                            />
                                            {m.label}
                                        </label>
                                            {/* <span className="capitalize text-[8px] has-checked:text-xs">{m.way_correction}</span> */}
                                    </li>
                            )
                        }
                    </ol>
                </Field>
                <Field className="relative mt-2">
                    <div className="text-xs absolute bg-white dark:text-gray-100 text-gray-500 dark:bg-sky-900 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1">Jenis Kelompok Data</div>
                    <ol className="list-none list-inside bg-white p-2 rounded dark:bg-sky-900">
                        {
                            JenisKelompokData.map((m, index)=>
                                <li key={m.value+'_'+index} className="py-1 has-checked:underline">
                                        <label htmlFor={m.value} className="flex gap-2 text-xs cursor-pointer capitalize has-checked:font-bold has-checked:text-blue-800 dark:has-checked:text-yellow-300">
                                            <input
                                                type="radio"
                                                value={m.value}
                                                name="jenis-kelompokData"
                                                id={m.value}
                                                checked={m.value === value?.extra?.jenisKelompokData?.value}
                                                onChange={() => updateExtra(draft=>{ draft.jenisKelompokData = m })}
                                            />
                                            {m.label}
                                        </label>
                                            {/* <span className="capitalize text-[8px] has-checked:text-xs">{m.way_correction}</span> */}
                                    </li>
                            )
                        }
                    </ol>
                </Field>
            </div>
            <div className='md:col-span-2 inner-shadow-sky-700 relative border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div  className="bg-white dark:bg-sky-700 dark:text-sky-100 dark:border-sky-300 dark:border w-fit px-2 py-0 text-xs rounded-t-xl absolute top-0 left-1 -translate-y-4">Parameter</div>
                <SwitchModePenabungAktif/>
                {
                    value?.extra?.jenisRekap?.value && ['bulanan','snapshot'].includes(value?.extra?.jenisRekap?.value) && (
                        <div className="flex justify-between md:flex-row flex-col gap-2 align-middle">
                            <SelectBulanCurrentTapel value={bulan} onValueChange={setBulan}/>
                        </div>
                    )
                }
                {
                    value?.extra?.jenisKelompokData?.value === 'perSiswa' && <SelectCustormerSiswa dataSiswa={dataCustomer} value={nasabah} onValueChange={setNasabah}/>
                }
            </div>
        </div>
    )
}