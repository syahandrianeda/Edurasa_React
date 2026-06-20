import { PencilIcon, PlusIcon, Trash } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import { groupByOriginalOrder } from "~/lib/group-by";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { faseOrm, OrmFaseKurikulumType } from "~/types/kurikulum/kurikulum-type";

export default function TableFaseTp(){
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {actions} = useModal<OrmFaseKurikulumType>();
    const dataGroup = useMemo(()=>{
        return data && groupByOriginalOrder(data.currentFase?.elemen_cp??[],(m)=>m.elemen)

    },[data.currentFase?.elemen_cp]);

    const ActionTrigger: TriggerTable<OrmFaseKurikulumType>[] = [
        {
            label: 'Tambah TP',
            icon: PlusIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT TP', {...m,
                    idbaris_tp:0,
                    fase_name:m.fase_name,
                    // source_tab?:string,
                    // source_data_tp?:FaseKurikulumType
                    tp:'',
                    // kelas?:number[],
                    // atp?:OrmAtp[],
                    countItem:0,
                    atp:[],
                    status:''
                },{closeOnOutsideClick:false})
            }
        },
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
    const ActionTriggerAdd: TriggerTable<OrmFaseKurikulumType>[] = [
        {
            label: 'Tambah TP',
            icon: PlusIcon,
            callback: (m) =>{ 
                
                actions.open('EDIT TP', {...m,
                    idbaris_tp:0,
                    fase_name:m.fase_name,
                    // source_tab?:string,
                    // source_data_tp?:FaseKurikulumType
                    tp:'',
                    // kelas?:number[],
                    // atp?:OrmAtp[],
                    countItem:0,
                    atp:[],
                    status:''
                },{closeOnOutsideClick:false})
            }
        },
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
                    dataGroup && Object.keys(dataGroup).map((key,gi) =>{
                            const dataElemen = dataGroup[key];
                            // Menghitung total baris elemen dengan memastikan minimal 1 baris jika TP kosong
                            const countsRowElemen = dataElemen.reduce((acc, item) => acc + Math.max(1, item.tp_fase_properties?.length || 0), 0);

                            return dataElemen.map((cp, indexCp)=>{
                                const tpList = cp.tp_fase_properties.length
                                    ? cp.tp_fase_properties
                                    : [null]

                                return tpList.map((tp,indexTp)=>
                                    <TRowEdura key={gi+''+indexCp+'_'+indexTp}>
                                        {
                                            (indexCp === 0 && indexTp === 0) && 
                                            <TdEdura 
                                                rowSpan={countsRowElemen} 
                                                className="text-wrap max-w-32 align-middle font-semibold">{cp.elemen}</TdEdura>
                                        }
                                        {
                                            (indexTp === 0)  && <TdEdura rowSpan={tpList.length} className="text-wrap max-w-xs">{cp.cp_utama}</TdEdura>
                                        }
                                        <TdEdura className="text-wrap max-w-xl">
                                            {tp?.tp ?? <span className="text-rose-400 text-[10px] italic font-bold">Belum ada TP. Silakan tambahkan di fitur Tujuan Pembelajaran</span>}
                                        </TdEdura>
                                        <TdEdura className="print:hidden align-middle text-center">
                                            {tp ? (
                                                <ActionButtonTable<OrmFaseKurikulumType>
                                                    data={tp}
                                                    trigger={ActionTrigger}
                                                />
                                            ):(
                                                <ActionButtonTable<OrmFaseKurikulumType>
                                                    data={{
                                                        idbaris_tp:0,
                                                            fase_name:data.currentFase?.faseName, // fase A, fase B, fase C
                                                            // source_tab?:string,
                                                            source_data_tp:{
                                                                idbaris:0,
                                                                foreignkey_elemencp:cp.id_elemen_cp,
                                                                status:'',
                                                                // countItem:0,
                                                                // kelas:[],
                                                                tp:'',
                                                                atp:'',
                                                            },
                                                            tp:'',
                                                            // kelas?:number[],
                                                            atp:[],
                                                            countItem:0

                                                    }}
                                                    trigger={ActionTriggerAdd}
                                                    />
                                            )
                                        }
                                        </TdEdura>
                                    </TRowEdura>
                                )
                            })
                        }
                    )
                }
                
            </tbody>
        </TableWithScrolling>
    )
}
/**
data.currentFase?.elemen_cp?.map(({elemen,cp_utama,countItem,tp_fase_properties},index)=>
    tp_fase_properties?.map((dataTp,indexTp)=>
        indexTp===0  ?   (
            <TRowEdura key={indexTp+index}>
                <TdEdura rowSpan={tp_fase_properties.length} className="text-wrap">{elemen}</TdEdura>
                <TdEdura rowSpan={tp_fase_properties.length} className="text-wrap max-w-lg">{cp_utama}</TdEdura>
                <TdEdura className="text-wrap max-w-xl">{dataTp.tp}</TdEdura>
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
 */