import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataPrestasi(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura className="w-12">No</ThEdura>
                    <ThEdura className="">Prestasi</ThEdura>
                    <ThEdura className="w-10/12">Prestasi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura/>
                    <TdEdura/>
                    <TdEdura>-</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}