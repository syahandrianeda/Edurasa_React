import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataKokurikuler(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Kokurikuler</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="h-24">-</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}
