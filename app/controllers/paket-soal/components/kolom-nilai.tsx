import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function KolomNilaiPaket(){
    return (
        <TableWithScrolling className="w-10/12 mx-auto text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura className="w-1/12">No</ThEdura>
                    <ThEdura>Nama Siswa</ThEdura>
                    <ThEdura className="w-1/12">Nilai</ThEdura>
                    <ThEdura className="text-wrap w-1/12">Paraf Orang tua</ThEdura>
                    <ThEdura className="text-wrap w-1/12">Paraf Guru</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura className="odd:bg-white even:bg-white">
                    <TdEdura className="h-12"/>
                    <TdEdura/>
                    <TdEdura/>
                    <TdEdura/>
                    <TdEdura/>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}