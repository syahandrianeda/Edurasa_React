import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataTanggapanOrangTua(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>Tanggapan Orang Tua/Wali Murid</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="h-16">-</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}