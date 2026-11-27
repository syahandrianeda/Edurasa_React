import { TdEdura, ThEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataTanggapanOrangTua(){
    return (
        <TableWithScrolling>
            <thead>
                <ThEdura>Tanggapan Orang Tua/Wali Murid</ThEdura>
            </thead>
            <tbody>
                <TdEdura className="h-16">-</TdEdura>
            </tbody>
        </TableWithScrolling>
    )
}