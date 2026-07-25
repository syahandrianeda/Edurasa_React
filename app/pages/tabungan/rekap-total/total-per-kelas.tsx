import type { BulanType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { DataTabunganRekapCurrentRombel, DataTabunganRekapPenabungAktifCurrentRombel, DtoDataTabunganCurrentRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TdEduraFreeze, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { isSameMonth } from "date-fns";
import { formatCurrency } from "~/lib/currency-format";

export default function TotalTabunganPerKelas({fokusBulan}:{fokusBulan?:BulanType}){
    const kaldik = useAppSelector(instanceOfKaldik);
    const {value} = useFilterContext<{
        onlyPenabung?:boolean,
        fokusBulan?:BulanType
    }>();
    const sheetTabungan = useAppSelector(DtoDataTabunganCurrentRombel)
    const penabungAktif = useAppSelector(DataTabunganRekapPenabungAktifCurrentRombel);
    const penabungRombel = useAppSelector(DataTabunganRekapCurrentRombel);
    const dataPresentation = value?.extra?.onlyPenabung ? penabungAktif : penabungRombel;
    
    const Tgl = useMemo(() => {
            return kaldik.getarrayMonthInOneTapel()
        }, [kaldik]);
    

    
    const TotalPerBulan = useCallback((tgl:Date)=>{
        const nominalTglIni =  sheetTabungan.filter(s=>isSameMonth(s.time_stamp, tgl) && s.status ==='');
        return nominalTglIni.length > 0 ? nominalTglIni.map(m=>{
            const masuk = m.masuk ?? 0;
            const keluar = m.keluar ? (m.keluar * -1 ): 0
            return masuk || keluar
        }).reduce((a, b)=>a + b): 0
    },[Tgl,sheetTabungan]) 
    
    const totalTabunganSiswa = useMemo(()=>{
        if(penabungAktif.length === 0) return 0
        return penabungAktif.map(m=>m.total).reduce((a,b)=>a+b)
    },[penabungAktif])
    
    
    
    return (
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura rowSpan={2}>Nama</ThEdura>
                        <ThEdura rowSpan={2}>Total</ThEdura>
                        {/* <ThEdura rowSpan={2}>Jumlah</ThEdura> */}
                        <ThEdura colSpan={Tgl.length}>Tanggal di Bulan {value?.extra?.fokusBulan?.label}</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        {
                            Tgl.map((m, i)=>
                                <ThEdura key={m.getMonth()}>{m.toLocaleString('id-ID',{month:'long', year:'numeric'})}</ThEdura>
                            )
                        }
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataPresentation && dataPresentation.length === 0 ? (
                            <TRowEdura>
                                <TdEdura colSpan={Tgl.length + 3} className="text-center text-xl font-bold">Belum ada data</TdEdura>
                                
                            </TRowEdura>
                        ):(
                            dataPresentation.map((m, ii)=>{
                                // const data_transaksi = m.data_perbulan.find(f=>f.index_bulan === currentIndexBulan)
                                // const jumlahPerBulan = data_transaksi?.total_tabungan
                                return (
                                <TRowEdura key={m.siswa_id} className="even:bg-white">
                                    <TdEdura>{ii+1}</TdEdura>
                                    <TdEduraFreeze stateFreeze={true} className="bg-inherit">{m.nama_siswa}</TdEduraFreeze>
                                    <TdEdura className="text-end font-bold">{formatCurrency(m.total)||''}</TdEdura>
                                    {
                                        Tgl.map((t, iii)=>{
                                            const transaksi = m.data_perbulan.find(s=>s.index_bulan === t.getMonth());
                                            const nominal = transaksi?.total_tabungan
                                            return (
                                                <TdEdura key={iii} className="text-end">{nominal && formatCurrency(nominal)||''}</TdEdura>
                                            )
                                        })
                                    }
                                </TRowEdura>
                                )
                            }
                            )
                        )
                    }
                </tbody>
                <tfoot>
                    <TRowEdura>
                        <ThEdura colSpan={2} className="text-end">Jumlah</ThEdura>
                        <ThEdura className="text-end font-bold">{formatCurrency(totalTabunganSiswa) ||''}</ThEdura>
                        {
                            Tgl.map((m,index)=>
                                <ThEdura key={index} className="text-end font-bold">{TotalPerBulan(m) === 0?'':formatCurrency(TotalPerBulan(m))}</ThEdura>
                            )
                        }
                    </TRowEdura>
                </tfoot>
            </TableWithScrolling>
    )
}