import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { SiswaType } from "~/types/siswa";

type Props = {
    siswa: SiswaType[]
}
export default function ExportNilaiUntukERaport({siswa}:Props){
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>No.</ThEdura>
                    <ThEdura className="w-26">NISN</ThEdura>
                    <ThEdura>Nama Siswa</ThEdura>
                    {
                        [...Array(4)].map((_, i)=>
                            <ThEdura key={i}>TP {i+1}</ThEdura>
                        )
                    }
                </TRowEdura>
            </thead>
            <tbody>
                    {
                        siswa.map((data, iData)=>
                            <TRowEdura key={data.id}>
                                <TdEdura className="text-center w-12">{iData+1}.</TdEdura>
                                <TdEdura>{data.nisn}</TdEdura>
                                <TdEdura>{data.pd_nama}</TdEdura>
                                {
                                    [...Array(4)].map((sel, iSel)=>
                                        <TdEdura key={sel} className="w-12">{iSel}</TdEdura>
                                    )
                                }
                            </TRowEdura>
                        )
                    }
            </tbody>
        </TableWithScrolling>
    )
}