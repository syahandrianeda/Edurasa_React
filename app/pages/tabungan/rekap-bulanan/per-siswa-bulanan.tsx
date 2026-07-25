import { isSameMonth } from "date-fns";
import { Info } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import {  DtoDataTabunganCurrentRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import type { BulanType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import { formatCurrency } from "~/lib/currency-format";
import type { SiswaType } from "~/types/siswa";
import type { TabunganAppType, UIJumlahTabunganApp } from "~/types/tabungan/tabungan-app-type";

export default function RekapPerSiswaBulanan({fokusBulan}:{fokusBulan?:BulanType}){
    const sheetTabungan = useAppSelector(DtoDataTabunganCurrentRombel);
    const {state, actions} = useModal<TabunganAppType>();
    
    const {value} = useFilterContext<{
        fokusSiswa?:SiswaType,
    }>()

    const id = value?.extra?.fokusSiswa?.id ;
    const indexBulan = fokusBulan?.value;
    const data = useMemo(()=>{
        if(indexBulan){
            const found =  sheetTabungan.filter(s=>s.siswa_id ===  id && isSameMonth(s.time_stamp, indexBulan) && s.status === "");
            if(found.length > 0){
                return found;
            }

        }
        return []
    },[sheetTabungan, fokusBulan?.value, id ]);
    
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

    const ActionTrigger: TriggerTable<TabunganAppType>[] = [
        
        {
            label: 'Snapshot',
            icon: Info,
            callback: (m) => actions.open('INFO', m)
        },
    ]
    
    return (
        <TableWithScrolling className="md:w-4/5 mx-auto">
            <thead>
                <TRowEdura>
                    <ThEdura>No</ThEdura>
                    <ThEdura>Waktu</ThEdura>
                    <ThEdura className="text-wrap w-5">Debit<br/>(Masuk)</ThEdura>
                    <ThEdura className="text-wrap w-5">Kredit<br/>(Keluar)</ThEdura>
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
                                <TdEdura className="w-5">{m.time_stamp?.toLocaleString('id-ID', {dateStyle:'long', timeStyle:'long'})}</TdEdura>
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
                    <ThEdura className="text-end font-bold text-xl">{jumlahJalan.saldo && formatCurrency(jumlahJalan.saldo)||''}</ThEdura>
                    <ThEdura className="print:hidden text-[8px] text-wrap lowercase">{
                        jumlahJalan.totalSnapshot && <span>{jumlahJalan.totalSnapshot} snapshot</span>
                    }</ThEdura>
                </TRowEdura>
            </tfoot>
        </TableWithScrolling>
    )
}