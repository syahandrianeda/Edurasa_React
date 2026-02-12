import { useAppSelector } from "~/context-reduct/hook";
import { useMemo, useState } from "react";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ KaldikType } from "~/types/kaldik";
import { getLabelTanggalBetweenDate } from "~/lib/date-helper";
import type { keteranganLabelKaldik } from "~/domain/kaldik/type-output-kaldik";

export default function FieldKeteranganKaldik({date}:{date:Date}){
        const dataKaldik = useAppSelector(instanceOfKaldik);
        const {currentData} = useFormEdura<KaldikType>();
        const [firstKeterangan, setFirstKeterangan] = useState(currentData.keterangan);
        const instanceKaldik = useMemo(() => {
            return dataKaldik.filtering((item)=>item.hapus !=='hapus');
        }, [dataKaldik]);
        const dataKeterangan = useMemo(()=> {
            const sumberKeterangan =  instanceKaldik.KeteranganInMonth(date);//.filter(s=>s.keterangan !== firstKeterangan);
            const indexKeterangan =  instanceKaldik.KeteranganInMonth(date).findIndex(s=>s.keterangan === firstKeterangan);
            const start_tgl = currentData.start_tgl;
            const end_tgl = currentData.end_tgl;
            const ket = currentData.keterangan
            const bg = currentData.backgroundColor
            const color = currentData.color
            const label = getLabelTanggalBetweenDate(start_tgl, end_tgl);
            const member:number[] = [];
            const data:keteranganLabelKaldik = {
                    keterangan:ket,
                    labelTanggal:label,
                    memberTanggal:member,
                    warnaLatar:bg,
                    warnaHuruf:color,
                    className:'bg-amber-200'
                };
            sumberKeterangan.splice(indexKeterangan,1,data);
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