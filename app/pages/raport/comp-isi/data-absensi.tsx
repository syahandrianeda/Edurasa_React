import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataAbsensiRaport(){
    return (
        <TableWithScrolling className="w-7/12">
            <thead>
                <TRowEdura>
                    <ThEdura className="w-12">No</ThEdura>
                    <ThEdura>Absensi</ThEdura>
                    <ThEdura>hari</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="text-center">1.</TdEdura>
                    <TdEdura>Sakit</TdEdura>
                    <TdEdura className="text-center"> ... hari</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">2.</TdEdura>
                    <TdEdura>Izin</TdEdura>
                    <TdEdura className="text-center"> ... hari</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">3.</TdEdura>
                    <TdEdura>Tanpa Keterangan</TdEdura>
                    <TdEdura className="text-center"> ... hari</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}