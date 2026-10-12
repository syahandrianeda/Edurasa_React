import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { DataSumberResult } from "~/domain/analisis-instrumen/DataSumberResult";
import type { AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import BadgeKelompokSiswa from "./badge-kelompok-siswa";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import { cn } from "~/lib/utils";

export default function TableSumberDataAnalisis({sumberData, soal}:{sumberData:DataSumberResult[], soal: AnalisisInstrumenSoalFinal[]}){
    return (
        <>
        <p>Daftar Skor Nilai tiap instrumen soal</p>
        <TableWithScrolling inModal={true} className="text-[8px]">
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2}>No.</ThEdura>
                    <ThEdura rowSpan={2}>Nama Siswa</ThEdura>
                    <ThEdura rowSpan={2}>Kelas</ThEdura>
                    <ThEdura rowSpan={2}>Skor/Nilai</ThEdura>
                    <ThEdura rowSpan={2}>Kelompok</ThEdura>
                    <ThEdura rowSpan={2}>Validasi</ThEdura>
                    {
                        sumberData[0].strukturSummarySoal.map((item, iItem)=>
                            <ThEdura key={item.listBentukSoal.shortName + '_'+iItem} colSpan={item.responCount}>{item.listBentukSoal.description}</ThEdura>
                        )
                    }
                </TRowEdura>
                <TRowEdura>
                    {
                        soal.map((soal, iSoal)=>
                            <ThEdura key={iSoal + '_'+soal.no_prefix}>{soal.no_prefix}</ThEdura>
                        )
                    }
                </TRowEdura>
            </thead>
            <tbody>
                {
                    sumberData.map((data, iData)=>
                        <TRowEdura key={iData+'_'+data.siswa.id} className={cn("odd:bg-transparent even:bg-transparent", !data.isCorrecting?'odd:bg-amber-200 even:bg-amber-200 print:odd:bg-amber-200 print:even:bg-amber-200':'bg-inherit')}>
                            <TdEdura>{iData + 1}</TdEdura>
                            <TdEdura>{data.siswa.pd_nama}</TdEdura>
                            <TdEdura>{data.siswa.nama_rombel}</TdEdura>
                            <TdEdura>{data.totalScore}</TdEdura>
                            <TdEdura> <BadgeKelompokSiswa kelompokSiswa= {data.kelompokSiswa}/> </TdEdura>
                            <TdEdura>{data.isCorrecting?'Sudah':'Belum'}</TdEdura>
                            {
                                data.data.map((itemRespon, iRespon)=>
                                    itemRespon.respon.map((respon=>
                                    <TdEdura key={respon.index} className={cn("text-center", respon.respon ?"bg-inherit":"bg-rose-300")}>
                                        <TooltipComp content={respon?.respon || 'Tidak menjawab'}>
                                            <p>
                                                {((respon?.skor ?? 0))}
                                            </p>
                                        </TooltipComp>
                                    </TdEdura>
                                    ))
                                )
                            }
                        </TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
        <div className="text-xs">
            Keterangan:
            <ul className="list-disc list-outside ps-5">
                <li>Validasi adalah proses guru telah memeriksa dan memvalidasi jawaban siswa (Guru telah mengoreksi dan memberikan skor pada jawaban siswa). Sel berwarna kuning <span className="w-15 bg-amber-200 border">. .</span> menunjukkan respon jawaban siswa belum dikoreksi.</li>
            
                <li>Kelompok <strong>Atas/Bawah</strong> menunjukkan kelompok siswa yang mendapatkan skor tertinggi/terendah. Diurutkan untuk menganalisis</li>
                <li>Tiap soal menampilkan skor dengan skala 1-100, meskipun analisis seharusnya menampilkan rentang 0 - 1.</li>
                <li>Tiap soal menampilkan skor dengan skala 1-100, namun skor 0 dengan warna sel merah muda <span className="w-15 bg-rose-200 border">. .</span> menunjukkan responden (siswa) tidak menjawab/Soal tidak valid </li>
            </ul>
        </div>
        </>
    )
}