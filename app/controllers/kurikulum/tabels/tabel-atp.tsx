import { PencilIcon, Trash } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { OrmAtp, OrmFaseKurikulumType, OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";

export default function TableAtp(){
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {actions} = useModal<OrmAtp>();
    const {actions:tpAction} = useModal<OrmFaseKurikulumType>();
    const ActionTriggerAddAtp:TriggerTable<OrmFaseKurikulumType>[] = [
        {
            label: 'Tambah ATP',
            icon: PencilIcon,
            callback: (m) =>{ 
                const ormAtpBlangko:OrmAtp = {
                        idbaris_atp:0,
                        atp:'',
                        source_atp:{
                            idbaris:0,
                            atp:'',
                            foreignkey_tp:m.source_data_tp?.idbaris??0,
                            foreignkey_elemencp:m.source_data_tp?.foreignkey_elemencp??0,
                            kelas:[],
                            status:'',
                        },
                        kelas:[],
                        countItem:1,
                        status:''
                }
                actions.open('TAMBAH ATP', ormAtpBlangko,{closeOnOutsideClick:false})
            }
        },
    ]
    const ActionTrigger: TriggerTable<OrmAtp>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT ATP', m,{closeOnOutsideClick:false})
            }
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS ATP', m,{closeOnOutsideClick:false})
        }
    ];  
    
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Elemen</ThEdura>
                    <ThEdura className="text-wrap">Tujuan Pembelajran (TP)</ThEdura>
                    <ThEdura className="text-wrap">Alur Tujuan Pembelajaran (ATP)</ThEdura>
                    <ThEdura className="text-wrap">Berlaku di Jenjang</ThEdura>
                    <ThEdura className="print:hidden">Aksi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                    {
                        data.currentFase.elemen_cp.map((elemen) => {
                            const tpList = elemen.tp_fase_properties.length
                                ? elemen.tp_fase_properties
                                : [null]

                            return tpList.map((tp, tpIndex) => {
                                const atpList =
                                tp && tp.atp.length
                                    ? tp.atp
                                    : [null]

                                return atpList.map((atp, atpIndex) => {
                                    const key = `${elemen.id_elemen_cp}-${tpIndex}-${atpIndex}`
                                    return (
                                        <TRowEdura key={key} className="odd:bg-white event:bg-white">
                                            
                                            {
                                                tpIndex === 0 && atpIndex === 0 && (
                                                    <TdEdura className="text-wrap align-middle" rowSpan={elemen.countItem || 1}>
                                                    {elemen.elemen}
                                                    </TdEdura>
                                                )
                                            }
                                            
                                            {
                                                atpIndex === 0 && (
                                                    <TdEdura className="text-wrap align-middle"  rowSpan={tp?.countItem || 1}>
                                                    {tp?.tp ?? <span className="text-rose-400 text-[10px] font-extrabold print:hidden">Silakan tambahkan TP di fitur Tujuan Pembelajaran</span>}
                                                    </TdEdura>
                                                )
                                            }
                                            
                                            <TdEdura className="text-wrap" >
                                                {atp?.atp ?? ""}
                                            </TdEdura>
                                            <TdEdura className="text-center">
                                                {
                                                    atp?.kelas.join(', ') ??""
                                                }
                                            </TdEdura>
                                            <TdEdura>
                                                {
                                                    atp ?( <ActionButtonTable<OrmAtp>
                                                        data={atp}
                                                        trigger={ActionTrigger}
                                                    />):
                                                    tp && <ActionButtonTable<OrmFaseKurikulumType>
                                                        data={tp}
                                                        trigger={ActionTriggerAddAtp}
                                                    />
                                                }
                                            </TdEdura>
                                        </TRowEdura>
                                    )
                                })
                            })
                        })
                    }
            </tbody>
        </TableWithScrolling>
    )
}