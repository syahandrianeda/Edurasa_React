import type { BulanType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { DataTabunganRekapCurrentRombel, DataTabunganRekapPenabungAktifCurrentRombel, DtoDataTabunganCurrentRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TdEduraFreeze, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { isSameDay, isSameMonth } from "date-fns";
import { formatCurrency } from "~/lib/currency-format";
import { ShortDayName } from "~/lib/date-helper";
import { KeteranganKaldikNonSetting } from "~/controllers/kaldik-controller/modal-kaldik/field-keterangan-nonsetting";

export default function SnapshotPerKelasBulanan({fokusBulan}:{fokusBulan?:BulanType}){
    const kaldik = useAppSelector(instanceOfKaldik);
    const {value} = useFilterContext<{
        onlyPenabung?:boolean,
        fokusBulan?:BulanType
    }>();
    const sheetTabungan = useAppSelector(DtoDataTabunganCurrentRombel)
    const penabungAktif = useAppSelector(DataTabunganRekapPenabungAktifCurrentRombel);
    const penabungRombel = useAppSelector(DataTabunganRekapCurrentRombel);
    
    const dataPresentation = value?.extra?.onlyPenabung ? penabungAktif : penabungRombel;
    const currentIndexBulan = value?.extra?.fokusBulan?.value?.getMonth();
    const Tgl = useMemo(() => {
            return kaldik.arrayDateInMonth(fokusBulan?.value ?? new Date(),false)
        }, [kaldik, fokusBulan]);
    
    const dataKeterangan = useMemo(()=> {
        if(!fokusBulan?.value) return;
            return  kaldik.KeteranganInMonth(fokusBulan?.value);//.filter(s=>s.keterangan !== firstKeterangan);
            
        }
        ,[fokusBulan?.value]);
    
    const TotalPerTanggal = useCallback((tgl:Date)=>{
        const nominalTglIni =  sheetTabungan.filter(s=>isSameDay(s.time_stamp, tgl));
        return nominalTglIni.length > 0 ? nominalTglIni.map(m=>{
            const masuk = m.masuk ?? 0;
            const keluar = m.keluar ? m.keluar * -1 : 0
            return masuk || keluar
        }).reduce((a, b)=>a + b): 0
    },[Tgl, sheetTabungan])    
    
    const TotalPerBulan = useCallback((tgl:Date)=>{
        const nominalTglIni =  sheetTabungan.filter(s=>isSameMonth(s.time_stamp, tgl));
        return nominalTglIni.length > 0 ? nominalTglIni.map(m=>{
            const masuk = m.masuk ?? 0;
            const keluar = m.keluar ? m.keluar * -1 : 0
            return masuk || keluar
        }).reduce((a, b)=>a + b): 0
    },[Tgl,sheetTabungan])    
    
    
    const total = value?.extra?.fokusBulan?.value && TotalPerBulan(value?.extra?.fokusBulan?.value)

    return (
        <>
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura rowSpan={2}>Nama</ThEdura>
                        <ThEdura rowSpan={2}>Jumlah Snapshot</ThEdura>
                        <ThEdura colSpan={Tgl.length}>Tanggal di Bulan {value?.extra?.fokusBulan?.label}</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        {
                            Tgl.map((m, i)=>
                                <ThEdura key={m.tgl} style={m.style}>
                                    <div className="flex flex-col capitalize mt-1">
                                        <span className="text-[10px]">
                                            {m.date.getDate()}
                                        </span>
                                        <span className="text-[8px]">
                                            {ShortDayName[m.date.getDay()]} 
                                        </span>
                                    </div>
                                </ThEdura>
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
                                const data_transaksi = m.data_perbulan.find(f=>f.index_bulan === currentIndexBulan)
                                const jumlahPerBulan = data_transaksi?.total_tabungan
                                return (
                                <TRowEdura key={m.siswa_id} className="even:bg-white">
                                    <TdEdura>{ii+1}</TdEdura>
                                    <TdEduraFreeze stateFreeze={true} className="bg-inherit">{m.nama_siswa}</TdEduraFreeze>
                                    <TdEdura className="text-end font-bold">{jumlahPerBulan && formatCurrency(jumlahPerBulan)}</TdEdura>
                                    {
                                        Tgl.map((m, iii)=>{
                                            const transaksi = data_transaksi?.data_transaksi?.find(tr=>isSameDay(tr.tanggal, m.date)) ;//?? '-';
                                            const warningIsi = transaksi?.kolom === 'keluar'? 'text-rose-800 font-bold':'';
                                            
                                            const sel = transaksi?.nominal && formatCurrency(transaksi?.nominal);
                                            return (
                                                <TdEdura key={iii} className={m.isLibur?'bg-rose-500':'text-end'} style={m.style}>
                                                    <span className={warningIsi}>{sel}</span>
                                                </TdEdura>
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
                        <TdEdura colSpan={2} className="text-end">Jumlah</TdEdura>
                        <TdEdura className="text-end font-bold">{total && formatCurrency(total) ||''}</TdEdura>
                        {
                            Tgl.map((m,index)=>
                                <TdEdura key={index} style={m.style} className={m.isLibur?'bg-rose-500':'text-end'}>{TotalPerTanggal(m.date) === 0 ? '' : formatCurrency(TotalPerTanggal(m.date))}</TdEdura>
                            )
                        }
                    </TRowEdura>
                </tfoot>
            </TableWithScrolling>
            <KeteranganKaldikNonSetting className="w-1/2 mt-2" label="Keterangan" dataKeterangan={dataKeterangan ?? []}/>
        </>
    )
}