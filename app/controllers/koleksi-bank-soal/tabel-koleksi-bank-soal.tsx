import { TRowEdura, ThEdura, TdEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import SwitchTriggerModalEditItemBankSoal from "./trigger-show-modal-from-table";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import { useModal } from "~/components/modals/modal-provider";
import TablePropertiKurikulum from "./views/tabel-properti-kurkulum";
import CardSoalPreview from "./views/card-soal-preview";

export default function TableKoleksiBankSoal({data, startIndex}:{data:BankSoalAppType[], startIndex:number}){
    const {actions} = useModal<BankSoalAppType>();
    return (
        <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura className="print:hidden">Status</ThEdura>
                        <ThEdura>Soal</ThEdura>
                        <ThEdura className="text-wrap">Metadata Soal (Properti Kurikulum)</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        data && data.length === 0
                        ? (
                            <TRowEdura>
                                <TdEdura colSpan={6} className="text-center">Tidak ada Data</TdEdura>
                            </TRowEdura>
                        ) : (
                            data.map((m, i) => (
                                <TRowEdura key={i} className={`${m.kd_id === 0 ?'odd:bg-rose-100 even:bg-rose-100':''}`}>
                                    <TdEdura className="text-center print:hidden">
                                        <SwitchTriggerModalEditItemBankSoal actions={actions} data={m}/>
                                    </TdEdura>
                                    <TdEdura className="min-w-sm max-w-md">
                                        <CardSoalPreview noDisplay={(startIndex+i+1)} data={m}/>
                                    </TdEdura>
                                    <TdEdura className="text-wrap">
                                        <TablePropertiKurikulum modeKeterangan={true} currentData={m}/>
                                    </TdEdura>
                                </TRowEdura>
                            ))
                            
                        )
                    }
                </tbody>
            </TableWithScrolling>
                    
    )
}