import { PencilIcon, Plus, Trash } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTableNonIcon, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import type { propertyTgl } from "~/domain/kaldik/type-output-kaldik";
import { getMemberTanggal, getParseDateYYYYMMMDD } from "~/lib/date-helper";
import type { KaldikType } from "~/types/kaldik";

export function PreviewKaldikModalNonSetting({bulan, tahun, kalenderPerBulan,isSabtuLibur}:{bulan:string, tahun:number, kalenderPerBulan:Record<number, propertyTgl[]>,isSabtuLibur:boolean}){
    
    return(
        <div className="flex flex-col mt-2 w-full text-xs px-1">
            <div className="border rounded-t-2xl bg-zinc-300 flex justify-between px-4 py-1">
                <span>{bulan}</span>
                <span>{tahun}</span>
            </div>
            <div className="h-fit flex bg-white rounded-b-xl border border-zinc-300">
                <table className="w-full text-xs border-separate">
                    <thead>
                        <tr className="border-b-2 border-green-700">    
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
                                    
                                    {
                                        [...Array(7)].map((a,ii)=>{
                                                const findSameIndex = y.find(s=>s.indexWeek === ii);
                                                if(findSameIndex){
                                                    
                                                    return (
                                                        <TdClickableKaldik key={findSameIndex.indexWeek} findSameIndex={findSameIndex}/>
                                                        
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

export function TdClickableKaldik({findSameIndex}:{findSameIndex:propertyTgl}){
    const dataKaldik = useAppSelector(instanceOfKaldik);
    const dataKaldikItem = useMemo(() => {
            return dataKaldik.data
    }, [dataKaldik]);
    const objekKosong = dataKaldik.dataTemplate();
    const {actions} = useModal<KaldikType>();
    const draftAction:TriggerTable<KaldikType>[]=[];
    const objekNew = Object.assign({}, objekKosong, {idbaris:0, start_tgl:findSameIndex.date, end_tgl:findSameIndex.date});
    const objekTamnbah:TriggerTable<KaldikType>={
            label:'Tambah',
            icon: Plus,
            callback: () => actions.open('TAMBAH', objekNew,{closeOnOutsideClick:false})
        }
    draftAction.push(objekTamnbah);
    if(findSameIndex.keteranganKaldik.length > 0){
        findSameIndex.keteranganKaldik.forEach((data)=>{
            const findData = dataKaldikItem.find(s=>s.idbaris === data.idbaris);
            const objekEdit:TriggerTable<KaldikType>={
                label:'Edit '+findData?.keterangan,
                icon: PencilIcon,
                callback: () => actions.open('EDIT', findData,{closeOnOutsideClick:false})
            }
            const objekHapus:TriggerTable<KaldikType>={
                label:'Hapus '+findData?.keterangan,
                icon: Trash,
                callback: () => actions.open('HAPUS', findData,{closeOnOutsideClick:false})
            }
            draftAction.push(objekEdit);
            draftAction.push(objekHapus);
        })

    }
    

    
    
    return (
        
            <td 
                className="rounded-md border-b border-zinc-400 text-center"
                style={findSameIndex.style}
            >
                <ActionButtonTableNonIcon<KaldikType> 
                    data={objekKosong} 
                    trigger={draftAction} 
                    konten={findSameIndex.tgl}/>
            </td>
    )
}
