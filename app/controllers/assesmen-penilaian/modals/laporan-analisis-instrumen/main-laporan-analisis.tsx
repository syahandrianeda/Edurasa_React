import type { AnalisisInstrumenResult } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import IdentitasInstrumenAnalisis from "./identitas-instrumen-analisis";
import { useMemo } from "react";
import { cn } from "~/lib/utils";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import BadgeKelompokSiswa from "./badge-kelompok-siswa";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableSumberDataAnalisis from "./table-sumber-data-analisis";
import TableAnalisisData from "./tabel-analisis-data";
import PanduanAnalisisInstrumen from "../analisis-instrumen/PanduanAnalisisInstrumen";
import PenjelasanReliabilitasTes from "../analisis-instrumen/PenjelasanReliabilitasTes";
import CardsSummaryRekomendasi from "./card-summary-rekomendasi";
import TableAnalisisPengecohPilihanGandaTunggal from "./tabel-analisis-pengecoh-pg";

export default function MainLaporanAnalisis({data}:{data:AnalisisInstrumenResult}){
    
    
    return (
        <div>
            <h3 className="text-center font-extrabold uppercase mb-4">ANALISIS INSTRUMEN PENILAIAN</h3>
            <ol className="list-[upper-alpha] list-outside ps-5 marker:font-bold text-xs [&>li]:mt-4">
                <li className="list-item">
                    <p className="font-bold">Identitas Instrumen</p>
                    <IdentitasInstrumenAnalisis publikasi={data.publikasi}/>
                </li>
                <li className="list-item">
                    <p className="font-bold">Sumber Data</p>
                    {
                        data.sumberData && <TableSumberDataAnalisis sumberData={data.sumberData} soal={data.soal}/>
                    }
                </li>
                <li className="list-item"><p className="font-bold">Analisis Data</p>
                    
                        <TableAnalisisData data={data.soal}/>
                        <TableAnalisisPengecohPilihanGandaTunggal dataSumber={data.soal}/>
                    
                </li>
                <li className="list-item">
                    <p className="font-bold">Pembahasan</p>
                    <PanduanAnalisisInstrumen/>
                    </li>
                <li className="list-item">
                    <p className="font-bold">Simpulan</p>
                    <PenjelasanReliabilitasTes
                        alpha={data.summary.reliabilitas.cronbachAlpha}
                        jumlahPeserta={data.jumlahPeserta}
                        jumlahSoal={data.jumlahSoal}
                    />
                </li>
                <li className="list-item">
                    <p className="font-bold">Rekomendasi</p>
                    <CardsSummaryRekomendasi summary={data.summary}/>
                </li>
            </ol>
        </div>
    )
}