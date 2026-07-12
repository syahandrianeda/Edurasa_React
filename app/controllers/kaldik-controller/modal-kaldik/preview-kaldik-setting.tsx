import { useMemo, useState } from "react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { getMemberTanggal, getParseDateYYYYMMMDD } from "~/lib/date-helper";
import type { KaldikType } from "~/types/kaldik";

export function PreviewKaldikModal({date = new Date()}:{date:Date}){
    const { value} = useFilterContext();
    const isSabtuLibur = value?.sabtuLibur;
    const {currentData} = useFormEdura<KaldikType>();
    const [firstKeterangan, setFirstKeterangan] = useState(currentData.keterangan);
    const dataKaldik = useAppSelector(instanceOfKaldik);
    const instanceKaldik = useMemo(() => {
        console.log(dataKaldik);
        return dataKaldik;
    }, [dataKaldik]);

    const {groupWeek:kalenderPerBulan} = instanceKaldik.groupByWeekInMonth(date,isSabtuLibur);

    const memberStateTanggal = useMemo(()=>{
        return getMemberTanggal(currentData.start_tgl, currentData.end_tgl);
    },[currentData]);

    
    return(
        <div className="flex flex-col mt-2 w-full">
            <div className="border rounded-t-2xl bg-zinc-300 flex justify-between px-4 py-1">
                <span>{date.toLocaleString('id-ID',{month:'long'})}</span>
                <span>{date.getFullYear()}</span>
            </div>
            <div className="h-full flex bg-white rounded-b-2xl">
                <table className="w-full text-xs table border-separate">
                    <thead>
                        <tr className="border-b-2 border-green-700">
                            <th className="border-b-2 border-green-700 py-1">#</th>
                            <th className="text-rose-500 border-b-2 border-green-700 py-1">Mg</th>
                            <th className="border-b-2 border-green-700 py-1">Sn</th>
                            <th className="border-b-2 border-green-700 py-1">Sl</th>
                            <th className="border-b-2 border-green-700 py-1">Rb</th>
                            <th className="border-b-2 border-green-700 py-1">Km</th>
                            <th className="border-b-2 border-green-700 py-1">Jm</th>
                            <th className={`border-b-2 border-green-700 ${isSabtuLibur?'text-rose-500 ':''}py-1`}>Sb</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(kalenderPerBulan).map(([k,y])=>(
                                <tr key={k}>
                                    <td className="text-center text-zinc-400">{k}</td>
                                    {
                                        [...Array(7)].map((a,ii)=>{
                                                const findSameIndex = y.find(s=>s.indexWeek === ii);
                                                if(findSameIndex){
                                                    const paramYyymmdd = getParseDateYYYYMMMDD(findSameIndex.date);
                                                    const findMember = findSameIndex.keteranganKaldik?.find(s=>s.memberTanggal.includes(paramYyymmdd) && s.keterangan === firstKeterangan );
                                                    const findMultipleEventKaldik = findSameIndex.keteranganKaldik?.filter(s=>s.keterangan !== firstKeterangan );
                                                    const bgColorBefore = findMultipleEventKaldik.map(m=>m.warnaLatar);
                                                    const resetStyleByFocus = findMember?.memberTanggal.includes(paramYyymmdd);
                                                    const dateWichCurrentFocus = memberStateTanggal.includes(paramYyymmdd);
                                                    const addCss = dateWichCurrentFocus ?'border-4 border-yellow-300':'border-b border-t border-zinc-400';
                                                    let stateStyle ={
                                                        background:currentData.backgroundColor,
                                                        color: currentData.color
                                                    }

                                                    if(findMultipleEventKaldik.length>0){
                                                        bgColorBefore.unshift(currentData.backgroundColor);
                                                        stateStyle = {
                                                            background:`linear-gradient(-45deg,${bgColorBefore.join(',')})`,
                                                            color: currentData.color
                                                        }
                                                    }
                                                    
                                                    const styleFinal = dateWichCurrentFocus ?stateStyle: resetStyleByFocus?{}:findSameIndex.style;

                                                    return (
                                                        <td key={findSameIndex.indexWeek}
                                                            className={`${addCss} rounded-lg text-center p-0.5`}
                                                            style={styleFinal}
                                                        >
                                                            {
                                                                findSameIndex.tgl
                                                            }
                                                        </td>
                                                    )
                                                }else{
                                                    return (
                                                        <td key={ii}></td>
                                                    )
                                                }
                                            }
                                        )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
