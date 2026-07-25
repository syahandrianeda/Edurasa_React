import { useCallback, useMemo } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { DataTabunganRekapCurrentRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import type { BulanType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import { formatCurrency } from "~/lib/currency-format";
import type { SiswaType } from "~/types/siswa";

export default function TotalTabunganPerSiswa({fokusBulan}:{fokusBulan?:BulanType}){
    const sheetTabungan = useAppSelector(DataTabunganRekapCurrentRombel);
    const kaldik = useAppSelector(instanceOfKaldik);
    
    const {value} = useFilterContext<{
        fokusSiswa?:SiswaType,
    }>()

    const id = value?.extra?.fokusSiswa?.id ;
    const indexBulan = fokusBulan?.value;
    const data = useMemo(()=>{
        if(indexBulan){
            const found =  sheetTabungan.find(s=>s.siswa_id ===  id);
            if(found){
                return found
            }

        }
        return 
    },[sheetTabungan, fokusBulan?.value, id ]);
    
    const Tgl = useMemo(() => {
            return kaldik.getarrayMonthInOneTapel()
        }, [kaldik]);
    
    const findDataBasedNamaBulan = useCallback((tgl:Date)=>{
        const namaBulan = tgl.toLocaleDateString('id-ID', {month:'long', year:'numeric'})
        return data?.data_perbulan.find(s=>s.nama_bulan === namaBulan)?.total_tabungan
    },[Tgl,data])
    return (
        <TableWithScrolling className="md:w-2/3 mx-auto">
            <thead>
                <TRowEdura>
                    {/* <ThEdura>No</ThEdura> */}
                    <ThEdura>Bulan</ThEdura>
                    <ThEdura>Jumlah</ThEdura>
                    {/* <ThEdura className="print:hidden">Aksi</ThEdura> */}
                </TRowEdura>
            </thead>
            <tbody>
                {
                    Tgl.map((m,iData)=>
                        <TRowEdura key={m.getTime()}>
                            {/* <TdEdura>{iData+1}</TdEdura> */}
                            <TdEdura>{m.toLocaleDateString('id-ID', {month:'long', year:'numeric'})}</TdEdura>
                            <TdEdura className="text-end">{findDataBasedNamaBulan(m) && formatCurrency(findDataBasedNamaBulan(m) ?? 0)}</TdEdura>
                            {/* <TdEdura>aksi   </TdEdura> */}
                        </TRowEdura>
                    )
                }
            </tbody>
            <tfoot>
                <TRowEdura>
                    <ThEdura className="text-end text-xl">Total</ThEdura>
                    <ThEdura className="text-end font-bold text-xl">{data?.total && formatCurrency(data?.total)}</ThEdura>
                    {/* <ThEdura className="print:hidden text-[8px] text-wrap lowercase">{
                        jumlahJalan.totalSnapshot && <span>{jumlahJalan.totalSnapshot} snapshot</span>
                    }</ThEdura> */}
                </TRowEdura>
            </tfoot>
        </TableWithScrolling>
    )
}