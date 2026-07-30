import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function TabelSuratMasuk(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2} className="print:hidden">Aksi</ThEdura>
                    <ThEdura rowSpan={2} className="w-5 text-wrap">No. urut</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap w-35">Tanggal Diterima / diinput</ThEdura>
                    <ThEdura colSpan={5} className="text-wrap">Data Surat Masuk</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap">Ditujukan kepada</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap">Pendata</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura>File</ThEdura>
                    <ThEdura>No Surat</ThEdura>
                    <ThEdura>Tanggal Surat</ThEdura>
                    <ThEdura>Asal Surat</ThEdura>
                    <ThEdura>Perihal</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura colSpan={10} className="text-center">Belum ada data</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}