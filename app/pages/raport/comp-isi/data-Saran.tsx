import { TdEdura, ThEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataSaran(){
    return (
        <TableWithScrolling>
            <thead>
                <ThEdura>Catatan Wali Kelas</ThEdura>
            </thead>
            <tbody>
                <TdEdura className="min-h-18">-</TdEdura>
            </tbody>
        </TableWithScrolling>
    )
}