import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { GroupSebaranNoSoalFromPropertyKurikulum, GroupSebaranNoSoalFromPropertyKurikulumWithScore } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal";
type Props = {
    skorKd: GroupSebaranNoSoalFromPropertyKurikulumWithScore
}
export default function ResumeSkorKdKoreksi({skorKd}:Props){
    const {data, koleksiBentukSoal} = skorKd;
    return (
        <div className="px-4 py-2">
        <h3 className="text-base font-bold text-center">Nilai Koreksi</h3>
        <TableWithScrolling inModal={true} className="text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2}>Mapel</ThEdura>
                    <ThEdura rowSpan={2}>CP</ThEdura>
                    <ThEdura rowSpan={2}>TP</ThEdura>
                    <ThEdura rowSpan={2}>ATP</ThEdura>
                    <ThEdura colSpan={koleksiBentukSoal.length}>Skor tiap Bentuk Soal</ThEdura>
                    <ThEdura rowSpan={2} className="min-w-26">Skor ATP</ThEdura>
                    <ThEdura rowSpan={2}>Nilai Mapel</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    {
                        koleksiBentukSoal.map((bentuk_soal, iBentukSoal)=>
                            <ThEdura className="min-w-26" key={bentuk_soal.name}>{bentuk_soal.description}</ThEdura>
                        )
                    }
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.map((mapel, iMapel)=>
                        mapel.dataCp.map((cp, iCp)=>
                            cp.dataTp.map((tp, iTp)=>
                                tp.dataAtp.map((atp, iAtp)=>
                                    <TRowEdura className="text-wrap" key={iAtp+'_'+iTp+'_'+iCp+'_'+mapel.kodeMapel}>
                                        {
                                            iCp === 0 && iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={mapel.slotRow}>{mapel.mapelName}</TdEdura>
                                            )
                                            
                                        }
                                        {
                                            
                                            iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={cp.slotRow}>{cp.cp_description}</TdEdura>
                                            )
                                        }
                                        {
                                            
                                              iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={tp.slotRow}>{tp.tp_description}</TdEdura>
                                            )
                                        }
                                        <TdEdura className="text-wrap">[{atp.atp_id}] {atp.atp_description}</TdEdura>
                                        {
                                            koleksiBentukSoal.map((bs, iBs)=>{
                                                const dataSkor = atp.dataBentukSoal.find(s=>s.bentukSoal === bs.name);
                                                return (
                                                    <TdEdura key={bs.name}>
                                                        {
                                                            dataSkor?.data?.map((nilai, iNilai)=>
                                                                <div key={nilai.idbaris + '_'+ iNilai} className="w-full flex justify-between border-b">
                                                                    <p>No. {nilai.no_soal}</p>
                                                                    <p>{nilai.skor}</p>
                                                                </div>
                                                            )
                                                        }
                                                    </TdEdura>
                                                )
                                            }
                                            )
                                        }
                                        <TdEdura>
                                            <div className="w-full flex justify-between border-b">
                                                <p>Total Soal</p>
                                                <p>{atp.jumlahSoalDinilai}</p>
                                            </div>
                                            <div className="w-full flex justify-between border-b font-extrabold">
                                                <p>Skor ATP</p>
                                                <p>{atp.skor}</p>
                                            </div>
                                        </TdEdura>
                                         {
                                            iCp === 0 && iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap font-extrabold text-center" rowSpan={mapel.slotRow}>{mapel.skor}</TdEdura>
                                            )
                                            
                                        }
                                    </TRowEdura>
                                )
                            )
                        )
                    )
                }
            </tbody>
        </TableWithScrolling>
        </div>
    )
}