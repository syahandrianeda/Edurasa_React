import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components"
import TableWithScrolling from "~/components/tabels/table-with-scrolling"
import getFaseByRombel from "~/lib/get-fase-by-rombel"
import type { SiswaType } from "~/types/siswa"

type Props={
    siswa:SiswaType
}
export default function ExportTujuanPembelajaran(){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>No</ThEdura>
                    <ThEdura>Tingkat</ThEdura>
                    <ThEdura>Fase</ThEdura>
                    <ThEdura>Semster</ThEdura>
                    <ThEdura>Tujuan Pembelajaran</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                <TRowEdura>
                    <TdEdura className="text-center">1.</TdEdura>
                    <TdEdura>5</TdEdura>
                    <TdEdura>1</TdEdura>
                    <TdEdura>C</TdEdura>
                    <TdEdura className="text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ullam quaerat harum ipsum nihil repellendus a doloribus inventore molestiae vitae reiciendis quisquam alias explicabo facilis quod at blanditiis, culpa corporis!</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="text-center">2.</TdEdura>
                    <TdEdura>5</TdEdura>
                    <TdEdura>1</TdEdura>
                    <TdEdura>C</TdEdura>
                    <TdEdura className="text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ullam quaerat harum ipsum nihil repellendus a doloribus inventore molestiae vitae reiciendis quisquam alias explicabo facilis quod at blanditiis, culpa corporis!</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}