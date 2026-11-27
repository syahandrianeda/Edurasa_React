import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataEkstraKurikuler(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura className="">No</ThEdura>
                    <ThEdura className="w-3/12">Ekstrakturikuler</ThEdura>
                    <ThEdura className="">Nilai</ThEdura>
                    <ThEdura className="w-7/12">Keterangan</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura colSpan={4}>-</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}