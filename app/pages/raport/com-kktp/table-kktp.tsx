import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function TableKktpSetting(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Aksi</ThEdura>
                    <ThEdura>No</ThEdura>
                    <ThEdura>kode Mapel</ThEdura>
                    <ThEdura>Nama Mapel</ThEdura>
                    <ThEdura>KKTP</ThEdura>
                    <ThEdura>Pengayaan</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura colSpan={6} className="text-center">Tidak ada data</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}