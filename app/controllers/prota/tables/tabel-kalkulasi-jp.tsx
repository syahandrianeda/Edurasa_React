import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { koleksiMapelByJp } from "~/types/kurikulum/prota-orm";

export default function TableKalkulasiJp({data}:{data:koleksiMapelByJp}){
    const dataJadwal = data.jadwal;//
    return (
        <TableWithScrolling data-word="ignore-parse" >
            <thead>
                <TRowEdura>
                    <ThEdura colSpan={2} className="text-wrap">Data Jadwal Mapel</ThEdura>
                    <ThEdura colSpan={4} className="text-wrap">Per Semester</ThEdura>
                    <ThEdura colSpan={2} className="text-wrap">Per Tahun</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura rowSpan={2}>Hari</ThEdura>
                    <ThEdura rowSpan={2}>Jumlah Jam</ThEdura>
                    <ThEdura colSpan={2}>Semester 1</ThEdura>
                    <ThEdura colSpan={2}>Semester 2</ThEdura>
                    <ThEdura rowSpan={2}>Total Hari</ThEdura>
                    <ThEdura rowSpan={2}>Total JP</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura>Jumlah Hari</ThEdura>
                    <ThEdura>Jumlah JP</ThEdura>
                    <ThEdura>Jumlah Hari</ThEdura>
                    <ThEdura>Jumlah JP</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataJadwal.map((jadwal,index)=>
                        <TRowEdura key={index}>
                            <TdEdura className="align-middle text-center capitalize">{jadwal.nama_hari}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_jp}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_day_in_semester1}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_jp_in_semester1}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_day_in_semester2}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_jp_in_semester2}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_day_in_year}</TdEdura>
                            <TdEdura className="align-middle text-center">{jadwal.count_jp_in_year}</TdEdura>
                        </TRowEdura>
                    )

                }
            </tbody>
            <tfoot>
                <TRowEdura>
                    <ThEdura>Total</ThEdura>
                    <ThEdura>{data.total_jp}</ThEdura>
                    <ThEdura>{data.total_day_semester1}</ThEdura>
                    <ThEdura>{data.total_jp_semester1}</ThEdura>
                    <ThEdura>{data.total_day_semester2}</ThEdura>
                    <ThEdura>{data.total_jp_semester2}</ThEdura>
                    <ThEdura>{data.total_day}</ThEdura>
                    <ThEdura>{data.total_jp_in_year}</ThEdura>
                </TRowEdura>
            </tfoot>
        </TableWithScrolling>
    )
}