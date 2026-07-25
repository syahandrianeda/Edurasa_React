import { useAppSelector } from "~/context-reduct/hook";
import { useMemo, useState } from "react";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ KaldikType } from "~/types/kaldik";
import type { keteranganLabelKaldik } from "~/domain/kaldik/type-output-kaldik";
import { cn } from "~/lib/utils";

export default function FieldKeteranganKaldikNonSetting({date}:{date:Date}){
        const dataKaldik = useAppSelector(instanceOfKaldik);
        const {currentData} = useFormEdura<KaldikType>();
        const instanceKaldik = useMemo(() => {
            return dataKaldik.filtering((item)=>item.hapus !=='hapus');
        }, [dataKaldik]);
        const dataKeterangan = useMemo(()=> {
            const sumberKeterangan =  instanceKaldik.KeteranganInMonth(date);//.filter(s=>s.keterangan !== firstKeterangan);
            
            return sumberKeterangan;//.sort((a,b)=> a.start_tgl.getTime() - b.start_tgl.getTime());
        }
        ,[currentData]);
        
    return (
        <div className="rounded w-full">
            {
                dataKeterangan.length>0 && (<p className="text-xs border-b bg-sky-100 border-sky-500 ps-1 pe-4 w-fit rounded-tr-2xl">Keterangan</p>)
            }
            <div className="bg-sky-100">
            {
                dataKeterangan.map(({keterangan,labelTanggal, className},index)=>(
                    <p  key={index} className={`flex justify-between text-xs border-b border-sky-500 px-1 ${className||''}`}>
                        <span className="truncate">
                            {keterangan}
                        </span>
                        <span>
                            {labelTanggal}
                        </span>
                    </p>
                ))
            }
            </div>
        </div>
    )
}

export function KeteranganKaldikNonSetting({label, dataKeterangan, className}:{label?:string, dataKeterangan:keteranganLabelKaldik[], className?:string}){
        
        
    return (
        <div className={cn("rounded w-full]", className)}>
            {
                dataKeterangan.length>0 && (<p className="text-[10px] border-b bg-sky-100 border-sky-500 ps-1 pe-4 w-fit rounded-tr-2xl">{label||'Keterangan'}</p>)
            }
            <div className="bg-sky-100">
            {
                dataKeterangan.map(({keterangan,labelTanggal, className},index)=>(
                    <p  key={index} className={`flex justify-between text-[8px] border-b border-sky-500 px-1 ${className||''}`}>
                        <span className="truncate">
                            {keterangan}
                        </span>
                        <span className="text-nowrap">
                            {labelTanggal}
                        </span>
                    </p>
                ))
            }
            </div>
        </div>
    )
}