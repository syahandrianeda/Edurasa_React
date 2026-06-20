import { PencilIcon, Trash } from "lucide-react";
import { Fragment, useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import { groupBy, groupByOriginalOrder, groupBySortKey } from "~/lib/group-by";
import type { OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";

export default function TableCp(){
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {actions} = useModal<OrmKurikulumMerdekaType>();
    const dataGroupElemen = useMemo(()=>{
        return data?.currentFase && groupByOriginalOrder(data.currentFase?.elemen_cp, (m)=>m.elemen)}, [data.currentFase?.elemen_cp])

    const ActionTrigger: TriggerTable<OrmKurikulumMerdekaType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
        }
    ];
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Elemen</ThEdura>
                    <ThEdura>Capaian Pembelajaran</ThEdura>
                    <ThEdura className="text-wrap">Index (Kode Elemen)</ThEdura>
                    <ThEdura className="print:hidden">Aksi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataGroupElemen && Object.keys(dataGroupElemen).map((key,gi) =>
                        dataGroupElemen[key].map((cp,index)=>
                            <TRowEdura key={index+'_'+gi}>
                                {
                                    (index === 0) && (
                                        <TdEdura rowSpan={dataGroupElemen[key].length} className="align-middle max-w-32 text-start text-wrap">{cp.elemen}</TdEdura>
                                    )
                                }
                                
                                
                                <TdEdura className="text-wrap max-w-lg">{cp.cp_utama}</TdEdura>
                                
                                <TdEdura className="align-middle text-center" data-content-type="number">{cp.index}</TdEdura>
                                <TdEdura className="print:hidden align-middle text-center">
                                    <ActionButtonTable<OrmKurikulumMerdekaType>
                                        data={cp}
                                        trigger={ActionTrigger}
                                    />
                                </TdEdura>
                                
                            </TRowEdura>
                        )

                            
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}

/**
{
                    data.currentFase?.elemen_cp.map((cp,index)=>
                        <TRowEdura key={index}>
                            <TdEdura className="align-middle max-w-32 text-start text-wrap">{cp.elemen}</TdEdura>
                            <TdEdura className="text-wrap max-w-lg">{cp.cp_utama}</TdEdura>
                            <TdEdura className="align-middle text-center" data-content-type="number">{cp.index}</TdEdura>
                            <TdEdura className="print:hidden align-middle text-center">
                                <ActionButtonTable<OrmKurikulumMerdekaType>
                                    data={cp}
                                    trigger={ActionTrigger}
                                />
                            </TdEdura>
                        </TRowEdura>
                        
                    )
                }
 */