import { TdEdura, ThEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataKokurikuler(){
    return (
        <TableWithScrolling>
            <thead>
                <ThEdura>Kokurikuler</ThEdura>
            </thead>
            <tbody>
                <TdEdura className="h-24">-</TdEdura>
            </tbody>
        </TableWithScrolling>
    )
}