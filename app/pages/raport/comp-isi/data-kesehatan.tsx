import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataKesehatan(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura className="w-12">No</ThEdura>
                    <ThEdura>Aspek Yang Diukur</ThEdura>
                    <ThEdura>Keterangan</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="text-center">1.</TdEdura>
                    <TdEdura>Penglihatan</TdEdura>
                    <TdEdura/>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">2.</TdEdura>
                    <TdEdura>Pendengaran</TdEdura>
                    <TdEdura/>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">3.</TdEdura>
                    <TdEdura>Gigi</TdEdura>
                    <TdEdura/>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">4.</TdEdura>
                    <TdEdura>Kesehatan Lainnya</TdEdura>
                    <TdEdura/>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}