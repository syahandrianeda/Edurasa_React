import { PencilIcon, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector";
import { moveItem } from "~/lib/move_item";
import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import ButtonSendMapel from "../crud/send-mapelrombel";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import ButtonAddMapel from "~/controllers/kurikulum/modals/button-add-mapel";

export default function TableMapelOrm(){
    
    const mapel = useAppSelector(OrmMapelSelector);
    const {actions} = useModal<jp_mapelSheet>();
    
    
    const ActionTrigger: TriggerTable<jp_mapelSheet>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT MAPEL ROMBEL', m,{closeOnOutsideClick:false})
            }
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS MAPEL ROMBEL', m,{closeOnOutsideClick:false})
        }
    ];  
    const ActionTriggerEdited: TriggerTable<jp_mapelSheet>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT MAPEL ROMBEL', m,{closeOnOutsideClick:false})
            }
        },
    ]
    const [mapelData, setMapelData] = useState<jp_mapelApp[]>([]);
    const instanceMapel = useMemo(()=>{
        return mapel.collectifMapelRaport();
    },[mapel]);
    useEffect(()=>{
        if(instanceMapel.data){
            setMapelData(instanceMapel.data)
        }
    }, [instanceMapel])
    
    const handleMoveUp = (index: number) => {
        if (index === 0) return; // sudah paling atas
        setMapelData(prev => moveItem(prev, index, index - 1));
    };

    const handleMoveDown = (index: number) => {
        if (index === mapelData.length - 1) return; // sudah paling bawah
        setMapelData(prev => moveItem(prev, index, index + 1));
    };
    
    return (
        <>
        <div className="flex justify-between gap-3 print:hidden">
            {
                !instanceMapel.hasRegistered && (
                    <div className="print:hidden text-rose-500 font-bold text-xs">
                        Anda belum menyimpan Mata Pelajaran Raport di server. Berikut adalah mata pelajaran bawaan aplikasi yang disesuaikan dengan KSP sekolah. Silakan tambah/edit salah satu mapel untuk menyimpannya di server untuk mata pelajaran di kelas Anda (rombel).
                    </div>

                )
            }

            <ButtonAddMapel/>
        </div>
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>Kode</ThEdura>
                        <ThEdura>Nama Mapel Rapor</ThEdura>
                        <ThEdura className="text-wrap">JP dalam Seminggu</ThEdura>
                        <ThEdura className="text-wrap">Diikuti Siswa</ThEdura>
                        <ThEdura className="text-wrap">Nama Mapel di Ijazah</ThEdura>
                        <ThEdura className="print:hidden" colSpan={2}>Aksi</ThEdura>
                    </TRowEdura>
                </thead>
                    <tbody>
                        {
                            mapelData.map((data, index) =>
                                <TRowEdura key={index}>
                                    <TdEdura className="align-middle">{index+1}</TdEdura>
                                    <TdEdura className="align-middle">{data.kode}</TdEdura>
                                    <TdEdura className="align-middle">{data.nama_mapel}</TdEdura>
                                    <TdEdura className="text-center align-middle">{data.jp_perminggu}</TdEdura>
                                    <TdEdura className="text-center align-middle">{data.following_students}</TdEdura>
                                    <TdEdura className="align-middle">{data.nama_mapel_ijazah}</TdEdura>
                                    <TdEdura className="print:hidden align-middle text-center">
                                        {
                                            instanceMapel.hasRegistered?(
                                                <ActionButtonTable<jp_mapelSheet>
                                                    data={data}
                                                    trigger={ActionTrigger}
                                                />

                                            ):(
                                                <ActionButtonTable<jp_mapelSheet>
                                                    data={data}
                                                    trigger={ActionTriggerEdited}
                                                />

                                            )
                                        }
                                    </TdEdura>
                                    <TdEdura className="text-center space-x-2 print:hidden">
                                        <div className=" flex flex-row">

                                            <ButtonTooltip asChild tooltip="Naikkan ke atas urutan mapel ini">
                                                <button 
                                                    onClick={() => handleMoveUp(index)}
                                                    disabled={index === 0}
                                                    className="px-2 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                                                >
                                                    ↑
                                                </button>

                                            </ButtonTooltip>
                                            <ButtonTooltip asChild tooltip="Turunkan ke bawah urutan mapel ini">

                                                <button 
                                                    onClick={() => handleMoveDown(index)}
                                                    disabled={index === mapelData.length - 1}
                                                    className="px-2 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                                                >
                                                    ↓
                                                </button>
                                            </ButtonTooltip>
                                        </div>
                                    </TdEdura>
                                </TRowEdura>
                            )
                        }
                    </tbody>
                <tfoot>
                    <TRowEdura>
                        <TdEdura colSpan={3} className="text-center">Total JP dalam Seminggu</TdEdura>
                        <TdEdura className="text-center">{instanceMapel.countJp}</TdEdura>
                        <TdEdura colSpan={4}/>
                    </TRowEdura>
                </tfoot>
            </TableWithScrolling>  
            <ButtonSendMapel data={mapelData}/>
        </>
    )
}