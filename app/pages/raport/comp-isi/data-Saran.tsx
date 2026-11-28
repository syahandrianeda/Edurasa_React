import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataSaran(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Catatan Wali Kelas</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="min-h-18">-</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}
