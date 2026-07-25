import { Info, PencilIcon, Trash } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { formatCurrency } from "~/lib/currency-format";
import type { TabunganAppType, UIJumlahTabunganApp } from "~/types/tabungan/tabungan-app-type";

export default function TableInputTabungan({data}:{data:TabunganAppType[]}){
    const jumlahJalan = useMemo(()=>{
        let saldo:number = 0;
        let totalSnapshot:number=0
        let dataBaru:UIJumlahTabunganApp[] = []
        data.forEach((m, i)=>{
            saldo += m.masuk ?? 0;
            saldo -= m.keluar ?? 0
            totalSnapshot+= m.snapshot? m.snapshot.length : 0
            const item = {...m, saldo:saldo}
            dataBaru.push(item);
        })
        return {dataBaru,saldo, totalSnapshot} 
    },[data]);
    
    const {state, actions} = useModal<TabunganAppType>();
    const ActionTrigger: TriggerTable<TabunganAppType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Snapshot',
            icon: Info,
            callback: (m) => actions.open('INFO', m)
        },
    ]
    
    return (
        <TableWithScrolling className="mt-5">
            <thead>
                <TRowEdura>
                    <ThEdura>No.</ThEdura>
                    <ThEdura>Siswa</ThEdura>
                    <ThEdura>Masuk</ThEdura>
                    <ThEdura>Keluar</ThEdura>
                    <ThEdura>Saldo</ThEdura>
                    <ThEdura className="print:hidden">Aksi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    jumlahJalan && jumlahJalan.dataBaru.length === 0?(
                        <TRowEdura>
                            <TdEdura colSpan={6} className="text-center">Belum ada data</TdEdura>
                        </TRowEdura>
                    ):(
                        jumlahJalan.dataBaru.map((m, i)=>
                            <TRowEdura key={i}>
                                
                                
                                <TdEdura className="w-5 text-center">{i+1}</TdEdura>
                                <TdEdura>{m.nama_siswa}</TdEdura>
                                <TdEdura className="w-35 text-end pe-1">{m.masuk && formatCurrency(m.masuk)}</TdEdura>
                                <TdEdura className="w-35 text-end pe-1">{m.keluar && formatCurrency(m.keluar)}</TdEdura>
                                <TdEdura className="w-35 text-end pe-1">{m.saldo && formatCurrency(m.saldo)}</TdEdura>
                                <TdEdura className="w-15 print:hidden text-center">
                                    <ActionButtonTable<TabunganAppType>
                                        data={m}
                                        trigger={ActionTrigger}
                                    />
                                </TdEdura>
                            </TRowEdura>
                        )
                    )
                }
            </tbody>
            <tfoot>
                <TRowEdura>
                    <ThEdura colSpan={4} className="text-end text-xl">Total</ThEdura>
                    <ThEdura className="text-end font-bold text-xl">{jumlahJalan.saldo && formatCurrency(jumlahJalan.saldo)}</ThEdura>
                    <ThEdura className="print:hidden text-[8px] text-wrap lowercase">{
                        jumlahJalan.totalSnapshot && <span>{jumlahJalan.totalSnapshot} snapshot</span>
                    }</ThEdura>
                </TRowEdura>
            </tfoot>
        </TableWithScrolling>
    )
}