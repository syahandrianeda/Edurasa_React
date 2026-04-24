import { PencilIcon, Trash } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { OrmFaseKurikulumType } from "~/types/kurikulum/kurikulum-type";

export default function TableFaseTp(){
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {actions} = useModal<OrmFaseKurikulumType>();

    const ActionTrigger: TriggerTable<OrmFaseKurikulumType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT TP', m,{closeOnOutsideClick:false})
            }
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS TP', m,{closeOnOutsideClick:false})
        }
    ];  
    
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Elemen</ThEdura>
                    <ThEdura>Capaian Pembelajaran</ThEdura>
                    <ThEdura className="text-wrap">Tujuan Pembelajran (TP)</ThEdura>
                    <ThEdura className="print:hidden">Aksi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.currentFase.elemen_cp.map(({elemen,cp_utama,countItem,tp_fase_properties},index)=>
                            tp_fase_properties?.map((dataTp,indexTp)=>
                                indexTp===0  ?   (
                                    <TRowEdura key={indexTp+index}>
                                        <TdEdura rowSpan={tp_fase_properties.length} className="text-wrap">{elemen}</TdEdura>
                                        <TdEdura rowSpan={tp_fase_properties.length} className="text-wrap">{cp_utama}</TdEdura>
                                        <TdEdura className="text-wrap">{dataTp.tp}</TdEdura>
                                        <TdEdura className="print:hidden align-middle text-center">
                                            <ActionButtonTable<OrmFaseKurikulumType>
                                                data={dataTp}
                                                trigger={ActionTrigger}
                                            />
                                        </TdEdura>
                                    </TRowEdura>
                                ):(
                                    <TRowEdura key={indexTp+index}>
                                        <TdEdura className="text-wrap">{dataTp.tp}</TdEdura>
                                        <TdEdura className="print:hidden align-middle text-center">
                                            <ActionButtonTable<OrmFaseKurikulumType>
                                                data={dataTp}
                                                trigger={ActionTrigger}
                                            />
                                        </TdEdura>
                                    </TRowEdura>
                                )
                            )
                        
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}