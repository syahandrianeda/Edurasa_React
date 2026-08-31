import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import { TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function TablePropertiKurikulum({
    currentData, 
    modeKeterangan
    }:{
        currentData:BankSoalAppType,
        modeKeterangan?:boolean

    }){
    if(!currentData.snapshot_kurikulum) return (
        <TableWithScrolling className="text-[12px] border-0">
            <tbody>
                <TRowEdura>
                    <td className="align-top px-1 border-b text-center text-rose-400 font-semibold">Tidak memiliki Properti Kurikulum</td>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
    return (
            <TableWithScrolling className="text-[12px] border-0">
            <tbody>
                <TRowEdura>
                    <td className="align-top px-1 border-b">Indikator Soal</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b first-letter:uppercase">{currentData.indikator_soal}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b">Fase</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b first-letter:uppercase">{currentData.snapshot_kurikulum?.fase}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b">{modeKeterangan?'ATP':'Alur Tujuan Pembelajaran (ATP)'}</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b first-letter:uppercase">{currentData.snapshot_kurikulum?.atp_as_tp_description}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b">{modeKeterangan?'TP':'Tujuan Pembelajaran'}</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.tp_as_cp_description}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b">{modeKeterangan?'CP':'Capaian Pembelajran'}</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.cp_description}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b">Elemen</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.elemen}</td>
                </TRowEdura>
                <TRowEdura>
                    <td className="align-top px-1 border-b text-nowrap">{modeKeterangan?'Lingkup Materi':'Ruang Lingkup Materi'}</td>
                    <td className="align-top px-1 border-b">:</td>
                    <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.elemen}</td>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}